import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Критическая ошибка: отсутствуют переменные SUPABASE_URL или SUPABASE_ANON_KEY в .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
