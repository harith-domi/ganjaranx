import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        {/* Big 404 */}
        <p className="text-[120px] font-black leading-none text-[#1b2660]/10 dark:text-white/5 select-none mb-0">
          404
        </p>

        {/* Icon */}
        <div className="w-16 h-16 bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-full flex items-center justify-center mx-auto -mt-6 mb-6">
          <span className="text-[#f5a623] text-2xl">⚡</span>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          Looks like this page took a wrong turn. The rewards are still here — let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#1b2660] hover:bg-[#141d4a] text-white font-bold px-8 py-3.5 rounded-full transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/marketplace"
            className="border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-8 py-3.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Browse Marketplace
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Need help?{" "}
          <Link href="/contact" className="text-[#f5a623] hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
