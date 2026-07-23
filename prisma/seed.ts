import { PrismaClient } from "@prisma/client";
import { runSeed } from "../src/lib/seed-data";

const prisma = new PrismaClient();

runSeed(prisma)
  .then((counts) => {
    console.log(`Seeded ${counts.categories} categories, ${counts.articles} articles, ${counts.jems} JEMs.`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
