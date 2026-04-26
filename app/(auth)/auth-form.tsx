"use client";

import { useActionState } from "react";

import type { AuthFormState } from "@/lib/auth/validation";

type AuthFormProps = {
  action: (
    state: AuthFormState,
    formData: FormData,
  ) => Promise<AuthFormState>;
  fields: Array<{
    name:
      | "name"
      | "email"
      | "password"
      | "token"
      | "newPassword"
      | "confirmPassword";
    label: string;
    type?: string;
    placeholder: string;
    defaultValue?: string;
    readOnly?: boolean;
  }>;
  title: string;
  description: string;
  submitLabel: string;
  footer: React.ReactNode;
};

const initialState: AuthFormState = undefined;

export function AuthForm({
  action,
  fields,
  title,
  description,
  submitLabel,
  footer,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/70">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">
          Backend auth
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          {title}
        </h1>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </div>

      <form action={formAction} className="space-y-5">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-slate-800"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              readOnly={field.readOnly}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white"
            />
            {state?.errors?.[field.name] ? (
              <p className="text-sm text-rose-600">
                {state.errors[field.name]?.join(" ")}
              </p>
            ) : null}
          </div>
        ))}

        {state?.message ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {state.message}
          </div>
        ) : null}

        {state?.success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <p>{state.success}</p>
            {state.resetUrl ? (
              <a href={state.resetUrl} className="mt-2 inline-flex font-semibold underline">
                Open reset password page
              </a>
            ) : null}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Working..." : submitLabel}
        </button>
      </form>

      <div className="mt-6 text-sm text-slate-600">{footer}</div>
    </div>
  );
}
