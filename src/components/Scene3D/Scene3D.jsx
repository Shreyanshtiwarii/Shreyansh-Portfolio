import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, AdaptiveDpr } from '@react-three/drei';
import Character from './Character.jsx';
import styles from './Scene3D.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// CinematicCamera — slow orbital drift, always looks at character centre.
// Unchanged from previous version.
// ─────────────────────────────────────────────────────────────────────────────
const CinematicCamera = () => {
  const { camera } = useThree();
  const origin = useRef({ x: camera.position.x, z: camera.position.z });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    camera.position.x = origin.current.x + Math.sin(t * 0.12) * 0.22;
    camera.position.z = origin.current.z + Math.cos(t * 0.09) * 0.18;
    camera.position.y = 1.2 + Math.sin(t * 0.07) * 0.08;
    camera.lookAt(0, 0.9, 0);
  });

  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// SpotPulse — point light that breathes with the chest glow strip.
// ─────────────────────────────────────────────────────────────────────────────
const SpotPulse = () => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    // Synced to breathing rhythm (1.55 Hz) with offset so it slightly leads
    ref.current.intensity = 0.6 + Math.sin(t * 1.55 + 0.4) * 0.45;
  });
  return (
    <pointLight
      ref={ref}
      position={[0, 1.05, 0.7]}
      color="#8b5cf6"
      distance={2.8}
      decay={2}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// RimPulse — subtle blue rim that very slowly modulates for life.
// ─────────────────────────────────────────────────────────────────────────────
const RimPulse = () => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.intensity = 1.0 + Math.sin(t * 0.4) * 0.25;
  });
  return (
    <directionalLight
      ref={ref}
      position={[-5, 3, -3]}
      color="#4f9eff"
      castShadow={false}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Scene3D — Canvas wrapper, forwarded ref for GSAP scroll transform.
// ─────────────────────────────────────────────────────────────────────────────
const Scene3D = forwardRef((props, ref) => {
  const mouse = useRef({ x: 0, y: 0 });
  const [tabVisible, setTabVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <div ref={ref} className={styles.canvasWrapper}>
      <Canvas
        shadows="soft"                      // PCF soft shadows
        camera={{
          // Pulled back slightly further on mobile with a touch more FOV so
          // the character stays fully framed in a narrow portrait viewport
          // instead of feeling zoomed-in/cropped. Desktop values unchanged.
          position: isMobile ? [0, 1.2, 5.3] : [0, 1.2, 4.2],
          fov: isMobile ? 46 : 40,
        }}
        gl={{
          // Antialiasing is one of the more expensive GL flags on phone
          // GPUs for comparatively little visible gain at mobile viewport
          // sizes -- disabled on mobile only.
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: 4,                   // ACESFilmicToneMapping
          toneMappingExposure: 1.1,
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        frameloop={tabVisible ? 'always' : 'never'}
        performance={{ min: 0.5 }}
      >
        <CinematicCamera />
        <AdaptiveDpr pixelated />

        {/* ── Lighting rig ─────────────────────────────────────────────── */}

        {/* Ambient — very dim, cool purple tint so darks aren't pure black */}
        <ambientLight intensity={0.18} color="#c0b0f0" />

        {/* Key light — primary bright source, warm-white, from upper-right */}
        <directionalLight
          position={[4, 7, 4]}
          intensity={2.0}
          color="#fff8f0"
          castShadow
          shadow-mapSize-width={isMobile ? 512 : 1024}
          shadow-mapSize-height={isMobile ? 512 : 1024}
          shadow-camera-near={0.5}
          shadow-camera-far={22}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={4}
          shadow-camera-bottom={-2}
          shadow-bias={-0.0008}
          shadow-normalBias={0.04}
        />

        {/* Fill light — soft from front-left, reduces harsh shadows on face */}
        <directionalLight
          position={[-3, 2, 5]}
          intensity={0.55}
          color="#e0eeff"
        />

        {/* Back light — warm accent separating head from background */}
        <directionalLight
          position={[2, 5, -5]}
          intensity={0.8}
          color="#b08cff"
        />

        {/* Rim light — cool blue silhouette from behind-left (animated) */}
        <RimPulse />

        {/* Purple fill — spills from the chest glow across the suit */}
        <pointLight
          position={[-2.5, 1.8, 1.5]}
          intensity={1.6}
          color="#8b5cf6"
          distance={7}
          decay={2}
        />

        {/* Blue accent — pops the right side metallic suit */}
        <pointLight
          position={[3.5, 0.8, 2.0]}
          intensity={1.1}
          color="#3b82f6"
          distance={7}
          decay={2}
        />

        {/* Ground bounce — soft uplight gives float depth */}
        <pointLight
          position={[0, -0.6, 1.8]}
          intensity={0.5}
          color="#7c3aed"
          distance={3.5}
          decay={2}
        />

        {/* Chest pulse — synced to breathing rhythm */}
        <SpotPulse />

        {/* ── Character ────────────────────────────────────────────────── */}
        <Character mouse={mouse} />

        {/* ── Shadows ──────────────────────────────────────────────────── */}
        {/*
         * ContactShadows: fast, blurred drop-shadow under the character.
         * Looks great and needs no per-mesh shadow-receiver setup.
         */}
        <ContactShadows
          position={[0, -0.68, 0]}
          opacity={0.7}
          scale={5}
          blur={3.2}
          far={2.2}
          color="#180830"
          frames={1}           // render once and cache — free perf win
        />

        {/* Environment — city HDR for metallic reflections on the suit */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
});

Scene3D.displayName = 'Scene3D';
export default Scene3D;
