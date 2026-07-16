import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Clubs.module.css';
import { getText, getAll } from '../../content/contentLoader.js';

gsap.registerPlugin(ScrollTrigger);

// ── Club logos — visual design only, NOT editable content.
// Keyed by clubId so the correct SVG is paired with each content.html entry.
const CLUB_LOGOS = {
  'gdg-aitr': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="12" r="3.2" stroke="#ea4335" strokeWidth="1.6" />
      <circle cx="14.5" cy="7" r="3.2" stroke="#4285f4" strokeWidth="1.6" />
      <circle cx="14.5" cy="17" r="3.2" stroke="#34a853" strokeWidth="1.6" />
      <circle cx="20" cy="12" r="2" stroke="#fbbc05" strokeWidth="1.6" />
    </svg>
  ),
  'gcp-arcade': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="7" width="18" height="12" rx="2.5" stroke="#34a853" strokeWidth="1.6" />
      <path d="M8 7V5.5a2 2 0 012-2h4a2 2 0 012 2V7" stroke="#34a853" strokeWidth="1.6" />
      <circle cx="8.5" cy="13" r="1.3" fill="#34a853" />
      <circle cx="15.5" cy="13" r="1.3" fill="#34a853" />
    </svg>
  ),
  'codespire': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 6l-4 12" stroke="#8b5cf6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'cloud-jam': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="15" rx="2" stroke="#f59e0b" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

const DEFAULT_CLUB_LOGO = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// ── Data — all editable text/values come from content.html ───────────────────
const CLUBS_SUBTITLE = getText('[data-list="clubs"] [data-field="clubsSubtitle"]');

const CLUBS = getAll('[data-list="clubs"] [data-item="club-entry"]').map((entry) => {
  const id = getText('[data-field="clubId"]', entry);
  return {
    id,
    name:        getText('[data-field="clubName"]',        entry),
    role:        getText('[data-field="clubRole"]',        entry),
    duration:    getText('[data-field="clubDuration"]',    entry),
    description: getText('[data-field="clubDescription"]', entry),
    tags:        getAll('[data-item="clubTag"]', entry).map((el) => el.textContent.trim()),
    accent:      getText('[data-field="clubAccent"]',      entry),
    logo:        CLUB_LOGOS[id] || DEFAULT_CLUB_LOGO,
  };
});

// ── ClubCard ────────────────────────────────────────────────────────────────
const ClubCard = ({ club }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  // Mouse-follow glow, mirrors the interaction used on Certificates cards
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
    <div
      className={styles.card}
      ref={cardRef}
      style={{ '--accent': club.accent }}
    >
      <div
        className={styles.cardGlow}
        ref={glowRef}
        style={{ background: `radial-gradient(200px circle at var(--mx,50%) var(--my,50%), ${club.accent}28, transparent 70%)` }}
      />

      <div className={styles.cardHeader}>
        <div className={styles.logoWrap}>
          <div className={styles.logoIcon}>{club.logo}</div>
          <div className={styles.logoPulse} style={{ background: club.accent }} />
        </div>
        <div className={styles.headerText}>
          <h3 className={styles.clubName}>{club.name}</h3>
          <span className={styles.role} style={{ color: club.accent }}>{club.role}</span>
        </div>
      </div>

      <div className={styles.durationRow}>
        <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 9h18M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span>{club.duration}</span>
      </div>

      <p className={styles.description}>{club.description}</p>

      <div className={styles.tagsList}>
        {club.tags.map((tag) => (
          <span key={tag} className={styles.tag} style={{ borderColor: `${club.accent}40`, color: club.accent, background: `${club.accent}14` }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Clubs & Leadership — main section ────────────────────────────────────────
const Clubs = () => {
  const sectionRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      headRef.current,
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
    <section id="clubs" className={styles.section} ref={sectionRef}>
      <div className="section-container">
        <div className={styles.head} ref={headRef}>
          <h2 className={styles.eyebrow}>Clubs & Leadership</h2>
          <p className={styles.title}>
            Community & <span className="gradient-text">Leadership</span>
          </p>
          <p className={styles.subtitle}>
            {CLUBS_SUBTITLE}
          </p>
        </div>

        <div className={styles.grid}>
          {CLUBS.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Clubs);
