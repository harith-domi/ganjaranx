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

    // 1. Ensure profile row exists
    await supabaseAdmin.from("profiles").upsert({
      id: user.id,
      email: user.email?.toLowerCase(),
      name: user.user_metadata?.name ?? null,
    }, { onConflict: "id", ignoreDuplicates: true });

    // 2. Ensure wallet row exists (creates with 0 balance if missing)
    await supabaseAdmin.from("points_wallet").upsert({
      user_id: user.id,
      balance: 0,
      credited_refs: [],
    }, { onConflict: "user_id", ignoreDuplicates: true });

    // 3. Upsert transaction record
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

    // 4. Credit points atomically (idempotent via credited_refs)
    const { data: credited, error: rpcError } = await supabaseAdmin.rpc("credit_points", {
      p_ref_id: refId,
      p_user_id: user.id,
      p_amount: pts,
    });

    if (rpcError) console.error("credit_points RPC error:", rpcError);

    // 5. Always return the latest balance
    const { data: wallet } = await supabaseAdmin
      .from("points_wallet")
      .select("balance")
      .eq("user_id", user.id)
      .single();

    console.log(`Credit result — user ${user.id}, ref ${refId}, pts ${pts}, credited: ${credited}, balance: ${wallet?.balance}`);

    return NextResponse.json({ balance: wallet?.balance ?? 0, credited });
  } catch (err) {
    console.error("Credit points error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
