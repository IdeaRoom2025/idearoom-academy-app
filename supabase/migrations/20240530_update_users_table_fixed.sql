-- Add new columns to users table if they don't exist
DO $$ 
BEGIN
    -- Check if last_name column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'last_name') THEN
        ALTER TABLE users ADD COLUMN last_name TEXT;
    END IF;
    
    -- Check if birth_date column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'birth_date') THEN
        ALTER TABLE users ADD COLUMN birth_date TEXT;
    END IF;
    
    -- Check if course column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'course') THEN
        ALTER TABLE users ADD COLUMN course TEXT;
    END IF;
END $$;

-- Update RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON users;

-- Create new policies
CREATE POLICY "Users can view their own data"
ON users
FOR SELECT
USING (auth.uid() = id);
