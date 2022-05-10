import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.b.deleteMany({})
    await prisma.a.deleteMany({})

    await prisma.a.create({
        data: {
            custom_id: "1"
        }
    });

    await prisma.a.create({
        data: {
            custom_id: "1"
        }
    });

    await prisma.b.create({
        data: {
            custom_id: "1"
        }
    });
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })