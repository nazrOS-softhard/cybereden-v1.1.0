
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import assetsRoutes from './routes/assets.js';
import profileRoutes from './routes/profile.js';
import xpRoutes from './routes/xp.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ==================== SUPABASE CLIENT ====================
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// ==================== HEALTH CHECK ====================
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==================== ROUTES ====================
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/assets', assetsRoutes);
app.use('/profile', profileRoutes);
app.use('/xp', xpRoutes);

// ==================== 404 ====================
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// ==================== ERROR HANDLER ====================
app.use((err: any, req: express.Request, res: express.Response) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ==================== START ====================
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
