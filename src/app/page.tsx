import { getStoreInfo } from "@/Commons/action/storeAction";
import getAppSession from "@/presentation/utils/getAppSession";
import { redirect } from "next/navigation";
import StoreInfo from "./StoreInfo";

export default async function Home() {
  const session = await getAppSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center h-full bg-zinc-700 gap-4">
      {session.user.activeStore && (
        <StoreInfo storeId={session.user.activeStore} />
      )}
      <pre className="text-sm border p-1 break-words">
        {JSON.stringify(session.user, null, 4)}
      </pre>
    </main>
  );
}
