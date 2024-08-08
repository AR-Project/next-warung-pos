import { SlEqualizer } from "react-icons/sl";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div className="flex flex-col gap-2 p-2 mt-5">
      <p>
        <Link
          className="flex flex-row gap-1 fborder rounded-sm text-md w-fit uppercase font-bold items-center bg-blue-600 py-2 px-5 border border-white shadow-sm"
          href={"./manage"}
        >
          <SlEqualizer /> Manage Store
        </Link>
      </p>
      <p className="text-xs text-gray-500 italic">
        TODO: Display store dynamic information: Total transaction, total gross,
        item sold, etc
      </p>
    </div>
  );
}
