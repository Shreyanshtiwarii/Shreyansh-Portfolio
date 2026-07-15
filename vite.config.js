import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    // esnext keeps modern syntax (smaller output, no legacy transpile bloat)
    // since we only need to support current evergreen browsers for a WebGL
    // heavy site anyway.
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    // Skip the (slow, purely informational) gzip-size report during build;
    // doesn't affect the emitted files, only build time.
    reportCompressedSize: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Keep heavy, rarely-changing libraries in their own chunks so
        // browsers can cache them independently of app code and avoid
        // re-downloading three.js / fiber / drei on every deploy. Splitting
        // three's ecosystem from gsap/lenis further isolates cache
        // invalidation -- touching app code no longer busts vendor chunks.
        manualChunks: {
          'three-core': ['three'],
          'three-fiber': ['@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
          lenis: ['lenis'],
        }
      }
    }
  },
  esbuild: {
    // Removes console.* / debugger from the production build only; dev
    // builds are untouched so local debugging still works normally.
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  }
});
