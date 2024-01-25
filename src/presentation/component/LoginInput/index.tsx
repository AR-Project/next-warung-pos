"use client";
import { useFormInputs } from "@/presentation/hooks/useFormInput";

type Props = {
  onLoginHandler({ username, password }: LoginPayload): Promise<void>;
};

export default function LoginInput({ onLoginHandler }: Props) {
  const { payload, handleChange } = useFormInputs(["username", "password"]);

  async function onSubmitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    await onLoginHandler(payload);
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
        value={payload.username}
        required
      />

      <input
        type="password"
        className="text-black text-lg"
        placeholder="Password"
        autoComplete="current-password"
        id="password"
        name="password"
        value={payload.password}
        onChange={handleChange}
        required
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
