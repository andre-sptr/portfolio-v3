# Andre Saputra — Gravity Network Experience

A complete English-language portfolio built with **Next.js 16.4.2 App Router, React 19.3.1, strict TypeScript, Tailwind CSS 4, Three.js, React Three Fiber 9, Drei, and GSAP ScrollTrigger**. Light surfaces, transparent panels, a blue glass network core, and restrained motion connect the experience.

## Run locally

Use **Node.js 22.18+** and npm. Node.js 24.19.0 was used for verification.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. `NEXT_PUBLIC_SITE_URL` may remain empty for development. Set it to the actual absolute production origin before building for deployment.

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run build` creates a complete static site in `out/`. No runtime application server, database, API keys, or contact backend is required. To inspect a production export locally:

```bash
python3 -m http.server 3000 --directory out
```

The configured `output: "export"` means `next start` is not used. For a server deployment later, remove `output: "export"` and choose the server features needed by that deployment.

## Main files

```text
public/                       Social card, favicon, Apple icon
src/app/                      Server page/layout, styles, robots, sitemap
src/components/layout/        Accessible navigation and footer
src/components/sections/      All eight content sections
src/components/three/         Lazy scene, procedural core, SVG fallback
src/components/ui/            Project illustrations, dialogs, GSAP orchestration
src/data/                     Profile, projects, experience, education, skills
src/hooks/                    Responsive and reduced-motion preferences
src/lib/                      Metadata, shared scene values, spring integrator
tests/physics.test.mjs         Spring stability and equilibrium tests
```

`page.tsx`, the sections, and footer are Server Components. Navigation, project dialog controls, scroll effects, and the 3D loader are isolated Client Components. The actual WebGL module uses `next/dynamic` with `ssr: false`. Hero text and a procedural SVG illustration are present in the initial HTML.

## Content and provenance

Personal facts were checked against **CV_Andre Saputra.pdf** provided with the project context. The five project descriptions, employment dates, degree, GPA, certifications, skills, email, and LinkedIn profile follow that CV. Update the files in `src/data/` when these facts change. Editorial labels and reusable interface copy live in their components and `src/data/profile.ts`.

Project illustrations are explicitly labeled **Conceptual interface**. They use CSS, SVG, and Lucide icons. They are not screenshots, test results, actual ticket records, financial data, or live application integrations. Each `View Details` opens factual internal project notes; no unavailable demo or repository URLs are fabricated. Technical skills are presented as general skills, not attributed to individual project stacks. The phone number is intentionally omitted from the published portfolio.

The contact actions use the CV's `mailto:` address and LinkedIn URL. The site does not simulate submission of a contact form. Links to external services are subject to those services' availability.

## Gravity and motion

- The core is a procedural physical-material glass sphere, an inner geometric center, elliptical rings, 16 orbiting nodes, thin network connections, and 9 traveling signal particles.
- Pointer motion drives a damped spring and light camera parallax. Node hover slightly enlarges the relevant node. Springs use ref-owned vectors and a clamped timestep; no React state updates occur per animation frame.
- GSAP changes spread, orientation, camera offset, and motion speed as sections enter the viewport. On screens at least 1360px wide, the same scene becomes a small, unobtrusive corner motif after leaving the hero, so its composition can evolve with the page.
- Desktop card tilt is limited to three degrees. Section reveals, the network strip, and the experience timeline follow ordinary native scrolling. No scroll hijacking or long pinning is used.
- Pause/Play stops or resumes the scene. Animation also stops when the tab is hidden or the scene is offscreen without the desktop motif.
- GSAP contexts, media queries, triggers, observers, listeners, and manually owned shared GPU resources have cleanup paths.

## Responsive quality and accessibility

Layouts cover 320px mobile widths through wide desktops. Mobile uses 9 nodes, 5 particles, lower geometry resolution, no transmission, no pointer-driven movement, and DPR up to 1.15. Desktop DPR is capped at 1.5. Device save-data mode and mobile devices reporting four or fewer CPU threads retain the static SVG instead of loading Three.js. No external model, HDR map, image, or font request is needed; Manrope is self-hosted with `next/font/local`.

`prefers-reduced-motion` disables scroll entrances, tilt, parallax, magnetic movement, and automatic orbiting. The scene renders on demand. The persistent corner motif is hidden in reduced-motion mode. Static content remains readable with JavaScript disabled, and the mobile navigation and project notes have no-JavaScript alternatives. WebGL initialization failures and context loss retain the SVG fallback.

Semantic headings, a skip link, clear focus styles, native anchors, and keyboard-accessible controls are included. Native `<dialog>` provides modal focus containment and Escape handling. Closing returns focus to the invoking project link. The mobile menu supports Escape and keyboard traversal. Hover is never required to read content or open project details.

## SEO and deployment

Set `NEXT_PUBLIC_SITE_URL` to the real production origin in `.env.local` or your build environment, then rebuild. Next's Metadata API provides title, description, canonical URL, Open Graph and Twitter cards. The social card and icons are local. `robots.txt` and `sitemap.xml` are generated statically; canonical and sitemap entries are omitted when no valid production origin is configured. No speculative structured data is included.

The initial build uses the private Site origin returned during registration. To deploy elsewhere, serve the contents of `out/` from a static host or upload them to your own web server. Rebuild with the new origin. The tracked hosting manifest identifies the current private Site; it contains no credential. Do not reuse that Site identity when starting a separate Site.

The copyright year is calculated at build time. Rebuild in a new year to update a static deployment.

## Verification and limitations

Lint, TypeScript, production build, static output audits, and the spring tests are run during implementation. The tests check equilibrium at 30/60/144 Hz, stability after very long frames, and zero or negative time deltas.

The managed environment does not provide the required browser-control capability. Development-server and interactive browser QA were not run. Desktop/mobile rendering, focus behavior, GPU appearance, context-loss behavior, reduced-motion switching, console output, and real-device performance still need browser validation. No Lighthouse, frame-rate, Core Web Vitals, or hardware performance score is claimed.

Primary implementation references: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [React Three Fiber installation](https://r3f.docs.pmnd.rs/getting-started/introduction), and [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/).
