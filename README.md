# Real Rust Hero

Premium cinematic landing-page hero for the line:

`Put your brand on the map.`

The experience is intentionally hybrid:

- DOM/SVG/GSAP handles the authored board composition and assembly sequence
- three.js adds only supporting physical presence: a slab backing and a restrained target marker
- the collage remains the source of truth

## Stack

- Vite
- React
- plain CSS
- GSAP
- Three.js

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```text
public/hero-curated/
  core/
  cards/
  board/
  obj/
src/
  components/
  lib/
  styles/
ASSET_SELECTION.md
```

## Curated Assets

Curated runtime assets live in `public/hero-curated/`.

They were selected from these original local asset-pack folders:

- `asset pack for rr/v4/hero/core/`
- `asset pack for rr/reviewed assets/`
- `asset pack for rr/v4/hero/reviewed assets/`
- `asset pack for rr/v1/board-elements/`
- `asset pack for rr/rust obj items/` for audit only

The original pack folders were left untouched.

For the exact per-file selection and rejection audit, see `ASSET_SELECTION.md`.

## What Was Used

- Core base materials come from the v4 hero core textures
- Rust proof imagery comes from the reviewed Rust folders
- Board props come from the cleaner v1 board-element set
- The runtime board uses:
  - `map-base.png`
  - `paper-overlay.jpg`
  - `vellum-overlay.png`
  - `grain-overlay.png`
  - `card-primary.webp`
  - `card-secondary.webp`
  - `card-detail.png`
  - `note-a.png`
  - `tape-a.png`
  - `binder-clip.png` on desktop only
  - the restrained red annotation set

## What Was Intentionally Not Used

These local assets were rejected on purpose because they weakened the premium campaign-board direction:

- `rust_06_gasstation.webp`
  Too bright and too open compared with the darker editorial direction.
- `rust-industrial-primary-review.jpg`
  Strong reference, but flatter than the selected oilrig image.
- `rust-environment-secondary-review.jpg`
  Atmospheric, but busier and less controlled than the selected swamp image.
- `rust-map-detail-inset-review.jpg`
  Too UI-framed and too game-screen literal for this board.
- `rust-close-detail-texture-review.jpg`
  Too tight and abstract for the hero proof system.
- Sticky notes, paper clips, and stock push-pin cutouts from the board-element folders
  They pushed the composition toward office props or detective-board cliche.
- Most later v4 board props
  The v1 set was cleaner and more believable.

## OBJ Accent

No Rust OBJ accent is used in the shipped hero.

Both audited candidates were intentionally omitted:

- `target.reactive.obj`
- `wall.frame.garagedoor.obj`

They read too literal or too contextual for the final shot. The only 3D elements that remain are:

- a subtle three.js board slab behind the DOM collage
- a small procedural target marker near the selected zone

## Desktop And Mobile Composition

Both layouts use the same campaign story, but they are not the same poster.

Desktop uses the canonical `1680 x 980` board and keeps:

- macro map base
- primary Rust proof card
- secondary support card
- detail inset
- note
- tape
- binder clip
- circle, route, and arrows
- subtle three.js slab and target marker

Mobile uses the canonical `900 x 1360` board and is intentionally reduced:

- macro map base
- primary Rust proof card
- detail inset
- note
- one tape treatment
- circle, route, and arrows
- simplified target marker

Mobile intentionally drops:

- the secondary support card
- the binder clip
- any extra prop clutter

## Composition Source Of Truth

The board is authored in `src/lib/heroManifest.js`.

That file contains:

- desktop and mobile board sizes
- palette constants
- role system
- curated asset paths
- deterministic layer positions

If the shot needs retuning, start there first.

## How To Swap Rust Cards Later

There are two clean ways to swap imagery:

1. Replace the curated files in `public/hero-curated/cards/` while keeping the same normalized filenames.
2. Update the card asset paths in `src/lib/heroManifest.js`.

If a new image has a different crop or aspect ratio, also adjust these layout fields in `src/lib/heroManifest.js`:

- `x`
- `y`
- `width`
- `height`
- `rotation`
- `objectPosition`

Desktop and mobile are tuned separately, so update both layouts if the new card should appear in both posters.

## Motion And Enhancement

- `src/lib/createHeroTimeline.js` controls the GSAP assembly sequence
- `src/lib/useBoardParallax.js` controls the idle drift and restrained pointer parallax
- `src/components/ThreeBoardShell.jsx` lazy-loads the three.js enhancement layer
- `src/lib/createBoardScene.js` creates the slab scene and the procedural target marker

The three.js layer is supportive only. The board should still look complete if WebGL is unavailable.

## Handoff Notes

- Keep the hero map-led and restrained
- Avoid adding extra props unless they materially improve the composition
- Avoid turning the page into a literal desk scene or a game UI
- If a future 3D accent competes with the DOM collage, remove it instead of forcing it in
