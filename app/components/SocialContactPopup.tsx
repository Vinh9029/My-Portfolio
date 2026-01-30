"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface SocialContact {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  url: string;
  description: string;
}

export const SocialContactPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const contacts: SocialContact[] = [
    {
      id: 'zalo',
      name: 'Zalo',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
          {/* Official Zalo Logo Style */}
          <defs>
            <linearGradient id="zaloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0084ff" />
              <stop offset="100%" stopColor="#0068ff" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="4" fill="url(#zaloGrad)" opacity="0.2"/>
          <path d="M16 6c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm3.5 11h-2.5v2.5h-2v-2.5h-2.5v-2h2.5v-2.5h2v2.5h2.5v2z" fill="currentColor"/>
        </svg>
      ),
      color: 'from-blue-600 to-blue-700',
      url: 'https://zalo.me/0396945957',
      description: '💬 Chat on Zalo'
    },
    {
      id: 'messenger',
      name: 'Messenger',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
          {/* Official Messenger Logo Style */}
          <defs>
            <linearGradient id="messengerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0084ff" />
              <stop offset="100%" stopColor="#0068ff" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="4" fill="url(#messengerGrad)" opacity="0.2"/>
          <path d="M16 2C8.27 2 2 7.73 2 14.5c0 3.37 1.43 6.4 3.74 8.58L3 30l8.58-4.4C14.07 27.64 15 28 16 28c7.73 0 14-5.73 14-12.5S23.73 2 16 2zm0 23c-.83 0-1.6-.13-2.37-.37l-.7-.22-2.75 1.48.85-2.88-.6-.75C6.27 20.58 5 17.68 5 14.5 5 9.12 10.04 5 16 5c5.96 0 11 4.12 11 9.5S21.96 25 16 25z" fill="currentColor"/>
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',   
      url: 'https://m.me/8129029sng',
      description: '💬 Message on Facebook'
    }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-40 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/50 cursor-pointer"
            >
              <MessageCircle size={28} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Popup Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-28 right-8 z-50"
          >
            {/* Main Card */}
            <div className="bg-gradient-to-b from-slate-800/95 to-slate-900/95 border border-slate-700 rounded-2xl shadow-2xl w-80 overflow-hidden backdrop-blur-xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-slate-700 px-6 py-5 flex justify-between items-center">
                <div>
                  <h3 className="text-white font-bold text-lg">💬 Let's Connect</h3>
                  <p className="text-slate-400 text-xs mt-1">Choose your platform</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-all text-slate-400 hover:text-slate-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <p className="text-slate-300 text-sm leading-relaxed">
                  Reach out and let's have a conversation. I'm always happy to connect! 🚀
                </p>

                {/* Contact Options */}
                {contacts.map((contact, idx) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <motion.a
                      href={contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onHoverStart={() => setExpandedId(contact.id)}
                      onHoverEnd={() => setExpandedId(null)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${contact.color} hover:shadow-lg hover:shadow-${contact.id === 'zalo' ? 'blue-500/30' : 'blue-400/30'} transition-all cursor-pointer group relative overflow-hidden`}
                    >
                      {/* Animated Background */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${contact.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>

                      {/* Icon Container */}
                      <div className="relative text-white flex-shrink-0 bg-white/10 p-2.5 rounded-lg border border-white/10 group-hover:bg-white/20 transition-all">
                        {contact.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0 relative">
                        <p className="text-white font-semibold text-sm group-hover:text-white/95">{contact.name}</p>
                        <p className="text-white/70 text-xs truncate group-hover:text-white/80">{contact.description}</p>
                      </div>

                      {/* Arrow Icon */}
                      <motion.div
                        animate={{ x: expandedId === contact.id ? 6 : 0 }}
                        className="text-white/60 flex-shrink-0 relative"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.div>
                    </motion.a>
                  </motion.div>
                ))}

                {/* Footer */}
                <div className="pt-3 border-t border-slate-700/50 mt-4">
                  <p className="text-slate-400 text-xs text-center leading-relaxed">
                    ✨ I typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Hint */}
            {expandedId && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 whitespace-nowrap text-xs text-slate-300 pointer-events-none"
              >
                Click to open
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-950 border-b border-r border-slate-800 rotate-45"></div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/20"
          />
        )}
      </AnimatePresence>
    </>
  );
};
