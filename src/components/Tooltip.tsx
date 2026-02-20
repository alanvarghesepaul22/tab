'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TooltipPosition = 'top' | 'bottom';

interface TooltipProps {
  content: string;
  children: ReactNode;
  shortcut?: string;
  position?: TooltipPosition;
}

export function Tooltip({ content, children, shortcut, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const isBottom = position === 'bottom';

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: isBottom ? -4 : 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isBottom ? -4 : 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${isBottom ? 'top-full mt-2' : 'bottom-full mb-2'} left-1/2 -translate-x-1/2 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium rounded-lg whitespace-nowrap shadow-lg pointer-events-none z-50`}
          >
            {content}
            {shortcut && (
              <span className="ml-2 opacity-60 text-[10px]">{shortcut}</span>
            )}
            <div className={`absolute ${isBottom ? 'bottom-full' : 'top-full'} left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent ${isBottom ? 'border-b-neutral-900 dark:border-b-white' : 'border-t-neutral-900 dark:border-t-white'}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
