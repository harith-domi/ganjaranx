import { createBrowserClient } from "@supabase/ssr";

function clean(val: string | undefined): string {
  return (val ?? "").replace(/[﻿\r\n]/g, "").trim();
}

export function createClient() {
  return createBrowserClient(
    clean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}
