import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  const callbackUrl = `${baseUrl}/api/auth/callback/google`;
  const githubCallbackUrl = `${baseUrl}/api/auth/callback/github`;
  
  return NextResponse.json({
    nextauth_url: baseUrl,
    google_callback: callbackUrl,
    github_callback: githubCallbackUrl,
    google_client_id: process.env.GOOGLE_ID,
    message: 'Add these callback URLs to your OAuth provider config'
  });
}
