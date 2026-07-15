import React, { useMemo, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Html } from '@react-three/drei';

// ─────────────────────────────────────────────────────────────────────────────
// RoomModels — all objects in the Developer's Room.
//
// Every mesh here is built from primitive geometry (boxes, cylinders,
// spheres) so the scene stays lightweight and loads instantly with zero
// external assets. Each component is isolated and named so a real GLTF
// model can drop in later with minimal changes, e.g.:
//
//   const { scene } = useGLTF('/assets/models/laptop.glb');
//   return <primitive object={scene} position={POSITION} />;
//
// Materials/colors are pulled close to the site's CSS variables
// (purple #8b5cf6, blue #3b82f6) so the room matches the rest of the page.
// ─────────────────────────────────────────────────────────────────────────────

const COLORS = {
  purple: '#8b5cf6',
  purpleLight: '#a78bfa',
  blue: '#3b82f6',
  blueGlow: '#4f9eff',
  deskWood: '#2a2035',
  deskWoodDark: '#1c1626',
  metal: '#3a3a48',
  metalDark: '#232330',
  screenBezel: '#111118',
  plantPot: '#3d2b1f',
  plantLeaf: '#3fae5c',
  plantLeafDark: '#2e8548',
  mugBody: '#e8e4f5',
  mugAccent: '#8b5cf6',
  bookColors: ['#8b5cf6', '#3b82f6', '#f59e0b', '#ef4444'],
  keycap: '#1a1a26',
  keycapGlow: '#4f9eff',
};

/**
 * Small hoverable label shown above interactive objects. Kept lightweight
 * (plain div, no images) and only mounted while hovered.
 */
const HoverLabel = ({ show, text, position = [0, 0, 0] }) => {
  if (!show) return null;
  return (
    <Html position={position} center distanceFactor={8} occlude={false} zIndexRange={[10, 0]}>
      <div
        style={{
          padding: '5px 11px',
          borderRadius: 999,
          background: 'rgba(18,18,28,0.85)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          color: '#f5f5fa',
          fontFamily: "'Poppins', sans-serif",
          fontSize: 11,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          transform: 'translateY(-6px)',
        }}
      >
        {text}
      </div>
    </Html>
  );
};

/**
 * Builds a canvas texture used as the laptop screen "logo". Static (drawn
 * once) — this is the natural spot to later swap in an <img>-based texture
 * of a real logo file.
 */
function useLogoTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0, '#a78bfa');
    grad.addColorStop(1, '#4f9eff');
    ctx.fillStyle = grad;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '700 130px "Space Grotesk", sans-serif';
    ctx.fillText('ST', canvas.width / 2, canvas.height / 2 - 26);

    ctx.fillStyle = '#f5f5fa';
    ctx.font = '600 26px "Poppins", sans-serif';
    ctx.fillText('SHREYANSH TIWARI', canvas.width / 2, canvas.height / 2 + 78);

    ctx.fillStyle = 'rgba(184,184,200,0.8)';
    ctx.font = '400 17px "Poppins", sans-serif';
    ctx.fillText('Portfolio', canvas.width / 2, canvas.height / 2 + 110);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

/**
 * Builds a tall canvas of syntax-highlighted "code" once, then the scroll
 * illusion is done for free by animating texture.offset.y each frame —
 * far cheaper than redrawing the canvas every tick.
 */
function useCodeTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1536;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0b0d14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const palette = ['#a78bfa', '#4f9eff', '#4ade80', '#f5f5fa', '#f59e0b', '#8a8a9a'];
    const lineHeight = 26;
    const lines = Math.floor(canvas.height / lineHeight);
    ctx.font = '16px "Courier New", monospace';
    ctx.textBaseline = 'top';

    let indent = 0;
    for (let i = 0; i < lines; i++) {
      const y = i * lineHeight + 8;
      // Occasionally step indentation in/out to look like real code blocks
      const roll = Math.random();
      if (roll < 0.12 && indent < 3) indent += 1;
      else if (roll < 0.22 && indent > 0) indent -= 1;

      const segments = 2 + Math.floor(Math.random() * 3);
      let x = 18 + indent * 22;
      for (let s = 0; s < segments; s++) {
        const width = 14 + Math.random() * 60;
        ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x, y, width, 10);
        x += width + 8;
        if (x > canvas.width - 30) break;
      }
    }
    ctx.globalAlpha = 1;

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 0.22);
    return tex;
  }, []);

  useFrame((_, delta) => {
    texture.offset.y = (texture.offset.y + delta * 0.035) % 1;
  });

  return texture;
}

// ── Desk ─────────────────────────────────────────────────────────────────────
export const Desk = () => (
  <group name="desk">
    <RoundedBox args={[3.6, 0.08, 1.6]} radius={0.03} smoothness={2} position={[0, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={COLORS.deskWood} roughness={0.35} metalness={0.15} />
    </RoundedBox>
    {[
      [-1.68, -0.55, 0.68],
      [1.68, -0.55, 0.68],
      [-1.68, -0.55, -0.68],
      [1.68, -0.55, -0.68],
    ].map((pos, i) => (
      <mesh key={i} position={pos} castShadow>
        <boxGeometry args={[0.08, 1.1, 0.08]} />
        <meshStandardMaterial color={COLORS.deskWoodDark} roughness={0.5} metalness={0.1} />
      </mesh>
    ))}
  </group>
);

// ── Laptop (clickable → Projects) ───────────────────────────────────────────
export const Laptop = ({ onSelect, position = [-1.05, 0.09, 0.15] }) => {
  const [hovered, setHovered] = useState(false);
  const logoTexture = useLogoTexture();

  return (
    <group
      position={position}
      rotation={[0, 0.18, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
    >
      {/* Base */}
      <RoundedBox args={[0.62, 0.025, 0.44]} radius={0.02} smoothness={2} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color={COLORS.metal} roughness={0.35} metalness={0.7} />
      </RoundedBox>
      {/* Screen (hinged open) */}
      <group position={[0, 0.01, -0.21]} rotation={[-1.25, 0, 0]}>
        <RoundedBox args={[0.62, 0.4, 0.02]} radius={0.02} smoothness={2} position={[0, 0.2, 0]} castShadow>
          <meshStandardMaterial color={COLORS.screenBezel} roughness={0.4} metalness={0.5} />
        </RoundedBox>
        <mesh position={[0, 0.2, 0.012]}>
          <planeGeometry args={[0.54, 0.32]} />
          <meshBasicMaterial map={logoTexture} toneMapped={false} />
        </mesh>
      </group>
      <HoverLabel show={hovered} text="View Projects →" position={[0, 0.55, -0.1]} />
    </group>
  );
};

// ── Monitor (clickable → GitHub) ────────────────────────────────────────────
export const Monitor = ({ onSelect, position = [0.55, 0.36, -0.35] }) => {
  const [hovered, setHovered] = useState(false);
  const codeTexture = useCodeTexture();

  return (
    <group position={position}>
      {/* Stand */}
      <mesh position={[0, -0.28, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.09, 0.08, 16]} />
        <meshStandardMaterial color={COLORS.metalDark} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.28, 12]} />
        <meshStandardMaterial color={COLORS.metalDark} roughness={0.4} metalness={0.6} />
      </mesh>

      <group
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
      >
        <RoundedBox args={[0.78, 0.46, 0.03]} radius={0.015} smoothness={2} castShadow>
          <meshStandardMaterial color={COLORS.screenBezel} roughness={0.4} metalness={0.5} />
        </RoundedBox>
        <mesh position={[0, 0, 0.017]}>
          <planeGeometry args={[0.7, 0.39]} />
          <meshBasicMaterial map={codeTexture} toneMapped={false} />
        </mesh>
        {/* subtle screen glow */}
        <pointLight position={[0, 0, 0.3]} color={COLORS.blueGlow} intensity={0.35} distance={1.2} decay={2} />
        <HoverLabel show={hovered} text="Open GitHub ↗" position={[0, 0.34, 0.05]} />
      </group>
    </group>
  );
};

// ── Mechanical Keyboard (instanced keys + RGB underglow) ────────────────────
export const Keyboard = ({ position = [-0.15, 0.055, 0.5] }) => {
  const glowRef = useRef();
  const keysRef = useRef();
  const hue = useRef(0);

  const KEY_COLS = 14;
  const KEY_ROWS = 5;
  const keyPositions = useMemo(() => {
    const list = [];
    const spacing = 0.032;
    for (let r = 0; r < KEY_ROWS; r++) {
      for (let c = 0; c < KEY_COLS; c++) {
        list.push([
          (c - (KEY_COLS - 1) / 2) * spacing,
          0.012,
          (r - (KEY_ROWS - 1) / 2) * spacing,
        ]);
      }
    }
    return list;
  }, []);
  useFrame((state, delta) => {
    hue.current = (hue.current + delta * 0.06) % 1;
    const color = new THREE.Color().setHSL(hue.current, 0.85, 0.55);
    if (glowRef.current) {
      glowRef.current.material.color = color;
      glowRef.current.material.emissive = color;
    }
    if (keysRef.current) {
      keysRef.current.forEach((mesh, i) => {
        if (!mesh) return;
        const flicker = 0.75 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.05;
        mesh.material.emissiveIntensity = flicker;
      });
    }
  });

  return (
    <group position={position}>
      {/* Deck / chassis */}
      <RoundedBox args={[0.48, 0.02, 0.16]} radius={0.01} smoothness={2} castShadow receiveShadow>
        <meshStandardMaterial color={COLORS.metalDark} roughness={0.5} metalness={0.4} />
      </RoundedBox>
      {/* RGB underglow strip */}
      <mesh ref={glowRef} position={[0, -0.005, 0]}>
        <boxGeometry args={[0.47, 0.004, 0.15]} />
        <meshStandardMaterial
          color={COLORS.keycapGlow}
          emissive={COLORS.keycapGlow}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>
      {/* Keycaps */}
      {keyPositions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (!keysRef.current) keysRef.current = [];
            keysRef.current[i] = el;
          }}
          position={pos}
          castShadow
        >
          <boxGeometry args={[0.024, 0.014, 0.024]} />
          <meshStandardMaterial
            color={COLORS.keycap}
            emissive={COLORS.keycapGlow}
            emissiveIntensity={0.7}
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

// ── Mouse ─────────────────────────────────────────────────────────────────────
export const Mouse = ({ position = [0.32, 0.052, 0.5] }) => (
  <group position={position} rotation={[0, -0.25, 0]}>
    <RoundedBox args={[0.09, 0.035, 0.14]} radius={0.035} smoothness={4} castShadow>
      <meshStandardMaterial color={COLORS.metal} roughness={0.3} metalness={0.6} />
    </RoundedBox>
    <mesh position={[0, 0.019, -0.02]}>
      <boxGeometry args={[0.008, 0.002, 0.05]} />
      <meshStandardMaterial color={COLORS.blueGlow} emissive={COLORS.blueGlow} emissiveIntensity={1} toneMapped={false} />
    </mesh>
  </group>
);

// ── Coffee mug (clickable → steam animation) ────────────────────────────────
export const CoffeeMug = ({ position = [1.35, 0.1, 0.42] }) => {
  const [hovered, setHovered] = useState(false);
  const [steaming, setSteaming] = useState(false);
  const groupRef = useRef();
  const steamRefs = useRef([]);
  const steamStart = useRef(0);
  const wobble = useRef(0);

  const triggerAnimation = useCallback(() => {
    wobble.current = 1;
    setSteaming(true);
    steamStart.current = performance.now();
    window.setTimeout(() => setSteaming(false), 2200);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current && wobble.current > 0) {
      wobble.current = Math.max(0, wobble.current - delta * 2);
      groupRef.current.rotation.z = Math.sin(wobble.current * Math.PI * 4) * 0.12 * wobble.current;
      groupRef.current.scale.setScalar(1 + Math.sin(wobble.current * Math.PI * 6) * 0.04 * wobble.current);
    }

    if (steaming) {
      const elapsed = (performance.now() - steamStart.current) / 1000;
      steamRefs.current.forEach((mesh, i) => {
        if (!mesh) return;
        const t = (elapsed + i * 0.4) % 1.6;
        mesh.position.y = 0.12 + t * 0.35;
        mesh.position.x = Math.sin((elapsed + i) * 3) * 0.02;
        const mat = mesh.material;
        mat.opacity = Math.max(0, 0.5 - t * 0.32);
        mesh.scale.setScalar(0.5 + t * 0.6);
      });
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        triggerAnimation();
      }}
    >
      <mesh castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.07, 20]} />
        <meshStandardMaterial color={COLORS.mugBody} roughness={0.4} metalness={0.05} />
      </mesh>
      <mesh position={[0.055, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.025, 0.007, 8, 16, Math.PI]} />
        <meshStandardMaterial color={COLORS.mugAccent} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.036, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.004, 20]} />
        <meshStandardMaterial color="#2a1810" roughness={0.3} />
      </mesh>

      {/* Steam puffs — hidden (opacity 0) until clicked */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => (steamRefs.current[i] = el)}
          position={[0, 0.12, 0]}
        >
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}

      <HoverLabel show={hovered} text="☕ click me" position={[0, 0.12, 0]} />
    </group>
  );
};

// ── Books ─────────────────────────────────────────────────────────────────────
export const Books = ({ position = [1.4, 0.06, -0.35] }) => (
  <group position={position} rotation={[0, 0.3, 0]}>
    {COLORS.bookColors.slice(0, 3).map((color, i) => (
      <mesh key={i} position={[0, i * 0.045, 0]} rotation={[0, (Math.random() - 0.5) * 0.1, 0]} castShadow>
        <boxGeometry args={[0.34, 0.04, 0.24]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
    ))}
  </group>
);

// ── Plant ─────────────────────────────────────────────────────────────────────
export const Plant = ({ position = [-1.62, 0.12, -0.55] }) => {
  const leavesRef = useRef();

  useFrame((state) => {
    if (leavesRef.current) {
      leavesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
    }
  });

  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.09, 0.07, 0.14, 16]} />
        <meshStandardMaterial color={COLORS.plantPot} roughness={0.7} />
      </mesh>
      <group ref={leavesRef} position={[0, 0.12, 0]}>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.05, 0.08 + (i % 2) * 0.04, Math.sin(angle) * 0.05]}
              rotation={[Math.PI / 5, angle, 0]}
              castShadow
            >
              <coneGeometry args={[0.045, 0.2, 4]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? COLORS.plantLeaf : COLORS.plantLeafDark}
                roughness={0.6}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// ── RGB desk-edge light strip ───────────────────────────────────────────────
export const RGBStrip = () => {
  const stripRef = useRef();
  const lightRef = useRef();
  const hue = useRef(0.55);

  useFrame((state, delta) => {
    hue.current = (hue.current + delta * 0.05) % 1;
    const color = new THREE.Color().setHSL(hue.current, 0.9, 0.55);
    if (stripRef.current) {
      stripRef.current.material.color = color;
      stripRef.current.material.emissive = color;
    }
    if (lightRef.current) {
      lightRef.current.color = color;
      lightRef.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={stripRef} position={[0, -0.038, 0.81]}>
        <boxGeometry args={[3.6, 0.01, 0.01]} />
        <meshStandardMaterial color={COLORS.purple} emissive={COLORS.purple} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      <pointLight ref={lightRef} position={[0, -0.1, 0.85]} color={COLORS.purple} intensity={0.8} distance={2.2} decay={2} />
    </group>
  );
};
