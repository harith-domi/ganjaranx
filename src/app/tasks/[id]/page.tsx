import { notFound } from "next/navigation";
import Link from "next/link";
import { tasks, VERTICAL_LABELS, VERTICAL_COLORS } from "@/lib/data";

const DIFFICULTY_LABELS = { easy: "Easy", medium: "Medium", hard: "Hard" };
const DIFFICULTY_COLORS = {
  easy: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-red-100 text-red-700",
};

const verticalBar: Record<string, string> = {
  property: "bg-blue-500",
  ev: "bg-emerald-500",
  digital: "bg-violet-500",
  fnb: "bg-orange-500",
  health: "bg-rose-500",
  travel: "bg-cyan-500",
};

export function generateStaticParams() {
  return tasks.map((t) => ({ id: t.id }));
}

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = tasks.find((t) => t.id === id);
  if (!task) notFound();

  const related = tasks
    .filter((t) => t.id !== task.id && t.vertical === task.vertical)
    .slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-sm text-slate-500 dark:text-slate-400 mb-8 flex items-center gap-2">
        <Link href="/marketplace?tab=tasks" className="hover:text-[#f5a623] transition-colors">
          Tasks
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white">{task.title}</span>
      </nav>

      <div className="border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden bg-white dark:bg-slate-800">
        <div className={`h-2 ${verticalBar[task.vertical]}`} />
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${VERTICAL_COLORS[task.vertical]}`}>
              {VERTICAL_LABELS[task.vertical]}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${DIFFICULTY_COLORS[task.difficulty]}`}>
              {DIFFICULTY_LABELS[task.difficulty]}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
              {task.timeEstimate}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            {task.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
            {task.description}
          </p>

          {/* Points reward */}
          <div className="bg-[#1b2660]/5 dark:bg-[#1b2660]/30 border border-[#1b2660]/20 dark:border-[#1b2660]/50 rounded-2xl p-6 flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-medium text-[#1b2660] dark:text-slate-300 mb-1">Reward</p>
              <p className="text-4xl font-extrabold text-[#f5a623]">
                +{task.points.toLocaleString()}
              </p>
              <p className="text-sm text-[#1b2660] dark:text-slate-300">Ganjaran Points</p>
            </div>
            <span className="w-16 h-16 bg-[#1b2660] text-[#f5a623] rounded-2xl flex items-center justify-center text-2xl font-extrabold">
              G
            </span>
          </div>

          {/* Steps */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              How to complete
            </h2>
            <ol className="flex flex-col gap-4">
              {task.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-7 h-7 bg-[#1b2660] text-[#f5a623] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/auth/signup"
              className="flex-1 bg-[#1b2660] hover:bg-[#141d4a] text-white font-bold py-4 rounded-full text-center transition-colors"
            >
              Start This Task
            </Link>
            <Link
              href="/marketplace"
              className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-4 rounded-full text-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Browse More Tasks
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            More tasks in this category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((t) => (
              <Link
                key={t.id}
                href={`/tasks/${t.id}`}
                className="group border border-slate-200 dark:border-slate-700 rounded-2xl p-5 bg-white dark:bg-slate-800 hover:shadow-md transition-shadow"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#1b2660] dark:group-hover:text-[#f5a623] transition-colors">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                  {t.description}
                </p>
                <span className="text-sm font-bold text-[#f5a623]">
                  +{t.points.toLocaleString()} pts
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
