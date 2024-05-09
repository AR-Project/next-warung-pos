import { useState } from "react";

/**
 *
 * @param strings Array of string that become the key of payload object
 * @returns Array that contains payload and handle change payload
 */

type IUseFormInput<T extends string> = [
  payload: Record<T, string>,
  handleChange: (event: { target: HTMLInputElement }) => void
];

export function useFormInputs<T extends string>(
  strings: T[]
): IUseFormInput<T> {
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

  return [payload, handleChange] as const;
}
