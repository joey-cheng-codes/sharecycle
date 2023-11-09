import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.user.create({
      data: {
        username: 'Piper',
        nickname: 'Piper',
        firstName: 'Piper',
        lastName: 'Pied',
        email: 'ppied@fake.com',
        password: 'password',
        items: {
          create: {
            itemName: 'Crosley record player',
            description: 'I have an assorted mixture of record players - mainly jazz - that you can borrow too!',
            rentCount: 0,
            categories: {
              create: {
                name: 'Music',
              },
            },
            groups: {
              create: {
                name: 'Central High School',
              },
            },
            loanDurationDays: 10,
            imageUrl: 'https://images.pexels.com/photos/775414/pexels-photo-775414.jpeg?auto=compress&cs=tinysrgb&w=300',
          },
        },
      },
    })

    const allUsers = await prisma.user.findMany({
      include: {
        items: {
          include: {
            categories: true,
            groups: true,
          },
        },
      },
    })
    console.dir(allUsers, { depth: null })
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  throw e
})