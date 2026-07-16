import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './DevConsole.module.css';
import { getText, getAll } from '../../content/contentLoader.js';

gsap.registerPlugin(ScrollTrigger);

// Content from content.html — edit values there, not here.
const OWNER_NAME     = getText('[data-field="name"] [data-field="fullName"]');
const OWNER_LOCATION = getText('[data-field="contact"] [data-field="location"]');

// whoami fields
const WHOAMI_ROLE    = getText('[data-field="devConsole"] [data-field="whoamiRole"]')    || 'CS Engineering Student';
const WHOAMI_FOCUS   = getText('[data-field="devConsole"] [data-field="whoamiFocus"]')   || 'Cloud · Cybersecurity · Full Stack';
const WHOAMI_STATUS  = getText('[data-field="devConsole"] [data-field="whoamiStatus"]')  || '🟢  Available for Internship';
const WHOAMI_PASSION = getText('[data-field="devConsole"] [data-field="whoamiPassion"]') || 'Building interactive apps with beautiful UI';

// skills — pulled from the skills section already in content.html
const SKILL_GROUPS = getAll('[data-list="skills"] [data-item="skill-category"]').map((cat) => ({
  label: getText('[data-field="categoryName"]', cat),
  items: getAll('[data-item="skillName"]', cat).map((el) => el.textContent.trim()),
}));

// projects — pulled from the projects section already in content.html
const CONSOLE_PROJECTS = getAll('[data-list="projects"] [data-item="project-entry"]').map((entry) => ({
  name: getText('[data-field="title"]', entry),
  tech: getAll('[data-item="techTag"]', entry).map((el) => el.textContent.trim()),
  desc: getText('[data-field="description"]', entry),
}));

// education — pulled from the education section already in content.html
const EDU_ENTRIES = getAll('[data-list="education"] [data-item="education-entry"]').map((entry) => ({
  degree:  getText('[data-field="degree"]',  entry),
  school:  getText('[data-field="school"]',  entry),
  status:  getText('[data-field="status"]',  entry),
  details: getAll('[data-item="course"]', entry).map((el) => el.textContent.trim()),
}));

// experience — pulled from the experience section already in content.html
const EXP_ENTRIES = getAll('[data-list="experience"] [data-item="experience-entry"]').map((entry) => ({
  role: getText('[data-field="title"]',       entry),
  org:  getText('[data-field="subtitle"]',    entry),
  desc: getText('[data-field="description"]', entry),
}));

// ─────────────────────────────────────────────────────────────────────────────
// Terminal data
// ─────────────────────────────────────────────────────────────────────────────
const COMMANDS = {
  help: {
    hint: 'List available commands',
    output: [
      { type: 'table', rows: [
        ['whoami',     'About me'],
        ['skills',     'Technical skill set'],
        ['projects',   'Featured projects'],
        ['education',  'Academic background'],
        ['experience', 'Roles & activities'],
        ['clear',      'Clear the terminal'],
        ['help',       'Show this menu'],
      ]},
    ],
  },
  whoami: {
    hint: 'About me',
    output: [
      { type: 'title',  text: OWNER_NAME },
      { type: 'kv', key: 'Role',     value: WHOAMI_ROLE },
      { type: 'kv', key: 'Focus',    value: WHOAMI_FOCUS },
      { type: 'kv', key: 'Status',   value: WHOAMI_STATUS },
      { type: 'kv', key: 'Passion',  value: WHOAMI_PASSION },
      { type: 'kv', key: 'Location', value: OWNER_LOCATION },
    ],
  },
  skills: {
    hint: 'Technical skill set',
    output: [
      { type: 'title', text: 'Technical Skills' },
      ...SKILL_GROUPS.map(({ label, items }) => ({ type: 'group', label, items })),
    ],
  },
  projects: {
    hint: 'Featured projects',
    output: [
      { type: 'title', text: 'Projects' },
      ...CONSOLE_PROJECTS.map(({ name, tech, desc }) => ({ type: 'project', name, tech, desc })),
    ],
  },
  education: {
    hint: 'Academic background',
    output: [
      { type: 'title', text: 'Education' },
      ...EDU_ENTRIES.map(({ degree, school, status, details }) => ({ type: 'edu', degree, school, status, details })),
    ],
  },
  experience: {
    hint: 'Roles & activities',
    output: [
      { type: 'title', text: 'Experience' },
      ...EXP_ENTRIES.map(({ role, org, desc }) => ({ type: 'exp', role, org, desc })),
    ],
  },
};

const BANNER = [
  '  ____             ____                      _      ',
  ' |  _ \\  _____   __/ ___|___  _ __  ___  ___| | ___ ',
  " | | | |/ _ \\ \\ / / |   / _ \\| '_ \\/ __|/ _ \\ |/ _ \\",
  ' | |_| |  __/\\ V /| |__| (_) | | | \\__ \\  __/ |  __/',
  ' |____/ \\___| \\_/  \\____\\___/|_| |_|___/\\___|_|\\___|',
  '',
  '  Type "help" to see available commands.',
  '',
];

// ─────────────────────────────────────────────────────────────────────────────
// Output renderers
// ─────────────────────────────────────────────────────────────────────────────
const OutputBlock = ({ block }) => {
  switch (block.type) {
    case 'title':
      return <div className={styles.outTitle}>{block.text}</div>;
    case 'kv':
      return (
        <div className={styles.outKv}>
          <span className={styles.kvKey}>{block.key}</span>
          <span className={styles.kvSep}> → </span>
          <span className={styles.kvVal}>{block.value}</span>
        </div>
      );
    case 'group':
      return (
        <div className={styles.outGroup}>
          <span className={styles.groupLabel}>[{block.label}]</span>
          {block.items.map((it, i) => (
            <span key={i} className={styles.badge}>{it}</span>
          ))}
        </div>
      );
    case 'project':
      return (
        <div className={styles.outProject}>
          <div className={styles.projectName}>▸ {block.name}</div>
          <div className={styles.projectDesc}>{block.desc}</div>
          <div className={styles.projectTech}>
            {block.tech.map((t, i) => <span key={i} className={styles.tech}>{t}</span>)}
          </div>
        </div>
      );
    case 'edu':
      return (
        <div className={styles.outEdu}>
          <div className={styles.eduDegree}>{block.degree}</div>
          <div className={styles.eduSchool}>{block.school}</div>
          <div className={styles.eduStatus}>Status: {block.status}</div>
          <div className={styles.eduCourses}>
            {block.details.map((d, i) => (
              <span key={i} className={styles.course}>• {d}</span>
            ))}
          </div>
        </div>
      );
    case 'exp':
      return (
        <div className={styles.outExp}>
          <div className={styles.expRole}>{block.role}</div>
          <div className={styles.expOrg}>@ {block.org}</div>
          <div className={styles.expDesc}>{block.desc}</div>
        </div>
      );
    case 'table':
      return (
        <div className={styles.outTable}>
          {block.rows.map(([cmd, desc], i) => (
            <div key={i} className={styles.tableRow}>
              <span className={styles.tableCmd}>{cmd}</span>
              <span className={styles.tableSep}>—</span>
              <span className={styles.tableDesc}>{desc}</span>
            </div>
          ))}
        </div>
      );
    case 'error':
      return <div className={styles.outError}>{block.text}</div>;
    default:
      return null;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Single history entry (prompt line + output)
// ─────────────────────────────────────────────────────────────────────────────
const HistoryEntry = ({ entry }) => (
  <div className={styles.entry}>
    <div className={styles.promptLine}>
      <span className={styles.promptUser}>shreyansh</span>
      <span className={styles.promptAt}>@</span>
      <span className={styles.promptHost}>portfolio</span>
      <span className={styles.promptColon}>:</span>
      <span className={styles.promptTilde}>~</span>
      <span className={styles.promptDollar}> $ </span>
      <span className={styles.promptCmd}>{entry.cmd}</span>
    </div>
    {entry.output && (
      <div className={styles.outputArea}>
        {entry.output.map((block, i) => <OutputBlock key={i} block={block} />)}
      </div>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// DevConsole — main export
// ─────────────────────────────────────────────────────────────────────────────
const DevConsole = () => {
  const [history,    setHistory]    = useState([]);
  const [input,      setInput]      = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx,    setHistIdx]    = useState(-1);
  const [bannerDone, setBannerDone] = useState(false);
  const [isTyping,   setIsTyping]   = useState(false);
  const [bannerLines, setBannerLines] = useState(
    BANNER.map(() => ({ done: false, text: '' }))
  );

  const sectionRef  = useRef(null);
  const termBodyRef = useRef(null);
  const inputRef    = useRef(null);
  const demoFired   = useRef(false);

  // Auto-scroll
  useEffect(() => {
    if (termBodyRef.current)
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
  }, [history, bannerLines]);

  // Entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(el, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
    });
  }, []);

  // Type the banner line by line
  useEffect(() => {
    let cancelled = false;
    const typeLine = (lineIdx, charIdx) => {
      if (cancelled) return;
      if (lineIdx >= BANNER.length) { setBannerDone(true); return; }
      const line = BANNER[lineIdx];
      if (charIdx > line.length) {
        setTimeout(() => typeLine(lineIdx + 1, 0), lineIdx === BANNER.length - 1 ? 0 : 30);
        return;
      }
      setBannerLines(prev => {
        const next = [...prev];
        next[lineIdx] = { done: charIdx >= line.length, text: line.slice(0, charIdx) };
        return next;
      });
      const delay = line.length === 0 ? 20 : 10 + Math.random() * 8;
      setTimeout(() => typeLine(lineIdx, charIdx + 1), delay);
    };
    typeLine(0, 0);
    return () => { cancelled = true; };
  }, []);

  // Auto-demo on first scroll into view
  useEffect(() => {
    if (!bannerDone) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !demoFired.current) {
        demoFired.current = true;
        setIsTyping(true);
        const demo = 'whoami';
        let i = 0;
        const tick = () => {
          i++;
          setInput(demo.slice(0, i));
          if (i < demo.length) {
            setTimeout(tick, 70 + Math.random() * 40);
          } else {
            setTimeout(() => { runCommand(demo); setInput(''); setIsTyping(false); }, 420);
          }
        };
        setTimeout(tick, 700);
      }
    }, { threshold: 0.35 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerDone]);

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setCmdHistory(prev => [raw.trim(), ...prev.slice(0, 49)]);
    setHistIdx(-1);
    if (cmd === 'clear') { setHistory([]); return; }
    const def = COMMANDS[cmd];
    const output = def
      ? def.output
      : [{ type: 'error', text: `bash: ${cmd}: command not found  (try "help")` }];
    setHistory(prev => [...prev, { cmd: raw.trim(), output }]);
  }, []);

  const handleKey = (e) => {
    if (isTyping) return;
    if (e.key === 'Enter') {
      runCommand(input); setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next); setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next); setInput(next === -1 ? '' : cmdHistory[next] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find(k => k.startsWith(input));
      if (match) setInput(match);
    }
  };

  const quickRun = (cmd) => { if (!isTyping) { runCommand(cmd); inputRef.current?.focus(); } };

  return (
    <section id="console" className={styles.section} ref={sectionRef}>
      <div className="section-container">
        <h2 className={styles.sectionTitle}>
          Developer <span className="gradient-text">Console</span>
        </h2>
        <p className={styles.sectionSub}>
          Interact with my portfolio the way developers do — through a terminal.
        </p>

        {/* Quick-access pills */}
        <div className={styles.quickBar}>
          {Object.entries(COMMANDS).map(([cmd, def]) => (
            <button key={cmd} className={styles.quickBtn} onClick={() => quickRun(cmd)} title={def.hint}>
              {cmd}
            </button>
          ))}
          <button className={`${styles.quickBtn} ${styles.quickClear}`} onClick={() => setHistory([])}>
            clear
          </button>
        </div>

        {/* Terminal window */}
        <div className={styles.terminal}>
          {/* Title bar */}
          <div className={styles.titleBar}>
            <div className={styles.trafficLights}>
              <span className={`${styles.dot} ${styles.dotRed}`}    />
              <span className={`${styles.dot} ${styles.dotYellow}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`}  />
            </div>
            <span className={styles.titleText}>shreyansh@portfolio: ~</span>
            <span className={styles.titleRight}>bash — 80×24</span>
          </div>

          {/* Body */}
          <div className={styles.body} ref={termBodyRef} onClick={() => inputRef.current?.focus()}>

            {/* ASCII banner */}
            <div className={styles.banner}>
              {bannerLines.map((line, i) => (
                <div key={i} className={styles.bannerLine}>{line.text}</div>
              ))}
            </div>

            {/* History */}
            {history.map((entry, i) => <HistoryEntry key={i} entry={entry} />)}

            {/* Active input */}
            <div className={styles.activeLine}>
              <span className={styles.promptUser}>shreyansh</span>
              <span className={styles.promptAt}>@</span>
              <span className={styles.promptHost}>portfolio</span>
              <span className={styles.promptColon}>:</span>
              <span className={styles.promptTilde}>~</span>
              <span className={styles.promptDollar}> $ </span>
              <span className={styles.inputWrap}>
                <span className={styles.inputMirror}>{input}</span>
                <span className={styles.cursor} />
                <input
                  ref={inputRef}
                  className={styles.hiddenInput}
                  value={input}
                  onChange={e => !isTyping && setInput(e.target.value)}
                  onKeyDown={handleKey}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </span>
            </div>
          </div>
        </div>

        <p className={styles.hint}>
          Click terminal &amp; type a command — or use the buttons above.&nbsp;
          <kbd>Tab</kbd> autocompletes &nbsp;·&nbsp; <kbd>↑↓</kbd> recalls history.
        </p>
      </div>
    </section>
  );
};

export default React.memo(DevConsole);
