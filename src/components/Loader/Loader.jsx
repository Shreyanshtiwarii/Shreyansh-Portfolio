import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Loader.module.css';

const LOAD_DURATION = 1600; // ms, kept under 2 seconds

const Loader = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        if (onComplete) onComplete();
      },
    });

    tl.to(barRef.current, {
      width: '100%',
      duration: LOAD_DURATION / 1000,
      ease: 'power2.inOut',
    }).to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    return () => tl.kill();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className={styles.overlay} ref={overlayRef}>
      <div className={styles.content}>
        <p className={styles.name}>
          Shreyansh <span className="gradient-text">Tiwari</span>
        </p>
        <p className={styles.status}>Loading...</p>
        <div className={styles.barTrack}>
          <div className={styles.barFill} ref={barRef} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
