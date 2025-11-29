'use client';

import { AnimatePresence, motion } from 'motion/react';
import { createContext, ReactNode, useContext, useState, useCallback } from 'react';

type ToastType = {
  id: string;
  message: string;
};

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastType | null>(null);

  const showToast = useCallback((message: string) => {
    const id = Date.now().toString();
    setToast({ id, message });

    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[rgba(0,0,0,0.8)] text-white backdrop-blur-sm shadow-lg whitespace-nowrap"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#4ADE80]"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};
