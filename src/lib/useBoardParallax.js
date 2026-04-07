import { useEffect } from "react";
import { gsap } from "gsap";

function createMotionConfig(isCompactViewport) {
  return {
    shellAmplitude: {
      x: isCompactViewport ? 2.2 : 3.2,
      y: isCompactViewport ? 1.8 : 2.6,
      rotateX: isCompactViewport ? -0.5 : -0.95,
      rotateY: isCompactViewport ? 0.7 : 1.05,
    },
    itemAmplitude: {
      x: isCompactViewport ? 7 : 9,
      y: isCompactViewport ? 6 : 7,
    },
    smoothing: isCompactViewport ? 0.06 : 0.075,
    idle: {
      x: isCompactViewport ? 1.2 : 1.8,
      y: isCompactViewport ? -3.2 : -4.8,
      duration: isCompactViewport ? 6.2 : 5.8,
    },
  };
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

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewportQuery = window.matchMedia("(max-width: 960px)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (reducedMotionQuery.matches) {
      return undefined;
    }

    const isCompactViewport = compactViewportQuery.matches;
    const hasFinePointer = finePointerQuery.matches;
    let canTrackPointer = hasFinePointer && !isCompactViewport;
    let motionConfig = createMotionConfig(isCompactViewport);
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

    let idleTween = gsap.to(motion, {
      x: motionConfig.idle.x,
      y: motionConfig.idle.y,
      duration: motionConfig.idle.duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const syncViewportProfile = () => {
      motionConfig = createMotionConfig(compactViewportQuery.matches);
      canTrackPointer = hasFinePointer && !compactViewportQuery.matches;

      if (!canTrackPointer) {
        state.targetX = 0;
        state.targetY = 0;
      }

      idleTween.kill();
      idleTween = gsap.to(motion, {
        x: motionConfig.idle.x,
        y: motionConfig.idle.y,
        duration: motionConfig.idle.duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
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

    if (hasFinePointer) {
      board.addEventListener("pointermove", onPointerMove);
      board.addEventListener("pointerleave", onPointerLeave);
    }

    let frameId = 0;

    const update = () => {
      state.currentX += (state.targetX - state.currentX) * motionConfig.smoothing;
      state.currentY += (state.targetY - state.currentY) * motionConfig.smoothing;

      shellSetters.x(state.currentX * motionConfig.shellAmplitude.x);
      shellSetters.y(state.currentY * motionConfig.shellAmplitude.y);
      shellSetters.rotationY(state.currentX * motionConfig.shellAmplitude.rotateY);
      shellSetters.rotationX(state.currentY * motionConfig.shellAmplitude.rotateX);

      itemSetters.forEach((item) => {
        item.x(state.currentX * item.depth * motionConfig.itemAmplitude.x);
        item.y(state.currentY * item.depth * motionConfig.itemAmplitude.y);
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
    } else {
      compactViewportQuery.addListener(syncViewportProfile);
    }

    update();

    return () => {
      observer?.disconnect();
      idleTween.kill();
      window.cancelAnimationFrame(frameId);

      if (hasFinePointer) {
        board.removeEventListener("pointermove", onPointerMove);
        board.removeEventListener("pointerleave", onPointerLeave);
      }

      if (compactViewportQuery.addEventListener) {
        compactViewportQuery.removeEventListener("change", syncViewportProfile);
      } else {
        compactViewportQuery.removeListener(syncViewportProfile);
      }

      gsap.set(motion, { clearProps: "x,y" });
      gsap.set(parallax, { clearProps: "x,y,rotationX,rotationY" });
      items.forEach((item) => gsap.set(item, { clearProps: "x,y" }));
    };
  }, [boardRef, motionRef, parallaxRef, enabled]);
}
