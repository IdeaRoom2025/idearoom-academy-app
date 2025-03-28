-- Add phone field to users table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'phone') THEN
    ALTER TABLE public.users ADD COLUMN phone TEXT;
  END IF;
END $$;

-- Enable realtime for users table
alter publication supabase_realtime add table users;
