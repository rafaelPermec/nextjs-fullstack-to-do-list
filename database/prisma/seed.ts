import { PrismaClient } from '@prisma/client'
import seedUserSchema from './seed.user.schema';

const prisma = new PrismaClient()

async function user() {
  await prisma.user.createMany({
    data: seedUserSchema,
  });
}

user()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
