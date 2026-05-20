"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import AnimatedSection, { StaggerGrid } from "@/components/AnimatedSection";

export default function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", contact: "", enquiry: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <AnimatedSection className="text-center mb-12">
        <p className="text-[#f5a623] font-semibold text-sm uppercase tracking-wider mb-3">Get in Touch</p>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{t("contact_title")}</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">{t("contact_sub")}</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact details */}
        <StaggerGrid className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#1b2660]/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-[#1b2660] dark:text-[#f5a623] font-bold text-lg">@</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Email</p>
            <a href="mailto:support@ganjaranx.com" className="text-[#f5a623] hover:underline font-medium">
              support@ganjaranx.com
            </a>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#1b2660]/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-[#1b2660] dark:text-[#f5a623] font-bold text-lg">#</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Phone</p>
            <a href="tel:+60321165613" className="block text-[#f5a623] hover:underline font-medium">+603 2116 5613</a>
            <a href="tel:+60149999309" className="block text-[#f5a623] hover:underline font-medium mt-1">+6014 999 9309</a>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#1b2660]/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-[#1b2660] dark:text-[#f5a623] font-bold text-lg">⏱</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Office Hours</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Monday – Friday, 9:00 AM – 6:00 PM</p>
            <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">Malaysia Time (MYT, UTC+8)</p>
          </div>
        </StaggerGrid>

        {/* Enquiry form */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">We'll get back to you within 1–2 business days.</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ahmad bin Ali"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Contact Number</label>
                  <input
                    type="tel" value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="+60 12-345 6789"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Enquiry</label>
                  <textarea
                    required rows={4} value={form.enquiry}
                    onChange={(e) => setForm({ ...form, enquiry: e.target.value })}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition resize-none"
                  />
                </div>
                <button type="submit" className="w-full bg-[#1b2660] hover:bg-[#141d4a] text-white font-bold py-3.5 rounded-xl transition-colors">
                  Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
