import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const token = await getToken({ req: request });
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
    return NextResponse.json({ status: "succes", data: token, payload });
  } else {
    // Not Signed in
    return NextResponse.json(
      { status: "error", message: "logged out", payload },
      { status: 403 }
    );
  }
}
