import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Clubs.module.css';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Club / organization data — swap `logo` (placeholder svg) for a real image
// or crest when available.
// ─────────────────────────────────────────────────────────────────────────────
const CLUBS = [
  {
    id: 'gdg-aitr',
    name: 'GDG On Campus AITR',
    role: 'Core Team Member',
    duration: '2023 — Present',
    description:
      'Part of the organizing core for Google Developer Groups on Campus, helping plan technical sessions and community-driven developer events.',
    tags: ['Community Building', 'Event Planning', 'Public Speaking'],
    accent: '#4f9eff',
    logo: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="12" r="3.2" stroke="#ea4335" strokeWidth="1.6" />
        <circle cx="14.5" cy="7" r="3.2" stroke="#4285f4" strokeWidth="1.6" />
        <circle cx="14.5" cy="17" r="3.2" stroke="#34a853" strokeWidth="1.6" />
        <circle cx="20" cy="12" r="2" stroke="#fbbc05" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: 'gcp-arcade',
    name: 'Google Cloud Arcade',
    role: 'Active Participant',
    duration: '2024 — Present',
    description:
      'Participating in Google Cloud Arcade, completing hands-on labs and skill badges to build practical, real-world cloud engineering experience.',
    tags: ['Google Cloud', 'Hands-on Labs', 'Skill Badges'],
    accent: '#34a853',
    logo: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="7" width="18" height="12" rx="2.5" stroke="#34a853" strokeWidth="1.6" />
        <path d="M8 7V5.5a2 2 0 012-2h4a2 2 0 012 2V7" stroke="#34a853" strokeWidth="1.6" />
        <circle cx="8.5" cy="13" r="1.3" fill="#34a853" />
        <circle cx="15.5" cy="13" r="1.3" fill="#34a853" />
      </svg>
    ),
  },
  {
    id: 'codespire',
    name: 'CodeSpire Organizing Team',
    role: 'Organizing Committee Member',
    duration: '2024 — Present',
    description:
      'Helping coordinate CodeSpire, a coding and hackathon-style initiative — covering logistics, participant outreach, and on-ground event execution.',
    tags: ['Hackathon Ops', 'Team Coordination', 'Outreach'],
    accent: '#8b5cf6',
    logo: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 6l-4 12" stroke="#8b5cf6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'cloud-jam',
    name: 'Cloud Jam Organizer',
    role: 'Event Organizer',
    duration: '2024',
    description:
      'Organized Cloud Study Jam sessions, guiding peers through Google Cloud labs and helping them earn skill badges as a group.',
    tags: ['Google Cloud', 'Mentorship', 'Workshop Facilitation'],
    accent: '#f59e0b',
    logo: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="18" height="15" rx="2" stroke="#f59e0b" strokeWidth="1.6" />
        <path d="M3 10h18M8 3v4M16 3v4" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

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
            Roles and initiatives where I've helped build and grow developer communities.
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
