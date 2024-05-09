import getAppSession from "@/presentation/utils/getAppSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getAppSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.user.activeStore) {
    redirect("/profile");
  }

  redirect(`./${session.user.activeStore}`);
}
