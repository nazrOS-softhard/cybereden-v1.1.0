import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import authRouter     from './routes/auth';
import uploadRouter   from './routes/upload';
import profileRouter  from './routes/profile';

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health check ─────────────────────────────────────────────────────────────
const REQUIRED_ENV = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET',
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET',
  'TWITCH_CLIENT_ID',
  'TWITCH_CLIENT_SECRET',
  'API_URL',
  'FRONTEND_URL',
];

app.get('/health', async (_req: Request, res: Response) => {
  const missing = REQUIRED_ENV.filter((k) => !process.env[k]);

  if (missing.length > 0) {
    return res.status(200).json({
      status: 'degraded',
      database: 'not_configured',
      missing_env: missing,
      fix: 'Vercel Dashboard → Settings → Environment Variables',
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const { getSupabase } = require('./lib/supabaseClient');
    const { error } = await getSupabase().from('users').select('count').limit(1);
    return res.status(200).json({
      status: 'healthy',
      database: error ? `error: ${error.message}` : 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return res.status(200).json({
      status: 'degraded',
      database: `error: ${err.message}`,
      timestamp: new Date().toISOString(),
    });
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// ─── Локальный запуск ─────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`\n✅  CyberEden backend: http://localhost:${PORT}`);
    console.log(`    GET /health\n`);
  });
}

export default app;
