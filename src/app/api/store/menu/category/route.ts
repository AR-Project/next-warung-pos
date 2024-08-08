import { NextRequest, NextResponse } from "next/server";

import container from "@/infrastructure/container";
import { forbidden, forbiddenCode } from "@/app/api/_lib/message";
import getAppSession from "@/Commons/session/getAppSession";
import AddMenuCategoryUseCase from "@/Application/use_case/stores/AddCategoryUseCase";
import apiErrorResponse from "@/Commons/apiErrorResponse/apiErrorResponseFactory";
import GetCategoriesUseCase from "@/Application/use_case/stores/GetCategories";
import { revalidatePath } from "next/cache";
import DeleteMenuCategoryUseCase from "@/Application/use_case/stores/DeleteCategoryUseCase";

export async function POST(request: NextRequest) {
  const session = await getAppSession();

  if (!session) {
    return NextResponse.json(forbidden, forbiddenCode);
  }

  if (!session.user.activeStore) {
    return NextResponse.json({ error: "Store not selected" }, { status: 400 });
  }

  const payload: IAddMenuCategory = await request.json();

  const compliedPayload = {
    ...payload,
    userId: session.user.id,
    storeId: session.user.activeStore,
  };

  const addMenuCategory = container.resolve(AddMenuCategoryUseCase);
  try {
    const categoryId = await addMenuCategory.execute(compliedPayload);
    revalidatePath("/", "layout");

    return NextResponse.json(
      { status: "success", data: { categoryId } },
      { status: 201 }
    );
  } catch (error: any) {
    return apiErrorResponse(error);
  }
}

export async function GET(request: NextRequest) {
  const session = await getAppSession();

  if (!session) {
    return NextResponse.json(forbidden, forbiddenCode);
  }

  if (!session.user.activeStore) {
    return NextResponse.json({ error: "Store not selected" }, { status: 400 });
  }

  const getCategoriesUseCase = container.resolve(GetCategoriesUseCase);

  try {
    const categories = await getCategoriesUseCase.execute(
      session.user.activeStore
    );

    revalidatePath("/", "layout");
    return NextResponse.json(
      {
        status: "success",
        data: { categories },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return apiErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAppSession();

  if (!session) {
    return NextResponse.json(forbidden, forbiddenCode);
  }

  if (!session.user.activeStore) {
    return NextResponse.json({ error: "Store not selected" }, { status: 400 });
  }

  const requestData: { id: CategoryId } = await request.json();

  const payload = {
    userId: session.user.id,
    categoryId: requestData.id,
    storeId: session.user.activeStore,
  };

  const deleteMenuCategoryUseCase = container.resolve(
    DeleteMenuCategoryUseCase
  );
  try {
    await deleteMenuCategoryUseCase.execute(payload);

    revalidatePath("/", "layout");

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    return apiErrorResponse(error);
  }
}
