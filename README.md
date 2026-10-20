# Lativera

Lativera is a travel discovery platform for people living in Brazil. The application includes a responsive editorial homepage, destination and experience discovery, destination detail pages, travel guides, and informational pages.

## Getting started

Use Node.js 20.9 or newer and npm:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the local application.

For production, copy `.env.example` to `.env.local` and set
`NEXT_PUBLIC_SITE_URL` to the exact canonical public origin (for example,
`https://www.your-domain.example`, without a path). Do not use a preview or
localhost URL in production.

## Project checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Project conventions

- The application uses the Next.js App Router with TypeScript, Tailwind CSS, and ESLint.
- The default document language is Brazilian Portuguese (`pt-BR`). Keep future localization possible rather than hard-coding assumptions into shared components.
- Keep shared components in `src/components/layout` or `src/components/ui`, reusable data in `src/data`, shared utilities in `src/lib`, and shared types in `src/types`.
- Implemented pages include `/`, `/destinos`, `/destinos/[slug]`, `/experiencias`, `/experiencias/categoria/[slug]`, `/experiencias/[slug]`, `/planejar`, `/planejar/quiz`, `/planejar/orcamento`, `/roteiro`, `/salvos`, `/guias`, `/guias/[slug]`, `/voos`, `/voos/[slug]`, `/sobre`, `/contato`, `/faq`, and `/fontes-e-creditos`. Destination, experience, guide, and flight-route content is held in typed local data under `src/data`.
- `/fontes-e-creditos` lists the image author, original source, and license from the same typed credit records used for on-page photo attribution.
- The flight enquiry area uses `/voos` and `/voos/[slug]`, with the 20 approved airport-code pairs stored in `src/data/flight-routes.ts`. It provides route discovery and click-to-call/WhatsApp contact only; it does not provide live schedules, fares, bookings, cancellations, or refunds. Confirm that the supplied phone numbers are active for WhatsApp before publishing.
- The `/destinos` listing uses a curated, typed dataset of 18 destinations with local credited photography, including Manaus, Belém, and Alter do Chão in the Norte region. Search includes destination aliases, state, region, and travel categories; filters cover all Brazilian regions and the supported travel categories. Results, empty state, and filter reset are accessible and work client-side.
- `/experiencias` groups the seven existing experience ideas into linked categories and detail pages. These are editorial discovery content, not offers with confirmed operators, prices, durations, or availability.
- `/planejar/quiz` recommends destinations and experiences from existing category and destination relationships. Its scoring is based on those editorial tags; no trip-price or general duration-fit data is claimed.
- `/roteiro` assembles an ordered list of destinations and experiences. Its item slugs are stored in browser local storage and can be encoded in a share URL using the `itens` query parameter. Shared items are allowlisted against the current data; unknown items are ignored.
- `/planejar/orcamento` calculates a personal estimate from visitor-entered budget and optional expense amounts. Blank expenses are not treated as prices; no fares, hotel rates, or provider quotes are supplied.
- `/salvos` manages locally saved destinations and experiences without accounts. Saved data is browser/device-specific and may be cleared with site data.
- Destination pages include destination-specific highlights, practical tips, FAQs, related guides, and only the airport pairs already listed in the approved flight data. The `/voos?destino=...` link prefills its working route search; it does not imply live schedules, fares, or availability.
- Global design tokens live in `src/app/globals.css`: evergreen (`#174a43`), deep evergreen (`#103b36`), warm ivory (`#f8f7f2`), and terracotta (`#bd674b`), with system sans-serif body text and an editorial serif display stack. Reuse these tokens instead of introducing scattered colors, spacing, or type scales.
- The shared header, footer, and responsive container live in `src/components/layout`. Navigation links should point to real application routes.
- Store approved local photography under `public/images` and icons under `public/icons`. Use `next/image` for image delivery, with meaningful alternative text and appropriate dimensions.
- Use high-resolution, authentic travel photography from reputable, properly licensed sources. Record the source, license, photographer credit, and any required attribution for each asset in [IMAGE-CREDITS.md](./IMAGE-CREDITS.md). Do not use unverified or temporary image URLs as production assets.
- The contact form currently provides browser-side field validation only. It does not transmit or store messages; no backend or external form service is configured.
- Configure remote image hosts in `next.config.ts` only after selecting and verifying a required image source. Do not add broad host patterns.
- `robots.ts` allows crawling of public routes. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin before publishing; it enables absolute destination canonicals, Open Graph image URLs, and the generated `sitemap.xml` and sitemap reference in `robots.txt`. Without it, no localhost or preview URL is emitted and the sitemap is empty.
- The homepage emits WebSite JSON-LD and destination detail pages emit page-specific TouristDestination JSON-LD based on their visible content. No business identity, reviews, ratings, or offers are asserted.
- Keep pages semantic and accessible. Add accurate metadata and structured data only when supported by verified page content; do not invent reviews, ratings, prices, or travel statistics.

## Product roadmap

This roadmap is a direction, not a claim that these services are currently
available:

1. **Foundation and trust:** document production configuration and publish
   verified image attribution. Contact delivery and legal policies remain
   pending until the operator, data handling, and service configuration are
   confirmed.
2. **Discovery:** refine the homepage and destination discovery, add experience
   categories/details, and continue expanding underrepresented Brazilian
   regions only when destination information and properly licensed imagery can
   be verified.
3. **Planning tools:** implemented a data-tagged destination matcher, ordered
   shareable itineraries, visitor-entered budget estimates, and locally saved
   destinations and experiences. Accessibility, browser compatibility, and
   persistence edge cases remain on the final QA checklist.
4. **Content and contact:** scale the existing guide content into a blog
   structure, strengthen metadata and internal linking, and connect contact
   submissions to an approved backend with server-side validation and spam
   protection. Publish privacy and terms information consistent with verified
   practices.
5. **Commercial partnerships:** assess verified local operators, package
   enquiries, real availability, and booking/payment integrations only after
   providers, prices, operational responsibilities, and cancellation policies
   are agreed.

## Technology

Next.js App Router, React, TypeScript, Tailwind CSS, ESLint, Lucide React, and npm.
