
const API_BASE_URL = 
  process.env.VITE_API_URL || 
  'http://localhost:3001';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';

export { API_BASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY };
