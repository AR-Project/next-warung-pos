"use client";

import { useFormState } from "react-dom";
import { addItem } from "./action";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import FormSubmitButton from "@/presentation/component/Form/FormSubmitButton";

type Props = {
  categories: IMenuCategoryRow[];
};

export default function FormAddItem({ categories }: Props) {
  const [state, formAction] = useFormState<FormState, FormData>(addItem, {});

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
      <form action={formAction} className="flex flex-col gap-1 ">
        <input type="hidden" name="image-url" value="TODO" />
        <label htmlFor="item-category">Choose category:</label>
        <select
          className="text-black"
          name="category"
          id="item-category"
          required
        >
          {categories.map((category) => (
            <option
              className="text-black"
              value={category.id}
              key={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="add-item-name">Name: </label>
        <input
          className="text-black"
          type="text"
          name="name"
          id="item-name"
          required
        />

        <label htmlFor="item-price">Price: </label>
        <input
          type="number"
          name="price"
          id="item-price"
          className="text-black"
        />
        <label htmlFor="item-color">Color Label:</label>
        <input
          type="color"
          name="color"
          id="item-color"
          defaultValue="#2563eb"
        />

        <FormSubmitButton>Tambah Item</FormSubmitButton>
      </form>
    </>
  );
}
