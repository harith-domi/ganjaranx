"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Also save to waitlist for tracking
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "signup" }),
      });
    } catch (_) { /* non-critical */ }

    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-emerald-600 text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">Check your email!</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-2">
            We sent a confirmation link to <span className="font-semibold text-slate-700 dark:text-slate-300">{email}</span>.
          </p>
          <p className="text-sm text-slate-400 mb-8">Click the link to activate your account and get your <span className="text-[#f5a623] font-bold">500 bonus points</span>.</p>
          <Link href="/auth/signin" className="text-[#f5a623] font-semibold hover:underline">Back to Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img src="/logo.svg" alt="GanjaranX" className="h-20 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Create your account</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Start earning rewards today — it&apos;s free</p>
        </div>

        <div className="bg-[#f5a623]/10 border border-[#f5a623]/40 rounded-2xl px-5 py-4 mb-5 flex gap-3 items-start">
          <span className="text-[#f5a623] text-lg mt-0.5">⚡</span>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Sign up now and get <span className="font-bold text-[#f5a623]">500 bonus points</span> credited to your account instantly.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <input
                id="name" type="text" required value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ahmad bin Ali"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
              />
            </div>
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
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <input
                id="password" type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full bg-[#f5a623] hover:bg-[#e09415] disabled:opacity-60 text-[#1b2660] font-bold py-3.5 rounded-xl transition-colors mt-1"
            >
              {loading ? "Creating account…" : "Create Account — Get 500 pts ⚡"}
            </button>
            <p className="text-xs text-slate-400 text-center">
              By signing up, you agree to our{" "}
              <Link href="/privacy" className="text-[#f5a623] hover:underline">Privacy Policy</Link>{" "}
              and{" "}
              <Link href="/terms" className="text-[#f5a623] hover:underline">Terms of Service</Link>.
            </p>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-[#f5a623] font-semibold hover:text-[#e09415]">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
