// e:\MyPortfolio\my-portoflio\app\api\[category]\route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    props: { params: Promise<{ category: string }> }
) {
    const params = await props.params;
    const category = params.category;

    try {
        let data;
        switch (category) {
            case 'projects':
                const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
                data = projects.map((p) => ({
                    ...p,
                    tags: p.tags ? JSON.parse(p.tags) : [],
                }));
                break;
            case 'certificates':
                data = await prisma.certificate.findMany({ orderBy: { createdAt: 'desc' } });
                break;
            case 'experience':
                data = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });
                break;
            default:
                return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    props: { params: Promise<{ category: string }> }
) {
    const params = await props.params;
    const category = params.category;
    const body = await request.json();

    try {
        let newItem;
        switch (category) {
            case 'projects':
                newItem = await prisma.project.create({
                    data: {
                        title: body.title,
                        desc: body.desc,
                        link: body.link,
                        tags: JSON.stringify(body.tags || []),
                        color: body.color || "from-blue-500 to-cyan-500"
                    }
                });
                break;
            case 'certificates':
                newItem = await prisma.certificate.create({
                    data: {
                        title: body.title,
                        issuer: body.issuer,
                        date: body.date,
                        desc: body.desc,
                        verifyUrl: body.verifyUrl,
                        imageUrl: body.imageUrl
                    }
                });
                break;
            case 'experience':
                newItem = await prisma.experience.create({
                    data: {
                        role: body.role,
                        org: body.org,
                        year: body.year,
                        desc: body.desc
                    }
                });
                break;
            default:
                return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }
        return NextResponse.json(newItem);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
    }
}
