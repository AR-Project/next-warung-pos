"use client";

import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

type Props = {
  categoryId: CategoryId;
};

type apiResponse<T = unknown> = {
  status: string;
  message: string;
  error?: string;
  data: T;
};

function DeleteCategoryButton(props: Props) {
  const router = useRouter();

  async function onClick() {
    const response = await fetch("/api/store/menu/category", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.categoryId }),
    });

    const { error }: apiResponse<null> = await response.json();

    if (response.status === 200) {
      toast.success("Berhasil menghapus kategori", { autoClose: 1000 });
      router.refresh();
    }
  }

  return (
    <>
      <div className="cursor-pointer" onClick={() => onClick()}>
        ❌
      </div>
    </>
  );
}

export default DeleteCategoryButton;
