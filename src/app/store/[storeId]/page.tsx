import { BackButton } from "@/presentation/component/BackButton";
import getAppSession from "@/presentation/utils/getAppSession";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { storeId: string };
}) {
  const session = await getAppSession();

  return (
    <>
      <BackButton></BackButton>
      <div>This is store page: {params.storeId}</div>
      <div>Store id on session: {session?.user.activeStore}</div>
      <p>
        <Link
          className="border rounded-md text-md w-full bg-blue-400 p-1 border-blue-900/20 shadow-md"
          href={"./manage"}
        >
          manage store
        </Link>
      </p>
      <p>TODO: Store Transaction Page, client side</p>
    </>
  );
}
