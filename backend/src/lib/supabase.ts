import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Отдельный модуль для Supabase — разрывает circular dependency.
 * server.ts импортирует routes, routes импортируют этот файл.
 * Никто не импортирует server.ts → нет зависимости.
 *
 * Клиент создаётся лениво (при первом вызове getSupabase()),
 * поэтому отсутствие env vars не крашит модуль при загрузке.
 */

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in Vercel Environment Variables'
    );
  }

  _client = createClient(url, key);
  return _client;
}

// Прокси-объект: методы вызываются лениво, не при импорте
// Это позволяет роутам импортировать { supabase } как обычно
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop: string | symbol) {
    const client = getSupabase();
    const value = (client as any)[prop as string];
    // Привязываем методы к клиенту чтобы не терять контекст
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
