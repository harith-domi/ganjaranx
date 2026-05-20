import { NextRequest, NextResponse } from "next/server";
import { createBill } from "@/lib/billplz";

const packages: Record<string, { pts: number; bonus: number; priceMYR: number; label: string }> = {
  "100":   { pts: 100,   bonus: 0,    priceMYR: 1,   label: "Starter"  },
  "200":   { pts: 200,   bonus: 0,    priceMYR: 2,   label: "Bronze"   },
  "500":   { pts: 500,   bonus: 0,    priceMYR: 5,   label: "Basic"    },
  "1000":  { pts: 1000,  bonus: 50,   priceMYR: 10,  label: "Popular"  },
  "2500":  { pts: 2500,  bonus: 150,  priceMYR: 25,  label: "Value"    },
  "5000":  { pts: 5000,  bonus: 500,  priceMYR: 50,  label: "Premium"  },
  "10000": { pts: 10000, bonus: 1500, priceMYR: 100, label: "Ultimate" },
};

export async function POST(req: NextRequest) {
  try {
    const { packageId, name, email } = await req.json();
    if (!packageId || !name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const pkg = packages[packageId];
    if (!pkg) return NextResponse.json({ error: "Invalid package" }, { status: 404 });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const totalPts = pkg.pts + pkg.bonus;

    const bill = await createBill({
      name,
      email,
      amount: pkg.priceMYR * 100,
      description: `GanjaranX Top-Up — ${pkg.label} (${totalPts.toLocaleString()} pts)`,
      rewardId: `topup-${packageId}`,
      callbackUrl: `${baseUrl}/api/billplz/callback`,
      redirectUrl: `${baseUrl}/topup/result?pkg=${packageId}`,
    });

    return NextResponse.json({ billUrl: bill.url, billId: bill.id });
  } catch (err) {
    console.error("Billplz topup error:", err);
    return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
  }
}
