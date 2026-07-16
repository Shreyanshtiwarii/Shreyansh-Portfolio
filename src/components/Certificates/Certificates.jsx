import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Certificates.module.css';
import { getText, getAll, getAttr } from '../../content/contentLoader.js';

gsap.registerPlugin(ScrollTrigger);

// Owner name from content.html — shown on the certificate mockup visual.
const OWNER_NAME = getText('[data-field="name"] [data-field="fullName"]');

// ── Certificate logos — visual design only, NOT editable content.
// Keyed by certId so the correct SVG is paired with each content.html entry.
const CERT_LOGOS = {
  'gcp-ace': (accent) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'gcp-arcade': (accent) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={accent} strokeWidth="1.6"/>
      <path d="M8 12l3 3 5-5" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'cybersec': (accent) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.25C16.5 22.15 20 17.25 20 12V6l-8-4z" stroke={accent} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'react-cert': (accent) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2.5" stroke={accent} strokeWidth="1.6"/>
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke={accent} strokeWidth="1.6"/>
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" stroke={accent} strokeWidth="1.6"/>
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" stroke={accent} strokeWidth="1.6"/>
    </svg>
  ),
  'java-cert': (accent) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 17s-1 .3-1.6.7C6 18.3 8 19 11 19s5-.7 4.1-1.3c-.6-.4-1.6-.7-1.6-.7M8 15.5s-1.1.4-1.8.9c-.9.6 1.1 1.3 4.8 1.3 3.7 0 5.7-.7 4.8-1.3-.7-.5-1.8-.9-1.8-.9" stroke={accent} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M11.5 3C8 5.5 10 8 10 8s-3-.5-3 2.5c0 2 2 2.5 2 2.5s-3 .5-3 3" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 5.5C15 7 14 8.5 14 8.5s2.5.5 2.5 2.5c0 1.5-1.5 2.5-1.5 2.5" stroke={accent} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  'devops': (accent) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="8" width="18" height="11" rx="2" stroke={accent} strokeWidth="1.6"/>
      <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" stroke={accent} strokeWidth="1.6"/>
      <path d="M12 12v4M10 14h4" stroke={accent} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
};

const DEFAULT_CERT_LOGO = (accent) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke={accent} strokeWidth="1.6"/>
    <path d="M7 9h10M7 13h6" stroke={accent} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

// ── Data — all editable text/values come from content.html ───────────────────
const CERTIFICATES = getAll('[data-list="cert-entries"] [data-item="cert-entry"]').map((entry) => {
  const id     = getText('[data-field="certId"]',       entry);
  const accent = getText('[data-field="certAccent"]',   entry);
  return {
    id,
    title:         getText('[data-field="certTitle"]',        entry),
    issuer:        getText('[data-field="certIssuer"]',       entry),
    date:          getText('[data-field="certDate"]',         entry),
    category:      getText('[data-field="certCategory"]',     entry),
    categoryColor: getText('[data-field="certCategoryColor"]',entry),
    description:   getText('[data-field="certDescription"]',  entry),
    skills:        getAll('[data-item="certSkill"]', entry).map((el) => el.textContent.trim()),
    credentialId:  getText('[data-field="certCredentialId"]', entry),
    // Real uploaded certificate image (public/assets/documents/certificates/).
    // Falls back to '' when a cert has no <img data-field="certImage"> yet,
    // in which case the card/preview render the generated logo mockup below.
    image:         getAttr('[data-field="certImage"]', 'src', entry) || null,
    gradient:      getText('[data-field="certGradient"]',     entry),
    accent,
    logo:          (CERT_LOGOS[id] || DEFAULT_CERT_LOGO)(accent),
  };
});

const CATEGORIES = getAll('[data-list="cert-categories"] [data-item="cert-category"]')
  .map((el) => el.textContent.trim());

// ─────────────────────────────────────────────────────────────────────────────
// CertificatePreview — fullscreen popup
// ─────────────────────────────────────────────────────────────────────────────
const CertificatePreview = ({ cert, onClose }) => {
  const overlayRef = useRef(null);
  const modalRef   = useRef(null);

  // Animate in
  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(modalRef.current,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
    );
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Animate out then call onClose
  const handleClose = useCallback(() => {
    gsap.to(modalRef.current,   { opacity: 0, scale: 0.94, y: 20, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: onClose });
  }, [onClose]);

  // Esc key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={handleClose}>
      <div
        className={styles.modal}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Certificate: ${cert.title}`}
      >
        {/* Close button */}
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>

        {/* Certificate mockup image area */}
        <div className={styles.previewImg} style={{ background: cert.gradient }}>
          {/* Decorative grid */}
          <div className={styles.previewGrid} />

          {cert.image ? (
            <img
              src={cert.image}
              alt={`${cert.title} certificate`}
              className={styles.certPhoto}
            />
          ) : (
            /* Cert body */
            <div className={styles.certMockup}>
              <div className={styles.certLogoLarge}>{cert.logo}</div>
              <div className={styles.certMockupIssuer}>{cert.issuer}</div>
              <div className={styles.certMockupTitle}>{cert.title}</div>
              <div className={styles.certMockupLine} style={{ background: cert.accent }} />
              <div className={styles.certMockupName}>{OWNER_NAME}</div>
              <div className={styles.certMockupDate}>{cert.date}</div>
              <div className={styles.certMockupId}>Credential ID: {cert.credentialId}</div>

              {/* Corner seals */}
              <div className={styles.sealTL} style={{ borderColor: cert.accent }} />
              <div className={styles.sealTR} style={{ borderColor: cert.accent }} />
              <div className={styles.sealBL} style={{ borderColor: cert.accent }} />
              <div className={styles.sealBR} style={{ borderColor: cert.accent }} />
            </div>
          )}

          {/* Glow overlay */}
          <div className={styles.previewGlow} style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${cert.accent}22, transparent 70%)` }} />
        </div>

        {/* Info panel */}
        <div className={styles.modalInfo}>
          <div className={styles.modalMeta}>
            <span className={styles.modalCategory} style={{ color: cert.accent, borderColor: `${cert.accent}44`, background: `${cert.accent}12` }}>
              {cert.category}
            </span>
            <span className={styles.modalDate}>{cert.date}</span>
          </div>

          <h2 className={styles.modalTitle}>{cert.title}</h2>
          <p className={styles.modalIssuer}>Issued by {cert.issuer}</p>
          <p className={styles.modalDesc}>{cert.description}</p>

          <div className={styles.modalSkillsLabel}>Skills covered</div>
          <div className={styles.modalSkills}>
            {cert.skills.map((s) => (
              <span key={s} className={styles.modalSkill} style={{ borderColor: `${cert.accent}50`, color: cert.accent, background: `${cert.accent}10` }}>
                {s}
              </span>
            ))}
          </div>

          <div className={styles.modalId}>
            <span>Credential ID</span>
            <span className={styles.modalIdVal}>{cert.credentialId}</span>
          </div>

          <div className={styles.modalActions}>
            <button className={styles.verifyBtn} style={{ background: cert.accent }}>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6v6M20 4l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Verify Credential
            </button>
            <button className={styles.shareBtn} onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CertCard
// ─────────────────────────────────────────────────────────────────────────────
const CertCard = ({ cert, index, onPreview }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const shineRef = useRef(null);

  // Mouse-tracking tilt + glow
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);   // -1 → 1
      const dy = (e.clientY - cy) / (rect.height / 2);

      // 3-D tilt
      gsap.to(card, {
        rotateY:  dx * 10,
        rotateX: -dy * 8,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 900,
        transformOrigin: 'center center',
      });

      // glow follows cursor
      const mx = ((e.clientX - rect.left) / rect.width)  * 100;
      const my = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', `${mx}%`);
      card.style.setProperty('--my', `${my}%`);
      if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });

      // shine stripe
      if (shineRef.current) {
        shineRef.current.style.backgroundPosition = `${mx}% ${my}%`;
        gsap.to(shineRef.current, { opacity: 0.6, duration: 0.3 });
      }
    };

    const onLeave = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
      if (glowRef.current)  gsap.to(glowRef.current,  { opacity: 0, duration: 0.4 });
      if (shineRef.current) gsap.to(shineRef.current, { opacity: 0, duration: 0.4 });
    };

    card.addEventListener('mousemove', onMove, { passive: true });
    card.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      className={styles.card}
      ref={cardRef}
      style={{ '--accent': cert.accent }}
      onClick={() => onPreview(cert)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onPreview(cert)}
      aria-label={`View ${cert.title} certificate`}
    >
      {/* Mouse glow */}
      <div
        className={styles.cardGlow}
        ref={glowRef}
        style={{ background: `radial-gradient(200px circle at var(--mx,50%) var(--my,50%), ${cert.accent}30, transparent 70%)` }}
      />

      {/* Shine stripe */}
      <div className={styles.shine} ref={shineRef} />

      {/* Image area */}
      <div className={styles.imgArea} style={{ background: cert.gradient }}>
        {cert.image ? (
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            className={styles.certThumb}
            loading="lazy"
          />
        ) : (
          <>
            <div className={styles.imgGrid} />

            {/* Floating logo */}
            <div className={styles.logoWrap}>
              <div className={styles.logoIcon}>{cert.logo}</div>
              <div className={styles.logoPulse} style={{ background: cert.accent }} />
            </div>
          </>
        )}

        {/* Category pill */}
        <span
          className={styles.categoryPill}
          style={{ color: cert.accent, background: `${cert.accent}18`, borderColor: `${cert.accent}40` }}
        >
          {cert.category}
        </span>

        {/* Preview hint */}
        <div className={styles.previewHint}>
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path d="M15 3h6v6M14 10l7-7M10 14l-7 7M9 21H3v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Preview
        </div>

        {/* Accent line at bottom */}
        <div className={styles.imgAccentLine} style={{ background: cert.accent }} />
      </div>

      {/* Card body */}
      <div className={styles.cardBody}>
        <div className={styles.issuerRow}>
          <span className={styles.issuerText}>{cert.issuer}</span>
          <span className={styles.dateText}>{cert.date}</span>
        </div>

        <h3 className={styles.certTitle}>{cert.title}</h3>
        <p className={styles.certDesc}>{cert.description}</p>

        <div className={styles.skillsList}>
          {cert.skills.slice(0, 3).map((s) => (
            <span key={s} className={styles.skillTag}>{s}</span>
          ))}
          {cert.skills.length > 3 && (
            <span className={styles.skillMore}>+{cert.skills.length - 3}</span>
          )}
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.credId}>ID: {cert.credentialId}</span>
          <span className={styles.viewBtn} style={{ color: cert.accent }}>
            View Certificate →
          </span>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Certificates — main section
// ─────────────────────────────────────────────────────────────────────────────
const Certificates = () => {
  const sectionRef  = useRef(null);
  const headRef     = useRef(null);
  const [filter,    setFilter]    = useState('All');
  const [preview,   setPreview]   = useState(null);

  const filtered = filter === 'All'
    ? CERTIFICATES
    : CERTIFICATES.filter((c) => c.category === filter);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  // Re-animate cards when filter changes
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(`.${styles.card}`);
    if (!cards?.length) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
    );
  }, [filter]);

  return (
    <section id="certificates" className={styles.section} ref={sectionRef}>
      <div className="section-container">

        {/* Heading */}
        <div className={styles.head} ref={headRef}>
          <h2 className={styles.title}>
            My <span className="gradient-text">Certificates</span>
          </h2>
          <p className={styles.subtitle}>
            Credentials earned through coursework, bootcamps, and cloud programmes.
          </p>
        </div>

        {/* Filter bar */}
        <div className={styles.filterBar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.filterActive : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={i}
              onPreview={setPreview}
            />
          ))}
        </div>

      </div>

      {/* Preview popup */}
      {preview && (
        <CertificatePreview cert={preview} onClose={() => setPreview(null)} />
      )}
    </section>
  );
};

export default React.memo(Certificates);
