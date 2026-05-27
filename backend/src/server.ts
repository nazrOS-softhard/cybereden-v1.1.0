import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

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

// Auth routes
app.post('/auth/github', (req, res) => {
  res.json({ message: 'GitHub auth endpoint', status: 'not implemented yet' });
});

app.post('/auth/twitch', (req, res) => {
  res.json({ message: 'Twitch auth endpoint', status: 'not implemented yet' });
});

app.get('/auth/me', (req, res) => {
  res.json({ message: 'Get current user', status: 'not implemented yet' });
});

// Upload routes
app.post('/upload/avatar', (req, res) => {
  res.json({ message: 'Avatar upload', status: 'not implemented yet' });
});

app.post('/upload/asset', (req, res) => {
  res.json({ message: 'Asset upload', status: 'not implemented yet' });
});

// Assets routes
app.get('/assets', (req, res) => {
  res.json({
    message: 'List assets',
    status: 'not implemented yet',
    assets: [],
  });
});

app.get('/assets/:id', (req, res) => {
  res.json({ message: `Get asset ${req.params.id}`, status: 'not implemented yet' });
});

// Profile routes
app.get('/profile', (req, res) => {
  res.json({ message: 'Get my profile', status: 'not implemented yet' });
});

app.get('/profile/:userId', (req, res) => {
  res.json({
    message: `Get profile for user ${req.params.userId}`,
    status: 'not implemented yet',
  });
});

// XP routes
app.get('/xp/leaderboard', (req, res) => {
  res.json({ message: 'Get XP leaderboard', status: 'not implemented yet', leaderboard: [] });
});

app.get('/stats', (req, res) => {
  res.json({
    message: 'Get platform stats',
    status: 'not implemented yet',
    stats: {
      totalUsers: 0,
      totalAssets: 0,
    },
  });
});

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
