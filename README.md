# TAB! - Take a Break

<p align="center">
  <img src="/public/icons/icon-512x512.png" alt="TAB! Logo" width="128" height="128" />
</p>

<p align="center">
  <strong>A smart break timer for software professionals</strong>
</p>

---

## Why TAB!?

Software developers and tech professionals spend an average of **6-8 hours per day** sitting at their desks. This sedentary lifestyle has been called "sitting disease" by health experts and is linked to:

- Increased risk of heart disease, diabetes, and obesity
- Back pain, neck strain, and musculoskeletal issues
- Eye strain and digital fatigue
- Reduced cognitive performance and creativity
- Poor mental health and burnout

**TAB!** helps you combat these health risks by reminding you to take regular breaks to stand up, stretch, and walk around.

---

## The Science

Research consistently shows that regular breaks improve both health and productivity:

### Walking Breaks Counteract Sitting Risks

> *"Walking five minutes every half-hour can reduce the risk of high blood pressure, diabetes, and heart disease."*
> — [Harvard Health](https://www.health.harvard.edu/staying-healthy/walking-breaks-counter-the-effects-of-sitting)

> *"Just five minutes of walking every half hour can offset the health impact of a workday filled with sitting."*
> — [Columbia University Irving Medical Center](https://www.cuimc.columbia.edu/news/rx-prolonged-sitting-five-minute-stroll-every-half-hour)

### Pomodoro Technique Benefits

The Pomodoro Technique (25-minute focus sessions + 5-minute breaks) has been proven to:

- Enhance focus and concentration
- Reduce mental fatigue
- Improve learning retention
- Increase motivation and accountability

> *"The Pomodoro Technique is a time-management method that splits work into focused intervals punctuated by brief breaks. It aims to boost productivity and counteract mental fatigue."*
> — [BMC Medical Education](https://bmcmededuc.biomedcentral.com/articles/10.1186/s12909-025-08001-0)

---

## Features

### ⏱️ Smart Timer
- **Focus Sessions**: Customizable duration (1-120 minutes)
- **Break Timer**: Customizable breaks (1-30 minutes)
- Visual circular progress indicator
- Start, pause, reset, and skip controls

### 🔔 Break Reminders
- Browser notifications when timer completes
- Sound alerts (gentle chime)
- "Time to Move!" modal with movement prompts
- Encourages walking, stretching, and eye rest

### 🎨 Beautiful Design
- Clean, minimalist black & white interface
- Dark/Light/System theme support
- Smooth animations with Framer Motion
- Mobile-responsive design

### 📱 PWA - Works Offline
- Installable on desktop and mobile
- Works offline with service worker
- Native-like app experience
- No app store required

### ⌨️ Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Space` | Start / Pause timer |
| `R` | Reset timer |
| `S` | Skip to break |

### 💾 Persistent State
- Timer state saved to localStorage
- Settings persist across sessions
- Resume timer after page refresh

---

## Screenshots

<p align="center">
  <img src="/screenshot1.png" alt="Focus Timer - Desktop" width="400" />
</p>
<p align="center"><em>Focus Timer - Desktop</em></p>

<p align="center">
  <img src="/screenshot2.png" alt="Settings Modal - Desktop" width="400" />
</p>
<p align="center"><em>Settings Modal - Desktop</em></p>

<p align="center">
  <img src="/screenshot3.png" alt="Break Modal - Desktop" width="400" />
</p>
<p align="center"><em>Break Modal - Desktop</em></p>

<p align="center">
  <img src="/screenshot4.png" alt="Focus Timer - Mobile" width="200" />
  <img src="/screenshot5.png" alt="Settings Modal - Mobile" width="200" />
  <img src="/screenshot6.png" alt="Break Modal - Mobile" width="200" />
</p>
<p align="center"><em>Mobile Views (Timer, Settings, Break Modal)</em></p>

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/alanvarghesepaul22/tab.git
cd tab

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## PWA Installation

### Desktop (Chrome/Edge)

1. Look for the install icon in the address bar
2. Click "Install TAB!"
3. Or go to ⋯ menu → "Install TAB!"

### Mobile (iOS Safari / Android Chrome)

1. Tap the Share button (iOS) or ⋮ menu (Android)
2. Tap "Add to Home Screen" or "Install App"
3. TAB! will appear as a standalone app

### Benefits of PWA

- **Works Offline**: Timer continues even without internet
- **App-like Experience**: Full-screen, no browser chrome
- **Fast Loading**: Cached locally for instant access
- **No App Store**: Direct installation, no reviews needed

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` | Start or Pause the timer |
| `R` | Reset the current timer |
| `S` | Skip to break mode |

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **PWA**: [next-pwa](https://github.com/shadowwalker/next-pwa)
- **Language**: TypeScript

---

## License

MIT License - feel free to use, modify, and distribute.

---

<p align="center">
  Built with ❤️ for developers who care about their health
</p>
