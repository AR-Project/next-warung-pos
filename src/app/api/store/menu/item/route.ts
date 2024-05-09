import { forbidden, forbiddenCode } from "@/app/api/_lib/message";
import getAppSession from "@/presentation/utils/getAppSession";
import { NextRequest, NextResponse } from "next/server";

//
export async function POST(request: NextRequest) {
  const session = await getAppSession();
  if (!session) {
    return NextResponse.json(forbidden, forbiddenCode);
  }

  // TODO: Endpoint for adding menu item
  return NextResponse.json({
    message: "TODO",
  });
}
