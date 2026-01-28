// e:\MyPortfolio\my-portoflio\app\api\[category]\route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { category: string } }
) {
    const category = params.category;

    try {
        let data;
        // Map category to Prisma model delegate
        switch (category) {
            case 'projects':
                data = await prisma.project.findMany();
                break;
            case 'certificates':
                data = await prisma.certificate.findMany();
                break;
            case 'experience':
                data = await prisma.experience.findMany();
                break;
            default:
                return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: { category: string } }
) {
    const category = params.category;
    const body = await request.json();

    try {
        let newItem;
        switch (category) {
            case 'projects':
                newItem = await prisma.project.create({ data: body });
                break;
            case 'certificates':
                newItem = await prisma.certificate.create({ data: body });
                break;
            case 'experience':
                newItem = await prisma.experience.create({ data: body });
                break;
            default:
                return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }
        return NextResponse.json(newItem);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
    }
}
