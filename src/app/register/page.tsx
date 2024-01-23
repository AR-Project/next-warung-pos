"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegisterInput from "@/presentation/component/RegisterInput";
import { useRouter } from "next/navigation";

export default function Register() {
  const { push } = useRouter();

  const onRegisterHandler = async (payload: RegisterUserPayload) => {
    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const resultJson = await result.json();

    if (resultJson.status === "success") {
      push("/login");
    }
    toast.error(resultJson.message);
  };

  return (
    <main className="flex flex-col gap-5 h-full ">
      <h1 className="text-center text-3xl font-bold p-5 pb-3">Register User</h1>
      <RegisterInput register={onRegisterHandler} />
      <ToastContainer position="bottom-left" theme="dark" autoClose={7000} />
    </main>
  );
}
