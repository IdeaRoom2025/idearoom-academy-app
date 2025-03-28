-- Disable RLS for users table
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations on users table
DROP POLICY IF EXISTS "Allow all operations" ON public.users;
CREATE POLICY "Allow all operations"
ON public.users
FOR ALL
USING (true)
WITH CHECK (true);
