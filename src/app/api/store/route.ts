import apiErrorResponse from "@/Commons/apiErrorResponse/apiErrorResponseFactory";
import getAppSession from "@/presentation/utils/getAppSession";
import { NextResponse } from "next/server";
import container from "@/infrastructure/container";
import AddStoreUseCase from "@/Application/use_case/stores/AddStoreUseCase";

export async function POST(request: Request) {
  const session = await getAppSession();
  if (!session) {
    return NextResponse.json(
      { status: "fail", message: "Not Authorize" },
      { status: 403 }
    );
  }
  const { name } = (await request.json()) as { name: string };

  const payload = {
    name,
    ownerId: session.user.id,
  };
  const store = container.resolve(AddStoreUseCase);
  try {
    const storeId = await store.execute(payload);
    return NextResponse.json(
      { status: "success", data: { storeId } },
      { status: 201 }
    );
  } catch (error: Error | any) {
    return apiErrorResponse(error);
  }
}
