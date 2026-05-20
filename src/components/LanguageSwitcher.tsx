"use client";

import { useLang, Lang } from "@/context/LanguageContext";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "my", label: "MY" },
  { code: "zh", label: "中文" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-full px-1 py-1">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
            lang === l.code
              ? "bg-[#1b2660] text-white dark:bg-[#f5a623] dark:text-[#1b2660]"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
