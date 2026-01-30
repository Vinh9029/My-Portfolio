# Admin Dashboard & Homepage Update - Setup Guide

## Overview
This document details all the backend and frontend changes made to your portfolio application.

---

## Part 1: Backend Implementation

### 1. API Routes - Full CRUD Operations

#### **Projects API** (`/api/projects/[id]`)
- **POST** `/api/projects` - Create new project
- **GET** `/api/projects` - Fetch all projects
- **PUT** `/api/projects/[id]` - Update project
- **DELETE** `/api/projects/[id]` - Delete project

**Fields:**
- `title` (required) - Project title
- `desc` (required) - Project description
- `link` - Project URL
- `tags` - Comma-separated skills
- `color` - Gradient color class

#### **Certificates API** (`/api/certificates/[id]`)
- **POST** `/api/certificates` - Create new certificate
- **GET** `/api/certificates` - Fetch all certificates
- **PUT** `/api/certificates/[id]` - Update certificate
- **DELETE** `/api/certificates/[id]` - Delete certificate

**Fields:**
- `title` (required) - Certificate name
- `issuer` (required) - Issuing organization
- `date` - Date issued
- `desc` - Description
- `verifyUrl` - Verification link
- `imageUrl` - Certificate image path

#### **Experience API** (`/api/experience/[id]`)
- **POST** `/api/experience` - Create new experience
- **GET** `/api/experience` - Fetch all experiences
- **PUT** `/api/experience/[id]` - Update experience
- **DELETE** `/api/experience/[id]` - Delete experience

**Fields:**
- `role` (required) - Job/Education role
- `org` (required) - Organization name
- `year` - Duration/Year
- `desc` - Description

---

## Part 2: Admin Dashboard

### Features Implemented

#### ✅ Complete CRUD Functionality
- **Create** new items via modal form
- **Read** - Display all items in list view
- **Update** - Edit existing items
- **Delete** - Remove items with confirmation

#### ✅ Toast Notifications
The admin dashboard now uses the same smooth Toast notification system as your homepage:
- **Success** - Green toast when items are created/updated/deleted
- **Error** - Red toast for failed operations
- **Warning** - Yellow toast for validation errors
- All toasts appear in top-right corner with smooth animations

#### ✅ Responsive UI/UX
- Sidebar navigation with active state indicators
- Beautiful modal forms with field labels
- Item list cards with hover effects
- Edit/Delete buttons with confirmation dialogs
- Loading states and empty states

#### ✅ Form Validation
- Required fields validation with warning toasts
- Proper error handling and user feedback

### Files Modified
- `/app/admin/page.tsx` - Complete redesign with CRUD operations

---

## Part 3: Homepage Social Contact Popup

### New Component: `SocialContactPopup`

#### Features
- **Floating Action Button** at bottom-right with pulsing animation
- **Expandable Popup Card** with smooth transitions
- **Two Contact Options:**
  1. Zalo - Vietnamese messaging app
  2. Messenger - Facebook Messenger

#### Styling & Animations
- Gradient backgrounds (Cyan to Blue)
- Smooth scale and position animations
- Hover effects with background glow
- Backdrop click to close
- Floating hint text on hover

### Usage
The component is already integrated into your homepage (`/app/page.tsx`):
```tsx
<SocialContactPopup />
```

### Configuration
You need to provide your own links in `/app/components/SocialContactPopup.tsx`:

**Line 25-27 (Zalo):**
```tsx
url: 'https://zalo.me/YOUR_ZALO_NUMBER' // Replace YOUR_ZALO_NUMBER
```

**Line 45-47 (Messenger):**
```tsx
url: 'https://m.me/YOUR_FACEBOOK_ID' // Replace YOUR_FACEBOOK_ID
```

---

## Setup Instructions

### 1. Get Your Contact URLs

#### Zalo URL
1. Go to https://zalo.me
2. Click on your profile
3. Copy your Zalo number
4. Format: `https://zalo.me/YOUR_ZALO_NUMBER`

#### Facebook Messenger URL
1. Get your Facebook ID (visit facebook.com/profile.php and check URL)
2. Format: `https://m.me/YOUR_FACEBOOK_ID`

### 2. Update URLs
Edit `/app/components/SocialContactPopup.tsx`:
```tsx
const contacts: SocialContact[] = [
    {
      id: 'zalo',
      // ... other props
      url: 'https://zalo.me/YOUR_ZALO_NUMBER', // Update this
      // ...
    },
    {
      id: 'messenger',
      // ... other props
      url: 'https://m.me/YOUR_FACEBOOK_ID', // Update this
      // ...
    }
  ];
```

### 3. Test Everything
1. **Admin Dashboard:**
   - Navigate to `/admin`
   - Test Create, Read, Update, Delete operations
   - Verify Toast notifications appear correctly

2. **Homepage Popup:**
   - Scroll to bottom-right
   - Click the floating chat button
   - Click Zalo or Messenger links
   - Links should open in new tab

---

## File Structure

```
app/
├── api/
│   ├── projects/
│   │   ├── route.ts (GET, POST)
│   │   └── [id]/route.ts (PUT, DELETE)
│   ├── certificates/
│   │   ├── route.ts (GET, POST)
│   │   └── [id]/route.ts (PUT, DELETE)
│   └── experience/
│       ├── route.ts (GET, POST)
│       └── [id]/route.ts (PUT, DELETE)
├── admin/
│   └── page.tsx (NEW - Full admin panel with CRUD)
├── components/
│   ├── Toast.tsx (Existing - Used by admin)
│   └── SocialContactPopup.tsx (NEW - Social media popup)
└── page.tsx (Updated - Added SocialContactPopup)
```

---

## Database Compatibility

Your Prisma schema already matches the requirements:
- ✅ Project model with title, desc, tags, link, color
- ✅ Certificate model with title, issuer, date, desc, verifyUrl, imageUrl
- ✅ Experience model with role, org, year, desc

No migration needed!

---

## Troubleshooting

### Toast notifications not showing?
- Ensure `framer-motion` is installed: `npm install framer-motion`
- Check that `Toast.tsx` is in `/app/components/`

### Admin page not loading?
- Verify all API routes are properly created
- Check browser console for errors
- Ensure Prisma client is initialized

### Popup not appearing?
- Clear browser cache and reload
- Check that `SocialContactPopup.tsx` is imported in `page.tsx`
- Verify z-index values don't conflict with other fixed elements

---

## Next Steps (Optional)

### Enhance the Social Popup
Add more platforms by extending the `contacts` array in `SocialContactPopup.tsx`:
```tsx
{
  id: 'whatsapp',
  name: 'WhatsApp',
  icon: <WhatsAppIcon />,
  color: 'from-green-500 to-green-600',
  url: 'https://wa.me/YOUR_NUMBER',
  description: 'Chat on WhatsApp'
}
```

### Customize Toast Colors
Edit `/app/components/Toast.tsx` to add more toast types or adjust colors.

### Add More Admin Sections
Extend the admin dashboard with:
- Blog posts management
- Skills management
- Analytics dashboard

---

## Performance Notes

- All animations use `framer-motion` with optimized transitions
- Toast notifications auto-dismiss after 4 seconds
- API calls use proper error handling
- Components are properly memoized to prevent unnecessary re-renders

---

## Support

If you encounter any issues:
1. Check browser console for error messages
2. Verify all imports are correct
3. Ensure environment variables are set (if needed)
4. Clear Next.js cache: `rm -rf .next` then rebuild

---

**Last Updated:** January 30, 2026
**Status:** ✅ Ready for Production
