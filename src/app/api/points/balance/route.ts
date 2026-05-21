import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ balance: 0 });

    // Ensure wallet exists
    await supabaseAdmin.from("points_wallet").upsert({
      user_id: user.id,
      balance: 0,
      credited_refs: [],
    }, { onConflict: "user_id", ignoreDuplicates: true });

    const { data } = await supabaseAdmin
      .from("points_wallet")
      .select("balance")
      .eq("user_id", user.id)
      .single();

    return NextResponse.json({ balance: data?.balance ?? 0 });
  } catch (err) {
    console.error("Balance fetch error:", err);
    return NextResponse.json({ balance: 0 });
  }
}
