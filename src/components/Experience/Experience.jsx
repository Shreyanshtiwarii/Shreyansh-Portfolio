import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Experience.module.css';
import { getAll, getText } from '../../content/contentLoader.js';

gsap.registerPlugin(ScrollTrigger);

// Experience entries from content.html — add/remove/edit entries there, not here.
const EXPERIENCE_ITEMS = getAll('[data-list="experience"] [data-item="experience-entry"]').map(
  (entry) => ({
    title:       getText('[data-field="title"]',       entry),
    subtitle:    getText('[data-field="subtitle"]',    entry),
    description: getText('[data-field="description"]', entry),
  })
);

const Experience = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const fromX = i % 2 === 0 ? -80 : 80;

        gsap.fromTo(
          item,
          { opacity: 0, x: fromX },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className={styles.experience} ref={sectionRef}>
      <div className="section-container">
        <h2 className={styles.heading}>
          <span className="gradient-text">Experience</span>
        </h2>

        <div className={styles.timeline}>
          <div className={styles.timelineLineTrack}>
            <div className={styles.timelineLine} ref={lineRef} />
          </div>

          {EXPERIENCE_ITEMS.map((exp, index) => (
            <div
              key={exp.title}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`${styles.item} ${
                index % 2 === 0 ? styles.itemLeft : styles.itemRight
              }`}
            >
              <div className={styles.dot} />
              <div className={styles.card}>
                <h3 className={styles.itemTitle}>{exp.title}</h3>
                <p className={styles.itemSubtitle}>{exp.subtitle}</p>
                <p className={styles.itemDescription}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Experience);
