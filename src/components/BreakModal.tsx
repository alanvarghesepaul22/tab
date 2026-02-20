'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footprints, X, PersonStanding } from 'lucide-react';

interface BreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBreak: () => void;
  duration: number;
}

export const BreakModal = memo(function BreakModal({ isOpen, onClose, onStartBreak, duration }: BreakModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl rounded-3xl pointer-events-auto overflow-hidden relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center p-6 md:p-8 text-center">
                <div className="w-40 h-40 md:w-48 md:h-48 mb-5 md:mb-6 rounded-2xl flex items-center justify-center shadow-lg relative bg-neutral-200 dark:bg-neutral-800">
                  <PersonStanding size={80} className="text-neutral-600 dark:text-neutral-400" strokeWidth={1.5} />
                </div>

                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Time to move!</h2>
                <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-xs">
                  You&apos;ve been focused for a while. Take a <span className="text-neutral-700 dark:text-neutral-300 font-semibold">{duration}-minute walk</span> to refresh your mind.
                </p>

                <div className="flex gap-3 w-full">
                  <button 
                    onClick={onStartBreak}
                    className="flex-1 py-3 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Footprints size={18} />
                    Start Break
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex-1 py-3 px-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl transition-all"
                  >
                    Dismiss
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-neutral-400 dark:text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                  Movement improves focus by 20%
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
