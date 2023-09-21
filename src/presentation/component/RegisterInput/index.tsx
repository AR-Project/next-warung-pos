"use client";
import { useState } from "react";

type Props = {
  register?: (payload: RegisterUserPayload) => Promise<void>;
};

export default function RegisterInput({ register }: Props) {
  const DEFAULT_REGISTER_INPUT_STATE: RegisterUserPayload = {
    username: "",
    email: "",
    password: "",
    fullName: "",
  };

  const [registerPayload, setRegisterPayload] = useState(
    DEFAULT_REGISTER_INPUT_STATE
  );

  function handleChange(event: { target: HTMLInputElement }): void {
    setRegisterPayload((prevPayload: RegisterUserPayload) => {
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
    console.log(registerPayload);
    if (register !== undefined) {
      await register(registerPayload);
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      id="register-input-form"
      className="flex flex-col gap-5 p-1"
    >
      <input
        type="text"
        placeholder="Username"
        onChange={handleChange}
        id="username"
        name="username"
        value={registerPayload.username}
        className="text-black text-xl h-16 rounded-md"
      />
      <input
        type="text"
        placeholder="FullName"
        onChange={handleChange}
        id="fullName"
        name="fullName"
        value={registerPayload.fullName}
        className="text-black text-xl h-16 rounded-md"
      />
      <input
        type="email"
        placeholder="E-mail"
        onChange={handleChange}
        id="email"
        name="email"
        value={registerPayload.email}
        className="text-black text-xl h-16 rounded-md"
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        id="password"
        name="password"
        value={registerPayload.password}
        onChange={handleChange}
        className="text-black text-xl h-16 rounded-md"
      />

      <button
        className="rounded-lg bg-indigo-700 h-20 text-2xl font-bold"
        type="submit"
        id="submit"
      >
        Daftar
      </button>
    </form>
  );
}
