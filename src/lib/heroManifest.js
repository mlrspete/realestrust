export const boardSizes = {
  desktop: { width: 1680, height: 980 },
  mobile: { width: 900, height: 1360 },
};

export const boardBreakpoints = {
  mobileMax: 960,
};

export const boardMediaQuery = `(max-width: ${boardBreakpoints.mobileMax}px)`;

const baseUrl = import.meta.env.BASE_URL || "/";

function assetPath(path) {
  return `${baseUrl}${path.replace(/^\/+/, "")}`;
}

export const roles = [
  "base",
  "proof",
  "support",
  "note",
  "target",
  "annotation",
  "prop",
  "accent3d",
];

export const zBands = {
  z1: "rear planning substrates and board textures",
  z2: "map-driven working composition",
  z3: "pins, pills, markup, notes, and hardware",
};

export const palette = {
  bg: "#0a1015",
  bg2: "#111922",
  text: "#f1eadf",
  subtext: "#b5aca0",
  red: "#b64038",
  redDark: "#8d302b",
  paper: "#ddd3c2",
  line: "rgba(255,255,255,0.08)",
};

export const lockedAssetSources = {
  mainMap: {
    runtime: assetPath("/hero-curated/locked/maps/8da7d33caed48ee.png"),
    source: "asset pack for rr/reviewed assets/8da7d33caed48ee.png",
  },
  blueprintRear: {
    runtime: assetPath("/hero-curated/locked/maps/blueprint.png"),
    source: "asset pack for rr/v4/hero/reviewed assets/rust-map-detail-inset-review.jpg",
    note:
      "Temporary blueprint proxy generated because blueprint.png was not present in the tracked repo.",
  },
  placement01: {
    runtime: assetPath("/hero-curated/locked/cards/rust_23_oilrig.webp"),
    source: "asset pack for rr/reviewed assets/rust_23_oilrig.webp",
  },
  placement02: {
    runtime: assetPath("/hero-curated/locked/cards/rust-monument-alt-review.jpg"),
    source: "asset pack for rr/v4/hero/reviewed assets/rust-monument-alt-review.jpg",
  },
  placement02Fallback: {
    runtime: assetPath("/hero-curated/locked/cards/rust_06_gasstation.webp"),
    source: "asset pack for rr/reviewed assets/rust_06_gasstation.webp",
  },
  placement03: {
    runtime: assetPath("/hero-curated/locked/cards/rust_20_swamp.webp"),
    source: "asset pack for rr/reviewed assets/rust_20_swamp.webp",
  },
  clientStudyPaper: {
    runtime: assetPath("/hero-curated/locked/board/loose-leaf-note-01.png"),
    source: "asset pack for rr/v1/board-elements/loose-leaf-note-01.png",
  },
  campaignFilePaper: {
    runtime: assetPath("/hero-curated/locked/board/loose-leaf-note-02.png"),
    source: "asset pack for rr/v1/board-elements/loose-leaf-note-02.png",
  },
  pillBase: {
    runtime: assetPath("/hero-curated/locked/board/label-tab-cream-01.svg"),
    source: "asset pack for rr/v1/board-elements/label-tab-cream-01.svg",
  },
  zonePin: {
    runtime: assetPath("/hero-curated/locked/board/push-pin-red-01.png"),
    source: "asset pack for rr/v1/board-elements/push-pin-red-01.png",
  },
  campaignFileClip: {
    runtime: assetPath("/hero-curated/locked/board/binder-clip-black-01.png"),
    source: "asset pack for rr/v1/board-elements/binder-clip-black-01.png",
  },
  blueprintTape: {
    runtime: assetPath("/hero-curated/locked/board/masking-tape-strip-02.png"),
    source: "asset pack for rr/v1/board-elements/masking-tape-strip-02.png",
  },
  routePath: {
    runtime: assetPath("/hero-curated/locked/board/annotation-route-red.svg"),
    source: "asset pack for rr/v1/board-elements/annotation-route-red.svg",
  },
  routeCircle: {
    runtime: assetPath("/hero-curated/locked/board/annotation-circle-red.svg"),
    source: "asset pack for rr/v1/board-elements/annotation-circle-red.svg",
  },
  routeArrows: {
    runtime: assetPath("/hero-curated/locked/board/annotation-arrows-red.svg"),
    source: "asset pack for rr/v1/board-elements/annotation-arrows-red.svg",
  },
};

export const curatedAssets = {
  core: {
    paperOverlay: assetPath("/hero-curated/core/paper-overlay.jpg"),
    grainOverlay: assetPath("/hero-curated/core/grain-overlay.png"),
  },
  locked: {
    mainMap: lockedAssetSources.mainMap.runtime,
    blueprintRear: lockedAssetSources.blueprintRear.runtime,
    placement01: lockedAssetSources.placement01.runtime,
    placement02: lockedAssetSources.placement02.runtime,
    placement02Fallback: lockedAssetSources.placement02Fallback.runtime,
    placement03: lockedAssetSources.placement03.runtime,
    clientStudyPaper: lockedAssetSources.clientStudyPaper.runtime,
    campaignFilePaper: lockedAssetSources.campaignFilePaper.runtime,
    pillBase: lockedAssetSources.pillBase.runtime,
    zonePin: lockedAssetSources.zonePin.runtime,
    campaignFileClip: lockedAssetSources.campaignFileClip.runtime,
    blueprintTape: lockedAssetSources.blueprintTape.runtime,
    routePath: lockedAssetSources.routePath.runtime,
    routeCircle: lockedAssetSources.routeCircle.runtime,
    routeArrows: lockedAssetSources.routeArrows.runtime,
  },
};

const clientStudyContent = {
  variant: "study",
  title: "CLIENT MARKING\nSTUDY",
};

const campaignFileContent = {
  variant: "campaign",
  kicker: "CAMPAIGN FILE",
  title: "PROJECT:\nTASTEFUL",
};

function createPillSpec(text, className) {
  return {
    role: "prop",
    kind: "label",
    text,
    asset: curatedAssets.locked.pillBase,
    alt: "",
    fit: "contain",
    className,
    parallaxDepth: 0.18,
  };
}

function createAnnotationNote(text, targetId, options = {}) {
  const desktop = options.desktop
    ? {
        x: options.desktop.x,
        y: options.desktop.y,
        rotation: options.desktop.rotation ?? 0,
        maxWidth: options.desktop.maxWidth ?? 150,
        minHeight: options.desktop.minHeight ?? 26,
        fitContent: true,
        zIndex: options.desktop.zIndex,
      }
    : null;

  const mobile = options.mobile
    ? {
        x: options.mobile.x,
        y: options.mobile.y,
        rotation: options.mobile.rotation ?? 0,
        maxWidth: options.mobile.maxWidth ?? 132,
        minHeight: options.mobile.minHeight ?? 24,
        fitContent: true,
        zIndex: options.mobile.zIndex,
      }
    : null;

  return {
    role: "prop",
    kind: "annotationNote",
    text,
    anchorSide: options.anchorSide ?? "left",
    targetId,
    color: options.color,
    className: options.className,
    parallaxDepth: options.parallaxDepth ?? 0.1,
    desktop,
    mobile,
  };
}

const boardElements = {
  paperOverlay: {
    layer: "z1",
    role: "base",
    kind: "image",
    asset: curatedAssets.core.paperOverlay,
    alt: "",
    blendMode: "screen",
    opacity: 0.06,
    className: "board-item--overlay board-item--paper",
    desktop: { x: 0, y: 0, width: 1680, height: 980 },
    mobile: { x: 0, y: 0, width: 900, height: 1360, opacity: 0.05 },
  },
  blueprintRear: {
    layer: "z1",
    role: "base",
    kind: "image",
    asset: curatedAssets.locked.blueprintRear,
    alt: "Rear planning blueprint sheet",
    fit: "cover",
    imageTransform: "scaleX(-1)",
    opacity: 0.28,
    className: "board-item--blueprint-rear",
    desktop: {
      x: 122,
      y: 146,
      width: 618,
      height: 412,
      rotation: -7.2,
      zIndex: 1,
    },
    mobile: {
      x: 58,
      y: 106,
      width: 374,
      height: 249,
      rotation: -8,
      opacity: 0.28,
      zIndex: 1,
    },
  },
  mainMap: {
    layer: "z1",
    role: "base",
    kind: "image",
    asset: curatedAssets.locked.mainMap,
    alt: "Rust map substrate",
    fit: "cover",
    objectPosition: "50% 50%",
    opacity: 0.78,
    loading: "eager",
    fetchPriority: "high",
    className: "board-item--map board-item--map-main",
    desktop: {
      x: 266,
      y: 175,
      width: 1118,
      height: 586,
      rotation: -3.8,
      zIndex: 2,
    },
    mobile: {
      x: 99,
      y: 211,
      width: 700,
      height: 367,
      rotation: -4,
      zIndex: 2,
    },
  },
  grainOverlay: {
    layer: "z1",
    role: "base",
    kind: "image",
    asset: curatedAssets.core.grainOverlay,
    alt: "",
    blendMode: "soft-light",
    opacity: 0.11,
    className: "board-item--overlay board-item--grain",
    desktop: { x: 0, y: 0, width: 1680, height: 980 },
    mobile: { x: 0, y: 0, width: 900, height: 1360, opacity: 0.08 },
  },
  clientStudyCard: {
    layer: "z2",
    role: "note",
    kind: "fileCard",
    asset: curatedAssets.locked.clientStudyPaper,
    alt: "Client study paper",
    fit: "cover",
    objectPosition: "50% 55%",
    opacity: 0.96,
    radius: "20px",
    content: clientStudyContent,
    className: "board-item--file-card board-item--document-card board-item--client-study-card",
    desktop: {
      x: 338,
      y: 560,
      width: 430,
      height: 194,
      rotation: -5.6,
      zIndex: 6,
    },
    mobile: {
      x: 132,
      y: 645,
      width: 350,
      height: 158,
      rotation: -5.6,
      zIndex: 6,
    },
  },
  placement03Card: {
    layer: "z2",
    role: "support",
    kind: "image",
    asset: curatedAssets.locked.placement03,
    alt: "Support placement proof",
    fit: "cover",
    objectPosition: "50% 61%",
    radius: "18px",
    className:
      "board-item--card board-item--card-secondary board-item--placement03-card",
    desktop: {
      x: 238,
      y: 657,
      width: 322,
      height: 181,
      rotation: -2,
      zIndex: 5,
    },
    mobile: {
      x: 110,
      y: 861,
      width: 274,
      height: 154,
      rotation: -2,
      zIndex: 5,
    },
  },
  placement03Pill: {
    layer: "z3",
    ...createPillSpec(
      "PLACEMENT 03",
      "board-item--placement-label board-item--placement03-pill",
    ),
    desktop: {
      x: 215,
      y: 625,
      width: 190,
      height: 56,
      rotation: -2,
      zIndex: 8,
    },
    mobile: {
      x: 88,
      y: 833,
      width: 166,
      height: 48,
      rotation: -2,
      zIndex: 8,
    },
  },
  selectedZonePill: {
    layer: "z3",
    ...createPillSpec(
      "SELECTED ZONE",
      "board-item--placement-label board-item--detail-label board-item--selected-zone-pill",
    ),
    desktop: {
      x: 725,
      y: 366,
      width: 250,
      height: 71,
      rotation: -1.6,
      zIndex: 12,
    },
    mobile: {
      x: 310,
      y: 512,
      width: 220,
      height: 63,
      rotation: -1.2,
      zIndex: 12,
    },
  },
  zonePin: {
    layer: "z3",
    role: "target",
    kind: "image",
    asset: curatedAssets.locked.zonePin,
    alt: "Red push pin marking the selected zone",
    fit: "contain",
    objectPosition: "50% 54%",
    imageTransform: "scale(1.3)",
    className: "board-item--prop board-item--zone-pin",
    desktop: {
      x: 845,
      y: 458,
      width: 84,
      height: 90,
      rotation: 0,
      zIndex: 15,
    },
    mobile: {
      x: 427,
      y: 613,
      width: 72,
      height: 77,
      rotation: 0,
      zIndex: 15,
    },
  },
  zoneCircleInner: {
    layer: "z3",
    role: "annotation",
    kind: "annotation",
    asset: curatedAssets.locked.routeCircle,
    alt: "",
    fit: "contain",
    opacity: 0.96,
    className: "board-item--annotation board-item--annotation-circle-primary",
    desktop: {
      x: 805,
      y: 427,
      width: 173,
      height: 173,
      rotation: 0,
      zIndex: 13,
    },
    mobile: {
      x: 394,
      y: 582,
      width: 138,
      height: 138,
      rotation: 0,
      zIndex: 13,
    },
  },
  zoneCircleOuter: {
    layer: "z3",
    role: "annotation",
    kind: "annotation",
    asset: curatedAssets.locked.routeCircle,
    alt: "",
    fit: "contain",
    opacity: 0.82,
    className: "board-item--annotation board-item--annotation-circle-focus board-item--annotation-circle-zone-outer",
    desktop: {
      x: 795,
      y: 417,
      width: 193,
      height: 193,
      rotation: 0,
      zIndex: 12,
    },
    mobile: {
      x: 384,
      y: 572,
      width: 158,
      height: 158,
      rotation: 0,
      zIndex: 12,
    },
  },
  placement02Card: {
    layer: "z2",
    role: "proof",
    kind: "image",
    asset: curatedAssets.locked.placement02,
    fallbackAsset: curatedAssets.locked.placement02Fallback,
    alt: "Bridge proof card",
    fit: "cover",
    objectPosition: "56% 47%",
    radius: "18px",
    className:
      "board-item--card board-item--card-alt board-item--placement02-card",
    desktop: {
      x: 915,
      y: 255,
      width: 270,
      height: 152,
      rotation: -5.8,
      zIndex: 6,
    },
    mobile: {
      x: 447,
      y: 328,
      width: 248,
      height: 140,
      rotation: -5.4,
      zIndex: 6,
    },
  },
  placement02Pill: {
    layer: "z3",
    ...createPillSpec(
      "PLACEMENT 02",
      "board-item--placement-label board-item--placement02-pill",
    ),
    desktop: {
      x: 890,
      y: 230,
      width: 228,
      height: 60,
      rotation: -5.8,
      zIndex: 7,
    },
    mobile: {
      x: 420,
      y: 303,
      width: 186,
      height: 52,
      rotation: -5.4,
      zIndex: 7,
    },
  },
  placement01Card: {
    layer: "z2",
    role: "proof",
    kind: "image",
    asset: curatedAssets.locked.placement01,
    alt: "Hero placement proof",
    fit: "cover",
    objectPosition: "50% 54%",
    loading: "eager",
    fetchPriority: "high",
    radius: "20px",
    className:
      "board-item--card board-item--card-primary board-item--placement01-card",
    desktop: {
      x: 1104,
      y: 129,
      width: 394,
      height: 222,
      rotation: 1.7,
      zIndex: 9,
    },
    mobile: {
      x: 486,
      y: 132,
      width: 311,
      height: 175,
      rotation: 1.7,
      zIndex: 9,
    },
  },
  placement01Pill: {
    layer: "z3",
    ...createPillSpec(
      "PLACEMENT 01",
      "board-item--placement-label board-item--placement01-pill",
    ),
    desktop: {
      x: 1141,
      y: 106,
      width: 224,
      height: 62,
      rotation: 1.7,
      zIndex: 10,
    },
    mobile: {
      x: 515,
      y: 109,
      width: 182,
      height: 52,
      rotation: 1.7,
      zIndex: 10,
    },
  },
  campaignFileCard: {
    layer: "z2",
    role: "note",
    kind: "fileCard",
    asset: curatedAssets.locked.campaignFilePaper,
    alt: "Campaign file paper",
    fit: "cover",
    objectPosition: "50% 55%",
    opacity: 0.96,
    radius: "22px",
    content: campaignFileContent,
    className: "board-item--file-card board-item--document-card board-item--campaign-file-card",
    desktop: {
      x: 1094,
      y: 634,
      width: 352,
      height: 219,
      rotation: 1.1,
      zIndex: 5,
    },
    mobile: {
      x: 463,
      y: 934,
      width: 320,
      height: 200,
      rotation: 1.1,
      zIndex: 5,
    },
  },
  campaignFileClip: {
    layer: "z3",
    role: "prop",
    kind: "image",
    asset: curatedAssets.locked.campaignFileClip,
    alt: "",
    fit: "contain",
    objectPosition: "50% 43%",
    imageTransform: "scale(1.48)",
    className: "board-item--prop board-item--clip",
    desktop: {
      x: 1220,
      y: 608,
      width: 78,
      height: 69,
      rotation: 0,
      zIndex: 8,
    },
    mobile: {
      x: 572,
      y: 910,
      width: 70,
      height: 62,
      rotation: 0,
      zIndex: 8,
    },
  },
  blueprintTape: {
    layer: "z3",
    role: "prop",
    kind: "image",
    asset: curatedAssets.locked.blueprintTape,
    alt: "",
    fit: "contain",
    className: "board-item--prop board-item--tape board-item--tape-blueprint",
    desktop: {
      x: 182,
      y: 121,
      width: 116,
      height: 53,
      rotation: -17,
      opacity: 0.82,
      zIndex: 3,
    },
    mobile: null,
  },
  routePath: {
    layer: "z3",
    role: "annotation",
    kind: "annotation",
    alt: "",
    annotationType: "flowRoute",
    opacity: 0.88,
    className: "board-item--annotation board-item--annotation-route-major board-item--annotation-route-plotted",
    desktop: {
      x: 332,
      y: 220,
      width: 936,
      height: 529,
      rotation: 0,
      annotationType: "plottedRoute",
      asset: null,
      zIndex: 4,
    },
    mobile: {
      x: 202,
      y: 219,
      width: 438,
      height: 720,
      rotation: -1.8,
      annotationType: "plottedRouteMobile",
      asset: null,
      zIndex: 4,
    },
  },
  routeArrows: {
    layer: "z3",
    role: "annotation",
    kind: "annotation",
    asset: curatedAssets.locked.routeArrows,
    alt: "",
    fit: "contain",
    opacity: 0.8,
    className: "board-item--annotation board-item--annotation-arrow board-item--annotation-route-arrows",
    desktop: null,
    mobile: null,
  },
  routeCircle03: {
    layer: "z3",
    role: "annotation",
    kind: "annotation",
    asset: curatedAssets.locked.routeCircle,
    alt: "",
    fit: "contain",
    opacity: 0.9,
    className: "board-item--annotation board-item--annotation-circle-focus board-item--annotation-circle-lower",
    desktop: {
      x: 311,
      y: 702,
      width: 80,
      height: 80,
      rotation: -8,
      zIndex: 7,
    },
    mobile: {
      x: 192,
      y: 903,
      width: 72,
      height: 72,
      rotation: -6,
      zIndex: 7,
    },
  },
  routeCircle02: {
    layer: "z3",
    role: "annotation",
    kind: "annotation",
    asset: curatedAssets.locked.routeCircle,
    alt: "",
    fit: "contain",
    opacity: 0.9,
    className: "board-item--annotation board-item--annotation-circle-focus board-item--annotation-circle-mid",
    desktop: {
      x: 1004,
      y: 307,
      width: 58,
      height: 58,
      rotation: -6,
      zIndex: 8,
    },
    mobile: {
      x: 545,
      y: 372,
      width: 52,
      height: 52,
      rotation: -5.8,
      zIndex: 7,
    },
  },
  routeCircle01: {
    layer: "z3",
    role: "annotation",
    kind: "annotation",
    asset: curatedAssets.locked.routeCircle,
    alt: "",
    fit: "contain",
    opacity: 0.9,
    className: "board-item--annotation board-item--annotation-circle-focus board-item--annotation-circle-hero",
    desktop: {
      x: 1216,
      y: 161,
      width: 126,
      height: 126,
      rotation: 6,
      zIndex: 10,
    },
    mobile: {
      x: 585,
      y: 164,
      width: 110,
      height: 110,
      rotation: 5.4,
      zIndex: 9,
    },
  },
  notePrimarySite: {
    layer: "z3",
    ...createAnnotationNote("primary site", "zonePin", {
      color: "rgba(141, 66, 55, 0.9)",
      className:
        "board-item--annotation-note board-item--handwritten board-item--handwritten-red board-item--handwritten-compact",
      desktop: {
        x: 955,
        y: 515,
        rotation: -0.8,
        maxWidth: 110,
        zIndex: 14,
      },
      mobile: {
        x: 520,
        y: 658,
        rotation: 0.4,
        maxWidth: 98,
        zIndex: 14,
      },
    }),
  },
  noteRepeatDwell: {
    layer: "z3",
    ...createAnnotationNote("repeat dwell", "placement02Card", {
      anchorSide: "right",
      color: "rgba(141, 66, 55, 0.88)",
      className:
        "board-item--annotation-note board-item--handwritten board-item--handwritten-red board-item--handwritten-compact",
      desktop: {
        x: 802,
        y: 297,
        rotation: -4.4,
        maxWidth: 118,
        zIndex: 9,
      },
      mobile: null,
    }),
  },
  noteSkylineAnchor: {
    layer: "z3",
    ...createAnnotationNote("skyline anchor", "placement01Card", {
      color: "rgba(141, 66, 55, 0.88)",
      className:
        "board-item--annotation-note board-item--handwritten board-item--handwritten-red board-item--handwritten-compact",
      desktop: {
        x: 1457,
        y: 155,
        rotation: 2.2,
        maxWidth: 132,
        zIndex: 11,
      },
      mobile: {
        x: 698,
        y: 162,
        rotation: 2.2,
        maxWidth: 104,
        zIndex: 11,
      },
    }),
  },
  noteRouteTraffic: {
    layer: "z3",
    ...createAnnotationNote("route traffic", "placement03Card", {
      color: "rgba(141, 66, 55, 0.9)",
      className:
        "board-item--annotation-note board-item--handwritten board-item--handwritten-red board-item--handwritten-compact",
      desktop: null,
      mobile: {
        x: 338,
        y: 992,
        rotation: -2.4,
        maxWidth: 116,
        zIndex: 9,
      },
    }),
  },
};

export const boardAnimationGroups = {
  background: ["paperOverlay", "grainOverlay"],
  foundations: ["blueprintRear", "blueprintTape", "mainMap"],
  brief: ["clientStudyCard"],
  selectedZone: ["selectedZonePill", "zoneCircleOuter", "zoneCircleInner", "zonePin"],
  supportPlacement: ["placement03Pill", "placement03Card", "routeCircle03"],
  routeLogic: [
    "routePath",
    "placement02Pill",
    "placement02Card",
    "routeCircle02",
    "noteRepeatDwell",
  ],
  anchorPlacement: [
    "placement01Pill",
    "placement01Card",
    "routeCircle01",
    "noteSkylineAnchor",
  ],
  campaignFile: ["campaignFileCard", "campaignFileClip"],
  finalNotes: ["notePrimarySite", "noteRouteTraffic"],
};

function materializeLayout(viewport) {
  const layers = {
    z1: [],
    z2: [],
    z3: [],
  };

  Object.entries(boardElements).forEach(([id, spec]) => {
    const placement = spec[viewport];

    if (!placement) {
      return;
    }

    const { layer, desktop, mobile, ...shared } = spec;
    layers[layer].push({
      id,
      ...shared,
      ...placement,
    });
  });

  return { layers };
}

const heroManifest = {
  boardSizes,
  boardBreakpoints,
  boardMediaQuery,
  roles,
  zBands,
  palette,
  curatedAssets,
  lockedAssetSources,
  boardAnimationGroups,
  boardElements,
  layouts: {
    desktop: materializeLayout("desktop"),
    mobile: materializeLayout("mobile"),
  },
};

export default heroManifest;
