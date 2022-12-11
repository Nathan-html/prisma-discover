import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {

    const email: string = 'test@gmail.com';

    const result1 = await prisma.user.findMany();
    console.log('1 - ', result1);
    const result2 = await prisma.user.create({
        data: {
            email: email
        }
    });
    console.log('2 - ', result2);
    const result3 = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            name: 'test'
        }
    });
    console.log('3 - ', result3);
    console.log('4 - the schema of prisma was edited (add posts)');
    const result5 = await prisma.post.create({
        data: {
            title: "Hello world"
        }
    });
    console.log('5 - ', result5)
    const result6 = await prisma.post.update({
        where: {
          id: 1
        },
        data: {
            author: {
                connect: {
                    email: email
                }
            }
        }
    });
    console.log('6 - ', result6)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
