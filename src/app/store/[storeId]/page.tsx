import { SlEqualizer } from "react-icons/sl";
import { MdOutlinePointOfSale } from "react-icons/md";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { storeId: string };
}) {
  const links = [
    {
      icon: <SlEqualizer className="text-xl" />,
      label: "Manage",
      href: "./manage",
    },
    {
      icon: <MdOutlinePointOfSale className="text-xl" />,
      label: "Sale",
      href: "#",
    },
  ];
  return (
    <div className="flex flex-col gap-2 p-2 mt-5">
      <div className="grid grid-cols-4 gap-1 items-stretch">
        {links.map((link) => (
          <Link
            className="flex flex-col gap-1 rounded-sm text-xs uppercase font-bold items-center bg-blue-600 px-2 py-1 shadow-sm"
            href={link.href}
            key={link.href}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
      <p className="text-xs text-gray-500 italic">
        TODO: Display store dynamic information: Total transaction, total gross,
        item sold, etc
      </p>
    </div>
  );
}
