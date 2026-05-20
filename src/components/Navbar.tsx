"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLang } from "@/context/LanguageContext";
import { usePoints } from "@/hooks/usePoints";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const { balance } = usePoints();

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

          {/* Points balance — only shown once localStorage is loaded */}
          {balance !== null && balance > 0 && (
            <Link
              href="/topup"
              className="flex items-center gap-1.5 bg-[#f5a623]/10 hover:bg-[#f5a623]/20 border border-[#f5a623]/30 text-[#f5a623] font-bold text-xs px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap"
            >
              ⚡ {balance.toLocaleString()} pts
            </Link>
          )}

          <Link href="/auth/signin" className="text-sm font-medium text-slate-700 hover:text-[#f5a623] dark:text-slate-300 transition-colors">
            {t("nav_signin")}
          </Link>
          <Link href="/auth/signup" className="text-sm font-semibold bg-[#1b2660] text-white px-5 py-2 rounded-full hover:bg-[#141d4a] transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
            {t("nav_signup")}
          </Link>
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
            {/* Mobile points balance */}
            {balance !== null && balance > 0 && (
              <div className="flex items-center gap-1.5 text-[#f5a623] font-bold text-sm">
                ⚡ {balance.toLocaleString()} pts
              </div>
            )}
            <div className="self-start">
              <LanguageSwitcher />
            </div>
            <Link href="/auth/signin" onClick={() => setOpen(false)} className="text-slate-700 dark:text-slate-300">{t("nav_signin")}</Link>
            <Link href="/auth/signup" onClick={() => setOpen(false)} className="bg-[#1b2660] text-white px-5 py-2 rounded-full text-center">
              {t("nav_signup")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
