"use client";

import { Suspense } from 'react';
import LoginPage from './login-content';

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><p className="text-white">Loading...</p></div>}>
      <LoginPage />
    </Suspense>
  );
}
