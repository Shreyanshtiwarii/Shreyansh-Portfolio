import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Work.module.css';
import { getAll, getText, getAttr } from '../../content/contentLoader.js';

gsap.registerPlugin(ScrollTrigger);

// Title, description, tech tags, links, and image all come from content.html
// now. Images referenced here are plain URL strings pointing into
// /public/assets/images/projects/ -- Vite serves public/ files verbatim by
// path, so replacing the file on disk (same filename) updates the site
// immediately with no rebuild or content.html edit required.
const PROJECTS = getAll('[data-list="projects"] [data-item="project-entry"]').map((project) => ({
  title: getText('[data-field="title"]', project),
  description: getText('[data-field="description"]', project),
  image: getAttr('[data-field="image"]', 'src', project),
  tech: Array.from(project.querySelectorAll('[data-list="tech"] [data-item="techTag"]')).map(
    (el) => el.textContent.trim()
  ),
  github: getAttr('[data-field="githubUrl"]', 'href', project),
  demo: getAttr('[data-field="demoUrl"]', 'href', project),
}));

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z"
      fill="currentColor"
    />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 4h6v6M20 4l-9 9M9 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Work = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 70 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: (i % 3) * 0.1,
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

  return (
    <section id="work" className={styles.work} ref={sectionRef}>
      <div className="section-container">
        <h2 className={styles.heading}>
          <span className="gradient-text">Featured Work</span>
        </h2>

        <div className={styles.grid}>
          {PROJECTS.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className={styles.card}
            >
              <div className={styles.imagePlaceholder}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.imagePlaceholderText}>{project.title}</span>
                )}
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>

                <div className={styles.techList}>
                  {project.tech.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.actions}>
                  <a
                    href={project.github}
                    className={`${styles.btn} ${styles.btnGithub}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon />
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    className={`${styles.btn} ${styles.btnDemo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalIcon />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Work);
