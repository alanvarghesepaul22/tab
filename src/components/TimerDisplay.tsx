'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
  isActive: boolean;
  mode: 'focus' | 'break';
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const TimerDisplay = memo(function TimerDisplay({ timeLeft, totalTime, isActive, mode, onToggle, onReset, onSkip }: TimerDisplayProps) {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / totalTime) * 100;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const isHours = hours > 0;

  const formatTimeDisplay = () => {
    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-neutral-200 dark:stroke-neutral-700 fill-none"
              strokeWidth="12"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-neutral-400 dark:stroke-neutral-500 fill-none"
              strokeWidth="12"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-neutral-800 dark:stroke-white fill-none"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: "linear" }}
              style={{
                strokeDasharray: circumference,
              }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={mode}
              className={`mb-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                mode === 'focus' 
                  ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300' 
                  : 'bg-neutral-300 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-200'
              }`}
            >
              {mode === 'focus' ? 'Focus Session' : 'Break Time'}
            </motion.div>
            <div className={`text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white tracking-tighter tabular-nums ${isHours ? 'px-4 text-4xl md:text-5xl' : ''}`}>
              {formatTimeDisplay()}
            </div>
            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500 font-medium">
              {isActive ? 'Stay focused' : 'Ready to start?'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Tooltip content="Reset Timer" shortcut="R">
          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-2xl bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
            aria-label="Reset Timer"
          >
            <RotateCcw size={20} />
          </motion.button>
        </Tooltip>

        <Tooltip content={isActive ? 'Pause' : 'Start Timer'} shortcut="Space">
          <motion.button
            onClick={onToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-base transition-all ${
                mode === 'focus' 
                  ? 'bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200' 
                  : 'bg-neutral-700 hover:bg-neutral-600 text-white dark:bg-neutral-300 dark:text-neutral-900 dark:hover:bg-neutral-400'
              }`}
          >
            {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            {isActive ? 'Pause' : 'Start'}
          </motion.button>
        </Tooltip>

        <Tooltip content="Skip to Break" shortcut="S">
          <motion.button
            onClick={onSkip}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-2xl bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
            aria-label="Skip"
          >
            <SkipForward size={20} />
          </motion.button>
        </Tooltip>
      </div>
      
      <div className="mt-5 flex gap-6 text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
            SPC
          </span>
          Start/Pause
        </div>
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
            R
          </span>
          Reset
        </div>
      </div>
    </div>
  );
});
