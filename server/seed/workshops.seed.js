import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Workshop from '../models/Workshop.js';

dotenv.config();

const workshops = [
  {
    title: 'Collage Therapy Workshop',
    description: 'Express your emotions and creativity through collage and mixed media art.',
    date: new Date('2026-08-02'),
    time: '10:00 AM',
    location: 'Creative Detox Studio, Beirut',
    capacity: 12,
    seatsRemaining: 4,
    price: 35,
    image: 'http://localhost:5173/workshops/collage.jpeg',
    category: 'Collage',
    duration: '2 Hours',
    level: 'Beginner',
  },
  {
    title: 'Acrylic Painting Session',
    description: 'Relax and enjoy guided painting exercises in a mindful environment.',
    date: new Date('2026-08-09'),
    time: '4:00 PM',
    location: 'Creative Detox Studio, Beirut',
    capacity: 15,
    seatsRemaining: 15,
    price: 40,
    image: 'https://images.unsplash.com/photo-1753098498106-0319c1d646ca?q=80&w=1200&auto=format&fit=crop',
    category: 'Painting',
    duration: '3 Hours',
    level: 'All Levels',
  },
  {
    title: 'Carving on Gypsum',
    description: 'Learn hand-carving techniques on gypsum blocks to create textured reliefs and small sculptures.',
    date: new Date('2026-08-16'),
    time: '11:00 AM',
    location: 'Creative Detox Workshop Hall, Beirut',
    capacity: 10,
    seatsRemaining: 2,
    price: 55,
    image: 'http://localhost:5173/workshops/carving-gypsum.png',
    category: 'Carving',
    duration: '3 Hours',
    level: 'Intermediate',
  },
  {
    title: 'Kids Creative Day',
    description: 'Fun art activities designed to inspire imagination and creativity in children.',
    date: new Date('2026-08-23'),
    time: '9:00 AM',
    location: 'Creative Detox Garden Room, Beirut',
    capacity: 20,
    seatsRemaining: 20,
    price: 25,
    image: 'http://localhost:5173/workshops/kids.jpeg',
    category: 'Kids',
    duration: '4 Hours',
    level: 'Kids',
  },
  {
    title: 'Mindful Drawing Session',
    description: 'Slow down and reconnect with yourself through calming drawing exercises.',
    date: new Date('2026-08-30'),
    time: '5:00 PM',
    location: 'Creative Detox Studio, Beirut',
    capacity: 12,
    seatsRemaining: 6,
    price: 30,
    image: 'https://images.unsplash.com/photo-1511854005000-f27912f66ade?q=80&w=1200&auto=format&fit=crop',
    category: 'Mindfulness',
    duration: '2 Hours',
    level: 'All Levels',
  },
  {
    title: 'Vitray Art Workshop',
    description: 'Discover the luminous craft of vitray by painting glass-inspired designs with translucent color and light.',
    date: new Date('2026-09-06'),
    time: '2:00 PM',
    location: 'Creative Detox Studio, Beirut',
    capacity: 10,
    seatsRemaining: 10,
    price: 45,
    image: 'http://localhost:5173/workshops/vitray.png',
    category: 'Vitray',
    duration: '3 Hours',
    level: 'Intermediate',
  },
];

const run = async () => {
  await connectDB();
  await Workshop.deleteMany({});
  await Workshop.insertMany(workshops);
  console.log(`Seeded ${workshops.length} workshops`);
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
