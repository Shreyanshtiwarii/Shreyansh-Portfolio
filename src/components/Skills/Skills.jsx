import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Skills.module.css';
import { getAll, getText } from '../../content/contentLoader.js';

gsap.registerPlugin(ScrollTrigger);

// Icons are visual design, not editable content, so they stay in code
// exactly as before -- only moved into a name-keyed lookup instead of being
// embedded inline in the (now content-driven) category array below.
const CATEGORY_ICONS = {
  Frontend: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4l16 2-1.5 14L12 22 5.5 20 4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 8h8m-8 4h6m-6 4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Backend: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="7" r="0.9" fill="currentColor" />
      <circle cx="7.5" cy="17" r="0.9" fill="currentColor" />
    </svg>
  ),
  Cloud: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 18a4 4 0 01-.5-7.97A5.5 5.5 0 0117 8.5a4.5 4.5 0 01-1 8.9H7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Cybersecurity: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3l7 3v5c0 4.5-3 7.7-7 10-4-2.3-7-5.5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.5 12l1.8 1.8L14.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Programming: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// Generic fallback icon, only used if content.html is edited to add a
// category name with no matching entry above -- keeps rendering safe
// without silently breaking the grid layout.
const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// Category names + skill lists now come from content.html; icons stay
// mapped by name so the visual design is unchanged.
const SKILL_CATEGORIES = getAll('[data-list="skills"] [data-item="skill-category"]').map(
  (category) => {
    const name = getText('[data-field="categoryName"]', category);
    return {
      name,
      icon: CATEGORY_ICONS[name] || DEFAULT_ICON,
      skills: Array.from(
        category.querySelectorAll('[data-list="skillNames"] [data-item="skillName"]')
      ).map((el) => el.textContent.trim()),
    };
  }
);

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (i % 3) * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className="section-container">
        <h2 className={styles.heading}>
          <span className="gradient-text">Skills</span>
        </h2>

        <div className={styles.grid}>
          {SKILL_CATEGORIES.map((category, index) => (
            <div
              key={category.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className={styles.card}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className={styles.cardGlow} />
              <div className={styles.cardInner}>
                <div className={styles.iconWrap}>{category.icon}</div>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <ul className={styles.skillList}>
                  {category.skills.map((skill) => (
                    <li key={skill} className={styles.skillItem}>
                      <span className={styles.skillDot} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Skills);
