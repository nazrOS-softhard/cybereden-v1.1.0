import express, { Request, Response, NextFunction } from 'express';
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
  origin: (process.env.CORS_ORIGINS || '*').split(',').map(o => o.trim()),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ==================== LOGGER MIDDLEWARE ====================
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ==================== HEALTH CHECK ====================
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production',
  });
});

// ==================== SIMPLE TEST ====================
app.get('/test', (req: Request, res: Response) => {
  res.json({
    message: 'Backend is working!',
    environment: process.env.NODE_ENV || 'development',
    supabaseConnected: !!process.env.SUPABASE_URL,
    timestamp: new Date().toISOString(),
  });
});

// ==================== API ROUTES - PLACEHOLDER ====================
// Эти будут заменены на реальные импорты когда будут готовы route файлы

// Auth
app.post('/auth/github', (req: Request, res: Response) => {
  res.json({ message: 'GitHub auth - not implemented yet' });
});

app.post('/auth/twitch', (req: Request, res: Response) => {
  res.json({ message: 'Twitch auth - not implemented yet' });
});

app.get('/auth/me', (req: Request, res: Response) => {
  res.json({ message: 'Get current user - not implemented yet' });
});

// Upload
app.post('/upload/avatar', (req: Request, res: Response) => {
  res.json({ message: 'Avatar upload - not implemented yet' });
});

app.post('/upload/asset', (req: Request, res: Response) => {
  res.json({ message: 'Asset upload - not implemented yet' });
});

// Assets
app.get('/assets', (req: Request, res: Response) => {
  res.json({
    message: 'List assets',
    assets: [],
  });
});

app.get('/assets/:id', (req: Request, res: Response) => {
  res.json({ message: `Get asset ${req.params.id}` });
});

// Profile
app.get('/profile', (req: Request, res: Response) => {
  res.json({ message: 'Get my profile' });
});

app.get('/profile/:userId', (req: Request, res: Response) => {
  res.json({ message: `Get profile ${req.params.userId}` });
});

// XP
app.get('/xp/leaderboard', (req: Request, res: Response) => {
  res.json({
    message: 'Get XP leaderboard',
    leaderboard: [],
  });
});

app.get('/stats', (req: Request, res: Response) => {
  res.json({
    message: 'Get platform stats',
    stats: {
      totalUsers: 0,
      totalAssets: 0,
    },
  });
});

// ==================== 404 HANDLER ====================
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`,
    code: 'ROUTE_NOT_FOUND',
  });
});

// ==================== ERROR HANDLER ====================
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    code: err.code || 'INTERNAL_ERROR',
  });
});

// ==================== START SERVER ====================
// Для Vercel это ОБЯЗАТЕЛЬНО должно быть экспортировано как default
export default app;

// Для локальной разработки
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║     🚀 CyberEden Backend                  ║
║     Running on http://localhost:${PORT}      ║
╚════════════════════════════════════════════╝

✅ Endpoints available:
  • GET  /health
  • GET  /test
  • POST /auth/github
  • POST /auth/twitch
  • GET  /assets
  • GET  /profile/:userId
  • GET  /xp/leaderboard
  • GET  /stats

🔗 Supabase: ${process.env.SUPABASE_URL ? '✅ Connected' : '❌ Not configured'}
    `);
  });
}
