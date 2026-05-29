import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import authRouter    from './routes/auth';
import uploadRouter  from './routes/upload';
import profileRouter from './routes/profile';
import usersRouter   from './routes/users';   // ← новый

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',').map(o => o.trim());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) cb(null, true);
    else cb(new Error(`CORS: ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health ───────────────────────────────────────────────────────────────────
const REQUIRED_ENV = ['SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY','JWT_SECRET',
  'GITHUB_CLIENT_ID','GITHUB_CLIENT_SECRET','TWITCH_CLIENT_ID','TWITCH_CLIENT_SECRET',
  'API_URL','FRONTEND_URL'];

app.get('/health', async (_req: Request, res: Response) => {
  const missing = REQUIRED_ENV.filter(k => !process.env[k]);
  if (missing.length) return res.json({ status: 'degraded', missing_env: missing });
  try {
    const { error } = await (await import('./lib/supabaseClient')).getSupabase().from('users').select('count').limit(1);
    return res.json({ status: 'healthy', database: error ? `error: ${error.message}` : 'connected', timestamp: new Date().toISOString() });
  } catch (e: any) {
    return res.json({ status: 'degraded', database: e.message });
  }
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',    authRouter);
app.use('/api/upload',  uploadRouter);
app.use('/api/profile', profileRouter);
app.use('/api/users',   usersRouter);     // ← новый

app.use((_req: Request, res: Response) => res.status(404).json({ error: 'Route not found' }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ error: err.message });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`✅ CyberEden: http://localhost:${PORT}`));
}

export default app;
