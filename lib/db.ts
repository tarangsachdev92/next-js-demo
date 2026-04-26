import "server-only";

import { Pool } from "pg";

declare global {
  var __dbPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const pool =
  global.__dbPool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== "production") {
  global.__dbPool = pool;
}

let usersTableReady: Promise<void> | undefined;
let passwordResetTokensTableReady: Promise<void> | undefined;
let productsTableReady: Promise<void> | undefined;
let blogPostsTableReady: Promise<void> | undefined;

export async function ensureUsersTable() {
  usersTableReady ??= pool
    .query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
    .then(() => undefined);

  return usersTableReady;
}

export async function ensurePasswordResetTokensTable() {
  passwordResetTokensTableReady ??= pool
    .query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token_hash TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMPTZ NOT NULL,
        used_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
    .then(() => undefined);

  return passwordResetTokensTableReady;
}

export async function ensureProductsTable() {
  productsTableReady ??= pool
    .query(`
      CREATE TABLE IF NOT EXISTS products (
        id BIGINT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        price DOUBLE PRECISION NOT NULL,
        rating DOUBLE PRECISION NOT NULL,
        brand TEXT,
        thumbnail TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
    .then(() => undefined);

  return productsTableReady;
}

export async function ensureBlogPostsTable() {
  blogPostsTableReady ??= pool
    .query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id BIGINT PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        tags TEXT[] NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
    .then(() => undefined);

  return blogPostsTableReady;
}

export { pool };
