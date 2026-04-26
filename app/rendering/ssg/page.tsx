export const dynamic = "force-static";


export default function SSGPage() {
    const buildTime = new Date().toLocaleString();
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 p-8">
            <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/90">
                <h1 className="mb-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    SSG Example
                </h1>
                <p className="mb-4 text-slate-600 dark:text-slate-300">
                    This page is statically generated at build time.
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    Build time: <strong>{buildTime}</strong>
                </p>
                <div className="mt-6">
                    <a
                        href="/rendering"
                        className="inline-flex rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                    >
                        Back to Rendering Menu
                    </a>
                </div>
            </div>
        </div>
    );
}
