import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

const packages: Record<string, { pts: number; bonus: number; priceMYR: number }> = {
  "200":   { pts: 200,   bonus: 0,    priceMYR: 2   },
  "500":   { pts: 500,   bonus: 0,    priceMYR: 5   },
  "1000":  { pts: 1000,  bonus: 50,   priceMYR: 10  },
  "2500":  { pts: 2500,  bonus: 150,  priceMYR: 25  },
  "5000":  { pts: 5000,  bonus: 500,  priceMYR: 50  },
  "10000": { pts: 10000, bonus: 1500, priceMYR: 100 },
};

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
      const packageId = session.metadata?.reward_id?.replace("topup-", "");
      const email = session.customer_email;
      const paid = session.payment_status === "paid";

      if (paid) {
        const pkg = packageId ? packages[packageId] : null;
        const totalPts = pkg ? pkg.pts + pkg.bonus : null;

        // Save transaction
        await supabaseAdmin.from("transactions").upsert({
          ref_id: session.id,
          type: "topup",
          payment_method: "stripe",
          email,
          package_id: packageId,
          points: totalPts,
          amount_myr: pkg?.priceMYR ?? null,
          status: "confirmed",
          paid_at: new Date().toISOString(),
        }, { onConflict: "ref_id" });

        // Credit user's wallet if they have an account
        if (email && totalPts) {
          const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("id")
            .eq("email", email.toLowerCase())
            .single();

          if (profile) {
            await supabaseAdmin.rpc("increment_balance", {
              p_user_id: profile.id,
              p_amount: totalPts,
            });
            console.log(`Credited ${totalPts} pts to user ${profile.id}`);
          }
        }

        console.log(`Stripe confirmed — session ${session.id}, ${totalPts} pts for ${email}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
