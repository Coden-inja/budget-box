import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body || !body.data) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    
    const demoUser = await prisma.user.findUnique({
      where: { email: 'hire-me@anshumat.org' }
    });

    if (!demoUser) {
      return NextResponse.json({ error: 'Demo user not found. Run seed script.' }, { status: 500 });
    }

    const updatedBudget = await prisma.budget.update({
      where: { userId: demoUser.id },
      data: {
        income: body.data.income,
        monthlyBills: body.data.monthlyBills,
        food: body.data.food,
        transport: body.data.transport,
        subscriptions: body.data.subscriptions,
        miscellaneous: body.data.miscellaneous,
        lastSynced: new Date(),
      },
    });

   
    return NextResponse.json({ 
      status: 'success', 
      syncedAt: updatedBudget.lastSynced 
    });

  } catch (error) {
    console.error('Database Sync failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}