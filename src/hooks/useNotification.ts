'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { NOTIFICATION_SOUND_URL } from '@/lib/constants';

export function useNotification(enabled: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof window !== 'undefined' && 'Notification' in window);
    
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;
    
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }, [isSupported]);

  const playSound = useCallback(async () => {
    if (!enabled) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(NOTIFICATION_SOUND_URL);
      audioRef.current.preload = 'auto';
    }

    try {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
    } catch (error) {
      console.log('Audio play failed:', error);
    }
  }, [enabled]);

  const showNotification = useCallback(async (title: string, body: string) => {
    if (!isSupported) {
      await playSound();
      return;
    }

    if (permission === 'granted') {
      try {
        const notification = new Notification(title, {
          body,
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          tag: 'tab-notification',
          requireInteraction: true,
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
        };

        setTimeout(() => notification.close(), 10000);
      } catch (error) {
        console.error('Failed to show notification:', error);
      }
    }

    await playSound();
  }, [permission, isSupported, playSound]);

  const notifyTimerComplete = useCallback(async (mode: 'focus' | 'break') => {
    const isFocus = mode === 'focus';
    const title = isFocus ? 'Time to Take a Break!' : 'Break Over!';
    const body = isFocus 
      ? 'Great work! Stand up, stretch, and walk around for a few minutes.'
      : 'Ready to get back to work? Start a new focus session.';
    
    await showNotification(title, body);
  }, [showNotification]);

  return {
    permission,
    isSupported,
    requestPermission,
    playSound,
    showNotification,
    notifyTimerComplete,
  };
}
