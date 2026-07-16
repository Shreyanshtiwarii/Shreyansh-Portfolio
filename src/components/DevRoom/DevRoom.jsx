import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Desk, Laptop, Monitor, Keyboard, Mouse, CoffeeMug, Books, Plant, RGBStrip } from './RoomModels.jsx';
import styles from './DevRoom.module.css';
import { getText } from '../../content/contentLoader.js';

const MiniGame = lazy(() => import('./MiniGame.jsx'));

// Subtitle from content.html — edit there, not here.
const DEVROOM_SUBTITLE = getText('[data-field="devRoom"] [data-field="devRoomSubtitle"]') ||
  'A little 3D corner of where the code happens. Move your cursor to look around, and click on things.';


gsap.registerPlugin(ScrollTrigger);

// Update these when swapping in real destinations / assets:
const PROJECTS_SECTION_ID = 'work';
const GITHUB_URL = 'https://github.com/'; // TODO: replace with your GitHub profile URL

// ─────────────────────────────────────────────────────────────────────────────
// RoomCamera — base position with a gentle idle drift, plus a small offset
// that follows the mouse so the room feels alive without ever losing the
// objects out of frame.
// ─────────────────────────────────────────────────────────────────────────────
const RoomCamera = ({ mouse, basePosition, lookAt }) => {
  const { camera } = useThree();
  const current = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smoothly ease toward the target mouse offset (lerp = cheap inertia)
    current.current.x += (mouse.current.x - current.current.x) * 0.04;
    current.current.y += (mouse.current.y - current.current.y) * 0.04;

    const idleX = Math.sin(t * 0.15) * 0.05;
    const idleY = Math.sin(t * 0.11) * 0.03;

    camera.position.x = basePosition[0] + current.current.x * 0.45 + idleX;
    camera.position.y = basePosition[1] - current.current.y * 0.25 + idleY;
    camera.position.z = basePosition[2];
    camera.lookAt(...lookAt);
  });

  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// FloatingRoom — wraps the whole desk setup and gives it a slow, weightless
// float + sway so the room never feels static.
// ─────────────────────────────────────────────────────────────────────────────
const FloatingRoom = ({ onLaptopClick, onMonitorClick }) => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(t * 0.35) * 0.045;
    groupRef.current.rotation.y = Math.sin(t * 0.18) * 0.025;
    groupRef.current.rotation.x = Math.sin(t * 0.22) * 0.008;
  });

  return (
    <group ref={groupRef}>
      <Desk />
      <Laptop onSelect={onLaptopClick} />
      <Monitor onSelect={onMonitorClick} />
      <Keyboard />
      <Mouse />
      <CoffeeMug />
      <Books />
      <Plant />
      <RGBStrip />
    </group>
  );
};

const DevRoom = () => {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const wrapperRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const [tabVisible, setTabVisible] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);


  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Track mouse position relative to the canvas wrapper only (so the room
  // reacts while it's on screen, not from motion elsewhere on the page).
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const onLeave = () => {
      mouse.current.x = 0;
      mouse.current.y = 0;
    };
    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      headRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 60, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  const goToProjects = () => {
    const el = document.getElementById(PROJECTS_SECTION_ID);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openGithub = () => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
  };

  const basePosition = isMobile ? [0, 0.9, 3.6] : [0, 0.75, 2.9];
  const lookAt = [0, 0.15, 0];

  return (
    <section id="dev-room" className={styles.section} ref={sectionRef}>
      <div className="section-container">
        <div className={styles.head} ref={headRef}>
          <h2 className={styles.title}>
            The <span className="gradient-text">Workspace</span>
          </h2>
          <p className={styles.subtitle}>
            {DEVROOM_SUBTITLE}
          </p>
        </div>

        <div className={styles.canvasWrapper} ref={wrapperRef}>
          <button className={styles.playGameBtn} onClick={() => setIsGameActive(true)}>
            🎮 Play Game
          </button>
          <Canvas
            shadows="soft"
            camera={{ position: basePosition, fov: isMobile ? 50 : 42 }}
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: 'high-performance',
              toneMapping: 4, // ACESFilmicToneMapping
              toneMappingExposure: 1.05,
            }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            frameloop={tabVisible ? 'always' : 'never'}
            performance={{ min: 0.5 }}
          >
            <RoomCamera mouse={mouse} basePosition={basePosition} lookAt={lookAt} />

            {/* ── Soft room lighting ─────────────────────────────────── */}
            <ambientLight intensity={0.35} color="#c9c0f0" />
            <directionalLight
              position={[2.5, 3.5, 2]}
              intensity={1.1}
              color="#fff3e6"
              castShadow={!isMobile}
              shadow-mapSize-width={isMobile ? 512 : 1024}
              shadow-mapSize-height={isMobile ? 512 : 1024}
              shadow-camera-near={0.5}
              shadow-camera-far={8}
              shadow-camera-left={-2.2}
              shadow-camera-right={2.2}
              shadow-camera-top={2}
              shadow-camera-bottom={-2}
              shadow-bias={-0.001}
            />
            <directionalLight position={[-2, 2, -1.5]} intensity={0.4} color="#8b5cf6" />
            <pointLight position={[0, 1.2, 1.2]} intensity={0.5} color="#4f9eff" distance={4} decay={2} />

            <FloatingRoom onLaptopClick={goToProjects} onMonitorClick={openGithub} />

            <ContactShadows
              position={[0, -0.62, 0]}
              opacity={0.55}
              scale={5}
              blur={2.6}
              far={1.6}
              color="#0c0616"
              frames={1}
            />
          </Canvas>
        </div>

        <p className={styles.hint}>
          💻 Click the laptop for projects · 🖥️ click the monitor for GitHub · ☕ click the mug just because
        </p>
      </div>
      {isGameActive && (
        <Suspense fallback={null}>
          <MiniGame onClose={() => setIsGameActive(false)} />
        </Suspense>
      )}
    </section>
  );
};

export default React.memo(DevRoom);
