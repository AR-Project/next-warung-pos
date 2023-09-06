import apiErrorResponse from "@/Commons/apiErrorResponse/apiErrorResponseFactory";
import { NextResponse } from "next/server";

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
