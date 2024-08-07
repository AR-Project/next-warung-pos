import { SlBasketLoaded } from "react-icons/sl";

import UserInfo from "../UserInfo";

export default function TopNav() {
  return (
    <section className="flex flex-row justify-between items-center bg-blue-900 h-8 px-2 w-full">
      <a href="/">
        <h1 className="font-mono font-extrabold flex flex-row justify-center items-center gap-3 uppercase">
          <SlBasketLoaded /> Warung Pos
        </h1>
      </a>
      <UserInfo />
    </section>
  );
}
