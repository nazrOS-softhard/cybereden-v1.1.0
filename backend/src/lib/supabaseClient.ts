import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export let supabase: SupabaseClient;

try {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set');
  }
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (e: any) {
  console.error('[Supabase Init Error]', e.message);
  // Создаём заглушку, чтобы роуты не падали при импорте модуля
  supabase = {} as SupabaseClient;
}
