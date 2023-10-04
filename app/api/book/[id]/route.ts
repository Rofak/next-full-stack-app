import Book from "@interface/Book";
import { PrismaClient } from "@prisma/client";
import { Request } from "express";
const prisma = new PrismaClient();

export const DELETE = async (req: any, { params }: any) => {
  try {
    const id = Number(params.id);
    await prisma.book.delete({ where: { id } });
    return new Response("Deleted");
  } catch (err) {
    console.log(err);
    return new Response("Error");
  }
};

export const PUT = async (req: any, { params }: any) => {
  try {
    const data = await req.json();
    data.publishDate = new Date(data.publishDate);
    const id = Number(params.id);
    await prisma.book.update({ data: data, where: { id } });
    return new Response("Update");
  } catch (err) {
    console.log(err);
    return new Response("Error");
  }
};

export const GET = async (req: any, { params }: any) => {
  try {
    const id = Number(params.id);
    const book = await prisma.book.findUnique({ where: { id } });
    return new Response(JSON.stringify(book), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error");
  }
};
