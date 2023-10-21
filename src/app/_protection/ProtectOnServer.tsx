import getAppSession from "@/presentation/utils/getAppSession";
import { redirect } from "next/navigation";

type props = {
  children: React.ReactNode;
  callback?: string;
  type?: "loggedIn" | "loggedOut";
};

export default async function ProtectOnServer({
  children,
  callback,
  type = "loggedIn",
}: props) {
  const session = await getAppSession();

  switch (type) {
    // must loggedin before proceed
    case "loggedIn":
      if (!session) {
        redirect(`/login${callback && `?callback=${callback}`}`);
      }
      break;
    // must logged out before proceed
    case "loggedOut":
      if (session) {
        redirect("/");
      }
      break;
    default:
      redirect("/");
  }

  return <section>{children}</section>;
}
