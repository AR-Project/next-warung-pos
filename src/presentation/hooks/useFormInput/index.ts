import { useState } from "react";

export function useFormInputs<T extends string>(
  strings: T[]
): {
  payload: Record<T, string>;
  handleChange: (event: { target: HTMLInputElement }) => void;
} {
  const initialPayloads: Record<string, string> = Object.assign(
    {},
    ...strings.map((key) => ({ [key]: "" }))
  );

  const [payload, setPayload] = useState(initialPayloads);

  function handleChange(event: { target: HTMLInputElement }) {
    setPayload((prevPayload) => {
      const { name, value } = event.target;
      return {
        ...prevPayload,
        [name]: value,
      };
    });
  }

  return { payload, handleChange };
}
