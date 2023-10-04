import Book from "@interface/Book";
import { PrismaClient } from "@prisma/client";
import { Request } from "express";
const prisma = new PrismaClient();
import extension, { Pagination } from "prisma-paginate";
const xprisma = prisma.$extends(extension);

export const GET = async (req: any) => {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit"));
    const page = Number(searchParams.get("page"));
    const books = await xprisma.book.paginate({
      limit: limit ? limit : 10,
      page: page ? page : 1,
      exceedTotalPages: true,
    });

    return new Response(
      JSON.stringify({
        ...books,
        totalPage: books.totalPages,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Error");
  }
};

export const POST = async (req: any) => {
  try {
    const data = await req.json();
    data.publishDate = new Date(data.publishDate);
    const book = await prisma.book.create({
      data,
    });
    return new Response(JSON.stringify(book), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Err");
  }
};
