"use client";

import { PropsWithChildren, useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-blue-800 border-white p-2 disabled:bg-blue-100 disabled:cursor-not-allowed"
      type="submit"
      disabled={pending}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
