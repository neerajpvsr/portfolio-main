import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';

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
  const terminalRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);

  const [typedText, setTypedText] = useState('');
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

  // ── Master Sequence ──
  useEffect(() => {
    if (shouldSkip) return;

    // Phase 0: Hold darkness
    const holdTimer = setTimeout(() => startTyping(), 500);
    let typeInterval: ReturnType<typeof setInterval>;

    function startTyping() {
      let charIndex = 0;
      typeInterval = setInterval(() => {
        charIndex++;
        setTypedText(command.slice(0, charIndex));
        if (charIndex >= command.length) {
          clearInterval(typeInterval);
          setTimeout(startSequence, 350);
        }
      }, 100);
    }

    function startSequence() {
      const tl = gsap.timeline({
        onComplete: () => {
          stableOnComplete();
        },
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
      tl.to([terminalRef.current, nameRef.current, subtitleRef.current, lineLeftRef.current, lineRightRef.current], {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '+=0.3');

      // ── Concentric ripples — deep, layered, cinematic ──
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

      // ── Dissolve everything ──
      tl.to(glowRef.current, {
        opacity: 0,
        scale: 2,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.3');

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.5');
    }

    return () => {
      clearTimeout(holdTimer);
      clearInterval(typeInterval);
      gsap.killTweensOf('*');
    };
  }, [shouldSkip, stableOnComplete]);

  if (shouldSkip) return null;

  return (
    <div ref={overlayRef} className="ignition-overlay">

      {/* Terminal */}
      <div ref={terminalRef} className="ignition-terminal">
        <span>{typedText}</span>
        <span className="ignition-cursor" />
      </div>

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
      `}</style>
    </div>
  );
};
