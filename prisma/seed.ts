import { Book, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import showBanner from "node-banner";
const prisma = new PrismaClient({ log: [{ emit: "event", level: "query" }] });
const randomBook = () => {
  return {
    title: faker.company.buzzNoun(),
    rating: faker.number.int({ min: 1, max: 5 }),
    totalPage: faker.number.int({ min: 100, max: 1000 }),
    publishDate: faker.date.anytime(),
  };
};
const books: any[] = faker.helpers.multiple(randomBook, { count: 10 });
async function main() {
  await showBanner("Seed Data");
  prisma.$on("query", async (e) => {
    console.log(`${e.query} ${e.params}`);
  });
  await prisma.book.createMany({
    data: books,
  });
  const password = await bcrypt.hash("rofak@123", 10);
  await prisma.user.create({
    data: {
      email: "rofakvkm@gmail.com",
      password,
      gender: "male",
      name: "Rofak",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
