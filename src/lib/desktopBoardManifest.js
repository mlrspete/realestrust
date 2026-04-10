const baseUrl = import.meta.env.BASE_URL || "/";

function assetPath(path) {
  return `${baseUrl}${path.replace(/^\/+/, "")}`;
}

function createPlacement({
  x,
  y,
  width,
  height,
  rotation = 0,
  opacity,
  zIndex,
}) {
  return {
    x,
    y,
    width,
    height,
    rotation,
    ...(opacity !== undefined ? { opacity } : {}),
    ...(zIndex !== undefined ? { zIndex } : {}),
  };
}

function createFitContentPlacement({
  x,
  y,
  rotation = 0,
  maxWidth,
  minWidth,
  minHeight,
  opacity,
  zIndex,
}) {
  return {
    x,
    y,
    rotation,
    fitContent: true,
    ...(maxWidth !== undefined ? { maxWidth } : {}),
    ...(minWidth !== undefined ? { minWidth } : {}),
    ...(minHeight !== undefined ? { minHeight } : {}),
    ...(opacity !== undefined ? { opacity } : {}),
    ...(zIndex !== undefined ? { zIndex } : {}),
  };
}

function createTextItem(
  text,
  className,
  {
    layer = "z3",
    role = "prop",
    color,
    parallaxDepth = 0.24,
    desktop,
  },
) {
  return {
    layer,
    role,
    kind: "text",
    text,
    className,
    color,
    parallaxDepth,
    desktop: createFitContentPlacement(desktop),
  };
}

function createAnnotationItem({
  annotationType,
  annotationVariant,
  className,
  parallaxDepth = 0.12,
  opacity = 1,
  desktop,
}) {
  return {
    layer: "z3",
    role: "annotation",
    kind: "annotation",
    annotationType,
    annotationVariant,
    className,
    opacity,
    parallaxDepth,
    desktop: createPlacement(desktop),
  };
}

function createMarkerItem({
  asset,
  alt,
  className,
  parallaxDepth = 0.18,
  desktop,
}) {
  return {
    layer: "z3",
    role: "accent3d",
    kind: "image",
    asset,
    alt,
    fit: "contain",
    objectPosition: "50% 50%",
    className,
    parallaxDepth,
    desktop: createPlacement(desktop),
  };
}

function createMediaCardItem({
  asset,
  alt,
  label,
  className,
  objectPosition = "50% 50%",
  radius = "22px",
  parallaxDepth = 0.26,
  desktop,
}) {
  return {
    layer: "z2",
    role: "proof",
    kind: "mediaCard",
    asset,
    alt,
    fit: "cover",
    objectPosition,
    radius,
    className,
    parallaxDepth,
    content: {
      label,
    },
    desktop: createPlacement(desktop),
  };
}

function createFileCardItem({
  content,
  className,
  radius = "24px",
  parallaxDepth = 0.32,
  objectPosition = "50% 55%",
  imageTransform,
  imageTransformOrigin,
  desktop,
}) {
  return {
    layer: "z2",
    role: "note",
    kind: "fileCard",
    asset: desktopBoardAssets.campaignFilePaper,
    alt: "",
    fit: "cover",
    objectPosition,
    imageTransform,
    imageTransformOrigin,
    opacity: 0.96,
    radius,
    content,
    className,
    parallaxDepth,
    desktop: createPlacement(desktop),
  };
}

function createAnnotationNote(text, targetId, options = {}) {
  return {
    layer: "z3",
    role: "prop",
    kind: "annotationNote",
    text,
    anchorSide: options.anchorSide ?? "left",
    targetId,
    color: options.color,
    className: options.className,
    parallaxDepth: options.parallaxDepth ?? 0.18,
    desktop: createFitContentPlacement({
      ...options.desktop,
      maxWidth: options.desktop?.maxWidth ?? 150,
      minHeight: options.desktop?.minHeight ?? 26,
    }),
  };
}

export const desktopBoardAssetSources = {
  paperOverlay: {
    runtime: assetPath("/hero-curated/core/paper-overlay.jpg"),
    source: "public/hero-curated/core/paper-overlay.jpg",
  },
  grainOverlay: {
    runtime: assetPath("/hero-curated/core/grain-overlay.png"),
    source: "public/hero-curated/core/grain-overlay.png",
  },
  surveyMap: {
    runtime: assetPath("/hero-curated/locked/desktop-board/maps/map-1.png"),
    source: "new board pack assets/board pack/map 1 v4.png",
  },
  routeIndexMap: {
    runtime: assetPath("/hero-curated/locked/desktop-board/maps/map-3.png"),
    source: "new board pack assets/board pack/map3 v4.png",
  },
  activationMap: {
    runtime: assetPath("/hero-curated/locked/desktop-board/maps/map-2-v4.png"),
    source: "new board pack assets/board pack/map 2 v4.png",
    note: "Activation map uses a dedicated v4 runtime filename so the updated artwork loads without changing the current frame crop.",
  },
  zone01Card: {
    runtime: assetPath("/hero-curated/locked/desktop-board/cards/rust_23_oilrig.webp"),
    source: "new board pack assets/board pack/rust_23_oilrig.webp",
  },
  zone02Card: {
    runtime: assetPath(
      "/hero-curated/locked/desktop-board/cards/rust-monument-alt-review.jpg",
    ),
    source: "new board pack assets/board pack/rust-monument-alt-review.jpg",
  },
  zone03Card: {
    runtime: assetPath("/hero-curated/locked/desktop-board/cards/rust_20_swamp.webp"),
    source: "new board pack assets/board pack/rust_20_swamp.webp",
  },
  zone04Card: {
    runtime: assetPath(
      "/hero-curated/locked/desktop-board/cards/rust-industrial-primary-review.jpg",
    ),
    source: "new board pack assets/board pack/rust-industrial-primary-review.jpg",
  },
  redMarker: {
    runtime: assetPath("/hero-curated/locked/desktop-board/markers/red-marker.png"),
    source: "new board pack assets/board pack/red marker.png",
    note: "Runtime copy cropped to remove extra transparent canvas.",
  },
  whiteMarker: {
    runtime: assetPath("/hero-curated/locked/desktop-board/markers/white-marker.png"),
    source: "new board pack assets/board pack/white marker.png",
    note: "Runtime copy cropped to remove extra transparent canvas.",
  },
  boardRoughConcept: {
    runtime: assetPath("/hero-curated/locked/desktop-board/debug/board-rough-concept.png"),
    source: "new board pack assets/board pack/board very very rough assembly reference.png",
  },
  boardFinalPassConceptOverlay: {
    runtime: assetPath(
      "/hero-curated/locked/desktop-board/debug/board-final-pass-concept-overlay.png",
    ),
    source: "new board pack assets/board pack/FINAL-PASS-CONCEPT-BOARD.png",
    note: "Debug-only overlay extracted from the final-pass concept board pink placement marks.",
  },
  boardNewConceptOverlay: {
    runtime: assetPath(
      "/hero-curated/locked/desktop-board/debug/board-new-concept-overlay.png",
    ),
    source: "new board pack assets/board pack/NEWCONCEPTBOARD.png",
    note: "Debug-only overlay updated from NEWCONCEPTBOARD placement guidance for the desktop copy pass.",
  },
  boardNewConceptReference: {
    runtime: assetPath(
      "/hero-curated/locked/desktop-board/debug/board-new-concept-reference.png",
    ),
    source: "new board pack assets/board pack/NEWCONCEPTBOARD.png",
    note: "Full NEWCONCEPTBOARD reference retained as a dev-only secondary overlay option.",
  },
  campaignFilePaper: {
    runtime: assetPath("/hero-curated/locked/board/loose-leaf-note-02.png"),
    source: "asset pack for rr/v1/board-elements/loose-leaf-note-02.png",
  },
  campaignFileClip: {
    runtime: assetPath("/hero-curated/locked/board/binder-clip-black-01.png"),
    source: "asset pack for rr/v1/board-elements/binder-clip-black-01.png",
  },
};

export const desktopBoardAssets = {
  paperOverlay: desktopBoardAssetSources.paperOverlay.runtime,
  grainOverlay: desktopBoardAssetSources.grainOverlay.runtime,
  surveyMap: desktopBoardAssetSources.surveyMap.runtime,
  routeIndexMap: desktopBoardAssetSources.routeIndexMap.runtime,
  activationMap: desktopBoardAssetSources.activationMap.runtime,
  zone01Card: desktopBoardAssetSources.zone01Card.runtime,
  zone02Card: desktopBoardAssetSources.zone02Card.runtime,
  zone03Card: desktopBoardAssetSources.zone03Card.runtime,
  zone04Card: desktopBoardAssetSources.zone04Card.runtime,
  redMarker: desktopBoardAssetSources.redMarker.runtime,
  whiteMarker: desktopBoardAssetSources.whiteMarker.runtime,
  boardRoughConcept: desktopBoardAssetSources.boardRoughConcept.runtime,
  boardFinalPassConceptOverlay:
    desktopBoardAssetSources.boardFinalPassConceptOverlay.runtime,
  boardNewConceptOverlay: desktopBoardAssetSources.boardNewConceptOverlay.runtime,
  boardNewConceptReference:
    desktopBoardAssetSources.boardNewConceptReference.runtime,
  campaignFilePaper: desktopBoardAssetSources.campaignFilePaper.runtime,
  campaignFileClip: desktopBoardAssetSources.campaignFileClip.runtime,
};

export const desktopBoardDebugAssets = {
  boardOverlay: desktopBoardAssets.boardNewConceptOverlay,
  boardRoughConcept: desktopBoardAssets.boardRoughConcept,
  boardFinalPassConceptOverlay: desktopBoardAssets.boardFinalPassConceptOverlay,
  boardNewConceptOverlay: desktopBoardAssets.boardNewConceptOverlay,
  boardNewConceptReference: desktopBoardAssets.boardNewConceptReference,
};

const campaignFileContent = {
  variant: "campaign",
  kicker: "CAMPAIGN FILE",
  title: "PROJECT:\nLANDMARK",
};

const siteFilterCardContent = {
  variant: "filter",
  kicker: "SITE FILTER",
};

export const desktopBoardElements = {
  paperOverlay: {
    layer: "z1",
    role: "base",
    kind: "image",
    asset: desktopBoardAssets.paperOverlay,
    alt: "",
    blendMode: "screen",
    opacity: 0.06,
    className: "board-item--overlay board-item--paper",
    desktop: createPlacement({ x: 0, y: 0, width: 1680, height: 980 }),
  },
  surveyMap: {
    layer: "z1",
    role: "base",
    kind: "image",
    asset: desktopBoardAssets.surveyMap,
    alt: "Survey terrain map",
    fit: "cover",
    objectPosition: "50% 50%",
    radius: "26px",
    className: "board-item--map board-item--editorial-map board-item--survey-map",
    parallaxDepth: 0.12,
    desktop: createPlacement({
      x: 26,
      y: 22,
      width: 472,
      height: 506,
      rotation: -0.4,
      zIndex: 2,
    }),
  },
  routeIndexMap: {
    layer: "z1",
    role: "base",
    kind: "image",
    asset: desktopBoardAssets.routeIndexMap,
    alt: "Route index map",
    fit: "cover",
    objectPosition: "50% 50%",
    radius: "26px",
    className:
      "board-item--map board-item--editorial-map board-item--route-index-map",
    parallaxDepth: 0.12,
    desktop: createPlacement({
      x: 4,
      y: 526,
      width: 438,
      height: 430,
      rotation: 0.4,
      zIndex: 2,
    }),
  },
  activationMap: {
    layer: "z1",
    role: "base",
    kind: "image",
    asset: desktopBoardAssets.activationMap,
    alt: "Activation field map",
    fit: "cover",
    objectPosition: "50% 0%",
    imageTransform: "translate(2%, -30%) scale(2)",
    imageTransformOrigin: "50% 0%",
    radius: "28px",
    className: "board-item--map board-item--editorial-map board-item--activation-map",
    parallaxDepth: 0.12,
    desktop: createPlacement({
      x: 458,
      y: 132,
      width: 1200,
      height: 736,
      rotation: -0.2,
      zIndex: 1,
    }),
  },
  grainOverlay: {
    layer: "z1",
    role: "base",
    kind: "image",
    asset: desktopBoardAssets.grainOverlay,
    alt: "",
    blendMode: "soft-light",
    opacity: 0.11,
    className: "board-item--overlay board-item--grain",
    desktop: createPlacement({ x: 0, y: 0, width: 1680, height: 980 }),
  },
  siteFilterCard: createFileCardItem({
    content: siteFilterCardContent,
    className:
      "board-item--file-card board-item--document-card board-item--site-filter-card",
    radius: "20px",
    objectPosition: "50% 50%",
    imageTransform: "rotate(90deg) scale(1.12)",
    imageTransformOrigin: "50% 50%",
    desktop: {
      x: 54,
      y: 314,
      width: 214,
      height: 294,
      rotation: -1.4,
      zIndex: 6,
    },
  }),
  siteFilterClip: {
    layer: "z3",
    role: "prop",
    kind: "image",
    asset: desktopBoardAssets.campaignFileClip,
    alt: "",
    fit: "contain",
    objectPosition: "50% 46%",
    imageTransform: "scale(1.2) rotate(-7deg)",
    className: "board-item--prop board-item--clip board-item--site-filter-clip",
    parallaxDepth: 0.16,
    desktop: createPlacement({
      x: 58,
      y: 314,
      width: 46,
      height: 44,
      zIndex: 8,
    }),
  },
  zone02Card: createMediaCardItem({
    asset: desktopBoardAssets.zone02Card,
    alt: "Zone 02 scenic card",
    label: "ZONE 02",
    className:
      "board-item--card board-item--media-card board-item--zone-card board-item--zone02-card",
    objectPosition: "50% 50%",
    desktop: {
      x: 502,
      y: 263,
      width: 392,
      height: 226,
      rotation: -0.6,
      zIndex: 7,
    },
  }),
  zone03Card: createMediaCardItem({
    asset: desktopBoardAssets.zone03Card,
    alt: "Zone 03 scenic card",
    label: "ZONE 03",
    className:
      "board-item--card board-item--media-card board-item--zone-card board-item--zone03-card",
    objectPosition: "50% 54%",
    desktop: {
      x: 835,
      y: 46,
      width: 468,
      height: 232,
      rotation: 0.3,
      zIndex: 8,
    },
  }),
  zone04Card: createMediaCardItem({
    asset: desktopBoardAssets.zone04Card,
    alt: "Zone 04 scenic card",
    label: "ZONE 04",
    className:
      "board-item--card board-item--media-card board-item--zone-card board-item--zone04-card",
    objectPosition: "50% 50%",
    desktop: {
      x: 1242,
      y: 438,
      width: 338,
      height: 162,
      rotation: -0.1,
      zIndex: 7,
    },
  }),
  zone01Card: createMediaCardItem({
    asset: desktopBoardAssets.zone01Card,
    alt: "Zone 01 scenic card",
    label: "ZONE 01",
    className:
      "board-item--card board-item--media-card board-item--zone-card board-item--zone01-card",
    objectPosition: "50% 52%",
    desktop: {
      x: 260,
      y: 758,
      width: 386,
      height: 206,
      rotation: 0.2,
      zIndex: 7,
    },
  }),
  campaignFileCard: createFileCardItem({
    content: campaignFileContent,
    className:
      "board-item--file-card board-item--document-card board-item--campaign-file-card",
    radius: "22px",
    desktop: {
      x: 1298,
      y: 788,
      width: 312,
      height: 186,
      rotation: -1.6,
      zIndex: 5,
    },
  }),
  campaignFileClip: {
    layer: "z3",
    role: "prop",
    kind: "image",
    asset: desktopBoardAssets.campaignFileClip,
    alt: "",
    fit: "contain",
    objectPosition: "50% 43%",
    imageTransform: "scale(1.44)",
    className: "board-item--prop board-item--clip board-item--campaign-file-clip",
    parallaxDepth: 0.16,
    desktop: createPlacement({
      x: 1418,
      y: 770,
      width: 72,
      height: 64,
      zIndex: 7,
    }),
  },
  zone02Marker: createMarkerItem({
    asset: desktopBoardAssets.redMarker,
    alt: "Zone 02 marker",
    className: "board-item--marker board-item--marker-secondary",
    desktop: {
      x: 719,
      y: 451,
      width: 75,
      height: 96,
      rotation: -6,
      zIndex: 12,
    },
  }),
  zone03Marker: createMarkerItem({
    asset: desktopBoardAssets.redMarker,
    alt: "Zone 03 marker",
    className: "board-item--marker board-item--marker-secondary",
    desktop: {
      x: 975,
      y: 226,
      width: 75,
      height: 96,
      rotation: 7,
      zIndex: 12,
    },
  }),
  zone04Marker: createMarkerItem({
    asset: desktopBoardAssets.redMarker,
    alt: "Zone 04 marker",
    className: "board-item--marker board-item--marker-secondary",
    desktop: {
      x: 1431,
      y: 600,
      width: 75,
      height: 96,
      rotation: 5,
      zIndex: 12,
    },
  }),
  zone01Marker: createMarkerItem({
    asset: desktopBoardAssets.redMarker,
    alt: "Zone 01 marker",
    className: "board-item--marker board-item--marker-secondary",
    desktop: {
      x: 660,
      y: 736,
      width: 75,
      height: 96,
      rotation: -4,
      zIndex: 12,
    },
  }),
  primarySiteMarker: createMarkerItem({
    asset: desktopBoardAssets.whiteMarker,
    alt: "Primary site marker",
    className: "board-item--marker board-item--marker-primary",
    desktop: {
      x: 1005,
      y: 462,
      width: 80,
      height: 101,
      rotation: -1,
      zIndex: 13,
    },
  }),
  surveyMapRef: createTextItem(
    "REF. 001",
    "board-item--red-display board-item--map-ref board-item--survey-ref board-item--left-map-ref",
    {
      desktop: { x: 386, y: 54, maxWidth: 74, zIndex: 9 },
    },
  ),
  surveyMapTitle: createTextItem(
    "TERRAIN\nSURVEY",
    "board-item--red-display board-item--map-title board-item--survey-title",
    {
      desktop: { x: 332, y: 72, maxWidth: 126, zIndex: 9 },
    },
  ),
  routeIndexRef: createTextItem(
    "REF. 002",
    "board-item--red-display board-item--map-ref board-item--left-map-ref",
    {
      desktop: { x: 336, y: 558, maxWidth: 74, zIndex: 9 },
    },
  ),
  routeIndexTitle: createTextItem(
    "ROUTE\nINDEX",
    "board-item--red-display board-item--map-title board-item--route-index-title",
    {
      desktop: { x: 304, y: 582, maxWidth: 108, zIndex: 9 },
    },
  ),
  activationMapRef: createTextItem(
    "REF. 003",
    "board-item--red-display board-item--map-ref board-item--activation-ref",
    {
      desktop: { x: 1438, y: 152, maxWidth: 78, zIndex: 9 },
    },
  ),
  activationMapTitle: createTextItem(
    "ACTIVATION\nFIELD",
    "board-item--red-display board-item--map-title board-item--activation-title",
    {
      desktop: { x: 1408, y: 164, maxWidth: 126, zIndex: 9 },
    },
  ),
  activationMapSubline: createTextItem(
    "CANDIDATE PLACEMENTS / ROUTE LOGIC / VISIBILITY PLANNING",
    "board-item--editorial-subline board-item--activation-subline",
    {
      desktop: { x: 1318, y: 202, maxWidth: 236, zIndex: 9 },
    },
  ),
  zone01Ref: createTextItem(
    "REF. 004",
    "board-item--red-display board-item--zone-ref board-item--zone-support-ref",
    {
      desktop: { x: 528, y: 786, maxWidth: 76, zIndex: 11 },
    },
  ),
  zone02Ref: createTextItem(
    "REF. 006",
    "board-item--red-display board-item--zone-ref board-item--zone-support-ref",
    {
      desktop: { x: 776, y: 290, maxWidth: 76, zIndex: 11 },
    },
  ),
  zone03Ref: createTextItem(
    "REF. 005",
    "board-item--red-display board-item--zone-ref board-item--zone03-ref",
    {
      desktop: { x: 1174, y: 74, maxWidth: 78, zIndex: 11 },
    },
  ),
  zone04Ref: createTextItem(
    "REF. 007",
    "board-item--red-display board-item--zone-ref board-item--zone-support-ref",
    {
      desktop: { x: 1458, y: 462, maxWidth: 76, zIndex: 11 },
    },
  ),
  routeNetwork: {
    layer: "z2",
    role: "annotation",
    kind: "annotation",
    annotationType: "desktopRouteNetwork",
    className:
      "board-item--annotation board-item--annotation-route-major board-item--route-network",
    opacity: 0.94,
    parallaxDepth: 0.12,
    desktop: createPlacement({
      x: 650,
      y: 226,
      width: 850,
      height: 580,
      zIndex: 4,
    }),
  },
  circleZone01: createAnnotationItem({
    annotationType: "circle",
    className: "board-item--annotation board-item--annotation-circle-focus",
    annotationVariant: "zone",
    desktop: {
      x: 644,
      y: 729,
      width: 106,
      height: 110,
      rotation: -7,
      zIndex: 11,
    },
  }),
  circleZone02: createAnnotationItem({
    annotationType: "circle",
    className: "board-item--annotation board-item--annotation-circle-focus",
    annotationVariant: "zone",
    desktop: {
      x: 705,
      y: 446,
      width: 104,
      height: 107,
      rotation: -10,
      zIndex: 11,
    },
  }),
  circleZone03: createAnnotationItem({
    annotationType: "circle",
    className: "board-item--annotation board-item--annotation-circle-focus",
    annotationVariant: "zone",
    desktop: {
      x: 960,
      y: 220,
      width: 106,
      height: 110,
      rotation: 7,
      zIndex: 11,
    },
  }),
  circleZone04: createAnnotationItem({
    annotationType: "circle",
    className: "board-item--annotation board-item--annotation-circle-focus",
    annotationVariant: "zone",
    desktop: {
      x: 1414,
      y: 592,
      width: 109,
      height: 112,
      rotation: 6,
      zIndex: 11,
    },
  }),
  circlePrimarySiteOuter: createAnnotationItem({
    annotationType: "circle",
    className: "board-item--annotation board-item--annotation-circle-primary",
    annotationVariant: "primaryOuter",
    desktop: {
      x: 972,
      y: 437,
      width: 146,
      height: 151,
      rotation: -2,
      zIndex: 11,
    },
  }),
  circlePrimarySiteInner: createAnnotationItem({
    annotationType: "circle",
    className:
      "board-item--annotation board-item--annotation-circle-primary board-item--annotation-circle-inner",
    annotationVariant: "primaryInner",
    desktop: {
      x: 990,
      y: 455,
      width: 111,
      height: 114,
      rotation: 3,
      zIndex: 12,
    },
  }),
  noteStrongHorizonRead: createAnnotationNote(
    "STRONG HORIZON READ",
    "zone01Card",
    {
      anchorSide: "left",
      color: "rgba(172, 80, 70, 0.98)",
      className:
        "board-item--annotation-note board-item--handwritten board-item--handwritten-red board-item--handwritten-compact board-item--strong-horizon-note",
      desktop: {
        x: 648,
        y: 844,
        rotation: -4.8,
        maxWidth: 98,
        zIndex: 14,
      },
    },
  ),
  noteAmbientTraffic: createAnnotationNote("DISCOVERY POINT", "zone03Card", {
    anchorSide: "left",
    color: "rgba(172, 80, 70, 0.98)",
    className:
      "board-item--annotation-note board-item--handwritten board-item--handwritten-red board-item--handwritten-compact board-item--discovery-point-note",
    desktop: {
      x: 1268,
      y: 80,
      rotation: -4.8,
      maxWidth: 118,
      zIndex: 14,
    },
  }),
  notePrimarySite: createAnnotationNote("PRIMARY SITE", "primarySiteMarker", {
    anchorSide: "right",
    color: "rgba(128, 76, 67, 0.84)",
    className: "board-item--annotation-note board-item--primary-site-note",
    desktop: {
      x: 922,
      y: 552,
      rotation: -4.1,
      maxWidth: 98,
      zIndex: 14,
    },
  }),
  noteExposurePath: createAnnotationNote("EXPOSURE PATH", "zone04Marker", {
    anchorSide: "left",
    color: "rgba(172, 80, 70, 0.98)",
    className:
      "board-item--annotation-note board-item--handwritten board-item--handwritten-red board-item--handwritten-compact board-item--exposure-path-note",
    desktop: {
      x: 1238,
      y: 652,
      rotation: -7.4,
      maxWidth: 110,
      zIndex: 14,
    },
  }),
  siteFilterTick01: createTextItem(
    "sightline\nstrength",
    "board-item--site-filter-tick",
    {
      desktop: { x: 42, y: 402, maxWidth: 124, zIndex: 8 },
      color: "#261d15",
      parallaxDepth: 0.28,
    },
  ),
  siteFilterTick02: createTextItem(
    "repeat\nexposure",
    "board-item--site-filter-tick",
    {
      desktop: { x: 42, y: 452, maxWidth: 124, zIndex: 8 },
      color: "#261d15",
      parallaxDepth: 0.28,
    },
  ),
  siteFilterTick03: createTextItem(
    "landmark fit",
    "board-item--site-filter-tick",
    {
      desktop: { x: 42, y: 506, maxWidth: 124, zIndex: 8 },
      color: "#261d15",
      parallaxDepth: 0.28,
    },
  ),
  siteFilterTick04: createTextItem(
    "strong recall",
    "board-item--site-filter-tick",
    {
      desktop: { x: 42, y: 554, maxWidth: 124, zIndex: 8 },
      color: "#261d15",
      parallaxDepth: 0.28,
    },
  ),
};

export const desktopBoardAnimationGroups = {
  background: ["paperOverlay", "grainOverlay"],
  maps: ["surveyMap", "routeIndexMap", "activationMap"],
  mapCopy: [
    "surveyMapRef",
    "surveyMapTitle",
    "routeIndexRef",
    "routeIndexTitle",
    "activationMapRef",
    "activationMapTitle",
    "activationMapSubline",
  ],
  supportDocs: [
    "siteFilterCard",
    "siteFilterClip",
    "campaignFileCard",
    "campaignFileClip",
  ],
  siteFilterTicks: [
    "siteFilterTick01",
    "siteFilterTick02",
    "siteFilterTick03",
    "siteFilterTick04",
  ],
  zoneCards: ["zone01Card", "zone02Card", "zone03Card", "zone04Card"],
  zoneCopy: [
    "zone01Ref",
    "zone02Ref",
    "zone03Ref",
    "zone04Ref",
  ],
  routeMarkup: [
    "routeNetwork",
    "circleZone01",
    "circleZone02",
    "circleZone03",
    "circleZone04",
    "circlePrimarySiteOuter",
    "circlePrimarySiteInner",
  ],
  markers: [
    "zone01Marker",
    "zone02Marker",
    "zone03Marker",
    "zone04Marker",
    "primarySiteMarker",
  ],
  notes: [
    "noteStrongHorizonRead",
    "noteAmbientTraffic",
    "notePrimarySite",
    "noteExposurePath",
  ],
};
