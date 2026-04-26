import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fafc_0%,_#ecfeff_48%,_#eef2ff_100%)] p-8 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-cyan-100/70">
        <p className="mb-4 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700">
          Backend phase
        </p>
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-slate-900">
          Next.js demo with auth first.
        </h1>
        <p className="mb-8 max-w-2xl text-base leading-7 text-slate-600">
          We&apos;re turning this sample app into a real product step by step. The first
          backend milestone is user signup and signin with the Postgres database from
          Docker.
        </p>
        <div className="grid gap-3 text-slate-700 sm:grid-cols-2">
          <Link
            href="/signup"
            className="inline-flex rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Create account
          </Link>
          <Link
            href="/signin"
            className="inline-flex rounded-2xl bg-cyan-100 px-4 py-3 text-sm font-medium text-cyan-950 transition hover:bg-cyan-200"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-950 transition hover:bg-emerald-200"
          >
            Open dashboard
          </Link>
          <Link
            href="/about"
            className="inline-flex rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
          >
            Go to About
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
          >
            Go to Contact
          </Link>
          <Link
            href="/rendering"
            className="inline-flex rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
          >
            Go to Rendering Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
