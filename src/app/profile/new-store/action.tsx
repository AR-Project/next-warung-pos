"use server";

import AddStoreUseCase from "@/Application/use_case/stores/AddStoreUseCase";
import container from "@/infrastructure/container";
import getAppSession from "@/Commons/session/getAppSession";
import getCurrentUser from "@/Commons/session/getCurrentUser";
import { revalidatePath } from "next/cache";

export async function createStore(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const addStoreUseCase = container.resolve(AddStoreUseCase);
  try {
    const user = await getCurrentUser();
    const storeId = await addStoreUseCase.execute({ userId: user.id, name });
    revalidatePath("/");
    return { message: storeId };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Server Error" };
  }
}
