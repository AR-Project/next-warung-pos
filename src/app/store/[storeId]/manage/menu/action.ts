"use server";

import GetCategoriesUseCase from "@/Application/use_case/stores/GetCategories";
import container from "@/infrastructure/container";
import getAppSession from "@/presentation/utils/getAppSession";

type ActionReturns = {
  data: IMenuCategoryRow[] | null;
  error?: string;
};

export async function getCategoriesAction(): Promise<ActionReturns> {
  const session = await getAppSession();

  if (!session) {
    return { data: null, error: "Not loggedin" };
  }

  if (!session.user.activeStore) {
    return { data: null, error: "Not selected any store" };
  }

  const getCategoriesUseCase = container.resolve(GetCategoriesUseCase);
  try {
    const result = await getCategoriesUseCase.execute(session.user.activeStore);
    return { data: result };
  } catch (error: any) {
    return { data: null, error: "internal error" };
  }
}
