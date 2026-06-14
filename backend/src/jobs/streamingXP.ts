import { supabase } from '../lib/supabaseClient';
import axios from 'axios';

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
  tokenExpiresAt = Date.now() + (res.data.expires_in - 3600) * 1000;
  return twitchAppToken!;
}

const XP_PER_MINUTE = 1;
const MAX_MINUTES_PER_TICK = 10;

/**
 * Проверяет какие зарегистрированные киберы сейчас стримят на Twitch
 * и начисляет ПХ пропорционально прошедшим минутам с последней проверки.
 *
 * ВАЖНО: Vercel Hobby (бесплатный) план разрешает Cron Jobs максимум 1 раз в сутки.
 * Для запуска раз в минуту используй внешний сервис:
 *   https://cron-job.org (бесплатно, интервал от 1 минуты)
 *   URL: https://<backend>.vercel.app/api/cron/streaming-xp
 *   Header: Authorization: Bearer <CRON_SECRET>
 */
export async function checkStreamingXP(): Promise<{ checked: number; rewarded: number; details: any[] }> {
  const { data: users, error } = await supabase
    .from('users')
    .select('id, twitch_username, xp')
    .not('twitch_username', 'is', null);

  if (error || !users?.length) return { checked: 0, rewarded: 0, details: [] };

  const usernames = users
    .map(u => u.twitch_username!.toLowerCase().replace(/^@/, '').trim())
    .filter(Boolean);

  if (usernames.length === 0) return { checked: 0, rewarded: 0, details: [] };

  const details: any[] = [];

  try {
    const token  = await getTwitchAppToken();
    const params = usernames.map(u => `user_login=${encodeURIComponent(u)}`).join('&');

    const { data } = await axios.get(`https://api.twitch.tv/helix/streams?${params}`, {
      headers: { Authorization: `Bearer ${token}`, 'Client-Id': process.env.TWITCH_CLIENT_ID! },
    });

    const liveLogins = new Set<string>((data.data || []).map((s: any) => s.user_login.toLowerCase()));
    const now = new Date();
    let rewarded = 0;

    for (const user of users) {
      const login  = user.twitch_username!.toLowerCase().replace(/^@/, '');
      const isLive = liveLogins.has(login);

      const { data: state } = await supabase
        .from('streaming_xp_state')
        .select('last_checked_at, is_live')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!isLive) {
        await supabase.from('streaming_xp_state').upsert({
          user_id: user.id, last_checked_at: now.toISOString(), is_live: false,
        });
        details.push({ login, isLive, xp: 0, reason: 'offline' });
        continue;
      }

      let xpToAward = XP_PER_MINUTE;

      if (state?.last_checked_at && state.is_live) {
        const elapsedMs  = now.getTime() - new Date(state.last_checked_at).getTime();
        const elapsedMin = Math.floor(elapsedMs / 60_000);
        if (elapsedMin >= 1) {
          xpToAward = Math.min(elapsedMin, MAX_MINUTES_PER_TICK) * XP_PER_MINUTE;
        } else {
          await supabase.from('streaming_xp_state').upsert({
            user_id: user.id, last_checked_at: state.last_checked_at, is_live: true,
          });
          details.push({ login, isLive, xp: 0, reason: 'too soon' });
          continue;
        }
      }

      await supabase.from('users').update({ xp: (user.xp || 0) + xpToAward }).eq('id', user.id);
      await supabase.from('xp_logs').insert({
        user_id: user.id, amount: xpToAward,
        reason: `Стриминг на Twitch (${xpToAward} мин)`,
      });
      await supabase.from('streaming_xp_state').upsert({
        user_id: user.id, last_checked_at: now.toISOString(), is_live: true,
      });

      rewarded++;
      details.push({ login, isLive, xp: xpToAward });
    }

    return { checked: usernames.length, rewarded, details };
  } catch (e: any) {
    console.error('[StreamingXP] Twitch API error:', e.message);
    return { checked: usernames.length, rewarded: 0, details: [{ error: e.message }] };
  }
}
