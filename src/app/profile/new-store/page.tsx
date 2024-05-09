"use client";
import { useFormInputs } from "@/presentation/hooks/useFormInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
  const router = useRouter();

  const [payload, handleChange] = useFormInputs(["name"]);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      status: "success" | "fail";
      data: { storeId: string };
    };

    if (response.status !== 201) {
      toast.error("error");
      setLoading(false);
    }
    if (response.status === 201) {
      toast.success("Store Created");
      setTimeout(() => {
        router.push("../");
      }, 3000);
    }
  }

  return (
    <>
      <form
        className="flex flex-col gap-4 p-2 w-screen border-red-600 text-white"
        onSubmit={onSubmitHandler}
      >
        <input
          type="text"
          className="text-black text-lg"
          id="name"
          name="name"
          onChange={handleChange}
          value={payload.name}
          required
        />
        <button
          type="submit"
          className={`${
            loading && "cursor-not-allowed"
          } border border-white rounded-md p-2 bg-slate-800 hover:bg-slate-600`}
          disabled={loading}
        >
          Create Store
        </button>
      </form>
      <ToastContainer position="bottom-left" theme="dark" autoClose={7000} />
    </>
  );
}
