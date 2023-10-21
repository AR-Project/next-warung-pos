"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const onLogoutHandler = async () => {
    await signOut();
  };
  return (
    <button
      className="border rounded-xl text-xs bg-blue-950 px-2 h-full"
      onClick={async () => await signOut()}
    >
      Logout
    </button>
  );
}
