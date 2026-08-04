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

export const recommendWorkshops = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input || !input.trim()) {
      return res.status(400).json({ message: 'input (emotion or free text) is required' });
    }

    const workshops = await Workshop.find().select('title description category');
    if (workshops.length === 0) {
      return res.json({ workshops: [] });
    }

    const workshopList = workshops
      .map((w) => `- "${w.title}" (category: ${w.category || 'general'}): ${w.description}`)
      .join('\n');

    const prompt = `A user of an art-and-wellness platform describes how they feel: "${input}".

Here is the current list of available workshops:
${workshopList}

Ignore generic phrases like "express your emotions", "creativity", or "self-expression" if they appear in a description — most workshops use language like that and it carries no real signal. Judge fit from the specific activity and category instead. Different feelings should usually lead to different recommendations:
- High-energy, positive states (happy, excited, motivated, creative) fit lively, social, or expressive workshops best.
- Low-energy or heavy states (sad, anxious, burned out, lonely) fit calming, slow-paced, mindful workshops best.
- Tense or agitated states (angry, stressed, frustrated) fit hands-on, physically expressive or release-oriented workshops best.

First, in a "reasoning" field, briefly explain in one sentence per workshop under consideration why it does or doesn't fit this specific feeling. Then give your final picks.

Pick at most the 2-3 workshops (by exact title) that best match, ranked best-first. Respond ONLY with a JSON object of the form {"reasoning": "...", "titles": ["Exact Workshop Title", ...]}. Only include titles that appear in the list above. If nothing is a good match, return an empty array.`;

    const completion = await getClient().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    let titles = [];
    try {
      const parsed = JSON.parse(completion.choices[0].message.content);
      titles = Array.isArray(parsed.titles) ? parsed.titles : [];
    } catch {
      titles = [];
    }

    const matched = workshops.filter((w) =>
      titles.some((t) => t.trim().toLowerCase() === w.title.trim().toLowerCase())
    );

    const fullMatches = await Workshop.find({
      _id: { $in: matched.map((w) => w._id) },
    });

    res.json({ workshops: fullMatches });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get AI recommendation', error: err.message });
  }
};
