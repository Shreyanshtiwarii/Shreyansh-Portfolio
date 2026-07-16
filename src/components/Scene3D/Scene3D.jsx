import React, { forwardRef } from 'react';
import styles from './Scene3D.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// Scene3D — Lightweight static image wrapper with forwarded ref for GSAP scroll.
// ─────────────────────────────────────────────────────────────────────────────
const Scene3D = forwardRef((props, ref) => {
  return (
    <div ref={ref} className={styles.canvasWrapper}>
      <img
        src="/assets/images/hero-character.png"
        alt="Developer character"
        className={styles.heroImage}
      />
    </div>
  );
});

Scene3D.displayName = 'Scene3D';
export default Scene3D;
