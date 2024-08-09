"use client";
import { HiMenu } from "react-icons/hi";

import LogoutButton from "../LogoutButton";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Session } from "next-auth";

type Props = {
  session: Session;
};

export default function UserInfo({ session }: Props) {
  return (
    <Menu className="relative" as="div">
      <div className="flex flex-row gap-2">
        <Menu.Button className="flex flex-row items-center justify-center bg-blue-100 bg-transparent rounded-sm gap-5">
          <HiMenu className="text-xl"></HiMenu>
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
              <Link href="/profile" onClick={close}>
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
