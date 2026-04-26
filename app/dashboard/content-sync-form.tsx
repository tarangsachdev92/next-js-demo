"use client";

import { useActionState } from "react";

import { syncCatalogContent } from "@/app/actions/content";

type SyncState =
  | {
      message?: string;
    }
  | undefined;

async function syncCatalogContentWithMessage(): Promise<SyncState> {
  const result = await syncCatalogContent();

  return {
    message: `Synced ${result.productsCount} products and ${result.postsCount} blog posts into Postgres.`,
  };
}

export function ContentSyncForm() {
  const [state, formAction, pending] = useActionState(
    syncCatalogContentWithMessage,
    undefined,
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
            Content sync
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Import blog and product data into Postgres
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This pulls the current records from the DummyJSON product and blog APIs, then
            upserts them into your local Docker database tables.
          </p>
        </div>

        <form action={formAction}>
          <button
            type="submit"
            disabled={pending}
            className="rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Syncing..." : "Sync content"}
          </button>
        </form>
      </div>

      {state?.message ? (
        <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
