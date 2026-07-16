import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AcademicJourney.module.css';
import { getText, getAll } from '../../content/contentLoader.js';

// Shared with Resume — code-split so the PDF viewer (and the file it loads)
// is only fetched once a preview is actually opened.
const PDFViewer = lazy(() => import('../shared/PDFViewer.jsx'));
const FullscreenPDFModal = lazy(() => import('../shared/FullscreenPDFModal.jsx'));

gsap.registerPlugin(ScrollTrigger);

// ── Data — all editable values come from content.html ────────────────────────
const ACADEMIC_SUBTITLE = getText('[data-list="academicJourney"] [data-field="academicSubtitle"]');

const ACADEMIC_JOURNEY = getAll('[data-list="academicJourney"] [data-item="semester-entry"]').map((entry) => {
  const sgpaRaw = getText('[data-field="semSgpa"]', entry).trim();
  const cgpaRaw = getText('[data-field="semCgpa"]', entry).trim();
  const marksheetUrl      = getText('[data-field="semMarksheetUrl"]',      entry).trim() || null;
  const marksheetFilename = getText('[data-field="semMarksheetFilename"]', entry).trim() || null;
  return {
    id:               getText('[data-field="semId"]',     entry),
    semester:         parseInt(getText('[data-field="semNumber"]', entry), 10),
    sgpa:             sgpaRaw ? parseFloat(sgpaRaw) : null,
    cgpa:             cgpaRaw ? parseFloat(cgpaRaw) : null,
    status:           getText('[data-field="semStatus"]', entry),
    subjects:         getAll('[data-item="semSubject"]', entry).map((el) => el.textContent.trim()),
    marksheetUrl,
    marksheetFilename,
  };
});

// ── SemesterCard ──────────────────────────────────────────────────────────────
const SemesterCard = ({ data, onOpenFullscreen }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [showInlinePreview, setShowInlinePreview] = useState(false);

  const isCompleted = data.status === 'completed';

  // Mouse-follow glow — same interaction used on Clubs & Certificates cards.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
      if (glowRef.current) glowRef.current.style.opacity = '1';
    };
    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };
    card.addEventListener('mousemove', onMove, { passive: true });
    card.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className={styles.card} ref={cardRef}>
      <div className={styles.cardGlow} ref={glowRef} />

      <div className={styles.cardHeader}>
        <div className={styles.semBadge}>
          <span className={styles.semBadgeNum}>{data.semester}</span>
          <span className={styles.semBadgeLabel}>SEM</span>
        </div>

        <span className={`${styles.statusPill} ${isCompleted ? styles.statusCompleted : styles.statusUpcoming}`}>
          {isCompleted ? 'Completed' : 'Upcoming'}
        </span>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{data.sgpa ?? '—'}</span>
          <span className={styles.statLabel}>SGPA</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statValue}>{data.cgpa ?? '—'}</span>
          <span className={styles.statLabel}>CGPA</span>
        </div>
      </div>

      <div className={styles.subjectsWrap}>
        <span className={styles.subjectsLabel}>Subjects</span>
        <div className={styles.tagsList}>
          {data.subjects.map((subject) => (
            <span key={subject} className={styles.tag}>{subject}</span>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          disabled={!isCompleted}
          onClick={() => onOpenFullscreen(data)}
        >
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          View Marksheet
        </button>

        <button
          className={styles.actionBtnGhost}
          disabled={!isCompleted}
          onClick={() => setShowInlinePreview((v) => !v)}
          aria-expanded={showInlinePreview}
        >
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {showInlinePreview ? 'Hide Preview' : 'PDF Preview'}
        </button>
      </div>

      {/* Inline preview — animated grid-rows track, iframe mounts (and the
          PDF only downloads) once actually expanded. */}
      {isCompleted && (
        <div className={`${styles.inlinePreviewTrack} ${showInlinePreview ? styles.inlinePreviewOpen : ''}`}>
          <div className={styles.inlinePreviewInner}>
            {showInlinePreview && (
              <Suspense fallback={<div className={styles.viewerLoading}>Loading preview…</div>}>
                <PDFViewer
                  src={data.marksheetUrl}
                  title={`Semester ${data.semester} marksheet inline preview`}
                  className={styles.inlineIframe}
                />
              </Suspense>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── AcademicJourney — main section ───────────────────────────────────────────
const AcademicJourney = () => {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const [fullscreenSem, setFullscreenSem] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(
      `.${styles.card}`,
      { opacity: 0, y: 50, scale: 0.94 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  return (
    <section id="academic-journey" className={styles.section} ref={sectionRef}>
      <div className="section-container">
        <div className={styles.head} ref={headRef}>
          <h2 className={styles.eyebrow}>Academic Journey</h2>
          <p className={styles.title}>
            Semester-wise <span className="gradient-text">Progress</span>
          </p>
          <p className={styles.subtitle}>
            {ACADEMIC_SUBTITLE}
          </p>
        </div>

        <div className={styles.grid}>
          {ACADEMIC_JOURNEY.map((data) => (
            <SemesterCard key={data.id} data={data} onOpenFullscreen={setFullscreenSem} />
          ))}
        </div>
      </div>

      {fullscreenSem && (
        <Suspense fallback={null}>
          <FullscreenPDFModal
            src={fullscreenSem.marksheetUrl}
            label={`Semester ${fullscreenSem.semester} Marksheet`}
            filename={fullscreenSem.marksheetFilename}
            onClose={() => setFullscreenSem(null)}
          />
        </Suspense>
      )}
    </section>
  );
};

export default React.memo(AcademicJourney);
