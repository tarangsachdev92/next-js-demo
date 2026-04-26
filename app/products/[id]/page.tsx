import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "../data";
import { requireSession } from "@/lib/auth/guards";

export const dynamic = "force-dynamic";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDateTime(value?: string | null) {
  if (!value) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(value));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/products"
            className="inline-flex rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:bg-slate-950"
          >
            Back to products
          </Link>

          <div className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300">
            Product synced:
            <span className="ml-2 font-medium">{formatDateTime(product.updatedAt)}</span>
          </div>
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/90">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.25),_transparent_35%),linear-gradient(135deg,#fff7ed_0%,#ffffff_45%,#f8fafc_100%)] px-8 py-10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_30%),linear-gradient(135deg,#292524_0%,#0f172a_55%,#020617_100%)]">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold uppercase tracking-[0.2em] text-amber-700 dark:bg-amber-950/60 dark:text-amber-200">
                    {product.category}
                  </span>
                  <span>Product #{product.id}</span>
                  <span>{product.brand ?? "Generic"}</span>
                </div>

                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  {product.title}
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                  {product.description}
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-amber-200/80 bg-white/85 px-6 py-5 shadow-sm backdrop-blur dark:border-amber-500/20 dark:bg-slate-950/45">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Price
                </p>
                <p className="mt-2 text-4xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-8 py-8 lg:grid-cols-[1.7fr_0.9fr]">
            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Product overview
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-300">
                {product.description}
              </p>
            </section>

            <aside className="space-y-4">
              <div className="rounded-[1.5rem] bg-slate-100 p-5 dark:bg-slate-950">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Rating
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">
                  {product.rating.toFixed(1)}
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-slate-100 p-5 dark:bg-slate-950">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Brand
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {product.brand ?? "Generic"}
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-slate-100 p-5 dark:bg-slate-950">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Delivery note
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  This detail page now reads from the Postgres-backed catalog after
                  the content import has synced product rows into the database.
                </p>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </div>
  );
}
