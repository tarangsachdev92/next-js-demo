import Link from "next/link";
import { getPosts } from "./posts";

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/90">
          <div className="bg-gradient-to-r from-orange-100 via-amber-50 to-white px-8 py-10 dark:from-orange-950/40 dark:via-slate-900 dark:to-slate-900">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 dark:text-orange-300">
              Blog
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Live posts loaded from an API instead of local mock data.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              This page now fetches its content from DummyJSON on the server,
              then renders each post as a styled card in the App Router.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex h-full flex-col rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-black/20"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="rounded-full bg-orange-100 px-3 py-1 font-medium text-orange-700 dark:bg-orange-950/60 dark:text-orange-200">
                  Post #{post.id}
                </span>
                <span>{post.tags.length} tags</span>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {post.title}
              </h2>

              <p className="mt-4 flex-1 text-base leading-7 text-slate-600 dark:text-slate-300">
                {post.body.length > 140
                  ? `${post.body.slice(0, 140)}...`
                  : post.body}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.id}`}
                className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
              >
                Read article
              </Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
