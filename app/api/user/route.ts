
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import extension from "prisma-paginate";
const xprisma = prisma.$extends(extension);

export const GET = async (req: any) => {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit"));
    const page = Number(searchParams.get("page"));
    const user = await xprisma.user.paginate({
      limit: limit ? limit : 10,
      page: page ? page : 1,
      exceedTotalPages: true,
    });

    return new Response(
      JSON.stringify({
        ...user,
        totalPage: user.totalPages,
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
    const user = await prisma.user.create({
      data,
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Err");
  }
};
