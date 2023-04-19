import { nanoid } from "nanoid";

import InvariantError from "@/errors/InvariantError";
import NotFoundError from "@/errors/NotFoundError";
import AuthorizationError from "@/errors/AuthorizationError";

import prisma from "../libs/prismadb";

const _verifyBookOwner = async ({ bookId, userId }: { bookId: string; userId: string; }) => {
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    select: {
      user_id: true,
    },
  });

  if (!book) {
    throw new NotFoundError("Buku tidak ditemukan");
  }

  if (book.user_id !== userId) {
    throw new AuthorizationError("Anda tidak berhak mengakses resource ini!");
  }
}

export const addBook = async (userId: string, { title, description }: { title: string; description: string; }) => {
  const id = `book-${nanoid(16)}`;

  const book = await prisma.book.create({
    data: {
      id,
      title,
      description,
      user_id: userId
    },
    select: {
      id: true,
    }
  });

  if (!book) {
    throw new InvariantError("Buku gagal ditambahkan");
  }

  return book.id;
}

export const getBooks = async (userId: string) => {
  const books = await prisma.book.findMany({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      title: true,
    }
  });

  return books;
}

export const getDetailBooksById = async ({ userId, bookId }: { userId: string; bookId: string; }) => {
  await _verifyBookOwner({ userId, bookId });

  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      created_at: true,
      updated_at: true,
    }
  });

  return book;
}

export const editBookById = async (
  userId: string,
  bookId: string,
  { title, description }:
    { title: string; description: string; }
) => {
  await _verifyBookOwner({ userId, bookId });

  const book = await prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      title,
      description,
    }
  });

  if (!book) {
    throw new NotFoundError("Gagal memperbarui buku, Id tidak ditemukan");
  }
}

export const deleteBookById = async ({ userId, bookId }: { userId: string; bookId: string; }) => {
  await _verifyBookOwner({ userId, bookId });

  const book = await prisma.book.delete({
    where: {
      id: bookId,
    },
  });

  if (!book) {
    throw new InvariantError("Gagal menghapus buku!");
  }
}
