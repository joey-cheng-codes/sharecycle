import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// async function main() {
//   // ... you will write your Prisma Client queries here

//   async function main() {
//     await prisma.user.create({
//       data: {
//         username: 'jcheng',
//         nickname: 'Jo',
//         firstName: 'Joey',
//         lastName: 'Cheng',
//         email: 'joey@fake.com',
//         password: 'password',
//         items: {
//           create: {
//             itemName: 'magic wand',
//             description: 'from harry potter',
//             rentCount: 0,
//             categories: {
//               create: {
//                 name: 'Toys',
//               },
//             },
//             groups: {
//               create: {
//                 name: '180Church',
//               },
//             },
//             loanDurationDays: 10,
//             imageUrl: 'www.google.com',
//           },
//         },
//         groups: {
//           create: {
//             name: '180Church',
//           }
//         }
//       },
//     })

//     const allUsers = await prisma.user.findMany({
//       include: {
//         items: {
//           include: {
//             categories: true,
//             groups: true
//           },
//         },
//         groups: true,
//       },
//     })
//     console.dir(allUsers, { depth: null })
//   }

// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

async function main() {
  try {
    await prisma.user.create({
      data: {
        username: 'KeigoT',
        nickname: 'Keigo',
        firstName: 'Keigo',
        lastName: 'Tanaka',
        email: 'tanaka@fake.com',
        password: 'password',
        items: {
          create: {
            itemName: 'basketball',
            description: '',
            rentCount: 0,
            categories: {
              create: {
                name: 'Sports',
              },
            },
            groups: {
              create: {
                name: 'Family',
              },
            },
            loanDurationDays: 5,
            imageUrl: 'www.google.com',
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
        groups: true,
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