import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import ignitionAudioSrc from '../assets/Edited_Audio.mp3';


/* ═══════════════════════════════════════════════════════════════════════
   SYSTEM IGNITION — Cinematic Intro
   
   Pure CSS + GSAP. No WebGL. Maximum smoothness.
   Inspired by Dolby Atmos cinema intros & Apple silicon reveals.
   
   Visual language:
   - Absolute darkness as canvas
   - Light emerges with intention
   - Multiple concentric ripples — sonar/pulse aesthetic
   - Luminous center glow breathes
   - Text is precise, authoritative, minimal
   ═══════════════════════════════════════════════════════════════════════ */

interface SystemIgnitionProps {
  onComplete: () => void;
}

export const SystemIgnition = ({ onComplete }: SystemIgnitionProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [typedText, setTypedText] = useState('');
  const [showEnter, setShowEnter] = useState(false);
  const [started, setStarted] = useState(false);
  const splashRef = useRef<HTMLDivElement>(null);
  const command = '$ whoami';

  // ── Guards ──
  const shouldSkip = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const stableOnComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    if (shouldSkip) stableOnComplete();
  }, [shouldSkip, stableOnComplete]);

  // ── Splash typing effect ──
  useEffect(() => {
    if (shouldSkip || started) return;
    const startDelay = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTypedText(command.slice(0, i));
        if (i >= command.length) {
          clearInterval(interval);
          setTimeout(() => setShowEnter(true), 200);
        }
      }, 80);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(startDelay);
  }, [shouldSkip, started, command]);

  // ── Handle enter click ──
  const handleEnter = useCallback(() => {
    if (started || !splashRef.current) return;

    // Complex exit sequence
    const tl = gsap.timeline({
      onComplete: () => setStarted(true),
    });

    const terminal = splashRef.current.querySelector('.splash-terminal');
    const btn = splashRef.current.querySelector('.splash-enter-wrap');
    const grid = splashRef.current.querySelector('.splash-grid');
    const particles = splashRef.current.querySelectorAll('.splash-particle');

    // 1. Text glitches out/vanishes instantly
    if (terminal) {
      tl.to(terminal, {
        scaleX: 2,
        scaleY: 0.1,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.3,
        ease: 'power4.in',
      }, 0);
    }
    // 2. Button drops down
    if (btn) {
      tl.to(btn, { y: 50, opacity: 0, duration: 0.4, ease: 'back.in(2)' }, 0);
    }
    // 3. Grid warps/scales up violently
    if (grid) {
      tl.to(grid, { scale: 5, opacity: 0, duration: 0.8, ease: 'expo.in' }, 0);
    }
    // 4. Particles scatter
    if (particles.length) {
      tl.to(particles, {
        x: (i) => (i % 2 === 0 ? -100 : 100),
        y: (i) => (i < 3 ? -100 : 100),
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
      }, 0);
    }
    // 5. Overall container fade
    tl.to(splashRef.current, { opacity: 0, duration: 0.2 }, 0.5);
  }, [started]);

  // ── Ignition Sequence (after enter click) ──
  useEffect(() => {
    if (shouldSkip || !started) return;

    // Audio unlocked by user gesture
    const audio = new Audio(ignitionAudioSrc);
    audio.volume = 0;
    audio.play().catch(() => { });

    // Smooth fade in
    gsap.to(audio, { volume: 0.8, duration: 2, ease: 'power2.inOut' });

    // Go straight into the sequence (typing already done on splash)
    const startDelay = setTimeout(() => startSequence(), 300);

    function startSequence() {
      const tl = gsap.timeline({
        onComplete: () => stableOnComplete(),
      });

      // ── Name emerge ──
      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      // Horizontal accent lines extend from name
      tl.to([lineLeftRef.current, lineRightRef.current], {
        scaleX: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3');

      // Subtitle
      tl.to(subtitleRef.current, {
        opacity: 0.45,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.2');

      // ── Center glow ignites ──
      tl.to(glowRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.1');

      // ── Text recedes ──
      tl.to([nameRef.current, subtitleRef.current, lineLeftRef.current, lineRightRef.current], {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '+=0.3');

      // ── Concentric ripples ──
      tl.add(() => {
        if (!ripplesRef.current) return;
        const rings = ripplesRef.current.children;

        for (let i = 0; i < rings.length; i++) {
          const ring = rings[i] as HTMLElement;
          gsap.fromTo(ring,
            { scale: 0.3, opacity: 0.6 },
            {
              scale: 14 + i * 2,
              opacity: 0,
              duration: 2.8 + i * 0.3,
              delay: i * 0.2,
              ease: 'power2.out',
            }
          );
        }
      }, '-=0.2');

      // ── Profile image emerges from ripple center ──
      tl.to(profileRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'power2.out',
      }, '<+=0.3');

      // Glow pulses brighter with ripples — two-stage throb
      tl.to(glowRef.current, {
        opacity: 1.5,
        scale: 1.6,
        duration: 0.35,
        ease: 'power2.in',
      }, '<');
      tl.to(glowRef.current, {
        opacity: 0.8,
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.out',
      });
      // Second throb (echo)
      tl.to(glowRef.current, {
        opacity: 1.2,
        scale: 1.4,
        duration: 0.25,
        ease: 'power2.in',
      }, '-=0.1');
      tl.to(glowRef.current, {
        opacity: 0.5,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
      });

      // ── Luminance flash ──
      tl.to(flashRef.current, {
        opacity: 0.1,
        duration: 0.1,
        ease: 'power4.in',
      }, '-=0.7');
      tl.to(flashRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

      // ── Dissolve: fade audio + slide profile image into hero position ──
      tl.add(() => {
        // Fade audio volume out over 1.5s
        gsap.to(audio, { volume: 0, duration: 1.5, ease: 'power2.out' });
      });
      tl.add(() => {
        const heroImg = document.getElementById('hero-profile-img');
        const profileEl = profileRef.current;
        if (heroImg && profileEl) {
          const heroRect = heroImg.getBoundingClientRect();
          const profileRect = profileEl.getBoundingClientRect();

          // Calculate delta from current center to hero image center
          const dx = (heroRect.left + heroRect.width / 2) - (profileRect.left + profileRect.width / 2);
          const dy = (heroRect.top + heroRect.height / 2) - (profileRect.top + profileRect.height / 2);
          const targetScale = heroRect.width / profileRect.width;

          gsap.to(profileEl, {
            x: dx,
            y: dy,
            scale: targetScale,
            borderColor: 'rgba(10, 10, 10, 0.8)',
            boxShadow: '0 0 0px rgba(0,0,0,0)',
            duration: 1.0,
            ease: 'power3.inOut',
          });
        }
      });

      tl.to(glowRef.current, {
        opacity: 0,
        scale: 2,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '<');

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '<+=0.2');
    }

    return () => {
      clearTimeout(startDelay);
      audio.pause();
      audio.currentTime = 0;
      gsap.killTweensOf('*');
    };
  }, [shouldSkip, stableOnComplete, started]);

  if (shouldSkip) return null;

  return (
    <div ref={overlayRef} className="ignition-overlay">

      {/* Persistent Background (visible after splash fades) */}
      <div className="ignition-background">
        <div className="splash-grid" style={{ opacity: 0.4 }} />
        <div className="splash-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`splash-particle splash-particle-${(i % 6) + 1}`} />
          ))}
        </div>
      </div>

      {/* Premium splash screen */}
      {!started && (
        <div ref={splashRef} className="ignition-splash" onClick={handleEnter}>
          {/* Animated grid background */}
          <div className="splash-grid" />

          {/* Floating particles */}
          <div className="splash-particles">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`splash-particle splash-particle-${i + 1}`} />
            ))}
          </div>

          {/* Content */}
          <div className="splash-content">
            {/* Terminal typing at top */}
            <div className="splash-terminal splash-glitch">
              <span>{typedText}</span>
              <span className="ignition-cursor" />
            </div>

            {/* Enter button — fades in after typing */}
            <div className={`splash-enter-wrap ${showEnter ? 'splash-enter-visible' : ''}`}>
              <button className="splash-enter" type="button">
                <div className="splash-enter-inner">
                  <span className="splash-enter-text">ENTER PORTFOLIO</span>
                  <span className="splash-enter-arrow">→</span>
                </div>
              </button>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="splash-corner splash-corner-tl" />
          <div className="splash-corner splash-corner-br" />
        </div>
      )}



      {/* Name */}
      <div ref={nameRef} className="ignition-name">
        Neeraj
      </div>

      {/* Horizontal accent lines */}
      <div ref={lineLeftRef} className="ignition-line ignition-line--left" />
      <div ref={lineRightRef} className="ignition-line ignition-line--right" />

      {/* Subtitle */}
      <div ref={subtitleRef} className="ignition-subtitle">
        system online
      </div>

      {/* Center glow */}
      <div ref={glowRef} className="ignition-glow" />

      {/* Profile image */}
      <div ref={profileRef} className="ignition-profile">
        <img src="/Neeraj_LinkedIn.png" alt="Neeraj" />
      </div>

      {/* Concentric ripple rings — tight cluster */}
      <div ref={ripplesRef} className="ignition-ripples">
        <div className="ignition-ring" />
        <div className="ignition-ring" />
        <div className="ignition-ring" />
        <div className="ignition-ring" />
      </div>

      {/* Luminance flash */}
      <div ref={flashRef} className="ignition-flash" />

      {/* Vignette */}
      <div className="ignition-vignette" />

      <style>{`
        .ignition-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          overflow: hidden;
        }

        .ignition-terminal {
          font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
          font-size: clamp(0.8rem, 1.4vw, 1rem);
          color: #444;
          letter-spacing: 0.06em;
          margin-bottom: 0.6rem;
          display: flex;
          align-items: center;
          gap: 2px;
          position: relative;
          z-index: 5;
        }

        .ignition-cursor {
          display: inline-block;
          width: 7px;
          height: 1.1em;
          background: #2a5090;
          animation: ignition-blink 1s step-end infinite;
          margin-left: 1px;
          border-radius: 1px;
        }

        .ignition-name {
          font-family: 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif;
          font-size: clamp(3.5rem, 12vw, 8rem);
          font-weight: 700;
          letter-spacing: -0.05em;
          color: #f0f0f0;
          opacity: 0;
          transform: translateY(24px);
          position: relative;
          z-index: 5;
          line-height: 1;
          text-shadow: 0 0 30px rgba(50, 100, 200, 0.35), 0 0 80px rgba(40, 90, 180, 0.15);
        }

        .ignition-line {
          position: absolute;
          top: 50%;
          height: 1px;
          width: clamp(80px, 18vw, 280px);
          background: linear-gradient(90deg, transparent, rgba(50, 100, 180, 0.4), transparent);
          z-index: 4;
          opacity: 0;
          transform: scaleX(0);
        }
        .ignition-line--left {
          right: calc(50% + clamp(100px, 16vw, 260px));
          transform-origin: right center;
        }
        .ignition-line--right {
          left: calc(50% + clamp(100px, 16vw, 260px));
          transform-origin: left center;
        }

        .ignition-subtitle {
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
          font-size: clamp(0.6rem, 1vw, 0.75rem);
          color: #2a5090;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(8px);
          margin-top: 0.6rem;
          position: relative;
          z-index: 5;
        }

        .ignition-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          transform: translate(-50%, -50%) scale(0.5);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(50, 100, 200, 0.35) 0%,
            rgba(40, 80, 160, 0.18) 30%,
            rgba(30, 60, 120, 0.06) 55%,
            transparent 75%
          );
          opacity: 0;
          z-index: 2;
          pointer-events: none;
          filter: blur(25px);
        }

        .ignition-profile {
          position: absolute;
          top: 50%;
          left: 50%;
          width: clamp(100px, 18vw, 180px);
          height: clamp(100px, 18vw, 180px);
          transform: translate(-50%, -50%) scale(0.4);
          opacity: 0;
          z-index: 4;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(60, 120, 210, 0.3);
          box-shadow: 0 0 30px rgba(50, 100, 200, 0.2), 0 0 60px rgba(40, 80, 180, 0.1);
        }
        .ignition-profile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(0.3);
        }

        .ignition-ripples {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          pointer-events: none;
        }

        .ignition-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 120px;
          margin-top: -60px;
          margin-left: -60px;
          border-radius: 50%;
          border: 2px solid rgba(60, 120, 210, 0.35);
          box-shadow: 
            0 0 20px rgba(50, 100, 200, 0.15),
            0 0 50px rgba(50, 100, 200, 0.06),
            0 0 80px rgba(40, 80, 180, 0.03),
            inset 0 0 20px rgba(50, 100, 200, 0.08);
          opacity: 0;
          transform: scale(0.05);
          will-change: transform, opacity;
        }

        .ignition-flash {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(80, 130, 200, 0.2) 0%,
            rgba(255, 255, 255, 0.05) 40%,
            transparent 70%
          );
          opacity: 0;
          z-index: 6;
          pointer-events: none;
        }

        .ignition-enter {
          position: absolute;
          z-index: 10;
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
          font-size: clamp(0.65rem, 1.2vw, 0.85rem);
          color: rgba(100, 140, 200, 0.6);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          animation: ignition-fade-pulse 2s ease-in-out infinite;
        }

        @keyframes ignition-fade-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        /* ── Premium Splash Screen ── */
        .ignition-splash {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: #050508;
          overflow: hidden;
        }

        .ignition-background {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: #050508;
          overflow: hidden;
        }
        
        /* CRT Scanline Overlay */
        .ignition-splash::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.1) 50%
          ), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          background-size: 100% 3px, 3px 100%;
          pointer-events: none;
          z-index: 5;
        }

        .splash-grid {
          position: absolute;
          inset: -50%;
          background-image:
            linear-gradient(rgba(40, 80, 160, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(40, 80, 160, 0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: splash-grid-drift 20s linear infinite;
        }
        @keyframes splash-grid-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .splash-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .splash-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(80, 160, 255, 0.3);
          border-radius: 50%;
          animation: splash-float 12s ease-in-out infinite;
        }
        .splash-particle-1 { top: 20%; left: 15%; animation-delay: 0s; animation-duration: 14s; }
        .splash-particle-2 { top: 70%; left: 80%; animation-delay: -3s; animation-duration: 11s; }
        .splash-particle-3 { top: 40%; left: 60%; animation-delay: -6s; animation-duration: 16s; }
        .splash-particle-4 { top: 80%; left: 30%; animation-delay: -2s; animation-duration: 13s; }
        .splash-particle-5 { top: 10%; left: 75%; animation-delay: -8s; animation-duration: 15s; }
        .splash-particle-6 { top: 55%; left: 10%; animation-delay: -4s; animation-duration: 12s; }

        @keyframes splash-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          25% { transform: translateY(-30px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-15px); opacity: 0.3; }
          75% { transform: translateY(-40px) translateX(5px); opacity: 0.5; }
        }

        .splash-terminal {
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
          font-size: clamp(0.9rem, 2vw, 1.2rem);
          color: rgba(160, 200, 255, 0.9);
          margin-bottom: 40px;
          min-height: 24px;
          display: flex;
          align-items: center;
          gap: 2px;
          text-shadow: 0 0 10px rgba(60, 120, 255, 0.4);
        }

        .splash-enter-wrap {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          pointer-events: none;
        }
        .splash-enter-visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .splash-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          text-align: center;
          padding: 20px;
        }

        .splash-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
          font-size: 0.65rem;
          color: rgba(60, 200, 120, 0.7);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 20px;
          padding: 6px 16px;
          border: 1px solid rgba(60, 200, 120, 0.15);
          border-radius: 20px;
          background: rgba(60, 200, 120, 0.03);
        }
        .splash-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(60, 200, 120, 0.8);
          animation: splash-dot-pulse 2s ease-in-out infinite;
        }
        @keyframes splash-dot-pulse {
          0%, 100% { opacity: 0.4; box-shadow: 0 0 4px rgba(60, 200, 120, 0.2); }
          50% { opacity: 1; box-shadow: 0 0 8px rgba(60, 200, 120, 0.6); }
        }

        .splash-name {
          font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
          font-size: clamp(3rem, 12vw, 7rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 0;
          background: linear-gradient(
            135deg,
            rgba(200, 220, 255, 0.95) 0%,
            rgba(100, 160, 255, 0.7) 50%,
            rgba(60, 120, 210, 0.5) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 40px rgba(60, 120, 255, 0.15));
        }

        .splash-title {
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
          font-size: clamp(0.7rem, 1.5vw, 0.9rem);
          color: rgba(140, 170, 220, 0.45);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          margin: 12px 0 0 0;
        }

        .splash-enter {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 48px;
          padding: 1px; /* space for gradient border */
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(60, 120, 210, 0.4), rgba(160, 200, 255, 0.4));
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 20px rgba(60, 120, 210, 0.15);
        }
        
        .splash-enter-inner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 35px;
          background: #0a0f16;
          border-radius: 7px; /* 1px less than parent */
          position: relative;
          z-index: 1;
          transition: background 0.3s;
        }

        .splash-enter:hover {
          box-shadow: 0 0 40px rgba(60, 120, 210, 0.4), 0 0 8px rgba(160, 200, 255, 0.4);
          transform: translateY(-1px);
        }
        .splash-enter:hover .splash-enter-inner {
          background: rgba(10, 15, 22, 0.8);
        }
        .splash-enter:hover .splash-enter-arrow {
          transform: translateX(4px);
          color: #fff;
        }
        .splash-enter:hover .splash-enter-text {
          color: #fff;
          text-shadow: 0 0 8px rgba(160, 200, 255, 0.5);
        }

        .splash-enter-text {
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
          font-size: clamp(0.6rem, 1.1vw, 0.75rem);
          color: rgba(160, 200, 255, 0.9);
          letter-spacing: 0.25em;
          transition: color 0.3s, text-shadow 0.3s;
        }

        .splash-enter-arrow {
          font-size: 1rem;
          color: rgba(100, 160, 255, 0.7);
          transition: transform 0.3s, color 0.3s;
        }
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
          font-size: clamp(0.6rem, 1.1vw, 0.75rem);
          color: rgba(160, 200, 255, 0.8);
          letter-spacing: 0.25em;
        }

        .splash-enter-arrow {
          position: relative;
          font-size: 1rem;
          color: rgba(100, 160, 255, 0.6);
          transition: transform 0.3s;
        }

        .splash-hint {
          margin-top: 32px;
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
          font-size: 0.55rem;
          color: rgba(100, 130, 180, 0.2);
          letter-spacing: 0.2em;
        }

        .splash-corner {
          position: absolute;
          width: 40px;
          height: 40px;
          border-color: rgba(60, 120, 210, 0.12);
          border-style: solid;
          border-width: 0;
          z-index: 3;
        }
        .splash-corner-tl {
          top: 24px;
          left: 24px;
          border-top-width: 1px;
          border-left-width: 1px;
        }
        .splash-corner-br {
          bottom: 24px;
          right: 24px;
          border-bottom-width: 1px;
          border-right-width: 1px;
        }

        .ignition-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 30%,
            rgba(0, 0, 0, 0.75) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        @keyframes ignition-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .ignition-cursor {
          display: inline-block;
          width: 0.6em;
          height: 1.2em;
          background: rgba(160, 200, 255, 0.9);
          margin-left: 4px;
          animation: ignition-blink 1s step-end infinite;
          vertical-align: middle;
        }

        .splash-glitch {
          animation: splash-glitch-anim 2.5s infinite;
        }

        @keyframes splash-glitch-anim {
          0% { text-shadow: 0 0 10px rgba(60, 120, 255, 0.4); transform: translate(0); }
          2% { text-shadow: 2px 0 0 rgba(255, 0, 0, 0.5), -2px 0 0 rgba(0, 0, 255, 0.5); transform: translate(2px, 0); }
          4% { text-shadow: 0 0 10px rgba(60, 120, 255, 0.4); transform: translate(0); }
          96% { text-shadow: 0 0 10px rgba(60, 120, 255, 0.4); transform: translate(0); }
          98% { text-shadow: -2px 0 0 rgba(255, 0, 0, 0.5), 2px 0 0 rgba(0, 0, 255, 0.5); transform: translate(-2px, 0); }
          100% { text-shadow: 0 0 10px rgba(60, 120, 255, 0.4); transform: translate(0); }
        }
      `}</style>
    </div>
  );
};
