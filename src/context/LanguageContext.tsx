"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "my" | "zh";

export const translations = {
  en: {
    nav_marketplace: "Marketplace",
    nav_tasks: "Tasks",
    nav_rewards: "Rewards",
    nav_about: "About",
    nav_contact: "Contact",
    nav_signin: "Sign In",
    nav_signup: "Get Started",
    hero_badge: "Malaysia's Rewards Marketplace",
    hero_h1_1: "Complete Tasks.",
    hero_h1_2: "Earn Points.",
    hero_h1_3: "Redeem Rewards.",
    hero_sub: "GanjaranX connects you with brands that reward you for real actions — EV test drives, tenant referrals, store check-ins, and more.",
    hero_cta1: "Start Earning",
    hero_cta2: "Browse Rewards",
    stats_users: "Active Users",
    stats_tasks: "Tasks Available",
    stats_redeemed: "Rewards Redeemed",
    how_label: "How It Works",
    how_title: "Earn rewards in 3 simple steps",
    step1_title: "Browse Tasks",
    step1_desc: "Choose from tasks across property, EV, F&B, health and more that suit your lifestyle.",
    step2_title: "Complete & Earn",
    step2_desc: "Finish the task and watch your Ganjaran Points balance grow instantly.",
    step3_title: "Redeem Rewards",
    step3_desc: "Swap your points for real-world rewards — hotel stays, EV charging credits, F&B vouchers.",
    cat_label: "Categories",
    cat_title: "Explore our reward categories",
    rewards_label: "Rewards",
    rewards_title: "Top rewards to redeem",
    tasks_label: "Tasks",
    tasks_title: "Start earning today",
    view_all: "View all",
    cta_title: "Ready to start earning?",
    cta_sub: "Join thousands of Malaysians already earning rewards with GanjaranX.",
    cta_btn1: "Create Free Account",
    cta_btn2: "Browse Marketplace",
    footer_tagline: "Malaysia's rewards marketplace. Complete tasks, earn points, redeem real-world rewards.",
    footer_platform: "Platform",
    footer_account: "Account",
    footer_signin: "Sign In",
    footer_signup: "Create Account",
    footer_copyright: "2026 GanjaranX. All rights reserved.",
    contact_title: "Contact Us",
    contact_sub: "We'd love to hear from you. Reach out via the form or our contact details below.",
    about_title: "About GanjaranX",
  },
  my: {
    nav_marketplace: "Pasaran",
    nav_tasks: "Tugasan",
    nav_rewards: "Ganjaran",
    nav_about: "Tentang Kami",
    nav_contact: "Hubungi Kami",
    nav_signin: "Log Masuk",
    nav_signup: "Mulakan",
    hero_badge: "Pasaran Ganjaran Malaysia",
    hero_h1_1: "Selesaikan Tugasan.",
    hero_h1_2: "Kumpul Mata.",
    hero_h1_3: "Tukar Ganjaran.",
    hero_sub: "GanjaranX menghubungkan anda dengan jenama yang memberi ganjaran atas tindakan nyata — ujian EV, rujukan penyewa, daftar masuk kedai, dan banyak lagi.",
    hero_cta1: "Mula Jana",
    hero_cta2: "Semak Ganjaran",
    stats_users: "Pengguna Aktif",
    stats_tasks: "Tugasan Tersedia",
    stats_redeemed: "Ganjaran Ditebus",
    how_label: "Cara Kerja",
    how_title: "Jana ganjaran dalam 3 langkah mudah",
    step1_title: "Semak Tugasan",
    step1_desc: "Pilih tugasan merentas harta, EV, F&B, kesihatan dan lain-lain yang sesuai dengan gaya hidup anda.",
    step2_title: "Selesai & Jana",
    step2_desc: "Siapkan tugasan dan lihat baki Mata Ganjaran anda berkembang dengan segera.",
    step3_title: "Tukar Ganjaran",
    step3_desc: "Tukar mata anda kepada ganjaran sebenar — penginapan hotel, kredit pengecasan EV, baucar F&B.",
    cat_label: "Kategori",
    cat_title: "Teroka kategori ganjaran kami",
    rewards_label: "Ganjaran",
    rewards_title: "Ganjaran terbaik untuk ditebus",
    tasks_label: "Tugasan",
    tasks_title: "Mula jana hari ini",
    view_all: "Lihat semua",
    cta_title: "Bersedia untuk mula jana?",
    cta_sub: "Sertai ribuan rakyat Malaysia yang sudah menjana ganjaran dengan GanjaranX.",
    cta_btn1: "Buka Akaun Percuma",
    cta_btn2: "Layari Pasaran",
    footer_tagline: "Pasaran ganjaran Malaysia. Selesai tugasan, kumpul mata, tukar ganjaran sebenar.",
    footer_platform: "Platform",
    footer_account: "Akaun",
    footer_signin: "Log Masuk",
    footer_signup: "Buka Akaun",
    footer_copyright: "2026 GanjaranX. Hak cipta terpelihara.",
    contact_title: "Hubungi Kami",
    contact_sub: "Kami ingin mendengar daripada anda. Hubungi kami melalui borang atau maklumat di bawah.",
    about_title: "Tentang GanjaranX",
  },
  zh: {
    nav_marketplace: "市场",
    nav_tasks: "任务",
    nav_rewards: "奖励",
    nav_about: "关于我们",
    nav_contact: "联系我们",
    nav_signin: "登录",
    nav_signup: "开始使用",
    hero_badge: "马来西亚奖励市场",
    hero_h1_1: "完成任务。",
    hero_h1_2: "赚取积分。",
    hero_h1_3: "兑换奖励。",
    hero_sub: "GanjaranX将您与为真实行动提供奖励的品牌连接起来——EV试驾、租客推荐、门店签到等。",
    hero_cta1: "开始赚取",
    hero_cta2: "浏览奖励",
    stats_users: "活跃用户",
    stats_tasks: "可用任务",
    stats_redeemed: "已兑换奖励",
    how_label: "运作方式",
    how_title: "3个简单步骤赚取奖励",
    step1_title: "浏览任务",
    step1_desc: "从房产、EV、餐饮、健康等适合您生活方式的任务中选择。",
    step2_title: "完成并赚取",
    step2_desc: "完成任务，看着您的Ganjaran积分余额即刻增长。",
    step3_title: "兑换奖励",
    step3_desc: "将积分兑换为真实奖励——酒店住宿、EV充电积分、餐饮券。",
    cat_label: "类别",
    cat_title: "探索我们的奖励类别",
    rewards_label: "奖励",
    rewards_title: "热门可兑换奖励",
    tasks_label: "任务",
    tasks_title: "今天开始赚取",
    view_all: "查看全部",
    cta_title: "准备好开始赚取了吗？",
    cta_sub: "加入数千名已通过GanjaranX赚取奖励的马来西亚人。",
    cta_btn1: "创建免费账户",
    cta_btn2: "浏览市场",
    footer_tagline: "马来西亚奖励市场。完成任务，赚取积分，兑换真实奖励。",
    footer_platform: "平台",
    footer_account: "账户",
    footer_signin: "登录",
    footer_signup: "创建账户",
    footer_copyright: "2026 GanjaranX. 版权所有。",
    contact_title: "联系我们",
    contact_sub: "我们很乐意听到您的意见。通过表格或以下联系方式联系我们。",
    about_title: "关于GanjaranX",
  },
};

export type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => translations.en[key],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("gx_lang") as Lang | null;
    if (saved && ["en", "my", "zh"].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("gx_lang", l);
  };

  const t = (key: TranslationKey) => translations[lang][key] ?? translations.en[key];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
