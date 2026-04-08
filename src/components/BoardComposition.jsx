import { useEffect, useState } from "react";
import BoardLayer from "./BoardLayer.jsx";
import ThreeBoardShell from "./ThreeBoardShell.jsx";
import heroManifest, {
  boardMediaQuery,
  boardSizes,
} from "../lib/heroManifest.js";

function readMobileState() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(boardMediaQuery).matches;
}

function BoardComposition({ motionRef, parallaxRef, boardRef }) {
  const [isMobile, setIsMobile] = useState(readMobileState);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      setIsMobile(false);
      return undefined;
    }

    const mediaQuery = window.matchMedia(boardMediaQuery);
    const sync = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", sync);
      return () => mediaQuery.removeEventListener("change", sync);
    }

    mediaQuery.addListener(sync);
    return () => mediaQuery.removeListener(sync);
  }, []);

  const layout = isMobile
    ? heroManifest.layouts.mobile
    : heroManifest.layouts.desktop;
  const boardSize = isMobile ? boardSizes.mobile : boardSizes.desktop;

  return (
    <section
      className="board-stage"
      id="placements"
      aria-label="Curated Real Rust campaign file board"
    >
      <div className="board-motion-shell" ref={motionRef}>
        <div className="board-parallax-shell" ref={parallaxRef}>
          <div
            className="board-shell"
            ref={boardRef}
            style={{ "--board-ratio": `${boardSize.width} / ${boardSize.height}` }}
          >
            <ThreeBoardShell boardSize={boardSize} />
            <div className="board-shell__glow" aria-hidden="true" />
            <div
              className="board-composition"
              data-board-layout={isMobile ? "mobile" : "desktop"}
            >
              <div className="board-slab" aria-hidden="true" />
              <BoardLayer band="z1" items={layout.layers.z1} boardSize={boardSize} />
              <BoardLayer band="z2" items={layout.layers.z2} boardSize={boardSize} />
              <BoardLayer band="z3" items={layout.layers.z3} boardSize={boardSize} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BoardComposition;
