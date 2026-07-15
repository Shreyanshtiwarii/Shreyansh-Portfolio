import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

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
        <div className={styles.glassCard} ref={cardRef}>
          <h2 className={styles.heading}>
            About <span className="gradient-text">Me</span>
          </h2>
          <p className={styles.bodyText}>
            Hi, I'm Shreyansh Tiwari, a Computer Science Engineering student
            passionate about Cloud Computing, Cybersecurity, Full Stack
            Development, and creating modern web experiences. I enjoy
            building interactive applications with beautiful UI and smooth
            animations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
