import { useEffect } from "react";
import { gsap } from "gsap";

function createMotionConfig(isCompactViewport) {
  return {
    shellAmplitude: {
      x: isCompactViewport ? 0.45 : 2.05,
      y: isCompactViewport ? 0.32 : 1.55,
      rotateX: isCompactViewport ? -0.12 : -0.42,
      rotateY: isCompactViewport ? 0.16 : 0.58,
    },
    itemAmplitude: {
      x: isCompactViewport ? 0.85 : 5.2,
      y: isCompactViewport ? 0.65 : 4.3,
    },
    smoothing: isCompactViewport ? 0.045 : 0.055,
    idle: isCompactViewport
      ? {
          x: 0,
          y: 0,
          duration: 0,
        }
      : {
          x: 0.75,
          y: -1.65,
          duration: 7.2,
        },
  };
}

function getItemDriftMultiplier(kind) {
  switch (kind) {
    case "surfaceStrip":
      return 0.62;
    case "fileCard":
      return 0.68;
    case "checklist":
      return 0.66;
    case "label":
      return 0.78;
    case "text":
      return 0.74;
    case "target":
      return 0.82;
    case "annotation":
      return 0.88;
    default:
      return 1;
  }
}

function createIdleTween(target, idleConfig) {
  if (!idleConfig.duration || (!idleConfig.x && !idleConfig.y)) {
    gsap.set(target, { x: 0, y: 0 });
    return null;
  }

  return gsap.to(target, {
    x: idleConfig.x,
    y: idleConfig.y,
    duration: idleConfig.duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

export function useBoardParallax({
  boardRef,
  motionRef,
  parallaxRef,
  enabled,
}) {
  useEffect(() => {
    const board = boardRef.current;
    const motion = motionRef.current;
    const parallax = parallaxRef.current;

    if (!enabled || !board || !motion || !parallax) {
      return undefined;
    }

    if (typeof window.matchMedia !== "function") {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewportQuery = window.matchMedia("(max-width: 960px)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (reducedMotionQuery.matches) {
      return undefined;
    }

    let motionConfig = createMotionConfig(compactViewportQuery.matches);
    let canTrackPointer = finePointerQuery.matches && !compactViewportQuery.matches;
    let items = [];
    let itemSetters = [];

    const shellSetters = {
      x: gsap.quickSetter(parallax, "x", "px"),
      y: gsap.quickSetter(parallax, "y", "px"),
      rotationX: gsap.quickSetter(parallax, "rotationX", "deg"),
      rotationY: gsap.quickSetter(parallax, "rotationY", "deg"),
    };

    const syncItems = () => {
      items = Array.from(board.querySelectorAll("[data-parallax-depth]"));
      itemSetters = items.map((item) => ({
        depth: Number(item.dataset.parallaxDepth || 0),
        kind: item.dataset.itemKind || "",
        x: gsap.quickSetter(item, "x", "px"),
        y: gsap.quickSetter(item, "y", "px"),
      }));
    };

    syncItems();

    const state = {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };

    let idleTween = createIdleTween(motion, motionConfig.idle);

    const syncViewportProfile = () => {
      motionConfig = createMotionConfig(compactViewportQuery.matches);
      canTrackPointer = finePointerQuery.matches && !compactViewportQuery.matches;

      if (!canTrackPointer) {
        state.targetX = 0;
        state.targetY = 0;
      }

      idleTween?.kill();
      idleTween = createIdleTween(motion, motionConfig.idle);
    };

    const onPointerMove = (event) => {
      if (!canTrackPointer) {
        return;
      }

      const rect = board.getBoundingClientRect();
      const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const normalizedY = ((event.clientY - rect.top) / rect.height) * 2 - 1;

      state.targetX = gsap.utils.clamp(-1, 1, normalizedX);
      state.targetY = gsap.utils.clamp(-1, 1, normalizedY);
    };

    const onPointerLeave = () => {
      if (!canTrackPointer) {
        return;
      }

      state.targetX = 0;
      state.targetY = 0;
    };

    board.addEventListener("pointermove", onPointerMove);
    board.addEventListener("pointerleave", onPointerLeave);

    let frameId = 0;

    const update = () => {
      state.currentX += (state.targetX - state.currentX) * motionConfig.smoothing;
      state.currentY += (state.targetY - state.currentY) * motionConfig.smoothing;

      shellSetters.x(state.currentX * motionConfig.shellAmplitude.x);
      shellSetters.y(state.currentY * motionConfig.shellAmplitude.y);
      shellSetters.rotationY(state.currentX * motionConfig.shellAmplitude.rotateY);
      shellSetters.rotationX(state.currentY * motionConfig.shellAmplitude.rotateX);

      itemSetters.forEach((item) => {
        const driftMultiplier = getItemDriftMultiplier(item.kind);

        item.x(state.currentX * item.depth * motionConfig.itemAmplitude.x * driftMultiplier);
        item.y(state.currentY * item.depth * motionConfig.itemAmplitude.y * driftMultiplier);
      });

      frameId = window.requestAnimationFrame(update);
    };

    let observer;
    if ("MutationObserver" in window) {
      observer = new MutationObserver(syncItems);
      observer.observe(board, { childList: true, subtree: true });
    }

    if (compactViewportQuery.addEventListener) {
      compactViewportQuery.addEventListener("change", syncViewportProfile);
      finePointerQuery.addEventListener("change", syncViewportProfile);
    } else {
      compactViewportQuery.addListener(syncViewportProfile);
      finePointerQuery.addListener(syncViewportProfile);
    }

    update();

    return () => {
      observer?.disconnect();
      idleTween?.kill();
      window.cancelAnimationFrame(frameId);

      board.removeEventListener("pointermove", onPointerMove);
      board.removeEventListener("pointerleave", onPointerLeave);

      if (compactViewportQuery.addEventListener) {
        compactViewportQuery.removeEventListener("change", syncViewportProfile);
        finePointerQuery.removeEventListener("change", syncViewportProfile);
      } else {
        compactViewportQuery.removeListener(syncViewportProfile);
        finePointerQuery.removeListener(syncViewportProfile);
      }

      gsap.set(motion, { clearProps: "x,y" });
      gsap.set(parallax, { clearProps: "x,y,rotationX,rotationY" });
      items.forEach((item) => gsap.set(item, { clearProps: "x,y" }));
    };
  }, [boardRef, motionRef, parallaxRef, enabled]);
}
