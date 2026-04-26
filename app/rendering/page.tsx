import Link from "next/link";

export default function RenderingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 p-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/90">
        <h1 className="mb-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Rendering Examples
        </h1>
        <p className="mb-6 text-slate-600 dark:text-slate-300">
          This menu links to examples for SSG, SSR, and ISR in the App Router.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/rendering/ssg"
            className="rounded-3xl border border-slate-200 bg-slate-100 p-6 text-left transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
          >
            <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              SSG
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Static site generation: prerendered at build time.
            </p>
          </Link>

          <Link
            href="/rendering/ssr"
            className="rounded-3xl border border-slate-200 bg-slate-100 p-6 text-left transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
          >
            <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              SSR
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Server-side rendering: generated on each request.
            </p>
          </Link>

          <Link
            href="/rendering/isr"
            className="rounded-3xl border border-slate-200 bg-slate-100 p-6 text-left transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
          >
            <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              ISR
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Incremental static regeneration: static page refreshed periodically.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
