// e:\MyPortfolio\my-portoflio\app\context\NotificationContext.tsx
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
    id: number;
    type: NotificationType;
    message: string;
}

interface NotificationContextType {
    showNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = useCallback((type: NotificationType, message: string) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, type, message }]);

        // Tự động ẩn sau 3 giây
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 3000);
    }, []);

    const removeNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            {/* Container hiển thị thông báo - Fixed ở góc phải trên */}
            <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 pointer-events-none">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`
              pointer-events-auto min-w-[300px] max-w-md flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl 
              border-l-4 transform transition-all animate-slide-in backdrop-blur-sm
              ${notification.type === 'success' ? 'bg-slate-900/90 border-emerald-500 text-slate-100' : ''}
              ${notification.type === 'error' ? 'bg-slate-900/90 border-red-500 text-slate-100' : ''}
              ${notification.type === 'info' ? 'bg-slate-900/90 border-blue-500 text-slate-100' : ''}
            `}
                        role="alert"
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0 text-lg">
                            {notification.type === 'success' && <span className="text-emerald-400">✓</span>}
                            {notification.type === 'error' && <span className="text-red-400">✕</span>}
                            {notification.type === 'info' && <span className="text-blue-400">ℹ</span>}
                        </div>

                        {/* Message */}
                        <div className="text-sm font-medium flex-1">{notification.message}</div>

                        {/* Close Button */}
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="ml-2 text-slate-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
