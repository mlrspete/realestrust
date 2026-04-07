import { useEffect, useState } from "react";
import BoardLayer from "./BoardLayer.jsx";
import ThreeBoardShell, { ThreeTargetMarker } from "./ThreeBoardShell.jsx";
import heroManifest, { boardSizes } from "../lib/heroManifest.js";

function readMobileState() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(max-width: 960px)").matches;
}

function BoardComposition({ motionRef, parallaxRef, boardRef }) {
  const [isMobile, setIsMobile] = useState(readMobileState);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 960px)");
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
  const targetItem =
    layout.layers.z2.find((item) => item.kind === "target") ??
    layout.layers.z3.find((item) => item.kind === "target");

  return (
    <section
      className="board-stage"
      id="placements"
      aria-label="Curated Real Rust campaign board"
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
            <div className="board-composition">
              <div className="board-slab" aria-hidden="true" />
              <BoardLayer band="z1" items={layout.layers.z1} boardSize={boardSize} />
              <BoardLayer band="z2" items={layout.layers.z2} boardSize={boardSize} />
              <ThreeTargetMarker boardSize={boardSize} targetItem={targetItem} />
              <BoardLayer band="z3" items={layout.layers.z3} boardSize={boardSize} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BoardComposition;
