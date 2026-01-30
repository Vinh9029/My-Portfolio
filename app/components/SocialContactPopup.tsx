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
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      url: 'https://zalo.me/0396945957', // Replace with your Zalo URL
      description: 'Chat on Zalo'
    },
    {
      id: 'messenger',
      name: 'Messenger',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
      color: 'from-blue-400 to-blue-500',   
      url: 'https://m.me/8129029sng', // Replace with your Facebook Messenger URL
      description: 'Message on Facebook'
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
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-80 overflow-hidden backdrop-blur-xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4 flex justify-between items-center">
                <h3 className="text-white font-bold text-lg">Get in Touch</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <p className="text-slate-400 text-sm mb-4">
                  Choose your preferred platform to chat with me:
                </p>

                {/* Contact Options */}
                {contacts.map((contact, idx) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <motion.a
                      href={contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onHoverStart={() => setExpandedId(contact.id)}
                      onHoverEnd={() => setExpandedId(null)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${contact.color} hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden`}
                    >
                      {/* Background glow */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${contact.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10`}></div>

                      {/* Icon */}
                      <div className="text-white flex-shrink-0 bg-white/20 p-2 rounded-lg">
                        {contact.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm">{contact.name}</p>
                        <p className="text-white/80 text-xs truncate">{contact.description}</p>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        animate={{ x: expandedId === contact.id ? 4 : 0 }}
                        className="text-white/80 flex-shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </motion.a>
                  </motion.div>
                ))}

                {/* Footer */}
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-slate-500 text-xs text-center">
                    I'll get back to you as soon as possible!
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
