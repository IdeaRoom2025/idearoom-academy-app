-- Add new columns to users table if they don't exist
DO $$ 
BEGIN
    -- Check and add last_name column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'last_name') THEN
        ALTER TABLE users ADD COLUMN last_name TEXT;
    END IF;
    
    -- Check and add birth_date column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'birth_date') THEN
        ALTER TABLE users ADD COLUMN birth_date TEXT;
    END IF;
    
    -- Check and add course column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'course') THEN
        ALTER TABLE users ADD COLUMN course TEXT;
    END IF;
    
    -- Check and add phone column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'phone') THEN
        ALTER TABLE users ADD COLUMN phone TEXT;
    END IF;
END $$;

-- Enable realtime for the users table
alter publication supabase_realtime add table users;
