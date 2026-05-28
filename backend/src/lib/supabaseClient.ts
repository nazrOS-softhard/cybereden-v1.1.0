import { createClient, SupabaseClient } from '@supabase/supabase-js';
import ws from 'ws';

/**
 * Standalone Supabase module — нет circular dependency с server.ts.
 * ws-пакет нужен потому что Node.js 20 не имеет нативного WebSocket.
 * Node.js 22+ имеет встроенный — там ws игнорируется автоматически.
 */

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables'
    );
  }

  _client = createClient(url, key, {
    realtime: {
      transport: ws,     // ← фикс для Node.js < 22
    },
  });

  return _client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop: string | symbol) {
    const client = getSupabase();
    const value  = (client as any)[prop as string];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
