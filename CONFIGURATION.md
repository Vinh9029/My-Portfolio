# Configuration Quick Reference

## ⚠️ IMPORTANT - Action Required

You need to configure your contact URLs before deploying!

### Step 1: Update Zalo Link
**File:** `/app/components/SocialContactPopup.tsx` (Line 25)

Find:
```tsx
url: 'https://zalo.me/YOUR_ZALO_NUMBER', // Replace with your Zalo URL
```

Replace with your actual Zalo number:
```tsx
url: 'https://zalo.me/0123456789', // Example: Your actual phone number
```

### Step 2: Update Messenger Link
**File:** `/app/components/SocialContactPopup.tsx` (Line 45)

Find:
```tsx
url: 'https://m.me/YOUR_FACEBOOK_ID', // Replace with your Facebook ID
```

Replace with your Facebook username/ID:
```tsx
url: 'https://m.me/vinh.nguyen.12345', // Example: Your actual Facebook ID
```

---

## How to Get Your IDs

### Zalo
- Open https://zalo.me in browser
- Your Zalo number is displayed in profile
- Format: `https://zalo.me/0123456789` (replace with your number)

### Facebook Messenger
1. Visit your Facebook profile
2. Check the URL bar - it shows your ID/username
3. For messaging: `https://m.me/YOUR_ID_OR_USERNAME`
4. Test: Go to https://m.me/vinh9029 (replace vinh9029 with your ID)

---

## Testing the Popup

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Visit homepage:**
   - Go to http://localhost:3000
   - Scroll to bottom-right corner

3. **Test popup:**
   - Click the floating chat button
   - See the popup appear
   - Hover over Zalo/Messenger to see highlight
   - Click to verify links open correctly

---

## Admin Dashboard Access

1. Navigate to: `http://localhost:3000/admin`
2. You should see the admin panel
3. Try adding/editing/deleting items
4. Watch Toast notifications appear in top-right

---

## API Endpoints Available

```
POST   /api/projects          - Create project
GET    /api/projects          - List all projects
PUT    /api/projects/[id]     - Update project
DELETE /api/projects/[id]     - Delete project

POST   /api/certificates      - Create certificate
GET    /api/certificates      - List all certificates
PUT    /api/certificates/[id] - Update certificate
DELETE /api/certificates/[id] - Delete certificate

POST   /api/experience        - Create experience
GET    /api/experience        - List all experiences
PUT    /api/experience/[id]   - Update experience
DELETE /api/experience/[id]   - Delete experience
```

---

## Customization Ideas

### Add More Social Platforms
Edit `/app/components/SocialContactPopup.tsx` and add to `contacts` array:

```tsx
{
  id: 'whatsapp',
  name: 'WhatsApp',
  icon: <WhatsAppIcon />, // You'll need to import or create icon
  color: 'from-green-500 to-green-600',
  url: 'https://wa.me/0123456789', // Your WhatsApp number
  description: 'Chat on WhatsApp'
}
```

### Change Popup Colors
Replace gradient colors in `contacts` array:
- `'from-cyan-500 to-blue-500'` → Any Tailwind gradient

### Change Button Position
Search `fixed bottom-8 right-8` and adjust:
- `bottom-8` → Change vertical position (8 = 2rem from bottom)
- `right-8` → Change horizontal position (8 = 2rem from right)

---

## Verification Checklist

- [ ] Zalo URL updated in SocialContactPopup.tsx
- [ ] Messenger URL updated in SocialContactPopup.tsx
- [ ] Admin dashboard loads at /admin
- [ ] Can create/edit/delete items in admin
- [ ] Toast notifications appear
- [ ] Social popup appears at bottom-right on homepage
- [ ] Zalo link works when clicked
- [ ] Messenger link works when clicked

---

**Status:** 🚀 Ready to Deploy (after configuration)
