import { SlBasketLoaded } from "react-icons/sl";
import Link from "next/link";

import ProfilePopUp from "../ProfilePopUp";
import getAppSession from "@/Commons/session/getAppSession";

export default async function TopNav() {
  const session = await getAppSession();

  return (
    <section className="flex flex-row justify-between items-center bg-blue-900 h-8 px-2 w-full">
      <Link href="/">
        <h1 className="font-mono font-extrabold flex flex-row justify-center items-center gap-3 uppercase">
          <SlBasketLoaded /> Warung Pos
        </h1>
      </Link>
      {session ? (
        <ProfilePopUp session={session} />
      ) : (
        <Link href="/login">Login</Link>
      )}
    </section>
  );
}
