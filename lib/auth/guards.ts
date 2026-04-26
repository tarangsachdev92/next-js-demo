import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";

export const requireSession = cache(async () => {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  return session;
});
