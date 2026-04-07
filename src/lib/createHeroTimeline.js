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

function getBaseOpacity(target) {
  if (!target) {
    return 1;
  }

  const opacity = Number(gsap.getProperty(target, "opacity"));
  return Number.isFinite(opacity) ? opacity : 1;
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
    return;
  }

  gsap.set(path, { strokeDashoffset: 0 });
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
        const boardSlab = q(".board-slab")[0];
        const shellSlab = q(".three-board-shell-wrap--slab")[0];

        const supportMapA = q(".board-item--map-support-a")[0];
        const supportMapB = q(".board-item--map-support-b")[0];
        const masterMap = q(".board-item--map-main")[0];

        const primary = q(".board-item--card-primary")[0];
        const secondary = q(".board-item--card-secondary")[0];
        const alt = q(".board-item--card-alt")[0];
        const detail = q(".board-item--detail-card")[0];

        const surfaceStrip = q('[data-item-kind="surfaceStrip"]')[0];
        const fileCard = q('[data-item-kind="fileCard"]')[0];
        const checklist = q('[data-item-kind="checklist"]')[0];

        const labels = q('[data-item-kind="label"]');
        const handwritten = q('[data-item-kind="text"]');

        const tapePrimary = q(".board-item--tape-primary")[0];
        const tapeSurface = q(".board-item--tape-surface")[0];
        const clip = q(".board-item--clip")[0];

        const target = q('[data-item-kind="target"]')[0];
        const targetMarker = q(".three-board-shell-wrap--marker")[0];
        const targetHalo = q(".board-target__halo")[0];
        const targetPulse = q(".board-target__pulse")[0];

        const route = q('[data-annotation-type="route"]')[0];
        const circle = q('[data-annotation-type="circle"]')[0];
        const arrows = q('[data-annotation-type="arrows"]')[0];
        const xMark = q(".board-item--annotation-x")[0];

        const routePath = route?.querySelector('[data-draw-path="route"]');
        const routeDots = route?.querySelectorAll('[data-draw-dot="route"]') ?? [];
        const circlePaths = circle?.querySelectorAll('[data-draw-path="circle"]') ?? [];
        const arrowPaths = arrows?.querySelectorAll('[data-draw-path="arrows"]') ?? [];

        const supportMapABaseOpacity = getBaseOpacity(supportMapA);
        const supportMapBBaseOpacity = getBaseOpacity(supportMapB);
        const masterMapBaseOpacity = getBaseOpacity(masterMap);
        const xMarkBaseOpacity = getBaseOpacity(xMark);

        const primaryBaseRotation = getBaseRotation(primary);
        const secondaryBaseRotation = getBaseRotation(secondary);
        const altBaseRotation = getBaseRotation(alt);
        const detailBaseRotation = getBaseRotation(detail);
        const surfaceStripBaseRotation = getBaseRotation(surfaceStrip);
        const fileCardBaseRotation = getBaseRotation(fileCard);
        const checklistBaseRotation = getBaseRotation(checklist);

        if (reduceMotion) {
          restoreStrokePath(routePath);
          circlePaths.forEach(restoreStrokePath);
          arrowPaths.forEach(restoreStrokePath);

          setIfPresent(backdrop, { autoAlpha: 1 });
          setIfPresent(copy, { autoAlpha: 1, y: 0 });
          setIfPresent(boardMotion, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            transformOrigin: "50% 50%",
          });
          setIfPresent(shellSlab, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            transformOrigin: "50% 50%",
          });
          setIfPresent(boardSlab, { autoAlpha: 1, y: 0 });
          setIfPresent(boardGlow, {
            autoAlpha: 1,
            scale: 1,
            transformOrigin: "50% 50%",
          });

          setIfPresent(supportMapA, { autoAlpha: supportMapABaseOpacity, y: 0, scale: 1 });
          setIfPresent(supportMapB, { autoAlpha: supportMapBBaseOpacity, y: 0, scale: 1 });
          setIfPresent(masterMap, {
            autoAlpha: masterMapBaseOpacity,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
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
          setIfPresent(alt, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: altBaseRotation,
          });
          setIfPresent(detail, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: detailBaseRotation,
          });

          setIfPresent(surfaceStrip, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: surfaceStripBaseRotation,
          });
          setIfPresent(fileCard, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: fileCardBaseRotation,
          });
          setIfPresent(checklist, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: checklistBaseRotation,
          });

          setIfPresent(tapePrimary, { autoAlpha: 1, x: 0, y: 0 });
          setIfPresent(tapeSurface, { autoAlpha: 1, x: 0, y: 0 });
          setIfPresent(clip, { autoAlpha: 1, y: 0, scale: 1 });

          setIfPresent(labels, { autoAlpha: 1, y: 0 });
          setIfPresent(handwritten, { autoAlpha: 1, y: 0 });

          setIfPresent(target, { autoAlpha: 1, y: 0, scale: 1 });
          setIfPresent(targetMarker, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            transformOrigin: "50% 50%",
          });
          setIfPresent(targetHalo, { autoAlpha: 1, scale: 1, transformOrigin: "50% 50%" });
          setIfPresent(targetPulse, { autoAlpha: 1, scale: 1, transformOrigin: "50% 50%" });
          setIfPresent(routeDots, { autoAlpha: 1, scale: 1, transformOrigin: "50% 50%" });
          setIfPresent(xMark, {
            autoAlpha: xMarkBaseOpacity,
            clipPath: "inset(0% 0% 0% 0%)",
          });

          onComplete?.();
          return () => {};
        }

        hideStrokePath(routePath);
        circlePaths.forEach(hideStrokePath);
        arrowPaths.forEach(hideStrokePath);

        setIfPresent(backdrop, { autoAlpha: 0 });
        setIfPresent(copy, { autoAlpha: 0, y: 18 });
        setIfPresent(boardMotion, {
          autoAlpha: 0,
          y: isDesktop ? 24 : 18,
          scale: isDesktop ? 0.985 : 0.99,
          transformOrigin: "50% 50%",
        });
        setIfPresent(shellSlab, {
          autoAlpha: 0,
          y: isDesktop ? 18 : 14,
          scale: 0.985,
          transformOrigin: "50% 50%",
        });
        setIfPresent(boardSlab, { autoAlpha: 0, y: isDesktop ? 12 : 8 });
        setIfPresent(boardGlow, {
          autoAlpha: 0,
          scale: 0.95,
          transformOrigin: "50% 50%",
        });

        setIfPresent(supportMapA, {
          autoAlpha: 0,
          y: isDesktop ? 16 : 12,
          scale: 1.01,
          transformOrigin: "50% 50%",
        });
        setIfPresent(supportMapB, {
          autoAlpha: 0,
          y: isDesktop ? 20 : 14,
          scale: 1.012,
          transformOrigin: "50% 50%",
        });
        setIfPresent(masterMap, {
          autoAlpha: 0,
          y: isDesktop ? 10 : 8,
          scale: 1.015,
          clipPath: "inset(0% 0% 100% 0%)",
          transformOrigin: "50% 50%",
        });

        setIfPresent(primary, {
          autoAlpha: 0,
          x: isDesktop ? 34 : 26,
          y: isDesktop ? -18 : -12,
          rotation: primaryBaseRotation + 5.5,
          transformOrigin: "50% 50%",
        });
        setIfPresent(secondary, {
          autoAlpha: 0,
          x: isDesktop ? -28 : -20,
          y: isDesktop ? 18 : 14,
          rotation: secondaryBaseRotation - 5.5,
          transformOrigin: "50% 50%",
        });
        setIfPresent(alt, {
          autoAlpha: 0,
          x: isDesktop ? 22 : 16,
          y: isDesktop ? 10 : 8,
          rotation: altBaseRotation + 3.4,
          transformOrigin: "50% 50%",
        });
        setIfPresent(detail, {
          autoAlpha: 0,
          y: isDesktop ? 18 : 14,
          scale: 0.94,
          rotation: detailBaseRotation - 1.1,
          transformOrigin: "50% 50%",
        });

        setIfPresent(surfaceStrip, {
          autoAlpha: 0,
          x: isDesktop ? -26 : -18,
          y: isDesktop ? 8 : 6,
          scale: 0.988,
          rotation: surfaceStripBaseRotation - 0.5,
          transformOrigin: "50% 50%",
        });
        setIfPresent(fileCard, {
          autoAlpha: 0,
          x: isDesktop ? 20 : 16,
          y: isDesktop ? 26 : 18,
          scale: 0.952,
          rotation: fileCardBaseRotation + 1.2,
          transformOrigin: "50% 50%",
        });
        setIfPresent(checklist, {
          autoAlpha: 0,
          y: isDesktop ? 14 : 10,
          scale: 0.982,
          rotation: checklistBaseRotation - 0.6,
          transformOrigin: "50% 50%",
        });

        setIfPresent(tapePrimary, {
          autoAlpha: 0,
          x: 8,
          y: -8,
          transformOrigin: "50% 50%",
        });
        setIfPresent(tapeSurface, {
          autoAlpha: 0,
          x: -8,
          y: -6,
          transformOrigin: "50% 50%",
        });
        setIfPresent(clip, {
          autoAlpha: 0,
          y: 12,
          scale: 0.96,
          transformOrigin: "50% 50%",
        });

        setIfPresent(labels, {
          autoAlpha: 0,
          y: 8,
          transformOrigin: "50% 50%",
        });
        setIfPresent(handwritten, {
          autoAlpha: 0,
          y: 8,
          transformOrigin: "50% 50%",
        });

        setIfPresent(target, {
          autoAlpha: 0,
          y: 6,
          scale: 0.9,
          transformOrigin: "50% 50%",
        });
        setIfPresent(targetMarker, {
          autoAlpha: 0,
          y: 8,
          scale: 0.94,
          transformOrigin: "50% 50%",
        });
        setIfPresent(targetHalo, {
          autoAlpha: 0.78,
          scale: 1,
          transformOrigin: "50% 50%",
        });
        setIfPresent(targetPulse, {
          autoAlpha: 0.84,
          scale: 1,
          transformOrigin: "50% 50%",
        });
        setIfPresent(routeDots, {
          autoAlpha: 0,
          scale: 0.36,
          transformOrigin: "50% 50%",
        });
        setIfPresent(xMark, {
          autoAlpha: 0,
          clipPath: "inset(0% 100% 0% 0%)",
          transformOrigin: "50% 50%",
        });

        const timeline = gsap.timeline({
          defaults: {
            ease: "power2.out",
          },
          onComplete: () => onComplete?.(),
        });

        addToIfPresent(timeline, backdrop, { autoAlpha: 1, duration: 0.38 }, 0);
        addToIfPresent(timeline, copy, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.03);

        addToIfPresent(
          timeline,
          shellSlab,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.48 },
          0.08,
        );
        addToIfPresent(timeline, boardSlab, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.1);
        addToIfPresent(
          timeline,
          boardGlow,
          { autoAlpha: 1, scale: 1, duration: 0.54 },
          0.11,
        );
        addToIfPresent(
          timeline,
          boardMotion,
          { autoAlpha: 1, y: 0, scale: 1, duration: isDesktop ? 0.46 : 0.4 },
          0.12,
        );

        addToIfPresent(
          timeline,
          supportMapA,
          {
            autoAlpha: supportMapABaseOpacity,
            y: 0,
            scale: 1,
            duration: 0.22,
          },
          0.22,
        );
        addToIfPresent(
          timeline,
          supportMapB,
          {
            autoAlpha: supportMapBBaseOpacity,
            y: 0,
            scale: 1,
            duration: 0.24,
          },
          0.25,
        );
        addToIfPresent(
          timeline,
          masterMap,
          {
            autoAlpha: masterMapBaseOpacity,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: isDesktop ? 0.38 : 0.34,
          },
          0.34,
        );

        addToIfPresent(
          timeline,
          primary,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: primaryBaseRotation,
            duration: 0.26,
          },
          0.52,
        );
        addToIfPresent(
          timeline,
          tapePrimary,
          { autoAlpha: 1, x: 0, y: 0, duration: 0.18 },
          0.57,
        );
        addToIfPresent(
          timeline,
          secondary,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: secondaryBaseRotation,
            duration: 0.24,
          },
          0.62,
        );
        addToIfPresent(
          timeline,
          alt,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: altBaseRotation,
            duration: 0.22,
          },
          0.68,
        );
        addToIfPresent(
          timeline,
          detail,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: detailBaseRotation,
            duration: 0.2,
          },
          0.74,
        );
        addToIfPresent(
          timeline,
          target,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.18,
          },
          0.79,
        );
        addToIfPresent(
          timeline,
          targetMarker,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.18,
          },
          0.8,
        );

        addToIfPresent(
          timeline,
          surfaceStrip,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: surfaceStripBaseRotation,
            duration: 0.22,
          },
          0.86,
        );
        addToIfPresent(
          timeline,
          tapeSurface,
          { autoAlpha: 1, x: 0, y: 0, duration: 0.16 },
          0.91,
        );
        addToIfPresent(
          timeline,
          fileCard,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: fileCardBaseRotation,
            duration: 0.26,
          },
          0.98,
        );
        addToIfPresent(
          timeline,
          clip,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.16 },
          1.03,
        );
        addToIfPresent(
          timeline,
          checklist,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: checklistBaseRotation,
            duration: 0.2,
          },
          1.06,
        );

        addToIfPresent(
          timeline,
          labels,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.14,
            stagger: 0.02,
          },
          1.11,
        );
        addToIfPresent(
          timeline,
          handwritten,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.12,
            stagger: 0.03,
          },
          1.15,
        );

        addToIfPresent(
          timeline,
          circlePaths,
          {
            strokeDashoffset: 0,
            duration: 0.16,
            onComplete: () => circlePaths.forEach(restoreStrokePath),
          },
          1.24,
        );
        addToIfPresent(
          timeline,
          routePath,
          {
            strokeDashoffset: 0,
            duration: 0.18,
            onComplete: () => restoreStrokePath(routePath),
          },
          1.35,
        );
        addToIfPresent(
          timeline,
          routeDots,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.1,
            stagger: 0.03,
          },
          1.46,
        );
        addToIfPresent(
          timeline,
          arrowPaths,
          {
            strokeDashoffset: 0,
            duration: 0.14,
            stagger: 0.03,
            onComplete: () => arrowPaths.forEach(restoreStrokePath),
          },
          1.5,
        );
        addToIfPresent(
          timeline,
          xMark,
          {
            autoAlpha: xMarkBaseOpacity,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.1,
          },
          1.61,
        );

        addToIfPresent(
          timeline,
          [targetPulse, targetMarker].filter(Boolean),
          {
            scale: 1.12,
            duration: 0.1,
            ease: "power2.out",
          },
          1.7,
        );
        addToIfPresent(
          timeline,
          targetHalo,
          {
            autoAlpha: 1,
            scale: 1.08,
            duration: 0.1,
            ease: "power2.out",
          },
          1.7,
        );
        addToIfPresent(
          timeline,
          [targetPulse, targetMarker].filter(Boolean),
          {
            scale: 1,
            duration: 0.12,
            ease: "power2.inOut",
          },
          1.8,
        );
        addToIfPresent(
          timeline,
          targetHalo,
          {
            autoAlpha: 0.78,
            scale: 1,
            duration: 0.12,
            ease: "power2.inOut",
          },
          1.8,
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
