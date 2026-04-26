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

export async function getPosts() {
  const response = await fetch(POSTS_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const data = (await response.json()) as DummyPostsResponse;
  return data.posts;
}

export async function getPost(id: string) {
  const response = await fetch(`${POSTS_URL}/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch blog post");
  }

  return (await response.json()) as DummyPost;
}
