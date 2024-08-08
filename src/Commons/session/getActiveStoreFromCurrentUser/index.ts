import "reflect-metadata";

import { getServerSession } from "next-auth/next";

import container from "@/infrastructure/container";
import { authOptionsFactory } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function getActiveStoreFromCurrentUser() {
  const session = await getServerSession(authOptionsFactory(container));
  if (!session) {
    throw new Error("Must login first");
  }

  const { activeStore } = session.user;

  if (!activeStore) {
    throw new Error("Must select store first");
  }

  return activeStore;
}
