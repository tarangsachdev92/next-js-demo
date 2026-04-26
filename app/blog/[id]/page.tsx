import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "../posts";
import { requireSession } from "@/lib/auth/guards";

export const dynamic = "force-dynamic";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <article className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/90">
        <div className="border-b border-slate-200/80 bg-gradient-to-r from-orange-100 via-amber-50 to-white px-8 py-8 dark:border-slate-800 dark:from-orange-950/40 dark:via-slate-900 dark:to-slate-900">
          <Link
            href="/blog"
            className="inline-flex rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:bg-slate-950"
          >
            Back to blog
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="rounded-full bg-orange-100 px-3 py-1 font-medium text-orange-700 dark:bg-orange-950/60 dark:text-orange-200">
              Post #{post.id}
            </span>
            <span>{post.tags.length} tags</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Loaded from the local Postgres table after syncing from the DummyJSON feed.
          </p>
        </div>

        <div className="space-y-6 px-8 py-8">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
            {post.body}
          </p>
        </div>
      </article>
    </div>
  );
}
