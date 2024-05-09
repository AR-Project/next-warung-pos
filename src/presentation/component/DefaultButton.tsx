import Link from "next/link";

type props = {
  href: string;
  label: string;
};

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
