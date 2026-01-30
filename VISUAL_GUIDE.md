# Visual Guide: Password Reset & OAuth

## User Interface Flow

### Step 1: Login Page - Reset Tab
```
┌─────────────────────────────────────┐
│  Welcome Back                       │
│  Sign in to access Admin Dashboard  │
│                                     │
│  [Sign In] [Register] [Reset]      │ ← Click Reset
│                                     │
├─────────────────────────────────────┤
│ Email Address                       │
│ ┌─────────────────────────────────┐ │
│ │  you@example.com               │ │
│ └─────────────────────────────────┘ │
│ We'll send a verification code      │
│ to this email                       │
│                                     │
│ [Send Verification Code]            │
│ [Back to Login]                     │
└─────────────────────────────────────┘
```

### Step 2: Check Email for Code
Email received:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       Password Reset Request

Hi John,

We received a request to reset your 
password. Use the verification code 
below to proceed:

       ┌──────────────┐
       │   123456     │  ← 6-digit code
       └──────────────┘

This code will expire in 1 hour.

Steps to reset your password:
1. Go to the login page
2. Click on the "Reset" tab
3. Enter your email address
4. Check your email for the verification code
5. Enter the code and your new password
6. Click "Reset Password"

[Go to Login]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 3: Login Page - Verify Form
```
┌─────────────────────────────────────┐
│  Welcome Back                       │
│  Sign in to access Admin Dashboard  │
│                                     │
│  [Sign In] [Register] [Reset]      │
│                                     │
├─────────────────────────────────────┤
│ Verification Code                   │
│ ┌─────────────────────────────────┐ │
│ │  1  2  3  4  5  6              │ │ ← Enter code
│ └─────────────────────────────────┘ │
│ Enter the 6-digit code sent to      │
│ you@example.com                     │
│                                     │
│ New Password                        │
│ ┌─────────────────────────────────┐ │
│ │  ••••••••                      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Confirm Password                    │
│ ┌─────────────────────────────────┐ │
│ │  ••••••••                      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Reset Password]                    │
│ [Back to Reset Request]             │
└─────────────────────────────────────┘
```

### Step 4: Success & Login
```
┌─────────────────────────────────────┐
│ ✅ Password reset successfully!     │
│    Redirecting to login...          │
└─────────────────────────────────────┘

Then redirects back to:

┌─────────────────────────────────────┐
│  Welcome Back                       │
│  Sign in to access Admin Dashboard  │
│                                     │
│  [Sign In] [Register] [Reset]      │
│                                     │
├─────────────────────────────────────┤
│ Username                            │
│ ┌─────────────────────────────────┐ │
│ │  your-username                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Password                            │
│ ┌─────────────────────────────────┐ │
│ │  ••••••••  (new password)       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Sign In] ← Login with new password │
└─────────────────────────────────────┘
```

---

## OAuth Login Buttons

```
┌─────────────────────────────────────┐
│  Welcome Back                       │
│  Sign in to access Admin Dashboard  │
│                                     │
│  [Sign In] [Register] [Reset]      │
│                                     │
├─────────────────────────────────────┤
│  ... standard form fields ...       │
│                                     │
│  ─ Or continue with ─              │
│                                     │
│  [🔷 Google]  [⚫ Github]           │ ← OAuth buttons
│                                     │
│  [← Back to Portfolio]              │
└─────────────────────────────────────┘
```

### Google OAuth Flow
```
1. User clicks [Google] button
    ↓
2. Redirects to Google login
    ↓
3. User authenticates with Google
    ↓
4. Google redirects to:
   /api/auth/callback/google
    ↓
5. Account linked or created
    ↓
6. Redirected to /admin
```

### GitHub OAuth Flow
```
1. User clicks [Github] button
    ↓
2. Redirects to GitHub login
    ↓
3. User authorizes app
    ↓
4. GitHub redirects to:
   /api/auth/callback/github
    ↓
5. Account linked or created
    ↓
6. Redirected to /admin
```

---

## Console Output During Development

When user requests password reset:

```
========== PASSWORD RESET EMAIL ==========
To: you@example.com
Subject: Password Reset Request - My Portfolio
Verification Code: 123456
Expires: 2026-01-30T18:30:00.000Z
=========================================

HTML Content:
[Full email HTML rendered in console]
```

Copy the code from here and use it in the form.

---

## Error States

### Invalid Code
```
┌──────────────────────────────┐
│ ❌ Invalid or expired        │
│    verification code         │
└──────────────────────────────┘
```

### Code Expired
```
┌──────────────────────────────┐
│ ❌ Verification code has     │
│    expired                   │
│ [Back to Reset Request]      │
└──────────────────────────────┘
```

### Passwords Don't Match
```
┌──────────────────────────────┐
│ ❌ Passwords do not match    │
└──────────────────────────────┘
```

### Password Too Short
```
┌──────────────────────────────┐
│ ❌ Password must be at least │
│    6 characters              │
└──────────────────────────────┘
```

---

## Success States

### Email Sent
```
┌──────────────────────────────┐
│ ✅ Check your email for the  │
│    verification code!        │
└──────────────────────────────┘
```

### Password Reset
```
┌──────────────────────────────┐
│ ✅ Password reset successful!│
│    Logging you in...         │
└──────────────────────────────┘
```

---

## Timeline: What Happens

```
User submits email
        ↓
[POST /api/auth/reset-password]
        ↓
Server checks if user exists
        ↓
Server generates 6-digit code
        ↓
Server saves code in database with 1-hour expiration
        ↓
Email is sent (or logged to console)
        ↓
User receives code
        ↓
User goes to "Verify" form
        ↓
User enters code + new password
        ↓
[POST /api/auth/verify-reset]
        ↓
Server validates code (not expired, not used)
        ↓
Server hashes new password with bcrypt
        ↓
Server updates user password in database
        ↓
Server deletes used verification token
        ↓
User redirected to login
        ↓
✅ User can now login with new password
```

---

## Database Records

### Before Reset Request
```
User:
├─ id: "user123"
├─ username: "john_doe"
├─ email: "john@example.com"
├─ password: "$2a$10$hashed_old_password..."
└─ role: "viewer"

VerificationToken: (empty)
```

### During Reset (Code Sent)
```
User: (unchanged)

VerificationToken:
├─ identifier: "john@example.com"
├─ token: "123456"
└─ expires: "2026-01-30T18:30:00Z"
```

### After Reset (Password Updated)
```
User:
├─ id: "user123"
├─ username: "john_doe"
├─ email: "john@example.com"
├─ password: "$2a$10$hashed_new_password..."  ← CHANGED
└─ role: "viewer"

VerificationToken: (DELETED - used code removed)
```

---

## Files Involved

```
User Journey → Component/File → Action
─────────────────────────────────────

Click Reset    → app/login/page.tsx
                 └─ Shows "Reset" form

Submit Email   → app/api/auth/reset-password/route.ts
                 ├─ Looks up user
                 ├─ Generates 6-digit code
                 ├─ Saves to VerificationToken
                 └─ Sends email

Check Email    → lib/email.ts
                 └─ Email template rendered

Enter Code     → app/login/page.tsx
                 └─ Shows "Verify" form

Submit Code    → app/api/auth/verify-reset/route.ts
                 ├─ Validates code
                 ├─ Updates password
                 ├─ Deletes token
                 └─ Success

Login          → app/api/auth/[...nextauth]/route.ts
                 └─ Credentials provider authenticates

Admin Panel    → app/admin/page.tsx
                 └─ Logged in user sees dashboard
```
