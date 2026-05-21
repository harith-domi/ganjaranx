"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLang } from "@/context/LanguageContext";
import { usePoints } from "@/hooks/usePoints";
import { createClient } from "@/lib/supabase-browser";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const { balance } = usePoints();
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const initials = user?.user_metadata?.name
    ? user.user_metadata.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 dark:bg-[#0b1020]/95 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <img src="/logo.svg" alt="GanjaranX" className="h-14 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/marketplace" className="hover:text-[#f5a623] transition-colors">{t("nav_marketplace")}</Link>
          <Link href="/topup" className="hover:text-[#f5a623] transition-colors font-semibold text-[#f5a623]">⚡ GX Top-Up</Link>
          <Link href="/about" className="hover:text-[#f5a623] transition-colors">{t("nav_about")}</Link>
          <Link href="/contact" className="hover:text-[#f5a623] transition-colors">{t("nav_contact")}</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />

          {/* Points balance */}
          {balance !== null && balance > 0 && (
            <Link
              href="/topup"
              className="flex items-center gap-1.5 bg-[#f5a623]/10 hover:bg-[#f5a623]/20 border border-[#f5a623]/30 text-[#f5a623] font-bold text-xs px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap"
            >
              ⚡ {balance.toLocaleString()} pts
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              {/* Avatar chip */}
              <Link href="/dashboard" className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full transition-colors">
                <div className="w-6 h-6 bg-[#1b2660] text-white rounded-full flex items-center justify-center text-xs font-bold">{initials}</div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[100px] truncate">
                  {user.user_metadata?.name ?? user.email}
                </span>
              </Link>
              <button
                onClick={handleSignOut}
                className="text-xs text-slate-500 hover:text-red-500 transition-colors font-medium"
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <Link href="/auth/signin" className="text-sm font-medium text-slate-700 hover:text-[#f5a623] dark:text-slate-300 transition-colors">
                {t("nav_signin")}
              </Link>
              <Link href="/auth/signup" className="text-sm font-semibold bg-[#1b2660] text-white px-5 py-2 rounded-full hover:bg-[#141d4a] transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                {t("nav_signup")}
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-600 dark:text-slate-300 text-xl p-1 shrink-0"
          aria-label="Toggle navigation"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white dark:bg-[#0b1020] border-t border-slate-100 dark:border-slate-800 px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/marketplace" onClick={() => setOpen(false)} className="text-slate-700 dark:text-slate-300">{t("nav_marketplace")}</Link>
          <Link href="/topup" onClick={() => setOpen(false)} className="font-semibold text-[#f5a623]">⚡ GX Top-Up</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="text-slate-700 dark:text-slate-300">{t("nav_about")}</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="text-slate-700 dark:text-slate-300">{t("nav_contact")}</Link>
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-3">
            {balance !== null && balance > 0 && (
              <div className="flex items-center gap-1.5 text-[#f5a623] font-bold text-sm">
                ⚡ {balance.toLocaleString()} pts
              </div>
            )}
            <div className="self-start"><LanguageSwitcher /></div>
            {user ? (
              <>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <div className="w-7 h-7 bg-[#1b2660] text-white rounded-full flex items-center justify-center text-xs font-bold">{initials}</div>
                  <span className="font-medium">{user.user_metadata?.name ?? user.email}</span>
                </div>
                <button onClick={() => { handleSignOut(); setOpen(false); }} className="text-sm text-red-500 text-left font-medium">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" onClick={() => setOpen(false)} className="text-slate-700 dark:text-slate-300">{t("nav_signin")}</Link>
                <Link href="/auth/signup" onClick={() => setOpen(false)} className="bg-[#1b2660] text-white px-5 py-2 rounded-full text-center">
                  {t("nav_signup")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
