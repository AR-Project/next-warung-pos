"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  stores?: StoreInfo[];
};

export default function SelectStore({ stores }: Props) {
  const { data, update } = useSession();

  if (!stores) {
    return <>You dont have any store,</>;
  }

  async function selectStore(storeId: string) {
    await update({ activeStore: storeId });
  }

  return (
    <div className="flex flex-col gap 5 m-4 pb-4">
      <h1 className="text-xl pb-4 font-bold ">🛒 Select Store</h1>
      <ol className="flex flex-col gap-3">
        {stores.length === 0 && <div>You dont have any store</div>}
        {stores.map((store) => (
          <li
            className={`${
              data?.user.activeStore === store.id ? "font-bold bg-gray-700" : ""
            } border rounded-md p-1 hover:bg-gray-500 cursor-pointer`}
            key={store.id}
            onClick={() => selectStore(store.id)}
          >
            {store.name} - {store.id}
          </li>
        ))}
      </ol>
    </div>
  );
}
