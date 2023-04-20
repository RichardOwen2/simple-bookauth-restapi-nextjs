import { NextResponse } from "next/server";

import errorHandler from "@/utils/errorHandler";
import getTokenHandler from "@/utils/getTokenHandler";

import { validatePutBookPayload } from "@/validators/bookValidator";
import { getDetailBookById, editBookById, deleteBookById } from "@/services/bookService";

interface Params {
  params: {
    id: string;
  }
}

export async function GET(request: Request, { params } : Params) {
  try {
    const userId = getTokenHandler(request);
    const bookId = params.id;

    const book = await getDetailBookById({userId, bookId});

    return NextResponse.json({
      status: 'success',
      data: {
        book
      }
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      data,
    }, { status });
  }
}

export async function PUT(request: Request, { params } : Params) {
  try {
    const userId = getTokenHandler(request);
  
    const body = await request.json();
    validatePutBookPayload(body);

    const bookId = params.id;

    await editBookById(userId, bookId, body);

    return NextResponse.json({
      status: 'success',
      message: 'Buku berhasil diperbaharui!',
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      data,
    }, { status });
  }
}

export async function DELETE(request: Request, { params } : Params) {
  try {
    const userId = getTokenHandler(request);
    const bookId = params.id;

    await deleteBookById({ userId, bookId });

    return NextResponse.json({
      status: 'success',
      message: 'Buku berhasil dihapus!',
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      data,
    }, { status });
  }
}