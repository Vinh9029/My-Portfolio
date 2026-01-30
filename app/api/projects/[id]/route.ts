import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, desc, link, tags, color } = body;

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(desc && { desc }),
        ...(link !== undefined && { link }),
        ...(tags && { tags: typeof tags === 'string' ? tags : JSON.stringify(tags) }),
        ...(color && { color })
      }
    });

    return NextResponse.json(project, { status: 200 });
  } catch (err) {
    console.error('Error updating project:', err);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.project.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting project:', err);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
