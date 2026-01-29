"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Mail, Lock, Chrome } from 'lucide-react';
import { useToast, ToastContainer } from '@/app/components/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { toasts, removeToast, error, success } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
    
    if (result?.ok) {
      success('Login successful! Redirecting...', 2000);
      setTimeout(() => router.push('/admin'), 2000);
    } else {
      error("Login failed. Please check your credentials and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-200 relative overflow-hidden font-sans">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <div className="text-center mb-8">
            <button 
              onClick={() => router.push('/')}
              className="w-20 h-20 mx-auto mb-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden shadow-lg hover:border-cyan-500/50 hover:scale-105 transition-all cursor-pointer"
            >
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </button>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400 text-sm">Sign in to access the Admin Dashboard</p>
          </div>

          <form onSubmit={handleCredentialsLogin} className="space-y-4 mb-8">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 ml-1">Username</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                  placeholder="dx_anpnymous9029"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-offset-slate-950 focus:ring-cyan-500/20" />
                <span className="text-slate-500 group-hover:text-slate-400 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-cyan-500 hover:text-cyan-400 transition-colors">Forgot password?</a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => signIn('google', { callbackUrl: '/admin' })}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-lg hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
            >
              <Chrome size={18} className="text-slate-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button 
              onClick={() => signIn('github', { callbackUrl: '/admin' })}
              className="flex items-center justify-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-lg hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
            >
              <Github size={18} className="text-slate-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">Github</span>
            </button>
          </div>
          
          <button 
            onClick={() => router.push('/')}
            className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
}
