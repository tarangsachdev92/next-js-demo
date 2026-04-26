import Link from "next/link";
import { getProducts } from "./data";

export const revalidate = 30;

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function ProductsPage() {
  const products = await getProducts();
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date());

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/90">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.25),_transparent_35%),linear-gradient(135deg,#fff7ed_0%,#ffffff_45%,#f8fafc_100%)] px-8 py-10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_30%),linear-gradient(135deg,#292524_0%,#0f172a_55%,#020617_100%)]">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-300">
                  Products
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  An ISR-powered product catalog with live API content.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                  This page fetches from DummyJSON and is regenerated in the
                  background every 30 seconds, which makes it a nice fit for a
                  browsable catalog that changes occasionally.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-amber-200/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur dark:border-amber-500/20 dark:bg-slate-950/40">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  ISR Window
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">
                  30s
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Time-based revalidation
                </p>
              </div>
            </div>

            <div className="mt-6 inline-flex rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300">
              Last updated: <span className="ml-2 font-medium">{lastUpdated}</span>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-black/20"
            >
              <div className="border-b border-slate-200/80 bg-gradient-to-br from-slate-100 via-white to-amber-50 px-6 py-6 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:bg-amber-950/60 dark:text-amber-200">
                    {product.category}
                  </span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    #{product.id}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  {product.title}
                </h2>
              </div>

              <div className="flex flex-1 flex-col px-6 py-6">
                <p className="line-clamp-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                  {product.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-950">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Price
                    </p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-950">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Rating
                    </p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {product.rating.toFixed(1)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200/80 pt-5 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Brand
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                      {product.brand ?? "Generic"}
                    </p>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition group-hover:bg-amber-500 group-hover:text-slate-950 dark:bg-slate-100 dark:text-slate-950"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
