const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendPasswordResetEmail(email: string, verificationCode: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/login?resetCode=${verificationCode}&email=${encodeURIComponent(email)}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .code { background: #1e293b; color: #06b6d4; font-size: 32px; font-weight: bold; text-align: center; padding: 20px; letter-spacing: 5px; border-radius: 8px; font-family: 'Courier New', monospace; }
          .footer { color: #64748b; font-size: 12px; text-align: center; margin-top: 20px; }
          .note { color: #475569; font-size: 14px; margin-top: 15px; padding: 15px; background: #e0f2fe; border-left: 3px solid #0284c7; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset</h1>
            <p>Your verification code</p>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password. Use the verification code below:</p>
            <div class="code">${verificationCode}</div>
            <p style="text-align: center; margin-top: 20px;">Or use this link:</p>
            <p style="text-align: center;"><a href="${resetUrl}" style="display: inline-block; background: #06b6d4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 500;">Reset Password</a></p>
            <div class="note">
              <strong>⏰ Important:</strong> This code expires in 1 hour. If you didn't request this, please ignore this email.
            </div>
            <div class="footer">
              <p>© 2025 My Portfolio. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    // Try using Resend API
    if (RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: RESEND_FROM_EMAIL,
          to: email,
          subject: 'Password Reset - Verification Code',
          html: html,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Resend API error:', error);
        // Fall back to console logging
        console.log(`\n📧 Password Reset Email (Resend API)\n${'='.repeat(50)}\nTo: ${email}\nCode: ${verificationCode}\nExpires: 1 hour\n${'='.repeat(50)}\n`);
        return { success: true, method: 'console' };
      }

      const data = await response.json();
      console.log(`✅ Email sent via Resend API to ${email}`);
      return { success: true, method: 'resend', data };
    } else {
      // Fallback: console logging
      console.log(`\n📧 Password Reset Email (Development Mode)\n${'='.repeat(50)}\nTo: ${email}\nSubject: Password Reset - Verification Code\nCode: ${verificationCode}\nExpires: 1 hour\n${'='.repeat(50)}\n`);
      return { success: true, method: 'console' };
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    // Fallback to console logging on any error
    console.log(`\n📧 Password Reset Email (Fallback)\n${'='.repeat(50)}\nTo: ${email}\nCode: ${verificationCode}\n${'='.repeat(50)}\n`);
    return { success: true, method: 'console' };
  }
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    if (RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: RESEND_FROM_EMAIL,
          to,
          subject,
          html,
        }),
      });

      if (!response.ok) {
        console.error('Email send failed:', await response.json());
        return { success: false };
      }

      return { success: true, method: 'resend' };
    } else {
      console.log(`📧 Email sent to: ${to}\nSubject: ${subject}`);
      return { success: true, method: 'console' };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false };
  }
}
