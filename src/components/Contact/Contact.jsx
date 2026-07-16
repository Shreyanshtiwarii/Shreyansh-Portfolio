import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';
import { getAll, getText, getAttr } from '../../content/contentLoader.js';

gsap.registerPlugin(ScrollTrigger);

// Icons are visual design — not editable content — so they stay in code,
// keyed by the `data-field="platform"` values used in content.html.
const PLATFORM_ICONS = {
  github: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z"
        fill="currentColor"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.94 8.5H3.56V20.5H6.94V8.5zM5.25 3.5a1.96 1.96 0 100 3.92 1.96 1.96 0 000-3.92zM20.5 20.5v-6.7c0-3.58-1.91-5.25-4.46-5.25-2.06 0-2.98 1.13-3.49 1.93V8.5H9.16c.05 1 0 12 0 12h3.39v-6.7c0-.36.03-.72.13-.98.29-.72.95-1.47 2.06-1.47 1.46 0 2.04 1.11 2.04 2.73V20.5h3.72z"
        fill="currentColor"
      />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 6.5A1.5 1.5 0 014.5 5h15A1.5 1.5 0 0121 6.5v11a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5v-11z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4 6.5l8 6.5 8-6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  ),
};

// Platform name → human-readable label for aria-label
const PLATFORM_LABELS = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  email: 'Gmail',
  instagram: 'Instagram',
};

// Social links from content.html — edit URLs there, not here.
const SOCIAL_LINKS = getAll('[data-list="socialLinks"] [data-item="social-entry"]').map(
  (entry) => {
    const platform = getText('[data-field="platform"]', entry);
    const href = getAttr('[data-field="url"]', 'href', entry);
    return {
      name: PLATFORM_LABELS[platform] || platform,
      href,
      icon: PLATFORM_ICONS[platform] || null,
    };
  }
);

// Contact details from content.html — edit values there, not here.
const CONTACT = {
  email:         getAttr('[data-field="contact"] [data-field="email"]', 'href', undefined)
                   .replace('mailto:', ''),
  emailHref:     getAttr('[data-field="contact"] [data-field="email"]', 'href', undefined),
  linkedinHref:  getAttr('[data-field="contact"] [data-field="linkedinDisplay"]', 'href', undefined),
  linkedinLabel: getText('[data-field="contact"] [data-field="linkedinDisplay"]'),
  location:      getText('[data-field="contact"] [data-field="location"]'),
};

const Contact = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className="section-container">
        <h2 className={styles.heading}>
          <span className="gradient-text">Let&apos;s Connect</span>
        </h2>
        <p className={styles.subheading}>
          Have an idea, opportunity, or just want to say hi? Here is how to reach me.
        </p>

        <div className={styles.glassCard} ref={cardRef}>
          <div className={styles.form}>
            <div className={styles.field}>
              <span className={styles.label}>Email</span>
              <a
                href={CONTACT.emailHref}
                className={styles.input}
                style={{ display: 'block', textDecoration: 'none', cursor: 'pointer' }}
              >
                {CONTACT.email}
              </a>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>LinkedIn</span>
              <a
                href={CONTACT.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.input}
                style={{ display: 'block', textDecoration: 'none', cursor: 'pointer' }}
              >
                {CONTACT.linkedinLabel}
              </a>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Location</span>
              <div className={styles.input}>
                {CONTACT.location}
              </div>
            </div>
          </div>

          <div className={styles.socialRow}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={styles.socialIcon}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
