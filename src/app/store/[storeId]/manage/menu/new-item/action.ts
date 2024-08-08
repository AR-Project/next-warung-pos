"use server";
import { revalidatePath } from "next/cache";

import container from "@/infrastructure/container";
import AddMenuItemUseCase from "@/Application/use_case/stores/AddItemUseCase";
import DeleteItemUseCase from "@/Application/use_case/stores/DeleteItemUseCase";
import GetCategoriesUseCase from "@/Application/use_case/stores/GetCategories";
import getActiveStoreFromSession from "@/presentation/utils/getActiveStoreFromSession";
import getAppSession from "@/presentation/utils/getAppSession";
import getCurrentUser from "@/presentation/utils/getCurrentUser";

export async function fetchAvailableCategory() {
  const activeStore = await getActiveStoreFromSession();

  const getCategories = container.resolve(GetCategoriesUseCase);
  try {
    const categories = await getCategories.execute(activeStore);
    return categories;
  } catch (error) {
    console.log(error);
  }
}

export async function addItem(prevState: any, formData: FormData) {
  const session = await getAppSession();

  if (!session) {
    return { error: "Must Logged In first" };
  }

  const activeStore = session.user.activeStore;

  if (!activeStore) {
    return { error: "Store is not selected" };
  }

  const rawFormData = {
    userId: session.user.id as string,
    storeId: session.user.activeStore as string,
    name: formData.get("name") as string,
    categoryId: formData.get("category") as string,
    price: parseInt(formData.get("price") as string),
    color: formData.get("color") as string,
    imageUrl: formData.get("image-url") as string,
  };

  const addItem = container.resolve(AddMenuItemUseCase);

  try {
    const itemId = await addItem.execute(rawFormData);
    revalidatePath("/");
    return { message: itemId };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Internal Server Error" };
  }
}

export async function deleteMenuItem(prevState: any, formData: FormData) {
  const rawItemId = formData.get("item-id");
  const itemId = isString(rawItemId) ? rawItemId : "";

  const deleteMenuItemUseCase = container.resolve(DeleteItemUseCase);
  try {
    const user = await getCurrentUser();
    await deleteMenuItemUseCase.execute({
      userId: user.id,
      itemId: itemId,
    });
    revalidatePath("/");
    return { message: `${itemId} deleted` };
  } catch (error) {
    return actionErrorHandler(error);
  }
}

function isString(data: FormDataEntryValue | null): data is string {
  return data !== null && typeof data === "string";
}

function actionErrorHandler(error: any) {
  if (error instanceof Error) {
    return { error: error.message };
  }
  return { error: "Server Error " };
}
