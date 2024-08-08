import "reflect-metadata";

import { getServerSession } from "next-auth/next";

import container from "@/infrastructure/container";
import { authOptionsFactory } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

/**
 * Get Session on server with redirect if not logged in
 */
export default async function getActiveStoreFromSession() {
  const session = await getServerSession(authOptionsFactory(container));
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  if (user.activeStore === undefined) {
    redirect("/profile");
  }

  return user.activeStore;
}
