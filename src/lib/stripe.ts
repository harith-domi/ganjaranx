const STRIPE_API = "https://api.stripe.com/v1";

function cleanKey(raw: string | undefined): string {
  // Strip BOM (U+FEFF, charCode 65279) that PowerShell injects on Windows, plus whitespace
  return (raw ?? "").split("").filter(c => c.charCodeAt(0) !== 0xFEFF).join("").trim();
}

function authHeader() {
  return `Bearer ${cleanKey(process.env.STRIPE_SECRET_KEY)}`;
}

export interface StripeSessionParams {
  rewardId: string;
  rewardName: string;
  amountMYR: number;   // in RM (will convert to sen)
  email: string;
  successUrl: string;
  cancelUrl: string;
}

export interface StripeSession {
  id: string;
  url: string;
  payment_status: string;
}

export async function createCheckoutSession(
  params: StripeSessionParams
): Promise<StripeSession> {
  const body = new URLSearchParams({
    "payment_method_types[]": "card",
    "line_items[0][price_data][currency]": "myr",
    "line_items[0][price_data][unit_amount]": String(params.amountMYR * 100),
    "line_items[0][price_data][product_data][name]": `GanjaranX — ${params.rewardName}`,
    "line_items[0][price_data][product_data][description]": "GanjaranX reward redemption",
    "line_items[0][quantity]": "1",
    mode: "payment",
    customer_email: params.email,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    "metadata[reward_id]": params.rewardId,
  });

  const res = await fetch(`${STRIPE_API}/checkout/sessions`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Stripe session creation failed: ${err}`);
  }

  return res.json();
}

export async function getCheckoutSession(sessionId: string): Promise<StripeSession> {
  const res = await fetch(`${STRIPE_API}/checkout/sessions/${sessionId}`, {
    headers: { Authorization: authHeader() },
  });

  if (!res.ok) throw new Error("Failed to retrieve Stripe session");
  return res.json();
}

export function verifyWebhookSignature(
  payload: string,
  sigHeader: string,
  secret: string
): boolean {
  try {
    const crypto = require("crypto");
    const parts = Object.fromEntries(
      sigHeader.split(",").map((p) => p.split("=") as [string, string])
    );
    const timestamp = parts["t"];
    const sig = parts["v1"];
    const signed = `${timestamp}.${payload}`;
    const expected = crypto
      .createHmac("sha256", secret)
      .update(signed)
      .digest("hex");
    return expected === sig;
  } catch {
    return false;
  }
}
