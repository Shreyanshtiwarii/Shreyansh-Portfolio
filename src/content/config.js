// ─────────────────────────────────────────────────────────────────────────────
// App configuration
// ─────────────────────────────────────────────────────────────────────────────

/** Lenis smooth-scroll settings */
export const LENIS_CONFIG = {
  duration:        1.15,
  easing:          (t) => 1 - Math.pow(1 - t, 3),
  smoothWheel:     true,
  wheelMultiplier: 1,
  touchMultiplier: 1.1,
};

/** GSAP build chunk names (mirrors vite.config.js manualChunks) */
export const CHUNK_NAMES = {
  THREE_CORE:  'three-core',
  THREE_FIBER: 'three-fiber',
  GSAP:        'gsap',
  LENIS:       'lenis',
};

/** Character model path (served from /public/assets/models/) */
export const CHARACTER_MODEL_PATH = 'public/assets/models/character.glb';

/** Public document paths */
export const DOCUMENT_PATHS = {
  RESUME:      '/assets/documents/resume/resume-placeholder.pdf',
  MARKSHEET:   '/assets/documents/results/marksheet-placeholder.pdf',
};
