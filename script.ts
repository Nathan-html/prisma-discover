import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {

    const email1: string = 'user1@test.com';
    const email2: string = 'user2@test.com';

    const result1 = await prisma.user.findMany();
    console.log('1 - ', result1);
    const result2 = await prisma.user.create({
        data: {
            email: email1
        }
    });
    console.log('2 - ', result2);
    const result3 = await prisma.user.update({
        where: {
            email: email1
        },
        data: {
            name: 'user 1'
        }
    });
    console.log('3 - ', result3);
    console.log('4 - the schema of prisma was edited (add posts)');
    const result5 = await prisma.post.create({
        data: {
            title: "Hello world"
        }
    });
    console.log('5 - ', result5);
    const result6 = await prisma.post.update({
        where: {
          id: 1
        },
        data: {
            author: {
                connect: {
                    email: email1
                }
            }
        }
    });
    console.log('6 - ', result6);
    const result7 = await prisma.user.findUnique({
        where: {
            email: email1
        }
    });
    console.log('7 - ', result7);
    const result8 = await prisma.user.findMany({
        select: {
            id: true,
            name: true
        }
    });
    console.log('8 - ', result8);
    const result9 = await prisma.user .findMany({
        include: {
            posts: true
        }
    });
    console.log('9 - users -> ', result9);
    console.log('9 - posts of first user -> ', result9[0].posts);
    const result10 = await prisma.user.create({
        data: {
            email: email2,
            name: 'user 2',
            posts: {
                create: {
                    title: "Hello world 2"
                }
            }
        },
        include: {
            posts: true
        }
    });
    console.log('10 - user -> ', result10);
    const result11 = await prisma.user.findMany({
        where: {
            name: {
                endsWith: "2"
            }
        }
    });
    console.log('11 - ', result11);
    for (let i = 3; i <= 20; i++) {
        await prisma.user.create({
            data: {
                email: `user${i}@test.com`,
                name: `user ${i}`,
            },
        });
    }
    const result12FirstPage = await prisma.user.findMany({
        take: 10
    });
    console.log('12 - first page -> ', result12FirstPage);
    const result12SecondPage = await prisma.user.findMany({
        skip: 10,
        take: 10
    });
    console.log('12 - second page -> ', result12SecondPage);
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
