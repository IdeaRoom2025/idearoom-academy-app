-- Add new fields to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS birth_date DATE,
ADD COLUMN IF NOT EXISTS course TEXT;

alter publication supabase_realtime add table users;
