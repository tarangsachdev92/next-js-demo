import Link from "next/link";

import { signIn } from "@/app/actions/auth";
import { AuthForm } from "@/app/(auth)/auth-form";
import { redirectIfAuthenticated } from "@/lib/auth/guards";

export default async function SignInPage() {
  await redirectIfAuthenticated();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#cffafe,_#f8fafc_55%)] px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-5">
          <p className="inline-flex rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700">
            Step 1
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950">
            Sign in to the new backend.
          </h1>
          <p className="text-lg leading-8 text-slate-700">
            This app now uses your Docker Postgres database for accounts, with
            passwords hashed on the server and a signed session cookie for login state.
          </p>
        </div>

        <AuthForm
          action={signIn}
          title="Welcome back"
          description="Use the account stored in Postgres to enter the app."
          submitLabel="Sign in"
          fields={[
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "you@example.com",
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Enter your password",
            },
          ]}
          footer={
            <div className="space-y-2">
              <p>
                Need an account?{" "}
                <Link href="/signup" className="font-semibold text-cyan-700">
                  Create one here
                </Link>
                .
              </p>
              <p>
                Forgot your password?{" "}
                <Link
                  href="/forgot-password"
                  className="font-semibold text-cyan-700"
                >
                  Reset it here
                </Link>
                .
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}
