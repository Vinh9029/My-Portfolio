// e:\MyPortfolio\my-portoflio\app\api\auth\login\route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    // Note: In a real app, use bcrypt to compare hashed passwords!
    // For this specific request, we check against the seeded user.
    // We treat the 'email' field from the form as 'username' for the DB check
    // or you can adjust the frontend to send 'username'.

    // Assuming input might be email or username, but our DB has username.
    // Let's check against the specific account requested.

    const user = await prisma.user.findUnique({
        where: { username: email } // Using email input field as username container
    });

    if (user && user.password === password) {
        // Login Success
        // In a real app, set a session cookie here.
        return NextResponse.json({
            success: true,
            user: { username: user.username, role: user.role }
        });
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
