import { NextRequest, NextResponse } from "next/server";
import { verifyXSignature } from "@/lib/billplz";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

    const billId   = params["billplz[id]"];
    const paid     = params["billplz[paid]"] === "true";
    const paidAt   = params["billplz[paid_at]"];
    const email    = params["billplz[email]"] ?? null;
    const packageId = params["billplz[reference_1]"] ?? null;

    if (paid) {
      const packages: Record<string, { pts: number; bonus: number; priceMYR: number }> = {
        "200":   { pts: 200,   bonus: 0,    priceMYR: 2   },
        "500":   { pts: 500,   bonus: 0,    priceMYR: 5   },
        "1000":  { pts: 1000,  bonus: 50,   priceMYR: 10  },
        "2500":  { pts: 2500,  bonus: 150,  priceMYR: 25  },
        "5000":  { pts: 5000,  bonus: 500,  priceMYR: 50  },
        "10000": { pts: 10000, bonus: 1500, priceMYR: 100 },
      };

      const pkg = packageId ? packages[packageId] : null;
      const totalPts = pkg ? pkg.pts + pkg.bonus : null;

      const { error } = await supabaseAdmin
        .from("transactions")
        .upsert({
          ref_id: billId,
          type: "topup",
          payment_method: "billplz",
          email: email,
          package_id: packageId,
          points: totalPts,
          amount_myr: pkg?.priceMYR ?? null,
          status: "confirmed",
          paid_at: paidAt,
        }, { onConflict: "ref_id" });

      if (error) {
        console.error("Billplz DB save error:", error);
      } else {
        console.log(`Billplz payment saved — bill ${billId}, ${totalPts} pts for ${email}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Billplz callback error:", err);
    return NextResponse.json({ error: "Callback error" }, { status: 500 });
  }
}
