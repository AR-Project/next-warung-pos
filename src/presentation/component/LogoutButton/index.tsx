"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const onLogoutHandler = async () => {
    await signOut();
  };
  return (
    <button
      className="rounded-full bg-indigo-950 p-4 hover:bg-indigo-500"
      onClick={async () => await signOut()}
    >
      Logout
    </button>
  );
}
