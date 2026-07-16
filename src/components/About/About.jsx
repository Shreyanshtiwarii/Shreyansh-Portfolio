import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';
import { getText, getAll } from '../../content/contentLoader.js';

gsap.registerPlugin(ScrollTrigger);

// ── About text ──────────────────────────────────────────────────────────────
const ABOUT_BODY = getText('[data-field="about"] [data-field="aboutBody"]');

// ── Education ────────────────────────────────────────────────────────────────
// There is no dedicated Education section anywhere in the current design
// (confirmed: the site has no UI for degree/school/coursework today, only
// this About section's bio prose touches on it). Adding a new visible block
// here would violate "preserve current design completely", so the parsed
// education entries are loaded and attached as a `data-education` JSON
// attribute on the About section instead -- verifiable in the DOM/dev tools,
// and ready to render the moment a real Education UI is designed, without
// changing anything visible today.
const EDUCATION_ENTRIES = getAll('[data-list="education"] [data-item="education-entry"]').map(
  (entry) => ({
    degree: getText('[data-field="degree"]', entry),
    school: getText('[data-field="school"]', entry),
    status: getText('[data-field="status"]', entry),
    years: getText('[data-field="years"]', entry),
    coursework: Array.from(entry.querySelectorAll('[data-list="coursework"] [data-item="course"]')).map(
      (el) => el.textContent.trim()
    ),
  })
);

const About = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section id="about" className={styles.about}>
      <div className={styles.rightCol}>
        <div
          className={styles.glassCard}
          ref={cardRef}
          data-education={JSON.stringify(EDUCATION_ENTRIES)}
        >
          <h2 className={styles.heading}>
            About <span className="gradient-text">Me</span>
          </h2>
          <p className={styles.bodyText}>
            {ABOUT_BODY}
          </p>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
