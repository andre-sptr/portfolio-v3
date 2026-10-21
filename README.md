# Andre Saputra — Gravity Network Experience

A complete English-language portfolio built with **Next.js 16.4.2 App Router, React 19.3.1, strict TypeScript, Tailwind CSS 4, Three.js, React Three Fiber 9, Drei, and GSAP ScrollTrigger**. Light surfaces, transparent panels, a blue glass network core, and restrained motion connect the experience.

## Ready-to-upload export

This revised archive includes both source code and the production export in `out/`. To deploy the current build on a static host, upload the **contents of `out/`**, with `index.html` at the hosting root. Do not upload the whole source tree as the web root. Rebuild after changing source code or the production origin.

The previous Sites project identity is preserved in the source manifest, but that project was not accessible during this revision. No hosted deployment or GitHub push was performed.

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
public/                       Photo, CV, social card, favicon, Apple icon
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

Project illustrations are explicitly labeled **Conceptual interface**. They use CSS, SVG, and Lucide icons. They are not screenshots, test results, actual ticket records, financial data, or live application integrations. Each `View Details` opens factual internal project notes; no unavailable demo or repository URLs are fabricated. Technical skills are presented as general skills, not attributed to individual project stacks. The phone number is omitted from page text; the downloadable CV is the original supplied document.

The contact actions use the CV's `mailto:` address and LinkedIn URL. The site does not simulate submission of a contact form. Links to external services are subject to those services' availability.

## Portrait and CV

The supplied portrait is bundled as `public/images/andre-saputra.jpg` and appears in the hero identity and About section. The original photo is retained without retouching. The About image keeps its original aspect ratio; only the small avatar is cropped with CSS.

The supplied two-page PDF is bundled unchanged as `public/documents/CV_Andre_Saputra.pdf`. Visitors can download it from the hero, About card, and footer, or open it in a new tab from the About card. These are native links that work without JavaScript. Asset paths, download filename, and document details are centralized in `src/data/profile.ts`.

To replace the files, overwrite the corresponding assets, update dimensions or CV details in `profile.ts` if needed, then rebuild. The PDF includes the personal information contained in the original uploaded document, including its phone number.

## Project detail dialogs

Project notes open in a centered native dialog with an explicit fixed position, inset, and automatic margins. This prevents Tailwind's margin reset from moving the dialog into the top-left corner. Desktop dialogs are at most 760px wide; mobile dialogs leave a 12px margin around a nearly full-height panel. The content scrolls independently while the header, close button, and footer remain visible. Closing with the close button, footer button, Escape, or the backdrop preserves the existing behavior, and opening a project resets its content to the top.

The change is contained in `src/app/globals.css` and `src/components/ui/ProjectDialog.tsx`. Native dialog semantics, the existing backdrop, blue accents, borders, and rounded panels are retained.

Browser verification covered all five project dialogs on desktop and SiTiket at 320×640, 390×844, 768×700, and 1024×400 viewport sizes. Every checked dialog was horizontally and vertically centered, within the viewport, and free of horizontal overflow. Internal scrolling, reopening at the top, closing from both buttons and Escape, body scroll locking, and focus restoration were also checked. Viewport checks used browser frames, not physical devices.

## Browser icons

The browser favicon now uses the supplied blue globe-and-arrow logo. Its original transparency and proportions are preserved. `public/favicon.ico` supplies multiple sizes, `public/favicon-32.png` and `public/favicon.png` provide PNG alternatives, and `public/apple-icon.png` is the touch icon. Icon declarations are in `src/lib/metadata.ts` and use a version query to refresh the old browser icon. The navigation wordmark and social cards retain the established design.

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

The revised archive leaves `NEXT_PUBLIC_SITE_URL` unset. Set it to your actual production origin before rebuilding for publication. To deploy elsewhere, serve the contents of `out/` from a static host or upload them to your own web server. Rebuild with the new origin. The tracked hosting manifest identifies the current private Site; it contains no credential. Do not reuse that Site identity when starting a separate Site.

The copyright year is calculated at build time. Rebuild in a new year to update a static deployment.

## Verification and limitations

Lint, TypeScript, production build, static output audits, and the spring tests are run during implementation. The tests check equilibrium at 30/60/144 Hz, stability after very long frames, and zero or negative time deltas.

The photo/CV revision passed TypeScript checking, the production build, all three existing physics tests, and a static asset/link audit. The original photo and PDF match their exported copies byte-for-byte; both assets load in the browser preview. The built site was visually checked in a desktop browser, including the hero and About section, and the CV preview opens in a new tab. Full mobile/device testing and end-to-end browser download completion remain unverified. This browser has WebGL disabled, so the existing SVG fallback was visible; GPU rendering and real-device animation performance were not verified. No Lighthouse, frame-rate, Core Web Vitals, or hardware performance score is claimed.

Primary implementation references: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [React Three Fiber installation](https://r3f.docs.pmnd.rs/getting-started/introduction), and [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/).
