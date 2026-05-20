"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const packages: Record<string, { pts: number; bonus: number; priceMYR: number }> = {
  "100":   { pts: 100,   bonus: 0,    priceMYR: 1   },
  "500":   { pts: 500,   bonus: 0,    priceMYR: 5   },
  "1000":  { pts: 1000,  bonus: 50,   priceMYR: 10  },
  "2500":  { pts: 2500,  bonus: 150,  priceMYR: 25  },
  "5000":  { pts: 5000,  bonus: 500,  priceMYR: 50  },
  "10000": { pts: 10000, bonus: 1500, priceMYR: 100 },
};

function ResultContent() {
  const searchParams = useSearchParams();

  const billplzPaid = searchParams.get("billplz[paid]") === "true";
  const billId      = searchParams.get("billplz[id]") ?? "";
  const pkgId       = searchParams.get("pkg") ?? "";

  const isStripe      = searchParams.get("payment") === "stripe";
  const stripeCancelled = searchParams.get("cancelled") === "true";
  const stripeSession = searchParams.get("session_id") ?? "";

  const paid = isStripe ? (!stripeCancelled && !!stripeSession) : billplzPaid;
  const refId = isStripe ? stripeSession : billId;
  const pkg = packages[pkgId];
  const totalPts = pkg ? pkg.pts + pkg.bonus : 0;

  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  return (
    <div className={`min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="w-full max-w-md text-center">
        {paid ? (
          <>
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <span className="text-emerald-600 text-3xl">✓</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Top-Up Successful!</h1>
            {totalPts > 0 && (
              <p className="text-4xl font-extrabold text-[#f5a623] my-4">+{totalPts.toLocaleString()} pts</p>
            )}
            <p className="text-slate-500 dark:text-slate-400 mb-2">Your Ganjaran Points have been credited.</p>
            {refId && <p className="text-xs text-slate-400 mb-8">Ref: {refId.slice(0, 24)}{refId.length > 24 ? "…" : ""}</p>}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 mb-8 text-left">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">What&apos;s next?</p>
              <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✓</span> Points credited to your account instantly.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✓</span> Receipt sent to your email.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✓</span> Use your points to redeem rewards anytime.</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/marketplace?tab=rewards" className="bg-[#1b2660] hover:bg-[#141d4a] text-white font-bold px-8 py-3.5 rounded-full transition-colors">
                Redeem Rewards
              </Link>
              <Link href="/topup" className="border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-8 py-3.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Top Up Again
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-red-500 text-3xl">✕</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Payment Cancelled</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">No charges were made. Your balance is unchanged.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/topup" className="bg-[#1b2660] hover:bg-[#141d4a] text-white font-bold px-8 py-3.5 rounded-full transition-colors">
                Try Again
              </Link>
              <Link href="/" className="border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-8 py-3.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function TopUpResultPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh] text-slate-400">Loading…</div>}>
      <ResultContent />
    </Suspense>
  );
}
