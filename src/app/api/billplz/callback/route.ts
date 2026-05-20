import { NextRequest, NextResponse } from "next/server";
import { verifyXSignature } from "@/lib/billplz";

/* Billplz POSTs here after every payment (paid or failed). */
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = Object.fromEntries(new URLSearchParams(body));

    const xSig = params["x_signature"] ?? "";
    if (!verifyXSignature(params, xSig)) {
      console.warn("Billplz callback: invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const billId  = params["billplz[id]"];
    const paid    = params["billplz[paid]"] === "true";
    const paidAt  = params["billplz[paid_at]"];
    const rewardId = params["billplz[reference_1]"];

    if (paid) {
      // TODO: mark the redemption as paid in Supabase
      // e.g. await supabase.from("redemptions").update({ paid: true, paid_at: paidAt }).eq("bill_id", billId)
      console.log(`Payment confirmed — bill ${billId}, reward ${rewardId}, paid_at ${paidAt}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Billplz callback error:", err);
    return NextResponse.json({ error: "Callback error" }, { status: 500 });
  }
}
