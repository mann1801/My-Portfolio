import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth';

export async function POST(req: Request) {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const data = await req.json();
        const project = await prisma.project.create({ data });
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating project' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const data = await req.json();
        const { id, ...updateData } = data;
        const project = await prisma.project.update({ where: { id }, data: updateData });
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating project' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.project.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting project' }, { status: 500 });
    }
}
