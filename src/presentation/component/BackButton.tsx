import Link from "next/link";
import { PropsWithChildren } from "react";
import { SlArrowLeftCircle } from "react-icons/sl";

export function BackButton({ children }: PropsWithChildren) {
  return (
    <>
      <Link href="../" className="w-full bg-blue-950 p-0.5 mb-5">
        <SlArrowLeftCircle className="text-3xl" />
      </Link>
      {children}
    </>
  );
}
