import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier } = body; // email or username

    if (!identifier) {
      return NextResponse.json({ error: 'identifier is required' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    // Do not reveal whether the user exists. Still create a token for real users.
    if (!user) {
      return NextResponse.json({ ok: true });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.verificationToken.create({
      data: {
        identifier: identifier,
        token,
        expires,
      },
    });

    // TODO: send email with reset link to user.email. For now we log it so developer can copy.
    console.log(`Password reset token for ${identifier}: ${token}`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Reset password error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
