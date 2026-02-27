import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';

export async function POST(req: Request) {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const data = await req.json();
        const hackathon = await prisma.hackathon.create({ data });
        return NextResponse.json(hackathon);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating hackathon' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const data = await req.json();
        const { id, ...updateData } = data;
        const hackathon = await prisma.hackathon.update({ where: { id }, data: updateData });
        return NextResponse.json(hackathon);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating hackathon' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.hackathon.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting hackathon' }, { status: 500 });
    }
}
