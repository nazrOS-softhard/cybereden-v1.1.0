import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import assetsRoutes from './routes/assets.js';
import profileRoutes from './routes/profile.js';
import xpRoutes from './routes/xp.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/assets', assetsRoutes);
app.use('/profile', profileRoutes);
app.use('/xp', xpRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', database: 'connected' });
});

export default app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}