"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to Supabase auth
  };

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

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
          <div className="bg-[#1b2660]/5 dark:bg-[#1b2660]/20 border border-[#1b2660]/15 rounded-2xl p-4 mb-6 text-center">
            <p className="text-sm font-semibold text-[#1b2660] dark:text-slate-300">
              Sign up and get{" "}
              <span className="text-base font-extrabold text-[#f5a623]">500 bonus points</span>{" "}
              to start!
            </p>
          </div>

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
                id="password" type="password" required minLength={8} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
              />
            </div>
            <button type="submit" className="w-full bg-[#1b2660] hover:bg-[#141d4a] text-white font-bold py-3.5 rounded-xl transition-colors mt-1">
              Create Account
            </button>
            <p className="text-xs text-slate-400 text-center">
              By signing up, you agree to our{" "}
              <a href="#" className="text-[#f5a623] hover:underline">Terms</a>{" "}
              and{" "}
              <a href="#" className="text-[#f5a623] hover:underline">Privacy Policy</a>.
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
