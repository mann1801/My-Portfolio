import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const education = await prisma.education.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
        return NextResponse.json(education);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching education' }, { status: 500 });
    }
}
