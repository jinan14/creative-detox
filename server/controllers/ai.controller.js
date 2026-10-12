import crypto from 'crypto';
import OpenAI from 'openai';
import Workshop from '../models/Workshop.js';

let client = null;
const getClient = () => {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
};

export const generateDescription = async (req, res) => {
  try {
    const { title, type } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'title is required' });
    }
    if (type !== 'artwork' && type !== 'workshop') {
      return res.status(400).json({ message: 'type must be "artwork" or "workshop"' });
    }

    const prompt =
      type === 'artwork'
        ? `Write a short, engaging gallery description (2-3 sentences) for an artwork titled "${title}" on an art marketplace. Describe it as if it already exists, in a warm, gallery-catalog tone. Respond with only the description text, no quotes or labels.`
        : `Write a short, inviting description (2-3 sentences) for a creative wellness workshop titled "${title}". Explain what participants might do and how it could help them unwind, in a warm tone matching an art-and-wellness platform. Respond with only the description text, no quotes or labels.`;

    const completion = await getClient().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const description = completion.choices[0].message.content.trim();
    res.json({ description });
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate description', error: err.message });
  }
};

// Recommendations are cached per (feeling, workshop list). The 8 emotion chips
// on the Recommend page repeat constantly, so most requests skip OpenAI
// entirely. The workshop fingerprint changes whenever a workshop is added,
// removed, or edited, which naturally invalidates stale answers.
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const CACHE_MAX = 200;
const recommendationCache = new Map();

const workshopFingerprint = (workshops) =>
  crypto
    .createHash('md5')
    .update(workshops.map((w) => `${w._id}|${w.title}|${w.category}|${w.description}`).join('\n'))
    .digest('hex');

const readCache = (key) => {
  const hit = recommendationCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > CACHE_TTL_MS) {
    recommendationCache.delete(key);
    return null;
  }
  return hit.picks;
};

const writeCache = (key, picks) => {
  if (recommendationCache.size >= CACHE_MAX) {
    // Map keeps insertion order, so the first key is the oldest.
    recommendationCache.delete(recommendationCache.keys().next().value);
  }
  recommendationCache.set(key, { picks, at: Date.now() });
};

export const recommendWorkshops = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input || !input.trim()) {
      return res.status(400).json({ message: 'input (emotion or free text) is required' });
    }

    // One query: the full documents are needed for the response anyway.
    const workshops = await Workshop.find();
    if (workshops.length === 0) {
      return res.json({ workshops: [] });
    }

    const cacheKey = `${input.trim().toLowerCase()}::${workshopFingerprint(workshops)}`;
    let picks = readCache(cacheKey);

    if (!picks) {
      const workshopList = workshops
        .map((w) => `- "${w.title}" (category: ${w.category || 'general'}): ${w.description}`)
        .join('\n');

      // Kept deliberately short on the output side: generating text is what
      // makes the call slow, so we ask only for the picks plus one short line each.
      const prompt = `A user of an art-and-wellness platform describes how they feel: "${input}".

Available workshops:
${workshopList}

Ignore generic phrases like "express your emotions", "creativity", or "self-expression" — most descriptions use them. Judge fit from the specific activity and category:
- High-energy, positive states (happy, excited, motivated, creative) → lively, social, or expressive workshops.
- Low-energy or heavy states (sad, anxious, burned out, lonely) → calming, slow-paced, mindful workshops.
- Tense or agitated states (angry, stressed, frustrated) → hands-on, physically expressive, release-oriented workshops.

Pick at most 3 workshops (exact titles from the list), ranked best-first. For each, write "why": one warm sentence (max 18 words) speaking directly to the user about why it suits how they feel.
Respond ONLY with JSON: {"picks": [{"title": "Exact Workshop Title", "why": "..."}]}. If nothing fits, return {"picks": []}.`;

      const completion = await getClient().chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 220,
      });

      let rawPicks = [];
      try {
        const parsed = JSON.parse(completion.choices[0].message.content);
        rawPicks = Array.isArray(parsed.picks) ? parsed.picks : [];
      } catch {
        rawPicks = [];
      }

      // Resolve titles to ids, keep the model's ranking, drop unknown titles.
      picks = [];
      for (const pick of rawPicks) {
        const title = String(pick?.title || '').trim().toLowerCase();
        const workshop = workshops.find((w) => w.title.trim().toLowerCase() === title);
        if (workshop && !picks.some((p) => p.id === String(workshop._id))) {
          picks.push({ id: String(workshop._id), why: String(pick.why || '').trim() });
        }
      }
      writeCache(cacheKey, picks.slice(0, 3));
    }

    const byId = new Map(workshops.map((w) => [String(w._id), w]));
    const results = picks
      .filter((p) => byId.has(p.id))
      .map((p) => ({ ...byId.get(p.id).toObject(), matchReason: p.why }));

    res.json({ workshops: results });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get AI recommendation', error: err.message });
  }
};
