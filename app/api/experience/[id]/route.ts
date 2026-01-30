import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { role, org, year, desc } = body;

    const experience = await prisma.experience.update({
      where: { id: params.id },
      data: {
        ...(role && { role }),
        ...(org && { org }),
        ...(year && { year }),
        ...(desc !== undefined && { desc })
      }
    });

    return NextResponse.json(experience, { status: 200 });
  } catch (err) {
    console.error('Error updating experience:', err);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.experience.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Experience deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting experience:', err);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
