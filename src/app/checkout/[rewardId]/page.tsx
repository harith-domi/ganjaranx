"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { rewards } from "@/lib/data";
import { VERTICAL_LABELS, VERTICAL_COLORS } from "@/lib/data";

const verticalBar: Record<string, string> = {
  property: "bg-blue-500", ev: "bg-emerald-500", digital: "bg-violet-500",
  fnb: "bg-orange-500", health: "bg-rose-500", travel: "bg-cyan-500",
};

export default function CheckoutPage() {
  const params = useParams();
  const rewardId = params.rewardId as string;
  const reward = rewards.find((r) => r.id === rewardId);

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
      const res = await fetch("/api/billplz/create-bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rewardId, name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      // Redirect to Billplz hosted payment page
      window.location.href = data.billUrl;
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

        {/* Reward summary card */}
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
          <div className="flex items-center gap-3 mb-6">
            {/* Billplz logo inline */}
            <div className="w-10 h-10 rounded-xl bg-[#002060] flex items-center justify-center shrink-0">
              <span className="text-white font-extrabold text-sm tracking-tight">B</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">Pay via Billplz</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">FPX · Online Banking · Credit/Debit Card</p>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Amount to pay</span>
            <span className="text-2xl font-extrabold text-[#1b2660] dark:text-[#f5a623]">RM {reward.priceMYR}.00</span>
          </div>

          <form onSubmit={handlePay} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <input
                type="text" required value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="As on your bank account"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
              />
            </div>
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
              className="w-full bg-[#002060] hover:bg-[#001540] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Redirecting to Billplz…
                </>
              ) : (
                <>Pay RM {reward.priceMYR}.00 via Billplz</>
              )}
            </button>

            <p className="text-xs text-slate-400 text-center">
              You will be redirected to Billplz&apos;s secure payment page.
              Supports all major Malaysian banks (FPX), Visa &amp; Mastercard.
            </p>
          </form>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400">
          <span>🔒 SSL Secured</span>
          <span>🏦 FPX Enabled</span>
          <span>🇲🇾 Malaysian Gateway</span>
        </div>
      </div>
    </div>
  );
}
