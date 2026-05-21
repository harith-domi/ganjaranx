"use client";

import Link from "next/link";
import { tasks, rewards, VERTICAL_LABELS, VERTICAL_COLORS } from "@/lib/data";
import { useLang } from "@/context/LanguageContext";
import AnimatedSection, { StaggerGrid } from "@/components/AnimatedSection";

const DIFFICULTY_LABELS = { easy: "Easy", medium: "Medium", hard: "Hard" };

const verticals = [
  { key: "property", icon: "P", bg: "bg-blue-50 border-blue-200 dark:bg-slate-800 dark:border-slate-700", iconBg: "bg-blue-600", description: "Tenant referrals, developer surveys, agent partnerships" },
  { key: "ev",       icon: "E", bg: "bg-emerald-50 border-emerald-200 dark:bg-slate-800 dark:border-slate-700", iconBg: "bg-emerald-600", description: "Test drives, charging plans, EV accessory vouchers" },
  { key: "digital",  icon: "D", bg: "bg-violet-50 border-violet-200 dark:bg-slate-800 dark:border-slate-700", iconBg: "bg-violet-600", description: "Video ads, store check-ins, online surveys" },
  { key: "fnb",      icon: "F", bg: "bg-orange-50 border-orange-200 dark:bg-slate-800 dark:border-slate-700", iconBg: "bg-orange-500", description: "Dining vouchers, grocery cashback, lifestyle rewards" },
  { key: "health",   icon: "H", bg: "bg-rose-50 border-rose-200 dark:bg-slate-800 dark:border-slate-700", iconBg: "bg-rose-500", description: "Gym memberships, health screenings, spa vouchers" },
  { key: "travel",   icon: "T", bg: "bg-cyan-50 border-cyan-200 dark:bg-slate-800 dark:border-slate-700", iconBg: "bg-cyan-600", description: "Hotel stays, flight vouchers, travel insurance" },
];

const verticalBar: Record<string, string> = {
  property: "bg-blue-500", ev: "bg-emerald-500", digital: "bg-violet-500",
  fnb: "bg-orange-500", health: "bg-rose-500", travel: "bg-cyan-500",
};

export default function HomePage() {
  const { t } = useLang();
  const featuredRewards = rewards.slice(0, 3);
  const featuredTasks = tasks.slice(0, 3);

  return (
    <div>
      {/* ── Hero ── */}
      <section aria-label="Hero — Earn & Redeem Rewards in Malaysia" className="bg-gradient-to-br from-[#070c1f] via-[#1b2660] to-[#070c1f] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <div className="hero-badge inline-flex items-center gap-2 bg-[#f5a623]/10 border border-[#f5a623]/25 text-[#f5a623] text-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#f5a623] rounded-full inline-block pulse-dot"></span>
              {t("hero_badge")}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              <span className="hero-h1-1 block">{t("hero_h1_1")}</span>
              <span className="hero-h1-2 block shimmer-text">{t("hero_h1_2")}</span>
              <span className="hero-h1-3 block">{t("hero_h1_3")}</span>
            </h1>
            <p className="hero-sub text-slate-300 text-lg mb-10 leading-relaxed">{t("hero_sub")}</p>
            <div className="hero-btns flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/auth/signup" className="bg-[#f5a623] hover:bg-[#e09415] text-[#1b2660] font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#f5a623]/25">
                {t("hero_cta1")}
              </Link>
              <Link href="/marketplace" className="border border-white/25 hover:border-white/60 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95">
                {t("hero_cta2")}
              </Link>
            </div>
          </div>

          {/* Floating cards */}
          <div className="flex-1 flex justify-center w-full">
            <div className="relative w-72 sm:w-80 h-64 sm:h-72">
              <div className="hero-card-1 float-1 absolute top-0 left-0 bg-white text-slate-900 rounded-2xl p-5 shadow-2xl w-56 sm:w-60">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">P</span>
                  <span className="text-sm font-semibold">Refer a Tenant</span>
                </div>
                <p className="text-2xl font-extrabold text-[#f5a623]">+5,000 pts</p>
                <p className="text-xs text-slate-500 mt-1">Property · Medium · 1–2 weeks</p>
              </div>
              <div className="hero-card-2 float-2 absolute bottom-0 right-0 bg-[#1b2660] text-white rounded-2xl p-5 shadow-2xl w-48 sm:w-52">
                <p className="text-xs opacity-70 mb-1 font-medium">Your Balance</p>
                <p className="text-3xl font-extrabold text-[#f5a623]">12,450</p>
                <p className="text-sm opacity-70 mt-1">Ganjaran Points</p>
              </div>
              <div className="hero-card-3 float-3 absolute top-[45%] left-[15%] bg-[#0d1430] text-white rounded-2xl p-4 shadow-2xl w-44 sm:w-48 border border-white/10">
                <p className="text-xs text-slate-400 mb-1">Just redeemed</p>
                <p className="font-semibold text-sm">RM 50 EV Charging</p>
                <p className="text-[#f5a623] text-xs mt-1.5 font-medium">Confirmed ✓</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-3 gap-4">
            {[
              { label: t("stats_users"), value: "10,000+" },
              { label: t("stats_tasks"), value: "50+" },
              { label: t("stats_redeemed"), value: "RM 1M+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#f5a623]">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section aria-label="How GanjaranX works" className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#f5a623] font-semibold text-sm uppercase tracking-wider mb-3">{t("how_label")}</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">{t("how_title")}</h2>
          </AnimatedSection>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { number: "01", title: t("step1_title"), description: t("step1_desc") },
              { number: "02", title: t("step2_title"), description: t("step2_desc") },
              { number: "03", title: t("step3_title"), description: t("step3_desc") },
            ].map((step) => (
              <div key={step.number} className="flex flex-col gap-4">
                <span className="text-6xl font-black text-[#1b2660]/10 dark:text-white/5 leading-none select-none">{step.number}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── Categories ── */}
      <section aria-label="Reward categories in Malaysia" className="py-16 px-4 sm:px-6 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-[#f5a623] font-semibold text-sm uppercase tracking-wider mb-3">{t("cat_label")}</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">{t("cat_title")}</h2>
          </AnimatedSection>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {verticals.map((v) => (
              <Link key={v.key} href={`/marketplace?vertical=${v.key}`}
                className={`border rounded-2xl p-6 ${v.bg} hover:shadow-lg transition-all hover:-translate-y-1 duration-200`}>
                <span className={`w-12 h-12 ${v.iconBg} text-white rounded-xl flex items-center justify-center font-extrabold text-lg mb-4`}>
                  {v.icon}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {VERTICAL_LABELS[v.key as keyof typeof VERTICAL_LABELS]}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{v.description}</p>
              </Link>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── Featured Rewards ── */}
      <section aria-label="Featured rewards — redeem points for vouchers and experiences" className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#f5a623] font-semibold text-sm uppercase tracking-wider mb-2">{t("rewards_label")}</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t("rewards_title")}</h2>
            </div>
            <Link href="/marketplace?tab=rewards" className="text-sm font-semibold text-[#1b2660] hover:text-[#f5a623] transition-colors hidden sm:block dark:text-[#f5a623]">
              {t("view_all")} &rarr;
            </Link>
          </AnimatedSection>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRewards.map((reward) => (
              <Link key={reward.id} href={`/rewards/${reward.id}`}
                className="group border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 hover:shadow-xl transition-all hover:-translate-y-1 duration-200">
                <div className={`h-1.5 ${verticalBar[reward.vertical]}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${VERTICAL_COLORS[reward.vertical]}`}>
                      {VERTICAL_LABELS[reward.vertical]}
                    </span>
                    <span className="text-sm font-bold text-amber-600">{reward.value}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#1b2660] dark:group-hover:text-[#f5a623] transition-colors">
                    {reward.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{reward.vendor}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{reward.pointCost.toLocaleString()} pts</span>
                  </div>
                </div>
              </Link>
            ))}
          </StaggerGrid>
          <div className="mt-6 sm:hidden">
            <Link href="/marketplace?tab=rewards" className="text-sm font-semibold text-[#f5a623]">{t("view_all")} &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ── Featured Tasks ── */}
      <section aria-label="Featured tasks — earn Ganjaran Points by completing challenges" className="py-20 sm:py-24 px-4 sm:px-6 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#f5a623] font-semibold text-sm uppercase tracking-wider mb-2">{t("tasks_label")}</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t("tasks_title")}</h2>
            </div>
            <Link href="/marketplace?tab=tasks" className="text-sm font-semibold text-[#1b2660] hover:text-[#f5a623] transition-colors hidden sm:block dark:text-[#f5a623]">
              {t("view_all")} &rarr;
            </Link>
          </AnimatedSection>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTasks.map((task) => (
              <Link key={task.id} href={`/tasks/${task.id}`}
                className="group border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 hover:shadow-xl transition-all hover:-translate-y-1 duration-200">
                <div className={`h-1.5 ${verticalBar[task.vertical]}`} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${VERTICAL_COLORS[task.vertical]}`}>
                      {VERTICAL_LABELS[task.vertical]}
                    </span>
                    <span className="text-xs text-slate-500">{DIFFICULTY_LABELS[task.difficulty]}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#1b2660] dark:group-hover:text-[#f5a623] transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{task.timeEstimate}</span>
                    <span className="text-sm font-bold text-[#f5a623]">+{task.points.toLocaleString()} pts</span>
                  </div>
                </div>
              </Link>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section aria-label="Join GanjaranX — start earning rewards today" className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection scale>
            <div className="bg-gradient-to-r from-[#1b2660] to-[#243075] rounded-3xl px-6 sm:px-16 py-14 sm:py-16 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{t("cta_title")}</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto">{t("cta_sub")}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/auth/signup" className="bg-[#f5a623] hover:bg-[#e09415] text-[#1b2660] font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#f5a623]/30">
                  {t("cta_btn1")}
                </Link>
                <Link href="/marketplace" className="border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95">
                  {t("cta_btn2")}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
