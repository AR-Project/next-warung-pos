import "reflect-metadata";
import { getServerSession } from "next-auth";
import { authOptionsFactory } from "@/app/api/auth/[...nextauth]/authOptions";

import container from "@/infrastructure/container";
import LogoutButton from "@/presentation/component/LogoutButton";

export default async function Home() {
  const session = await getServerSession(authOptionsFactory(container));

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen bg-zinc-700 gap-4">
      {session ? (
        <>
          <LogoutButton />
          <p className="text-lg border w-full p-5 break-words">
            {JSON.stringify(session)}
          </p>
        </>
      ) : (
        <p>
          Please{" "}
          <a className="text-indigo-200 underline" href="/login">
            login
          </a>{" "}
          first.
        </p>
      )}
    </main>
  );
}
