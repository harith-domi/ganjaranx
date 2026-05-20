import { notFound } from "next/navigation";
import Link from "next/link";
import { rewards, VERTICAL_LABELS, VERTICAL_COLORS } from "@/lib/data";

const verticalBar: Record<string, string> = {
  property: "bg-blue-500",
  ev: "bg-emerald-500",
  digital: "bg-violet-500",
  fnb: "bg-orange-500",
  health: "bg-rose-500",
  travel: "bg-cyan-500",
};

export function generateStaticParams() {
  return rewards.map((r) => ({ id: r.id }));
}

export default async function RewardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reward = rewards.find((r) => r.id === id);
  if (!reward) notFound();

  const related = rewards
    .filter((r) => r.id !== reward.id && r.vertical === reward.vertical)
    .slice(0, 2);

  const inStock = reward.stock > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-sm text-slate-500 dark:text-slate-400 mb-8 flex items-center gap-2">
        <Link href="/marketplace?tab=rewards" className="hover:text-[#f5a623] transition-colors">
          Rewards
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white">{reward.title}</span>
      </nav>

      <div className="border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden bg-white dark:bg-slate-800">
        <div className={`h-2 ${verticalBar[reward.vertical]}`} />
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${VERTICAL_COLORS[reward.vertical]}`}>
              {VERTICAL_LABELS[reward.vertical]}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
              {reward.value}
            </span>
            {inStock ? (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                {reward.stock} left in stock
              </span>
            ) : (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                Out of stock
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            {reward.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">by {reward.vendor}</p>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
            {reward.description}
          </p>

          {/* Point cost */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">
                Redemption Cost
              </p>
              <p className="text-4xl font-extrabold text-[#f5a623]">
                {reward.pointCost.toLocaleString()}
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400">Ganjaran Points</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">Worth</p>
              <p className="text-3xl font-extrabold text-[#f5a623]">{reward.value}</p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">≈ RM {reward.priceMYR}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={inStock ? `/checkout/${reward.id}` : "#"}
              className={`flex-1 font-bold py-4 rounded-full text-center transition-all ${
                inStock
                  ? "bg-[#1b2660] hover:bg-[#141d4a] text-white hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-400 pointer-events-none"
              }`}
            >
              {inStock ? "Redeem Now" : "Out of Stock"}
            </Link>
            <Link
              href="/marketplace?tab=rewards"
              className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-4 rounded-full text-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Browse More Rewards
            </Link>
          </div>
          {inStock && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-5 h-5 rounded bg-[#002060] flex items-center justify-center shrink-0">
                <span className="text-white font-extrabold text-[9px]">B</span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Secure payment via Billplz — FPX, Online Banking, Visa & Mastercard
              </p>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            More rewards in this category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/rewards/${r.id}`}
                className="group border border-slate-200 dark:border-slate-700 rounded-2xl p-5 bg-white dark:bg-slate-800 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#1b2660] dark:group-hover:text-[#f5a623] transition-colors">
                    {r.title}
                  </h3>
                  <span className="text-xs font-bold text-amber-600 ml-2 shrink-0">{r.value}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                  {r.description}
                </p>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {r.pointCost.toLocaleString()} pts
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
