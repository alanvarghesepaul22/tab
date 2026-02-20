'use client';

import { Settings, Timer } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Tooltip } from './Tooltip';
import { motion } from 'framer-motion';

interface NavbarProps {
  onOpenSettings: () => void;
}

export function Navbar({ onOpenSettings }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-6 md:px-6 bg-transparent">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-neutral-900">
          <Timer size={20} strokeWidth={3}/>
        </div>
        <span className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          TAB!
        </span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <ThemeToggle />
        <Tooltip content="Settings" position="bottom">
          <button 
            onClick={onOpenSettings}
            className="p-2.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
            aria-label="Settings"
          >
            <Settings size={22} />
          </button>
        </Tooltip>
      </motion.div>
    </nav>
  );
}
