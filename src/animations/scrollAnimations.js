// ─────────────────────────────────────────────────────────────────────────────
// Reusable GSAP ScrollTrigger animation helpers
// ─────────────────────────────────────────────────────────────────────────────
// These are shared presets used across components. Components can call these
// helpers or use them as reference for their own ScrollTrigger configs.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a standard fade-up ScrollTrigger config for a given element.
 * @param {Element} element - The DOM element to animate.
 * @param {object}  [overrides] - Optional GSAP tween overrides.
 */
export const fadeUpOnScroll = (element, overrides = {}) => ({
  from: { opacity: 0, y: 60 },
  to: {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 82%',
      toggleActions: 'play none none reverse',
    },
    ...overrides,
  },
});

/**
 * Returns a standard fade-in ScrollTrigger config.
 * @param {Element} element
 * @param {object}  [overrides]
 */
export const fadeInOnScroll = (element, overrides = {}) => ({
  from: { opacity: 0 },
  to: {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    ...overrides,
  },
});
