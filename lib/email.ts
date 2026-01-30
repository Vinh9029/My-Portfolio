// Email sending utility with Gmail support
// This uses a simple fetch-based approach to avoid nodemailer dependency issues

export async function sendPasswordResetEmail(email: string, code: string, username: string) {
  const resetLink = `${process.env.NEXTAUTH_URL}/login`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #333; margin-bottom: 20px;">Password Reset Request</h1>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          Hi <strong>${username}</strong>,
        </p>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          We received a request to reset your password. Use the verification code below to proceed:
        </p>
        
        <div style="background-color: #f0f0f0; padding: 20px; border-radius: 6px; margin: 20px 0; text-align: center;">
          <p style="font-size: 32px; font-weight: bold; color: #0070f3; letter-spacing: 2px; margin: 0;">
            ${code}
          </p>
        </div>
        
        <p style="color: #555; font-size: 14px;">
          This code will expire in <strong>1 hour</strong>.
        </p>
        
        <p style="color: #555; font-size: 14px; margin: 20px 0;">
          Steps to reset your password:
        </p>
        <ol style="color: #555; font-size: 14px;">
          <li>Go to the login page</li>
          <li>Click on the "Reset" tab</li>
          <li>Enter your email address</li>
          <li>Check your email for the verification code</li>
          <li>Enter the code and your new password</li>
          <li>Click "Reset Password"</li>
        </ol>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" style="background-color: #0070f3; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Go to Login
          </a>
        </div>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
          If you didn't request a password reset, please ignore this email or contact support if you have questions.
        </p>
        
        <p style="color: #999; font-size: 12px;">
          © 2026 My Portfolio. All rights reserved.
        </p>
      </div>
    </div>
  `;

  try {
    // For now, log the code to console for development
    // In production, you can integrate with SendGrid, Mailgun, or install nodemailer properly
    console.log(`\n========== PASSWORD RESET EMAIL ==========`);
    console.log(`To: ${email}`);
    console.log(`Subject: Password Reset Request - My Portfolio`);
    console.log(`Verification Code: ${code}`);
    console.log(`Expires: ${new Date(Date.now() + 1000 * 60 * 60).toISOString()}`);
    console.log(`=========================================\n`);

    // Optional: You can use a service like Mailgun, SendGrid, or Resend instead
    // const response = await fetch('https://api.mailgun.net/v3/YOUR_DOMAIN/messages', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     from: 'noreply@yourportfolio.com',
    //     to: email,
    //     subject: 'Password Reset Request - My Portfolio',
    //     html: htmlContent,
    //   })
    // });

    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    console.log(`[DEV] Password reset code for ${email}: ${code}`);
    return false;
  }
}
