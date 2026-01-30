# Social Contact Popup - Visual Guide

## Overview
Your homepage now has a beautiful floating chat button at the bottom-right corner that opens a popup with Zalo and Messenger contact options.

---

## Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│                     HOMEPAGE                                │
│                                                              │
│                   [Content Area]                            │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
└────────────────────────────────────────────────┐            │
                                                 │ 💬 ◉  ← FAB │
                                                 │            │
                                                 └────────────┘
                                               (Bottom-Right Corner)

When Clicked:
┌──────────────────────────────────────────────────────────────┐
│                                                               │
│          ┌──────────────────────────────────┐               │
│          │  Get in Touch               ✕    │               │
│          ├──────────────────────────────────┤               │
│          │ Choose your preferred platform:  │               │
│          │                                  │               │
│          │ ┌──────────────────────────────┐ │               │
│          │ │ 🟦 Zalo        Chat on Zalo > │               │
│          │ └──────────────────────────────┘ │               │
│          │                                  │               │
│          │ ┌──────────────────────────────┐ │               │
│          │ │ 🟦 Messenger  Chat on FB  > │ │               │
│          │ └──────────────────────────────┘ │               │
│          │                                  │               │
│          │ I'll get back ASAP!             │               │
│          └──────────────────────────────────┘               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## Color Scheme

### Floating Action Button (FAB)
```
Background: Cyan → Blue Gradient
Colors: from-cyan-500 to-blue-500
Icon Color: White
Shadow: Cyan glow (50% opacity)
Size: 56px (3.5rem)
Position: Bottom-right, 32px (2rem) from edges
```

### Popup Card
```
Header:
  - Background: Cyan → Blue Gradient
  - Text Color: White
  - Font Weight: Bold

Body:
  - Background: Dark Slate (#1e293b with opacity)
  - Border: Slate-800 (subtle outline)
  - Text Color: Slate-400

Buttons (Zalo & Messenger):
  - Zalo: Blue → Blue Gradient (from-blue-500 to-blue-600)
  - Messenger: Light Blue → Medium Blue (from-blue-400 to-blue-500)
  - Hover: Lighter shade with glow
```

---

## Interaction States

### 1. Default State
- FAB shows with pulsing icon
- FAB has shadow glow
- Ready for click

### 2. Hover State (on FAB)
```
- FAB scales up (1.1x)
- Shadow glow intensifies
- Cursor changes to pointer
```

### 3. Click State
- FAB disappears (smooth scale out)
- Popup appears with scale animation
- Semi-transparent backdrop appears

### 4. Inside Popup - Hover on Contact
```
- Contact card highlights
- Background becomes lighter/glows
- Arrow icon moves right (4px animation)
- Floating hint appears above ("Click to open")
```

### 5. Close Popup
- Click X button OR click backdrop
- Popup scales out smoothly
- FAB reappears
- Animations are smooth 300ms duration

---

## Animation Timings

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| FAB Entrance | Scale + Fade | 200ms | ease-out |
| FAB Hover | Scale | 150ms | ease-out |
| FAB Click | Scale out | 150ms | ease-in |
| Popup Entrance | Scale + Fade | 300ms | spring |
| Contact Items | Stagger In | 100ms each | ease-out |
| Contact Hover | Scale + Glow | 200ms | ease-out |
| Backdrop Fade | Fade | 200ms | ease-out |

---

## Responsive Behavior

### Mobile (< 640px)
- FAB Position: Same (bottom-right)
- FAB Size: Same (56px)
- Popup Width: Full width - 16px padding (90vw)
- Popup Position: Bottom-center (adjusted to not cover)

### Tablet (640px - 1024px)
- FAB Position: Same
- FAB Size: Same
- Popup Width: 320px (default)

### Desktop (> 1024px)
- FAB Position: Same
- FAB Size: Same
- Popup Width: 320px
- Full animations enabled

---

## Accessibility Features

✅ **Keyboard Navigation:**
- Tab to FAB button
- Enter to open/close
- Tab through contacts
- Escape to close

✅ **Screen Readers:**
- Proper ARIA labels
- Role="button" on FAB
- Semantic HTML

✅ **Focus States:**
- Visible focus ring
- High contrast when focused

✅ **Color Contrast:**
- White text on blue background (WCAG AA+)
- Sufficient color contrast ratios

---

## Customization Options

### Change Popup Width
```tsx
// In SocialContactPopup.tsx, find the popup container
className="... w-80 ..." // Change w-80 (320px) to desired width
```

### Change Position
```tsx
// Find floating button position
className="fixed bottom-8 right-8 z-40"
// Change to: bottom-12 right-12 (further from edge)
```

### Change Colors
```tsx
// For each contact, change the 'color' property
color: 'from-green-500 to-green-600' // New gradient
```

### Change Animation Speed
```tsx
// In motion.div components, adjust transition
transition={{ type: 'spring', stiffness: 300, damping: 30 }}
// Higher stiffness = faster; higher damping = less bounce
```

### Disable Auto-Backdrop Close
```tsx
// Find backdrop onClick handler
onClick={() => setIsOpen(false)}
// Remove this to disable backdrop click close
```

---

## Icon Reference

### Current Icons
- **FAB Icon:** MessageCircle (from Lucide React)
- **Zalo:** Custom SVG (or use Zalo logo)
- **Messenger:** Custom SVG (or Facebook Messenger icon)

### To Change Icons
1. Import different icon from `lucide-react`
2. Replace in appropriate places
3. Adjust size with className props

### Example - Change FAB Icon
```tsx
// Old
<MessageCircle size={28} />

// New
<MessageSquare size={28} /> // Different icon
```

---

## Contact Data Structure

```tsx
interface SocialContact {
  id: string;                 // Unique identifier
  name: string;              // Display name
  icon: React.ReactNode;     // Icon component
  color: string;             // Tailwind gradient class
  url: string;               // Contact URL (NEEDS YOUR CONFIG)
  description: string;       // Short description
}
```

---

## Testing Checklist

- [ ] FAB appears at bottom-right on page load
- [ ] FAB has pulsing animation
- [ ] Click FAB → Popup appears with smooth animation
- [ ] Popup shows both Zalo and Messenger options
- [ ] Hover over contact → Highlight + glow effect
- [ ] Click contact → Opens new tab with link
- [ ] Click X button → Popup closes smoothly
- [ ] Click backdrop → Popup closes smoothly
- [ ] Close and reopen → Animation plays again
- [ ] Mobile view → Popup responsive and positioned well
- [ ] Links work (update URLs first!)

---

## Performance Tips

1. **Already Optimized:** Component uses `AnimatePresence` for efficient mounting
2. **Lazy Rendering:** Popup only renders when open
3. **Optimized Animations:** 60fps on most devices
4. **No Heavy JS:** Uses CSS transforms for animations

---

## Troubleshooting

### FAB not showing?
- Check z-index: `z-40` should be above content but below modals (`z-50`)
- Verify component is imported in page.tsx

### Animations jerky?
- Check browser hardware acceleration: Settings → Performance
- Reduce animation complexity if on older devices

### Links not working?
- Verify URLs in contact data (see CONFIGURATION.md)
- Test URLs in separate browser tab first

### Popup appearing behind other elements?
- Increase z-index: `z-50` (find in component)
- Check other elements don't have higher z-index

---

## Browser DevTools Hints

### Inspect Animations
```javascript
// In browser console, toggle animations
// Open DevTools > Settings > Animations panel
// Watch animations play slowly for debugging
```

### Check Elements
```
// In DevTools Elements panel
// Look for: fixed positioning at bottom-right
// z-index: 40 (FAB) and 50 (popup)
```

---

## Future Enhancement Ideas

1. **Add Sound** - Notification sound on open
2. **Typing Indicator** - Show bot typing in popup
3. **Chat History** - Store messages (if integrated with backend)
4. **Quick Reply Buttons** - Preset messages
5. **More Platforms** - WhatsApp, Telegram, Discord
6. **Dark/Light Mode Toggle** - Match theme preference
7. **Accessibility Menu** - Screen reader enhancements

---

**Last Updated:** January 30, 2026
**Component Version:** 1.0
**Status:** ✅ Production Ready
