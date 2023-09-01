import { NextResponse } from "next/server";
import DomainErrorTranslator, {
  ITranslatedError,
} from "../exceptions/DomainErrorTranslator";
import ClientError from "../exceptions/ClientError";

export default function apiErrorResponse(err: Error, payload?: any) {
  const translatedError: ITranslatedError =
    DomainErrorTranslator.translate(err);

  // Error from infrastructure, domains and application layer
  if (translatedError instanceof ClientError) {
    const jsonErrorResponse = {
      status: "fail",
      message: translatedError.message,
      payload,
    };

    return NextResponse.json(jsonErrorResponse, {
      status: translatedError.statusCode,
    });
  }

  return NextResponse.json(
    { status: "error", message: "Internal Error" },
    { status: 500 }
  );
}
