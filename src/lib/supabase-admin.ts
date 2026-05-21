import { createClient } from "@supabase/supabase-js";

function clean(val: string | undefined): string {
  return (val ?? "").replace(/[﻿\r\n]/g, "").trim();
}

const supabaseUrl = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseServiceKey = clean(process.env.SUPABASE_SERVICE_ROLE_KEY);

// Server-side only — never expose this client to the browser
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});
