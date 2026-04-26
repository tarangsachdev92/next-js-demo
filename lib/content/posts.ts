import "server-only";

import { cache } from "react";

import { ensureBlogPostsTable, pool } from "@/lib/db";

export type DummyPost = {
  id: number;
  title: string;
  body: string;
  tags: string[];
};

type DummyPostsResponse = {
  posts: DummyPost[];
};

const POSTS_URL = "https://dummyjson.com/posts";

function mapPost(row: {
  id: string | number;
  title: string;
  body: string;
  tags: string[] | null;
}): DummyPost {
  return {
    id: Number(row.id),
    title: row.title,
    body: row.body,
    tags: row.tags ?? [],
  };
}

async function fetchPostsFromApi() {
  const response = await fetch(POSTS_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blog posts from DummyJSON.");
  }

  const data = (await response.json()) as DummyPostsResponse;
  return data.posts;
}

async function fetchPostFromApi(id: string) {
  if (!/^\d+$/.test(id)) {
    return null;
  }

  const response = await fetch(`${POSTS_URL}/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch blog post from DummyJSON.");
  }

  return (await response.json()) as DummyPost;
}

export async function syncPostsFromApi() {
  await ensureBlogPostsTable();

  const posts = await fetchPostsFromApi();

  for (const post of posts) {
    await pool.query(
      `
        INSERT INTO blog_posts (
          id,
          title,
          body,
          tags,
          updated_at
        )
        VALUES ($1, $2, $3, $4, NOW())
        ON CONFLICT (id)
        DO UPDATE SET
          title = EXCLUDED.title,
          body = EXCLUDED.body,
          tags = EXCLUDED.tags,
          updated_at = NOW()
      `,
      [post.id, post.title, post.body, post.tags],
    );
  }

  return posts.length;
}

async function upsertSinglePost(post: DummyPost) {
  await ensureBlogPostsTable();

  await pool.query(
    `
      INSERT INTO blog_posts (
        id,
        title,
        body,
        tags,
        updated_at
      )
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (id)
      DO UPDATE SET
        title = EXCLUDED.title,
        body = EXCLUDED.body,
        tags = EXCLUDED.tags,
        updated_at = NOW()
    `,
    [post.id, post.title, post.body, post.tags],
  );
}

async function getPostsFromDb() {
  await ensureBlogPostsTable();

  const result = await pool.query<{
    id: string | number;
    title: string;
    body: string;
    tags: string[] | null;
  }>(
    `
      SELECT id, title, body, tags
      FROM blog_posts
      ORDER BY id ASC
    `,
  );

  return result.rows.map(mapPost);
}

async function getPostFromDb(id: string) {
  await ensureBlogPostsTable();

  const result = await pool.query<{
    id: string | number;
    title: string;
    body: string;
    tags: string[] | null;
  }>(
    `
      SELECT id, title, body, tags
      FROM blog_posts
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  return result.rows[0] ? mapPost(result.rows[0]) : null;
}

export const getPosts = cache(async () => {
  let posts = await getPostsFromDb();

  if (posts.length === 0) {
    await syncPostsFromApi();
    posts = await getPostsFromDb();
  }

  return posts;
});

export async function getPost(id: string) {
  let post = await getPostFromDb(id);

  if (post) {
    return post;
  }

  const apiPost = await fetchPostFromApi(id);

  if (!apiPost) {
    return null;
  }

  await upsertSinglePost(apiPost);
  post = await getPostFromDb(id);

  return post;
}
