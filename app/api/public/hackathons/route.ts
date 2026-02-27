import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const hackathons = await prisma.hackathon.findMany({
            orderBy: { year: 'desc' }
        });
        return NextResponse.json(hackathons);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching hackathons' }, { status: 500 });
    }
}
