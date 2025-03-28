// supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type CookieOptions } from "@supabase/ssr";

export const createClient = async () => {
  let cookieStore;

  try {
    // Get cookies in App Router
    cookieStore = cookies();
  } catch (error) {
    // Fallback if cookies() is unavailable
    cookieStore = {
      getAll: () => [],
      get: () => undefined,
      has: () => false,
      set: () => {},
      delete: () => {},
    };
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // Handle error if needed
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.delete(name, options);
          } catch (error) {
            // Handle error if needed
          }
        },
      },
    }
  );
};
