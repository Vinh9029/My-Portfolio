"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    id: string;
    message: string;
    type?: ToastType;
    duration?: number;
    onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
    id,
    message,
    type = 'info',
    duration = 4000,
    onClose,
}) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(id), duration);
        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    const typeStyles = {
        success: {
            bg: 'from-emerald-500/20 to-teal-500/20',
            border: 'border-emerald-500/50',
            icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
            accent: 'bg-emerald-500',
        },
        error: {
            bg: 'from-red-500/20 to-pink-500/20',
            border: 'border-red-500/50',
            icon: <AlertCircle className="w-5 h-5 text-red-400" />,
            accent: 'bg-red-500',
        },
        warning: {
            bg: 'from-amber-500/20 to-orange-500/20',
            border: 'border-amber-500/50',
            icon: <AlertCircle className="w-5 h-5 text-amber-400" />,
            accent: 'bg-amber-500',
        },
        info: {
            bg: 'from-cyan-500/20 to-blue-500/20',
            border: 'border-cyan-500/50',
            icon: <Info className="w-5 h-5 text-cyan-400" />,
            accent: 'bg-cyan-500',
        },
    };

    const styles = typeStyles[type];

    return (
        <motion.div
            initial={{ opacity: 0, x: 400, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 400, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={`flex items-center gap-4 px-6 py-4 rounded-lg border backdrop-blur-sm bg-gradient-to-r ${styles.bg} ${styles.border} shadow-lg`}
        >
            {/* Accent bar */}
            <div className={`w-1 h-12 rounded-full ${styles.accent}`}></div>

            {/* Icon */}
            {styles.icon}

            {/* Message */}
            <p className="flex-1 text-slate-200 text-sm font-medium">{message}</p>

            {/* Close button */}
            <button
                onClick={() => onClose(id)}
                className="text-slate-400 hover:text-slate-200 transition-colors flex-shrink-0"
            >
                <X className="w-5 h-5" />
            </button>
        </motion.div>
    );
};

interface ToastContainerProps {
    toasts: Array<{ id: string; message: string; type?: ToastType; duration?: number }>;
    onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
    return (
        <AnimatePresence>
            <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-md">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        id={toast.id}
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={onRemove}
                    />
                ))}
            </div>
        </AnimatePresence>
    );
};

// Custom hook for managing toast notifications
export const useToast = () => {
    const [toasts, setToasts] = React.useState<
        Array<{ id: string; message: string; type?: ToastType; duration?: number }>
    >([]);

    const showToast = (
        message: string,
        type: ToastType = 'info',
        duration: number = 4000
    ) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const success = (message: string, duration?: number) =>
        showToast(message, 'success', duration);
    const error = (message: string, duration?: number) =>
        showToast(message, 'error', duration);
    const warning = (message: string, duration?: number) =>
        showToast(message, 'warning', duration);
    const info = (message: string, duration?: number) =>
        showToast(message, 'info', duration);

    return {
        toasts,
        removeToast,
        showToast,
        success,
        error,
        warning,
        info,
    };
};
