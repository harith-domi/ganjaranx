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

          <a
            href="https://wa.me/60149999309?text=Hi%20GanjaranX%2C%20I%20have%20an%20enquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1ebe5a] text-white rounded-2xl p-6 flex items-center gap-4 transition-colors group"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-sm mb-0.5">WhatsApp Us</p>
              <p className="text-white/80 text-xs">Fastest response — usually within 1 hour</p>
            </div>
            <span className="ml-auto text-white/60 group-hover:translate-x-1 transition-transform">→</span>
          </a>

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
