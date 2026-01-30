import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier } = body; // email or username

    if (!identifier) {
      return NextResponse.json({ error: 'identifier is required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(identifier);

    const user = await prisma.user.findFirst({
      where: isEmail
        ? { email: identifier }
        : { username: identifier },
    });

    // Check if user exists and has email
    if (!user) {
      return NextResponse.json(
        { error: isEmail ? 'No account found with this email address' : 'No account found with this username' },
        { status: 404 }
      );
    }

    if (!user.email) {
      return NextResponse.json(
        { error: 'This account has no email address associated with it' },
        { status: 400 }
      );
    }

    // Generate a 6-digit code for better UX
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token: code,
        expires,
      },
    });

    // Send email with reset code
    const emailSent = await sendPasswordResetEmail(user.email, code, user.username || user.name || 'User');

    if (!emailSent) {
      console.error('Failed to send password reset email to', user.email);
      // Still return success to not reveal whether email was sent
      return NextResponse.json({ ok: true, message: 'Password reset email has been sent. Please check your inbox.' });
    }

    return NextResponse.json({ ok: true, message: 'Password reset email has been sent. Please check your inbox.' });
  } catch (err) {
    console.error('Reset password error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
