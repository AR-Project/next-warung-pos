import { SlBasketLoaded } from "react-icons/sl";

import UserInfo from "../UserInfo";
import getAppSession from "@/Commons/session/getAppSession";
import Link from "next/link";

export default async function TopNav() {
  const session = await getAppSession();

  return (
    <section className="flex flex-row justify-between items-center bg-blue-900 h-8 px-2 w-full">
      <Link href="/">
        <h1 className="font-mono font-extrabold flex flex-row justify-center items-center gap-3 uppercase">
          <SlBasketLoaded /> Warung Pos
        </h1>
      </Link>
      {session ? <UserInfo session={session} /> : <a href="/login">Login</a>}
    </section>
  );
}
