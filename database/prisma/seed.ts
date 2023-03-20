import { PrismaClient } from '@prisma/client'
import seedSchema from './seed.schema';

const prisma = new PrismaClient()

async function user() {
  const user = await prisma.user.createMany({
    data: seedSchema,
  });
  console.log({ user });
}

user()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
