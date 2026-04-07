# SOURCE_NOTES

## Intended final hero direction
A restrained, premium floating campaign-board hero: a terrain/map base, a small number of layered Rust-native location cards, and modular physical board elements that can animate into place with GSAP. The pack deliberately avoids a literal desk scene, detective-board clutter, or tactical-roleplay prop overload.

## Why Rust-native cards were prioritized
The brief explicitly called for Rust-native scenic and industrial imagery rather than generic stock industrial shots. The board is meant to feel like a strategic activation board for Rust, so the landmark/location cards are where the Rust identity needs to be felt most strongly.

## Why generic scenic imagery was rejected
Generic industrial or landscape stock would make the hero feel like a moodboard rather than a Rust campaign board. The production pack therefore keeps generic assets limited to base materials, paper/tape/pin elements, and non-content overlays.

## Why no asset generation was used
No AI image generation, redraws, synthetic paper props, fabricated markup, or paintovers were used. Every included file was either directly sourced from an existing rights-cleared asset or minimally converted from a sourced asset for usability (for example transparent overlays extracted from sourced paper textures).

## Substitutions made
- Used a public-domain USGS topographic island map as the main terrain-sheet base because it met the rights bar cleanly and still delivered the desired strategic-surface feeling.
- Used minimal Pexels paper/stationery assets for the physical board layer.
- Held all official Rust imagery in `review-required` instead of production folders because the reuse basis for a commercial homepage hero remained unclear.

## Limitations encountered
- The licensing path for official Rust/Facepunch imagery was not explicit enough for a third-party commercial homepage use case, so those images were quarantined into `review-required`.
- Several generic stationery items that would have been easy to fabricate (annotation SVGs, label tabs, standalone shadows, archival corners) were intentionally left missing rather than invented.
- A few sourced board elements are usable but not as perfect or as neutral as the ideal target; for example the tape strips are brighter than ideal.

## Best 8 assets in the pack and why
1. `map-base-4k.png` — strongest legal/quality anchor; beautiful coastline and topo structure.
2. `card-stock-cream.jpg` — premium neutral paper material that can support many derived layouts.
3. `vellum-overlay.png` — gives the board a drafting-sheet layer without fake generation.
4. `grain-overlay.png` — subtle full-scene texture derived from a real paper source.
5. `sticky-note-yellow-01.png` — strong hero-adjacent memo element with clean geometry.
6. `push-pin-red-01.png` — premium red board anchor that matches strategic markup language.
7. `rust-industrial-primary-review.jpg` — best industrial Rust card found; excellent scale and monument feel.
8. `rust-environment-secondary-review.jpg` — best quiet Rust environment card found; lush, cinematic, and highly layerable.

## Review-pack note
This package includes the same production-safe board/base assets plus official Rust images inside `review-required/`. Those Rust files should not be promoted into `rust-cards/` until a human confirms the reuse basis is acceptable for your exact use case.
