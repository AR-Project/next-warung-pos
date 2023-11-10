"use client";
import LoginInput from "@/presentation/component/LoginInput";
import { ToastContainer, toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useSearchParams();
  const callback = params.get("callback");
  const error = params.get("error");

  const onLoginHandler = async ({ username, password }: LoginPayload) => {
    await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: callback ? callback : "/",
    });
  };

  useEffect(() => {
    if (error) {
      toast.error("periksa kembali email dan/atau password anda");
    }
  }, [error]);

  return (
    <section className="flex flex-col w-screen h-full gap-10 ">
      <h1 className="text-center text-3xl font-bold p-5">Login Page</h1>
      <button onClick={() => toast.success("test")}>toast</button>
      <LoginInput onLoginHandler={onLoginHandler} />
      <a href="/register">register</a>
      <ToastContainer position="bottom-left" theme="dark" autoClose={7000} />
    </section>
  );
}
