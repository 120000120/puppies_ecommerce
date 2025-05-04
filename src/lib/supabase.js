import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// More descriptive error message to help with debugging
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Environment variables are not loaded:', {
    REACT_APP_SUPABASE_URL: supabaseUrl,
    REACT_APP_SUPABASE_ANON_KEY: supabaseAnonKey
  });
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);