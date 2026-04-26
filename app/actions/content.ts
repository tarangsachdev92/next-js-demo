"use server";

import { revalidatePath } from "next/cache";

import { requireSession } from "@/lib/auth/guards";
import { syncPostsFromApi } from "@/lib/content/posts";
import { syncProductsFromApi } from "@/lib/content/products";

export async function syncCatalogContent() {
  await requireSession();

  const [productsCount, postsCount] = await Promise.all([
    syncProductsFromApi(),
    syncPostsFromApi(),
  ]);

  revalidatePath("/products");
  revalidatePath("/blog");
  revalidatePath("/dashboard");

  return {
    productsCount,
    postsCount,
  };
}
