# Last Seen Dreaming — implementation plan

## Product structure

- `/` — editorial home page with animated atmosphere, studio introduction, client strip, selected work, and footer.
- `/projects` — project archive.
- `/projects/[slug]` — media-led case study with next/previous links.
- `/contact` — minimal direct-email contact page.

## Technology

- Next.js App Router, React, and TypeScript.
- Framer Motion for page and interface motion.
- React Three Fiber and Drei for the cursor-driven featured-project scene, with a DOM fallback.
- Sanity for editorial data and Mux for adaptive project video when production credentials are connected.
- Vercel for the web deployment and Sanity Studio hosting for content editing.

## Content model

- `siteSettings`: studio identity, contact details, social links, client logos, and SEO defaults.
- `project`: title, slug, featured order, excerpt, body, cover image, Mux video, gallery, credits, and SEO data.
- `mediaItem`: image/video source, alt text, caption, and display order.

## Delivery requirements

- Make every desktop composition responsive for mobile and tablet.
- Respect reduced-motion settings, preserve keyboard access, and provide non-WebGL project cards.
- Lazy-load WebGL and video; use responsive image sizes and posters for media performance.
- Verify routes, content fallbacks, project navigation, video playback, accessibility, and responsive layouts before release.
