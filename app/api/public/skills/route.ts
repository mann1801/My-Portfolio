import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const skills = await prisma.skill.findMany({ orderBy: { proficiency: 'desc' } });
        return NextResponse.json(skills);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching skills' }, { status: 500 });
    }
}
