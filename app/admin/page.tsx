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

  const menuItems = [
    { id: 'projects', label: 'Featured Projects', icon: <Layers size={20} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={20} /> },
    { id: 'certificates', label: 'Certificates', icon: <Award size={20} /> },
  ];

  const handleAddNew = () => {
    // In a real app, you would reset form state here
    setIsModalOpen(true);
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
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Title / Role</label>
                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                <textarea className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none h-24"></textarea>
              </div>
              {activeTab === 'certificates' && (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Verification URL</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none" placeholder="https://..." />
                </div>
              )}
              <div className="pt-4 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium">
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
