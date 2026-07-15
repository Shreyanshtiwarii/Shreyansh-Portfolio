import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Achievements.module.css';

gsap.registerPlugin(ScrollTrigger);

// ── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  {
    id: 'projects',
    value: 10,
    suffix: '+',
    label: 'Projects Built',
    sub: 'Full-stack & systems',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.35)',
  },
  {
    id: 'certificates',
    value: 15,
    suffix: '+',
    label: 'Certificates',
    sub: 'Google Cloud & more',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15l-3 3 1-4-3.5-3 4.5-.5L12 7l1 3.5 4.5.5L14 14l1 4-3-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.35)',
  },
  {
    id: 'hackathons',
    value: 5,
    suffix: '+',
    label: 'Hackathons',
    sub: 'Competed & presented',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#10b981',
    glow: 'rgba(16,185,129,0.35)',
  },
  {
    id: 'coding',
    value: 200,
    suffix: '+',
    label: 'Coding Problems',
    sub: 'DSA & competitive',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 6l-4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.35)',
  },
  {
    id: 'events',
    value: 10,
    suffix: '+',
    label: 'Events Organized',
    sub: 'GDG, Cloud Jams',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.35)',
  },
  {
    id: 'skills',
    value: 12,
    suffix: '+',
    label: 'Technologies',
    sub: 'Cloud, Web, Security',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.35)',
  },
];

// ── useCountUp ────────────────────────────────────────────────────────────────
// Counts from 0 → target when `active` flips to true.
const useCountUp = (target, active, duration = 2000) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return count;
};

// ── StatCard ──────────────────────────────────────────────────────────────────
const StatCard = ({ stat, active, index }) => {
  const count = useCountUp(stat.value, active, 1800 + index * 120);
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  // Mouse-tracking glow
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
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
      style={{ '--accent': stat.color, '--glow': stat.glow }}
    >
      {/* Mouse-follow glow */}
      <div className={styles.cardGlow} ref={glowRef} />

      {/* Animated border gradient */}
      <div className={styles.cardBorder} />

      <div className={styles.cardInner}>
        {/* Icon */}
        <div className={styles.iconWrap} style={{ color: stat.color }}>
          {stat.icon}
          <div className={styles.iconGlow} style={{ background: stat.glow }} />
        </div>

        {/* Counter */}
        <div className={styles.counterWrap}>
          <span className={styles.counter} style={{ color: stat.color }}>
            {count}
          </span>
          <span className={styles.suffix} style={{ color: stat.color }}>
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <div className={styles.label}>{stat.label}</div>
        <div className={styles.sub}>{stat.sub}</div>

        {/* Progress bar — fills on count-up */}
        <div className={styles.barTrack}>
          <div
            className={styles.barFill}
            style={{
              width: active ? '100%' : '0%',
              background: stat.color,
              boxShadow: `0 0 10px ${stat.glow}`,
              transitionDelay: `${index * 0.1}s`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ── Achievements ──────────────────────────────────────────────────────────────
const Achievements = () => {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const [active, setActive] = useState(false);

  // Section entrance + trigger count-up via IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;

    // GSAP entrance for heading
    gsap.fromTo(
      headRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    // Cards stagger
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

    // Start count-up when section is 60% visible
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="achievements" className={styles.section} ref={sectionRef}>
      <div className="section-container">
        {/* Heading */}
        <div className={styles.head} ref={headRef}>
          <h2 className={styles.eyebrow}>Achievements</h2>
          <p className={styles.title}>
            By the <span className="gradient-text">Numbers</span>
          </p>
          <p className={styles.subtitle}>
            A snapshot of what I've built, learned, and contributed.
          </p>
        </div>

        {/* Stats grid */}
        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} active={active} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Achievements);
