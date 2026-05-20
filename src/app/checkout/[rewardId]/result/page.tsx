"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { rewards } from "@/lib/data";

function ResultContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rewardId = params.rewardId as string;
  const reward = rewards.find((r) => r.id === rewardId);

  // Billplz params
  const billplzPaid = searchParams.get("billplz[paid]") === "true";
  const billId = searchParams.get("billplz[id]") ?? "";

  // Stripe params
  const paymentProvider = searchParams.get("payment");
  const stripeCancelled = searchParams.get("cancelled") === "true";
  const stripeSessionId = searchParams.get("session_id") ?? "";

  // Determine overall paid state
  const isStripe = paymentProvider === "stripe";
  const paid = isStripe ? (!stripeCancelled && !!stripeSessionId) : billplzPaid;
  const refId = isStripe ? stripeSessionId : billId;
  const providerLabel = isStripe ? "Stripe" : "Billplz";

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="w-full max-w-md text-center">
        {paid ? (
          <>
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <span className="text-emerald-600 text-3xl">✓</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Payment Successful!</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-2">
              Your redemption of{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">{reward?.title ?? "your reward"}</span>{" "}
              is confirmed.
            </p>
            {refId && (
              <p className="text-xs text-slate-400 mb-8">{providerLabel} ref: {refId.slice(0, 24)}{refId.length > 24 ? "…" : ""}</p>
            )}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 mb-8 text-left">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">What&apos;s next?</p>
              <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✓</span> A confirmation email has been sent.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✓</span> Your Ganjaran Points will be credited within 24 hours.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✓</span> Your reward voucher will be delivered to your email.</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/marketplace?tab=rewards" className="bg-[#1b2660] hover:bg-[#141d4a] text-white font-bold px-8 py-3.5 rounded-full transition-colors">
                Browse More Rewards
              </Link>
              <Link href="/" className="border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-8 py-3.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Back to Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-red-500 text-3xl">✕</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Payment Cancelled</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Your payment was not completed. No charges were made.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/checkout/${rewardId}`} className="bg-[#1b2660] hover:bg-[#141d4a] text-white font-bold px-8 py-3.5 rounded-full transition-colors">
                Try Again
              </Link>
              <Link href={`/rewards/${rewardId}`} className="border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-8 py-3.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Back to Reward
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh] text-slate-400">Loading…</div>}>
      <ResultContent />
    </Suspense>
  );
}
