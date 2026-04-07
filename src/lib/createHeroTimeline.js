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

        const atmosphere = q(".hero-atmosphere")[0];
        const fieldBackdrop = q(".hero-backdrop--field")[0];
        const copyPocket = q(".hero-backdrop--copy-pocket")[0];
        const boardBloom = q(".hero-backdrop--board-bloom")[0];
        const boardPool = q(".hero-backdrop--board-pool")[0];
        const scaffold = q(".hero-scaffold")[0];

        const copy = q(".hero-copy")[0];
        const kicker = q(".hero-kicker")[0];
        const title = q(".hero-title")[0];
        const deck = q(".hero-deck")[0];
        const actions = q(".hero-actions")[0];
        const primaryAction = q(".hero-action--primary")[0];
        const secondaryAction = q(".hero-action--secondary")[0];

        const boardMotion = q(".board-motion-shell")[0];
        const boardShell = q(".board-shell")[0];
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

          setIfPresent(atmosphere, { autoAlpha: 1, x: 0, y: 0 });
          setIfPresent(fieldBackdrop, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
          setIfPresent(copyPocket, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
          setIfPresent(boardBloom, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
          setIfPresent(boardPool, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
          setIfPresent(scaffold, { autoAlpha: 1 });

          setIfPresent(copy, { autoAlpha: 1, y: 0 });
          setIfPresent(kicker, { autoAlpha: 1, y: 0 });
          setIfPresent(title, { autoAlpha: 1, y: 0 });
          setIfPresent(deck, { autoAlpha: 1, y: 0 });
          setIfPresent(actions, { autoAlpha: 1, y: 0 });
          setIfPresent(primaryAction, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
          setIfPresent(secondaryAction, { autoAlpha: 1, x: 0, y: 0, scale: 1 });

          setIfPresent(boardMotion, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            transformOrigin: "50% 50%",
          });
          setIfPresent(boardShell, {
            "--shell-sheen-x": 128,
            "--shell-sheen-opacity": 0,
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

        setIfPresent(atmosphere, { autoAlpha: 0, x: 0, y: 0 });
        setIfPresent(fieldBackdrop, {
          autoAlpha: 0,
          y: -8,
        });
        setIfPresent(copyPocket, {
          autoAlpha: 0,
          y: 8,
          scale: 0.985,
          transformOrigin: "50% 50%",
        });
        setIfPresent(boardBloom, {
          autoAlpha: 0,
          y: -10,
          scale: 0.94,
          transformOrigin: "50% 50%",
        });
        setIfPresent(boardPool, {
          autoAlpha: 0,
          y: 18,
          scale: 0.96,
          transformOrigin: "50% 50%",
        });
        setIfPresent(scaffold, { autoAlpha: 0 });

        setIfPresent(copy, { autoAlpha: 0, y: 14 });
        setIfPresent(kicker, { autoAlpha: 0, y: 8 });
        setIfPresent(title, { autoAlpha: 0, y: 14 });
        setIfPresent(deck, { autoAlpha: 0, y: 12 });
        setIfPresent(actions, { autoAlpha: 0, y: 10 });
        setIfPresent(primaryAction, {
          autoAlpha: 0,
          x: -6,
          y: 6,
          scale: 0.975,
          transformOrigin: "50% 50%",
        });
        setIfPresent(secondaryAction, {
          autoAlpha: 0,
          x: 6,
          y: 6,
          scale: 0.975,
          transformOrigin: "50% 50%",
        });

        setIfPresent(boardMotion, {
          autoAlpha: 0,
          y: isDesktop ? 22 : 16,
          scale: isDesktop ? 0.985 : 0.99,
          transformOrigin: "50% 50%",
        });
        setIfPresent(boardShell, {
          "--shell-sheen-x": -140,
          "--shell-sheen-opacity": 0,
        });
        setIfPresent(shellSlab, {
          autoAlpha: 0,
          y: isDesktop ? 20 : 14,
          scale: 0.982,
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

        addToIfPresent(timeline, atmosphere, { autoAlpha: 1, duration: 0.22 }, 0);
        addToIfPresent(
          timeline,
          fieldBackdrop,
          { autoAlpha: 1, y: 0, duration: 0.32 },
          0,
        );
        addToIfPresent(
          timeline,
          copyPocket,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.36 },
          0.02,
        );
        addToIfPresent(
          timeline,
          boardBloom,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.44 },
          0.04,
        );
        addToIfPresent(
          timeline,
          boardPool,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.46 },
          0.06,
        );
        addToIfPresent(timeline, scaffold, { autoAlpha: 1, duration: 0.34 }, 0.08);

        addToIfPresent(timeline, copy, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.06);
        addToIfPresent(timeline, kicker, { autoAlpha: 1, y: 0, duration: 0.24 }, 0.08);
        addToIfPresent(timeline, title, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.12);
        addToIfPresent(timeline, deck, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.18);
        addToIfPresent(timeline, actions, { autoAlpha: 1, y: 0, duration: 0.24 }, 0.26);
        addToIfPresent(
          timeline,
          [primaryAction, secondaryAction].filter(Boolean),
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.22,
            stagger: 0.04,
          },
          0.28,
        );

        addToIfPresent(
          timeline,
          shellSlab,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.44 },
          0.18,
        );
        addToIfPresent(timeline, boardSlab, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.21);
        addToIfPresent(
          timeline,
          boardGlow,
          { autoAlpha: 1, scale: 1, duration: 0.48 },
          0.22,
        );
        addToIfPresent(
          timeline,
          boardMotion,
          { autoAlpha: 1, y: 0, scale: 1, duration: isDesktop ? 0.42 : 0.38 },
          0.24,
        );
        addToIfPresent(
          timeline,
          boardShell,
          {
            "--shell-sheen-x": -12,
            "--shell-sheen-opacity": 0.26,
            duration: 0.24,
            ease: "power2.out",
          },
          0.62,
        );
        addToIfPresent(
          timeline,
          boardShell,
          {
            "--shell-sheen-x": 128,
            "--shell-sheen-opacity": 0,
            duration: 0.38,
            ease: "power2.inOut",
          },
          0.82,
        );

        addToIfPresent(
          timeline,
          supportMapA,
          {
            autoAlpha: supportMapABaseOpacity,
            y: 0,
            scale: 1,
            duration: 0.2,
          },
          0.34,
        );
        addToIfPresent(
          timeline,
          supportMapB,
          {
            autoAlpha: supportMapBBaseOpacity,
            y: 0,
            scale: 1,
            duration: 0.22,
          },
          0.37,
        );
        addToIfPresent(
          timeline,
          masterMap,
          {
            autoAlpha: masterMapBaseOpacity,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: isDesktop ? 0.34 : 0.3,
          },
          0.42,
        );

        addToIfPresent(
          timeline,
          primary,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: primaryBaseRotation,
            duration: 0.24,
          },
          0.58,
        );
        addToIfPresent(
          timeline,
          tapePrimary,
          { autoAlpha: 1, x: 0, y: 0, duration: 0.18 },
          0.63,
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
          0.66,
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
          0.72,
        );
        addToIfPresent(
          timeline,
          detail,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: detailBaseRotation,
            duration: 0.18,
          },
          0.78,
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
          0.82,
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
          0.83,
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
          0.88,
        );
        addToIfPresent(
          timeline,
          tapeSurface,
          { autoAlpha: 1, x: 0, y: 0, duration: 0.16 },
          0.92,
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
            duration: 0.24,
          },
          0.98,
        );
        addToIfPresent(
          timeline,
          clip,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.16 },
          1.01,
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
            duration: 0.18,
          },
          1.04,
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
            scale: 1.08,
            duration: 0.1,
            ease: "power2.out",
          },
          1.7,
        );
        addToIfPresent(
          timeline,
          targetHalo,
          {
            autoAlpha: 0.88,
            scale: 1.04,
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
