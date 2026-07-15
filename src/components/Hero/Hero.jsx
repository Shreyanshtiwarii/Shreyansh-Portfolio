import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';

const Hero = () => {
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  /* ── Floating glowing particles canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const COLORS = [
      'rgba(139,92,246,',   // purple
      'rgba(79,158,255,',   // blue
      'rgba(167,139,250,',  // purple-light
    ];

    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        const W = window.innerWidth;
        const H = window.innerHeight;
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 20;
        this.r = Math.random() * 3 + 1;
        this.glow = Math.random() * 14 + 6;
        this.speedY = Math.random() * 0.4 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.7 + 0.2;
        this.twinkle = Math.random() * 0.03 + 0.01;
        this.phase = Math.random() * Math.PI * 2;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.phase += this.twinkle;
        if (this.y < -20) this.reset();
      }
      draw() {
        const alpha = this.opacity * ((Math.sin(this.phase) + 1) / 2 * 0.5 + 0.5);
        // glow halo
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glow);
        grad.addColorStop(0, `${this.color}${alpha})`);
        grad.addColorStop(1, `${this.color}0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glow, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        // core dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${Math.min(alpha * 1.4, 1)})`;
        ctx.fill();
      }
    }

    const count = window.innerWidth < 768 ? 40 : 80;
    particlesRef.current = Array.from({ length: count }, () => new Particle());

    // Only animate while the hero section is actually on screen and the tab
    // is visible -- once the user scrolls past it (or backgrounds the tab)
    // there's no reason to keep clearing/redrawing 40-80 glowing particles
    // every frame. Resumes seamlessly the moment it's visible again.
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (!isVisible || document.hidden) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particlesRef.current.forEach(p => { p.update(); p.draw(); });
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      io.disconnect();
    };
  }, []);

  /* ── Mouse parallax ── */
  useEffect(() => {
    if (!parallaxRef.current) return;

    // quickTo builds one reusable tween up front; calling it again just
    // retargets the same tween instead of allocating a new one, so this
    // reproduces the original duration/ease/feel without needing a
    // permanently-running requestAnimationFrame loop or per-frame gsap.to().
    const quickX = gsap.quickTo(parallaxRef.current, 'x', { duration: 1.2, ease: 'power2.out' });
    const quickY = gsap.quickTo(parallaxRef.current, 'y', { duration: 1.2, ease: 'power2.out' });

    const handleMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      quickX(mouseRef.current.x * -18);
      quickY(mouseRef.current.y * -10);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  /* ── Entrance animation ── */
  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      {/* Parallax wrapper for text */}
      <div ref={parallaxRef} className={styles.parallaxLayer}>
        <div className={styles.heroContent} ref={textRef}>
          {/* Available for Internship badge */}
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Available for Internship
          </div>

          <h2 className={styles.subLine}>I'm</h2>
          <h1 className={styles.name}>
            <span className="gradient-text">Shreyansh Tiwari</span>
          </h1>
          <p className={styles.welcome}>Welcome to my Portfolio</p>
          <p className={styles.role}>Computer Science Engineering Student</p>
          <p className={styles.tags}>Cloud • Cybersecurity • Full Stack Developer</p>

          <div className={styles.ctaGroup}>
            <button className={styles.btnPrimary} onClick={scrollTo('work')}>
              View My Work
            </button>
            <button className={styles.btnSecondary} onClick={scrollTo('contact')}>
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Down indicator */}
      <button
        className={styles.scrollIndicator}
        onClick={scrollTo('about')}
        aria-label="Scroll down"
      >
        <span className={styles.scrollText}>Scroll Down</span>
        <span className={styles.scrollChevron} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 6l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
    </section>
  );
};

export default React.memo(Hero);
