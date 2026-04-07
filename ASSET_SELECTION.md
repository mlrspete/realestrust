# Asset Selection

This audit uses only assets already present in the repo. The original asset-pack folders were left untouched. Curated files were copied into `public/hero-curated/`, and only a few transparent PNG props were lightly trimmed for cleaner placement.

## Selected

### Core

| Original local file | Curated copy |
| --- | --- |
| `asset pack for rr/v4/hero/core/map-base-4k.png` | `public/hero-curated/core/map-base.png` |
| `asset pack for rr/v4/hero/core/paper-overlay.jpg` | `public/hero-curated/core/paper-overlay.jpg` |
| `asset pack for rr/v4/hero/core/vellum-overlay.png` | `public/hero-curated/core/vellum-overlay.png` |
| `asset pack for rr/v4/hero/core/grain-overlay.png` | `public/hero-curated/core/grain-overlay.png` |
| `asset pack for rr/v4/hero/core/card-stock-cream.jpg` | `public/hero-curated/core/card-stock.jpg` |

### Rust Cards

| Role | Original local file | Curated copy | Reason |
| --- | --- | --- | --- |
| Primary | `asset pack for rr/reviewed assets/rust_23_oilrig.webp` | `public/hero-curated/cards/card-primary.webp` | Strongest cinematic Rust card in the pack. Dark structure, iconic silhouette, premium lighting. |
| Secondary | `asset pack for rr/reviewed assets/rust_20_swamp.webp` | `public/hero-curated/cards/card-secondary.webp` | Good environmental counterpoint to the oilrig card. Quiet, atmospheric, and still recognizably Rust-native. |
| Detail inset | `asset pack for rr/reviewed assets/8da7d33caed48ee.png` | `public/hero-curated/cards/card-detail.png` | Best map-led detail card without introducing a literal monitor or HUD frame. |
| Alt | `asset pack for rr/v4/hero/reviewed assets/rust-monument-alt-review.jpg` | `public/hero-curated/cards/card-alt.jpg` | Darker and more editorial than the brighter alternates, so it supports the campaign-board tone better. |

### Board Elements

| Original local file | Curated copy | Note |
| --- | --- | --- |
| `asset pack for rr/v1/board-elements/loose-leaf-note-01.png` | `public/hero-curated/board/note-a.png` | Trimmed excess transparent canvas only. |
| `asset pack for rr/v1/board-elements/loose-leaf-note-02.png` | `public/hero-curated/board/note-b.png` | Trimmed excess transparent canvas only. |
| `asset pack for rr/v1/board-elements/masking-tape-strip-01.png` | `public/hero-curated/board/tape-a.png` | Trimmed excess transparent canvas only. |
| `asset pack for rr/v1/board-elements/masking-tape-strip-02.png` | `public/hero-curated/board/tape-b.png` | Trimmed excess transparent canvas only. |
| `asset pack for rr/v1/board-elements/binder-clip-black-01.png` | `public/hero-curated/board/binder-clip.png` | Trimmed excess transparent canvas only. |
| `asset pack for rr/v1/board-elements/photo-corner-01.svg` | `public/hero-curated/board/photo-corner-a.svg` | Copied unchanged. |
| `asset pack for rr/v1/board-elements/photo-corner-02.svg` | `public/hero-curated/board/photo-corner-b.svg` | Copied unchanged. |
| `asset pack for rr/v1/board-elements/label-tab-cream-01.svg` | `public/hero-curated/board/label-tab.svg` | Copied unchanged. |
| `asset pack for rr/v1/board-elements/card-shadow-mask-01.png` | `public/hero-curated/board/shadow-mask.png` | Copied unchanged. |
| `asset pack for rr/v1/board-elements/annotation-circle-red.svg` | `public/hero-curated/board/annotation-circle.svg` | Copied unchanged. |
| `asset pack for rr/v1/board-elements/annotation-route-red.svg` | `public/hero-curated/board/annotation-route.svg` | Copied unchanged. |
| `asset pack for rr/v1/board-elements/annotation-arrows-red.svg` | `public/hero-curated/board/annotation-arrows.svg` | Copied unchanged. |
| `asset pack for rr/v1/board-elements/annotation-x-red.svg` | `public/hero-curated/board/annotation-x.svg` | Copied unchanged. |

## Intentionally Rejected

### Rust Alternates Rejected for This Scaffold

- `asset pack for rr/reviewed assets/rust_06_gasstation.webp`
  Too sunlit and open-world bright for the restrained dark campaign-board direction.
- `asset pack for rr/v4/hero/reviewed assets/rust-industrial-primary-review.jpg`
  Useful reference, but flatter and hazier than the selected oilrig card.
- `asset pack for rr/v4/hero/reviewed assets/rust-environment-secondary-review.jpg`
  Strong image, but the dense foliage reads busier and less editorial than the selected swamp scene.
- `asset pack for rr/v4/hero/reviewed assets/rust-map-detail-inset-review.jpg`
  Too literal as a game-screen object because of the UI frame.
- `asset pack for rr/v4/hero/reviewed assets/rust-close-detail-texture-review.jpg`
  Moody and tactile, but too tight and dark for the four-card scaffold set.

### Board Props Rejected

- `asset pack for rr/v1/board-elements/sticky-note-yellow-01.png`
  Too office-like and square compared with the looser paper-note direction.
- `asset pack for rr/v1/board-elements/sticky-note-cream-01.png`
  Cleaner than the yellow version, but still reads like a memo pad rather than premium collage stock.
- `asset pack for rr/v1/board-elements/push-pin-red-01.png`
  Too literal as a hero anchor and starts pushing the scene toward detective-board prop styling.
- `asset pack for rr/v1/board-elements/push-pin-black-01.png`
  Less loud than the red pin, but still too prop-forward for this restrained board.
- `asset pack for rr/v1/board-elements/paper-clip-steel-01.png`
  Feels like desk clutter rather than campaign-board editing.
- `asset pack for rr/v1/board-elements/annotation-bracket-red.svg`
  Not needed for this milestone's placeholder composition.
- `asset pack for rr/v2/board-elements/*`
  Not copied because the v1 set already covers the cleaner board language needed here.
- `asset pack for rr/v4/hero/board-elements/sticky-note-yellow-01.png`
  Rejected with the rest of the literal memo props.
- `asset pack for rr/v4/hero/board-elements/masking-tape-strip-01.png`
  Later stock-prop pass is less aligned with the cleaner v1/v2 board set.
- `asset pack for rr/v4/hero/board-elements/masking-tape-strip-02.png`
  Later stock-prop pass is less aligned with the cleaner v1/v2 board set.
- `asset pack for rr/v4/hero/board-elements/push-pin-red-01.png`
  Rejected for the same reason as the v1 red pin.
- `asset pack for rr/v4/hero/board-elements/push-pin-black-01.png`
  Rejected for the same reason as the v1 black pin.

## OBJ Audit

- `asset pack for rr/rust obj items/target.reactive.obj`
  Inspected as a possible later accent, but it still reads like a literal game prop and was not copied.
- `asset pack for rr/rust obj items/wall.frame.garagedoor.obj`
  Inspected as a possible structural accent, but it is too thin and too contextual to justify the complexity right now.

No OBJ survived the audit. `public/hero-curated/obj/` remains intentionally empty for this milestone.
