import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}
