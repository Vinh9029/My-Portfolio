"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center max-w-2xl"
            >
                {/* 404 Number */}
                <motion.div variants={itemVariants} className="mb-8">
                    <h1 className="text-9xl md:text-[150px] font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-none">
                        404
                    </h1>
                </motion.div>

                {/* Main Text */}
                <motion.div variants={itemVariants} className="mb-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        It looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
                    </p>
                </motion.div>

                {/* Search Hint */}
                <motion.div
                    variants={itemVariants}
                    className="mb-12 p-4 rounded-lg bg-slate-900/50 border border-slate-800 backdrop-blur-sm"
                >
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                        <Search className="w-5 h-5 text-cyan-400" />
                        <p className="text-sm">Let's get you back on track</p>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={() => router.push('/')}
                        className="group flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                    >
                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Go Home
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold rounded-lg border border-slate-800 hover:border-slate-700 transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div variants={itemVariants} className="mt-16">
                    <div className="flex justify-center gap-2">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-cyan-500 rounded-full"
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
