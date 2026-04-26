import "server-only";

import { cache } from "react";

import { ensureProductsTable, pool } from "@/lib/db";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  brand?: string;
  thumbnail?: string;
  updatedAt?: string;
};

export type ProductFilters = {
  minRating?: number;
  maxPrice?: number;
};

type ProductsResponse = {
  products: Product[];
};

const PRODUCTS_URL = "https://dummyjson.com/products";

function mapProduct(row: {
  id: string | number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  brand: string | null;
  thumbnail: string | null;
  updated_at?: Date | string | null;
}): Product {
  return {
    id: Number(row.id),
    title: row.title,
    description: row.description,
    category: row.category,
    price: Number(row.price),
    rating: Number(row.rating),
    brand: row.brand ?? undefined,
    thumbnail: row.thumbnail ?? undefined,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : undefined,
  };
}

async function fetchProductsFromApi() {
  const response = await fetch(PRODUCTS_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products from DummyJSON.");
  }

  const data = (await response.json()) as ProductsResponse;
  return data.products;
}

async function fetchProductFromApi(id: string) {
  if (!/^\d+$/.test(id)) {
    return null;
  }

  const response = await fetch(`${PRODUCTS_URL}/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product from DummyJSON.");
  }

  return (await response.json()) as Product;
}

export async function syncProductsFromApi() {
  await ensureProductsTable();

  const products = await fetchProductsFromApi();

  for (const product of products) {
    await pool.query(
      `
        INSERT INTO products (
          id,
          title,
          description,
          category,
          price,
          rating,
          brand,
          thumbnail,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
        ON CONFLICT (id)
        DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          category = EXCLUDED.category,
          price = EXCLUDED.price,
          rating = EXCLUDED.rating,
          brand = EXCLUDED.brand,
          thumbnail = EXCLUDED.thumbnail,
          updated_at = NOW()
      `,
      [
        product.id,
        product.title,
        product.description,
        product.category,
        product.price,
        product.rating,
        product.brand ?? null,
        product.thumbnail ?? null,
      ],
    );
  }

  return products.length;
}

async function upsertSingleProduct(product: Product) {
  await ensureProductsTable();

  await pool.query(
    `
      INSERT INTO products (
        id,
        title,
        description,
        category,
        price,
        rating,
        brand,
        thumbnail,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      ON CONFLICT (id)
      DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        price = EXCLUDED.price,
        rating = EXCLUDED.rating,
        brand = EXCLUDED.brand,
        thumbnail = EXCLUDED.thumbnail,
        updated_at = NOW()
    `,
    [
      product.id,
      product.title,
      product.description,
      product.category,
      product.price,
      product.rating,
      product.brand ?? null,
      product.thumbnail ?? null,
    ],
  );
}

async function getProductsFromDb() {
  await ensureProductsTable();

  const result = await pool.query<{
    id: string | number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    brand: string | null;
    thumbnail: string | null;
    updated_at: Date | string | null;
  }>(
    `
      SELECT id, title, description, category, price, rating, brand, thumbnail, updated_at
      FROM products
      ORDER BY id ASC
    `,
  );

  return result.rows.map(mapProduct);
}

async function getFilteredProductsFromDb(filters: ProductFilters) {
  await ensureProductsTable();

  const conditions: string[] = [];
  const values: Array<number> = [];

  if (typeof filters.minRating === "number") {
    conditions.push(`rating >= $${values.length + 1}`);
    values.push(filters.minRating);
  }

  if (typeof filters.maxPrice === "number") {
    conditions.push(`price <= $${values.length + 1}`);
    values.push(filters.maxPrice);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query<{
    id: string | number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    brand: string | null;
    thumbnail: string | null;
    updated_at: Date | string | null;
  }>(
    `
      SELECT id, title, description, category, price, rating, brand, thumbnail, updated_at
      FROM products
      ${whereClause}
      ORDER BY rating DESC, price ASC, id ASC
    `,
    values,
  );

  return result.rows.map(mapProduct);
}

async function getProductsCountFromDb() {
  await ensureProductsTable();

  const result = await pool.query<{ count: string }>(
    `
      SELECT COUNT(*)::text AS count
      FROM products
    `,
  );

  return Number(result.rows[0]?.count ?? 0);
}

async function getProductsLastSyncedAtFromDb() {
  await ensureProductsTable();

  const result = await pool.query<{ last_synced_at: Date | string | null }>(
    `
      SELECT MAX(updated_at) AS last_synced_at
      FROM products
    `,
  );

  const value = result.rows[0]?.last_synced_at;
  return value ? new Date(value).toISOString() : null;
}

async function getProductFromDb(id: string) {
  await ensureProductsTable();

  const result = await pool.query<{
    id: string | number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    brand: string | null;
    thumbnail: string | null;
    updated_at: Date | string | null;
  }>(
    `
      SELECT id, title, description, category, price, rating, brand, thumbnail, updated_at
      FROM products
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  return result.rows[0] ? mapProduct(result.rows[0]) : null;
}

export const getProducts = cache(async () => {
  let products = await getProductsFromDb();

  if (products.length === 0) {
    await syncProductsFromApi();
    products = await getProductsFromDb();
  }

  return products;
});

export async function getProductCatalog(filters: ProductFilters) {
  let total = await getProductsCountFromDb();

  if (total === 0) {
    await syncProductsFromApi();
    total = await getProductsCountFromDb();
  }

  const products = await getFilteredProductsFromDb(filters);
  const lastSyncedAt = await getProductsLastSyncedAtFromDb();

  return {
    total,
    filteredTotal: products.length,
    lastSyncedAt,
    products,
  };
}

export async function getProduct(id: string) {
  let product = await getProductFromDb(id);

  if (product) {
    return product;
  }

  const apiProduct = await fetchProductFromApi(id);

  if (!apiProduct) {
    return null;
  }

  await upsertSingleProduct(apiProduct);
  product = await getProductFromDb(id);

  return product;
}
