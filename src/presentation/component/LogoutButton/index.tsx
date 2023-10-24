"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="border rounded-md text-md w-full bg-blue-400 p-1 border-blue-900/20 shadow-md"
      onClick={async () => await signOut()}
    >
      Logout
    </button>
  );
}
