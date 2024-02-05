import getAppSession from "@/presentation/utils/getAppSession";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getStoresByUserId } from "./action";
import SelectStore from "./SelectStore";

export default async function Profile() {
  const session = await getAppSession();
  if (!session) {
    redirect("/login");
  }

  const data = await getStoresByUserId(session.user.id);

  return (
    <>
      <SelectStore stores={data} />
      <Link
        className="border p-1 rounded-md bg-gray-500 hover:bg-blue-500"
        href="./new-store"
      >
        + Create store
      </Link>
    </>
  );
}

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
