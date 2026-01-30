# 🔮 Future: Database Role Integration

## Current Implementation (localStorage-based)

Hiện tại, viewer mode được lưu trữ trong **browser localStorage**:

```typescript
// Current approach
const mode = localStorage.getItem('userMode') || 'editor';
setIsViewerMode(mode === 'viewer');
```

**Advantages:**
- ✅ Quick to test and develop
- ✅ No database changes needed
- ✅ Easy to toggle in browser console

**Limitations:**
- ⚠️ Not persistent across devices
- ⚠️ User can change in browser console (not secure)
- ⚠️ Requires manual setup per browser

---

## Future: Database-Backed Roles

### Step 1: Update Prisma Schema

**Current `prisma/schema.prisma`:**
```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  // ... other fields
}
```

**After update:**
```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  role  String  @default("editor")  // NEW: 'admin' | 'editor' | 'viewer'
  // ... other fields
}
```

### Step 2: Create Migration

```bash
npx prisma migrate dev --name add_user_role
```

### Step 3: Update Session Check

**Before:**
```typescript
const res = await fetch('/api/auth/session', { credentials: 'include' });
const mode = localStorage.getItem('userMode') || 'editor';
setIsViewerMode(mode === 'viewer');
```

**After:**
```typescript
const res = await fetch('/api/auth/session', { credentials: 'include' });
const session = await res.json();
setIsViewerMode(session.user.role === 'viewer');
```

### Step 4: Update Admin Edit Form

Allow admin to change user roles:

```tsx
<select value={selectedUser.role} onChange={(e) => updateUserRole(e.target.value)}>
  <option value="editor">Editor (Full Access)</option>
  <option value="viewer">Viewer (Read-Only)</option>
  <option value="admin">Admin (All Permissions)</option>
</select>
```

### Step 5: Create API Endpoint

`app/api/admin/users/[id]/role/route.ts`:
```typescript
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { role } = await req.json();
  
  // Validate role
  if (!['admin', 'editor', 'viewer'].includes(role)) {
    return Response.json({ error: 'Invalid role' }, { status: 400 });
  }
  
  // Update in database
  const user = await prisma.user.update({
    where: { id: parseInt(params.id) },
    data: { role }
  });
  
  return Response.json(user);
}
```

---

## Role Permission Matrix

### After Database Integration

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│              PERMISSION MATRIX                       │
│                                                      │
├─────────────────┬─────────┬────────┬─────────────────┤
│ Action          │ Admin   │ Editor │ Viewer          │
├─────────────────┼─────────┼────────┼─────────────────┤
│ View content    │ ✅      │ ✅     │ ✅              │
│ Add content     │ ✅      │ ✅     │ ❌ (Toast warn) │
│ Edit content    │ ✅      │ ✅     │ ❌ (Toast warn) │
│ Delete content  │ ✅      │ ✅     │ ❌ (Toast warn) │
│ Manage users    │ ✅      │ ❌     │ ❌              │
│ Change roles    │ ✅      │ ❌     │ ❌              │
│ View analytics  │ ✅      │ ❌     │ ❌              │
└─────────────────┴─────────┴────────┴─────────────────┘
```

---

## Implementation Timeline

### Phase 1: Current (✅ DONE)
- localStorage-based viewer mode
- Beautiful toast warnings
- Button disabling with UI feedback
- Perfect for testing and demo

### Phase 2: Database Integration (Recommended next)
- Add `role` field to User table
- Migrate existing users to 'editor' role
- Update session to include role
- Remove localStorage-based approach

### Phase 3: Advanced Permissions (Future)
- Multiple roles (admin, moderator, editor, viewer, guest)
- Granular permissions per role
- Activity logging for audit trail
- Role-based API protection

### Phase 4: Team Management (Optional)
- Assign roles to team members
- Department-based permissions
- Role templates
- Permission inheritance

---

## Migration Steps (When Ready)

```bash
# 1. Create migration
npm run prisma migrate dev --name add_user_role

# 2. Update all existing users to 'editor' role
npx prisma db execute << 'EOF'
UPDATE User SET role = 'editor' WHERE role IS NULL;
EOF

# 3. Deploy to production
npm run build
npm run start

# 4. Remove localStorage code from admin page
# (Keep Toast messages - they still work!)
```

---

## Code to Keep After Migration

The Toast warnings will remain the same:

```typescript
// This stays exactly as is:
if (isViewerMode) {
  toast.warning('🔒 Viewer mode: You cannot edit content. Contact admin for full access.', 4500);
  return;
}
```

Only change **how** `isViewerMode` is determined:

```typescript
// BEFORE (localStorage):
const mode = localStorage.getItem('userMode') || 'editor';
setIsViewerMode(mode === 'viewer');

// AFTER (database):
const session = await res.json();
setIsViewerMode(session.user.role === 'viewer');
```

---

## Benefits of Database Integration

| Aspect | localStorage | Database |
|--------|---|---|
| **Persistence** | Per browser | Across devices ✅ |
| **Security** | Low (changeable) | High (server-validated) ✅ |
| **Admin control** | None | Full control ✅ |
| **Audit trail** | No | Yes (can log) ✅ |
| **Multiple roles** | Not suitable | Perfect ✅ |
| **Team features** | No | Yes ✅ |

---

## No Code Changes Needed Today

The current implementation is:
- ✅ **Fully functional** for testing
- ✅ **Production quality** for single admin
- ✅ **Easy to upgrade** when ready

Migration to database is a clean upgrade path with minimal code changes!

---

## When to Migrate

**Start using database roles when:**
- You have multiple admin users
- Need persistent role assignment
- Want audit logging
- Plan to expand team
- Need granular permissions

**Current implementation is perfect when:**
- Single admin user
- Quick testing and demos
- Client approval phase
- Pre-launch stage

---

**Recommendation**: Keep current implementation until you need multiple users with persistent roles. Then migrate to database-backed approach in about 30 minutes of development time.

The foundation is already strong! 🚀
