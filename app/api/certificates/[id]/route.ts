import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, issuer, date, desc, verifyUrl, imageUrl } = body;

    const certificate = await prisma.certificate.update({
      where: { id: params.id },
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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.certificate.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Certificate deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting certificate:', err);
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
