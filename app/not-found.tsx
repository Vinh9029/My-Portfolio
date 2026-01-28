import Link from 'next/link'
import { ArrowLeft, FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-200 font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 text-center max-w-md mx-auto">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-12 shadow-2xl shadow-black/50">
                    <div className="w-20 h-20 mx-auto mb-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center shadow-lg">
                        <FileQuestion size={40} className="text-cyan-500" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">404</h1>
                    <h2 className="text-xl font-semibold text-slate-300 mb-4">Page Not Found</h2>
                    <p className="text-slate-400 mb-8">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all active:scale-[0.98]"
                    >
                        <ArrowLeft size={18} /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}