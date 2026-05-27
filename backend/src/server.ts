import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Импорты роутов (убрали .js расширения для совместимости со сборщиком Vercel)
import authRoutes from './routes/auth';
import uploadRoutes from './routes/upload';
import assetsRoutes from './routes/assets';
import profileRoutes from './routes/profile';
import xpRoutes from './routes/xp';

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
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ==================== HEALTH CHECK ====================
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(), // Примечание: на Vercel всегда будет около 0
  });
});

// ==================== SIMPLE ECHO TEST ====================
app.get('/test', (req: Request, res: Response) => {
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
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`,
    code: 'ROUTE_NOT_FOUND',
  });
});

// ==================== ERROR HANDLER ====================
// Исправлено типизирование аргументов для TypeScript
app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error',
      code: err.code || 'INTERNAL_ERROR',
    });
  }
);

// ==================== START SERVER ====================
// Для Vercel обязательно экспортируем само приложение
export default app;

// Для локальной разработки сервер запустится стандартно
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
    `);
  });
}
