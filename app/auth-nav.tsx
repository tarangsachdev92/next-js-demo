import Link from "next/link";

import { getSession } from "@/lib/auth/session";

export async function AuthNav() {
  const session = await getSession();

  if (session) {
    return (
      <>
        <Link
          href="/dashboard"
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          Dashboard
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/signup"
        className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
      >
        Sign Up
      </Link>
      <Link
        href="/signin"
        className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
      >
        Sign In
      </Link>
      <Link
        href="/forgot-password"
        className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
      >
        Forgot Password
      </Link>
      <Link
        href="/dashboard"
        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
      >
        Dashboard
      </Link>
    </>
  );
}
