import Link from "next/link";

import { signUp } from "@/app/actions/auth";
import { AuthForm } from "@/app/(auth)/auth-form";
import { redirectIfAuthenticated } from "@/lib/auth/guards";

export default async function SignUpPage() {
  await redirectIfAuthenticated();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_50%)] px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-5">
          <p className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-700">
            Step 1
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950">
            Create the first account for your app.
          </h1>
          <p className="text-lg leading-8 text-slate-700">
            We are starting with core backend auth so later features like posts and blogs
            can belong to real users in Postgres.
          </p>
        </div>

        <AuthForm
          action={signUp}
          title="Sign up"
          description="Your account is stored in the Postgres container defined in docker compose."
          submitLabel="Create account"
          fields={[
            {
              name: "name",
              label: "Name",
              placeholder: "Your name",
            },
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
              placeholder: "Minimum 8 characters",
            },
          ]}
          footer={
            <p>
              Already have an account?{" "}
              <Link href="/signin" className="font-semibold text-sky-700">
                Sign in instead
              </Link>
              .
            </p>
          }
        />
      </div>
    </div>
  );
}
