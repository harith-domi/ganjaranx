"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import AnimatedSection, { StaggerGrid } from "@/components/AnimatedSection";

const values = [
  {
    icon: "★",
    title: "Reward Every Action",
    description: "We believe every meaningful action — big or small — deserves recognition. From a test drive to a tenant referral, GanjaranX ensures your time and effort are rewarded.",
  },
  {
    icon: "◆",
    title: "Built for Malaysia",
    description: "Designed from the ground up for Malaysians. Our reward ecosystem is rooted in local brands, local businesses, and local communities across every state.",
  },
  {
    icon: "▲",
    title: "Transparent & Trustworthy",
    description: "No hidden fees. No expiry tricks. Your Ganjaran Points are yours — earned fairly, tracked clearly, and redeemable whenever you're ready.",
  },
  {
    icon: "●",
    title: "Empowering Businesses",
    description: "We help Malaysian businesses drive real customer actions — not just impressions. Our platform connects brands with motivated users who want to engage.",
  },
];

const verticals = [
  { label: "Property", color: "bg-blue-500", desc: "Tenant referrals, agent partnerships, developer surveys" },
  { label: "EV & Mobility", color: "bg-emerald-500", desc: "Test drives, charging plans, EV accessories" },
  { label: "Digital", color: "bg-violet-500", desc: "Video ads, check-ins, online surveys" },
  { label: "F&B & Lifestyle", color: "bg-orange-500", desc: "Dining rewards, grocery cashback, lifestyle vouchers" },
  { label: "Health & Wellness", color: "bg-rose-500", desc: "Gym memberships, health screenings, spa vouchers" },
  { label: "Travel & Tourism", color: "bg-cyan-500", desc: "Hotel stays, flight vouchers, travel insurance" },
];

const team = [
  { name: "Harith Domi", role: "Founder & CEO", initial: "H" },
  { name: "Platform Team", role: "Engineering & Product", initial: "P" },
  { name: "Partner Relations", role: "Business Development", initial: "B" },
];

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#070c1f] via-[#1b2660] to-[#070c1f] text-white py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#f5a623] font-semibold text-sm uppercase tracking-wider mb-4">Our Story</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">{t("about_title")}</h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            GanjaranX was born from a simple question: <em>why shouldn't everyday Malaysians be rewarded for actions they already take?</em> We set out to build the platform that makes that a reality.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#f5a623] font-semibold text-sm uppercase tracking-wider mb-3">Our Mission</p>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-5">
                Making rewards accessible to every Malaysian
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                GanjaranX is Malaysia's dedicated task-to-reward marketplace. We connect everyday consumers with forward-thinking brands across six thriving sectors — from property and EV mobility to health, travel, and beyond.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our platform is built on a simple promise: complete a meaningful task, earn Ganjaran Points, and redeem them for real-world value — whether that's a hotel night in Langkawi, an EV charging credit, or a meal at your favourite restaurant.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#1b2660]/10 to-[#f5a623]/10 border border-[#1b2660]/15 rounded-3xl p-8 text-center">
              <p className="text-5xl font-black text-[#1b2660] dark:text-[#f5a623] mb-2">10,000+</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Active users across Malaysia</p>
              <div className="border-t border-slate-200 dark:border-slate-700 my-6" />
              <p className="text-5xl font-black text-[#1b2660] dark:text-[#f5a623] mb-2">RM 1M+</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Rewards redeemed to date</p>
              <div className="border-t border-slate-200 dark:border-slate-700 my-6" />
              <p className="text-5xl font-black text-[#1b2660] dark:text-[#f5a623] mb-2">6</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Reward verticals</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-[#f5a623] font-semibold text-sm uppercase tracking-wider mb-3">What We Stand For</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Our values</h2>
          </AnimatedSection>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 duration-200">
                <span className="text-2xl text-[#f5a623] mb-4 block">{v.icon}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Verticals */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-[#f5a623] font-semibold text-sm uppercase tracking-wider mb-3">What We Cover</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Six reward verticals</h2>
          </AnimatedSection>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {verticals.map((v) => (
              <div key={v.label} className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200">
                <div className={`h-1.5 ${v.color}`} />
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">{v.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{v.desc}</p>
                </div>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-[#f5a623] font-semibold text-sm uppercase tracking-wider mb-3">The Team</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Built by Malaysians, for Malaysians</h2>
          </AnimatedSection>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 duration-200">
                <div className="w-16 h-16 rounded-full bg-[#1b2660] text-white text-xl font-extrabold flex items-center justify-center mx-auto mb-4">
                  {member.initial}
                </div>
                <p className="font-bold text-slate-900 dark:text-white">{member.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{member.role}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection scale>
            <div className="bg-gradient-to-r from-[#1b2660] to-[#243075] rounded-3xl px-8 sm:px-16 py-14 text-center text-white">
            <h2 className="text-3xl font-extrabold mb-4">Join the GanjaranX community</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto">
              Start earning rewards today — it&apos;s free, it&apos;s easy, and it&apos;s built for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup" className="bg-[#f5a623] hover:bg-[#e09415] text-[#1b2660] font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95">
                Get Started Free
              </Link>
              <Link href="/contact" className="border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95">
                Contact Us
              </Link>
            </div>
          </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
