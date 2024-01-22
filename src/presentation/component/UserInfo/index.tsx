"use client";
import { SyncLoader } from "react-spinners";
import { HiMenu } from "react-icons/hi";

import LogoutButton from "../LogoutButton";
import { Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserInfo() {
  const { data: session, status, update } = useSession();

  if (!session) {
    if (status === "loading") {
      return <SyncLoader color="white" size={7} />;
    }
    return <a href="/login">Login</a>;
  }

  return (
    <Menu className="relative" as="div">
      <div className="flex flex-row gap-2">
        {session.user.username}
        <Menu.Button className="flex flex-row  items-center justify-center border border-white bg-blue-300/40 p-1 rounded-md gap-5">
          <HiMenu></HiMenu>
        </Menu.Button>
      </div>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute flex flex-col gap-2 items-center bg-white text-black px-1 py-3 right-0 w-60 rounded-md">
          <Menu.Item as="div">
            {({ close }) => (
              <Link href="./profile" onClick={close}>
                <div className="aspect-square h-20 bg-gray-400">picture</div>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ close }) => (
              <a href="/settings/change-password" onClick={close}>
                Ganti Password
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            <LogoutButton />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
