"use client";

import { ToastContainer, toast } from "react-toastify";

import { BackButton } from "@/presentation/component/BackButton";
import { useFormInputs } from "@/presentation/hooks/useFormInput";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type noEvent = {
  preventDefault: () => void;
};

type addCategoryResponse = {
  categoryId: string;
};

type apiResponse<T = unknown> = {
  status: string;
  message: string;
  error?: string;
  data: T;
};

export default function Page() {
  const router = useRouter();
  const [payload, handleChange] = useFormInputs(["name", "color"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmitHandler(event: noEvent) {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/store/menu/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const { error, data }: apiResponse<addCategoryResponse> =
      await response.json();

    if (error) {
      toast.error(error);
      setIsLoading(false);
    }

    if (response.status === 201) {
      setIsLoading(false);
      toast.success("Berhasil membembuat kategori baru");
      setTimeout(() => {
        router.push("../");
      }, 2000);
    }
  }

  useEffect(() => {
    handleChange({
      target: {
        name: "color",
        value: "#1d4ed8",
      } as unknown as HTMLInputElement,
    });
  }, []);

  return (
    <>
      <BackButton></BackButton>
      <h1>New Category</h1>
      <form
        className="flex flex-col gap-2 m-3"
        onSubmit={onSubmitHandler}
        id="new-category-form"
      >
        <label htmlFor="name">Category Name</label>
        <input
          className="text-black text-lg"
          type="text"
          placeholder="name"
          onChange={handleChange}
          id="name"
          name="name"
          value={payload.name}
          required
        />

        <label htmlFor="color">Color</label>
        <input
          type="color"
          id="color"
          onChange={handleChange}
          name="color"
          value={payload.color}
          required
        ></input>
        <button
          className="h-10 bg-slate-600 disabled:cursor-not-allowed disabled:bg-slate-400 rounded-md"
          type="submit"
          name="Login"
          id="submit"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
