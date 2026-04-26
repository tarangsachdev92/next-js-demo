import Link from "next/link";

import { AuthForm } from "@/app/(auth)/auth-form";
import { requestPasswordReset } from "@/app/actions/auth";
import { redirectIfAuthenticated } from "@/lib/auth/guards";

export default async function ForgotPasswordPage() {
  await redirectIfAuthenticated();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fef3c7,_#f8fafc_55%)] px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-5">
          <p className="inline-flex rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Password reset
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950">
            Forgot your password?
          </h1>
          <p className="text-lg leading-8 text-slate-700">
            Enter your account email and we&apos;ll prepare a reset link. For now, this
            app shows the link directly in development so you can test the full flow.
          </p>
        </div>

        <AuthForm
          action={requestPasswordReset}
          title="Request reset link"
          description="Use the same email address you used while signing up."
          submitLabel="Generate reset link"
          fields={[
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "you@example.com",
            },
          ]}
          footer={
            <p>
              Remembered it?{" "}
              <Link href="/signin" className="font-semibold text-amber-700">
                Go back to sign in
              </Link>
              .
            </p>
          }
        />
      </div>
    </div>
  );
}
