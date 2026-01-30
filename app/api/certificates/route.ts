import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(certificates, { status: 200 });
  } catch (err) {
    console.error('Error fetching certificates:', err);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, issuer, date, desc, verifyUrl, imageUrl } = body;

    if (!title || !issuer) {
      return NextResponse.json({ error: 'Title and issuer are required' }, { status: 400 });
    }

    const certificate = await prisma.certificate.create({
      data: {
        title,
        issuer,
        date: date || new Date().getFullYear().toString(),
        desc: desc || '',
        verifyUrl: verifyUrl || '',
        imageUrl: imageUrl || '/cert-placeholder.png'
      }
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (err) {
    console.error('Error creating certificate:', err);
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
  }
}
