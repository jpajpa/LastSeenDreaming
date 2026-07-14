# Last Seen Dreaming — implementation plan

## Product structure

- `/` — editorial home page with Sketch-exported atmosphere artwork, studio introduction, client strip, selected work, and footer.
- `/projects` — project archive.
- `/projects/[slug]` — media-led case study with next/previous links.
- `/contact` — minimal direct-email contact page with a WebGPU atmosphere.

## Visual system

- Treat Sketch `Final / Home` as the desktop source of truth: soft turquoise-to-green fields sit behind editorial DOM typography on a warm-white paper surface.
- Use the exported Sketch atmosphere artwork as the source of truth for the hero, dream, and contact atmospheres. Keep the artwork static until a reactive version can be made visually equivalent.
- Keep all copy, navigation, project cards, links, and content in accessible HTML. GPU effects remain decorative.
- Use the exported Sketch atmosphere layers as static fallback artwork. Never substitute WebGL or CSS gradients.

## Rendering architecture

- Render the Sketch atmosphere exports as ordinary transparent images with fixed desktop source dimensions and responsive scaling.
- Keep all copy, navigation, project cards, links, and content in accessible HTML.
- Continue using responsive Next.js images for project media; the unused WebGL showcase experiment is not part of the live visual system.

## Content model

- `siteSettings`: studio identity, contact details, social links, client logos, and SEO defaults.
- `project`: title, slug, featured order, excerpt, body, cover image, Mux video, gallery, credits, and SEO data.
- `mediaItem`: image/video source, alt text, caption, and display order.

## Delivery requirements

- Make every desktop composition responsive for mobile and tablet.
- Preserve keyboard access, keep the atmosphere artwork available without client-side rendering, and verify Sketch visual alignment, project navigation, video playback, accessibility, and responsive layouts before release.
