# Dashboard Backend Setup - Complete Guide

## ✅ What's Been Completed

### 1. Database Seeding
- ✅ Updated `prisma/seed.ts` with proper field names and bcrypt password hashing
- ✅ Seeded database with sample data:
  - **User**: `dx_anpnymous9029` (password: `keepgoing`)
  - **4 Projects** with tags and colors
  - **2 Certificates** with issuer and verify URLs
  - **2 Experience** entries with timeline

### 2. API Routes Created
All endpoints return JSON data ready for your frontend:

#### `/api/projects` - GET
Returns all projects ordered by newest first
```json
[
  {
    "id": "...",
    "title": "Face Recognition System",
    "desc": "Real-time face detection...",
    "tags": "[\"Python\", \"OpenCV\", \"CNN\", \"FaceNet\"]",
    "link": "#",
    "color": "from-blue-500 to-cyan-500",
    "createdAt": "2026-01-30T..."
  }
]
```

#### `/api/experience` - GET
Returns all experience entries ordered by newest first
```json
[
  {
    "id": "...",
    "role": "BSc Computer Science (AI)",
    "org": "Ton Duc Thang University",
    "year": "2023 - Present",
    "desc": "Specializing in Artificial Intelligence...",
    "createdAt": "2026-01-30T..."
  }
]
```

#### `/api/certificates` - GET
Returns all certificates ordered by newest first
```json
[
  {
    "id": "...",
    "title": "Professional AI Certification",
    "issuer": "Tech Institute",
    "date": "2023",
    "desc": "Advanced certification...",
    "verifyUrl": "#",
    "imageUrl": "/cert-placeholder.png",
    "createdAt": "2026-01-30T..."
  }
]
```

---

## 📊 Viewing Database Data

### Option 1: Prisma Studio (Recommended - GUI)
The easiest way to view and edit data visually:

```bash
npm run studio
```

This opens a web interface at **http://localhost:5555** where you can:
- View all tables
- Add/Edit/Delete records
- See relationships between data
- Filter and search records

**Note:** Keep the dev server running, then run this in a new terminal.

### Option 2: Command Line Queries
You can also query data directly from your Next.js app or create a debug endpoint.

Example in a client component:
```typescript
const [projects, setProjects] = useState([]);

useEffect(() => {
  fetch('/api/projects')
    .then(res => res.json())
    .then(data => setProjects(data));
}, []);
```

### Option 3: Database File
The SQLite database is stored at: `prisma/dev.db`

You can use tools like:
- **SQLite Browser** (GUI application)
- **DB4S** (Database Manager)
- Or VS Code SQLite extension

---

## 🎨 Using Data in Your Dashboard

### Example: Display Projects on Admin Dashboard

**File:** `app/admin/page.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, expRes, certRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/experience'),
          fetch('/api/certificates'),
        ]);

        if (projRes.ok) setProjects(await projRes.json());
        if (expRes.ok) setExperiences(await expRes.json());
        if (certRes.ok) setCertificates(await certRes.json());
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Featured Projects */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Featured Projects ({projects.length})</h2>
        <div className="grid grid-cols-2 gap-4">
          {projects.map(project => (
            <div key={project.id} className="p-4 border rounded">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.desc}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {JSON.parse(project.tags).map((tag: string) => (
                  <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Experience ({experiences.length})</h2>
        <div className="space-y-4">
          {experiences.map(exp => (
            <div key={exp.id} className="p-4 border-l-4 border-blue-500">
              <div className="font-semibold">{exp.role}</div>
              <div className="text-sm text-gray-600">{exp.org} • {exp.year}</div>
              <p className="text-sm mt-2">{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Certificates ({certificates.length})</h2>
        <div className="grid grid-cols-2 gap-4">
          {certificates.map(cert => (
            <div key={cert.id} className="p-4 border rounded">
              <h3 className="font-semibold">{cert.title}</h3>
              <p className="text-sm text-gray-600">{cert.issuer}</p>
              <p className="text-sm text-gray-500">{cert.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

## 📝 Answer to Your Questions

### Q1: Does the seed.ts file match the database tables?
**Yes!** ✅
- Seed file now properly hashes passwords with bcrypt
- Field names match exactly with Prisma schema:
  - Projects: `title`, `desc`, `tags`, `link`, `color`
  - Certificates: `title`, `issuer`, `date`, `desc`, `verifyUrl`, `imageUrl`
  - Experience: `role`, `org`, `year`, `desc`

### Q2: Is Prisma Studio necessary?
**No, but it's very helpful!** 
- Not required for your app to work
- Useful for: viewing data, testing API endpoints, debugging
- Alternative: Use the API routes in your frontend
- You can also use SQLite Browser for a simpler GUI

### Q3: How do I run Prisma Studio?
```bash
npm run studio
```
Opens at http://localhost:5555 (keep dev server running)

---

## 🚀 Next Steps for Dashboard

1. Create `app/admin/page.tsx` and fetch from the API routes
2. Display Projects, Experience, and Certificates
3. Add Create/Edit/Delete functionality using API routes
4. Use Prisma Studio to manage data while developing

Your backend is now complete and ready to use! 🎉
