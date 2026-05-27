import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

import authRouter   from './routes/auth';
import uploadRouter from './routes/upload';
import profileRouter from './routes/profile';

dotenv.config();

// ─── Supabase (Service Role — обходит RLS) ────────────────────────────────────
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── Express ──────────────────────────────────────────────────────────────────
const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health', async (_req: Request, res: Response) => {
  try {
    const { error } = await supabase.from('users').select('count').limit(1);
    res.status(200).json({
      status: 'healthy',
      database: error ? 'error' : 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(200).json({ status: 'healthy', database: 'unknown' });
  }
});

// ─── Роуты ────────────────────────────────────────────────────────────────────
app.use('/api/auth',    authRouter);
app.use('/api/upload',  uploadRouter);
app.use('/api/profile', profileRouter);

// ─── 404 ─────────────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Глобальный обработчик ошибок ─────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// ─── Локальный запуск (Vercel использует export default) ──────────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`\n✅  CyberEden backend: http://localhost:${PORT}`);
    console.log(`    GET  /health`);
    console.log(`    GET  /api/auth/github`);
    console.log(`    GET  /api/auth/twitch`);
    console.log(`    GET  /api/auth/me`);
    console.log(`    POST /api/upload/avatar`);
    console.log(`    POST /api/upload/asset`);
    console.log(`    GET  /api/upload/assets`);
    console.log(`    GET  /api/profile\n`);
  });
}

// ВАЖНО: Vercel serverless требует export default
export default app;
