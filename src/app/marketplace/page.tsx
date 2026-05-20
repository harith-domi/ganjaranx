"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { tasks, rewards, VERTICAL_LABELS, VERTICAL_COLORS, Vertical } from "@/lib/data";

type Tab = "all" | "tasks" | "rewards";

const DIFFICULTY_LABELS = { easy: "Easy", medium: "Medium", hard: "Hard" };

const verticalBar: Record<string, string> = {
  property: "bg-blue-500",
  ev: "bg-emerald-500",
  digital: "bg-violet-500",
  fnb: "bg-orange-500",
  health: "bg-rose-500",
  travel: "bg-cyan-500",
};

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) || "all";
  const initialVertical = (searchParams.get("vertical") as Vertical | "all") || "all";
  const [tab, setTab] = useState<Tab>(initialTab);
  const [vertical, setVertical] = useState<Vertical | "all">(initialVertical);

  const filteredTasks = tasks.filter((t) => vertical === "all" || t.vertical === vertical);
  const filteredRewards = rewards.filter((r) => vertical === "all" || r.vertical === vertical);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "All", count: tasks.length + rewards.length },
    { key: "tasks", label: "Tasks", count: tasks.length },
    { key: "rewards", label: "Rewards", count: rewards.length },
  ];

  const verticalFilters: { key: Vertical | "all"; label: string }[] = [
    { key: "all", label: "All Categories" },
    { key: "property", label: "Property" },
    { key: "ev", label: "EV & Mobility" },
    { key: "digital", label: "Digital" },
    { key: "fnb", label: "F&B & Lifestyle" },
    { key: "health", label: "Health & Wellness" },
    { key: "travel", label: "Travel & Tourism" },
  ];

  const noResults =
    (tab === "tasks" && filteredTasks.length === 0) ||
    (tab === "rewards" && filteredRewards.length === 0) ||
    (tab === "all" && filteredTasks.length === 0 && filteredRewards.length === 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-1">Browse Tasks & Rewards</h1>
        <h2 className="text-lg font-semibold text-[#f5a623] mb-3">Marketplace</h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
          Complete tasks to earn points, then redeem them for real-world rewards.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              tab === t.key
                ? "border-[#1b2660] text-[#1b2660] dark:border-[#f5a623] dark:text-[#f5a623]"
                : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {t.label}
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
              tab === t.key
                ? "bg-[#1b2660]/10 text-[#1b2660] dark:bg-[#f5a623]/10 dark:text-[#f5a623]"
                : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Vertical filters — scrollable on mobile */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {verticalFilters.map((vf) => (
          <button
            key={vf.key}
            onClick={() => setVertical(vf.key)}
            className={`text-sm px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap shrink-0 ${
              vertical === vf.key
                ? "bg-[#1b2660] text-white dark:bg-[#f5a623] dark:text-[#1b2660]"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {vf.label}
          </button>
        ))}
      </div>

      {/* Tasks */}
      {(tab === "all" || tab === "tasks") && filteredTasks.length > 0 && (
        <div className="mb-12">
          {tab === "all" && <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Tasks</h2>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTasks.map((task) => (
              <Link key={task.id} href={`/tasks/${task.id}`}
                className="group border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 hover:shadow-md transition-shadow">
                <div className={`h-1.5 ${verticalBar[task.vertical]}`} />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${VERTICAL_COLORS[task.vertical]}`}>
                      {VERTICAL_LABELS[task.vertical]}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{DIFFICULTY_LABELS[task.difficulty]}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#1b2660] dark:group-hover:text-[#f5a623] transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{task.timeEstimate}</span>
                    <span className="text-sm font-bold text-[#f5a623]">+{task.points.toLocaleString()} pts</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Rewards */}
      {(tab === "all" || tab === "rewards") && filteredRewards.length > 0 && (
        <div>
          {tab === "all" && <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Rewards</h2>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRewards.map((reward) => (
              <Link key={reward.id} href={`/rewards/${reward.id}`}
                className="group border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 hover:shadow-md transition-shadow">
                <div className={`h-1.5 ${verticalBar[reward.vertical]}`} />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${VERTICAL_COLORS[reward.vertical]}`}>
                      {VERTICAL_LABELS[reward.vertical]}
                    </span>
                    <span className="text-sm font-bold text-amber-600">{reward.value}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#1b2660] dark:group-hover:text-[#f5a623] transition-colors">
                    {reward.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{reward.vendor}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900 dark:text-white block">{reward.pointCost.toLocaleString()} pts</span>
                      <span className="text-xs text-slate-400">≈ RM {reward.priceMYR}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {noResults && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg mb-4">No items match this filter.</p>
          <button onClick={() => setVertical("all")} className="text-[#f5a623] font-semibold text-sm hover:underline">
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">Loading...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
