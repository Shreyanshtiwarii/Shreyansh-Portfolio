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
    // Lazy-loaded sections below the fold (Skills, Work, etc.) mount after
    // Home itself, changing the page's total height once their chunks
    // arrive. ScrollTrigger measures trigger start/end positions from the
    // layout at the time it's created, so on a slow connection those
    // positions can be stale by the time the extra content lands.
    // Refreshing whenever the document height changes keeps the trigger
    // math in sync with the real page, no matter how fast things loaded.
    const refreshOnResize = () => ScrollTrigger.refresh();
    const ro = new ResizeObserver(refreshOnResize);
    ro.observe(document.body);
    window.addEventListener('load', refreshOnResize);

    return () => {
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
