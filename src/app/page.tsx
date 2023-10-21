import getAppSession from "@/presentation/utils/getAppSession";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAppSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen bg-zinc-700 gap-4">
      <p className="text-lg border w-full p-5 break-words">
        {JSON.stringify(session)}
      </p>
    </main>
  );
}
