import "reflect-metadata";
import { getServerSession } from "next-auth";
import { authOptionsFactory } from "@/app/api/auth/[...nextauth]/authOptions";

import container from "@/infrastructure/container";

export default async function Home() {
  const session = await getServerSession(authOptionsFactory(container));

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <p className="text-5xl">{JSON.stringify(session)}</p>
    </main>
  );
}
