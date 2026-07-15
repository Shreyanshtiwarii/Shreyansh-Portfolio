import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 19V5M12 5l-6 6M12 5l6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={`section-container ${styles.inner}`}>
        <div className={styles.left}>
          <p className={styles.name}>
            Shreyansh <span className="gradient-text">Tiwari</span>
          </p>
          <p className={styles.tagline}>Made with ❤️ using React &amp; Three.js</p>
        </div>

        <button className={styles.topBtn} onClick={scrollToTop} aria-label="Back to top">
          <ArrowUpIcon />
          <span>Back to Top</span>
        </button>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
