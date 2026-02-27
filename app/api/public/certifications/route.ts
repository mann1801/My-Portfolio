import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const certifications = await prisma.certification.findMany({
            orderBy: { year: 'desc' }
        });
        return NextResponse.json(certifications);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching certifications' }, { status: 500 });
    }
}
