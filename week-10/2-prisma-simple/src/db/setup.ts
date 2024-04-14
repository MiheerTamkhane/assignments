import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function dropTables() {
  await prisma.todo.deleteMany({});
  await prisma.user.deleteMany({});
}

module.exports = { dropTables };

/**
 * Steps to create a database with Prisma
 * 1. Migrate the prisma schema
 * 2. Generate the clients
 */
