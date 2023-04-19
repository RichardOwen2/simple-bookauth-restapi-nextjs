import { NextResponse } from "next/server";

import errorHandler from "@/utils/errorHandler";
import { generateToken } from "@/token/tokenManager";

import { addUser } from "@/services/userService";
import { validatePostRegisterPayload } from "@/validators/registerValidator";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    validatePostRegisterPayload(body);

    const { username, email, password } = body;

    const id = await addUser({ username, email, password });
    const token = generateToken(id);

    return NextResponse.json({
      status: "success",
      data: {
        token,
      }
    }, { status: 201 });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      data,
    }, { status });
  }
}
