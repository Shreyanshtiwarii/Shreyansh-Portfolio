import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Skills', id: 'skills' },
  { label: 'Work', id: 'work' },
  { label: 'Achievements',  id: 'achievements' },
  { label: 'Certificates',  id: 'certificates' },
  { label: 'Academics',  id: 'academic-journey' },
  { label: 'Clubs',  id: 'clubs' },
  { label: 'Experience',    id: 'experience' },
  { label: 'Globe',    id: 'globe' },
  { label: 'Console',    id: 'console' },
  { label: 'Dev Room',   id: 'dev-room' },
  { label: 'Resume',   id: 'resume' },
  { label: 'Contact Me', id: 'contact' },
];

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close the mobile/tablet menu automatically if the viewport is resized
  // back up past the collapse breakpoint, so it never gets stuck open.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)');
    const onChange = (e) => { if (e.matches) setMenuOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Prevent background scroll while the mobile menu overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.navInner}>
        <a href="#hero" className={styles.logo} onClick={handleNavClick('hero')}>
          Shreyansh Tiwari
        </a>
        <div className={styles.navRight}>
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={handleNavClick(link.id)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={handleNavClick(link.id)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {menuOpen && (
        <div className={styles.mobileMenuBackdrop} onClick={() => setMenuOpen(false)} />
      )}
    </nav>
  );
};

export default React.memo(Navbar);
