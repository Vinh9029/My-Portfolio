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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, org, year, desc } = body;

    if (!role || !org) {
      return NextResponse.json({ error: 'Role and organization are required' }, { status: 400 });
    }

    const experience = await prisma.experience.create({
      data: {
        role,
        org,
        year: year || new Date().getFullYear().toString(),
        desc: desc || ''
      }
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (err) {
    console.error('Error creating experience:', err);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
