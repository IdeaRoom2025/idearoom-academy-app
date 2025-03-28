-- Add phone field to users table if it doesn't exist
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone TEXT;

-- Enable realtime for users table
alter publication supabase_realtime add table users;
