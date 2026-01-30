# Email Sending Setup Guide

## 🚀 What's New

Your portfolio now supports **real email sending** for password reset codes!

### Current Status
- ✅ Development mode: Logs verification code to console
- ✅ Production mode: Sends real email via Resend API

---

## 📧 Setup Instructions

### Option 1: Real Email Sending (Recommended)

#### Step 1: Create Resend Account
1. Go to https://resend.com
2. Sign up (free tier available)
3. Copy your **API Key**

#### Step 2: Add Environment Variable

**Add to `.env.local`:**
```
RESEND_API_KEY=re_xxx_your_api_key_here
RESEND_FROM_EMAIL=noreply@duongquocvinh.dev
```

**Or add to `.env` (if using Docker):**
```
RESEND_API_KEY=re_xxx_your_api_key_here
RESEND_FROM_EMAIL=noreply@duongquocvinh.dev
```

#### Step 3: Test It

```bash
npm run dev
```

**Test Flow:**
1. Go to `http://localhost:3000/login`
2. Click "Reset" tab
3. Enter your email
4. Check your inbox for the reset code!

---

### Option 2: Console Logging (Development)

If `RESEND_API_KEY` is not set, emails are logged to console:

```bash
npm run dev
```

**Output in console:**
```
========== PASSWORD RESET EMAIL ==========
To: user@example.com
Subject: Password Reset Request - My Portfolio
Verification Code: 123456
Expires: 2026-01-30T14:30:00.000Z
=========================================
```

Copy the code and use it to reset password.

---

## 🔄 How It Works

### Password Reset Flow

```
User enters email
       ↓
Email validation (client-side)
       ↓
Server checks if email exists
       ↓
Generate 6-digit verification code
       ↓
Check for RESEND_API_KEY:
       ├─ If YES → Send real email via Resend API
       └─ If NO → Log to console (development)
       ↓
User receives code
       ↓
User enters code + new password
       ↓
Password reset successful
```

---

## 📝 Code Changes

### Updated File: `lib/email.ts`

**New Features:**
- ✅ Resend API integration
- ✅ Automatic fallback to console logging
- ✅ Better error handling
- ✅ HTML email template

**Method Priority:**
1. **Production**: Use Resend API (if `RESEND_API_KEY` exists)
2. **Development**: Use console logging

---

## 🧪 Testing Checklist

### With Resend API (Real Email)
- [ ] Set `RESEND_API_KEY` in `.env.local`
- [ ] Go to `/login` → Reset tab
- [ ] Enter your email
- [ ] Check console for log message ✅
- [ ] Check your inbox for email
- [ ] Verify code in email works

### Without Resend API (Console Only)
- [ ] Remove `RESEND_API_KEY` from `.env.local`
- [ ] Go to `/login` → Reset tab
- [ ] Enter any email
- [ ] Check console for code
- [ ] Use code to reset password

---

## 🔐 Security Notes

**The system checks:**
1. ✅ Email format is valid
2. ✅ Email exists in database
3. ✅ Code expires after 1 hour
4. ✅ Code can only be used once
5. ✅ Invalid code attempt shows proper error

---

## 📚 Environment Variables

### Required (for real email)
```
RESEND_API_KEY=re_xxx_your_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### Optional
```
NEXTAUTH_URL=http://localhost:3000  # Used in email reset link
```

---

## ✅ What's Working

| Feature | Status | Details |
|---------|--------|---------|
| Email validation | ✅ | Format + existence check |
| Code generation | ✅ | 6-digit random code |
| Code expiration | ✅ | 1 hour TTL |
| Console logging | ✅ | Dev mode only |
| Resend API | ✅ | Production-ready |
| Error handling | ✅ | Graceful fallbacks |

---

## 🚨 Troubleshooting

### Email not sending?
```
Check:
1. Is RESEND_API_KEY set in .env.local?
2. Is the API key valid? (Check Resend dashboard)
3. Is the email format correct?
4. Check console for errors
```

### Code not appearing?
```
Check:
1. Look at browser console for validation errors
2. Check server console for email sending logs
3. Is email in database?
4. Is verification token created in database?
```

### Wrong email address?
```
Check:
1. Email format: must be valid (xxx@yyy.zzz)
2. Email must exist in database (user registered)
3. User must have email field set
```

---

## 💡 Next Steps

1. ✅ Create Resend account
2. ✅ Add API key to `.env.local`
3. ✅ Test password reset flow
4. ✅ Deploy to production

---

**Ready to send emails! 📧**
