import OpenAI from 'openai';
import Workshop from '../models/Workshop.js';

let client = null;
const getClient = () => {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
};

export const recommendWorkshops = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input || !input.trim()) {
      return res.status(400).json({ message: 'input (emotion or free text) is required' });
    }

    const workshops = await Workshop.find().select('title description');
    if (workshops.length === 0) {
      return res.json({ workshops: [] });
    }

    const workshopList = workshops
      .map((w) => `- "${w.title}": ${w.description}`)
      .join('\n');

    const prompt = `A user of an art-and-wellness platform describes how they feel: "${input}".

Here is the current list of available workshops:
${workshopList}

Pick the workshops (by exact title) that best match the user's emotional state or request. Respond ONLY with a JSON object of the form {"titles": ["Exact Workshop Title", ...]}. Only include titles that appear in the list above. If nothing is a good match, return an empty array.`;

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
