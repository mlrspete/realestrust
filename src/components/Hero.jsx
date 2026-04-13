import { useEffect, useRef, useState } from "react";
import BoardComposition from "./BoardComposition.jsx";
import CopyBlock from "./CopyBlock.jsx";
import { createHeroTimeline } from "../lib/createHeroTimeline.js";
import { useBoardParallax } from "../lib/useBoardParallax.js";

function Hero() {
  const heroRef = useRef(null);
  const boardMotionRef = useRef(null);
  const boardParallaxRef = useRef(null);
  const boardRef = useRef(null);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    setIntroComplete(false);

    try {
      return createHeroTimeline({
        root: heroRef.current,
        onSetup: () => setIntroComplete(false),
        onComplete: () => setIntroComplete(true),
      });
    } catch {
      setIntroComplete(true);
      return undefined;
    }
  }, []);

  useBoardParallax({
    rootRef: heroRef,
    boardRef,
    motionRef: boardMotionRef,
    parallaxRef: boardParallaxRef,
    enabled: introComplete,
  });

  return (
    <main className="hero" ref={heroRef}>
      <div className="hero-atmosphere" aria-hidden="true">
        <svg
          className="hero-strategy-route"
          viewBox="0 0 640 980"
          preserveAspectRatio="none"
          data-ambient-depth="0.03"
        >
          <path
            className="hero-strategy-route__glow"
            d="M188 28C112 146 252 264 180 426C120 568 250 706 202 952"
          />
          <path
            className="hero-strategy-route__path"
            d="M188 28C112 146 252 264 180 426C120 568 250 706 202 952"
          />
        </svg>
        <div
          className="hero-backdrop hero-backdrop--copy-pocket"
          data-ambient-depth="0.04"
        />
        <div
          className="hero-backdrop hero-backdrop--field"
          data-ambient-depth="0.08"
        />
        <div
          className="hero-backdrop hero-backdrop--board-bloom"
          data-ambient-depth="0.14"
        />
        <div
          className="hero-backdrop hero-backdrop--board-pool"
          data-ambient-depth="0.1"
        />
      </div>
      <div className="hero-scaffold" aria-hidden="true">
        <span className="hero-scaffold__rail hero-scaffold__rail--copy" />
        <span className="hero-scaffold__rail hero-scaffold__rail--board" />
      </div>
      <div className="hero-grid">
        <CopyBlock />
        <BoardComposition
          motionRef={boardMotionRef}
          parallaxRef={boardParallaxRef}
          boardRef={boardRef}
        />
      </div>
      <footer className="hero-footer-rail" aria-label="Footer legal notice">
        <span className="hero-footer-rail__rule" aria-hidden="true" />
        <span className="hero-footer-rail__text">
          ALL RIGHTS RESERVED / REAL RUST PTY LTD / 2025
        </span>
      </footer>
    </main>
  );
}

export default Hero;
