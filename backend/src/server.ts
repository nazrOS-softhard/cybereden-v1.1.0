import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env variables for local machine testing
dotenv.config();

const app = express();

// Middleware setup
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Your Twitch, GitHub, and Supabase Routes Go Here ---

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', database: 'connected' });
});

// 1. CRITICAL FOR VERCEL: You must export the app instance
export default app;

// 2. Prevent the listener from running in Vercel's serverless environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}
