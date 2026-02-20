'use client';

import { Settings, DEFAULT_SETTINGS } from './constants';

export function getSettings(): Settings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  
  try {
    const stored = localStorage.getItem('tab-settings');
    if (!stored) return DEFAULT_SETTINGS;
    
    const parsed = JSON.parse(stored);
    
    const validated: Settings = {
      workStart: parsed.workStart || DEFAULT_SETTINGS.workStart,
      workEnd: parsed.workEnd || DEFAULT_SETTINGS.workEnd,
      focusDuration: Math.max(1, Math.min(120, parsed.focusDuration || DEFAULT_SETTINGS.focusDuration)) as Settings['focusDuration'],
      breakDuration: Math.max(1, Math.min(30, parsed.breakDuration || DEFAULT_SETTINGS.breakDuration)) as Settings['breakDuration'],
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : DEFAULT_SETTINGS.soundEnabled,
      notificationsEnabled: typeof parsed.notificationsEnabled === 'boolean' ? parsed.notificationsEnabled : DEFAULT_SETTINGS.notificationsEnabled,
    };
    
    return validated;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Settings): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('tab-settings', JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export interface TimerState {
  mode: 'focus' | 'break';
  isActive: boolean;
  timeLeft: number;
  lastUpdated: number;
}

export function getTimerState(defaultFocusTime: number, defaultBreakTime: number): TimerState {
  if (typeof window === 'undefined') {
    return {
      mode: 'focus',
      isActive: false,
      timeLeft: defaultFocusTime,
      lastUpdated: Date.now(),
    };
  }
  
  try {
    const stored = localStorage.getItem('tab-timer-state');
    if (!stored) {
      return {
        mode: 'focus',
        isActive: false,
        timeLeft: defaultFocusTime,
        lastUpdated: Date.now(),
      };
    }
    
    const parsed: TimerState = JSON.parse(stored);
    const now = Date.now();
    
    // If timer was active, calculate elapsed time
    if (parsed.isActive) {
      const elapsed = Math.floor((now - parsed.lastUpdated) / 1000);
      const newTimeLeft = Math.max(0, parsed.timeLeft - elapsed);
      
      if (newTimeLeft === 0) {
        return {
          mode: parsed.mode === 'focus' ? 'break' : 'focus',
          isActive: false,
          timeLeft: parsed.mode === 'focus' ? defaultBreakTime : defaultFocusTime,
          lastUpdated: now,
        };
      }
      
      return {
        ...parsed,
        timeLeft: newTimeLeft,
        lastUpdated: now,
      };
    }
    
    // Timer was paused/reset - return as is
    return {
      ...parsed,
      isActive: false,
      lastUpdated: now,
    };
  } catch {
    return {
      mode: 'focus',
      isActive: false,
      timeLeft: defaultFocusTime,
      lastUpdated: Date.now(),
    };
  }
}

export function saveTimerState(state: TimerState): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('tab-timer-state', JSON.stringify({
      ...state,
      lastUpdated: Date.now(),
    }));
  } catch (error) {
    console.error('Failed to save timer state:', error);
  }
}

export function clearTimerState(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('tab-timer-state');
  } catch (error) {
    console.error('Failed to clear timer state:', error);
  }
}
