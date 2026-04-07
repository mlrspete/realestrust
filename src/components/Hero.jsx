import { useLayoutEffect, useRef, useState } from "react";
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

  useLayoutEffect(() => {
    setIntroComplete(false);

    return createHeroTimeline({
      root: heroRef.current,
      onSetup: () => setIntroComplete(false),
      onComplete: () => setIntroComplete(true),
    });
  }, []);

  useBoardParallax({
    boardRef,
    motionRef: boardMotionRef,
    parallaxRef: boardParallaxRef,
    enabled: introComplete,
  });

  return (
    <main className="hero" ref={heroRef}>
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="hero-grid">
        <CopyBlock />
        <BoardComposition
          motionRef={boardMotionRef}
          parallaxRef={boardParallaxRef}
          boardRef={boardRef}
        />
      </div>
    </main>
  );
}

export default Hero;
