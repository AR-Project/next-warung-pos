"use client";
import "@/app/globals.css";
import { useState } from "react";

type Props = {
  onLoginHandler({ username, password }: LoginPayload): Promise<void>;
};

export default function LoginInput({ onLoginHandler }: Props) {
  const DEFAULT_LOGIN_PAYLOAD_STATE: LoginPayload = {
    username: "",
    password: "",
  };

  const [loginPayload, setLoginPayload] = useState(DEFAULT_LOGIN_PAYLOAD_STATE);

  function handleChange(event: { target: HTMLInputElement }): void {
    setLoginPayload((prevPayload: LoginPayload) => {
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
    await onLoginHandler(loginPayload);
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      id="login-input-form"
      className="flex flex-col gap-4 p-2 w-screen border-red-600 text-white"
    >
      <input
        className="text-black text-lg"
        type="text"
        placeholder="username"
        onChange={handleChange}
        id="username"
        name="username"
        value={loginPayload.username}
      />

      <input
        type="password"
        className="text-black text-lg"
        placeholder="Password"
        autoComplete="current-password"
        id="password"
        name="password"
        value={loginPayload.password}
        onChange={handleChange}
      />

      <button
        className="h-10 rounded-full bg-slate-400"
        type="submit"
        name="Login"
        id="submit"
      >
        Login
      </button>
    </form>
  );
}
