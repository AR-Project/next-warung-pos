"use client";
import LoginInput from "@/presentation/component/LoginInput";
import { signIn } from "next-auth/react";

export default function page() {
  const onLoginHandler = async ({ username, password }: LoginPayload) => {
    await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <section className="flex flex-col w-screen h-screen gap-10 ">
      <h1 className="text-center text-3xl font-bold p-5">Login Page</h1>
      <LoginInput onLoginHandler={onLoginHandler} />
    </section>
  );
}
