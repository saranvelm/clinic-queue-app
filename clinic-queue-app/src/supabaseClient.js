import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zjmyukyrtsxwgiahzuuc.supabase.co';
const supabaseAnonKey = 'sb_publishable_gyiToJywsaO8mzh8AvocRQ_2LUVC9sj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
