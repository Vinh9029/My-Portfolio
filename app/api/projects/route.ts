import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    console.error('Error fetching projects:', err);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, desc, link, tags, color } = body;

    if (!title || !desc) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        desc,
        link: link || '',
        tags: typeof tags === 'string' ? tags : JSON.stringify(tags || []),
        color: color || 'from-blue-500 to-cyan-500'
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error('Error creating project:', err);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
