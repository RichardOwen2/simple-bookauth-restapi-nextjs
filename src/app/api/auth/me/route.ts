import { NextResponse } from "next/server";

import errorHandler from "@/utils/errorHandler";
import getTokenHandler from "@/utils/getTokenHandler";

import { getUserProfileById } from "@/services/userService";

export async function GET(request: Request) {
  try {
    const userId = getTokenHandler(request);

    const userData = await getUserProfileById(userId);

    return NextResponse.json({
      status: 'success',
      data: userData,
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      data,
    }, { status });
  }
}
