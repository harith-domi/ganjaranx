import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { pts, refId, packageId, paymentMethod } = await req.json();
    if (!pts || !refId) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // Upsert the transaction record (creates if webhook hasn't run yet)
    await supabaseAdmin.from("transactions").upsert({
      ref_id: refId,
      type: "topup",
      user_id: user.id,
      email: user.email,
      package_id: packageId ?? null,
      points: pts,
      payment_method: paymentMethod ?? "stripe",
      status: "confirmed",
      paid_at: new Date().toISOString(),
    }, { onConflict: "ref_id", ignoreDuplicates: false });

    // Credit wallet atomically (idempotent via credited_refs array)
    const { data: credited } = await supabaseAdmin.rpc("credit_points", {
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

    return NextResponse.json({ balance: wallet?.balance ?? 0, credited });
  } catch (err) {
    console.error("Credit points error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
