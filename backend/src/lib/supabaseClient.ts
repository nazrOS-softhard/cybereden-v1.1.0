
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Параноидальная проверка на случай, если забыли добавить переменные окружения в Vercel
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Критическая ошибка: отсутствуют переменные SUPABASE_URL или SUPABASE_ANON_KEY в .env');
}

// Экспортируем чистый инстанс
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
