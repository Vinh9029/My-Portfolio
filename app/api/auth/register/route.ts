import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, email, name } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'username and password are required' }, { status: 400 });
    }

    if (username.length < 3) {
      return NextResponse.json({ error: 'username must be at least 3 characters' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'password must be at least 6 characters' }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          ...(email ? [{ email }] : [])
        ],
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'User with that username or email already exists' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashed,
        ...(email ? { email } : {}),
        name: name ?? null,
        role: 'viewer',
      },
    });

    return NextResponse.json({ 
      ok: true, 
      user: { 
        id: user.id, 
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      } 
    }, { status: 201 });
  } catch (err) {
    console.error('Register error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
