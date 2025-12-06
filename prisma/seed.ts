import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const email = 'hire-me@anshumat.org'
  
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: 'HireMe@2025!',
      budget: {
        create: {
           income: 0, monthlyBills: 0, food: 0, 
           transport: 0, subscriptions: 0, miscellaneous: 0
        }
      }
    },
  })
  console.log('✅ Demo user seeded!')
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e); 
    await prisma.$disconnect();
    process.exit(1);
  })