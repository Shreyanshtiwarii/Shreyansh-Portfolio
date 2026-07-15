import React, { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar/Navbar.jsx';
import Hero from '../components/Hero/Hero.jsx';
import About from '../components/About/About.jsx';

// Heavy / below-the-fold components are code-split so the initial bundle
// (Hero, Navbar, About) stays small and interactive quickly. Each chunk is
// fetched in the background and Suspense swaps it in seamlessly -- visual
// output and behavior are unchanged, only load timing improves.
import Scene3D from '../components/Scene3D/Scene3D.jsx';
const Skills = lazy(() => import('../components/Skills/Skills.jsx'));
const Work = lazy(() => import('../components/Work/Work.jsx'));
const Experience = lazy(() => import('../components/Experience/Experience.jsx'));
const Globe = lazy(() => import('../components/Globe/Globe.jsx'));
const Achievements  = lazy(() => import('../components/Achievements/Achievements.jsx'));
const Certificates  = lazy(() => import('../components/Certificates/Certificates.jsx'));
const Clubs         = lazy(() => import('../components/Clubs/Clubs.jsx'));
const AcademicJourney = lazy(() => import('../components/AcademicJourney/AcademicJourney.jsx'));
const Resume        = lazy(() => import('../components/Resume/Resume.jsx'));
const DevConsole = lazy(() => import('../components/DevConsole/DevConsole.jsx'));
const DevRoom = lazy(() => import('../components/DevRoom/DevRoom.jsx'));
const Contact = lazy(() => import('../components/Contact/Contact.jsx'));
const Footer = lazy(() => import('../components/Footer/Footer.jsx'));
const AIAssistant = lazy(() => import('../components/AIAssistant/AIAssistant.jsx'));

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sceneWrapperRef = useRef(null);

  useEffect(() => {
    // Move the 3D character from center to left as the About section
    // scrolls into view. Scrubbed to the scroll position for smooth control.
    const aboutEl = document.getElementById('about');

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 769px)',
        isMobile: '(max-width: 768px)',
      },
      (context) => {
        const { isMobile } = context.conditions;

        // Previously this was two independent gsap.to() calls, each with
        // its own ScrollTrigger and its own scrub smoothing. Because they
        // scrubbed on different trigger ranges ('top bottom'->'top 30%'
        // for the slide/scale, 'top top'->'bottom center' for the fade),
        // the two motions could drift out of sync with each other and with
        // the scrollbar, which read as jerkiness during the slide and an
        // inconsistent resting state right after it. A single timeline
        // driven by one ScrollTrigger keeps the slide, scale and fade
        // perfectly locked together and to the same scrub value.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutEl,
            start: 'top bottom',
            end: 'bottom center',
            // A touch of scrub smoothing (instead of 0.6 on two separate
            // triggers) gives the motion a little inertia so it doesn't
            // feel like it's stepping frame-to-frame with the scrollbar,
            // while still staying responsive.
            scrub: 1,
          },
        });

        tl.to(
          sceneWrapperRef.current,
          {
            // On mobile the About card is centered (not pushed to one side),
            // so shifting the character by the same -68% used on desktop
            // would shove it almost entirely off a narrow screen. A smaller
            // shift + extra shrink keeps it visible and in proportion instead.
            xPercent: isMobile ? -30 : -68,
            scale: isMobile ? 0.55 : 0.85,
            ease: 'none',
          },
          0
        ).to(
          sceneWrapperRef.current,
          {
            // Fade out over the back half of the same timeline so the
            // character is fully gone by the time About is centred on
            // screen, instead of racing against a separately-scrubbed tween.
            opacity: 0,
            ease: 'none',
          },
          0.5
        );
      }
    );

    // Lazy-loaded sections below the fold (Skills, Work, etc.) mount after
    // Home itself, changing the page's total height once their chunks
    // arrive. ScrollTrigger measures trigger start/end positions from the
    // layout at the time it's created, so on a slow connection those
    // positions can be stale by the time the extra content lands -- the
    // slide/scale/fade range silently shifts under the user mid-scroll,
    // which is the other big source of the "sometimes" glitchiness.
    // Refreshing whenever the document height changes keeps the trigger
    // math in sync with the real page, no matter how fast things loaded.
    const refreshOnResize = () => ScrollTrigger.refresh();
    const ro = new ResizeObserver(refreshOnResize);
    ro.observe(document.body);
    window.addEventListener('load', refreshOnResize);

    return () => {
      mm.revert();
      ro.disconnect();
      window.removeEventListener('load', refreshOnResize);
    };
  }, []);

  return (
    <>
      <Scene3D ref={sceneWrapperRef} />

      {/* Foreground UI */}
      <Navbar />

      <main>
        <Hero />
        <About />
        <Suspense fallback={null}>
          <Skills />
          <Work />
          <Achievements />
          <Certificates />
          <AcademicJourney />
          <Clubs />
          <Experience />
          <Globe />
          <DevConsole />
          <DevRoom />
          <Resume />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Floating AI assistant widget - available on every scroll position */}
      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>
    </>
  );
};

export default React.memo(Home);
