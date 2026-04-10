import { gsap } from "gsap";
import heroManifest, { boardBreakpoints } from "./heroManifest.js";

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

function queryBoardItem(selector, id) {
  return selector(`[data-item-id="${id}"]`)[0];
}

function queryBoardGroup(selector, ids) {
  return ids.map((id) => queryBoardItem(selector, id)).filter(Boolean);
}

function toTargetArray(target) {
  if (!target) {
    return [];
  }

  if (typeof target.length === "number" && !target.nodeType) {
    return Array.from(target).filter(Boolean);
  }

  return [target];
}

function setSvgDrawState(targets, drawn) {
  toTargetArray(targets).forEach((target) => {
    if (!target?.querySelectorAll) {
      return;
    }

    target.querySelectorAll("[data-draw-path]").forEach((path) => {
      if (typeof path.getTotalLength !== "function") {
        return;
      }

      const totalLength = path.getTotalLength();
      const finalDash = path.dataset.finalDash || totalLength;

      gsap.set(path, {
        strokeDasharray: finalDash,
        strokeDashoffset: drawn ? 0 : totalLength,
        autoAlpha: 1,
      });
    });

    target.querySelectorAll("[data-draw-dot]").forEach((dot) => {
      gsap.set(dot, {
        autoAlpha: drawn ? 1 : 0,
        scale: drawn ? 1 : 0,
        transformOrigin: "50% 50%",
      });
    });
  });
}

function addSvgDrawToTimeline(timeline, targets, position, options = {}) {
  const items = toTargetArray(targets).filter(Boolean);

  if (!items.length) {
    return timeline;
  }

  const basePosition = typeof position === "number" ? position : null;
  const itemStagger = options.itemStagger ?? 0.05;
  const pathDuration = options.pathDuration ?? 0.24;
  const pathStagger = options.pathStagger ?? 0.03;
  const dotDuration = options.dotDuration ?? 0.12;
  const dotStagger = options.dotStagger ?? 0.03;

  items.forEach((item, index) => {
    if (!item?.querySelectorAll) {
      return;
    }

    const paths = Array.from(item.querySelectorAll("[data-draw-path]"));
    const dots = Array.from(item.querySelectorAll("[data-draw-dot]"));
    const start = basePosition === null ? position : basePosition + index * itemStagger;

    addToIfPresent(
      timeline,
      paths,
      {
        strokeDashoffset: 0,
        duration: pathDuration,
        stagger: pathStagger,
        ease: "power2.out",
      },
      start,
    );

    addToIfPresent(
      timeline,
      dots,
      {
        autoAlpha: 1,
        scale: 1,
        duration: dotDuration,
        stagger: dotStagger,
        ease: "back.out(1.8)",
      },
      basePosition === null ? ">" : start + pathDuration * 0.62,
    );
  });

  return timeline;
}

function getAnnotationNoteParts(target) {
  if (!target?.querySelector) {
    return null;
  }

  return {
    anchorSide: target.dataset.anchorSide || "left",
    line: target.querySelector(".board-annotation-note__line"),
    dot: target.querySelector(".board-annotation-note__dot"),
    text: target.querySelector(".board-annotation-note__text"),
  };
}

function getAnnotationNoteLineState(anchorSide, progress) {
  const isVertical = anchorSide === "top" || anchorSide === "bottom";
  const transformOrigin =
    anchorSide === "right"
      ? "100% 50%"
      : anchorSide === "bottom"
        ? "50% 100%"
        : anchorSide === "top"
          ? "50% 0%"
          : "0% 50%";

  return isVertical
    ? {
        scaleX: 1,
        scaleY: progress,
        transformOrigin,
      }
    : {
        scaleX: progress,
        scaleY: 1,
        transformOrigin,
      };
}

function setAnnotationNoteDrawState(targets, drawn) {
  toTargetArray(targets).forEach((target) => {
    const parts = getAnnotationNoteParts(target);

    if (!parts) {
      return;
    }

    if (parts.line) {
      gsap.set(parts.line, getAnnotationNoteLineState(parts.anchorSide, drawn ? 1 : 0));
    }

    if (parts.dot) {
      gsap.set(parts.dot, {
        autoAlpha: drawn ? 1 : 0,
        scale: drawn ? 1 : 0,
        transformOrigin: "50% 50%",
      });
    }

    if (parts.text) {
      gsap.set(parts.text, {
        autoAlpha: drawn ? 1 : 0,
        y: drawn ? 0 : 4,
      });
    }
  });
}

function addAnnotationNoteDrawToTimeline(timeline, targets, position, options = {}) {
  const items = toTargetArray(targets).filter(Boolean);

  if (!items.length) {
    return timeline;
  }

  const basePosition = typeof position === "number" ? position : null;
  const itemStagger = options.itemStagger ?? 0.07;
  const noteDuration = options.noteDuration ?? 0.16;
  const lineDuration = options.lineDuration ?? 0.18;
  const dotDuration = options.dotDuration ?? 0.1;
  const textDuration = options.textDuration ?? 0.16;

  items.forEach((item, index) => {
    const parts = getAnnotationNoteParts(item);
    const start = basePosition === null ? position : basePosition + index * itemStagger;

    addToIfPresent(
      timeline,
      item,
      {
        y: 0,
        duration: noteDuration,
        ease: "power2.out",
      },
      start,
    );

    if (!parts) {
      return;
    }

    addToIfPresent(
      timeline,
      parts.line,
      {
        ...getAnnotationNoteLineState(parts.anchorSide, 1),
        duration: lineDuration,
        ease: "power2.out",
      },
      start,
    );

    addToIfPresent(
      timeline,
      parts.dot,
      {
        autoAlpha: 1,
        scale: 1,
        duration: dotDuration,
        ease: "back.out(1.8)",
      },
      basePosition === null ? ">" : start + lineDuration * 0.66,
    );

    addToIfPresent(
      timeline,
      parts.text,
      {
        autoAlpha: 1,
        y: 0,
        duration: textDuration,
        ease: "power2.out",
      },
      basePosition === null ? "<0.04" : start + 0.04,
    );
  });

  return timeline;
}

export function createHeroTimeline({ root, onSetup, onComplete }) {
  if (!root) {
    return () => {};
  }

  const mm = gsap.matchMedia();
  const ctx = gsap.context(() => {
    mm.add(
      {
        isDesktop: `(min-width: ${boardBreakpoints.mobileMax + 1}px)`,
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
        const titleLines = q(".hero-title__line");
        const deck = q(".hero-deck")[0];
        const actions = q(".hero-actions")[0];
        const primaryAction = q(".hero-action--primary")[0];
        const secondaryAction = q(".hero-action--secondary")[0];

        const boardMotion = q(".board-motion-shell")[0];
        const boardShell = q(".board-shell")[0];
        const boardGlow = q(".board-shell__glow")[0];
        const boardSlab = q(".board-slab")[0];
        const shellSlab = q(".three-board-shell-wrap--slab")[0];

        if (isDesktop) {
          const desktopGroups = heroManifest.boardAnimationGroupsByViewport.desktop;
          const background = queryBoardGroup(q, desktopGroups.background);
          const maps = queryBoardGroup(q, desktopGroups.maps);
          const mapCopy = queryBoardGroup(q, desktopGroups.mapCopy);
          const zoneCards = queryBoardGroup(q, desktopGroups.zoneCards);
          const zoneCopy = queryBoardGroup(q, desktopGroups.zoneCopy);
          const routeMarkup = queryBoardGroup(q, desktopGroups.routeMarkup);
          const markers = queryBoardGroup(q, desktopGroups.markers);
          const notes = queryBoardGroup(q, desktopGroups.notes);
          const supportDocs = queryBoardGroup(q, desktopGroups.supportDocs);
          const siteFilterTicks = queryBoardGroup(q, desktopGroups.siteFilterTicks);

          const surveyMap = queryBoardItem(q, "surveyMap");
          const routeIndexMap = queryBoardItem(q, "routeIndexMap");
          const activationMap = queryBoardItem(q, "activationMap");
          const siteFilterCard = queryBoardItem(q, "siteFilterCard");
          const campaignFileCard = queryBoardItem(q, "campaignFileCard");
          const campaignFileClip = queryBoardItem(q, "campaignFileClip");
          const zone01Card = queryBoardItem(q, "zone01Card");
          const zone02Card = queryBoardItem(q, "zone02Card");
          const zone03Card = queryBoardItem(q, "zone03Card");
          const zone04Card = queryBoardItem(q, "zone04Card");
          const primarySiteMarker = queryBoardItem(q, "primarySiteMarker");
          const supportDocAccents = supportDocs.filter(
            (item) =>
              item !== siteFilterCard &&
              item !== campaignFileCard &&
              item !== campaignFileClip,
          );

          const surveyMapBaseOpacity = getBaseOpacity(surveyMap);
          const routeIndexMapBaseOpacity = getBaseOpacity(routeIndexMap);
          const activationMapBaseOpacity = getBaseOpacity(activationMap);

          const siteFilterRotation = getBaseRotation(siteFilterCard);
          const campaignFileRotation = getBaseRotation(campaignFileCard);
          const campaignClipRotation = getBaseRotation(campaignFileClip);
          const zone01Rotation = getBaseRotation(zone01Card);
          const zone02Rotation = getBaseRotation(zone02Card);
          const zone03Rotation = getBaseRotation(zone03Card);
          const zone04Rotation = getBaseRotation(zone04Card);
          const primarySiteMarkerRotation = getBaseRotation(primarySiteMarker);

          if (reduceMotion) {
            [
              atmosphere,
              fieldBackdrop,
              copyPocket,
              boardBloom,
              boardPool,
              scaffold,
              copy,
              kicker,
              title,
              ...titleLines,
              deck,
              actions,
              primaryAction,
              secondaryAction,
              boardMotion,
              boardShell,
              shellSlab,
              boardSlab,
              boardGlow,
              ...background,
              ...maps,
              ...mapCopy,
              ...zoneCards,
              ...zoneCopy,
              ...routeMarkup,
              ...markers,
              ...notes,
              ...supportDocs,
              ...siteFilterTicks,
            ].forEach((item) => setIfPresent(item, { autoAlpha: 1 }));

            setSvgDrawState(routeMarkup, true);
            setAnnotationNoteDrawState(notes, true);
            setIfPresent(siteFilterTicks, {
              autoAlpha: 1,
              y: 0,
              "--tick-progress": 1,
            });
            setIfPresent(notes, {
              autoAlpha: 1,
              y: 0,
            });

            setIfPresent(surveyMap, {
              autoAlpha: surveyMapBaseOpacity,
              x: 0,
              y: 0,
              scale: 1,
            });
            setIfPresent(routeIndexMap, {
              autoAlpha: routeIndexMapBaseOpacity,
              x: 0,
              y: 0,
              scale: 1,
            });
            setIfPresent(activationMap, {
              autoAlpha: activationMapBaseOpacity,
              y: 0,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
            });
            setIfPresent(siteFilterCard, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: siteFilterRotation,
            });
            setIfPresent(campaignFileCard, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: campaignFileRotation,
            });
            setIfPresent(campaignFileClip, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotation: campaignClipRotation,
            });
            setIfPresent(zone01Card, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: zone01Rotation,
            });
            setIfPresent(zone02Card, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: zone02Rotation,
            });
            setIfPresent(zone03Card, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: zone03Rotation,
            });
            setIfPresent(zone04Card, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: zone04Rotation,
            });
            setIfPresent(primarySiteMarker, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotation: primarySiteMarkerRotation,
            });
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

            onComplete?.();
            return () => {};
          }

          setIfPresent(atmosphere, { autoAlpha: 0, x: 0, y: 0 });
          setIfPresent(fieldBackdrop, { autoAlpha: 0, y: -8 });
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
          setIfPresent(title, { autoAlpha: 1 });
          setIfPresent(titleLines, { autoAlpha: 0, y: 14 });
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
            y: 22,
            scale: 0.985,
            transformOrigin: "50% 50%",
          });
          setIfPresent(boardShell, {
            "--shell-sheen-x": -140,
            "--shell-sheen-opacity": 0,
          });
          setIfPresent(shellSlab, {
            autoAlpha: 0,
            y: 20,
            scale: 0.982,
            transformOrigin: "50% 50%",
          });
          setIfPresent(boardSlab, { autoAlpha: 0, y: 12 });
          setIfPresent(boardGlow, {
            autoAlpha: 0,
            scale: 0.95,
            transformOrigin: "50% 50%",
          });

          setIfPresent(background, { autoAlpha: 0 });
          setIfPresent(surveyMap, {
            autoAlpha: 0,
            x: -14,
            y: 10,
            scale: 1.01,
            transformOrigin: "50% 50%",
          });
          setIfPresent(routeIndexMap, {
            autoAlpha: 0,
            x: -10,
            y: 18,
            scale: 1.01,
            transformOrigin: "50% 50%",
          });
          setIfPresent(activationMap, {
            autoAlpha: 0,
            y: 10,
            scale: 1.015,
            clipPath: "inset(0% 0% 100% 0%)",
            transformOrigin: "50% 50%",
          });
          setIfPresent(mapCopy, {
            autoAlpha: 0,
            y: 8,
            transformOrigin: "50% 50%",
          });
          setIfPresent(siteFilterCard, {
            autoAlpha: 0,
            x: -18,
            y: 18,
            rotation: siteFilterRotation - 2,
            transformOrigin: "50% 50%",
          });
          setIfPresent(zone01Card, {
            autoAlpha: 0,
            x: -18,
            y: 20,
            rotation: zone01Rotation - 3,
            transformOrigin: "50% 50%",
          });
          setIfPresent(zone02Card, {
            autoAlpha: 0,
            x: -10,
            y: 18,
            rotation: zone02Rotation - 2.6,
            transformOrigin: "50% 50%",
          });
          setIfPresent(zone03Card, {
            autoAlpha: 0,
            x: 16,
            y: -14,
            rotation: zone03Rotation + 3,
            transformOrigin: "50% 50%",
          });
          setIfPresent(zone04Card, {
            autoAlpha: 0,
            x: 18,
            y: 12,
            rotation: zone04Rotation + 2.6,
            transformOrigin: "50% 50%",
          });
          setIfPresent(zoneCopy, {
            autoAlpha: 0,
            y: 8,
            transformOrigin: "50% 50%",
          });
          setIfPresent(routeMarkup, {
            autoAlpha: 0,
            y: 6,
            scale: 0.96,
            transformOrigin: "50% 50%",
          });
          setSvgDrawState(routeMarkup, false);
          setIfPresent(markers.filter((item) => item !== primarySiteMarker), {
            autoAlpha: 0,
            y: 10,
            scale: 0.9,
            transformOrigin: "50% 50%",
          });
          setIfPresent(primarySiteMarker, {
            autoAlpha: 0,
            y: 10,
            scale: 0.88,
            rotation: primarySiteMarkerRotation - 4,
            transformOrigin: "50% 50%",
          });
          setIfPresent(campaignFileCard, {
            autoAlpha: 0,
            x: 18,
            y: 24,
            scale: 0.96,
            rotation: campaignFileRotation + 1.4,
            transformOrigin: "50% 50%",
          });
          setIfPresent(campaignFileClip, {
            autoAlpha: 0,
            y: 12,
            scale: 0.96,
            rotation: campaignClipRotation + 2,
            transformOrigin: "50% 50%",
          });
          setIfPresent(supportDocAccents, {
            autoAlpha: 0,
            y: 6,
            transformOrigin: "50% 50%",
          });
          setIfPresent(
            siteFilterTicks,
            {
              autoAlpha: 0,
              y: 4,
              "--tick-progress": 0,
              transformOrigin: "0% 50%",
            },
          );
          setIfPresent(notes, {
            autoAlpha: 1,
            y: 6,
            transformOrigin: "50% 50%",
          });
          setAnnotationNoteDrawState(notes, false);

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
          addToIfPresent(
            timeline,
            titleLines,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
              stagger: 0.055,
            },
            0.12,
          );
          addToIfPresent(timeline, deck, { autoAlpha: 1, y: 0, duration: 0.28 }, 0.28);
          addToIfPresent(timeline, actions, { autoAlpha: 1, y: 0, duration: 0.22 }, 0.4);
          addToIfPresent(
            timeline,
            [primaryAction, secondaryAction].filter(Boolean),
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.2,
              stagger: 0.04,
            },
            0.42,
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
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.42 },
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
            background,
            {
              autoAlpha: 1,
              duration: 0.26,
              stagger: 0.04,
            },
            0.36,
          );
          addToIfPresent(
            timeline,
            [surveyMap, routeIndexMap].filter(Boolean),
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.22,
              stagger: 0.06,
            },
            0.44,
          );
          addToIfPresent(
            timeline,
            activationMap,
            {
              autoAlpha: activationMapBaseOpacity,
              y: 0,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.32,
            },
            0.52,
          );
          addToIfPresent(
            timeline,
            mapCopy,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.18,
              stagger: 0.03,
            },
            0.74,
          );
          addToIfPresent(
            timeline,
            siteFilterCard,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: siteFilterRotation,
              duration: 0.22,
            },
            0.82,
          );
          addToIfPresent(
            timeline,
            supportDocAccents,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.14,
              stagger: 0.03,
            },
            0.88,
          );
          addToIfPresent(
            timeline,
            siteFilterTicks,
            {
              autoAlpha: 1,
              y: 0,
              "--tick-progress": 1,
              duration: 0.16,
              stagger: 0.08,
            },
            0.92,
          );
          addToIfPresent(
            timeline,
            zone02Card,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: zone02Rotation,
              duration: 0.22,
            },
            0.98,
          );
          addToIfPresent(
            timeline,
            zone03Card,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: zone03Rotation,
              duration: 0.22,
            },
            1.04,
          );
          addToIfPresent(
            timeline,
            zone04Card,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: zone04Rotation,
              duration: 0.22,
            },
            1.1,
          );
          addToIfPresent(
            timeline,
            zone01Card,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: zone01Rotation,
              duration: 0.22,
            },
            1.16,
          );
          addToIfPresent(
            timeline,
            routeMarkup,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.16,
              stagger: 0.02,
            },
            1.2,
          );
          addSvgDrawToTimeline(timeline, routeMarkup, 1.2, {
            itemStagger: 0.05,
            pathDuration: 0.24,
          });
          addToIfPresent(
            timeline,
            [primarySiteMarker].filter(Boolean),
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotation: primarySiteMarkerRotation,
              duration: 0.18,
            },
            1.26,
          );
          addToIfPresent(
            timeline,
            markers.filter((item) => item !== primarySiteMarker),
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.16,
              stagger: 0.03,
            },
            1.3,
          );
          addToIfPresent(
            timeline,
            zoneCopy,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.16,
              stagger: 0.03,
            },
            1.36,
          );
          addToIfPresent(
            timeline,
            campaignFileCard,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotation: campaignFileRotation,
              duration: 0.2,
            },
            1.46,
          );
          addToIfPresent(
            timeline,
            campaignFileClip,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotation: campaignClipRotation,
              duration: 0.14,
            },
            1.5,
          );
          addAnnotationNoteDrawToTimeline(timeline, notes, 1.56, {
            itemStagger: 0.05,
            lineDuration: 0.17,
            textDuration: 0.15,
          });

          return () => {
            timeline.kill();
          };
        }

        const groupIds = heroManifest.boardAnimationGroups;
        const background = queryBoardGroup(q, groupIds.background);
        const foundations = queryBoardGroup(q, groupIds.foundations);
        const brief = queryBoardGroup(q, groupIds.brief);
        const selectedZone = queryBoardGroup(q, groupIds.selectedZone);
        const supportPlacement = queryBoardGroup(q, groupIds.supportPlacement);
        const routeLogic = queryBoardGroup(q, groupIds.routeLogic);
        const anchorPlacement = queryBoardGroup(q, groupIds.anchorPlacement);
        const campaignFile = queryBoardGroup(q, groupIds.campaignFile);
        const finalNotes = queryBoardGroup(q, groupIds.finalNotes);

        const mainMap = queryBoardItem(q, "mainMap");
        const blueprintRear = queryBoardItem(q, "blueprintRear");
        const blueprintTape = queryBoardItem(q, "blueprintTape");
        const clientStudyCard = queryBoardItem(q, "clientStudyCard");
        const placement03Card = queryBoardItem(q, "placement03Card");
        const placement02Card = queryBoardItem(q, "placement02Card");
        const placement01Card = queryBoardItem(q, "placement01Card");
        const campaignFileCard = queryBoardItem(q, "campaignFileCard");
        const campaignFileClip = queryBoardItem(q, "campaignFileClip");
        const routePath = queryBoardItem(q, "routePath");
        const zonePin = queryBoardItem(q, "zonePin");

        const mainMapBaseOpacity = getBaseOpacity(mainMap);
        const blueprintRearBaseOpacity = getBaseOpacity(blueprintRear);

        const clientStudyRotation = getBaseRotation(clientStudyCard);
        const placement03Rotation = getBaseRotation(placement03Card);
        const placement02Rotation = getBaseRotation(placement02Card);
        const placement01Rotation = getBaseRotation(placement01Card);
        const campaignFileRotation = getBaseRotation(campaignFileCard);
        const campaignClipRotation = getBaseRotation(campaignFileClip);
        const routePathRotation = getBaseRotation(routePath);
        const zonePinRotation = getBaseRotation(zonePin);

        if (reduceMotion) {
          [
            atmosphere,
            fieldBackdrop,
            copyPocket,
            boardBloom,
            boardPool,
            scaffold,
            copy,
            kicker,
            title,
            deck,
            actions,
            primaryAction,
            secondaryAction,
            boardMotion,
            boardShell,
            shellSlab,
            boardSlab,
            boardGlow,
            ...background,
            ...foundations,
            ...brief,
            ...selectedZone,
            ...supportPlacement,
            ...routeLogic,
            ...anchorPlacement,
            ...campaignFile,
            ...finalNotes,
          ].forEach((item) => setIfPresent(item, { autoAlpha: 1 }));

          setIfPresent(mainMap, {
            autoAlpha: mainMapBaseOpacity,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
          });
          setIfPresent(blueprintRear, {
            autoAlpha: blueprintRearBaseOpacity,
            x: 0,
            y: 0,
            scale: 1,
          });
          setIfPresent(clientStudyCard, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: clientStudyRotation,
          });
          setIfPresent(placement03Card, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: placement03Rotation,
          });
          setIfPresent(placement02Card, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: placement02Rotation,
          });
          setIfPresent(placement01Card, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: placement01Rotation,
          });
          setIfPresent(campaignFileCard, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: campaignFileRotation,
          });
          setIfPresent(campaignFileClip, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: campaignClipRotation,
          });
          setIfPresent(routePath, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: routePathRotation,
          });
          setIfPresent(zonePin, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: zonePinRotation,
          });
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

          onComplete?.();
          return () => {};
        }

        setIfPresent(atmosphere, { autoAlpha: 0, x: 0, y: 0 });
        setIfPresent(fieldBackdrop, { autoAlpha: 0, y: -8 });
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

        setIfPresent(background, {
          autoAlpha: 0,
        });

        setIfPresent(blueprintRear, {
          autoAlpha: 0,
          x: isDesktop ? -18 : -12,
          y: isDesktop ? 18 : 12,
          scale: 1.02,
          transformOrigin: "50% 50%",
        });
        setIfPresent(blueprintTape, {
          autoAlpha: 0,
          x: -10,
          y: -8,
          transformOrigin: "50% 50%",
        });
        setIfPresent(mainMap, {
          autoAlpha: 0,
          y: isDesktop ? 10 : 8,
          scale: 1.015,
          clipPath: "inset(0% 0% 100% 0%)",
          transformOrigin: "50% 50%",
        });

        setIfPresent(clientStudyCard, {
          autoAlpha: 0,
          x: isDesktop ? -26 : -18,
          y: isDesktop ? 16 : 12,
          rotation: clientStudyRotation - 1.4,
          transformOrigin: "50% 50%",
        });
        setIfPresent(selectedZone, {
          autoAlpha: 0,
          y: 8,
          scale: 0.92,
          transformOrigin: "50% 50%",
        });
        setIfPresent(zonePin, {
          autoAlpha: 0,
          y: 8,
          scale: 0.88,
          rotation: zonePinRotation - 4,
          transformOrigin: "50% 50%",
        });

        setIfPresent(placement03Card, {
          autoAlpha: 0,
          x: isDesktop ? -24 : -18,
          y: isDesktop ? 18 : 14,
          rotation: placement03Rotation - 4.6,
          transformOrigin: "50% 50%",
        });
        setIfPresent(placement02Card, {
          autoAlpha: 0,
          x: isDesktop ? 22 : 16,
          y: isDesktop ? 10 : 8,
          rotation: placement02Rotation + 3.2,
          transformOrigin: "50% 50%",
        });
        setIfPresent(placement01Card, {
          autoAlpha: 0,
          x: isDesktop ? 34 : 24,
          y: isDesktop ? -18 : -12,
          rotation: placement01Rotation + 5.2,
          transformOrigin: "50% 50%",
        });
        setIfPresent(campaignFileCard, {
          autoAlpha: 0,
          x: isDesktop ? 20 : 16,
          y: isDesktop ? 26 : 18,
          scale: 0.96,
          rotation: campaignFileRotation + 1.2,
          transformOrigin: "50% 50%",
        });
        setIfPresent(campaignFileClip, {
          autoAlpha: 0,
          y: 12,
          scale: 0.96,
          rotation: campaignClipRotation + 2,
          transformOrigin: "50% 50%",
        });

        setIfPresent(routePath, {
          autoAlpha: 0,
          x: isDesktop ? -10 : -8,
          y: isDesktop ? 10 : 8,
          rotation: routePathRotation - 1.2,
          transformOrigin: "50% 50%",
        });
        setIfPresent(
          [
            ...supportPlacement.filter((item) => item !== placement03Card),
            ...routeLogic.filter((item) => item !== placement02Card && item !== routePath),
            ...anchorPlacement.filter((item) => item !== placement01Card),
          ],
          {
            autoAlpha: 0,
            y: 8,
            scale: 0.96,
            transformOrigin: "50% 50%",
          },
        );
        setIfPresent(finalNotes, {
          autoAlpha: 0,
          y: 8,
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
        addToIfPresent(
          timeline,
          titleLines,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.055,
          },
          0.12,
        );
        addToIfPresent(timeline, deck, { autoAlpha: 1, y: 0, duration: 0.28 }, 0.28);
        addToIfPresent(timeline, actions, { autoAlpha: 1, y: 0, duration: 0.22 }, 0.4);
        addToIfPresent(
          timeline,
          [primaryAction, secondaryAction].filter(Boolean),
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.2,
            stagger: 0.04,
          },
          0.42,
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
          background,
          {
            autoAlpha: 1,
            duration: 0.26,
            stagger: 0.04,
          },
          0.36,
        );
        addToIfPresent(
          timeline,
          blueprintRear,
          {
            autoAlpha: blueprintRearBaseOpacity,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.22,
          },
          0.42,
        );
        addToIfPresent(
          timeline,
          blueprintTape,
          { autoAlpha: 1, x: 0, y: 0, duration: 0.18 },
          0.46,
        );
        addToIfPresent(
          timeline,
          mainMap,
          {
            autoAlpha: mainMapBaseOpacity,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: isDesktop ? 0.34 : 0.3,
          },
          0.5,
        );

        addToIfPresent(
          timeline,
          clientStudyCard,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: clientStudyRotation,
            duration: 0.22,
          },
          0.76,
        );

        addToIfPresent(
          timeline,
          selectedZone.filter((item) => item !== zonePin),
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.18,
            stagger: 0.03,
          },
          0.96,
        );
        addToIfPresent(
          timeline,
          zonePin,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: zonePinRotation,
            duration: 0.2,
          },
          1.02,
        );

        addToIfPresent(
          timeline,
          placement03Card,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: placement03Rotation,
            duration: 0.22,
          },
          1.14,
        );
        addToIfPresent(
          timeline,
          supportPlacement.filter((item) => item !== placement03Card),
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.16,
            stagger: 0.03,
          },
          1.2,
        );

        addToIfPresent(
          timeline,
          routePath,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: routePathRotation,
            duration: 0.24,
          },
          1.28,
        );
        addToIfPresent(
          timeline,
          placement02Card,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: placement02Rotation,
            duration: 0.22,
          },
          1.36,
        );
        addToIfPresent(
          timeline,
          routeLogic.filter((item) => item !== placement02Card && item !== routePath),
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.16,
            stagger: 0.03,
          },
          1.42,
        );

        addToIfPresent(
          timeline,
          placement01Card,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: placement01Rotation,
            duration: 0.22,
          },
          1.52,
        );
        addToIfPresent(
          timeline,
          anchorPlacement.filter((item) => item !== placement01Card),
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.16,
            stagger: 0.03,
          },
          1.58,
        );

        addToIfPresent(
          timeline,
          campaignFileCard,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: campaignFileRotation,
            duration: 0.22,
          },
          1.68,
        );
        addToIfPresent(
          timeline,
          campaignFileClip,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: campaignClipRotation,
            duration: 0.16,
          },
          1.72,
        );

        addToIfPresent(
          timeline,
          finalNotes,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.14,
            stagger: 0.03,
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
