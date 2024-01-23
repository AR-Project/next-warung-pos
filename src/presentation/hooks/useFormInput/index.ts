import { useState } from "react";

export function useFormInputs<T = Record<string, string>>(strings: string[]) {
  const initialPayloads: T = Object.assign(
    {},
    ...strings.map((key) => ({ [key]: "" }))
  );

  const [payload, setPayload] = useState(initialPayloads);

  function handleChange(event: { target: HTMLInputElement }) {
    setPayload((prevPayload) => {
      const { name } = event.target;
      const { value } = event.target;
      return {
        ...prevPayload,
        [name]: value,
      };
    });
  }

  return { payload, handleChange };
}
