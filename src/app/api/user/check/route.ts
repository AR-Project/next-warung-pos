import "reflect-metadata";

import apiErrorResponse from "@/Commons/apiErrorResponse/apiErrorResponseFactory";
import { NextResponse } from "next/server";
import container from "@/infrastructure/container";
import CheckUsernameUseCase from "@/Application/use_case/users/CheckUsernameUseCase";

export async function POST(request: Request) {
  const payload = await request.json();
  const checkUsername = container.resolve(CheckUsernameUseCase);
  try {
    await checkUsername.execute(payload);
    return NextResponse.json({
      status: "succes",
      requestPayload: { ...payload },
      isAvailable: true,
    });
  } catch (error: Error | any) {
    console.log(error);

    return apiErrorResponse(error, payload);
  }
}
