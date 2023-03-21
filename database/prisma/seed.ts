import { PrismaClient } from '@prisma/client'
import seedSchema from './seed.schema';

const prisma = new PrismaClient()

async function user() {
  await prisma.user.createMany({
    data: seedSchema,
  });
}

user()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
