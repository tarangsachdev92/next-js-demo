import { signOut } from "@/app/actions/auth";
import { ContentSyncForm } from "@/app/dashboard/content-sync-form";
import { requireSession } from "@/lib/auth/guards";

export default async function DashboardPage() {
  const session = await requireSession();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
          Protected page
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Hi, {session.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
          Signup and signin are now working against Postgres. This gives us the backend
          base we need before we build posts, blogs, and user-owned content next.
        </p>

        <div className="mt-8 grid gap-4 rounded-3xl bg-slate-50 p-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Signed in email</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {session.email}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">User ID</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {session.userId}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <ContentSyncForm />
        </div>

        <form action={signOut} className="mt-8">
          <button
            type="submit"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
