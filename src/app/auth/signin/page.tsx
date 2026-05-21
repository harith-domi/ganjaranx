"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notified, setNotified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotified(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img src="/logo.svg" alt="GanjaranX" className="h-20 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Welcome back</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Sign in to your GanjaranX account</p>
        </div>

        {/* Coming soon banner */}
        <div className="bg-[#f5a623]/10 border border-[#f5a623]/40 rounded-2xl px-5 py-4 mb-5 flex gap-3 items-start">
          <span className="text-[#f5a623] text-lg mt-0.5">⚡</span>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">Accounts launching soon!</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              We&apos;re finalising the account system. Enter your email below and we&apos;ll notify you the moment sign-in is live.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
          {notified ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 text-2xl">✓</span>
              </div>
              <p className="font-bold text-slate-900 dark:text-white mb-1">You&apos;re on the list!</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">We&apos;ll email <span className="font-semibold text-slate-700 dark:text-slate-300">{email}</span> as soon as accounts go live.</p>
              <button
                onClick={() => { setNotified(false); setEmail(""); }}
                className="mt-6 text-xs text-slate-400 hover:text-slate-600 underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  id="email" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                </div>
                <input
                  id="password" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition opacity-50 cursor-not-allowed"
                  disabled
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#f5a623] hover:bg-[#e09415] text-[#1b2660] font-bold py-3.5 rounded-xl transition-colors mt-1"
              >
                Notify Me When Live
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-[#f5a623] font-semibold hover:text-[#e09415]">Sign up free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
