import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
    // ... you will write your Prisma Client queries here
    let result = await prisma.user.findMany();
    console.log('1 - ', result);
    await prisma.user.create({
        data: {
            email: 'test@gmail.com'
        }
    });
    result = await prisma.user.findMany();
    console.log('2 - ', result);
    await prisma.user.update({
        where: {
            email: 'test@gmail.com'
        },
        data: {
            name: 'test'
        }
    });
    result = await prisma.user.findMany();
    console.log('3 - ', result);
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
