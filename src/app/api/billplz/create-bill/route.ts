import { NextRequest, NextResponse } from "next/server";
import { createBill } from "@/lib/billplz";
import { rewards } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const { rewardId, name, email } = await req.json();

    if (!rewardId || !name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) {
      return NextResponse.json({ error: "Reward not found" }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const bill = await createBill({
      name,
      email,
      amount: reward.priceMYR * 100, // convert RM → sen
      description: `GanjaranX — ${reward.title}`,
      rewardId,
      callbackUrl: `${baseUrl}/api/billplz/callback`,
      redirectUrl: `${baseUrl}/checkout/${rewardId}/result`,
    });

    return NextResponse.json({ billUrl: bill.url, billId: bill.id });
  } catch (err) {
    console.error("Billplz error:", err);
    return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
  }
}
