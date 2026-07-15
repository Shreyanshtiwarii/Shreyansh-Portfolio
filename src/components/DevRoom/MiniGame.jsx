import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './MiniGame.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// Audio Synthesizer (Dynamic Web Audio API)
// ─────────────────────────────────────────────────────────────────────────────
let audioCtx = null;

function playSound(type) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'collect') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.15); // C6
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'jump') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.18);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'win') {
      // Play a quick arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const oscN = audioCtx.createOscillator();
        const gainN = audioCtx.createGain();
        oscN.connect(gainN);
        gainN.connect(audioCtx.destination);
        oscN.type = 'sine';
        oscN.frequency.setValueAtTime(freq, now + idx * 0.08);
        gainN.gain.setValueAtTime(0.08, now + idx * 0.08);
        gainN.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        oscN.start(now + idx * 0.08);
        oscN.stop(now + idx * 0.08 + 0.25);
      });
    } else if (type === 'lose') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.5);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    }
  } catch (e) {
    // Audio Context blocked or not supported
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Active Keyboard Controls Listener Hook
// ─────────────────────────────────────────────────────────────────────────────
function useKeyboard() {
  const keys = useRef({
    w: false, s: false, a: false, d: false,
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
    space: false
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || e.key === 'ArrowUp') keys.current.w = true;
      if (k === 's' || e.key === 'ArrowDown') keys.current.s = true;
      if (k === 'a' || e.key === 'ArrowLeft') keys.current.a = true;
      if (k === 'd' || e.key === 'ArrowRight') keys.current.d = true;
      if (e.key === ' ') keys.current.space = true;
    };

    const handleKeyUp = (e) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || e.key === 'ArrowUp') keys.current.w = false;
      if (k === 's' || e.key === 'ArrowDown') keys.current.s = false;
      if (k === 'a' || e.key === 'ArrowLeft') keys.current.a = false;
      if (k === 'd' || e.key === 'ArrowRight') keys.current.d = false;
      if (e.key === ' ') keys.current.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
}

// ─────────────────────────────────────────────────────────────────────────────
// Collection Particles
// ─────────────────────────────────────────────────────────────────────────────
const ParticleSystem = ({ triggerRef }) => {
  const meshRef = useRef();
  const count = 40;
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        active: false,
        life: 0
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    triggerRef.current = (pos) => {
      let spawned = 0;
      for (let p of particles) {
        if (!p.active) {
          p.pos.copy(pos);
          p.vel.set(
            (Math.random() - 0.5) * 8,
            (Math.random() * 6) + 3,
            (Math.random() - 0.5) * 8
          );
          p.active = true;
          p.life = 1.0;
          spawned++;
          if (spawned >= 15) break;
        }
      }
    };
  }, [particles, triggerRef]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    let idx = 0;
    for (let p of particles) {
      if (p.active) {
        p.vel.y -= 12 * delta; // gravity
        p.pos.addScaledVector(p.vel, delta);
        p.life -= delta * 1.8;
        if (p.life <= 0) {
          p.active = false;
        } else {
          dummy.position.copy(p.pos);
          dummy.scale.setScalar(p.life * 0.18);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(idx, dummy.matrix);
          idx++;
        }
      }
    }
    // Hide rest of instances
    for (let i = idx; i < count; i++) {
      dummy.scale.setScalar(0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} castShadow={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#fbbf24" toneMapped={false} />
    </instancedMesh>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GameScene Component (3D R3F Environment & Physics Loop)
// ─────────────────────────────────────────────────────────────────────────────
const GameScene = ({ gameState, cubes, onCollect, triggerParticleRef, keys }) => {
  const playerRef = useRef();
  const cubeRefs = useRef([]);

  // Physics local variables
  const playerPos = useMemo(() => new THREE.Vector3(0, 0, 5), []);
  const playerVel = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.03); // Clamp lag spikes

    if (gameState !== 'playing') {
      // Just float player mesh in idle states
      if (playerRef.current) {
        playerRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1 + 0.4;
        playerRef.current.rotation.y += dt * 0.3;
      }
      return;
    }

    // ── 1. Apply Keyboard Inputs (WASD / Arrows) ──────────────────────
    const moveX = (keys.current.d ? 1 : 0) - (keys.current.a ? 1 : 0);
    const moveZ = (keys.current.s ? 1 : 0) - (keys.current.w ? 1 : 0);

    const accel = new THREE.Vector3(moveX, 0, moveZ);
    if (accel.lengthSq() > 0) {
      accel.normalize().multiplyScalar(42); // Movement force
      playerVel.x += accel.x * dt;
      playerVel.z += accel.z * dt;
    }

    // Apply linear friction
    playerVel.x -= playerVel.x * 6.5 * dt;
    playerVel.z -= playerVel.z * 6.5 * dt;

    // Limit maximum speed
    const currentSpeed = Math.sqrt(playerVel.x * playerVel.x + playerVel.z * playerVel.z);
    const maxSpeed = 8.5;
    if (currentSpeed > maxSpeed) {
      playerVel.x = (playerVel.x / currentSpeed) * maxSpeed;
      playerVel.z = (playerVel.z / currentSpeed) * maxSpeed;
    }

    // Jump trigger
    if (keys.current.space && playerPos.y <= 0.01) {
      playerVel.y = 8.8;
      playSound('jump');
    }

    // ── 2. Gravity and Ground Bound ───────────────────────────────────
    playerVel.y -= 25.0 * dt; // Gravity pull
    playerPos.addScaledVector(playerVel, dt);

    if (playerPos.y <= 0) {
      playerPos.y = 0;
      playerVel.y = 0;
    }

    // ── 3. Bounding Arena Limits (30x30 grid) ─────────────────────────
    const boundary = 14.2;
    if (playerPos.x < -boundary) { playerPos.x = -boundary; playerVel.x = 0; }
    if (playerPos.x > boundary) { playerPos.x = boundary; playerVel.x = 0; }
    if (playerPos.z < -boundary) { playerPos.z = -boundary; playerVel.z = 0; }
    if (playerPos.z > boundary) { playerPos.z = boundary; playerVel.z = 0; }

    // ── 4. Sync Player Mesh & PointLight ──────────────────────────────
    if (playerRef.current) {
      playerRef.current.position.copy(playerPos);
      // Roll ball rotation based on velocity direction
      playerRef.current.rotation.z -= playerVel.x * dt * 2;
      playerRef.current.rotation.x += playerVel.z * dt * 2;
    }

    // ── 5. Isometric Camera Smooth Follow ──────────────────────────────
    const camTargetX = playerPos.x;
    const camTargetY = playerPos.y + 7.5;
    const camTargetZ = playerPos.z + 9.5;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, camTargetX, 0.06);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, camTargetY, 0.06);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, camTargetZ, 0.06);
    state.camera.lookAt(playerPos.x, playerPos.y + 0.4, playerPos.z);

    // ── 6. Animate and Check Cube Collections ────────────────────────
    const time = state.clock.getElapsedTime();
    cubes.forEach((cube, idx) => {
      const mesh = cubeRefs.current[idx];
      if (!mesh) return;

      if (cube.collected) {
        // Shrink collected cubes into nothingness
        mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, 0, 0.15));
        return;
      }

      // Floating + rotation animations
      mesh.rotation.y += dt * 2.0;
      mesh.rotation.x += dt * 0.8;
      mesh.position.y = 0.55 + Math.sin(time * 3.0 + idx) * 0.12;

      // Distance checking (sphere vs box)
      const dx = playerPos.x - cube.pos[0];
      const dy = playerPos.y - mesh.position.y;
      const dz = playerPos.z - cube.pos[2];
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance < 0.9) {
        cube.collected = true;
        playSound('collect');
        triggerParticleRef.current?.(new THREE.Vector3(...cube.pos));
        onCollect(cube.id);
      }
    });
  });

  return (
    <>
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.25} color="#e0ddff" />
      <directionalLight position={[10, 15, 10]} intensity={1.5} color="#ffffff" castShadow />
      <pointLight position={[0, 6, 0]} intensity={0.8} color="#8b5cf6" distance={20} decay={2} />

      {/* Cyber Grid Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#070712" roughness={0.95} />
      </mesh>
      <gridHelper args={[30, 30, '#8b5cf6', '#1e1e38']} position={[0, 0.001, 0]} />

      {/* Outer Neon Barriers */}
      {[
        [0, 0.4, 15, 30, 0.8, 0.2],    // South wall
        [0, 0.4, -15, 30, 0.8, 0.2],   // North wall
        [15, 0.4, 0, 0.2, 0.8, 30],    // East wall
        [-15, 0.4, 0, 0.2, 0.8, 30],   // West wall
      ].map((wall, i) => (
        <mesh key={i} position={[wall[0], wall[1], wall[2]]}>
          <boxGeometry args={[wall[3], wall[4], wall[5]]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.6} roughness={0.1} />
        </mesh>
      ))}

      {/* Player Character (Glowing holographic sphere) */}
      <group ref={playerRef} position={[0, 0.4, 5]}>
        <mesh castShadow>
          <sphereGeometry args={[0.42, 24, 24]} />
          <meshStandardMaterial
            color="#4f9eff"
            emissive="#4f9eff"
            emissiveIntensity={1.5}
            roughness={0.15}
            metalness={0.8}
          />
        </mesh>
        <pointLight intensity={1.8} color="#4f9eff" distance={3.8} decay={2} />
      </group>

      {/* Collectible Neon Cubes */}
      {cubes.map((cube, idx) => (
        <mesh
          key={cube.id}
          ref={(el) => (cubeRefs.current[idx] = el)}
          position={cube.pos}
          castShadow
        >
          <boxGeometry args={[0.45, 0.45, 0.45]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={1.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Burst Particles */}
      <ParticleSystem triggerRef={triggerParticleRef} />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main MiniGame Wrapper (State Manager, HUD and HTML Overlays)
// ─────────────────────────────────────────────────────────────────────────────
const CUBES_COUNT = 10;
const INITIAL_TIME_LIMIT = 30; // 30 seconds

const MiniGame = ({ onClose }) => {
  const [gameState, setGameState] = useState('start'); // start | playing | win | gameover
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(INITIAL_TIME_LIMIT);

  const keys = useKeyboard();
  const triggerParticleRef = useRef(null);

  // Randomise 10 cubes on the grid floor
  const cubes = useMemo(() => {
    const list = [];
    for (let i = 0; i < CUBES_COUNT; i++) {
      // Random coordinates between -12.5 and 12.5 to avoid spawning on boundaries
      const x = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 25;
      list.push({
        id: `cube-${i}`,
        pos: [x, 0.55, z],
        collected: false
      });
    }
    return list;
  }, [gameState === 'start']); // Reset positioning when starting a new game

  // Timer interval handling
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0.1) {
          clearInterval(interval);
          setGameState('gameover');
          playSound('lose');
          return 0;
        }
        return Math.round((prev - 0.1) * 10) / 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState]);

  // Lock body scroll when full-screen game is mounted
  useEffect(() => {
    const htmlEl = document.documentElement;
    const prevHtml = htmlEl.style.overflow;
    const prevBody = document.body.style.overflow;
    htmlEl.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      htmlEl.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  // Exit game on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleStartGame = () => {
    setScore(0);
    setTimer(INITIAL_TIME_LIMIT);
    // Reset all collected flags
    cubes.forEach((c) => (c.collected = false));
    setGameState('playing');
    // Short delay so AudioContext has time to initialize
    setTimeout(() => playSound('collect'), 50);
  };

  const handleCollectCube = (id) => {
    setScore((prev) => {
      const next = prev + 1;
      if (next >= CUBES_COUNT) {
        setGameState('win');
        playSound('win');
      }
      return next;
    });
  };

  // Rendered via a portal straight onto <body> instead of in place. MiniGame
  // is mounted inside the DevRoom <section>, which sets `position: relative;
  // z-index: 10` to layer itself among the page's other sections -- that
  // rule also creates a CSS stacking context, so this overlay's own
  // `z-index: 10000` was only ever being compared against DevRoom's other
  // children, not against the page as a whole. The fixed Navbar sits in a
  // separate context at z-index: 100 and was winning, which is why the HUD
  // timer and back button were rendering but visually clipped underneath
  // it. A portal makes this a true top-level sibling of the Navbar so its
  // z-index is finally compared where it actually matters.
  return createPortal(
    <div className={styles.gameOverlay} role="dialog" aria-modal="true" aria-label="3D Mini Game">
      {/* 3D R3F Game Space */}
      <div className={styles.canvasContainer}>
        <Canvas
          shadows
          camera={{ position: [0, 8, 10], fov: 45 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
          }}
        >
          <color attach="background" args={['#030308']} />
          <fog attach="fog" args={['#030308', 12, 28]} />
          <GameScene
            gameState={gameState}
            cubes={cubes}
            onCollect={handleCollectCube}
            triggerParticleRef={triggerParticleRef}
            keys={keys}
          />
        </Canvas>
      </div>

      {/* Back arrow (top left) — always available, in every game state */}
      <button className={styles.backBtn} onClick={onClose} aria-label="Back to portfolio">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M5 12l6 6M5 12l6-6" />
        </svg>
        <span>Back</span>
      </button>

      {/* Close button (top right) — always available, in every game state */}
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close game">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* HUD (Heads-up display overlay) */}
      {gameState === 'playing' && (
        <div className={styles.hud}>
          <div className={styles.hudPanel}>
            <span className={styles.hudLabel}>CUBES</span>
            <span className={styles.hudValue}>{score} <span className={styles.hudTotal}>/ {CUBES_COUNT}</span></span>
          </div>
          <div className={`${styles.hudPanel} ${timer <= 5 ? styles.hudTimerWarning : ''}`}>
            <span className={styles.hudLabel}>TIME</span>
            <span className={styles.hudValue}>{timer.toFixed(1)}s</span>
          </div>
          <button className={`${styles.hudPanel} ${styles.hudExitBtn}`} onClick={onClose} aria-label="Quit game">
            <span className={styles.hudLabel} style={{ color: '#fca5a5' }}>QUIT</span>
            <span className={styles.hudValue} style={{ fontSize: '1.2rem', color: '#f87171' }}>Exit</span>
          </button>
        </div>
      )}

      {/* Start Game Menu */}
      {gameState === 'start' && (
        <div className={styles.menuContainer}>
          <div className={styles.glassMenu}>
            <h2 className={styles.menuTitle}>🎮 Cyber Cube Collector</h2>
            <p className={styles.menuSubtitle}>
              Collect all 10 glowing cubes on the grid before the 30-second timer runs out.
            </p>
            <div className={styles.instructions}>
              <div className={styles.instructionItem}>
                <span className={styles.key}>W</span>
                <span className={styles.key}>A</span>
                <span className={styles.key}>S</span>
                <span className={styles.key}>D</span>
                <span className={styles.instructionText}>or Arrows to Move</span>
              </div>
              <div className={styles.instructionItem}>
                <span className={`${styles.key} ${styles.keyWide}`}>Space</span>
                <span className={styles.instructionText}>to Jump</span>
              </div>
            </div>
            <button className={styles.primaryBtn} onClick={handleStartGame}>
              Play Game
            </button>
          </div>
        </div>
      )}

      {/* Game Over Menu */}
      {gameState === 'gameover' && (
        <div className={styles.menuContainer}>
          <div className={styles.glassMenu}>
            <h2 className={`${styles.menuTitle} ${styles.redText}`}>⏱️ Time's Up!</h2>
            <p className={styles.menuSubtitle}>
              You ran out of time. You collected {score} out of {CUBES_COUNT} cubes.
            </p>
            <button className={styles.primaryBtn} onClick={handleStartGame}>
              Try Again
            </button>
            <button className={styles.secondaryBtn} onClick={onClose}>
              Back to Portfolio
            </button>
          </div>
        </div>
      )}

      {/* Victory Menu */}
      {gameState === 'win' && (
        <div className={styles.menuContainer}>
          <div className={styles.glassMenu}>
            <h2 className={`${styles.menuTitle} ${styles.goldText}`}>🏆 Victory!</h2>
            <p className={styles.menuSubtitle}>
              You successfully collected all {CUBES_COUNT} cubes in {(INITIAL_TIME_LIMIT - timer).toFixed(1)}s!
            </p>
            <button className={styles.primaryBtn} onClick={handleStartGame}>
              Play Again
            </button>
            <button className={styles.secondaryBtn} onClick={onClose}>
              Back to Portfolio
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default React.memo(MiniGame);
