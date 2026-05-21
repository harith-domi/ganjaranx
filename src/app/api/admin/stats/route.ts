import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase-server";

const ADMIN_EMAIL = "dominasihijau316@gmail.com";

export async function GET() {
  // Verify admin
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [waitlist, contacts, transactions, profiles] = await Promise.all([
    supabaseAdmin.from("waitlist").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("contact_submissions").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("transactions").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("profiles").select("id, name, email, created_at").order("created_at", { ascending: false }),
  ]);

  return NextResponse.json({
    waitlist: waitlist.data ?? [],
    contacts: contacts.data ?? [],
    transactions: transactions.data ?? [],
    users: profiles.data ?? [],
  });
}
