import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';

// Elements that should trigger the "interactive" (enlarged) cursor state.
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, [data-cursor="interactive"]';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Detect touch / coarse-pointer devices (mobile & tablets) and bail out
    // entirely so nothing is rendered, attached, or altered on mobile.
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const noHover = window.matchMedia('(hover: none)').matches;
    const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (coarsePointer || noHover || touchCapable) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const quickDotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const quickDotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const quickRingX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const quickRingY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      dotPos.x = e.clientX;
      dotPos.y = e.clientY;
      ringPos.x = e.clientX;
      ringPos.y = e.clientY;

      quickDotX(dotPos.x);
      quickDotY(dotPos.y);
      quickRingX(ringPos.x);
      quickRingY(ringPos.y);
    };

    const handleMouseEnterInteractive = () => {
      gsap.to(ring, { scale: 1.8, duration: 0.35, ease: 'power3.out' });
      gsap.to(dot, { scale: 0.4, duration: 0.35, ease: 'power3.out' });
      ring.classList.add(styles.ringActive);
    };

    const handleMouseLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power3.out' });
      gsap.to(dot, { scale: 1, duration: 0.35, ease: 'power3.out' });
      ring.classList.remove(styles.ringActive);
    };

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.2, ease: 'power2.out' });
    };

    const handleMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
    };

    // Delegate hover detection so it keeps working for elements added later.
    const handleDelegatedOver = (e) => {
      const target = e.target.closest(INTERACTIVE_SELECTOR);
      if (target) handleMouseEnterInteractive();
    };
    const handleDelegatedOut = (e) => {
      const target = e.target.closest(INTERACTIVE_SELECTOR);
      const related = e.relatedTarget && e.relatedTarget.closest
        ? e.relatedTarget.closest(INTERACTIVE_SELECTOR)
        : null;
      if (target && !related) handleMouseLeaveInteractive();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleDelegatedOver, { passive: true });
    document.addEventListener('mouseout', handleDelegatedOut, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnterWindow, { passive: true });

    setIsReady(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleDelegatedOver);
      document.removeEventListener('mouseout', handleDelegatedOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div className={`${styles.ring} ${isReady ? styles.visible : ''}`} ref={ringRef} />
      <div className={`${styles.dot} ${isReady ? styles.visible : ''}`} ref={dotRef} />
    </>
  );
};

export default React.memo(CustomCursor);
