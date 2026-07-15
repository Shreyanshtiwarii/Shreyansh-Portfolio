import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Globe.module.css';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────
const RADIUS = 2;
const INDIA = { lat: 22.7196, lon: 75.8577, label: 'Indore, India' };
const AUTO_ROTATE_SPEED = 0.11;      // rad/sec, idle cruise speed
const DRAG_ROTATE_FACTOR = 0.0055;   // rad per px of drag
const DAMPING = 0.9;                 // inertia decay per frame after release
const AXIAL_TILT = (23.4 * Math.PI) / 180;

// Rough continent outlines (lon, lat) — stylized, not survey-accurate.
// Used only to scatter a dot-matrix "land" texture across the sphere.
const CONTINENTS = [
  // North America
  [[-165,69],[-150,71],[-100,74],[-85,62],[-70,48],[-52,48],[-55,40],[-75,25],[-90,18],[-97,16],[-105,21],[-117,33],[-124,42],[-124,49],[-140,60],[-165,69]],
  // South America
  [[-79,9],[-60,11],[-35,-5],[-35,-23],[-58,-34],[-68,-55],[-75,-45],[-81,-5],[-79,9]],
  // Europe
  [[-9,71],[30,70],[40,60],[30,45],[42,42],[27,36],[-5,36],[-9,44],[-9,71]],
  // Africa
  [[-17,35],[35,32],[51,12],[51,-10],[40,-25],[20,-35],[12,-35],[8,-5],[-10,10],[-17,35]],
  // Asia (incl. India)
  [[27,45],[60,55],[90,73],[140,73],[180,68],[180,50],[150,45],[130,33],[122,25],[108,10],[95,6],[80,8],[68,25],[55,32],[45,38],[27,45]],
  // Australia
  [[113,-11],[130,-11],[145,-11],[153,-25],[150,-38],[137,-35],[115,-32],[113,-11]],
];

const pointInPolygon = (x, y, poly) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

const isLand = (lon, lat) => {
  if (lat < -63) return true; // Antarctica band
  return CONTINENTS.some((poly) => pointInPolygon(lon, lat, poly));
};

const latLonToVector3 = (lat, lon, radius) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// Soft circular sprite used for both the land dots and the marker glow.
const makeDotTexture = () => {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.4, 'rgba(255,255,255,0.9)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
};

const makeLabelSprite = (text) => {
  const canvas = document.createElement('canvas');
  const scale = 4;
  canvas.width = 256 * scale;
  canvas.height = 96 * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  ctx.font = '600 30px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // pill background
  const w = ctx.measureText(text).width + 44;
  const h = 42;
  const x = 128 - w / 2;
  const y = 48 - h / 2;
  const r = 12;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fillStyle = 'rgba(10,10,18,0.82)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(251,191,36,0.9)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.fillText(text, 128, 49);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.05, 1.05 * (96 / 256), 1);
  return sprite;
};

// ─────────────────────────────────────────────────────────────────────────────
// Globe — plain Three.js scene, no react-three-fiber.
// ─────────────────────────────────────────────────────────────────────────────
const Globe = () => {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const wrapperRef = useRef(null);
  const canvasHostRef = useRef(null);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(
      headRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 60, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    // ── Renderer / scene / camera ─────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = 'none';

    // ── Lighting (subtle, keeps the dark-glass look) ──────────────────────
    scene.add(new THREE.AmbientLight('#8a8ac8', 0.9));
    const keyLight = new THREE.DirectionalLight('#a78bfa', 1.6);
    keyLight.position.set(4, 3, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight('#3b82f6', 1.0);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // ── Globe group (this is what rotates) ────────────────────────────────
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = AXIAL_TILT;
    // Start facing roughly toward India for a nice initial frame
    globeGroup.rotation.y = -1.9;
    scene.add(globeGroup);

    // Ocean sphere
    const oceanGeo = new THREE.SphereGeometry(RADIUS, 48, 32);
    const oceanMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color('#0a1029'),
      emissive: new THREE.Color('#120a2e'),
      emissiveIntensity: 0.4,
      shininess: 12,
      specular: new THREE.Color('#4f9eff'),
      transparent: true,
      opacity: 0.96,
    });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    globeGroup.add(ocean);

    // Graticule (lat/long wireframe) — sits just above the ocean sphere
    const gridGeo = new THREE.SphereGeometry(RADIUS * 1.003, 24, 16);
    const gridMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#7c9cff'),
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    globeGroup.add(grid);

    // Land dot-matrix
    const dotTexture = makeDotTexture();
    const landPositions = [];
    const landColors = [];
    const colorNear = new THREE.Color('#a78bfa');
    const colorFar = new THREE.Color('#4f9eff');
    for (let lat = -84; lat <= 84; lat += 2.4) {
      const lonStep = 2.6 / Math.max(0.15, Math.cos((lat * Math.PI) / 180));
      for (let lon = -180; lon < 180; lon += Math.min(lonStep, 6)) {
        if (!isLand(lon, lat)) continue;
        const v = latLonToVector3(lat, lon, RADIUS * 1.012);
        landPositions.push(v.x, v.y, v.z);
        const c = colorNear.clone().lerp(colorFar, (lat + 90) / 180);
        landColors.push(c.r, c.g, c.b);
      }
    }
    const landGeo = new THREE.BufferGeometry();
    landGeo.setAttribute('position', new THREE.Float32BufferAttribute(landPositions, 3));
    landGeo.setAttribute('color', new THREE.Float32BufferAttribute(landColors, 3));
    const landMat = new THREE.PointsMaterial({
      size: 0.052,
      map: dotTexture,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true,
    });
    const landPoints = new THREE.Points(landGeo, landMat);
    globeGroup.add(landPoints);

    // Atmosphere glow (Fresnel rim shader) — not part of the rotating group
    const atmoGeo = new THREE.SphereGeometry(RADIUS * 1.16, 48, 32);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: { glowColor: { value: new THREE.Color('#8b5cf6') } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
    scene.add(atmosphere);

    // Starfield backdrop (fixed, doesn't rotate with the globe)
    const starGeo = new THREE.BufferGeometry();
    const starPositions = [];
    for (let i = 0; i < 700; i++) {
      const r = 22 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.05,
      color: '#ffffff',
      transparent: true,
      opacity: 0.55,
      map: dotTexture,
      depthWrite: false,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── India marker ───────────────────────────────────────────────────────
    const markerGroup = new THREE.Group();
    const markerPos = latLonToVector3(INDIA.lat, INDIA.lon, RADIUS * 1.015);
    markerGroup.position.copy(markerPos);
    markerGroup.lookAt(markerPos.clone().multiplyScalar(2));
    globeGroup.add(markerGroup);

    const markerDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      new THREE.MeshBasicMaterial({ color: '#fbbf24' })
    );
    markerGroup.add(markerDot);

    const markerGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: dotTexture,
        color: '#fbbf24',
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      })
    );
    markerGlow.scale.set(0.28, 0.28, 1);
    markerGroup.add(markerGlow);

    // Pulsing radar ring, flat against the surface, facing outward
    const ringGeo = new THREE.RingGeometry(0.06, 0.075, 40);
    const ringMat = new THREE.MeshBasicMaterial({
      color: '#fbbf24',
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    markerGroup.add(ring);

    const label = makeLabelSprite(INDIA.label);
    label.position.set(0, 0.24, 0);
    markerGroup.add(label);

    // ── Sizing / responsiveness ────────────────────────────────────────────
    const resize = () => {
      const { clientWidth, clientHeight } = host;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // ── Drag-to-rotate with inertia, resuming smooth auto-rotation ────────
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velocityY = AUTO_ROTATE_SPEED; // rad/sec-ish, driven manually below
    let velocityX = 0;
    let idleTimer = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      idleTimer = 0;
      setHint(false);
      renderer.domElement.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      globeGroup.rotation.y += dx * DRAG_ROTATE_FACTOR;
      globeGroup.rotation.x = THREE.MathUtils.clamp(
        globeGroup.rotation.x + dy * DRAG_ROTATE_FACTOR,
        AXIAL_TILT - 0.9,
        AXIAL_TILT + 0.9
      );
      velocityY = dx * DRAG_ROTATE_FACTOR * 60; // approx rad/sec for inertia
      velocityX = dy * DRAG_ROTATE_FACTOR * 60;
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // ── Pause rendering when scrolled off-screen ──────────────────────────
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(host);

    // ── Render loop ─────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!isVisible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();

      if (isDragging) {
        // handled directly in pointermove
      } else {
        // Inertia decay, then settle back into a gentle constant cruise
        velocityY *= DAMPING;
        velocityX *= DAMPING;
        idleTimer += dt;
        const cruise = THREE.MathUtils.lerp(0, AUTO_ROTATE_SPEED, Math.min(idleTimer / 1.2, 1));
        globeGroup.rotation.y += (velocityY * dt) + cruise * dt;
        globeGroup.rotation.x += velocityX * dt;
        globeGroup.rotation.x = THREE.MathUtils.clamp(
          globeGroup.rotation.x,
          AXIAL_TILT - 0.9,
          AXIAL_TILT + 0.9
        );
      }

      // Radar ping loop on the India marker
      const pulse = (t * 0.6) % 1;
      const ringScale = 1 + pulse * 2.6;
      ring.scale.set(ringScale, ringScale, ringScale);
      ringMat.opacity = 0.85 * (1 - pulse);
      markerDot.scale.setScalar(1 + Math.sin(t * 3.2) * 0.12);

      renderer.render(scene, camera);
    };
    tick();

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      io.disconnect();
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      [oceanGeo, gridGeo, landGeo, atmoGeo, starGeo, ringGeo].forEach((g) => g.dispose());
      [oceanMat, gridMat, landMat, atmoMat, starMat, ringMat].forEach((m) => m.dispose());
      dotTexture.dispose();
      label.material.map.dispose();
      label.material.dispose();
      markerDot.geometry.dispose();
      markerDot.material.dispose();
      markerGlow.material.dispose();
      renderer.dispose();
      if (dom.parentNode) dom.parentNode.removeChild(dom);
    };
  }, []);

  return (
    <section id="globe" className={styles.section} ref={sectionRef}>
      <div className="section-container">
        <div className={styles.head} ref={headRef}>
          <h2 className={styles.eyebrow}>Location</h2>
          <p className={styles.title}>
            Somewhere on <span className="gradient-text">Planet Earth</span>
          </p>
          <p className={styles.subtitle}>
            Drag to spin the globe — it finds its way back to Indore, India on its own.
          </p>
        </div>

        <div className={styles.globeCard} ref={wrapperRef}>
          <div className={styles.canvasHost} ref={canvasHostRef} />

          <div className={styles.readout}>
            <span className={styles.readoutDot} />
            <span>Indore, India · 22.72°N, 75.86°E</span>
          </div>

          <div className={`${styles.hint} ${hint ? '' : styles.hintHidden}`}>
            drag to rotate
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Globe);
