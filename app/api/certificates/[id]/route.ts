import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, issuer, date, desc, verifyUrl, imageUrl } = body;

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(issuer && { issuer }),
        ...(date && { date }),
        ...(desc !== undefined && { desc }),
        ...(verifyUrl !== undefined && { verifyUrl }),
        ...(imageUrl !== undefined && { imageUrl })
      }
    });

    return NextResponse.json(certificate, { status: 200 });
  } catch (err) {
    console.error('Error updating certificate:', err);
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.certificate.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Certificate deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting certificate:', err);
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
