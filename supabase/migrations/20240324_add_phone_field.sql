-- Add phone field to users table if it doesn't exist
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone TEXT;
