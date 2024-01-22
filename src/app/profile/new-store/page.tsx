"use client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [addStorePayload, setAddStorePayload] = useState({
    name: "",
  });

  function handleChange(event: { target: HTMLInputElement }): void {
    setAddStorePayload((prevPayload) => {
      const { name } = event.target;
      const { value } = event.target;
      return {
        ...prevPayload,
        [name]: value,
      };
    });
  }

  async function onSubmitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    const response = await fetch("/api/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addStorePayload),
    });
    const data = (await response.json()) as {
      status: "success" | "fail";
      data: { storeId: string };
    };
    console.log(data);
    if (response.status !== 201) {
      console.log(data);
      toast.error("error");
    }
    if (response.status === 201) {
      localStorage.setItem("storeId", data.data.storeId);
      router.push("../");
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
          value={addStorePayload.name}
        />
        <button type="submit">Create Store</button>
      </form>
      <ToastContainer position="bottom-left" theme="dark" autoClose={7000} />
    </>
  );
}
