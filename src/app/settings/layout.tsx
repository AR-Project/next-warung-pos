import getAppSession from "@/presentation/utils/getAppSession";
import { redirect } from "next/navigation";
import ProtectOnServer from "../_protection/ProtectOnServer";

type props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: props) {
  return (
    <ProtectOnServer type="loggedIn" callback="/settings">
      <section>
        <div className="flex flex-row w-screen">
          <p>Settings page</p>
        </div>
        {children}
      </section>
    </ProtectOnServer>
  );
}
