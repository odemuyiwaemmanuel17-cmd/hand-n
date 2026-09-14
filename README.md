# HandyTrust — Escrow-backed Home Maintenance Platform

An interactive 3D scrollytelling experience built with React, Three.js, and Vite.

## Features

- **Interactive 3D Scene**: Scroll-responsive 3D objects powered by Three.js
- **Responsive Design**: Optimized for all devices with smooth animations
- **Escrow-backed Payments**: Transparent, secure transactions
- **Modern Tech Stack**: React 18, Three.js, Tailwind CSS, Vite

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

Visit `http://localhost:5173` to see the interactive experience.

## Deployment

The site is deployed on Vercel at https://handytrust.vercel.app

## Tech Stack

- **Frontend**: React 18 + Vite
- **3D Graphics**: Three.js with React Three Fiber
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI concepts
- **Animation**: Framer Motion principles

## Project Structure

```
src/
├── components/
│   ├── ScrollytellingExperience.jsx  # 3D canvas and scene
│   └── OverlayUI.jsx                 # Header, nav, content sections
├── App.jsx                           # Main app wrapper
├── main.jsx                          # Entry point
├── index.css                         # Global styles
└── store.js                          # Shared state
```

## Performance Optimizations

- Simplified 3D geometries for faster rendering
- Throttled scroll events
- High-performance GPU rendering mode
- Adaptive pixel density (DPR)
- Preloaded assets

## Contact

For inquiries or support, visit [handytrust.vercel.app](https://handytrust.vercel.app)
