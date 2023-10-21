import getAppSession from "@/presentation/utils/getAppSession";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import LogoutButton from "../LogoutButton";

export default async function UserInfo() {
  const session = await getAppSession();

  if (!session) {
    return <a href="/login">Login</a>;
  }

  return (
    <div className="flex flex-row h-full items-center gap-1">
      <a
        href="/settings"
        className="underline"
      >{`Hello, ${session?.user.username}`}</a>
      <LogoutButton />
    </div>
  );
}
