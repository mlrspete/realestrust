import { gsap } from "gsap";

function hasRenderableTarget(target) {
  if (!target) {
    return false;
  }

  if (typeof target.length === "number" && !target.nodeType) {
    return target.length > 0;
  }

  return true;
}

function setIfPresent(target, vars) {
  if (hasRenderableTarget(target)) {
    gsap.set(target, vars);
  }
}

function addToIfPresent(timeline, target, vars, position) {
  if (hasRenderableTarget(target)) {
    timeline.to(target, vars, position);
  }

  return timeline;
}

function getBaseRotation(target) {
  if (!target) {
    return 0;
  }

  return Number(gsap.getProperty(target, "rotation")) || 0;
}

function hideStrokePath(path) {
  if (!path) {
    return;
  }

  const totalLength = path.getTotalLength();
  const finalDash = path.dataset.finalDash || path.getAttribute("stroke-dasharray") || "";

  path.dataset.drawLength = `${totalLength}`;
  path.dataset.finalDash = finalDash;

  gsap.set(path, {
    strokeDasharray: `${totalLength} ${totalLength}`,
    strokeDashoffset: totalLength,
  });
}

function restoreStrokePath(path) {
  if (!path) {
    return;
  }

  const finalDash = path.dataset.finalDash;

  if (finalDash) {
    gsap.set(path, {
      strokeDasharray: finalDash,
      strokeDashoffset: 0,
    });
  }
}

export function createHeroTimeline({ root, onSetup, onComplete }) {
  if (!root) {
    return () => {};
  }

  const mm = gsap.matchMedia();
  const ctx = gsap.context(() => {
    mm.add(
      {
        isDesktop: "(min-width: 961px)",
        isMobile: "(max-width: 960px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      ({ conditions }) => {
        const { isDesktop, reduceMotion } = conditions;
        const q = gsap.utils.selector(root);

        onSetup?.();

        const backdrop = q(".hero-backdrop")[0];
        const copy = q(".hero-copy")[0];
        const boardMotion = q(".board-motion-shell")[0];
        const boardGlow = q(".board-shell__glow")[0];
        const map = q(".board-item--map")[0];
        const primary = q('[data-item-role="proof"]')[0];
        const secondary = q('[data-item-role="support"]')[0];
        const detail = q('[data-item-role="detail"]')[0];
        const note = q('[data-item-kind="note"]')[0];
        const tape = q(".board-item--tape")[0];
        const clip = q(".board-item--clip")[0];
        const target = q('[data-item-kind="target"]')[0];
        const targetMarker = q(".three-board-shell-wrap--marker")[0];
        const route = q('[data-annotation-type="route"]')[0];
        const circle = q('[data-annotation-type="circle"]')[0];
        const arrows = q('[data-annotation-type="arrows"]')[0];

        const routePath = route?.querySelector('[data-draw-path="route"]');
        const routeDots = route?.querySelectorAll('[data-draw-dot="route"]') ?? [];
        const circlePaths = circle?.querySelectorAll('[data-draw-path="circle"]') ?? [];
        const arrowPaths = arrows?.querySelectorAll('[data-draw-path="arrows"]') ?? [];

        const primaryBaseRotation = getBaseRotation(primary);
        const secondaryBaseRotation = getBaseRotation(secondary);
        const detailBaseRotation = getBaseRotation(detail);

        if (reduceMotion) {
          restoreStrokePath(routePath);
          circlePaths.forEach(restoreStrokePath);
          arrowPaths.forEach(restoreStrokePath);

          setIfPresent(backdrop, { autoAlpha: 1 });
          setIfPresent(copy, { autoAlpha: 1, y: 0 });
          setIfPresent(boardGlow, { autoAlpha: 1, scale: 1 });
          setIfPresent(boardMotion, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            transformOrigin: "50% 50%",
          });
          setIfPresent(map, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 28px)",
          });
          setIfPresent(primary, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: primaryBaseRotation,
          });
          setIfPresent(secondary, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: secondaryBaseRotation,
          });
          setIfPresent(detail, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: detailBaseRotation,
          });
          setIfPresent(note, { autoAlpha: 1, y: 0, scale: 1 });
          setIfPresent(tape, { autoAlpha: 1, x: 0, y: 0 });
          setIfPresent(clip, { autoAlpha: 1, y: 0 });
          setIfPresent(target, { autoAlpha: 1, y: 0, scale: 1 });
          setIfPresent(targetMarker, { autoAlpha: 1, y: 0, scale: 1 });
          setIfPresent(routeDots, { autoAlpha: 1, scale: 1 });

          onComplete?.();
          return () => {};
        }

        hideStrokePath(routePath);
        circlePaths.forEach(hideStrokePath);
        arrowPaths.forEach(hideStrokePath);

        setIfPresent(backdrop, { autoAlpha: 0 });
        setIfPresent(copy, { autoAlpha: 0, y: 18 });
        setIfPresent(boardGlow, {
          autoAlpha: 0,
          scale: 0.96,
          transformOrigin: "50% 50%",
        });
        setIfPresent(boardMotion, {
          autoAlpha: 0,
          y: isDesktop ? 40 : 32,
          scale: isDesktop ? 0.965 : 0.975,
          transformOrigin: "50% 50%",
        });
        setIfPresent(map, {
          autoAlpha: 0,
          y: 24,
          scale: 1.02,
          clipPath: "inset(0% 0% 100% 0% round 28px)",
          transformOrigin: "50% 50%",
        });
        setIfPresent(primary, {
          autoAlpha: 0,
          x: 46,
          y: -18,
          rotation: primaryBaseRotation + 8,
          transformOrigin: "50% 50%",
        });
        setIfPresent(secondary, {
          autoAlpha: 0,
          x: -38,
          y: 24,
          rotation: secondaryBaseRotation - 10,
          transformOrigin: "50% 50%",
        });
        setIfPresent(detail, {
          autoAlpha: 0,
          y: 16,
          scale: 0.92,
          rotation: detailBaseRotation - 1.4,
          transformOrigin: "50% 50%",
        });
        setIfPresent(note, {
          autoAlpha: 0,
          y: 10,
          scale: 0.985,
          transformOrigin: "50% 50%",
        });
        setIfPresent(tape, {
          autoAlpha: 0,
          y: -10,
          x: 8,
          transformOrigin: "50% 50%",
        });
        setIfPresent(clip, {
          autoAlpha: 0,
          y: 10,
          transformOrigin: "50% 50%",
        });
        setIfPresent(target, {
          autoAlpha: 0,
          y: 8,
          scale: 0.82,
          transformOrigin: "50% 50%",
        });
        setIfPresent(targetMarker, {
          autoAlpha: 0,
          y: 10,
          scale: 0.92,
          transformOrigin: "50% 50%",
        });
        setIfPresent(routeDots, {
          autoAlpha: 0,
          scale: 0.32,
          transformOrigin: "50% 50%",
        });

        const timeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
          onComplete: () => onComplete?.(),
        });

        addToIfPresent(timeline, backdrop, { autoAlpha: 1, duration: 0.62, ease: "power2.out" }, 0);
        addToIfPresent(
          timeline,
          boardGlow,
          { autoAlpha: 1, scale: 1, duration: 0.82, ease: "power2.out" },
          0.12,
        );
        addToIfPresent(timeline, copy, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.08);
        addToIfPresent(
          timeline,
          boardMotion,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: isDesktop ? 0.84 : 0.72,
          },
          0.24,
        );
        addToIfPresent(
          timeline,
          map,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            duration: isDesktop ? 0.82 : 0.68,
            ease: "power2.out",
          },
          0.46,
        );
        addToIfPresent(
          timeline,
          primary,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: primaryBaseRotation,
            duration: 0.58,
          },
          0.9,
        );
        addToIfPresent(
          timeline,
          secondary,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: secondaryBaseRotation,
            duration: 0.54,
          },
          1.04,
        );
        addToIfPresent(
          timeline,
          detail,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: detailBaseRotation,
            duration: 0.42,
          },
          1.18,
        );
        addToIfPresent(
          timeline,
          target,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          1.28,
        );
        addToIfPresent(
          timeline,
          targetMarker,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.34,
            ease: "power2.out",
          },
          1.32,
        );
        addToIfPresent(
          timeline,
          note,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.44,
          },
          1.26,
        );
        addToIfPresent(
          timeline,
          tape,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.34,
            ease: "power2.out",
          },
          1.34,
        );
        addToIfPresent(
          timeline,
          clip,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            ease: "power2.out",
          },
          1.4,
        );
        addToIfPresent(
          timeline,
          routePath,
          {
            strokeDashoffset: 0,
            duration: 0.34,
            ease: "power2.out",
            onComplete: () => restoreStrokePath(routePath),
          },
          1.5,
        );
        addToIfPresent(
          timeline,
          routeDots,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.14,
            stagger: 0.05,
            ease: "power2.out",
          },
          1.68,
        );
        addToIfPresent(
          timeline,
          circlePaths,
          {
            strokeDashoffset: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          1.74,
        );
        addToIfPresent(
          timeline,
          arrowPaths,
          {
            strokeDashoffset: 0,
            duration: 0.28,
            ease: "power2.out",
            stagger: 0.04,
          },
          1.9,
        );

        return () => {
          timeline.kill();
        };
      },
    );
  }, root);

  return () => {
    mm.revert();
    ctx.revert();
  };
}
