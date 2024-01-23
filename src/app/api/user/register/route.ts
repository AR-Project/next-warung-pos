import "reflect-metadata";
import { NextResponse } from "next/server";

import apiErrorResponse from "@/Commons/apiErrorResponse/apiErrorResponseFactory";
import container from "@/infrastructure/container";
import AddUserUseCase from "@/Application/use_case/users/AddUserUseCase";

export async function GET() {
  try {
    return NextResponse.json(
      { status: "success", message: "hello world" },
      { status: 201 }
    );
  } catch (error: Error | any) {
    return apiErrorResponse(error);
  }
}
export async function POST(request: Request) {
  const payload = await request.json();
  const addUserUseCase = container.resolve(AddUserUseCase);
  try {
    const addedUser = await addUserUseCase.execute(payload);
    return NextResponse.json(
      { status: "success", data: addedUser },
      { status: 201 }
    );
  } catch (error: Error | any) {
    return apiErrorResponse(error);
  }
}
