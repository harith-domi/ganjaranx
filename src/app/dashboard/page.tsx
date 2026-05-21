"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import { usePoints } from "@/hooks/usePoints";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const { balance } = usePoints();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // onAuthStateChange fires immediately with INITIAL_SESSION — no network call, no flicker
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setLoading(false);
      } else {
        router.push("/auth/signin");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-slate-400">Loading…</div>;
  }

  const name = user?.user_metadata?.name ?? user?.email ?? "User";
  const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
  const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString("en-MY", { year: "numeric", month: "long", day: "numeric" }) : "—";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-10">
        <div className="w-16 h-16 bg-[#1b2660] text-white rounded-full flex items-center justify-center text-2xl font-extrabold shrink-0">
          {initials}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{name}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{user?.email}</p>
          <p className="text-xs text-slate-400 mt-0.5">Member since {joinedDate}</p>
        </div>
      </div>

      {/* Points balance card */}
      <div className="bg-gradient-to-br from-[#1b2660] to-[#2d3d8a] rounded-3xl p-8 mb-6 text-white">
        <p className="text-white/70 text-sm font-medium mb-1">Your Ganjaran Points</p>
        <div className="flex items-end gap-3">
          <span className="text-5xl font-extrabold">
            {balance !== null ? balance.toLocaleString() : "—"}
          </span>
          <span className="text-[#f5a623] font-bold text-lg mb-1">pts</span>
        </div>
        <p className="text-white/50 text-xs mt-2">≈ RM {balance !== null ? (balance / 100).toFixed(2) : "0.00"} redemption value</p>
        <div className="flex gap-3 mt-6">
          <Link href="/topup" className="bg-[#f5a623] hover:bg-[#e09415] text-[#1b2660] font-bold px-5 py-2.5 rounded-full text-sm transition-colors">
            ⚡ Top Up
          </Link>
          <Link href="/marketplace?tab=rewards" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors">
            Redeem Rewards
          </Link>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Browse Marketplace", href: "/marketplace", icon: "🛍️", desc: "Tasks & rewards" },
          { label: "GX Top-Up", href: "/topup", icon: "⚡", desc: "Buy more points" },
          { label: "Contact Support", href: "/contact", icon: "✉️", desc: "Get help" },
          { label: "Terms of Service", href: "/terms", icon: "📋", desc: "Read our terms" },
        ].map(item => (
          <Link key={item.href} href={item.href}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 hover:border-[#f5a623]/50 hover:shadow-sm transition-all group">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-[#f5a623] transition-colors">{item.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
