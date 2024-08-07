import getActiveStoreFromSession from "@/presentation/utils/getActiveStoreFromSession";
import getAppSession from "@/presentation/utils/getAppSession";
import { redirect } from "next/navigation";

export default async function StoreManagementLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}) {
  return <>{children}</>;
}
