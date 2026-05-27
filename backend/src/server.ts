import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables for local development
dotenv.config();

const app = express();

// Middleware configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Replace with your deployed frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- PLACEHOLDER FOR YOUR ROUTES ---
// Auth routes (Twitch / GitHub), Supabase integration, and storage routes go here.
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// CRITICAL FOR VERCEL: Export the app instance
export default app;

// Only run the server listener if executing locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}
