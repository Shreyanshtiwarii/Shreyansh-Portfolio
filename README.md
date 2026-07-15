# Shreyansh Tiwari — Portfolio (Frontend)

A static, frontend-only portfolio built with React + Vite, Three.js, and GSAP.

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — build tool & dev server
- **Three.js / @react-three/fiber / @react-three/drei** — 3-D scenes & character
- **GSAP + ScrollTrigger** — scroll-driven animations
- **Lenis** — smooth inertial scrolling
- **CSS Modules** — scoped component styles

## Getting Started

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## Project Structure

```
frontend/
├── public/
│   └── assets/
│       ├── models/            # .glb 3-D model files
│       └── documents/         # PDFs served at runtime
│           ├── resume/        # Resume PDF(s)
│           └── results/       # Marksheets / academic results PDFs
│
├── src/
│   ├── components/      # All UI components (each in its own folder with CSS Module)
│   │   └── shared/      # Reusable cross-section components (PDFViewer, FullscreenPDFModal)
│   ├── pages/           # Page-level components (Home.jsx)
│   ├── hooks/           # Custom React hooks (useSmoothScroll)
│   ├── services/        # Business-logic modules (assistantEngine)
│   ├── content/         # Static content: data, constants, config, and the assistant knowledge base
│   ├── animations/      # Shared GSAP animation helpers
│   ├── styles/          # Global CSS and CSS custom properties
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
│
├── index.html
├── vite.config.js
└── package.json
```

## Adding Real Assets

| Asset          | Where to put it                              |
|----------------|----------------------------------------------|
| Resume PDF     | `public/assets/documents/resume/` → update `DOCUMENT_PATHS.RESUME` in `src/content/config.js` |
| Marksheets     | `public/assets/documents/results/` → update `marksheetUrl` in `src/content/academicJourney.js`  |
| 3-D models     | `public/assets/models/`   → update `CHARACTER_MODEL_PATH` in `src/content/config.js`   |
