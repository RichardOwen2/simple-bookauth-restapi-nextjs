import { NextResponse } from "next/server";

import errorHandler from "@/utils/errorHandler";
import { generateToken } from "@/token/tokenManager";

import { verifyUserCrendential } from "@/services/userService";
import { validatePostLoginPayload } from "@/validators/loginValidator";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    validatePostLoginPayload(body);

    const { email, password } = body;

    const id = await verifyUserCrendential({ email, password });
    const token = generateToken(id);

    return NextResponse.json({
      status: "success",
      data: {
        token,
      }
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      data,
    }, { status });
  }
}