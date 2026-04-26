import "server-only";

import bcrypt from "bcryptjs";
import crypto from "node:crypto";

import {
  ensurePasswordResetTokensTable,
  ensureUsersTable,
  pool,
} from "@/lib/db";

type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

function mapUser(row: {
  id: string | number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}): UserRecord {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
  };
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  await ensureUsersTable();

  const passwordHash = await bcrypt.hash(input.password, 12);

  const result = await pool.query<{
    id: string | number;
    name: string;
    email: string;
    password_hash: string;
    created_at: Date;
  }>(
    `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, password_hash, created_at
    `,
    [input.name, input.email.toLowerCase(), passwordHash],
  );

  return mapUser(result.rows[0]);
}

export async function findUserByEmail(email: string) {
  await ensureUsersTable();

  const result = await pool.query<{
    id: string | number;
    name: string;
    email: string;
    password_hash: string;
    created_at: Date;
  }>(
    `
      SELECT id, name, email, password_hash, created_at
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    [email.toLowerCase()],
  );

  return result.rows[0] ? mapUser(result.rows[0]) : null;
}

export async function verifyUserCredentials(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const matches = await bcrypt.compare(password, user.passwordHash);

  if (!matches) {
    return null;
  }

  return user;
}

export async function createPasswordResetToken(userId: string) {
  await ensureUsersTable();
  await ensurePasswordResetTokensTable();

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  await pool.query(
    `
      DELETE FROM password_reset_tokens
      WHERE user_id = $1 OR expires_at < NOW() OR used_at IS NOT NULL
    `,
    [userId],
  );

  await pool.query(
    `
      INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
      VALUES ($1, $2, NOW() + INTERVAL '1 hour')
    `,
    [userId, tokenHash],
  );

  return rawToken;
}

export async function findPasswordResetToken(rawToken: string) {
  await ensureUsersTable();
  await ensurePasswordResetTokensTable();

  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  const result = await pool.query<{
    id: string | number;
    user_id: string | number;
    email: string;
    name: string;
    expires_at: Date;
  }>(
    `
      SELECT prt.id, prt.user_id, u.email, u.name, prt.expires_at
      FROM password_reset_tokens prt
      INNER JOIN users u ON u.id = prt.user_id
      WHERE prt.token_hash = $1
        AND prt.used_at IS NULL
        AND prt.expires_at > NOW()
      LIMIT 1
    `,
    [tokenHash],
  );

  if (!result.rows[0]) {
    return null;
  }

  return {
    id: String(result.rows[0].id),
    userId: String(result.rows[0].user_id),
    email: result.rows[0].email,
    name: result.rows[0].name,
    expiresAt: result.rows[0].expires_at,
  };
}

export async function updateUserPassword(userId: string, password: string) {
  await ensureUsersTable();

  const passwordHash = await bcrypt.hash(password, 12);

  await pool.query(
    `
      UPDATE users
      SET password_hash = $2
      WHERE id = $1
    `,
    [userId, passwordHash],
  );
}

export async function markPasswordResetTokenUsed(tokenId: string) {
  await ensurePasswordResetTokensTable();

  await pool.query(
    `
      UPDATE password_reset_tokens
      SET used_at = NOW()
      WHERE id = $1
    `,
    [tokenId],
  );
}
