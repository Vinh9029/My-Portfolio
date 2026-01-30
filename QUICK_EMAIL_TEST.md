# Quick Test Guide: Email Sending Feature

## ✅ What's Implemented

1. **Email Format Validation** - Checks if email looks valid
2. **Email Existence Check** - Confirms email is in database
3. **Beautiful UI** - Loading spinner, disabled inputs
4. **Error Messages** - Clear, user-friendly feedback
5. **Success Toast** - Green notification when email sent
6. **Code Sending** - 6-digit code sent to email

---

## 🚀 Quick Test (2 minutes)

### Step 1: Start Dev Server
```bash
cd e:\MyPortfolio-1
npm run dev
```

Expected output:
```
▲ Next.js 16.1.6
- Local:        http://localhost:3000
- Environments: .env.local
```

### Step 2: Go to Login Page
Open browser:
```
http://localhost:3000/login
```

### Step 3: Click "Reset" Tab
See form with:
- Email Address input field
- "Send Verification Code" button
- "Back to Login" button

### Step 4: Test Case 1 - Valid Email That Exists

If you already have a registered account with email:

```
Email: your-registered-email@example.com
```

**Actions:**
1. Type email
2. Click "Send Verification Code"
3. Wait for loading spinner

**Expected Result:**
```
✅ Green toast appears:
"Email sent! Check your inbox for the verification code."

The form switches to "Verify" tab showing:
- Verification Code input (6 digits)
- New Password input
- Confirm Password input
- "Reset Password" button

Check console for code:
========== PASSWORD RESET EMAIL ==========
To: your-email@example.com
Subject: Password Reset Request - My Portfolio
Verification Code: 123456
Expires: ...
=========================================
```

### Step 5: Test Case 2 - Invalid Email Format

```
Email: invalid-email-format
```

**Actions:**
1. Type "invalid"
2. Click "Send Verification Code"

**Expected Result:**
```
❌ Red toast appears immediately:
"Please enter a valid email address"

Form stays on Reset tab
Email input is cleared
```

### Step 6: Test Case 3 - Email Doesn't Exist

```
Email: nonexistent@example.com
```

**Actions:**
1. Type "nonexistent@example.com"
2. Click "Send Verification Code"

**Expected Result:**
```
❌ Red toast appears:
"No account found with this email address"

Form stays on Reset tab
You can try different email
```

### Step 7: Test Case 4 - Loading State

During email sending (1-2 second delay):

**Expected Results:**
```
✅ Button shows: "⟳ Sending email..."
✅ Spinner animates smoothly
✅ Email input is disabled (faded)
✅ Can't click button again
```

---

## 📋 Test Checklist

Use an account you've already created. To create one:

1. Go to http://localhost:3000/login
2. Click "Register" tab
3. Create account with:
   - Username: testuser
   - Email: test@example.com
   - Password: password123

Then test Reset:

- [ ] **Valid Email** - See success toast
- [ ] **Invalid Format** - See error immediately
- [ ] **Non-existent Email** - See "No account found" error
- [ ] **Empty Field** - See "Please provide email" error
- [ ] **Loading Spinner** - Animates while sending
- [ ] **Button Disabled** - During email sending
- [ ] **Switch to Verify** - After success

---

## 🔍 What to Look For

### Success Flow
```
1. Click "Reset"
   ↓
2. Type valid email
   ↓
3. Click button
   ↓
4. See loading spinner (1-2 sec)
   ↓
5. Green toast appears
   ↓
6. Form switches to "Verify" tab
   ↓
✅ SUCCESS!
```

### Error Flow
```
1. Click "Reset"
   ↓
2. Type invalid input
   ↓
3. Click button
   ↓
4. Red toast appears immediately
   ↓
5. Still on "Reset" tab
   ↓
✅ ERROR HANDLED PROPERLY!
```

---

## 📱 UI Elements to Check

### Email Input Field
```
✅ Placeholder text: "your.email@example.com"
✅ Icon: Mail icon on left
✅ Focus state: Blue border
✅ Disabled state: Grayed out during sending
```

### Send Button
```
✅ Text: "Send Verification Code"
✅ Loading text: "⟳ Sending email..."
✅ Color: Cyan/Blue gradient
✅ Hover effect: Lighter shade
✅ Disabled effect: Gray, no glow
```

### Helper Text
```
✅ Below email: "Enter the email associated with your account"
```

### Loading Spinner
```
✅ Smooth rotating circle
✅ White color
✅ Small size (16px)
✅ Appears next to text when loading
```

---

## 🐛 If Something Goes Wrong

### Email sending takes too long
- Check console (F12 → Console tab)
- Should see code printed there
- Network connection might be slow

### Button won't respond
- Refresh page (F5)
- Clear browser cache (Ctrl+Shift+Delete)
- Close dev server and restart

### Form won't switch to Verify
- Check if success toast appeared
- Look at console for any errors
- Try clearing browser cookies

### Error message keeps showing
- Check email format is correct (@ and .)
- Check email exists in database
- Try registering new account first

---

## 🎯 Expected Behavior Summary

| Input | Expected | Result |
|-------|----------|--------|
| Valid email in DB | Green toast + Switch to Verify | ✅ Works |
| Invalid format | Red toast immediately | ✅ Works |
| Email not in DB | Red toast error message | ✅ Works |
| Empty field | Red toast error | ✅ Works |
| While sending | Loading spinner, disabled button | ✅ Works |

---

## 📧 Email Verification Code

In development mode, the code is printed to console:

**Console Location:**
1. Open browser DevTools: `F12`
2. Click "Console" tab
3. Look for this output:

```
========== PASSWORD RESET EMAIL ==========
To: your.email@example.com
Subject: Password Reset Request - My Portfolio
Verification Code: 123456
Expires: 2026-01-30T18:30:00.000Z
=========================================
```

**Copy the code:** `123456`
**Use it in:** Verification Code field (Step 5)

---

## ✅ Final Verification

After testing all cases, you should have:

1. ✅ **Email validation working** - Invalid formats rejected
2. ✅ **Database check working** - Non-existent emails rejected
3. ✅ **Loading state working** - Spinner visible, button disabled
4. ✅ **Error messages clear** - Users understand what went wrong
5. ✅ **Success flow working** - Switches to verify form
6. ✅ **Beautiful UI** - Professional appearance

---

## 🚀 Ready to Use!

Once all tests pass, you can:

1. ✅ Share with users
2. ✅ Deploy to production
3. ✅ Setup real email service (Mailgun/SendGrid)
4. ✅ Remove console logging for production

---

## 📞 Troubleshooting Commands

If you need to debug, use these console commands:

**Check if server is running:**
```bash
curl http://localhost:3000
```

**Check API endpoint directly:**
```bash
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"identifier":"test@example.com"}'
```

**View database records:**
```bash
npm run studio
```
Opens Prisma Studio to see database.

---

## 🎉 You're All Set!

The email sending feature is complete and ready to test. Follow the quick test steps above and enjoy! 🚀
