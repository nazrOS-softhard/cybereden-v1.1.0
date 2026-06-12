import { Router, Request, Response } from 'express';
import { checkStreamingXP } from '../jobs/streamingXP';

const router = Router();

// ─── GET /api/cron/streaming-xp ───────────────────────────────────────────────
// Вызывается Vercel Cron каждую минуту (см. vercel.json в корне проекта)
router.get('/streaming-xp', async (req: Request, res: Response): Promise<any> => {
  // Vercel Cron отправляет заголовок Authorization: Bearer CRON_SECRET
  const auth = req.headers.authorization;
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = await checkStreamingXP();
  return res.json({ success: true, ...result, timestamp: new Date().toISOString() });
});

export default router;
