import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO SWAP IN A CUSTOM GLB MODEL
// ─────────────────────────────────────────────────────────────────────────────
// 1. Install: npm i @react-three/drei  (already in package.json)
// 2. Drop your .glb into /frontend/public/assets/models/character.glb
// 3. At the top of this file add:
//      import { useGLTF } from '@react-three/drei';
// 4. Replace the <BodyGeometry> usage below with:
//      const { scene } = useGLTF('/assets/models/character.glb');
//      return <primitive object={scene} />;
// 5. The <CharacterRig> wrapper (mouse-look + breathing + float) stays
//    exactly the same — just nest the <primitive> inside it.
//
// Everything in Scene3D.jsx (lights, shadows, camera) works unchanged.
// ─────────────────────────────────────────────────────────────────────────────

// ── Lerp helper ──────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;

// ─────────────────────────────────────────────────────────────────────────────
// CharacterRig  —  animation driver
//
// This is the only component that needs to stay when you swap in a GLB.
// It handles:
//   • Idle float     — smooth Y sine oscillation
//   • Mouse look     — whole-body rotation, lerped
//
// When using a GLB: pass the <primitive> as children instead of
// <BodyGeometry>.
// ─────────────────────────────────────────────────────────────────────────────
const CharacterRig = ({ mouse }) => {
  const rootRef    = useRef();   // whole character root — float + body rotation

  const { scene } = useGLTF('/assets/models/character.glb');

  // Enable shadows and calculate automatic scale & ground offset
  const { scale, positionOffset } = useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const height = size.y;

    const targetHeight = 1.95; // target height in units
    const s = targetHeight / Math.max(height, 0.01);

    // Calculate Y offset to align the bottom of the model with the ground plane
    const minY = box.min.y * s;
    const yOffset = -minY;

    // Center the model on X/Z too. Not every exported GLB has its origin
    // sitting exactly on the character's own centre line, so without this
    // the model can end up visibly off-axis (not "perfectly aligned")
    // even though yOffset already puts the feet on the ground correctly.
    const xOffset = -center.x * s;
    const zOffset = -center.z * s;

    return {
      scale: s,
      positionOffset: [xOffset, yOffset, zOffset]
    };
  }, [scene]);

  // Smooth rotation targets (avoid jerk)
  const rot = useRef({ bodyY: 0, bodyX: 0 });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // ── 1. Smooth idle float ──────────────────────────────────────────────
    if (rootRef.current) {
      // Primary float: slow sine
      const floatY = Math.sin(t * 0.95) * 0.11;
      // Secondary micro-wobble: adds organic feel
      const microY = Math.sin(t * 2.3 + 1.0) * 0.018;
      rootRef.current.position.y = floatY + microY;

      // ── 2. Smooth mouse look (whole body, subtle) ─────────────────────
      const tBodyY = mouse.current.x * 0.28;
      const tBodyX = mouse.current.y * 0.10;
      rot.current.bodyY = lerp(rot.current.bodyY, tBodyY, 0.04);
      rot.current.bodyX = lerp(rot.current.bodyX, tBodyX, 0.04);
      rootRef.current.rotation.y = rot.current.bodyY;
      rootRef.current.rotation.x = rot.current.bodyX;
    }
  });

  return (
    // Root group — base Y offset so feet sit at contact-shadow plane
    <group ref={rootRef} position={[0, -0.28, 0]}>
      <primitive object={scene} scale={scale} position={positionOffset} />
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Character  — public export consumed by Scene3D
// ─────────────────────────────────────────────────────────────────────────────
const Character = ({ mouse }) => <CharacterRig mouse={mouse} />;

export default React.memo(Character);
