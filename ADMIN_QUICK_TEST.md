# 🧪 Quick Admin Security Testing

## ⚡ 30-Second Test

### 1. Test Authentication
```
1. Open http://localhost:3000/admin (without login)
2. See "Checking access..." spinner
3. Redirected to /login (✓ works!)
4. Login with your credentials
5. Back to /admin dashboard (✓ auth works!)
```

### 2. Test Viewer Mode (In Browser Console)
```javascript
// Paste này vào browser console (F12)
localStorage.setItem('userMode', 'viewer');
location.reload();
```

**Then:**
- Click "Add New" button → See toast with 🔒 emoji
- Click "Edit" button → See warning toast
- Click "Delete" button → See warning toast
- All buttons disabled (faded out) ✓

### 3. Back to Editor Mode
```javascript
// Paste này vào browser console
localStorage.removeItem('userMode');
location.reload();
```

**Then:**
- "Add New" works normally (modal opens)
- "Edit" works normally
- "Delete" works normally
- Buttons fully enabled ✓

---

## 📋 What Was Changed

| Feature | Before | After |
|---------|--------|-------|
| Auth check | No loading state | Shows spinner during check |
| Viewer mode message | "You're in viewer mode" | "🔒 Viewer mode: You can only view content..." |
| Message duration | 3 seconds | 4.5 seconds |
| Toast styling | Basic | Warning type with amber gradient |

---

## ✅ Testing Checklist

- [ ] Unlogged user → redirects to /login
- [ ] Logged user → accesses /admin normally
- [ ] Viewer mode: Add New button → toast with lock emoji
- [ ] Viewer mode: Edit button → toast with lock emoji
- [ ] Viewer mode: Delete button → toast with lock emoji
- [ ] Viewer mode: All buttons disabled (50% opacity)
- [ ] Editor mode: All buttons work normally
- [ ] Toast message appears for 4.5 seconds
- [ ] Header shows "🔒 Viewer Mode" badge when in viewer mode

---

## 🎯 Expected Toast Messages

**Add New in Viewer Mode:**
```
🔒 Viewer mode: You can only view content. Contact admin for full access.
```

**Edit in Viewer Mode:**
```
🔒 Viewer mode: You cannot edit content. Contact admin for full access.
```

**Delete in Viewer Mode:**
```
🔒 Viewer mode: You cannot delete content. Contact admin for full access.
```

All messages show with:
- ⚠️ Orange/amber icon
- Amber gradient background
- Smooth slide-in animation
- Auto-dismiss after 4.5 seconds

---

## 🔍 Debugging Tips

**Check if in viewer mode:**
```javascript
// In browser console
localStorage.getItem('userMode') // Should return 'viewer' or null
```

**Check authentication status:**
```javascript
// In browser console
fetch('/api/auth/session', { credentials: 'include' })
  .then(r => r.json())
  .then(console.log)
```

**Clear all storage (if stuck):**
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

---

**That's it! 🚀 Admin dashboard is now secure with proper UI/UX feedback.**
