# Asset Selection

This document locks the hero board runtime asset set for the current board system milestone.

Runtime is limited to:
- the existing approved assets already curated into `public/hero-curated/`
- exactly two newly promoted sourced Rust-native maps from `assets from GPT agent sourcing brief/02_maps_support/`

No other sourced asset is approved for runtime in this pass.

## Locked Runtime Set

### Core

| Source file | Runtime file | Status |
| --- | --- | --- |
| `asset pack for rr/v4/hero/core/map-base-4k.png` | `public/hero-curated/core/map-base.png` | Keep. Existing board foundation. |
| `assets from GPT agent sourcing brief/02_maps_support/6289.png` | `public/hero-curated/core/map-master-rust.png` | Promote. Approved sourced Rust-native master map. |
| `assets from GPT agent sourcing brief/02_maps_support/9DrvRU8.jpg` | `public/hero-curated/core/map-support-rust.jpg` | Promote. Approved sourced Rust-native support map. |
| `asset pack for rr/v4/hero/core/paper-overlay.jpg` | `public/hero-curated/core/paper-overlay.jpg` | Keep. Existing approved paper texture. |
| `asset pack for rr/v4/hero/core/vellum-overlay.png` | `public/hero-curated/core/vellum-overlay.png` | Keep. Existing approved translucent overlay. |
| `asset pack for rr/v4/hero/core/grain-overlay.png` | `public/hero-curated/core/grain-overlay.png` | Keep. Existing approved grain layer. |

`public/hero-curated/core/card-stock.jpg` is not part of the locked hero board runtime registry for this pass.

### Cards

| Source file | Runtime file | Status |
| --- | --- | --- |
| `asset pack for rr/reviewed assets/rust_23_oilrig.webp` | `public/hero-curated/cards/card-primary.webp` | Keep. Primary Rust proof card. |
| `asset pack for rr/reviewed assets/rust_20_swamp.webp` | `public/hero-curated/cards/card-secondary.webp` | Keep. Secondary Rust support card. |
| `asset pack for rr/reviewed assets/8da7d33caed48ee.png` | `public/hero-curated/cards/card-detail.png` | Keep. Existing detail inset already covers the board's map-detail role. |
| `asset pack for rr/v4/hero/reviewed assets/rust-monument-alt-review.jpg` | `public/hero-curated/cards/card-alt.jpg` | Keep. Approved alternate card, retained in runtime set. |

### Board Elements

| Source file | Runtime file | Status |
| --- | --- | --- |
| `asset pack for rr/v1/board-elements/loose-leaf-note-01.png` | `public/hero-curated/board/note-a.png` | Keep. |
| `asset pack for rr/v1/board-elements/loose-leaf-note-02.png` | `public/hero-curated/board/note-b.png` | Keep. |
| `asset pack for rr/v1/board-elements/masking-tape-strip-01.png` | `public/hero-curated/board/tape-a.png` | Keep. |
| `asset pack for rr/v1/board-elements/masking-tape-strip-02.png` | `public/hero-curated/board/tape-b.png` | Keep. |
| `asset pack for rr/v1/board-elements/binder-clip-black-01.png` | `public/hero-curated/board/binder-clip.png` | Keep. |
| `asset pack for rr/v1/board-elements/photo-corner-01.svg` | `public/hero-curated/board/photo-corner-a.svg` | Keep. |
| `asset pack for rr/v1/board-elements/photo-corner-02.svg` | `public/hero-curated/board/photo-corner-b.svg` | Keep. |
| `asset pack for rr/v1/board-elements/label-tab-cream-01.svg` | `public/hero-curated/board/label-tab.svg` | Keep. |
| `asset pack for rr/v1/board-elements/card-shadow-mask-01.png` | `public/hero-curated/board/shadow-mask.png` | Keep. |
| `asset pack for rr/v1/board-elements/annotation-circle-red.svg` | `public/hero-curated/board/annotation-circle.svg` | Keep. |
| `asset pack for rr/v1/board-elements/annotation-route-red.svg` | `public/hero-curated/board/annotation-route.svg` | Keep. |
| `asset pack for rr/v1/board-elements/annotation-arrows-red.svg` | `public/hero-curated/board/annotation-arrows.svg` | Keep. |
| `asset pack for rr/v1/board-elements/annotation-x-red.svg` | `public/hero-curated/board/annotation-x.svg` | Keep. |

## Explicit Rejections

### Sourced Review Cards

Nothing in `assets from GPT agent sourcing brief/03_rust_scene_cards_review/` is approved for runtime.

Reasons:
- the sourcing manifest marks the folder as review-only because exact source recovery and commercial clearance were not completed
- the locked board already has approved runtime cards, so these files are not needed to fill any runtime role
- quality is inconsistent inside the folder, so promoting from it would risk introducing weak assets into runtime

### Archival Map Variants

The only sourced maps promoted into runtime are:
- `assets from GPT agent sourcing brief/02_maps_support/6289.png`
- `assets from GPT agent sourcing brief/02_maps_support/9DrvRU8.jpg`

The following sourced map groups are explicitly rejected for runtime:
- `assets from GPT agent sourcing brief/01_maps_master/rr-map-master-island-*`
  Reason: these read as archival island-chart hero plates rather than the locked Rust-native map treatment.
- `assets from GPT agent sourcing brief/02_maps_support/rr-map-support-sheet-*`
  Reason: these are not the selected promoted files, and adding them would expand the runtime set beyond the locked pair.
- `assets from GPT agent sourcing brief/02_maps_support/rr-map-detail-inset-*`
  Reason: the board already has `public/hero-curated/cards/card-detail.png` for the detail role, so these would be redundant runtime additions.
- `assets from GPT agent sourcing brief/02_maps_support/map-base-4k.png`
  Reason: `public/hero-curated/core/map-base.png` already fills the base-map role in runtime.

### Sourced Documents, Notes, and Fasteners

Nothing in `assets from GPT agent sourcing brief/04_documents_and_notes/` is approved for runtime.

Reasons:
- the locked board already has approved note, label, and paper-language assets in `public/hero-curated/board/`
- the sourced document folder, checklist note, and label-strip assets would widen the runtime set without solving a missing board role
- this step is not a layout-redesign pass, so no new document stack or checklist prop set is being introduced

Nothing in `assets from GPT agent sourcing brief/05_fasteners_and_overlays/` is approved for runtime.

Reasons:
- sourced tape, binder clip, paperclip, and pushpin-style replacements are unnecessary because the existing runtime tape and clip assets already cover those roles
- introducing sourced fasteners would violate the locked boundary and risk mixing asset families unnecessarily
- sourced overlay alternates are rejected because the runtime overlay stack is already locked to `paper-overlay.jpg`, `vellum-overlay.png`, and `grain-overlay.png`

### Uncleared Review Bucket

Nothing in `assets from GPT agent sourcing brief/99_review_uncleared/` is approved for runtime.

Reason:
- the folder is explicitly quarantined for rights and provenance review, so no file from it can enter the locked runtime set

## Runtime Summary

Approved sourced promotions in this pass:
- `public/hero-curated/core/map-master-rust.png`
- `public/hero-curated/core/map-support-rust.jpg`

Everything else already in the locked runtime set remains the existing curated repo asset inventory listed above.
