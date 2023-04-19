import { NextResponse } from "next/server";

import errorHandler from "@/utils/errorHandler";
import getTokenHandler from "@/utils/getTokenHandler";

import { validatePostBookPayload } from "@/validators/bookValidator";
import { getBooks, addBook } from "@/services/bookService";

export async function GET(request: Request) {
  try {
    const userId = getTokenHandler(request);

    const books = await getBooks(userId);

    return NextResponse.json({
      status: 'success',
      data: {
        books
      }
    })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      data,
    }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = getTokenHandler(request);
    const body = await request.json();

    validatePostBookPayload(body);

    const id = await addBook(userId, body);

    return NextResponse.json({
      status: 'success',
      data: {
        id
      }
    }, { status: 201 })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      data,
    }, { status });
  }
}
