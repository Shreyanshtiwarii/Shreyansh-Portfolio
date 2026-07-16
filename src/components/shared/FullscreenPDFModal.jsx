import React, { lazy, Suspense, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import styles from './FullscreenPDFModal.module.css';

// Code-split, native <iframe>-based viewer — only fetched once a preview
// is actually opened. Shared by every section that offers a PDF preview.
const PDFViewer = lazy(() => import('./PDFViewer.jsx'));

// ─────────────────────────────────────────────────────────────────────────────
// FullscreenPDFModal — reusable overlay/modal for previewing any PDF fullscreen.
// Mirrors the blurred-backdrop, scale-in, Esc-to-close pattern first used by
// the Certificates preview popup, generalized so Resume, Academic Journey,
// and any future PDF-backed section can share one implementation instead of
// each rolling its own modal.
// ─────────────────────────────────────────────────────────────────────────────
const FullscreenPDFModal = ({ src, label, filename, onClose }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(modalRef.current,
      { opacity: 0, scale: 0.94, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(modalRef.current, { opacity: 0, scale: 0.96, y: 16, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  // Rendered via a portal straight onto <body>. Each section that opens this
  // modal (Resume, Academic Journey) has `position: relative; z-index: 10`
  // on its own <section>, which creates a CSS stacking context -- so this
  // modal's `z-index: 1000` was only ever being compared against other
  // children of that section, never against the fixed Navbar (z-index: 100),
  // which lives in a separate top-level stacking context. The Navbar was
  // winning by default and covering the modal's top bar (Download/Close),
  // even though 1000 > 100 on paper. A portal makes this a true top-level
  // sibling of the Navbar so its z-index is finally compared where it
  // actually matters.
  return createPortal(
    <div className={styles.overlay} ref={overlayRef} onClick={handleClose}>
      <div
        className={styles.modal}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        <div className={styles.topBar}>
          <span className={styles.topBarTitle}>{label}</span>
          <div className={styles.topBarActions}>
            {filename && (
              <a className={styles.downloadBtn} href={src} download={filename}>
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                  <path d="M12 3v13m0 0l-4.5-4.5M12 16l4.5-4.5M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={styles.downloadBtnText}>Download</span>
              </a>
            )}
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close preview">
              <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>

        <div className={styles.viewerWrap}>
          <Suspense fallback={<div className={styles.viewerLoading}>Loading preview…</div>}>
            <PDFViewer src={src} title={label} className={styles.iframe} />
          </Suspense>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FullscreenPDFModal;
