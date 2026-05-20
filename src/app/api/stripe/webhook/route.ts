import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature") ?? "";
    const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

    if (secret && !verifyWebhookSignature(payload, sig, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(payload);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const rewardId = session.metadata?.reward_id;
      const email = session.customer_email;
      const paid = session.payment_status === "paid";

      if (paid) {
        // TODO: mark redemption as paid in Supabase
        console.log(`Stripe payment confirmed — reward ${rewardId}, email ${email}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
