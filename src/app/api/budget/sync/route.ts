import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body || !body.data) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    
    await db.budget.upsert({ 
      where: { userId: session.user.id },
      update: { ...body.data },
      create: { ...body.data }
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({ 
      status: 'success', 
      syncedAt: new Date().toISOString() 
    });

  } catch (error) {
    console.error('Sync failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}