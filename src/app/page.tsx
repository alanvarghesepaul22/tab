'use client';

import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { SettingsModal } from '@/components/SettingsModal';
import { BreakModal } from '@/components/BreakModal';
import { TimerDisplay } from '@/components/TimerDisplay';
import { InstallPrompt } from '@/components/InstallPrompt';
import { useTimer } from '@/hooks/useTimer';
import { useNotification } from '@/hooks/useNotification';
import { getSettings, saveSettings, clearTimerState } from '@/lib/storage';
import { DEFAULT_SETTINGS, Settings } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function Home() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBreakModalOpen, setIsBreakModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { permission, requestPermission, notifyTimerComplete } = useNotification(settings.notificationsEnabled && settings.soundEnabled);

  const handleTimerComplete = useCallback((mode: 'focus' | 'break') => {
    notifyTimerComplete(mode);
    if (mode === 'focus') {
      setIsBreakModalOpen(true);
    }
  }, [notifyTimerComplete]);

  const {
    mode,
    isActive,
    timeLeft,
    totalTime,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    startBreak,
  } = useTimer({
    focusDuration: settings.focusDuration,
    breakDuration: settings.breakDuration,
    onTimerComplete: handleTimerComplete,
    isEnabled: true,
  });

  // Save settings on mount
  useEffect(() => {
    setMounted(true);
    const savedSettings = getSettings();
    setSettings(savedSettings);
  }, []);

  // Clear timer state when modal opens (timer completed)
  useEffect(() => {
    if (isBreakModalOpen) {
      clearTimerState();
    }
  }, [isBreakModalOpen]);

  const handleSettingsSave = (newSettings: Settings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const toggleTimer = () => {
    if (isActive) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-100 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-200 dark:selection:bg-neutral-700">
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />

      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen py-16 md:py-20 pt-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-2">
              {mode === 'focus' ? 'Deep Work Session' : 'Recharge Break'}
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold">
              <span className="relative flex h-2 w-2">

                <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? 'bg-neutral-700 dark:bg-white' : 'bg-neutral-400 dark:bg-neutral-500'}`}></span>
              </span>
              {isActive ? 'Timer Running' : 'Ready to start'}
            </div>
          </div>

          <TimerDisplay 
            timeLeft={timeLeft} 
            totalTime={totalTime}
            isActive={isActive}
            mode={mode}
            onToggle={toggleTimer}
            onReset={resetTimer}
            onSkip={skipTimer}
          />
        </motion.div>
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        settings={settings}
        onSave={handleSettingsSave}
        onRequestNotification={requestPermission}
        notificationPermission={permission}
      />

      <BreakModal 
        isOpen={isBreakModalOpen}
        onClose={() => setIsBreakModalOpen(false)}
        onStartBreak={startBreak}
        duration={settings.breakDuration}
      />

      <InstallPrompt />
    </div>
  );
}
