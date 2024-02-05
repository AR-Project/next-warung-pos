import apiErrorResponse from "@/Commons/apiErrorResponse/apiErrorResponseFactory";
import getAppSession from "@/presentation/utils/getAppSession";
import { NextRequest, NextResponse } from "next/server";
import container from "@/infrastructure/container";
import AddStoreUseCase from "@/Application/use_case/stores/AddStoreUseCase";
import GetStoresUseCase from "@/Application/use_case/stores/GetAllStoreUseCase";

export async function POST(request: NextRequest) {
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

export async function GET(request: NextRequest) {
  const session = await getAppSession();
  if (!session) {
    return NextResponse.json(
      { status: "fail", message: "Not Authorize" },
      { status: 403 }
    );
  }

  const { userId } = (await request.json()) as { userId: UserId };
  const getStoresUseCase = container.resolve(GetStoresUseCase);

  try {
    const stores = await getStoresUseCase.execute(userId);
    return NextResponse.json(
      { status: "success", data: stores },
      { status: 201 }
    );
  } catch (error: Error | any) {
    return apiErrorResponse(error);
  }
}
