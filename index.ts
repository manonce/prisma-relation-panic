import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function main() {
  const result = await prisma.a.findMany({
    select: {
      B: {
        select: {
          A: {
            select: {
              id: true,
              custom_id: true
            },
          },
        },
      },
    },
  })

  console.log(JSON.stringify(result))
}

main();