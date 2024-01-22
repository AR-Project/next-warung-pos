import getAppSession from "@/presentation/utils/getAppSession";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getAppSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="text-sm text-gray-500">
        Profile Details, address, billing, info, total store owned
      </div>

      {/* TODO: Create component that display active store */}
      <Link
        className="border p-1 rounded-md bg-gray-500 hover:bg-blue-500"
        href="./new-store"
      >
        + Create store
      </Link>
    </>
  );
}
