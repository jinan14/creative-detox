import dns from 'node:dns';
import mongoose from 'mongoose';

// Windows + certain networks (e.g. IPv6 link-local DNS entries) can make Node's
// resolver fall back to an unreachable 127.0.0.1, breaking every DNS lookup
// including the mongodb+srv:// lookup below. Point it at public resolvers instead.
dns.setServers(['8.8.8.8', '1.1.1.1']);

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

const connectDB = async () => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB connected: ${mongoose.connection.host}`);
      return;
    } catch (err) {
      if (attempt === MAX_RETRIES) throw err;
      console.warn(
        `MongoDB connection attempt ${attempt}/${MAX_RETRIES} failed (${err.message}), retrying in ${RETRY_DELAY_MS / 1000}s...`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
};

export default connectDB;
