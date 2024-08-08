import getAppSession from "@/presentation/utils/getAppSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getAppSession();
  if (!session) {
    redirect("/login");
  }

  const activeStore = session.user.activeStore;

  if (!activeStore) {
    redirect("/profile");
  }

  redirect(`./${activeStore}`);

  return null;
}
