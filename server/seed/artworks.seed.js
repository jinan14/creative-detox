import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Artwork from '../models/Artwork.js';

dotenv.config();

const artworks = [
  {
    title: 'Quiet Tide',
    description: 'A soft-hued acrylic study of waves meeting shore at dusk.',
    image: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=1200&auto=format&fit=crop',
    artist: 'Layla Haddad',
    price: 180,
    category: 'Painting',
  },
  {
    title: 'Fragments of Memory',
    description: 'Mixed-media collage layering torn paper, fabric, and ink.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200&auto=format&fit=crop',
    artist: 'Nour Saad',
    price: 220,
    category: 'Collage',
  },
  {
    title: 'Carved Silence',
    description: 'A hand-carved gypsum relief exploring texture and light.',
    image: 'http://localhost:5173/artworks/carved-silence.jpeg',
    artist: 'Rami Khalil',
    price: 260,
    category: 'Carving',
  },
  {
    title: 'Morning Bloom',
    description: 'Watercolor florals rendered in loose, breathing brushstrokes.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop',
    artist: 'Angela Fares',
    price: 150,
    category: 'Painting',
  },
  {
    title: 'City Reverie',
    description: 'An abstract cityscape in bold teal and berry tones.',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1200&auto=format&fit=crop',
    artist: 'Karim Aoun',
    price: 300,
    category: 'Painting',
  },
  {
    title: 'Stained Light',
    description: 'A vitray-style panel of translucent color and glass texture.',
    image: 'http://localhost:5173/artworks/stained-light.png',
    artist: 'Dana Farah',
    price: 240,
    category: 'Vitray',
  },
  {
    title: 'Childhood Wonder',
    description: 'A playful mixed-media piece made during a kids collage session.',
    image: 'http://localhost:5173/artworks/childhood-wonder.jpeg',
    artist: 'Mia Barakat',
    price: 90,
    category: 'Kids',
  },
  {
    title: 'Still Waters',
    description: 'A meditative ink-wash landscape built from a mindful drawing session.',
    image: 'https://images.unsplash.com/photo-1511854005000-f27912f66ade?q=80&w=1200&auto=format&fit=crop',
    artist: 'Layla Haddad',
    price: 200,
    category: 'Mindfulness',
  },
  {
    title: 'Golden Hour Vessel',
    description: 'A hand-painted ceramic cup design in warm gold and rose tones.',
    image: 'http://localhost:5173/artworks/golden-hour-vessel.jpeg',
    artist: 'Nour Saad',
    price: 65,
    category: 'Vitray',
  },
  {
    title: 'Woven Emotion',
    description: 'A textured collage piece exploring grief and renewal through fabric.',
    image: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?q=80&w=1200&auto=format&fit=crop',
    artist: 'Rami Khalil',
    price: 210,
    category: 'Collage',
    available: false,
  },
];

const run = async () => {
  await connectDB();
  await Artwork.deleteMany({});
  await Artwork.insertMany(artworks);
  console.log(`Seeded ${artworks.length} artworks`);
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
