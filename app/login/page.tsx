"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Mail, Lock, Chrome, UserPlus, RefreshCw } from 'lucide-react';
import { useToast, ToastContainer } from '@/app/components/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { toasts, removeToast, error, success } = useToast();
  const [mode, setMode] = useState<'login' | 'register' | 'reset' | 'verify'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      error('Please provide username and password');
      return;
    }
    if (password !== confirmPassword) {
      error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });
      const data = await res.json();
      if (res.ok) {
        success('Account created. You can now sign in.');
        setMode('login');
        setPassword('');
        setConfirmPassword('');
        setUsername('');
        setEmail('');
      } else {
        error(data?.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      error('Please provide your email address');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: resetEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        success('✅ Email sent! Check your inbox for the verification code.');
        setMode('verify');
      } else {
        error(data?.error || 'Failed to send reset email');
      }
    } catch (err) {
      console.error(err);
      error('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || !newPassword) {
      error('Please enter verification code and new password');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      error('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: verificationCode,
          email: resetEmail,
          newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        success('Password reset successfully! Logging you in...');
        setTimeout(() => {
          setMode('login');
          setResetEmail('');
          setVerificationCode('');
          setNewPassword('');
          setConfirmNewPassword('');
          setPassword('');
        }, 2000);
      } else {
        error(data?.error || 'Failed to reset password');
      }
    } catch (err) {
      console.error(err);
      error('Failed to reset password');
    } finally {
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
            <h1 className="text-2xl font-bold text-white mb-2">{mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Reset Password'}</h1>
            <p className="text-slate-400 text-sm">{mode === 'login' ? 'Sign in to access the Admin Dashboard' : mode === 'register' ? 'Create a new viewer account' : 'Enter your email or username to reset your password'}</p>

            {/* Mode Tabs */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <button onClick={() => setMode('login')} className={`px-3 py-1 text-sm rounded-full ${mode === 'login' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'}`}>Sign In</button>
              <button onClick={() => setMode('register')} className={`px-3 py-1 text-sm rounded-full ${mode === 'register' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'}`}><UserPlus className="inline-block mr-1"/>Register</button>
              <button onClick={() => setMode('reset')} className={`px-2 py-0.5 text-xs rounded-full ${mode === 'reset' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'}`}><RefreshCw className="inline-block mr-1" size={14}/>Reset</button>
            </div>
          </div>

          {/* Forms */}
          {mode === 'login' && (
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
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4 mb-8">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 ml-1">Username</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    placeholder="choose a username"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 ml-1">Email (optional)</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all" placeholder="you@example.com" />
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

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 ml-1">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </form>
          )}

          {mode === 'reset' && (
            <form onSubmit={handleResetRequest} className="space-y-4 mb-8">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Enter the email address associated with your account</p>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all disabled:cursor-not-allowed disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending email...
                  </span>
                ) : (
                  'Send Verification Code'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => { setMode('login'); setResetEmail(''); }}
                className="w-full text-slate-500 hover:text-cyan-400 transition-colors text-sm font-medium py-2"
              >
                Back to Login
              </button>
            </form>
          )}

          {mode === 'verify' && (
            <form onSubmit={handleVerifyReset} className="space-y-4 mb-8">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 ml-1">Verification Code</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-center tracking-widest font-mono"
                    placeholder="000000"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Enter the 6-digit code sent to {resetEmail}</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 ml-1">New Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 ml-1">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>

              <button
                type="button"
                onClick={() => { setMode('reset'); setVerificationCode(''); }}
                className="w-full text-slate-500 hover:text-cyan-400 transition-colors text-sm font-medium py-2"
              >
                Back to Reset Request
              </button>
            </form>
          )}

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
