"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-24 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div className="sm:col-span-2 md:col-span-1">
          <Link href="/" className="inline-block mb-3">
            <img src="/logo.svg" alt="GanjaranX" className="h-14 w-auto" />
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {t("footer_tagline")}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{t("footer_platform")}</p>
          <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/marketplace" className="hover:text-[#f5a623] transition-colors">{t("nav_marketplace")}</Link></li>
            <li><Link href="/marketplace?tab=tasks" className="hover:text-[#f5a623] transition-colors">{t("nav_tasks")}</Link></li>
            <li><Link href="/marketplace?tab=rewards" className="hover:text-[#f5a623] transition-colors">{t("nav_rewards")}</Link></li>
            <li><Link href="/topup" className="hover:text-[#f5a623] transition-colors font-medium text-[#f5a623]">⚡ GX Top-Up</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{t("footer_account")}</p>
          <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/auth/signin" className="hover:text-[#f5a623] transition-colors">{t("footer_signin")}</Link></li>
            <li><Link href="/auth/signup" className="hover:text-[#f5a623] transition-colors">{t("footer_signup")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Company</p>
          <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/about" className="hover:text-[#f5a623] transition-colors">{t("nav_about")}</Link></li>
            <li><Link href="/contact" className="hover:text-[#f5a623] transition-colors">{t("nav_contact")}</Link></li>
            <li><Link href="/privacy" className="hover:text-[#f5a623] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#f5a623] transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <span>{t("footer_copyright")}</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#f5a623] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#f5a623] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
