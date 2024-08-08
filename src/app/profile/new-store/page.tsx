"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import { createStore } from "./action";
import FormSubmitButton from "@/presentation/component/Form/FormSubmitButton";
import { BackButton } from "@/presentation/component/BackButton";

export default function Page() {
  const [state, formAction] = useFormState<FormState, FormData>(
    createStore,
    {}
  );

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
      redirect("/profile");
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <section>
      <BackButton />
      <h1>Create New Store</h1>
      <form
        className="flex flex-col gap-4 p-2 w-screen border-red-600 text-white"
        action={formAction}
      >
        <input
          type="text"
          className="text-black text-lg"
          id="name"
          name="name"
          required
        />
        <FormSubmitButton>Create Store</FormSubmitButton>
      </form>
    </section>
  );
}
