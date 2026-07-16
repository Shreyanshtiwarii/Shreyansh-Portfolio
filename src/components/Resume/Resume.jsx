import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Resume.module.css';
import { getAttr, getText } from '../../content/contentLoader.js';

// The actual <iframe> embed is code-split — it (and the PDF it requests)
// is only ever loaded once the person opens the inline or fullscreen preview.
const PDFViewer = lazy(() => import('../shared/PDFViewer.jsx'));
// Fullscreen modal is shared with other PDF-backed sections (e.g. Academic
// Journey's marksheet preview) instead of each section rolling its own.
const FullscreenPDFModal = lazy(() => import('../shared/FullscreenPDFModal.jsx'));

gsap.registerPlugin(ScrollTrigger);

// Owner name from content.html — used in the resume card header.
const OWNER_NAME = getText('[data-field="name"] [data-field="fullName"]');

// Resume path and download filename from content.html — edit the resumePath
// href and data-field-filename attribute there, not here.
const RESUME_SRC = getAttr(
  '[data-field="resume"] [data-field="resumePath"]',
  'href'
) || '/assets/documents/resume/resume-placeholder.pdf';

const RESUME_FILENAME =
  getAttr('[data-field="resume"] [data-field="resumePath"]', 'data-field-filename') ||
  'Shreyansh_Tiwari_Resume.pdf';

// ─────────────────────────────────────────────────────────────────────────────
// Resume — main section
// ─────────────────────────────────────────────────────────────────────────────
const Resume = () => {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cardRef = useRef(null);
  const [showInlinePreview, setShowInlinePreview] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  return (
    <section id="resume" className={styles.section} ref={sectionRef}>
      <div className="section-container">
        <div className={styles.head} ref={headRef}>
          <h2 className={styles.eyebrow}>Resume</h2>
          <p className={styles.title}>
            My <span className="gradient-text">Resume</span>
          </p>
          <p className={styles.subtitle}>
            Preview it right here, or grab a copy for your records.
          </p>
        </div>

        <div className={styles.card} ref={cardRef}>
          <div className={styles.cardTop}>
            <div className={styles.coverThumb}>
              <div className={styles.coverGrid} />
              <svg viewBox="0 0 24 24" fill="none" className={styles.coverIcon}>
                <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M9 12h6M9 15h6M9 9h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>

            <div className={styles.cardInfo}>
              <h3 className={styles.cardName}>{OWNER_NAME}</h3>
              <p className={styles.cardRole}>Software Engineer &middot; Full-Stack &amp; Cloud</p>
              <p className={styles.cardNote}>PDF &middot; Updated 2026 &middot;</p>

              <div className={styles.actions}>
                <a
                  className={styles.downloadBtn}
                  href={RESUME_SRC}
                  download={RESUME_FILENAME}
                >
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M12 3v13m0 0l-4.5-4.5M12 16l4.5-4.5M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Resume
                </a>

                <button
                  className={styles.previewBtn}
                  onClick={() => setShowInlinePreview((v) => !v)}
                  aria-expanded={showInlinePreview}
                >
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                  {showInlinePreview ? 'Hide Preview' : 'Preview Resume'}
                </button>

                <button
                  className={styles.fullscreenBtn}
                  onClick={() => setShowFullscreen(true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M16 21h3a2 2 0 002-2v-3M8 21H5a2 2 0 01-2-2v-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Fullscreen
                </button>
              </div>
            </div>
          </div>

          {/* Inline preview — animated open/close via CSS grid-rows so no
              height measuring is needed; the iframe itself only mounts (and
              the PDF only starts downloading) once expanded. */}
          <div className={`${styles.inlinePreviewTrack} ${showInlinePreview ? styles.inlinePreviewOpen : ''}`}>
            <div className={styles.inlinePreviewInner}>
              {showInlinePreview && (
                <Suspense fallback={<div className={styles.viewerLoading}>Loading preview…</div>}>
                  <PDFViewer src={RESUME_SRC} title="Resume inline preview" className={styles.inlineIframe} />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>

      {showFullscreen && (
        <Suspense fallback={null}>
          <FullscreenPDFModal
            src={RESUME_SRC}
            label="Resume Preview"
            filename={RESUME_FILENAME}
            onClose={() => setShowFullscreen(false)}
          />
        </Suspense>
      )}
    </section>
  );
};

export default React.memo(Resume);
