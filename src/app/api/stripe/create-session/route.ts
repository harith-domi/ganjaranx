import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { rewards } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const { rewardId, email } = await req.json();

    if (!rewardId || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) {
      return NextResponse.json({ error: "Reward not found" }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const session = await createCheckoutSession({
      rewardId,
      rewardName: reward.title,
      amountMYR: reward.priceMYR,
      email,
      successUrl: `${baseUrl}/checkout/${rewardId}/result?payment=stripe&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/checkout/${rewardId}/result?payment=stripe&cancelled=true`,
    });

    return NextResponse.json({ sessionUrl: session.url, sessionId: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
  }
}
