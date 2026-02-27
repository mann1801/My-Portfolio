import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';

export async function POST(req: Request) {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const data = await req.json();
        const skill = await prisma.skill.create({ data });
        return NextResponse.json(skill);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating skill' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const data = await req.json();
        const { id, ...updateData } = data;
        const skill = await prisma.skill.update({ where: { id }, data: updateData });
        return NextResponse.json(skill);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating skill' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.skill.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting skill' }, { status: 500 });
    }
}
