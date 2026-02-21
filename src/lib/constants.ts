export const DEFAULT_SETTINGS = {
  focusDuration: 25,
  breakDuration: 5,
  soundEnabled: true,
  notificationsEnabled: true,
} as const;

export type Settings = typeof DEFAULT_SETTINGS;

export const STORAGE_KEYS = {
  SETTINGS: 'tab-settings',
  TIMER_STATE: 'tab-timer-state',
  THEME: 'tab-theme',
} as const;

export const TIMER_MODES = {
  FOCUS: 'focus',
  BREAK: 'break',
} as const;

export type TimerMode = typeof TIMER_MODES[keyof typeof TIMER_MODES];

export const NOTIFICATION_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';

export const SEO_CONFIG: {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  siteName: string;
} = {
  title: 'TAB! - Take a Break | Smart Break Timer for Developers',
  description:
    'TAB helps software professionals take healthy breaks. Remind yourself to stand up, stretch, and walk around. Boost productivity with focus sessions and break timers.',
  keywords: [
    'break timer',
    'Pomodoro app',
    'developer wellness',
    'stand up reminder',
    'focus timer',
    'productivity app',
    'work break tracker',
    'healthy computing',
    'stretch reminder',
    'eye rest timer',
    'office health',
    'sitting disease',
  ],
  ogImage: '/og-image.png',
  siteName: 'TAB! - Take a Break',
};
