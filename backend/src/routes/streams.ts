
import { Router, Request, Response } from 'express';
import axios from 'axios';
import { supabase } from '../lib/supabaseClient';

const router = Router();

// Кэш app access token (действует 60 дней, но обновляем заранее)
let twitchAppToken: string | null = null;
let tokenExpiresAt = 0;

async function getTwitchAppToken(): Promise<string> {
  if (twitchAppToken && Date.now() < tokenExpiresAt) return twitchAppToken;

  const res = await axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: {
      client_id:     process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type:    'client_credentials',
    },
  });

  twitchAppToken = res.data.access_token;
  // Обновляем за 1 час до истечения
  tokenExpiresAt = Date.now() + (res.data.expires_in - 3600) * 1000;
  return twitchAppToken!;
}

// ─── GET /api/streams/live ─────────────────────────────────────────────────────
// Возвращает live-стримы всех зарегистрированных юзеров CyberEden с Twitch
router.get('/live', async (_req: Request, res: Response): Promise<any> => {
  try {
    // Получаем всех юзеров с Twitch аккаунтом
    const { data: users, error } = await supabase
      .from('users')
      .select('id, display_name, twitch_username, avatar_url')
      .not('twitch_username', 'is', null);

    if (error) return res.status(500).json({ error: error.message });
    if (!users || users.length === 0) return res.json({ streams: [] });

    const usernames = users.map(u => u.twitch_username!);

    // Запрашиваем Twitch Helix API — кто сейчас live
    const token = await getTwitchAppToken();

    // Helix позволяет до 100 login в одном запросе
    const params = usernames.slice(0, 100).map(u => `user_login=${u}`).join('&');
    const twitchRes = await axios.get(`https://api.twitch.tv/helix/streams?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id':   process.env.TWITCH_CLIENT_ID!,
      },
    });

    const liveStreams = twitchRes.data.data as any[];

    // Обогащаем данными из нашей БД
    const enriched = liveStreams.map(stream => {
      const user = users.find(u => u.twitch_username?.toLowerCase() === stream.user_login.toLowerCase());
      return {
        id:             stream.id,
        twitch_login:   stream.user_login,
        display_name:   user?.display_name || stream.user_name,
        cyber_user_id:  user?.id || null,
        avatar_url:     user?.avatar_url || stream.thumbnail_url?.replace('{width}', '50').replace('{height}', '50'),
        title:          stream.title,
        game:           stream.game_name,
        viewers:        stream.viewer_count,
        thumbnail:      stream.thumbnail_url?.replace('{width}', '440').replace('{height}', '248'),
        started_at:     stream.started_at,
        tags:           stream.tags || [],
      };
    });

    // Сортируем по зрителям
    enriched.sort((a, b) => b.viewers - a.viewers);

    return res.json({ streams: enriched });
  } catch (err: any) {
    console.error('[Streams API]', err.message);
    // Если Twitch не отвечает — возвращаем пустой список, не ломаем страницу
    return res.json({ streams: [], error: 'Twitch API unavailable' });
  }
});

// ─── GET /api/streams/stream-key ─────────────────────────────────────────────
// Для авторизованных: инфо по настройке стрима (RTMP endpoint и т.д.)
router.get('/info', (_req: Request, res: Response) => {
  res.json({
    rtmp_server:    'rtmp://live.twitch.tv/live',
    rtmp_server_eu: 'rtmp://live-fra.twitch.tv/live',
    docs:           'https://help.twitch.tv/s/article/streaming-guide',
    twitch_studio:  'https://dashboard.twitch.tv/u/me/stream-manager',
    obs_settings: {
      service:  'Twitch',
      server:   'rtmp://live.twitch.tv/live',
      encoder:  'x264 или NVENC',
      bitrate:  '3000-6000 Kbps',
      keyframe: '2 sec',
      preset:   'veryfast',
    },
  });
});

export default router;
