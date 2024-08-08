import Link from "next/link";
import { ReactNode } from "react";

type props = {
  href: string;
  label: string;
};

/**
 * Default link component with custom label and href
 * @param {string} params.href link
 * @param {string} params.label label for the link
 * @returns {JSX.Element} jsx
 *
 */
export function DefaultButton({ href, label }: props) {
  return (
    <Link
      className="border rounded-md text-md w-full bg-blue-400 p-1 border-blue-900/20 shadow-md"
      href={href}
    >
      {label}
    </Link>
  );
}
