"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { rewards, VERTICAL_LABELS, VERTICAL_COLORS } from "@/lib/data";

const verticalBar: Record<string, string> = {
  property: "bg-blue-500", ev: "bg-emerald-500", digital: "bg-violet-500",
  fnb: "bg-orange-500", health: "bg-rose-500", travel: "bg-cyan-500",
};

type PaymentMethod = "billplz" | "stripe";

export default function CheckoutPage() {
  const params = useParams();
  const rewardId = params.rewardId as string;
  const reward = rewards.find((r) => r.id === rewardId);

  const [method, setMethod] = useState<PaymentMethod>("billplz");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!reward) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <p className="text-slate-500 mb-4">Reward not found.</p>
        <Link href="/marketplace?tab=rewards" className="text-[#f5a623] font-semibold">Back to rewards</Link>
      </div>
    );
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (method === "billplz") {
        const res = await fetch("/api/billplz/create-bill", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rewardId, name, email }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
        window.location.href = data.billUrl;

      } else {
        const res = await fetch("/api/stripe/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rewardId, email }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
        window.location.href = data.sessionUrl;
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

        {/* Back */}
        <Link href={`/rewards/${reward.id}`}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#f5a623] transition-colors mb-8">
          ← Back to reward
        </Link>

        {/* Reward summary */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden mb-6">
          <div className={`h-1.5 ${verticalBar[reward.vertical]}`} />
          <div className="p-5 flex items-start justify-between gap-4">
            <div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${VERTICAL_COLORS[reward.vertical]} mb-2 inline-block`}>
                {VERTICAL_LABELS[reward.vertical]}
              </span>
              <h2 className="font-bold text-slate-900 dark:text-white">{reward.title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{reward.vendor}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-extrabold text-[#f5a623]">{reward.value}</p>
              <p className="text-xs text-slate-400">{reward.pointCost.toLocaleString()} pts</p>
            </div>
          </div>
        </div>

        {/* Checkout form */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">

          {/* Amount */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Amount to pay</span>
            <span className="text-2xl font-extrabold text-[#1b2660] dark:text-[#f5a623]">RM {reward.priceMYR}.00</span>
          </div>

          {/* Payment method selector */}
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Choose payment method</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Billplz */}
            <button
              type="button"
              onClick={() => setMethod("billplz")}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                method === "billplz"
                  ? "border-[#1b2660] bg-[#1b2660]/5 dark:border-[#f5a623] dark:bg-[#f5a623]/5"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#002060] flex items-center justify-center">
                <span className="text-white font-extrabold text-sm">B</span>
              </div>
              <div className="text-center">
                <p className={`text-sm font-bold ${method === "billplz" ? "text-[#1b2660] dark:text-[#f5a623]" : "text-slate-700 dark:text-slate-300"}`}>
                  Billplz
                </p>
                <p className="text-xs text-slate-400 mt-0.5">FPX · Online Banking</p>
              </div>
              {method === "billplz" && (
                <span className="text-xs bg-[#1b2660] dark:bg-[#f5a623] text-white dark:text-[#1b2660] px-2 py-0.5 rounded-full font-semibold">Selected</span>
              )}
            </button>

            {/* Stripe */}
            <button
              type="button"
              onClick={() => setMethod("stripe")}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                method === "stripe"
                  ? "border-[#635bff] bg-[#635bff]/5 dark:border-[#635bff] dark:bg-[#635bff]/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#635bff] flex items-center justify-center">
                <span className="text-white font-extrabold text-sm">S</span>
              </div>
              <div className="text-center">
                <p className={`text-sm font-bold ${method === "stripe" ? "text-[#635bff]" : "text-slate-700 dark:text-slate-300"}`}>
                  Stripe
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Visa · Mastercard · Amex</p>
              </div>
              {method === "stripe" && (
                <span className="text-xs bg-[#635bff] text-white px-2 py-0.5 rounded-full font-semibold">Selected</span>
              )}
            </button>
          </div>

          {/* What each method supports */}
          <div className={`text-xs rounded-xl px-4 py-3 mb-6 ${
            method === "billplz"
              ? "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400"
              : "bg-violet-50 dark:bg-violet-950/20 text-violet-700 dark:text-violet-400"
          }`}>
            {method === "billplz"
              ? "✓ Supports all major Malaysian banks via FPX — Maybank, CIMB, Public Bank, RHB, and more."
              : "✓ Supports international cards — Visa, Mastercard, American Express. Billed in MYR."}
          </div>

          <form onSubmit={handlePay} className="flex flex-col gap-4">
            {/* Name only needed for Billplz */}
            {method === "billplz" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input
                  type="text" required value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="As on your bank account"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Receipt will be sent here"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-3 text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-1 ${
                method === "billplz"
                  ? "bg-[#002060] hover:bg-[#001540]"
                  : "bg-[#635bff] hover:bg-[#4f46e5]"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Redirecting…
                </>
              ) : (
                <>Pay RM {reward.priceMYR}.00 via {method === "billplz" ? "Billplz" : "Stripe"}</>
              )}
            </button>

            <p className="text-xs text-slate-400 text-center">
              You will be redirected to {method === "billplz" ? "Billplz's" : "Stripe's"} secure payment page.
            </p>
          </form>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400 flex-wrap">
          <span>🔒 SSL Secured</span>
          <span>🏦 FPX Enabled</span>
          <span>💳 Cards Accepted</span>
          <span>🇲🇾 Billed in MYR</span>
        </div>
      </div>
    </div>
  );
}
