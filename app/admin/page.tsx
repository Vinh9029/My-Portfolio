// e:\MyPortfolio\my-portoflio\app\admin\page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Award,
  Briefcase,
  Layers,
  LogOut,
  Plus,
  LayoutDashboard,
  X
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    link: '',
    tags: '',
    role: '',
    org: '',
    year: '',
    issuer: '',
    date: '',
    verifyUrl: '',
    imageUrl: ''
  });

  const menuItems = [
    { id: 'projects', label: 'Featured Projects', icon: <Layers size={20} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={20} /> },
    { id: 'certificates', label: 'Certificates', icon: <Award size={20} /> },
  ];

  const handleAddNew = () => {
    setFormData({
      title: '', desc: '', link: '', tags: '', role: '', org: '', year: '', issuer: '', date: '', verifyUrl: '', imageUrl: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    let body: any = {};
    
    if (activeTab === 'projects') {
      body = {
        title: formData.title,
        desc: formData.desc,
        link: formData.link,
        tags: formData.tags.split(',').map(t => t.trim())
      };
    } else if (activeTab === 'experience') {
      body = {
        role: formData.role,
        org: formData.org,
        year: formData.year,
        desc: formData.desc
      };
    } else if (activeTab === 'certificates') {
      body = {
        title: formData.title,
        issuer: formData.issuer,
        date: formData.date,
        desc: formData.desc,
        verifyUrl: formData.verifyUrl,
        imageUrl: formData.imageUrl
      };
    }

    try {
      const res = await fetch(`/api/${activeTab}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setIsModalOpen(false);
        alert('Item added successfully!');
        // Ideally, trigger a refresh of the list here
      } else {
        alert('Failed to save item.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl fixed h-full z-20 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="text-xl font-bold tracking-tighter text-slate-100 flex items-center gap-2">
            <LayoutDashboard className="text-cyan-500" />
            <span>ADMIN<span className="text-cyan-500">.PANEL</span></span>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h1>
            <p className="text-slate-400 mt-1">Manage your portfolio content</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-cyan-500/20"
          >
            <Plus size={18} /> Add New
          </button>
        </header>

        {/* Content Area Placeholder */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 min-h-[500px] flex flex-col items-center justify-center text-slate-500 border-dashed">
          <div className="p-4 bg-slate-900 rounded-full mb-4">
            {menuItems.find(i => i.id === activeTab)?.icon}
          </div>
          <h3 className="text-lg font-medium text-slate-300 mb-2">No {activeTab} found</h3>
          <p className="text-sm max-w-xs text-center opacity-60">
            You haven't added any {activeTab} yet. Click the "Add New" button to get started.
          </p>
        </div>
      </main>

      {/* Generic Add Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white">Add New {activeTab.slice(0, -1)}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              
              {/* Dynamic Form Fields based on Active Tab */}
              {activeTab === 'projects' && (
                <>
                  <input placeholder="Project Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                  <input placeholder="Tags (comma separated)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                  <input placeholder="Project Link (URL)" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                  <textarea placeholder="Description" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none h-24"></textarea>
                </>
              )}

              {activeTab === 'experience' && (
                <>
                  <input placeholder="Role / Position" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                  <input placeholder="Organization / Company" value={formData.org} onChange={e => setFormData({...formData, org: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                  <input placeholder="Year / Duration" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                  <textarea placeholder="Description" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none h-24"></textarea>
                </>
              )}

              {activeTab === 'certificates' && (
                <>
                  <input placeholder="Certificate Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                  <input placeholder="Issuer" value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                  <input placeholder="Date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                  <input placeholder="Verification URL" value={formData.verifyUrl} onChange={e => setFormData({...formData, verifyUrl: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                  <input placeholder="Image URL (e.g., /cert1.png)" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
                  <textarea placeholder="Description" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none h-24"></textarea>
                </>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium"
                >
                  Save Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
