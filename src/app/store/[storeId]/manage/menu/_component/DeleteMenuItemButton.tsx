"use client";
import { useFormState } from "react-dom";
import { SlTrash } from "react-icons/sl";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

import { deleteMenuItem } from "../new-item/action";

type Props = {
  id: string;
};

function DeleteMenuItemButton({ id }: Props) {
  const [state, formAction] = useFormState<FormState, FormData>(
    deleteMenuItem,
    {}
  );

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="item-id" value={id} />
        <button type="submit">
          <SlTrash className="text-red-500 text-xl" />
        </button>
      </form>
    </>
  );
}

export default DeleteMenuItemButton;
