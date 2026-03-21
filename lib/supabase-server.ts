import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side client that bypasses RLS — only use in API routes and server components
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);
