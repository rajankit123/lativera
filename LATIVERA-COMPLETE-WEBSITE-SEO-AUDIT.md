# Lativera — Complete Website, SEO/AEO Audit and Growth Roadmap

**Audit date:** 19 October 2026  
**Scope:** Source-based technical/content review, representative local-browser
checks, public-source research, and an implementation roadmap.  
**Change boundary:** Audit and planning only. No application code, runtime
configuration, dependencies, or existing project-status documentation were
changed for this audit.

## Evidence labels and limitations

- **Code-confirmed:** present in the checked-in workspace source/data.
- **Browser-checked:** observed on the local Next.js development server on the
  audit date. This is not a production deployment test.
- **Documented earlier:** recorded in `LATIVERA-PROJECT-STATUS.md`; not
  independently rerun unless this report says so.
- **Public-source checked:** retrieved from the linked public page on the audit
  date. This is not a claim about a competitor's private performance.
- **Recommendation:** a proposed next step, not a statement that it is
  implemented.

No Search Console, analytics, keyword research, backlink, production hosting,
or PageSpeed account/data was connected. No search volumes, rankings, traffic,
conversion rates, CPC, backlinks, or Core Web Vitals scores are asserted.

## 1. Executive summary

Lativera is a small Portuguese-language Brazilian travel-discovery and
planning site, not an online travel agency. It already combines a useful
editorial discovery layer with lightweight local-first planning tools:
destination and experience browsing, short guides, a tagged recommendation
quiz, visitor-entered budget calculations, saved items, shareable itinerary
links, and enquiry-only flight-route pages.

### Strongest foundations

- App Router pages render useful server-generated content and use statically
  typed local datasets.
- The 18 destination detail pages include local context, highlights, planning
  tips, FAQs, related links, alt text, and destination-specific metadata.
- The site has a clean URL structure, a sitemap/robots implementation, local
  image optimization via `next/image`, shared metadata helpers, and a custom
  404 page.
- The product is unusually explicit about what it does **not** provide:
  prices, schedules, bookings, operator availability, or contact-form
  delivery.
- The current local smoke check returned HTTP 200 for representative public
  and planning routes, HTTP 404 for an unknown destination slug, and HTTP 200
  for robots and sitemap endpoints.
- Current `npm run lint` and `npm run typecheck` passed. The repository has no
  automated test script or discovered test files.

### Most important confirmed gaps

1. **Production crawl setup is not ready in this workspace.** The
   `NEXT_PUBLIC_SITE_URL` example is blank; the local `robots.txt` has no
   sitemap reference and local `sitemap.xml` is an empty `<urlset>`. The
   production hostname is not established, so production canonical URLs and
   sitemap output cannot be validated.
2. **Canonical coverage is incomplete even after the domain is configured.**
   Canonicals are only added by selected page templates. Homepage, guide
   pages, flight pages, and several informational/listing routes do not
   currently call a canonical helper.
3. **The sitemap currently includes every tool and contact route.** There is
   no per-page `noindex` policy. Decide whether device-specific saved items and
   shareable itinerary tools should be search landing pages before publishing
   the sitemap.
4. **Editorial depth and trust signals are the largest organic-growth
   constraint.** There are 18 destination records, seven short experience
   records, and four guides, but no author/reviewer, publication/update date,
   editorial source list, or visible sourcing workflow. Practical caveats are
   present, but many details remain broad and require factual review.
5. **Flight-route pages are enquiry pages, not search results.** Their route
   copy is generated from airport/city records and shared travel tips; routes,
   airport naming, phone numbers, and WhatsApp availability still require
   operator/source verification. The flight hero image depicts Las Vegas.
6. **The contact form does not send or retain messages.** This is clearly
   disclosed in the page and UI, but the site has no privacy/terms pages or
   verified operator identity to support a future real contact workflow.
7. **No actual performance or Search Console result is available.** Lighthouse,
   Web Vitals, indexing coverage, query data, and cross-browser accessibility
   remain unmeasured.

**No P0 issue was confirmed.** The main P1 items are pre-launch configuration,
canonical/indexing policy, source verification, and truthful trust/contact
decisions—not evidence of an active security issue.

## 2. Website overview and maturity

| Area | Current implementation | Assessment |
|---|---|---|
| Product | Brazilian destination discovery and early trip-planning inspiration | Scope is appropriately described as non-booking and non-live-data. |
| Audience/language | People living in Brazil; document language is `pt-BR` | Coherent language/product fit; no alternate-language implementation. |
| Destinations | 18 typed records spanning all five Brazilian regions | Good browse foundation; coverage is selective rather than comprehensive. |
| Experiences | Seven editorial concepts and five categories | Useful discovery taxonomy; some category pages have few/no directly assigned experience records and rely on destinations. |
| Guides | Four short local-data articles | Good initial routes; insufficient depth, source attribution, authorship, and freshness for demonstrated topical authority. |
| Flights | 20 selected airport-code pairs with telephone/WhatsApp enquiry links | Useful only as an enquiry/discovery surface; no live fares, schedules, or availability. |
| Planning | Quiz, budget calculator, itinerary, local saved items | Distinctive product assets; local and illustrative by design, with no account or cross-device state. |
| Contact | Client-side form validation only | Explicitly not a submission channel. |
| Search/SEO | Per-page titles/descriptions, selective canonicals, robots/sitemap functions, limited JSON-LD | A solid beginning, but the configured production output and site-wide canonical/indexability policy are unfinished. |
| Trust | About/FAQ/image credits and disclaimers | Image attribution and service limits are transparent; legal/operator/editorial identity is not established in source. |
| Measurement | No connected measurement properties found | Cannot assess actual search demand, discovery, conversion, or field experience. |

### Existing visitor journey

Homepage search and curated links lead to destination details; category and
experience cards link into related destinations/guides; a planning hub links
to the quiz, itinerary, budget, and saved-items tools. Flight pages offer
click-to-call/WhatsApp actions and clearly disclaim live inventory. This
journey is internally coherent, but pages should explain the next action
precisely and avoid any impression that route pages display available flights.

## 3. Actual architecture and source inventory

- **Framework:** Next.js App Router 16.4.2, React 19.3.0, TypeScript 5,
  Tailwind CSS 4, ESLint 9, npm.
- **Routes:** `src/app`; route data under `src/data`; common helpers under
  `src/lib`; shared layout/UI under `src/components`.
- **Rendering:** server-rendered page structures are the default. Client
  components implement search/filter state, quiz responses, contact-form
  validation, browser storage, and itinerary interactions.
- **Data:** `destinations.ts`, `experiences.ts`, `guides.ts`, and
  `flight-routes.ts` use local typed records. Dynamic route files expose
  `generateStaticParams()` from those records.
- **Images:** 27 local JPG assets under `public/images`, delivered through
  `next/image` by `TravelImage`; `photo-credits.ts` supplies visible
  attribution. `IMAGE-CREDITS.md` records author/source/license information.
- **Config:** `next.config.ts` contains a Turbopack CSS rule, but no custom
  redirects, trailing-slash policy, external image-host list, or explicit
  image format/cache tuning. No external font import is used; CSS uses system
  font stacks.
- **Build note:** the existing status report says a previous production build
  generated 72 routes/pages. This audit did not rerun `npm run build` because
  the local development server was being kept open. Source inventory below
  counts 68 user-facing page URLs, plus `robots.txt`, `sitemap.xml`, and the
  not-found boundary; build counters can include framework-generated entries
  and should not be treated as a count of indexable URLs.

## 4. Complete route and page-by-page SEO audit

### 4.1 Shared template behavior

`src/app/layout.tsx` provides `pt-BR`, a skip link, shared header/footer, and
the metadata title template `%s | Lativera`. `src/lib/metadata.ts` supplies
titles, descriptions, Open Graph title/description, `pt_BR`, site name, and
Twitter-card fields. Canonicals are conditional on
`NEXT_PUBLIC_SITE_URL`; `createPageMetadata()` itself never adds a canonical.

Browser samples showed unique titles/descriptions and one visible H1 on normal
content pages. The homepage's rendered title was `Viaje pelo Brasil com
outros olhos` without the `| Lativera` suffix, while several other sampled
pages did include it. Decide on one title-branding convention and verify it
after deployment. No automated title-length or global duplicate metadata
report was run.

| Route / pattern | Purpose, title/H1 and content | Canonical, indexability and schema | Main links, image and SEO/AEO findings |
|---|---|---|---|
| `/` | Curated discovery homepage. Browser title: “Viaje pelo Brasil com outros olhos”; H1 asks which Brazilian path fits the visitor. Includes destination search, featured places, experience categories, guide cards, planning and service-limit sections. | No canonical was emitted locally; page uses `createPageMetadata()`, not the canonical helper. Indexable by default. Emits `WebSite` JSON-LD with name, description, and language, but no explicit `url`. | Search suggestions link directly to destinations; sections link to destinations, experiences, guides, flights, planning, and contact. Hero image has meaningful alt text and is preloaded. Strong browse entry point; strengthen concise Brazil-discovery proposition and direct, sourced answers. |
| `/destinos` | Destination directory with region/category/query filters, sorting, result count, empty/reset states, hero, and FAQs. Title: “Destinos no Brasil para explorar”; H1: “Descubra os melhores destinos do Brasil”. | Canonical and social image are conditional on the site origin; indexable by default. No JSON-LD. | Cards link to every destination; hero links to destinations and flight help. `DestinationBrowser` filters in the client but receives server-rendered destination records. Search indexability is less concerning than thin destination content. |
| `/destinos/[slug]` | 18 destination details; generated H1 is the destination name. Title is `O que conhecer em {name}`; description uses the record summary plus state/route wording. | Canonical and Open Graph image only when the site origin exists. Emits `TouristDestination` and visible-content `FAQPage`; emits `BreadcrumbList` when a canonical origin is available. | Visible breadcrumbs, image alt/attribution, categories, highlights, ideas, tips, FAQs, related experiences/guides/destinations and any matching flight routes. Strong page network; verify all facts and add sources/updated context before expanding. |
| `/experiencias` | Experience/category listing; title “Experiências de viagem”; H1 “Experiências para levar com você”. Displays category cards and seven experience cards. | Uses `createPageMetadata()`; no canonical even when the domain is configured. No JSON-LD. | Category and experience links; cards connect to their destinations. Some categories explicitly fall back to related destinations where there are no registered experiences; avoid presenting a category archive as a rich activity inventory. |
| `/experiencias/categoria/[slug]` | Five category archives; title/H1 and description are generated from each category record. | `createCanonicalPageMetadata()` adds canonical/OG image only with configured origin. Visible breadcrumb and matching `BreadcrumbList` JSON-LD under the same condition. | Links to category experiences, related destinations, guides, and parent category listing. Useful thematic hubs; strengthen archives with original comparisons and practical details rather than creating more near-identical category URLs. |
| `/experiencias/[slug]` | Seven activity/experience concept pages; title is `{experience} em {destination}`; H1 is the experience title. | Canonical/OG image conditional on origin; visible breadcrumb plus conditional `BreadcrumbList`. Open Graph type is `article`, but no `Article`/`BlogPosting` JSON-LD. | Links to destination, categories, related experiences/guides, save and itinerary tools. Clear no-price/no-availability disclaimer. Copy remains generic and no provider/actual tour is claimed. |
| `/planejar` | Tool hub linking quiz, itinerary, budget and saved items. H1: “Da inspiração ao seu próximo roteiro”. | Canonical helper; no structured data. Included in sitemap. | Links to all four tools; clearly states tools do not confirm bookings/prices. Could be indexed as a useful explainer, but current copy is short. |
| `/planejar/quiz` | Three-step client-side preference quiz; H1: “Qual destino combina com você?”. Results are computed from local editorial tags. | Canonical helper; indexable by default and in sitemap; no schema. Result content depends on interaction and is not a distinct crawlable result URL. | Page links to recommendations after completion. Budget is collected but not used as affordability evidence; duration only participates through the existing weekend tag. Keep expectations explicit and do not target broad “best trip” terms with the tool alone. |
| `/planejar/orcamento` | Visitor-entered BRL budget calculator; H1: “Organize o orçamento da viagem”. All expense fields are optional user-entered estimates. | Canonical helper; indexable by default and in sitemap; no schema. | No external quote/source data is claimed. This is a tool, not verified destination budget advice; provide a clear input-only description in search snippets and decide whether index inclusion is useful. |
| `/roteiro` | Ordered itinerary builder with local storage and `?itens=` share links; H1: “Monte seu roteiro pelo Brasil”. | Canonical helper sets the bare path when configured; no explicit query normalization in the route source. Included in sitemap and indexable by default. No schema. | Links to destinations/experiences; public query contains identifiers only. Add a deliberate canonical/noindex policy for query variants and explain local-vs-shared state. |
| `/salvos` | Browser-local saved destination/experience collection; H1: “Destinos e experiências salvos”. | Canonical helper; included in sitemap and indexable by default. No schema. | User-specific data renders client-side from local storage, so search crawlers generally see the shell rather than an editorial landing page. Strong candidate for `noindex` and sitemap exclusion; verify desired behavior and avoid exposing personal data in URLs. |
| `/guias` | Four-guide directory; H1: “Guias para viajar melhor”. | Uses `createPageMetadata()` without a canonical; no JSON-LD. Included in sitemap. | Links to all guides via cards. Current four-item index is useful but small; add editorial category/author context only when supported by actual content. |
| `/guias/[slug]` | Four article-like guides with data-driven sections, lists, read-time labels, and related destination links. H1 and title derive from guide record. | Uses `createPageMetadata()`; no canonical even with origin configured. Open Graph type `article`, but no OG image, canonical, author/date, or Article/BlogPosting schema. | Each article includes a back link, related destinations, and two other guides. Content is short, broad, uncited, and without writer/reviewer/date; upgrade substance and provenance before expecting editorial authority. |
| `/voos` | Search/filter over 20 selected routes; H1: “Encontre seu próximo voo pelo Brasil.” Metadata describes route discovery and team assistance. | Uses `createPageMetadata()`; no canonical. Included in sitemap. No JSON-LD. | Origin/destination filters and query prefill are client-side; contact links are visible. Copy discloses that prices/availability are confirmed by staff. Hero alt identifies an airliner over Las Vegas, not Brazil; replace or avoid this mismatch after image rights/asset are verified. |
| `/voos/[slug]` | 20 generated route pages; title is `Voos de {origin} para {destination} ({codes})`; H1 is `Voos de {origin} para {destination}`. | Uses `createPageMetadata()` only; no canonical, OG route image, breadcrumb, or schema. Included in sitemap. | Has route-specific WhatsApp message, telephone CTA, contact options, and a non-booking disclaimer. Copy is mostly generated from airport/city fields and generic travel tips. Route truth, code/name accuracy, and contact authorization are unverified. |
| `/sobre` | Brand-purpose story and values; H1: “Toda viagem começa com vontade de descobrir.” | `createPageMetadata()` without canonical; no schema. | Links to destinations. No named operator, editorial team, author, address, business registration, or substantiated expertise is provided. Add only verified identity/experience, not invented credentials. |
| `/contato` | Contact intro and a client-side form. H1: “Entre em contato”. | `createPageMetadata()` without canonical; no schema. | Form validates name/email/subject/message but prevents submit and shows a “not sent” status. Page explicitly says no transmission/storage. Do not describe this as a functioning contact channel; future delivery depends on operator/provider/privacy/spam decisions. |
| `/faq` | Seven visitor/product questions; H1: “Dúvidas, esclarecidas.” Uses native `<details>`/`<summary>`. | `createPageMetadata()` without canonical; no `FAQPage` JSON-LD, which is not a required gap. | Answers clarify platform scope and contact limitation. Improve specificity and link answers to relevant pages; FAQ rich-result markup is not a priority for this travel publisher. |
| `/fontes-e-creditos` | Lists image author, source, and license from 27 local credit records. | `createPageMetadata()` without canonical; no schema. Included in sitemap. | Source/license links open in a new tab; transparent and useful. Confirm that all 27 records match their actual local asset and license obligations before commercial reuse. |
| `not-found.tsx` / unknown slug | Custom 404 explains that the path was not found and links to destinations. | Browser received HTTP 404 for `/destinos/nao-existe`; this is correct. Framework-level noindex behavior was not separately inspected. | Custom H1 and recovery link were present in the browser accessibility snapshot. |
| `/robots.txt` | Metadata route permits all user agents with `Allow: /`. | Local output was HTTP 200 but contained no `Sitemap:` line because site origin is unset. | Production check must confirm deployed sitemap directive and crawl policy. |
| `/sitemap.xml` | Metadata route builds URLs from static routes and current typed records. | Local output was HTTP 200 with an empty `<urlset>` because `NEXT_PUBLIC_SITE_URL` is unset. When set, all route paths are included, including saved items/contact/tool routes. | Sitemap inclusion should reflect canonical, indexable URLs only; deploy and inspect the generated sitemap before submitting it. |

### 4.2 Dynamic route instances generated from current data

The patterns above share one page template per route family; the following
instances are present in the current source data. Per-record page metadata
uses the formulas and record fields documented in section 4.1.

**Destinations — 18** (route pattern `/destinos/{slug}`):

| Slug | Destination | Region |
|---|---|---|
| `rio-de-janeiro` | Rio de Janeiro | Sudeste |
| `foz-do-iguacu` | Foz do Iguaçu | Sul |
| `lencois-maranhenses` | Lençóis Maranhenses | Nordeste |
| `salvador` | Salvador | Nordeste |
| `bonito` | Bonito | Centro-Oeste |
| `chapada-diamantina` | Chapada Diamantina | Nordeste |
| `sao-paulo` | São Paulo | Sudeste |
| `brasilia` | Brasília | Centro-Oeste |
| `belo-horizonte` | Belo Horizonte | Sudeste |
| `porto-alegre` | Porto Alegre | Sul |
| `curitiba` | Curitiba | Sul |
| `recife` | Recife | Nordeste |
| `florianopolis` | Florianópolis | Sul |
| `goiania` | Goiânia | Centro-Oeste |
| `fortaleza` | Fortaleza | Nordeste |
| `manaus` | Manaus | Norte |
| `belem` | Belém | Norte |
| `alter-do-chao` | Alter do Chão | Norte |

**Experience categories — 5** (`/experiencias/categoria/{slug}`):
`praias-e-ilhas`, `natureza-e-ecoturismo`, `cultura-e-historia`,
`aventura-ao-ar-livre`, `gastronomia-e-experiencias-locais`.

**Experiences — 7** (`/experiencias/{slug}`):
`trilhas-e-mirantes`, `cataratas-e-floresta`, `cultura-baiana`,
`arquitetura-do-pelourinho`, `dunas-e-lagoas`, `rios-de-bonito`,
`caminhos-da-chapada`.

**Guides — 4** (`/guias/{slug}`):
`como-planejar-viagem-pelo-brasil`,
`primeira-visita-aos-lencois-maranhenses`,
`roteiro-cultural-em-salvador`, `trilhas-com-planejamento`.

**Flight-route details — 20** (`/voos/{slug}`):
`cgh-sdu`, `cgh-bsb`, `cgh-cnf`, `cgh-poa`, `cgh-cwb`, `gru-poa`,
`gru-rec`, `gru-cnf`, `gru-gig`, `cgh-ssa`, `gru-bsb`, `cgh-fln`,
`gru-cwb`, `sdu-bsb`, `gru-ssa`, `bsb-rec`, `bsb-cnf`, `bsb-gig`,
`cgh-gyn`, `gru-for`.

All dynamic families use `generateStaticParams()` and call `notFound()` when
the requested slug does not exist. The current route data is local and
statically typed; none of these routes proves a live service, currently
available tour, operating flight, or current airport/attraction status.

### 4.3 Main page-specific opportunities

| Page group | Main gap | Priority | First useful change |
|---|---|---:|---|
| Homepage | Brand suffix inconsistency; no social image; broad promise rather than a sharp differentiator | P2 | Set a title convention, add a verified social image, and state the local-first Brazil discovery value plainly. |
| Destination directory/details | No visible source/review dates; page facts and details need stronger evidence; only 18 destinations | P1 | Add verified reference links and a maintained “last checked” process before expanding coverage. |
| Experiences/category pages | Concepts are not verified bookable activities; thin category archives possible | P2 | Distinguish inspiration from service offers, enrich category comparison, and avoid adding empty categories. |
| Guides | Four short, uncited, unattributed pieces; no canonical | P1 | Upgrade a small number of guides with direct practical value, named reviewer/author when true, links to official sources, date policy, and canonical. |
| Flight listing/details | Generic generated copy, unverified route/airport/contact data, no canonical, unrelated hero photo | P1 | Verify each displayed pair and phone channel; improve route-specific utility and canonical/indexability rules. |
| Planning tools | Included in sitemap despite functional/personal nature; noindex policy absent | P1 | Decide indexability individually, canonicalize shared query state, exclude non-landing pages from sitemap. |
| About/contact/FAQ | No operator identity, legal/privacy page, or real contact transport | P1 | Publish only verified operator/service identity; do not claim delivery until provider, retention, and abuse protection are ready. |

## 5. Technical SEO audit

### 5.1 Crawlability, indexing, and URLs

- **Robots:** `src/app/robots.ts` allows all crawlers. With a configured site
  origin, it publishes the sitemap URL; without one, it does not. Local
  browser result on 19 October: `User-Agent: *`, `Allow: /`, no sitemap line.
- **Sitemap:** `src/app/sitemap.ts` constructs the listed paths from the data
  arrays and returns no entries without `NEXT_PUBLIC_SITE_URL`. Local XML
  contained an empty `<urlset>`. The configured sitemap currently includes all
  68 content/tool URLs indiscriminately.
- **Production origin:** `.env.example` has an empty
  `NEXT_PUBLIC_SITE_URL`; no production origin was set in the running local
  application. Do not infer a canonical domain from the repository or example
  value.
- **Canonicals:** helper support is partial, not site-wide. With origin set,
  canonicals are built for planning pages, destination details/listing,
  experience detail/category pages. Home, experience listing, guide listing
  and details, flight listing/details, About, Contact, FAQ, and credits use
  metadata paths without canonical output. Local runtime emitted none on the
  sampled routes because the origin is unset.
- **Index/noindex:** no explicit `robots` metadata was found on content pages.
  All are indexable by default. Saved-items, itinerary, quiz, and budget routes
  are in the sitemap. A small page-level indexability policy is needed; do
  not disallow URLs in `robots.txt` as a substitute for `noindex`.
- **Query URLs:** `/roteiro?itens=...` encodes allowlisted item IDs, not visitor
  names/private details. The itinerary page's canonical helper targets the
  base path once configured; query-variant behavior should still be checked
  in production HTML and the chosen policy documented.
- **URL consistency:** paths and internal links use lowercase slugs and no
  trailing-slash customization is configured. No redirect/canonical
  normalization test was run for alternate slash/host variants.
- **Dynamic paths:** all route families derive allowed slugs from typed data
  and implement a not-found branch. Unknown destination sample returned 404.
- **Internal discovery:** destination, experience, guide, and tool links are
  server-rendered through `next/link`; filters change visible results without
  generating a parameterized URL for each filter combination. This avoids a
  crawlable filter-URL explosion.
- **Orphan risks:** all current records are reachable from listing pages and
  related-content links in source. No automated graph/orphan crawl was run;
  verify every generated slug appears in a crawl of the production sitemap.

### 5.2 Titles, descriptions, headings, social metadata

- Pages have Brazilian Portuguese metadata; dynamic descriptions include
  record-specific names and summaries. Template output sampled across all
  primary page types showed populated titles and descriptions.
- Home title branding differed from several other sample routes. Establish a
  consistent title suffix rule; length limits are diagnostics, not a ranking
  formula.
- Most pages have Open Graph title/description and Twitter card title/
  description through the shared helper. Image-bearing OG metadata is only
  wired on selected destination/category/experience pages. Many static pages
  and all flight/guide routes lack a share image or absolute canonical URL.
- A visible single H1 was confirmed for normal sample pages. Dynamic
  destination, experience, category, guide, and flight templates each render
  their own record title as the H1. A full 68-URL duplicate-heading crawl was
  not run.
- Heading hierarchy is generally semantic: `<main>`, section headings,
  labels, lists, articles, and page-intro headings. Verify all page exceptions
  with accessibility and HTML checks before production.
- The visual and semantic content both exist in server-rendered page
  components; interactive filters/quiz do not replace the core listing
  content.

### 5.3 Images, rendering, and performance

- `TravelImage` uses `next/image` with local static paths, alt text, `fill`,
  size hints, optional preload, and visible credit overlays. This is a sound
  baseline; confirm each asset's dimensions/crop and visible credit on
  real mobile/desktop viewports.
- No custom external image host or remote image fetch was found. No custom
  `formats`, cache, or responsive image policy is set in `next.config.ts`;
  framework defaults apply.
- Images are local JPGs. The flight landing hero is explicitly a Las Vegas
  airplane photo, a geographic mismatch for a Brazil destination product.
- No remote font request is configured; system font fallbacks avoid an
  additional third-party font dependency.
- **No Lighthouse, PageSpeed Insights run, RUM, server timing, or Core Web
  Vitals field report was available.** Do not claim performance scores or
  Core Web Vitals status.
- The earlier project status records a development image LCP warning that
  was addressed by eager-loading the first relevant image. That is historical
  documentation, not a measured current production result.
- Browser checks in the prior status report found no horizontal overflow for
  planning screens at 375/768/1280 CSS px. Full visual, cross-browser,
  slow-network, image-shift, and mobile-device assessment remain outstanding.

### 5.4 Accessibility and error handling

- Positives in source: `lang="pt-BR"`, skip link, semantic landmarks, visible
  focus rules, reduced-motion CSS, labeled inputs, accessible result/status
  text, keyboard controls for homepage destination suggestions, and a
  mobile-menu button with `aria-expanded`, `aria-controls`, Escape handling,
  and focus return.
- Quiz step/result focus management and itinerary/storage messages are
  implemented. Existing project status says keyboard/assistive-technology,
  denied-storage, clipboard, and cross-browser cases have not been fully
  tested.
- Contact validation uses native constraints and a live status; successful
  validation explicitly says the message was **not** sent.
- Unknown destination paths render the custom 404 and a destination recovery
  link. Do not treat a rendered 404 page as proof of complete redirect/status
  behavior on the production CDN.

## 6. Structured data and indexing audit

| Type | Current usage | Assessment / action |
|---|---|---|
| `WebSite` | Homepage JSON-LD: name, description, `inLanguage` | Relevant site-level description. The object currently has no explicit `url`; validate current Google guidance and add the real canonical URL only after domain confirmation. |
| `TouristDestination` | Destination details, record-derived name/intro/image and nested administrative location | Semantically relevant if facts are verified. It is not a promise of a special Google travel rich result. Verify place/state facts and test the deployed markup. |
| `BreadcrumbList` | Destination, experience, and category detail templates, conditional on site origin | Appropriate where visible breadcrumb navigation exists. It is absent from guide and flight detail templates, which have only a back link. Add visible breadcrumbs/schema only if helpful to user navigation. |
| `FAQPage` | Destination detail graph; answers map to on-page FAQs | Content matches visible page data. Google announced FAQ rich results are generally limited to authoritative government/health sites; Lativera should not expect FAQ snippets. Keep schema only if it is accurate and low-maintenance; FAQ content itself can still answer users. |
| `Article` / `BlogPosting` | Not found on guides or experience pages | Optional after the site has real authorship, publication/update dates, article identity, and source discipline. Do not add empty or invented author/date fields. |
| `Organization` / `TravelAgency` | Not found | Correct not to assert business/legal/operator facts that are not verified. Add only after identity, contact, and service details are confirmed. |
| `Product`, `Offer`, reviews, ratings | Not found | Correctly absent: there are no confirmed bookable products, offers, prices, reviews, or ratings. Do not introduce these without visible, substantiated evidence. |

Source inspection and the local `/destinos/manaus` response confirmed valid
JSON-LD JSON syntax for the emitted `TouristDestination` and `FAQPage` graph.
No Rich Results Test, Search Console enhancement report, or production URL
Inspection was run. Google states that structured data can help systems
understand visible content and may enable eligible rich results, but it does
not guarantee display or rankings.

## 7. Content quality and topical authority

### Current strengths

- Content is coherent with the Brazilian destination-discovery product and is
  written in Portuguese.
- Destination pages provide an introduction, highlights, experiences, tips,
  category tags, and FAQs; related destinations/guides/experiences are linked.
- Many changing facts are explicitly caveated and visitors are directed to
  official/local providers.
- Image attribution is visible on image components and a consolidated
  credit page is linked in the footer.
- The content uses original local page composition and typed data rather than
  pulling unverified third-party snippets.

### Gaps to close before claiming authority

- Destination/experience/guide data has no editor/source/date fields; the
  site cannot show when changing facts were checked.
- Four guides are short introductory advice, with no citations, author
  profile, reviewer, or substantive proof of first-hand expertise.
- Most destination advice is broad. Useful next-level facts—access,
  accessibility, seasonal constraints, required planning, local transport,
  official park/museum links, and known limitations—must be sourced and
  maintained, not guessed.
- Page templates are consistent, but generic content repeated across records
  (especially flight route introductions and experience disclaimers) can
  make individual pages offer little distinct value.
- The About page describes purpose and values but supplies no verifiable
  operator/editorial identity. Do not invent a company history, author
  credentials, lived experience, or expert review.
- The 18 destinations cover five regions, including three Norte entries, but
  are a curated subset, not an exhaustive directory. Explain selection
  criteria instead of implying complete national coverage.
- Geographic accuracy, airport naming, route availability, image license
  compliance, and destination-specific claims remain subject to independent
  review as recorded in the project status report.

**Recommended editorial standard:** publish fewer, more useful pieces. For
each factual travel page, record the responsible editor, source URLs, date
checked, facts that change, next review date, image attribution, and the
page's intended user question. Link directly to official parks, museums,
transport/airport operators, and public bodies where the information is
change-sensitive. Avoid mass-generated near-duplicate city pages.

## 8. Search intent and keyword strategy

No keyword-volume/difficulty tool, Search Console query data, or competitor
ranking report was available. The following are **qualitative Portuguese
search-intent hypotheses**, not verified query volumes or rankings. Validate
with Search Console after launch and a keyword platform before committing to
large content production.

| Cluster / sample topic (pt-BR) | Intent | Best current target / title direction | Supporting content and internal links | Priority / validation |
|---|---|---|---|---|
| Destination discovery: `destinos para conhecer no Brasil`, `lugares para viajar no Brasil` | Explore/compare | Improve `/destinos`; title/H1 should describe destinations and selection scope | Link all destination details, regions and useful comparisons; clarify this is curated coverage | P2; validate impressions and which destinations attract demand |
| Named destination planning: `o que fazer em Manaus`, `o que conhecer em Salvador`, and equivalent specific city questions | Informational | `/destinos/{slug}` with destination-specific, sourced title/H1 | Add verified practical guidance, linked official resources, related experiences/guides | P1; prioritize pages with GSC impressions and editorial evidence |
| Destination timing/practicality: `quando visitar Lençóis Maranhenses`, access/season questions | Informational, time-sensitive | Improve the corresponding destination guide/detail, not multiple near-identical pages | Seasonal conditions, sources, “checked on” date, official links; link relevant destination and experience | P1; facts must be verified with authoritative/local sources |
| Brazilian nature/ecotourism: `trilhas na Chapada Diamantina`, `o que saber antes de visitar Bonito` | Informational/planning | Destination and experience pages; strengthen relevant guide | Safety/access rules, visitor constraints, protected-area links; link related destinations | P1/P2; avoid generic adventure copy |
| Practical trip planning: `como planejar viagem pelo Brasil`, domestic transport / regional route planning | Informational | Upgrade `/guias/como-planejar-viagem-pelo-brasil` | Region-aware itinerary constraints, verified official sources, internal regional collections | P1; current guide is a short starting point |
| Itinerary/route comparison: `roteiro de 7 dias no Brasil` (only if a real, evidence-backed plan is authored) | Informational/compare | New itinerary guide only after practical route research; otherwise don't target | Distances, transport assumptions, realistic base choices, related destination pages | P2; requires sourced travel-time/distance research; don't imply visitor data |
| Experience themes: Brazilian beaches, culture, gastronomy, ecotourism | Browse/inspiration | Existing experience category archives | Add distinct destinations and useful selection context; link related guides | P2; consolidate/strengthen archives before creating more taxonomy |
| Domestic flight route assistance: `voos [city] para [city]` | Transactional/compare | `/voos/{slug}` only where the route/contact information is verified and page has unique utility | Link to both destination pages; accurately label enquiry vs live search; direct route CTA | P1; route intent has high trust/commercial risk; validate route data and contacts first |
| Budget: `quanto custa viajar para [destination]` | Informational/commercial research | Do not claim cost pages from current user-input calculator. Add researched cost guidance only with dated source/methodology | Clearly separate visitor-entered estimates from observed prices; link to verified transport/accommodation resources | P3 until real data sourcing/governance exists |
| Quiz/personalization: `qual destino combina comigo` | Discovery | `/planejar/quiz` is a supporting tool, not a standalone result corpus | Link results to meaningful destination pages; state tag-based limitations | P2; measure tool starts/completions rather than claiming keyword competitiveness |

**Cannibalization guardrail:** do not create separate pages for every phrasing
of “best places,” destination aliases, or city+activity combinations when the
current destination page can answer them well. Use Search Console page/query
data to identify real mismatches before splitting or consolidating content.

## 9. AEO/GEO audit

Google's current Search Central guidance for AI features points back to
foundational SEO, crawlability, eligible indexed pages, helpful content, and
clear links; it does not document a special markup or phrasing trick that
guarantees inclusion in AI Overviews/Mode. Any “GEO” tactic beyond those
fundamentals remains an uncertain discovery hypothesis.

| Page type | Questions the page should answer | Existing answer strengths | Missing evidence/structure |
|---|---|---|---|
| Homepage | What is Lativera? Is it discovery, booking, or live flights? Where should I start? | Clear destination search and a section explaining that information is a starting point | Put a concise, unambiguous “what we do / don't do” summary high on the page; link to tools and service FAQ. |
| Destination details | What is distinctive here? What can I explore? What should I check before travel? | H1, introduction, highlights, tips, FAQs, related links, disclaimer | Add cited, date-checked practical answers; separate stable context from changeable access/season rules; identify author/reviewer truthfully. |
| Experience/category | What does this idea mean? Where is it relevant? Is it a bookable activity? | Category descriptions, linked destinations, experience tips, explicit no-price/no-availability statements on details | Add a clear “inspiration, not an offer” label and source-backed comparisons; do not create false FAQs about specific operators. |
| Guides | What steps should I take? What sources govern changing facts? | Descriptive headings, concise lists, linked destinations | Add more step-by-step detail, date/source references, author/reviewer identity when true, and an update policy. |
| Flight listing/detail | Are these live flights? Which airport/city pair? How do I ask a question? | Route codes, enquiry CTAs, clear no-live-inventory disclaimer | Surface “enquiry only” before the route list; verify airports/routes/contact; add route-specific useful information and linked destination context. |
| Quiz/budget/itinerary | How is the recommendation/calculation made? Is it a quote or confirmed plan? | Method caveats and local-first state are explained in current UI | Keep the method and limitations crawlable in initial page content; avoid exposing or indexing personalized query state as duplicate landing pages. |
| FAQ/contact/about | What services exist? Is my message delivered? Who operates this site? | Existing FAQ/contact copy clearly discloses the current non-delivery state | Resolve true operator/contact/legal facts before adding a business identity. Link policy pages only once they describe actual practices. |

Use direct answers near the relevant heading, meaningful tables when users
need comparisons, named reliable sources and dates for change-sensitive
claims, and accessible HTML. These improve human usefulness and clarity; they
do not guarantee an AI answer citation.

## 10. Flight-route page audit

### Confirmed implementation

- Twenty directional airport-code pairs are created from 13 airport records
  in `src/data/flight-routes.ts`.
- Airport/city/code names, airport images, travel ideas, and a generated
  introduction are stored locally.
- Listing search matches city, airport name, and IATA code; origin/destination
  filters and reset states are present.
- Route details offer route-prefilled WhatsApp/telephone actions and clearly
  state that they are not a confirmed offer or booking. The message uses
  `wa.me` with URL-encoded route details.
- No schedule, fare, flight time, airline, availability, cancellation, or
  refund claim is supplied as a live fact.

### Risks and recommendations

1. Verify every city/airport name and IATA code against current authoritative
   airport/airline sources; code presence in a typed file is not verification.
2. Verify each city pair is a meaningful route to display and whether the
   route is directional or should include the reverse journey. Do not imply
   that a selected pair is currently operated.
3. Independently confirm that all three phone/WhatsApp numbers are owned,
   staffed, current, and authorized for publication. The README and project
   status both flag this as outstanding.
4. Add a visible route-specific source/check date if the page provides
   factual airport/route details; otherwise label entries as enquiry topics,
   not a flight catalogue.
5. Current route pages share generated prose using the same airport “travel
   idea” strings. Add useful, genuinely route-specific context only when
   sourced; otherwise consolidate thin route pages or keep only verified
   routes indexable.
6. Route detail pages have no canonical, breadcrumb, OG image, or internal
   links to the matching destination detail pages. Add canonical coverage and
   destination links after route facts are validated.
7. Replace the Las Vegas airplane hero on `/voos` with a relevant, licensed
   Brazil/neutral asset, or use a non-geographic visual. Current visible alt
   text truthfully identifies Las Vegas, but the imagery does not support the
   Brazil-focused page.
8. Do not add flight-duration, price, airline, schedule, or “best fare”
   markup until a real data source, freshness policy, and display semantics
   exist.

**Indexing decision:** do not index an unverified/generic route page solely
because its URL is in the route array. Keep a route page indexable only when
it has a verified route premise, unique useful text, working authorized
contact options, canonical metadata, and clear enquiry-only wording.

## 11. UX, accessibility, conversion, and trust

### Positive observations

- Main navigation exposes destinations, experiences, guides, planning, and
  flight/contact surfaces; footer repeats core navigation and image credits.
- Homepage destination search supports normalized accented text, keyboard
  arrows/Enter/Escape, a polite result message, and direct links.
- Destination and flight filters have labels, result counts, reset controls,
  and explicit empty states.
- Quiz validation, back/restart, focus movement, and recommendation caveats
  are implemented. The recommendation system uses editorial tags, not budget
  predictions.
- Budget summaries calculate only visitor-entered figures and explain the
  limits. Itinerary sharing only transmits slugs/kinds and filters malformed
  or unknown entries. Saved data is local browser state.
- Contact and flight pages disclose that the contact form is not delivered
  and that flights are not live search/booking.
- Image credits are linked both inline and in a dedicated page.

### Gaps / UX risks

- No manual full keyboard, screen-reader, visual cross-browser, storage-denial,
  clipboard-denial, quota failure, or production error-path audit was
  completed in this audit. The prior status report lists those as pending.
- A visitor may expect the `/voos` filter to show purchasable flights. Keep
  the “request assistance; no live availability” explanation prominent
  before and beside the route cards.
- The form currently validates successfully but cannot send; its button says
  “Validar formulário”, which is more truthful than “Enviar”, but prominent
  contact page metadata says “Envie uma mensagem”. Keep all snippets and CTAs
  consistent with non-delivery.
- About page currently provides only a mission/values narrative. Do not add
  fake social proof, business address, legal name, team, or credentials.
- No privacy/terms/legal pages exist. Decide operator identity and actual
  data practices before implementing analytics, email delivery, accounts, or
  partnerships. A browser-only, non-transmitting form is not a substitute
  for a future data-handling disclosure.
- Saved items and itinerary are device/browser-specific; continue stating
  this before users rely on synchronization.

## 12. Global competitor and reference benchmark

**Research accessed:** 19 October 2026. This is a public-page content
inspection, not a full interactive/mobile/technical crawl. Several large
competitor pages blocked or redirected the fetch tool; their private traffic,
ranking, conversion, backlink, and analytics data were not accessed.

| Competitor/reference | Public evidence available | Relevant strength/pattern | What is not suitable to copy / Lativera state | Recommended action / priority |
|---|---|---|---|---|
| Booking.com | The public Brazil-country URL returned a Brazil accommodation listing snippet. Other destination URL attempt returned 404. [Brazil listing](https://www.booking.com/country/br.html) | A transactional listing makes the offer/inventory context the core task; useful lesson is to make the next action unambiguous. | Lativera has no inventory, verified rates, booking service, policy, or lodging partnerships. Do not mimic availability or review UI. | Keep enquiry and editorial journeys distinct. If a future partner offer is approved, show whose inventory, dates, price, and terms it is. P1 integrity. |
| Tripadvisor | Brazil destination URL returned 403; page interaction/content could not be verified. [Attempted official destination page](https://www.tripadvisor.com/Tourism-g294280-Brazil-Vacations.html) | No feature-level comparison is claimed from this blocked fetch. | Do not infer its review volume, rankings, or interface behavior from inaccessible content. Lativera has no user reviews/ratings. | Benchmark only against accessible public evidence in a later browser review; do not invent review features. P3. |
| Expedia | Destination URL returned 403; page interaction/content could not be verified. [Attempted official Brazil guide URL](https://www.expedia.com/Brazil.dx26) | No feature-level comparison is claimed. | Lativera is not a booking marketplace and has no packaged inventory. | Revisit only if product decisions move toward a verified booking/affiliate model. P3. |
| Airbnb | Brazil-stays request redirected to Airbnb India in this environment; localized page content could not be assessed. [Brazil stays URL](https://www.airbnb.com/brazil/stays) | The redirect itself indicates market localization can affect which public page is observed; no product claims are made from it. | Lativera does not list hosts/accommodations, collect payments, or manage stays. | Keep the editorial discovery experience distinct from accommodation marketplace functionality. P3. |
| Skyscanner | A route URL redirected to a regional domain; extracted text exposed climate/seasonal guidance, but not a full interactive route/price result. [São Paulo–Rio route URL](https://www.skyscanner.com/routes/saoa/rioa/sao-paulo-to-rio-de-janeiro.html) | A route query can be complemented by destination context, but the available extraction is too limited to evaluate fares or UI. | Lativera has no live price comparison or airline feed. Do not imply this is currently comparable. | Add route-to-destination links and factual context only from verified sources; keep “not live search” explicit. P1. |
| Lonely Planet | Article “10 of the best places to visit in Brazil” loaded publicly. [Article](https://www.lonelyplanet.com/articles/best-places-to-visit-in-brazil) | It structures destination ideas with “best for” framing, linked place/guide references, practical planning tips, and substantive historical/cultural context. Useful model for comparison dimensions and connected editorial coverage. | Lativera should not copy its prose, list, imagery, brand, or claim equivalent editorial expertise without demonstrating it. | Add real, source-backed “best for”/comparison guidance and stronger links only where Lativera can provide original value. P1/P2. |
| National Geographic Travel | Brazil destination URL returned only a copyright/footer stub in this retrieval. [Attempted destination URL](https://www.nationalgeographic.com/travel/destination/brazil/) | No detailed product/content claim is made from the unavailable page. | No claim about its page structure, performance, or data. | Use a human browser review only if needed; keep this as an uncompleted benchmark. P3. |
| Visit Brasil (official tourism reference) | Public English homepage loaded with cultural/event-oriented editorial text. [Visit Brasil](https://visitbrasil.com/en/) | Useful potential source/discovery reference for national tourism framing; it is an official destination-promotion source, not a direct commercial competitor. | It does not verify each Lativera fact or route; do not copy promotional claims without citations. | Use appropriate official sources for fact-checking and link out where relevant. P1 verification. |

### Benchmark conclusion

The clearest transferable lesson from accessible sources is not “add more
features”: distinguish the user's task, connect related destination content,
make trip guidance concrete, and cite facts. Lativera's differentiation can be
the combination of Brazil-specific editorial discovery with honest
tag-based planning and device-local tools—not a smaller clone of a reviews or
booking marketplace.

## 13. Differentiation opportunities

| Opportunity | User problem / audience | Required work and dependencies | SEO/AEO potential (not guaranteed) | Effort / risk / success signal |
|---|---|---|---|---|
| Curated Brazil regional collections | Helps travelers compare a manageable shortlist across regions | A few editorial collections built from verified destination records; define inclusion criteria | Builds useful internal link paths and answers comparison questions | Medium; avoid pretending to cover every state. Measure clicks from collection to detail pages and engaged visits. |
| Better destination comparison | Travelers need to pick among similar place types | Source-backed criteria such as landscape, access constraints, traveler fit, and relevant seasons; editor review | Could earn long-tail comparison intent and improve answer completeness | Medium; higher factual maintenance burden. Measure organic impressions/clicks and outbound official-source clicks. |
| Strong, maintained practical guides | Solves high-intent “what to know before going” needs | Author/editor workflow, source links, review date, update cadence | Improves topical completeness and answer quality | Medium/high; never invent first-hand reporting. Measure GSC page queries and return visits. |
| Transparent recommendation quiz | Helps uncertain travelers choose where to start | Existing tool plus clear matching explanation and improved editorial tags | Useful interaction and internal discovery; search value uncertain | Low/medium; risk of overclaiming personalization. Measure quiz starts/completions and recommendation click-through. |
| Shareable local itinerary | Helps visitors collect and send trip ideas | Existing local storage and slug-only URL; test clipboard, long/invalid URLs, accessibility | More engagement and referrals possible; no promise of rankings | Low/medium; privacy/device expectations. Measure share link generation/copy success and destination visits. |
| Illustrative budget worksheet | Helps users organize their own researched estimates | Existing user-input tool; no price feed required | Useful utility, but should not target price terms without sourced data | Low; risk of being mistaken for quote. Measure completion and use of expense fields, not revenue or booking conversion. |
| Flight enquiry discovery | Helps users ask about selected Brazil routes | Verify airport pairs, telephone numbers, operator identity, response process, and disclaimers | Route-specific intent only if unique page content is trustworthy | Medium; business-integrity risk. Measure valid call/WhatsApp clicks only after verified service is operational. |
| Licensed, attributed visual storytelling | Helps make destinations easier to compare and imagine | Recheck current asset license/attribution and meaningful alt/crop | Supports usability and image understanding; does not replace text | Low/medium; licensing risk. Measure image payload/layout stability and interactions. |

## 14. Prioritized findings

Priority definitions: **P0** critical crawl/security/business-integrity blocker;
**P1** resolve early / before relevant public claims; **P2** valuable next
improvement; **P3** optional longer-term.

| ID | Finding and evidence | Why it matters | Recommended fix | Priority | Effort | Dependencies | Verification |
|---|---|---|---|---:|---|---|---|
| F-01 | `NEXT_PUBLIC_SITE_URL` is blank in `.env.example`; local robots has no sitemap directive and local sitemap is an empty XML urlset. | Search engines cannot receive the intended absolute sitemap/canonical output for the current workspace; deployment origin is unknown. | Confirm the real production origin, set it in deployment, and inspect metadata, robots, and sitemap on the deployed domain. | P1 | Low | Owner confirms domain/host | Production GETs return expected host-only canonicals and every eligible URL once in sitemap. |
| F-02 | Canonical helper is used on only selected templates. Guide, flight, home, experience index, and informational routes omit canonical generation. | Alternate host/slash/query URLs may not consolidate consistently; sitemap can list pages without matching declared canonicals. | Adopt one canonical policy for all indexable routes; add canonical to each eligible template and handle itinerary query URLs intentionally. | P1 | Medium | F-01; route-index policy | Automated deployed HTML crawl compares canonical to sitemap path; test host/slash/query variants. |
| F-03 | Sitemap includes `/salvos`, `/roteiro`, quiz/budget, and `/contato`; no per-page indexability policy is coded. | Some pages are primarily browser-local tools rather than unique editorial search landings; sitemap sends mixed intent. | Decide page-by-page: retain indexable tools only if useful as standalone landings; otherwise set `noindex` and remove from sitemap (not robots-disallow). | P1 | Low | Product/search intent decision | Inspect robots meta and sitemap inclusion after deployment; confirm desired crawl behavior. |
| F-04 | 18 destination, seven experience, four guide, and 20 route records have no source/review-date/author fields; status report says geographic/image verification is pending. | Factual errors, stale travel details, or unsupported claims undermine trust and answer quality. | Set up source/fact-check fields and an editorial update cadence; verify every route, airport/contact, image license, and changing practical claim. | P1 | Medium | Editor/owner and authoritative sources | Review checklist signed for all published records; page shows only supportable facts and relevant source links. |
| F-05 | Guides are four short generic articles with no author, review date, citations, or Article metadata; dynamic guide pages also lack canonical/OG image. | Thinness and absent provenance limit differentiation and trust in a competitive travel topic. | Improve a small set of high-value guides with original practical details and reliable sources; add truthful author/date and canonical/OG metadata when available. | P1 | Medium | Editorial owner/source process; F-02 | Human quality review, source audit, deployed metadata and search query/engagement tracking. |
| F-06 | Contact form is client-side only and always discloses that submission is not sent; no operator/legal/privacy details are confirmed. | Visitors may still interpret a “contact” page as an operational channel; future data collection requires explicit responsibilities. | Keep current disclosure until approved provider, server validation, spam control, retention/privacy policy, verified operator identity, and support process exist. | P1 | High | Owner/provider/privacy/spam decisions | Test delivery end-to-end only after approval; verify clear success/failure and matching disclosures. |
| F-07 | Flight route pages derive boilerplate descriptions from local airport/city records; numbers are hard-coded and documented as unverified. | Users may act on incorrect airport/contact or assume a listed route is operating. | Validate all airport/city pairs and phone/WhatsApp authorization; label each page enquiry-only and remove unsupported entries. | P1 | Medium | Verified data and business owner confirmation | Route-by-route source checklist; test every tel/WhatsApp URL and route prefill with authorized test contacts. |
| F-08 | No Search Console, analytics, keyword, backlink, or performance account/data was available. | Prioritization and SEO impact cannot be based on observed query/page behavior. | Configure site measurement after privacy/consent decisions; verify ownership, sitemap, and analytics events with minimal data collection. | P1 | Medium | Production domain; privacy decision | Search Console sitemap/indexing reports populate; event QA and documented consent/retention as applicable. |
| F-09 | `/voos` hero depicts an aircraft over Las Vegas; page is Brazil-focused. | Visual/context mismatch weakens trust and page relevance. | Replace with an approved Brazil-relevant or neutral local asset and accurate alt text; verify license. | P2 | Low | Approved credited image | Visual check at mobile/desktop and image-credit audit. |
| F-10 | Flight detail pages lack canonical, OG image, breadcrumb, and links to destination detail pages; content is largely templated. | Duplicate/thin route pages may not answer route intent well and are harder to share/understand. | After verification, add route-to-destination links and metadata; index only pages with unique useful content. | P2 | Medium | F-02 and F-07 | Crawl links/canonicals/schema, review route-page uniqueness, assess GSC data. |
| F-11 | FAQ JSON-LD exists on destination pages; Google reduced FAQ rich results to authoritative government/health sites. | Time spent optimizing for FAQ snippets is unlikely to return a visible result for this publisher. | Keep FAQs for visitors; do not expand FAQ schema as a rich-result tactic. Ensure markup mirrors visible answers if retained. | P2 | Low | None | Rich Results Test and a policy check; success is content clarity, not snippet appearance. |
| F-12 | No full-site manual accessibility, visual, second-browser, clipboard/storage-failure or performance review was performed. | Source-level good practices and overflow checks do not establish all visitors can use the site reliably. | Complete focused manual QA and a lab performance baseline before launch. | P2 | Medium | Representative devices/browser | Keyboard/screen-reader checklist, failure simulations, Lighthouse/PSI lab run, and field metrics after traffic exists. |
| F-13 | About page contains values but no verifiable editor/operator identity; no privacy/terms routes exist. | Visitors cannot assess who publishes/operates the site or what future submissions mean. | Publish only accurate operator/editorial/service facts and policies before real data collection or commercial claims. | P1 before data collection / P2 now | Medium | Owner's verified details and decisions | Fact-check against registered/operational information and actual data flows. |
| F-14 | Sample homepage title lacks the brand suffix shown on other pages; most static pages lack canonical and social image metadata. | Search/share appearance is inconsistent, and URL normalization is not complete. | Define title rules and complete canonical/OG image coverage for intended landing pages. | P2 | Low/medium | F-01 | Crawl all rendered routes and compare title, description, canonical, OG URL/image. |
| F-15 | Local smoke showed route/status behavior, but no automated tests exist. `runTests` found no test files; `npm run lint` and `npm run typecheck` passed. | Regressions in metadata/data links and interactive UX are not automatically caught. | Add focused tests when development is approved: route/data coverage, metadata, filters, validation, state/link parsing, and contact non-delivery. | P2 | Medium | Test-scope decision | Targeted tests plus lint/typecheck/build in CI. |

## 15. Practical improvement roadmap

Effort means relative work: **Low** (hours), **Medium** (several sessions),
**High** (provider/editorial/integration work). Effort does not promise a
ranking or traffic outcome.

### Stage A — Critical technical fixes

| Task | Scope / files | Priority / effort | Dependencies | Outcome and measurement | Timing |
|---|---|---|---|---|---|
| A1 — Confirm production origin | `.env.example`, deployment configuration, metadata/sitemap output | P1 / Low | Owner provides exact canonical host | Absolute canonicals, populated sitemap, robots sitemap reference; verify with deployed GET/crawl | Requires input; then immediate |
| A2 — Complete canonical rules | `src/lib/metadata.ts`, all route metadata | P1 / Medium | A1 and approved indexability choices | One canonical per indexable page; compare sitemap against canonical URLs | Immediate after A1 |
| A3 — Set sitemap/indexability policy | `src/app/sitemap.ts`, route metadata | P1 / Low | Decide about tools, saved, contact, and query pages | Sitemap lists eligible canonical URLs only; noindex pages omitted | Requires product/search choice |
| A4 — Verify error/URL behavior | route templates, production/CDN | P2 / Low | Staging host | 404, host, slash, and query behaviors are consistent and documented | Before launch |
| A5 — Add metadata/route smoke checks | test/CI setup, route list | P2 / Medium | Decide test runner | Test generated routes, titles, descriptions, canonicals, JSON-LD validity, and not-found status | After approval |

### Stage B — Page-level SEO improvements

| Task | Scope / pages | Priority / effort | Dependencies | Outcome and measurement | Timing |
|---|---|---|---|---|---|
| B1 — Normalize title and social conventions | Home, listing, details, guides, routes | P2 / Low | A1 | Consistent title brand rule and relevant share images; crawl rendered HTML | Immediate |
| B2 — Complete detail-page linking | Destination, experience, guide, flight detail pages | P1/P2 / Medium | Factual review | Relevant, crawlable related links and breadcrumbs where useful | Immediate after review |
| B3 — Strengthen page summaries and question answers | Top landing pages | P1 / Medium | Editorial review | Direct answer content with sources and clear headings; human usefulness review | Prioritize small set |
| B4 — Improve route page uniqueness | Flight route templates | P1 / Medium | Flight verification (F-07) | Verified route context and accurate enquiry labels; review duplicate/unique text | Requires operator input |
| B5 — Add article provenance/metadata | Guides, later real editorial pages | P1 / Medium | Actual authors/editor dates and sources | Accurate author/date/source and canonical/share metadata, no invented fields | Requires editorial input |

### Stage C — Content and topical authority

| Task | Scope | Priority / effort | Dependencies | Outcome and measurement | Timing |
|---|---|---|---|---|---|
| C1 — Create source/review register | All destination, experience, guide, route records | P1 / Medium | Editor/source policy | Traceable source/date fields and review ownership | Immediate planning; execution needs editor |
| C2 — Upgrade core guides | Four existing guides; begin with Brazil planning, Lençóis, Salvador, trail safety | P1 / Medium/high | C1 and sources | Original practical guidance, source links, clear limitations and update dates | First editorial phase |
| C3 — Improve priority destinations | Use GSC and factual readiness to choose a small first group | P1 / Medium | C1 and measurement | More useful answers and source-backed detail, not word-count inflation | After launch data/editor |
| C4 — Regional collections/comparisons | Curated groups from existing verified destinations | P2 / Medium | Criteria and adequate source depth | Distinct discovery pages with internal-link paths | Later |
| C5 — Expand only for coverage gaps | New destination records/images | P2 / Medium/high | Fact verification, regional value, licensed image | Quality-controlled breadth; no mass-generated city clones | Later |

### Stage D — AEO/GEO and answer quality

| Task | Scope | Priority / effort | Dependencies | Outcome and measurement | Timing |
|---|---|---|---|---|---|
| D1 — Add concise supported answers | Destination, guide, route FAQs/sections | P1/P2 / Medium | C1 | Easier-to-scan answers with source/date context | Alongside content work |
| D2 — Publish comparison tables only when data supports them | Destination/theme comparisons | P2 / Medium | Comparable verified attributes | Accessible comparison for people and parsable HTML | Later |
| D3 — Validate structured data | Homepage, destination, category/experience, future articles | P2 / Low | A1 and complete visible content | JSON-LD validates and agrees with visible facts; monitor Search Console where eligible | After domain setup |
| D4 — Keep AI visibility claims grounded | Editorial policy and measurement notes | P2 / Low | None | No unsupported AI-ranking promises; monitor referrals where measurable | Ongoing |

### Stage E — Conversion and user experience

| Task | Scope | Priority / effort | Dependencies | Outcome and measurement | Timing |
|---|---|---|---|---|---|
| E1 — Final accessibility and interaction QA | Mobile menu, search, quiz, itinerary, budget, saved items, contact | P1/P2 / Medium | Representative browsers/devices | Keyboard, screen reader, focus, reduced motion, empty/failure paths pass a checklist | Before launch |
| E2 — Confirm enquiry service and numbers | Flight pages and contact surface | P1 / Medium | Owner/operator verification | Working, authorized telephone/WhatsApp contact with honest response expectation | Requires input |
| E3 — Decide contact provider and data handling | `/contato`, server action/API/provider, disclosures | P1 / High | Operator, provider, privacy, spam and retention decisions | Real delivery plus explicit success/failure; no misleading success | Requires input; do not start before |
| E4 — Improve flight CTA wording | `/voos` and `/voos/[slug]` | P1 / Low | E2 | “Request assistance” is unmistakable before contact click | After verification |
| E5 — Measure tool interactions | Quiz, budget, itinerary, saves | P2 / Medium | Measurement/privacy decision | Event definitions for starts/completions/share/clicks without sensitive content | After tool approval |

### Stage F — Authority and organic growth

| Task | Scope | Priority / effort | Dependencies | Outcome and measurement | Timing |
|---|---|---|---|---|---|
| F1 — Earn legitimate citations | Useful Brazil travel resources and relevant local organizations | P2 / Medium/high | C1–C3 high-value resources | Relevant referral/citation links and partnerships; no paid spam links | Later |
| F2 — Publish genuinely reusable destination resources | Curated planning checklists/maps only when sourced and maintained | P2 / Medium/high | Data/source governance | Useful reference material others may cite; measure referrals and citations | Later |
| F3 — Build transparent partner relationships | Verified operators/public institutions | P3 / High | Business/legal/operational review | Trustworthy referrals with clear disclosures; no unverified inventory claims | Future phase |

### Stage G — Measurement and maintenance

| Task | Scope | Priority / effort | Dependencies | Outcome and measurement | Timing |
|---|---|---|---|---|---|
| G1 — Verify Search Console and sitemap | Production domain | P1 / Low | A1 | Coverage/indexing state and search performance data; inspect sitemap status | Launch |
| G2 — Configure minimal analytics | Content/tool/outbound events | P1/P2 / Medium | Privacy/consent policy decision | Consistent, privacy-aligned events and conversion definitions | Requires input |
| G3 — Establish baseline performance | Representative mobile/desktop pages | P2 / Low/medium | Staging/production | Lighthouse/PSI lab measurements and field data when sufficient traffic exists | Before/after launch |
| G4 — Monthly/quarterly editorial review | Destination facts, route/contact data, licenses, guides | P1 / Medium ongoing | Named content owner | Review dates and correction record; track stale data | Ongoing |

## 16. Top 10 actions to prioritize

1. Confirm the actual production domain/host and configure
   `NEXT_PUBLIC_SITE_URL`.
2. Deploy a test environment and verify canonical, sitemap, and robots output
   on that actual host.
3. Decide which routes are meant to rank; remove device-specific/private
   utilities from the sitemap or mark them `noindex` where appropriate.
4. Complete canonical coverage for all intended landing-page templates,
   including guides and flight routes.
5. Verify airport names/codes, every displayed route pair, and all three
   phone/WhatsApp destinations before relying on flight enquiry CTAs.
6. Establish an editor/source/date-check process and audit all 18 destination
   records and the changing facts they contain.
7. Upgrade the four existing guides with useful original detail, reliable
   sources, update context, and real author/reviewer information where true.
8. Improve destination/route linking and source-backed page-specific answers;
   do not publish more thin URLs first.
9. Resolve operator identity, contact delivery, spam, privacy, and data
   retention decisions before adding a real contact endpoint or analytics.
10. Run keyboard/screen-reader, mobile visual, error/storage/clipboard, and
    PageSpeed/Core Web Vitals checks; keep results as a dated QA baseline.

## 17. Next three development phases (proposal only)

### Proposed Phase 4 — Production SEO foundation and trust readiness

- **Objective:** make public crawl/index outputs correct and establish verified
  trust/service facts.
- **Scope:** configure confirmed public origin; complete canonicals and
  sitemap/indexability policy; verify robots/404/slash behavior; verify route
  and contact data; decide truthful About/contact/privacy disclosures; add
  targeted route/metadata tests.
- **User benefit:** accurate search/social URLs and transparent expectations.
- **SEO/AEO rationale:** crawlable canonical pages are a prerequisite for
  discovery; correct business and content facts support trust. Neither
  guarantees ranking.
- **Dependencies:** exact domain, deployment access, operator identity,
  contact/route owner confirmation, decision on which utility pages should be
  indexable.
- **Acceptance criteria:** production sitemap includes only approved canonical
  URLs; robots references it; all intended pages have one correct canonical;
  excluded utility pages carry the agreed policy; route/contact verification
  is recorded; unknown slug returns a real 404.
- **Deliberately exclude:** flight inventory, payments, booking, contact
  transmission, accounts, or analytics until separately approved.

### Proposed Phase 5 — Editorial depth and internal discovery

- **Objective:** turn the current attractive directory into a more useful,
  evidence-backed Brazil planning resource.
- **Scope:** upgrade the four guides and a small GSC/editor-selected set of
  destination pages; add source/review-date ownership, practical sections,
  category/destination comparisons where evidence exists, and cross-links.
- **User benefit:** visitors can make a more informed shortlist and know which
  details to confirm.
- **SEO/AEO rationale:** distinct helpful answers, reliable sources, and
  connected pages are more defensible than more template URLs.
- **Dependencies:** editorial owner, accepted sources, factual review and
  measurement access.
- **Acceptance criteria:** every newly enhanced fact has a source/review
  record; each page has a clear intent, direct answer, useful internal links,
  accurate title/description, and no unsupported author/price/season claims.
- **Deliberately exclude:** mass generation, unverified costs, generic FAQs
  for schema, reviews, and promises of AI-answer visibility.

### Proposed Phase 6 — Measured planning and enquiry refinement

- **Objective:** improve existing quiz/itinerary/budget and enquiry journeys
  based on user testing and approved operations.
- **Scope:** accessibility/failure QA; quiz matching explanations; itinerary
  share/copy reliability; measurement of non-sensitive tool engagement;
  contact delivery only if provider/privacy/spam decisions are complete;
  route CTA analytics only after contact channels are verified.
- **User benefit:** more reliable, understandable planning and fewer dead-end
  interactions.
- **SEO/AEO rationale:** improved usefulness and trustworthy interactions can
  support discovery indirectly; tool metrics are not ranking signals by
  themselves.
- **Dependencies:** Phase 4 service decisions, privacy policy, user-testing
  plan, verified contact data.
- **Acceptance criteria:** keyboard and screen-reader checklist passes;
  storage/clipboard failure paths are usable; tool results describe their
  limits; contact success means actual delivery and failure is explicit;
  events match a written measurement plan.
- **Deliberately exclude:** booking/payments, live flight APIs, partner offers,
  traveler accounts, and cross-device sync until a separate business/product
  decision.

## 18. Measurement plan and external inputs required

### Google Search Console

After domain ownership is established:

- Submit the populated canonical sitemap and check processing/index coverage.
- Review queries/pages by impressions, clicks, CTR, and position; treat average
  position as a Search Console metric, not a universal rank guarantee.
- Inspect representative canonical URLs and rendered HTML.
- Check enhancement reports only for schema features that Google currently
  supports.
- Compare destination, guide, route, and category performance before deciding
  to expand or consolidate content.

Google's [Search Console getting-started documentation](https://developers.google.com/search/docs/monitor-debug/search-console-start)
describes ownership verification, indexing/sitemap reports, and performance
reports. No site-specific GSC data was accessible for this audit.

### Analytics and event definitions

Choose a privacy-appropriate measurement provider only after deciding
operator, consent, retention, and data-minimization requirements. Consider
measuring:

- page groups and landing pages;
- destination search submissions and destination detail clicks;
- quiz starts, completion, and recommendation clicks (not sensitive answers);
- itinerary generation/copy and resulting destination clicks;
- flight phone/WhatsApp clicks (only after channels are verified);
- contact form interactions only after a real submission flow exists.

Do not send itinerary contents, names, email/message field contents, or other
personal text to analytics.

### Performance

Run [PageSpeed Insights](https://pagespeed.web.dev/) or Lighthouse against
representative deployed routes: homepage, directory, a destination detail,
guide detail, flight route, and planning tool. Keep lab and field evidence
separate; only report Core Web Vitals when real field data is available.

### Inputs to supply later

- Confirmed canonical production domain and deployment URL(s).
- Search Console property access/export and sitemap/indexing reports.
- Any consented analytics data and agreed event definitions.
- Verified operator/legal identity, support hours, and contact ownership.
- Approved contact/email provider, retention, spam, privacy, and terms
  decisions if a real message channel is desired.
- Author/editor/reviewer names and factual review process (only if true).
- Authoritative source list and change-check date for destination/airport facts.
- Permission/license review notes for all image-credit entries.
- Representative production or staging URLs for PSI/Lighthouse and device QA.
- If keyword research is desired: a dated export with geography/language,
  query, volume range, difficulty definition, and source tool. No estimates
  should be mixed with verified GSC queries.

## 19. Verification log and source register

### Local project checks performed on 19 October 2026

| Check | Result | Scope / limits |
|---|---|---|
| Source inspection | Reviewed project status, README, App Router pages, key data files, metadata helpers, sitemap/robots, layout, shared navigation/cards/images, contact and flight surfaces, and core planning components. | Source-based review, not an exhaustive visual test of every record in every browser. |
| Local browser route sample | HTTP 200 for `/`, `/destinos`, `/destinos/manaus`, `/experiencias`, one category, one experience, one guide, `/voos`, one flight route, planning hub/quiz/budget, itinerary with a sample query, saved items, About, Contact, FAQ, credits, robots, and sitemap. | Local development server only; selected route examples. |
| Unknown dynamic route | `/destinos/nao-existe` returned HTTP 404 and the custom not-found content was present in the accessibility snapshot. | Production CDN/deployment behavior not tested. |
| Local metadata/JSON-LD | Sample pages had populated title/description. Manaus JSON-LD parsed as JSON. No canonical was emitted locally because the running app had no site origin. | Not a Search Console or rich-results validation. |
| Local sitemap/robots | Both endpoints returned HTTP 200; `robots.txt` allowed all and had no sitemap line; sitemap XML had an empty `<urlset>`. | Expected from unset local `NEXT_PUBLIC_SITE_URL`; production origin is still unknown. |
| `npm run lint` | Passed, exit code 0. | Current audit checkout. |
| `npm run typecheck` | Passed, exit code 0. | Current audit checkout. |
| Automated tests | `runTests` found no test files. Package scripts have no `test` entry. | No unit/integration suite was run. |
| `npm run build` | Not rerun during this audit. Existing status report records a successful prior build. | Kept the requested local dev preview running; do not treat historic build result as a new audit-date build. |
| PageSpeed/Core Web Vitals | Not measured. | No PSI, Lighthouse, or field data. |
| Search/keyword/backlink/analytics | Not measured; no connected accounts/data supplied. | No traffic/rank/volume claims made. |

### External/public sources retrieved on 19 October 2026

1. Google Search Central, [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
   — foundational SEO and crawl/discovery guidance.
2. Google Search Central, [Structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
   — structured data meaning, visible-content guidance, validation, and no
   guarantee of enhanced results.
3. Google Search Central, [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
   — breadcrumb feature and validation guidance.
4. Google Search Central, [FAQ/How-to rich result change](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
   — FAQ rich-result visibility is limited to authoritative government and
   health websites; FAQ content may still help visitors.
5. Google Search Central, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
   — AI feature eligibility uses existing indexing/search fundamentals; no
   special requirements beyond those documented.
6. Google Search Central, [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
   — self-assessment on originality, value, expertise, sourcing, and trust.
7. Google Search Central, [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
   — sitemap formats and submission practices.
8. Google Search Central, [Get started with Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start)
   — ownership, indexing, sitemap, and performance reports.
9. [PageSpeed Insights](https://pagespeed.web.dev/) — tool endpoint only; no
   Lativera URL was measured.
10. Lonely Planet, [10 of the best places to visit in Brazil](https://www.lonelyplanet.com/articles/best-places-to-visit-in-brazil)
    — accessible editorial page reviewed for destination framing, links,
    planning tips, and contextual depth.
11. Booking.com, [Brazil accommodation listing](https://www.booking.com/country/br.html)
    — partial public listing snippet accessible; not a full UI audit.
12. Skyscanner, [São Paulo–Rio route page](https://www.skyscanner.com/routes/saoa/rioa/sao-paulo-to-rio-de-janeiro.html)
    — regional redirect/partial text extraction; not a fare/interface audit.
13. Airbnb, [Brazil stays](https://www.airbnb.com/brazil/stays)
    — redirected to a regional domain; content not assessed.
14. Tripadvisor, [Brazil destination URL](https://www.tripadvisor.com/Tourism-g294280-Brazil-Vacations.html)
    — fetch returned HTTP 403; not assessed.
15. Expedia, [Brazil destination URL](https://www.expedia.com/Brazil.dx26)
    — fetch returned HTTP 403; not assessed.
16. National Geographic Travel, [Brazil destination URL](https://www.nationalgeographic.com/travel/destination/brazil/)
    — retrieval returned only a copyright/footer stub; not assessed.
17. Visit Brasil, [official tourism site](https://visitbrasil.com/en/)
    — public page loaded; used only as an official tourism reference, not as
    proof of any Lativera fact.

## 20. Decisions requiring owner input

- [ ] What is the exact production domain and which host variant is canonical?
- [ ] Which tools should be search landing pages: quiz, budget, itinerary, and
  saved items? Should `/salvos` be `noindex` and excluded from sitemap?
- [ ] Who operates Lativera, and what legal/business identity can be truthfully
  displayed?
- [ ] Are all listed telephone and WhatsApp numbers current, authorized, and
  staffed? Who responds and what can they actually arrange?
- [ ] Is a contact-delivery channel wanted now? If so, which provider, what
  retention period, what spam protection, and what privacy disclosure?
- [ ] Who owns editorial fact-checking and review dates? Which official/local
  sources are approved for destinations, airports, attractions, and safety?
- [ ] Who authored/reviewed the existing guides? Are names and expertise
  publishable and accurate?
- [ ] Are the current route records intended as verified active routes or
  simply topics for enquiry? Which pairs should be included?
- [ ] Is analytics desired, and what consent/retention/data-minimization
  approach is acceptable?
- [ ] Which audiences/regions and languages are the priority? Current
  implementation is Brazilian Portuguese and primarily people living in
  Brazil.
- [ ] Which real visitor outcomes matter most: destination discovery, itinerary
  usage, partner enquiries, or another approved goal?

## 21. Handover summary for the next development prompt

1. Lativera is a Brazil-focused Portuguese discovery site with local typed
   destination, experience, guide, and selected flight-route content—not a
   live booking or travel marketplace.
2. Its current differentiators are the regional destination browser, interest
   quiz, visitor-entered BRL worksheet, shareable itinerary, and browser-local
   saved items.
3. The current technical SEO foundation has metadata helpers, dynamic route
   generation, robots/sitemap routes, homepage/destination/category schema,
   and crawlable internal links, but its production hostname is unset and
   canonical coverage/indexing policy is incomplete.
4. The biggest organic opportunity is not adding many URLs: it is verifying
   and improving a smaller number of destination and guide pages with
   practical, source-backed, maintained information.
5. All flight routes, contact numbers, destination facts, image licenses,
   legal/operator details, and changing practical information require the
   verification described above.
6. Contact validation does not deliver messages; no live fares, schedules,
   prices, inventory, payments, account, or cross-device sync exist.
7. Search volumes, rankings, analytics, backlinks, and Core Web Vitals have
   not been measured. Configure privacy-appropriate tools after the domain
   and data-handling decisions.
8. The first suggested development phase is production SEO/trust readiness;
   the second is editorial depth; the third is measured planning/enquiry
   refinement. None has been implemented by this audit.
9. Preserve the current product-integrity constraints: use Brazilian
   Portuguese, verify facts, reuse only properly credited assets, do not
   fabricate prices/availability/business identity/reviews/credentials, keep
   contact delivery honest, and do not start commercial integrations without
   explicit product and operational decisions.

**Complete report:** `LATIVERA-COMPLETE-WEBSITE-SEO-AUDIT.md`  
**Existing ongoing status/handover remains unchanged:**
`LATIVERA-PROJECT-STATUS.md`
