// e:\MyPortfolio-1\app\admin\page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
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
  ChevronRight,
  Lock,
  Upload,
  Image as ImageIcon
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
  const { data: session, status } = useSession();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [isViewerMode, setIsViewerMode] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication status
  useEffect(() => {
    // Nếu loading, chờ
    if (status === 'loading') {
      return;
    }
    
    // Nếu chưa authenticate, redirect về login
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin');
      return;
    }
    
    // Nếu authenticate, check role từ session
    if (status === 'authenticated' && session?.user) {
      // Lấy role từ session, mặc định là 'viewer'
      const userRole = (session.user as any)?.role || 'viewer';
      setIsViewerMode(userRole !== 'editor');
      setAuthChecked(true);
    }
  }, [status, session, router]);

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
    if (isViewerMode) {
      const userRole = (session?.user as any)?.role || 'viewer';
      toast.warning(`🔒 You're in ${userRole} mode. Only editors can add content.`, 4500);
      return;
    }
    setEditingId(null);
    setFormData({
      title: '', desc: '', link: '', tags: '', role: '', org: '', year: '', 
      issuer: '', date: '', verifyUrl: '', imageUrl: '', color: 'from-blue-500 to-cyan-500'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    if (isViewerMode) {
      const userRole = (session?.user as any)?.role || 'viewer';
      toast.warning(`🔒 You're in ${userRole} mode. Only editors can edit content.`, 4500);
      return;
    }
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
    if (isViewerMode) {
      const userRole = (session?.user as any)?.role || 'viewer';
      toast.warning(`🔒 You're in ${userRole} mode. Only editors can delete content.`, 4500);
      return;
    }
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

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Checking access...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (useEffect will redirect)
  if (!authChecked) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800/50 bg-slate-900/60 backdrop-blur-2xl fixed h-full z-20 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-slate-800/50 bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-bold tracking-tighter text-slate-100 flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <LayoutDashboard className="text-cyan-500" />
            </motion.div>
            <span>ADMIN<span className="text-cyan-500">.PANEL</span></span>
          </motion.div>
          <p className="text-xs text-slate-400 mt-2">Manage portfolio content</p>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${activeTab === item.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
            >
              <motion.div
                animate={activeTab === item.id ? { scale: 1.2 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.icon}
              </motion.div>
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 border-r-2 border-cyan-400 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/50 bg-gradient-to-t from-slate-900/50 to-transparent">
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              await signOut({ redirect: false });
              toast.success('Signed out successfully!', 2000);
              setTimeout(() => router.push('/login'), 1000);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group"
          >
            <motion.div
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <LogOut size={20} />
            </motion.div>
            <span className="font-medium">Sign Out</span>
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-10 pb-8 border-b border-slate-800/30 bg-gradient-to-b from-slate-900/50 to-transparent -mx-8 px-8 pt-2"
        >
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent capitalize">
                {activeTab === 'experience' ? 'Experience' : activeTab.slice(0, -1)}
              </h1>
              {isViewerMode && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="flex items-center gap-1 px-3 py-1 bg-amber-500/15 border border-amber-500/40 rounded-full shadow-lg shadow-amber-500/10"
                >
                  <Lock size={14} className="text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400 capitalize">
                    {(session?.user as any)?.role || 'viewer'} Mode
                  </span>
                </motion.div>
              )}
            </motion.div>
            <p className="text-slate-400 mt-2">Manage your portfolio content with ease</p>
          </div>
          <motion.button 
            onClick={handleAddNew}
            disabled={isViewerMode}
            whileHover={!isViewerMode ? { scale: 1.05 } : {}}
            whileTap={!isViewerMode ? { scale: 0.95 } : {}}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
              isViewerMode 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/30'
            }`}
          >
            <Plus size={20} /> Add New
          </motion.button>
        </motion.header>

        {/* Content Display */}
        <motion.div 
          layout
          className="grid grid-cols-1 gap-6"
        >
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin mx-auto mb-4 shadow-lg shadow-cyan-500/20"></div>
              <p className="text-slate-400 text-lg">Loading items...</p>
            </motion.div>
          ) : items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full"
            >
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 border-2 border-dashed border-slate-700/50 hover:border-cyan-500/30 rounded-2xl p-16 flex flex-col items-center justify-center transition-all duration-300">
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="p-4 bg-slate-900/80 rounded-full mb-4 opacity-70"
                >
                  {menuItems.find(i => i.id === activeTab)?.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No items yet</h3>
                <p className="text-sm text-slate-400 max-w-xs text-center">
                  Create your first {activeTab.slice(0, -1)} by clicking the "Add New" button above.
                </p>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {items.map((item: any, idx: number) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
                  className="group relative"
                >
                  {/* Card Background Glow */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="relative bg-slate-900/70 border border-slate-700/50 hover:border-cyan-500/60 rounded-2xl p-6 transition-all duration-300 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20"
                  >
                    {/* Top Row with Title and Actions */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3">
                          {/* Icon Badge */}
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            className="flex-shrink-0 mt-1"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/50 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20">
                              {activeTab === 'projects' ? '📁' : activeTab === 'certificates' ? '🏆' : '💼'}
                            </div>
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                              {item.title || item.role || 'Untitled'}
                            </h3>
                            <p className="text-sm text-slate-400 mt-1 line-clamp-2 group-hover:text-slate-300 transition-colors">
                              {item.desc || `${item.org || ''} ${item.year || item.date || ''}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-shrink-0">
                        <motion.button
                          onClick={() => handleEdit(item)}
                          disabled={isViewerMode}
                          whileHover={!isViewerMode ? { scale: 1.15, rotate: 5 } : {}}
                          whileTap={!isViewerMode ? { scale: 0.9 } : {}}
                          className={`p-2.5 rounded-lg transition-all font-medium ${
                            isViewerMode
                              ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                              : 'bg-blue-500/15 text-blue-400 hover:bg-blue-500/30 border border-blue-500/40 shadow-lg shadow-blue-500/10'
                          }`}
                          title={isViewerMode ? 'Viewer mode - Edit disabled' : 'Edit'}
                        >
                          <Edit2 size={18} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(item.id)}
                          disabled={isViewerMode}
                          whileHover={!isViewerMode ? { scale: 1.15, rotate: -5 } : {}}
                          whileTap={!isViewerMode ? { scale: 0.9 } : {}}
                          className={`p-2.5 rounded-lg transition-all font-medium ${
                            isViewerMode
                              ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                              : 'bg-red-500/15 text-red-400 hover:bg-red-500/30 border border-red-500/40 shadow-lg shadow-red-500/10'
                          }`}
                          title={isViewerMode ? 'Viewer mode - Delete disabled' : 'Delete'}
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 + 0.2 }}
                      className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-slate-700/30"
                    >
                      {activeTab === 'projects' && item.link && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg hover:bg-cyan-500/30 transition-all truncate shadow-lg shadow-cyan-500/10"
                        >
                          🔗 {item.link.split('//')[1]?.split('/')[0] || 'Link'}
                        </motion.a>
                      )}
                      {activeTab === 'certificates' && (
                        <>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-xs px-3 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg shadow-lg shadow-amber-500/10"
                          >
                            🏅 {item.issuer}
                          </motion.div>
                          {item.verifyUrl && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              href={item.verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-2 bg-green-500/20 text-green-300 border border-green-500/40 rounded-lg hover:bg-green-500/30 transition-all shadow-lg shadow-green-500/10"
                            >
                              ✓ Verify
                            </motion.a>
                          )}
                          {item.date && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="text-xs px-3 py-2 bg-slate-700/40 text-slate-300 rounded-lg shadow-lg"
                            >
                              📅 {item.date}
                            </motion.div>
                          )}
                        </>
                      )}
                      {activeTab === 'experience' && (
                        <>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-xs px-3 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-lg font-medium shadow-lg shadow-purple-500/10"
                          >
                            {item.org}
                          </motion.div>
                          {item.year && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="text-xs px-3 py-2 bg-slate-700/40 text-slate-300 rounded-lg shadow-lg"
                            >
                              📆 {item.year}
                            </motion.div>
                          )}
                        </>
                      )}
                    </motion.div>

                    {/* Tags Section (Projects) */}
                    {activeTab === 'projects' && item.tags && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 + 0.3 }}
                        className="flex flex-wrap gap-2"
                      >
                        {(typeof item.tags === 'string' ? item.tags.split(',') : item.tags).map((tag: string, i: number) => (
                          <motion.span
                            key={i}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-3 py-1.5 text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/70 border border-cyan-900/60 rounded-md hover:bg-cyan-950 transition-all shadow-lg shadow-cyan-500/10"
                          >
                            #{tag.trim()}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}

                    {/* Certificate Image Preview */}
                    {activeTab === 'certificates' && item.imageUrl && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 + 0.3 }}
                        className="mt-4 pt-4 border-t border-slate-700/30"
                      >
                        <div className="text-xs text-slate-400 mb-2 font-medium">📸 Certificate Image:</div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="inline-block px-3 py-2 text-xs bg-slate-800/70 text-slate-300 rounded border border-slate-600/50 max-w-full truncate shadow-lg"
                        >
                          {item.imageUrl}
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-slate-900 border border-slate-700/50 rounded-3xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl"
            >
              <motion.div
                className="flex justify-between items-center p-8 border-b border-slate-800/50 sticky top-0 bg-gradient-to-r from-slate-900/95 to-slate-800/50 backdrop-blur-xl"
                layoutId="modalHeader"
              >
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {editingId ? 'Edit' : 'Add New'} {activeTab === 'experience' ? 'Experience' : activeTab.slice(0, -1)}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Fill in the details below</p>
                </div>
                <motion.button
                  onClick={() => setIsModalOpen(false)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                >
                  <X size={24} />
                </motion.button>
              </motion.div>

              <div className="p-8 space-y-5">
                {/* Projects Form */}
                {activeTab === 'projects' && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Project Title *</label>
                      <input
                        placeholder="Enter project title"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Description *</label>
                      <textarea
                        placeholder="Enter project description"
                        value={formData.desc}
                        onChange={e => setFormData({...formData, desc: e.target.value})}
                        className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner h-24 resize-none"
                      ></textarea>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Project Link</label>
                        <input
                          placeholder="https://..."
                          value={formData.link}
                          onChange={e => setFormData({...formData, link: e.target.value})}
                          className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Color Gradient</label>
                        <select
                          value={formData.color}
                          onChange={e => setFormData({...formData, color: e.target.value})}
                          className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white focus:outline-none transition-all shadow-inner"
                        >
                          <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                          <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                          <option value="from-emerald-500 to-teal-500">Emerald to Teal</option>
                          <option value="from-orange-500 to-red-500">Orange to Red</option>
                        </select>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Tags (comma separated)</label>
                      <input
                        placeholder="e.g., Python, OpenCV, CNN"
                        value={formData.tags}
                        onChange={e => setFormData({...formData, tags: e.target.value})}
                        className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                      />
                    </motion.div>
                  </>
                )}

                {/* Experience Form */}
                {activeTab === 'experience' && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Role/Position *</label>
                        <input
                          placeholder="e.g., AI Engineer"
                          value={formData.role}
                          onChange={e => setFormData({...formData, role: e.target.value})}
                          className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Organization *</label>
                        <input
                          placeholder="e.g., TechStart Lab"
                          value={formData.org}
                          onChange={e => setFormData({...formData, org: e.target.value})}
                          className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Year/Duration</label>
                      <input
                        placeholder="e.g., 2023 - Present"
                        value={formData.year}
                        onChange={e => setFormData({...formData, year: e.target.value})}
                        className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Description</label>
                      <textarea
                        placeholder="Tell us about this role..."
                        value={formData.desc}
                        onChange={e => setFormData({...formData, desc: e.target.value})}
                        className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner h-24 resize-none"
                      ></textarea>
                    </motion.div>
                  </>
                )}

                {/* Certificates Form */}
                {activeTab === 'certificates' && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Certificate Title *</label>
                      <input
                        placeholder="Enter certificate title"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Issuer *</label>
                        <input
                          placeholder="e.g., Tech Institute"
                          value={formData.issuer}
                          onChange={e => setFormData({...formData, issuer: e.target.value})}
                          className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Date</label>
                        <input
                          placeholder="e.g., 2023"
                          value={formData.date}
                          onChange={e => setFormData({...formData, date: e.target.value})}
                          className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Description</label>
                      <textarea
                        placeholder="Describe this certification..."
                        value={formData.desc}
                        onChange={e => setFormData({...formData, desc: e.target.value})}
                        className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner h-24 resize-none"
                      ></textarea>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Verification URL</label>
                        <input
                          placeholder="https://..."
                          value={formData.verifyUrl}
                          onChange={e => setFormData({...formData, verifyUrl: e.target.value})}
                          className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-3">Certificate Image</label>
                        <div className="flex gap-2 items-end">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="e.g., /my_certificates/cert1.png"
                              value={formData.imageUrl}
                              onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                              className="w-full bg-slate-950/60 border border-slate-700/50 hover:border-slate-600 focus:border-cyan-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                            />
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">📁 Images stored in: public/my_certificates/</p>
                        {formData.imageUrl && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-3 p-3 bg-slate-950/60 rounded-lg border border-slate-700/50"
                          >
                            <img src={formData.imageUrl} alt="Certificate preview" className="w-full h-32 object-cover rounded" onError={() => {}} />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 flex justify-end gap-3 border-t border-slate-800/50"
                >
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg font-semibold transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleSave}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-cyan-500/30"
                  >
                    {editingId ? 'Update' : 'Create'}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
