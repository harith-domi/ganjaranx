import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { pts, refId } = await req.json();
    if (!pts || !refId) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // Idempotency: claim this transaction for this user (only succeeds once)
    const { data: claimed } = await supabaseAdmin.rpc("credit_points", {
      p_ref_id: refId,
      p_user_id: user.id,
      p_amount: pts,
    });

    // Get updated balance
    const { data: wallet } = await supabaseAdmin
      .from("points_wallet")
      .select("balance")
      .eq("user_id", user.id)
      .single();

    return NextResponse.json({ balance: wallet?.balance ?? 0, credited: claimed });
  } catch (err) {
    console.error("Credit points error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
