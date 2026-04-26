import Link from "next/link";

import { AuthForm } from "@/app/(auth)/auth-form";
import { resetPassword } from "@/app/actions/auth";
import { redirectIfAuthenticated } from "@/lib/auth/guards";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  await redirectIfAuthenticated();
  const params = await searchParams;
  const token = params.token ?? "";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#d1fae5,_#f8fafc_55%)] px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-5">
          <p className="inline-flex rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Password reset
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950">
            Choose a new password.
          </h1>
          <p className="text-lg leading-8 text-slate-700">
            This page uses a one-time reset token. Once you save the new password, the
            token is marked as used and can&apos;t be reused.
          </p>
        </div>

        <AuthForm
          action={resetPassword}
          title="Reset password"
          description="Set a fresh password for your account."
          submitLabel="Update password"
          fields={[
            {
              name: "token",
              label: "Reset token",
              placeholder: "Reset token",
              defaultValue: token,
              readOnly: Boolean(token),
            },
            {
              name: "newPassword",
              label: "New password",
              type: "password",
              placeholder: "Minimum 8 characters",
            },
            {
              name: "confirmPassword",
              label: "Confirm password",
              type: "password",
              placeholder: "Type it again",
            },
          ]}
          footer={
            <p>
              Back to{" "}
              <Link href="/signin" className="font-semibold text-emerald-700">
                sign in
              </Link>
              .
            </p>
          }
        />
      </div>
    </div>
  );
}
