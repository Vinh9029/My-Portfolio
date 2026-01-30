// e:\MyPortfolio-1\app\admin\page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Briefcase,
  Layers,
  LogOut,
  Plus,
  LayoutDashboard,
  X,
  Edit2,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { useToast, ToastContainer } from '@/app/components/Toast';

interface Project {
  id: string;
  title: string;
  desc: string;
  tags: string;
  link: string;
  color: string;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  desc: string;
  verifyUrl: string;
  imageUrl: string;
}

interface Experience {
  id: string;
  role: string;
  org: string;
  year: string;
  desc: string;
}

type TabType = 'projects' | 'experience' | 'certificates';

export default function Dashboard() {
  const router = useRouter();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);

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
    imageUrl: '',
    color: 'from-blue-500 to-cyan-500'
  });

  const menuItems = [
    { id: 'projects' as TabType, label: 'Featured Projects', icon: <Layers size={20} /> },
    { id: 'experience' as TabType, label: 'Experience', icon: <Briefcase size={20} /> },
    { id: 'certificates' as TabType, label: 'Certificates', icon: <Award size={20} /> },
  ];

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes, eRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/certificates'),
        fetch('/api/experience')
      ]);

      if (pRes.ok) setProjects(await pRes.json());
      if (cRes.ok) setCertificates(await cRes.json());
      if (eRes.ok) setExperience(await eRes.json());
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: '', desc: '', link: '', tags: '', role: '', org: '', year: '', 
      issuer: '', date: '', verifyUrl: '', imageUrl: '', color: 'from-blue-500 to-cyan-500'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    if (activeTab === 'projects') {
      setFormData({
        title: item.title,
        desc: item.desc,
        link: item.link,
        tags: typeof item.tags === 'string' ? item.tags : JSON.stringify(item.tags),
        color: item.color,
        role: '', org: '', year: '', issuer: '', date: '', verifyUrl: '', imageUrl: ''
      });
    } else if (activeTab === 'experience') {
      setFormData({
        role: item.role,
        org: item.org,
        year: item.year,
        desc: item.desc,
        title: '', link: '', tags: '', issuer: '', date: '', verifyUrl: '', imageUrl: '', color: ''
      });
    } else if (activeTab === 'certificates') {
      setFormData({
        title: item.title,
        issuer: item.issuer,
        date: item.date,
        desc: item.desc,
        verifyUrl: item.verifyUrl,
        imageUrl: item.imageUrl,
        role: '', org: '', year: '', link: '', tags: '', color: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    let body: any = {};
    let isValid = true;

    if (activeTab === 'projects') {
      if (!formData.title || !formData.desc) {
        toast.warning('Please fill in all required fields');
        return;
      }
      body = {
        title: formData.title,
        desc: formData.desc,
        link: formData.link,
        tags: formData.tags,
        color: formData.color
      };
    } else if (activeTab === 'experience') {
      if (!formData.role || !formData.org) {
        toast.warning('Please fill in all required fields');
        return;
      }
      body = {
        role: formData.role,
        org: formData.org,
        year: formData.year,
        desc: formData.desc
      };
    } else if (activeTab === 'certificates') {
      if (!formData.title || !formData.issuer) {
        toast.warning('Please fill in all required fields');
        return;
      }
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
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/${activeTab}/${editingId}` : `/api/${activeTab}`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        await fetchData();
        setIsModalOpen(false);
        toast.success(editingId ? `${activeTab.slice(0, -1)} updated successfully!` : `${activeTab.slice(0, -1)} created successfully!`);
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to save item');
      }
    } catch (error) {
      toast.error('An error occurred while saving');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {

    try {
      const res = await fetch(`/api/${activeTab}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchData();
        toast.success(`${activeTab.slice(0, -1)} deleted successfully!`);
      } else {
        toast.error('Failed to delete item');
      }
    } catch (error) {
      toast.error('An error occurred while deleting');
      console.error(error);
    }
  };

  const getItemsList = () => {
    if (activeTab === 'projects') return projects;
    if (activeTab === 'certificates') return certificates;
    return experience;
  };

  const items = getItemsList();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex">
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

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
            <h1 className="text-3xl font-bold text-white capitalize">
              {activeTab === 'experience' ? 'Experience' : activeTab.slice(0, -1)}
            </h1>
            <p className="text-slate-400 mt-1">Manage your portfolio content</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-cyan-500/20"
          >
            <Plus size={18} /> Add New
          </button>
        </header>

        {/* Content Display */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading...</div>
          ) : items.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-slate-500 border-dashed">
              <div className="p-4 bg-slate-900 rounded-full mb-4">
                {menuItems.find(i => i.id === activeTab)?.icon}
              </div>
              <h3 className="text-lg font-medium text-slate-300 mb-2">No items found</h3>
              <p className="text-sm max-w-xs text-center opacity-60">
                You haven't added any items yet. Click the "Add New" button to get started.
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {items.map((item: any, idx: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-2 truncate">
                        {item.title || item.role || 'Untitled'}
                      </h3>
                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                        {item.desc || `${item.org} • ${item.year || item.date}`}
                      </p>
                      {activeTab === 'projects' && item.tags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(typeof item.tags === 'string' ? item.tags.split(',') : item.tags).map((tag: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/20">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      {activeTab === 'certificates' && item.issuer && (
                        <p className="text-xs text-slate-500">
                          Issued by <span className="text-slate-300 font-medium">{item.issuer}</span> • {item.date}
                        </p>
                      )}
                      {activeTab === 'experience' && (
                        <p className="text-xs text-slate-500">
                          <span className="text-slate-300 font-medium">{item.org}</span> • {item.year}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-800 sticky top-0 bg-slate-900">
                <h3 className="text-xl font-bold text-white">
                  {editingId ? 'Edit' : 'Add New'} {activeTab === 'experience' ? 'Experience' : activeTab.slice(0, -1)}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Projects Form */}
                {activeTab === 'projects' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Project Title *</label>
                      <input
                        placeholder="Enter project title"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Description *</label>
                      <textarea
                        placeholder="Enter project description"
                        value={formData.desc}
                        onChange={e => setFormData({...formData, desc: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors h-24 resize-none"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Project Link</label>
                        <input
                          placeholder="https://..."
                          value={formData.link}
                          onChange={e => setFormData({...formData, link: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Color Gradient</label>
                        <select
                          value={formData.color}
                          onChange={e => setFormData({...formData, color: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                        >
                          <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                          <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                          <option value="from-emerald-500 to-teal-500">Emerald to Teal</option>
                          <option value="from-orange-500 to-red-500">Orange to Red</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Tags (comma separated)</label>
                      <input
                        placeholder="e.g., Python, OpenCV, CNN"
                        value={formData.tags}
                        onChange={e => setFormData({...formData, tags: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </>
                )}

                {/* Experience Form */}
                {activeTab === 'experience' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Role/Position *</label>
                        <input
                          placeholder="e.g., AI Engineer"
                          value={formData.role}
                          onChange={e => setFormData({...formData, role: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Organization *</label>
                        <input
                          placeholder="e.g., TechStart Lab"
                          value={formData.org}
                          onChange={e => setFormData({...formData, org: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Year/Duration</label>
                      <input
                        placeholder="e.g., 2023 - Present"
                        value={formData.year}
                        onChange={e => setFormData({...formData, year: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                      <textarea
                        placeholder="Tell us about this role..."
                        value={formData.desc}
                        onChange={e => setFormData({...formData, desc: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors h-24 resize-none"
                      ></textarea>
                    </div>
                  </>
                )}

                {/* Certificates Form */}
                {activeTab === 'certificates' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Certificate Title *</label>
                      <input
                        placeholder="Enter certificate title"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Issuer *</label>
                        <input
                          placeholder="e.g., Tech Institute"
                          value={formData.issuer}
                          onChange={e => setFormData({...formData, issuer: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                        <input
                          placeholder="e.g., 2023"
                          value={formData.date}
                          onChange={e => setFormData({...formData, date: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                      <textarea
                        placeholder="Describe this certification..."
                        value={formData.desc}
                        onChange={e => setFormData({...formData, desc: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors h-24 resize-none"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Verification URL</label>
                        <input
                          placeholder="https://..."
                          value={formData.verifyUrl}
                          onChange={e => setFormData({...formData, verifyUrl: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
                        <input
                          placeholder="e.g., /cert1.png"
                          value={formData.imageUrl}
                          onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-slate-400 hover:text-white transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    {editingId ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
