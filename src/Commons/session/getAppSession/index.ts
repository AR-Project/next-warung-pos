import "reflect-metadata";

import { getServerSession } from "next-auth/next";

import container from "@/infrastructure/container";
import { authOptionsFactory } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function getAppSession() {
  const session = await getServerSession(authOptionsFactory(container));
  return session;
}
