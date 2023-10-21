"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  userId: string;
  changePasswordHandler: (payload: ChangeUserPasswordPayload) => Promise<{
    status: string;
    message?: string;
  }>;
};

function verifyPayload(
  password: string,
  newPassword: string,
  newPasswordConfirmation: string
) {
  if (newPassword !== newPasswordConfirmation) {
    throw new Error("Password baru tidak cocok");
  }
  if (password === newPassword) {
    throw new Error("Password lama dan baru tidak boleh sama");
  }
}

export default function ChangePasswordInput({
  userId,
  changePasswordHandler,
}: Props) {
  const DEFAULT_REGISTER_INPUT_STATE = {
    password: "",
    newPassword: "",
    newPasswordConfirmation: "",
  };
  const router = useRouter();

  const [changePasswordPayload, setChangePasswordPayload] = useState(
    DEFAULT_REGISTER_INPUT_STATE
  );
  const [buttonStatus, setButtonStatus] = useState(false);

  function handleChange(event: { target: HTMLInputElement }): void {
    setChangePasswordPayload((prev) => {
      const { name } = event.target;
      const { value } = event.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function onSubmitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    setButtonStatus(true);
    const { password, newPassword, newPasswordConfirmation } =
      changePasswordPayload;

    try {
      verifyPayload(password, newPassword, newPasswordConfirmation);

      const result = await changePasswordHandler({
        userId,
        password,
        newPassword,
      });
      if (result.status === "success") {
        toast.success("Berhasil mengganti password");
        setTimeout(() => router.push("/settings"), 2000);
      }
      if (result.status === "error") {
        // display error from server side
        toast.error(result.message);
        setButtonStatus(false);
      }
    } catch (error: any) {
      // catch error on client side
      setButtonStatus(false);
      toast.error(error.message);
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        id="register-input-form"
        className="flex flex-col gap-5 p-1"
      >
        <input
          type="password"
          placeholder="Current Password"
          autoComplete="current-password"
          id="password"
          name="password"
          value={changePasswordPayload.password}
          onChange={handleChange}
          className="text-black text-lg h-15 rounded-md"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          autoComplete="current-password"
          id="newPassword"
          name="newPassword"
          value={changePasswordPayload.newPassword}
          onChange={handleChange}
          className="text-black text-lg h-15 rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Repeat New Password"
          autoComplete="current-password"
          id="newPasswordConfirmation"
          name="newPasswordConfirmation"
          value={changePasswordPayload.newPasswordConfirmation}
          onChange={handleChange}
          className="text-black text-lg h-15 rounded-md"
          required
        />

        <button
          className="rounded-lg bg-indigo-700 disabled:bg-indigo-50 h-20 text-2xl font-bold :bg-indigo-50"
          type="submit"
          id="submit"
          disabled={buttonStatus}
        >
          Ganti Password
        </button>
        <ToastContainer position="bottom-left" theme="dark" autoClose={7000} />
      </form>
    </>
  );
}
