"use client";
import RegisterInput from "@/presentation/component/RegisterInput";
import { useRouter } from "next/navigation";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
    console.log(resultJson);

    if (resultJson.status === "success") {
      console.log("register User is success");
      push("/login");
    }
  };

  return (
    <main className="flex flex-col gap-5 h-screen ">
      <h1 className="text-center text-3xl font-bold p-5 pb-3">Register User</h1>
      <RegisterInput register={onRegisterHandler} />
    </main>
  );
}
