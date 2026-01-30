import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(experiences, { status: 200 });
  } catch (err) {
    console.error('Error fetching experiences:', err);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}
