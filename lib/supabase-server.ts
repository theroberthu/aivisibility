import { createClient } from "@supabase/supabase-js";

// Server-side client that bypasses RLS — only use in API routes and server components
export function getSupabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
