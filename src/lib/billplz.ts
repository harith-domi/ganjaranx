import crypto from "crypto";

const BASE_URL =
  process.env.BILLPLZ_ENV === "production"
    ? "https://www.billplz.com/api/v3"
    : "https://www.billplz-sandbox.com/api/v3";

const BILL_BASE =
  process.env.BILLPLZ_ENV === "production"
    ? "https://www.billplz.com/bills"
    : "https://www.billplz-sandbox.com/bills";

function authHeader() {
  const token = Buffer.from(`${process.env.BILLPLZ_API_KEY}:`).toString("base64");
  return `Basic ${token}`;
}

export interface CreateBillParams {
  name: string;
  email: string;
  amount: number;        // in sen (RM × 100)
  description: string;
  rewardId: string;
  callbackUrl: string;
  redirectUrl: string;
}

export interface BillplzBill {
  id: string;
  collection_id: string;
  paid: boolean;
  state: string;
  amount: number;
  paid_amount: number;
  email: string;
  name: string;
  url: string;
}

export async function createBill(params: CreateBillParams): Promise<BillplzBill> {
  const body = new URLSearchParams({
    collection_id: process.env.BILLPLZ_COLLECTION_ID!,
    email: params.email,
    name: params.name,
    amount: String(params.amount),
    description: params.description,
    callback_url: params.callbackUrl,
    redirect_url: params.redirectUrl,
    "reference_1_label": "Reward ID",
    "reference_1": params.rewardId,
  });

  const res = await fetch(`${BASE_URL}/bills`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Billplz create bill failed: ${err}`);
  }

  return res.json();
}

export function verifyXSignature(
  params: Record<string, string>,
  receivedSig: string
): boolean {
  const key = process.env.BILLPLZ_X_SIGNATURE_KEY!;
  const source = [
    params["billplz[collection_id]"] ?? "",
    params["billplz[id]"] ?? "",
    params["billplz[paid]"] ?? "",
    params["billplz[paid_at]"] ?? "",
  ].join("|");

  const computed = crypto
    .createHmac("sha256", key)
    .update(source)
    .digest("hex");

  return computed === receivedSig;
}

export function billUrl(billId: string) {
  return `${BILL_BASE}/${billId}`;
}
