import { useEffect, useRef, useState } from "react";

function useThreeScene({ enabled, createScene, dependencies }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setIsReady(false);
      return undefined;
    }

    const canvas = canvasRef.current;
    const host = wrapRef.current;
    let idleId = 0;
    let timeoutId = 0;
    let teardown;
    let isDisposed = false;

    setIsReady(false);
    setIsSupported(true);

    const boot = async () => {
      if (!canvas || !host) {
        return;
      }

      try {
        const sceneModule = await import("../lib/createBoardScene.js");

        if (isDisposed) {
          return;
        }

        const scene = createScene({
          canvas,
          host,
          sceneModule,
        });

        if (!scene) {
          setIsSupported(false);
          return;
        }

        teardown = scene.destroy;
        setIsReady(true);
      } catch {
        if (!isDisposed) {
          setIsSupported(false);
        }
      }
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(boot, { timeout: 900 });
    } else {
      timeoutId = window.setTimeout(boot, 180);
    }

    return () => {
      isDisposed = true;

      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      teardown?.();
    };
  }, [enabled, ...dependencies]);

  return {
    wrapRef,
    canvasRef,
    isReady,
    isSupported,
  };
}

function SceneCanvas({ className, wrapRef, canvasRef, isReady }) {
  return (
    <div
      className={`${className}${isReady ? " is-ready" : ""}`}
      ref={wrapRef}
      aria-hidden="true"
    >
      <canvas className="three-board-shell" ref={canvasRef} />
    </div>
  );
}

function ThreeBoardShell({ boardSize }) {
  const scene = useThreeScene({
    enabled: Boolean(boardSize),
    createScene: ({ canvas, host, sceneModule }) =>
      sceneModule.createBoardSlabScene({
        canvas,
        host,
        boardSize,
      }),
    dependencies: [boardSize?.height, boardSize?.width],
  });

  if (!scene.isSupported) {
    return null;
  }

  return (
    <SceneCanvas
      className="three-board-shell-wrap three-board-shell-wrap--slab"
      wrapRef={scene.wrapRef}
      canvasRef={scene.canvasRef}
      isReady={scene.isReady}
    />
  );
}

export function ThreeTargetMarker({ boardSize, targetItem }) {
  const scene = useThreeScene({
    enabled: Boolean(boardSize && targetItem),
    createScene: ({ canvas, host, sceneModule }) =>
      sceneModule.createTargetMarkerScene({
        canvas,
        host,
        boardSize,
        targetItem,
      }),
    dependencies: [
      boardSize?.height,
      boardSize?.width,
      targetItem?.height,
      targetItem?.width,
      targetItem?.x,
      targetItem?.y,
    ],
  });

  if (!targetItem || !scene.isSupported) {
    return null;
  }

  return (
    <SceneCanvas
      className="three-board-shell-wrap three-board-shell-wrap--marker"
      wrapRef={scene.wrapRef}
      canvasRef={scene.canvasRef}
      isReady={scene.isReady}
    />
  );
}

export default ThreeBoardShell;
