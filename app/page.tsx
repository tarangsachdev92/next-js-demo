import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 p-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/90">
        <h1 className="mb-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Home Page
        </h1>
        <div className="flex flex-col gap-3 text-slate-700 dark:text-slate-300">
          <Link
            href="/about"
            className="inline-flex rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            Go to About
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            Go to Contact
          </Link>
          <Link
            href="/rendering"
            className="inline-flex rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            Go to Rendering Menu
          </Link>
        </div>
      </div>
    </div>
  );
}