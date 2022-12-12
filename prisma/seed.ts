import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        }
      },
    },
  });
  const nilu = await prisma.user.upsert({
    where: { email: 'nilu@prisma.io' },
    update: {},
    create: {
      email: 'nilu@prisma.io',
      name: 'Nilu',
      posts: {
        create: {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
        }
      },
    },
  });
  const mahmoud = await prisma.user.upsert({
    where: { email: 'mahmoud@prisma.io' },
    update: {},
    create: {
      email: 'mahmoud@prisma.io',
      name: 'Mahmoud',
      posts: {
        create: [
          {
            title: 'Ask a question about Prisma on GitHub',
            content: 'https://www.github.com/prisma/prisma/discussions',
            published: true,
          },
          {
            title: 'Prisma on YouTube',
            content: 'https://pris.ly/youtube',
          },
        ],
      },
    },
  });
  console.log(alice, nilu, mahmoud)
}

main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    });