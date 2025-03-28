import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://pnvtegstxozyxvuqgckc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudnRlZ3N0eG96eXh2dXFnY2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NzgxOTksImV4cCI6MjA1NzU1NDE5OX0.0_sUHEKjHlli9hX6vPc6GtbPFYcUNUbWb6IUxnSSXVQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
