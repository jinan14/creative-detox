import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import artworkRoutes from './routes/artwork.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import workshopRoutes from './routes/workshop.routes.js';
import registrationRoutes from './routes/registration.routes.js';
import gypsumRoutes from './routes/gypsum.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import adminRoutes from './routes/admin.routes.js';
import aiRoutes from './routes/ai.routes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL, // e.g. https://creative-detox.vercel.app
].filter(Boolean);

console.log('CORS allowed origins:', JSON.stringify(allowedOrigins));

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());
// Upload filenames are unique (timestamp + random hash) and never overwritten,
// so browsers can cache them indefinitely — a replaced image gets a new URL.
app.use('/uploads', express.static('uploads', { maxAge: '1y', immutable: true }));

// Registered before the request logger so uptime-monitor pings (every few
// minutes, to keep Render's free tier awake) don't flood the logs.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((req, res, next) => {
  console.log(`[req] ${req.method} ${req.originalUrl} | origin=${req.headers.origin ?? '(none)'}`);
  res.on('finish', () => {
    console.log(`[res] ${req.method} ${req.originalUrl} -> ${res.statusCode}`);
  });
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/gypsum', gypsumRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5050;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
