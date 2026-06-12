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

/**
 * Проверяет какие зарегистрированные киберы сейчас стримят на Twitch
 * и начисляет +1 ПХ за каждую минуту стрима.
 *
 * Запускать раз в минуту: setInterval(checkStreamingXP, 60_000)
 * или через Vercel Cron (см. vercel.json ниже).
 */
export async function checkStreamingXP(): Promise<{ checked: number; rewarded: number }> {
  const { data: users, error } = await supabase
    .from('users')
    .select('id, twitch_username, xp')
    .not('twitch_username', 'is', null);

  if (error || !users?.length) return { checked: 0, rewarded: 0 };

  const usernames = users
    .map(u => u.twitch_username!.toLowerCase().replace(/^@/, '').trim())
    .filter(Boolean);

  if (usernames.length === 0) return { checked: 0, rewarded: 0 };

  try {
    const token  = await getTwitchAppToken();
    const params = usernames.map(u => `user_login=${encodeURIComponent(u)}`).join('&');

    const { data } = await axios.get(`https://api.twitch.tv/helix/streams?${params}`, {
      headers: { Authorization: `Bearer ${token}`, 'Client-Id': process.env.TWITCH_CLIENT_ID! },
    });

    const liveLogins = new Set<string>((data.data || []).map((s: any) => s.user_login.toLowerCase()));
    let rewarded = 0;

    for (const user of users) {
      const login = user.twitch_username!.toLowerCase().replace(/^@/, '');
      if (!liveLogins.has(login)) continue;

      // Начисляем +1 ПХ за минуту стрима
      await supabase.from('users').update({ xp: (user.xp || 0) + XP_PER_MINUTE }).eq('id', user.id);
      await supabase.from('xp_logs').insert({
        user_id: user.id, amount: XP_PER_MINUTE, reason: 'Стриминг на Twitch (1 минута)',
      });
      rewarded++;
    }

    return { checked: usernames.length, rewarded };
  } catch (e: any) {
    console.error('[StreamingXP] Twitch API error:', e.message);
    return { checked: usernames.length, rewarded: 0 };
  }
}
