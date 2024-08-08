"use server";

import container from "@/infrastructure/container";
import GetMenuUseCase from "@/Application/use_case/stores/GetMenuUseCase";
import getAppSession from "@/Commons/session/getAppSession";

type GetMenuActionRespond = Promise<
  GetActionReturns<CategoryWithItemChildren[]>
>;

export async function getMenuAction(): GetMenuActionRespond {
  const session = await getAppSession();

  if (!session) {
    return { error: "Not loggedin" };
  }

  if (!session.user.activeStore) {
    return { error: "Not selected any store" };
  }

  const getMenuUseCase = container.resolve(GetMenuUseCase);
  try {
    const menu = await getMenuUseCase.execute(session.user.activeStore);
    return { data: menu };
  } catch (error: any) {
    return { error: "internal error" };
  }
}
