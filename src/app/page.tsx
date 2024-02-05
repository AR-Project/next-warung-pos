import getAppSession from "@/presentation/utils/getAppSession";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAppSession();

  if (!session) {
    redirect("/login");
  }

  // TODO: create lib for fetching store info on active store

  return (
    <main className="flex flex-col items-center justify-center h-full bg-zinc-700 gap-4">
      <pre className="text-sm border p-1 break-words">
        {JSON.stringify(session.user, null, 4)}
      </pre>
    </main>
  );
}
