"use client";
import { useSession } from "next-auth/react";

export default function ClientSide() {
  const { data: session, status, update } = useSession();

  return (
    <div className="border border-indigo-500">
      <h1>Client Side</h1>
      <div>{session && `${session.user.id} -- ${session.user.name}`}</div>
      <button
        className="p-1 border border-white bg-indigo-500 text-white rounded-md"
        onClick={() => console.log({ session })}
      >
        log session
      </button>
    </div>
  );
}
