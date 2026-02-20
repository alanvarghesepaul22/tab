'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { saveTimerState, getTimerState, clearTimerState } from '@/lib/storage';

interface UseTimerOptions {
  focusDuration: number;
  breakDuration: number;
  onTimerComplete: (mode: 'focus' | 'break') => void;
  isEnabled?: boolean;
}

export function useTimer({ focusDuration, breakDuration, onTimerComplete, isEnabled = true }: UseTimerOptions) {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const expectedEndRef = useRef<number | null>(null);
  const initializedRef = useRef(false);

  const totalTime = mode === 'focus' ? focusDuration * 60 : breakDuration * 60;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    expectedEndRef.current = null;
  }, []);

  const tick = useCallback(() => {
    if (expectedEndRef.current === null) return;
    
    const now = Date.now();
    const remaining = Math.max(0, Math.ceil((expectedEndRef.current - now) / 1000));
    
    if (remaining <= 0) {
      clearTimer();
      setIsActive(false);
      setTimeLeft(0);
      
      const nextMode = mode === 'focus' ? 'break' : 'focus';
      setMode(nextMode);
      setTimeLeft(nextMode === 'focus' ? focusDuration * 60 : breakDuration * 60);
      
      clearTimerState();
      onTimerComplete(mode);
    } else {
      setTimeLeft(remaining);
    }
  }, [mode, focusDuration, breakDuration, onTimerComplete, clearTimer]);

  const startTimer = useCallback(() => {
    if (!isEnabled) return;
    
    clearTimer();
    expectedEndRef.current = Date.now() + timeLeft * 1000;
    setIsActive(true);
    
    timerRef.current = setInterval(tick, 100);
    
    saveTimerState({ mode, isActive: true, timeLeft, lastUpdated: Date.now() });
  }, [isEnabled, timeLeft, mode, tick, clearTimer]);

  const pauseTimer = useCallback(() => {
    clearTimer();
    setIsActive(false);
    
    saveTimerState({ mode, isActive: false, timeLeft, lastUpdated: Date.now() });
  }, [clearTimer, mode, timeLeft]);

  const resetTimer = useCallback(() => {
    clearTimer();
    setIsActive(false);
    const newTimeLeft = mode === 'focus' ? focusDuration * 60 : breakDuration * 60;
    setTimeLeft(newTimeLeft);
    
    saveTimerState({ mode, isActive: false, timeLeft: newTimeLeft, lastUpdated: Date.now() });
  }, [mode, focusDuration, breakDuration, clearTimer]);

  const skipTimer = useCallback(() => {
    clearTimer();
    setIsActive(false);
    const nextMode = mode === 'focus' ? 'break' : 'focus';
    const newTimeLeft = nextMode === 'focus' ? focusDuration * 60 : breakDuration * 60;
    setMode(nextMode);
    setTimeLeft(newTimeLeft);
    
    saveTimerState({ mode: nextMode, isActive: false, timeLeft: newTimeLeft, lastUpdated: Date.now() });
  }, [mode, focusDuration, breakDuration, clearTimer]);

  const startBreak = useCallback(() => {
    clearTimer();
    const breakTime = breakDuration * 60;
    setMode('break');
    setTimeLeft(breakTime);
    expectedEndRef.current = Date.now() + breakTime * 1000;
    setIsActive(true);
    
    timerRef.current = setInterval(() => {
      if (expectedEndRef.current === null) return;
      
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((expectedEndRef.current - now) / 1000));
      
      if (remaining <= 0) {
        clearTimer();
        setIsActive(false);
        setTimeLeft(0);
        
        const nextMode = 'focus';
        const focusTime = focusDuration * 60;
        setMode(nextMode);
        setTimeLeft(focusTime);
        
        clearTimerState();
        onTimerComplete('break');
      } else {
        setTimeLeft(remaining);
      }
    }, 100);
    
    saveTimerState({ mode: 'break', isActive: true, timeLeft: breakTime, lastUpdated: Date.now() });
  }, [breakDuration, focusDuration, clearTimer, onTimerComplete]);

  // Initialize from localStorage on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    const state = getTimerState(focusDuration, breakDuration);
    setMode(state.mode);
    setTimeLeft(state.timeLeft);
    setIsActive(state.isActive);
    
    if (state.isActive && state.timeLeft > 0) {
      expectedEndRef.current = Date.now() + state.timeLeft * 1000;
      timerRef.current = setInterval(tick, 100);
    }
  }, []);

  // Update timeLeft when duration props change (only when duration actually changes, not on pause)
  useEffect(() => {
    if (!initializedRef.current) return;
    
    const newTimeLeft = mode === 'focus' ? focusDuration * 60 : breakDuration * 60;
    setTimeLeft(newTimeLeft);
  }, [focusDuration, breakDuration, mode]);

  // Handle visibility change to sync timer
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isActive && expectedEndRef.current) {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((expectedEndRef.current - now) / 1000));
        
        if (remaining !== timeLeft) {
          setTimeLeft(remaining);
        }
        
        if (remaining <= 0) {
          tick();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive, timeLeft, tick]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    mode,
    isActive,
    timeLeft,
    totalTime,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    startBreak,
  };
}
