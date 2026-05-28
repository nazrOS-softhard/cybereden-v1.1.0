import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Standalone Supabase module — разрывает circular dependency с server.ts.
 * Все роуты импортируют отсюда, никто не импортирует из server.ts.
 * Клиент создаётся лениво (при первом вызове), поэтому отсутствие
 * env vars не крашит функцию при загрузке модуля.
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

  _client = createClient(url, key);
  return _client;
}

// Proxy: методы вызываются лениво при обращении, а не при импорте модуля.
// Это исключает крэш при загрузке функции если env vars не заданы.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop: string | symbol) {
    const client = getSupabase();
    const value  = (client as any)[prop as string];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
