"use client";

import { useState } from "react";
import AnimatedSection, { StaggerGrid } from "@/components/AnimatedSection";
import { usePoints } from "@/hooks/usePoints";

type PaymentMethod = "billplz" | "stripe";

const packages = [
  { id: "100",   pts: 100,   priceMYR: 1,   label: "Starter",  popular: false, bonus: 0 },
  { id: "200",   pts: 200,   priceMYR: 2,   label: "Bronze",   popular: false, bonus: 0 },
  { id: "500",   pts: 500,   priceMYR: 5,   label: "Basic",    popular: false, bonus: 0 },
  { id: "1000",  pts: 1000,  priceMYR: 10,  label: "Popular",  popular: true,  bonus: 50 },
  { id: "2500",  pts: 2500,  priceMYR: 25,  label: "Value",    popular: false, bonus: 150 },
  { id: "5000",  pts: 5000,  priceMYR: 50,  label: "Premium",  popular: false, bonus: 500 },
  { id: "10000", pts: 10000, priceMYR: 100, label: "Ultimate", popular: false, bonus: 1500 },
];

export default function TopUpPage() {
  const { balance } = usePoints();
  const [selected, setSelected] = useState(packages[2].id); // default: Popular
  const [method, setMethod] = useState<PaymentMethod>("billplz");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pkg = packages.find((p) => p.id === selected)!;
  const totalPts = pkg.pts + pkg.bonus;
  const stripeAvailable = pkg.priceMYR >= 2; // Stripe minimum is RM 2

  // Auto-switch to Billplz if Stripe not available for this package
  const effectiveMethod = stripeAvailable ? method : "billplz";

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint =
        effectiveMethod === "billplz" ? "/api/billplz/topup" : "/api/stripe/topup";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg.id, name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      window.location.href = method === "billplz" ? data.billUrl : data.sessionUrl;
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <AnimatedSection className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#f5a623]/10 border border-[#f5a623]/25 text-[#f5a623] text-sm px-4 py-2 rounded-full mb-4">
          <span className="w-2 h-2 bg-[#f5a623] rounded-full inline-block pulse-dot" />
          Instant Credit
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          GX Top-Up
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg mx-auto">
          Buy Ganjaran Points instantly. <span className="font-semibold text-[#1b2660] dark:text-[#f5a623]">100 pts = RM 1</span> — no expiry, no hidden fees.
        </p>
        {/* Current balance */}
        {balance !== null && (
          <div className="mt-5 inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-3 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 text-sm">Your balance</span>
            <span className="text-xl font-extrabold text-[#f5a623]">⚡ {balance.toLocaleString()} pts</span>
          </div>
        )}
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Package grid */}
        <div className="lg:col-span-3">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Choose a package</p>
          <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
            {packages.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p.id)}
                className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all text-center ${
                  selected === p.id
                    ? "border-[#f5a623] bg-[#f5a623]/5 dark:bg-[#f5a623]/10"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#f5a623] text-[#1b2660] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    MOST POPULAR
                  </span>
                )}
                <span className={`text-xs font-semibold mb-2 ${selected === p.id ? "text-[#f5a623]" : "text-slate-400"}`}>
                  {p.label}
                </span>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {p.pts.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">pts</span>
                {p.bonus > 0 && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold mb-2">
                    +{p.bonus} bonus
                  </span>
                )}
                <span className={`text-lg font-extrabold mt-1 ${selected === p.id ? "text-[#1b2660] dark:text-[#f5a623]" : "text-slate-700 dark:text-slate-200"}`}>
                  RM {p.priceMYR}
                </span>
              </button>
            ))}
          </StaggerGrid>
          <p className="text-xs text-slate-400 mt-2">* Bonus points on selected packages. All points credited instantly after payment.</p>
        </div>

        {/* Checkout panel */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm sticky top-24">
            {/* Summary */}
            <div className="bg-gradient-to-br from-[#1b2660] to-[#243075] rounded-2xl p-5 mb-5 text-white text-center">
              <p className="text-xs text-slate-300 mb-1">{pkg.label} Package</p>
              <p className="text-4xl font-extrabold text-[#f5a623]">{totalPts.toLocaleString()}</p>
              <p className="text-sm text-slate-300 mt-1">Ganjaran Points</p>
              {pkg.bonus > 0 && (
                <p className="text-xs bg-emerald-500/20 text-emerald-300 mt-2 px-3 py-1 rounded-full inline-block">
                  Includes {pkg.bonus} bonus pts
                </p>
              )}
              <div className="border-t border-white/10 mt-4 pt-4 flex items-center justify-between">
                <span className="text-sm text-slate-300">Total</span>
                <span className="text-xl font-extrabold">RM {pkg.priceMYR}.00</span>
              </div>
            </div>

            {/* Payment method */}
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Payment method</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              <button type="button" onClick={() => setMethod("billplz")}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                  method === "billplz"
                    ? "border-[#1b2660] bg-[#1b2660]/5 dark:border-[#f5a623] dark:bg-[#f5a623]/5"
                    : "border-slate-200 dark:border-slate-700"
                }`}>
                <div className="w-8 h-8 rounded-lg bg-[#002060] flex items-center justify-center">
                  <span className="text-white font-extrabold text-xs">B</span>
                </div>
                <span className={`text-xs font-bold ${method === "billplz" ? "text-[#1b2660] dark:text-[#f5a623]" : "text-slate-600 dark:text-slate-400"}`}>Billplz</span>
                <span className="text-[10px] text-slate-400">FPX</span>
              </button>
              <button type="button"
                onClick={() => stripeAvailable && setMethod("stripe")}
                disabled={!stripeAvailable}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                  !stripeAvailable
                    ? "border-slate-100 dark:border-slate-800 opacity-40 cursor-not-allowed"
                    : method === "stripe"
                    ? "border-[#635bff] bg-[#635bff]/5"
                    : "border-slate-200 dark:border-slate-700"
                }`}>
                <div className="w-8 h-8 rounded-lg bg-[#635bff] flex items-center justify-center">
                  <span className="text-white font-extrabold text-xs">S</span>
                </div>
                <span className={`text-xs font-bold ${method === "stripe" && stripeAvailable ? "text-[#635bff]" : "text-slate-600 dark:text-slate-400"}`}>Stripe</span>
                <span className="text-[10px] text-slate-400">{stripeAvailable ? "Cards" : "Min RM 2"}</span>
              </button>
            </div>

            <form onSubmit={handlePay} className="flex flex-col gap-3">
              {method === "billplz" && (
                <input
                  type="text" required value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
                />
              )}
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
              />

              {error && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-3 text-xs text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className={`w-full text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  effectiveMethod === "billplz" ? "bg-[#002060] hover:bg-[#001540]" : "bg-[#635bff] hover:bg-[#4f46e5]"
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Redirecting…
                  </>
                ) : (
                  <>Pay RM {pkg.priceMYR}.00 · Get {totalPts.toLocaleString()} pts via {effectiveMethod === "billplz" ? "Billplz" : "Stripe"}</>
)}
              </button>
            </form>

            <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-slate-400">
              <span>🔒 Secure</span>
              <span>⚡ Instant</span>
              <span>🇲🇾 MYR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
