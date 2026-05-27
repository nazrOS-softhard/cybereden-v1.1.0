import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Импорты роутов
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import assetsRoutes from './routes/assets.js';
import profileRoutes from './routes/profile.js';
import xpRoutes from './routes/xp.js';

// Загружаем environment переменные
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ==================== SUPABASE CLIENT ====================
export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin: (process.env.CORS_ORIGINS || '*').split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ==================== LOGGER ====================
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ==================== HEALTH CHECK ====================
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ==================== SIMPLE ECHO TEST ====================
app.get('/test', (req, res) => {
  res.json({
    message: 'Backend is working!',
    environment: process.env.NODE_ENV || 'development',
    supabaseConnected: !!process.env.SUPABASE_URL,
  });
});

// ==================== API ROUTES ====================
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/assets', assetsRoutes);
app.use('/profile', profileRoutes);
app.use('/xp', xpRoutes);

// ==================== 404 HANDLER ====================
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`,
    code: 'ROUTE_NOT_FOUND',
  });
});

// ==================== ERROR HANDLER ====================
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error',
      code: err.code || 'INTERNAL_ERROR',
    });
  }
);

// ==================== START SERVER ====================
// Для Vercel это нужно экспортировать
export default app;

// Для локальной разработки
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║     🚀 CyberEden Backend                  ║
║     Running on http://localhost:${PORT}      ║
╚════════════════════════════════════════════╝

Endpoints available:
  ✓ GET  /health          - Health check
  ✓ GET  /test            - Test endpoint
  ✓ POST /auth/github     - GitHub auth
  ✓ POST /auth/twitch     - Twitch auth
  ✓ GET  /assets          - List assets
  ✓ GET  /profile/:userId - Get profile
  ✓ GET  /xp/leaderboard  - Leaderboard
  ✓ GET  /stats           - Platform stats

Documentation: Check SUPABASE-VERCEL-GUIDE.md
    `);
  });
}
