'use client';

import { useState, useEffect, memo } from 'react';
import { X, Bell, Clock, Briefcase, Coffee, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsType } from '@/lib/constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SettingsType;
  onSave: (newSettings: SettingsType) => void;
  onRequestNotification?: () => void;
  notificationPermission?: NotificationPermission;
}

const FOCUS_QUICK_TIMES = [30, 60, 120];
const BREAK_QUICK_TIMES = [5, 10, 15];

export const SettingsModal = memo(function SettingsModal({ isOpen, onClose, settings, onSave, onRequestNotification, notificationPermission }: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings, isOpen]);

  const handleChange = (key: keyof SettingsType, value: string | number | boolean) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (key: 'focusDuration' | 'breakDuration', value: string) => {
    setLocalSettings(prev => ({ ...prev, [key]: value as any }));
  };

  const handleInputBlur = (key: 'focusDuration' | 'breakDuration') => {
    const value = localSettings[key];
    const strValue = String(value);
    const numValue = parseInt(strValue, 10);
    const max = key === 'focusDuration' ? 120 : 30;
    const clamped = isNaN(numValue) ? (key === 'focusDuration' ? 25 : 5) : Math.max(1, Math.min(max, numValue));
    setLocalSettings(prev => ({ ...prev, [key]: clamped }));
  };

  const setQuickTime = (key: 'focusDuration' | 'breakDuration', value: number) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-lg bg-white dark:bg-neutral-900 shadow-2xl rounded-3xl pointer-events-auto flex flex-col max-h-[90vh] overflow-hidden">
              
              {/* Sticky Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 bg-transparent z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-200 dark:bg-neutral-700 rounded-xl text-neutral-700 dark:text-neutral-300">
                    <Settings size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Timer Settings</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Configure your productivity intervals</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-neutral-500 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-transparent">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-medium">
                    <Clock size={18} />
                    <h3>Daily Schedule</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Start Time</label>
                      <input 
                        type="time" 
                        value={localSettings.workStart}
                        onChange={(e) => handleChange('workStart', e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400/50 focus:border-neutral-500 transition-all text-neutral-700 dark:text-neutral-300 font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">End Time</label>
                      <input 
                        type="time" 
                        value={localSettings.workEnd}
                        onChange={(e) => handleChange('workEnd', e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400/50 focus:border-neutral-500 transition-all text-neutral-700 dark:text-neutral-300 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-medium">
                    <Briefcase size={18} />
                    <h3>Flow Intervals</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Focus Card */}
                    <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Focus</span>
                      <Briefcase size={14} className="text-neutral-500" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={localSettings.focusDuration}
                        onChange={(e) => handleInputChange('focusDuration', e.target.value)}
                        onBlur={() => handleInputBlur('focusDuration')}
                        placeholder="25"
                        className="w-24 text-center py-2 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl text-xl font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                      />
                      <span className="text-sm text-neutral-400 dark:text-neutral-500">in mins</span>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">Quick:</span>
                      {FOCUS_QUICK_TIMES.map((time) => (
                        <button
                          key={time}
                          onClick={() => setQuickTime('focusDuration', time)}
                          className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                            localSettings.focusDuration === time
                              ? 'bg-neutral-800 dark:bg-white text-white dark:text-neutral-900'
                              : 'bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                          }`}
                        >
                          {time < 60 ? `${time}m` : `${time / 60}h`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Break Card */}
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Break</span>
                      <Coffee size={14} className="text-neutral-500" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={localSettings.breakDuration}
                        onChange={(e) => handleInputChange('breakDuration', e.target.value)}
                        onBlur={() => handleInputBlur('breakDuration')}
                        placeholder="5"
                        className="w-24 text-center py-2 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl text-xl font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                      />
                      <span className="text-sm text-neutral-400 dark:text-neutral-500">in mins</span>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">Quick:</span>
                      {BREAK_QUICK_TIMES.map((time) => (
                        <button
                          key={time}
                          onClick={() => setQuickTime('breakDuration', time)}
                          className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                            localSettings.breakDuration === time
                              ? 'bg-neutral-800 dark:bg-white text-white dark:text-neutral-900'
                              : 'bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                          }`}
                        >
                          {time}m
                        </button>
                      ))}
                    </div>
                  </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-medium">
                    <Bell size={18} />
                    <h3>Notifications</h3>
                  </div>
                  
                  <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white dark:bg-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 shadow-sm">
                        <Bell size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white">Sound Alerts</h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Play a gentle chime when timer ends</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleChange('soundEnabled', !localSettings.soundEnabled)}
                      className={`relative w-12 h-7 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 ${
                        localSettings.soundEnabled ? 'bg-neutral-700 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-600'
                      }`}
                    >
                      <span 
                        className={`block w-5 h-5 bg-white dark:bg-neutral-900 rounded-full shadow-md transition-transform duration-200 ease-in-out ${
                          localSettings.soundEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                        }`} 
                      />
                    </button>
                  </div>

                  {notificationPermission === 'default' && onRequestNotification && (
                    <button 
                      onClick={onRequestNotification}
                      className="w-full p-4 bg-neutral-200 dark:bg-neutral-800 rounded-2xl border border-neutral-300 dark:border-neutral-700 flex items-center justify-center gap-2 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <Bell size={18} />
                      Enable Browser Notifications
                    </button>
                  )}
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="px-6 py-4 bg-transparent border-t border-neutral-200 dark:border-neutral-700 flex justify-end gap-3 sticky bottom-0">
                <button 
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onSave(localSettings);
                    onClose();
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-xl transition-all hover:scale-[1.02]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
