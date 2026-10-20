# Lativera Project Status

**Report updated:** 2026-10-18  
**Current development phase:** Phase 3 — planning tools  
**Report basis:** current source inspection, current-session build/type/lint checks, focused browser checks, and the prior session handover summary.

## A. Project overview

Lativera is an editorial travel-discovery website for people planning trips in
Brazil. It helps visitors browse Brazilian destinations, explore travel
experiences and guides, request flight assistance, and now begin a personal
travel plan. It is not a live flight-search, booking, ticketing, payment, or
operator marketplace.

### Framework and architecture found

- Next.js App Router **16.4.2**, React **19.3.0**, TypeScript **5**, Tailwind
  CSS **4**, Lucide React, ESLint 9, npm.
- App Router pages and metadata live in `src/app`; route data is mostly local
  and statically typed under `src/data`.
- Server Components are the default. Client Components handle filters,
  interactive forms, local storage, quiz state, and itinerary controls.
- Shared layout and UI are under `src/components/layout`,
  `src/components/ui`, and, for the new tools, `src/components/planning`.
- Shared helpers are under `src/lib`; approved local image assets are under
  `public/images`.
- The root uses a `pt-BR` document language and a shared header, footer,
  content landmark, skip link, and global design tokens.

### Current visitor journey

Visitors can discover destinations through the homepage and destination
filters, open destination and experience details, read travel guides, browse
selected flight routes and contact the team, or use the planning hub to match
interests, build an itinerary, estimate their own budget, and save items in
their browser.

### Known limitations

- Flight pages provide route discovery and telephone/WhatsApp enquiry links
  only. They do not show verified schedules, live fares, availability,
  bookings, cancellations, or refunds.
- The contact form validates in the browser but does not transmit or store
  submissions.
- Quiz data does not contain verified destination costs or general trip-length
  estimates. Budget answers are not treated as price evidence. Duration only
  contributes to matching when a destination already has the editorial
  “Escapadas de fim de semana” category.
- Saved items and the editable itinerary are browser-local, do not require an
  account, and do not synchronize between devices. A shared itinerary URL
  carries item identifiers, not private visitor data.
- No external travel API, email service, analytics service, payment provider,
  or booking integration was found or added.
- The public production origin still needs to be configured before production
  canonical URLs and a populated sitemap can be verified.
- No automated test script or test files were found.

## B. Phase-by-phase development history

The earlier phase descriptions below combine information in the previous
session handover with features found in the current source. The repository
currently reports its project files as untracked, so Git cannot establish a
reliable original baseline or independently distinguish all earlier
additions from modifications. No earlier implementation history is inferred
from file timestamps.

### Phase 1 — Foundation and trust

- **Objective:** document production configuration and publish image-source
  attribution.
- **Reported in earlier session notes:** `.env.example`, `.gitignore`, the
  image-credit page and footer link, sitemap entry, credit styling, and README
  production setup/roadmap changes were completed.
- **Confirmed in current source:** `.env.example`, `/fontes-e-creditos`, the
  footer and sitemap references, typed photo-credit data, and README guidance
  are present.
- **Limitations:** this inspection confirms the current files, not the exact
  before/after diff or historic check output. Contact delivery and legal
  disclosures were explicitly left pending.

### Phase 2 — Discovery

- **Objective:** improve destination discovery, add experience categories and
  details, and add supported coverage in the Norte region.
- **Reported in earlier session notes:** homepage search and curation,
  experience category/detail routes, new Norte destination content, and
  image-credit records were implemented.
- **Confirmed in current source/build:** 18 destination records (including
  Manaus, Belém, and Alter do Chão), seven experience records, five experience
  categories, their App Router pages, three corresponding local images and
  their credits, and the destination/experience links are present. The
  production build statically generated these detail routes.
- **Limitations:** the earlier audit listed 15 destinations; current source has
  18. The Norte-region content and imagery still need a complete independent
  factual and license review. Prior reported phase checks were not rerun as
  historical checks; current checks are listed in Section H.

### Phase 3 — Planning tools

- **Objective:** add a destination-matching quiz, personalized
  recommendations, shareable itineraries, an illustrative budget planner,
  and local saved items.
- **Added in this phase:** a planning hub; three-step quiz with validation,
  back/restart controls and focus management; destination and experience
  recommendations based on existing editorial tags; visitor-entered budget
  inputs and calculations; ordered itinerary editing and share URLs; and
  local save/unsave controls and a saved-items page.
- **Important implementation details:** matching reuses the existing
  destination, experience, and category data. Local planner state is stored
  under the browser key `lativera:travel-planner:v1`. Shared itinerary items
  are checked against known slugs; malformed or unknown items are ignored.
- **Limitations:** no prices, booking status, general destination duration,
  traveller account, cross-device sync, or third-party service was introduced.
  Focused checks passed, but full manual keyboard, assistive-technology,
  storage-denial, clipboard-permission, and site-wide QA remain pending.

### Phase 4 — Content, SEO, and contact (next)

- **Objective:** extend editorial content structure, improve search metadata
  and internal links, and implement a real contact-delivery flow only after
  its operational and privacy requirements are confirmed.
- **Not started in this phase.**
- **Decisions needed before contact implementation:** approved backend or
  email provider, delivery/retention responsibilities, spam protection,
  operator identity, and privacy disclosures consistent with real data
  handling.

### Phase 5 — Commercial partnerships (later)

- **Objective:** evaluate verified operators, packages, real availability,
  and eventual booking/payment integrations after partner, price, policy, and
  operational requirements are agreed.
- **Not started.** Do not represent current discovery/enquiry functionality
  as a booking service.

## C. Current website features

Statuses use the requested labels. “Implemented but not fully tested” means
the implementation exists and was inspected, but this work did not perform
complete site-wide or production verification.

| Feature | Status | Current evidence and limitations |
|---|---|---|
| Homepage and shared navigation | Implemented but not fully tested | Editorial homepage, destination search, internal feature links, responsive menu, shared header/footer. The Planejar link and CTA expose Phase 3 tools. |
| Destination directory, search, filters, sorting | Implemented but not fully tested | Typed 18-destination dataset, name/alias/state/region/category search, five Brazilian regions, category filters, sorting, empty/reset states. Earlier focused checks confirmed three Norte results. |
| Destination details | Implemented but not fully tested | Static params from the destination dataset; details, tips, FAQs, related content, route links, metadata and structured data. New save/itinerary actions are included. |
| Experiences and categories | Implemented but not fully tested | Seven experiences, five data-driven categories, category pages and experience detail pages, related destinations/guides, save/itinerary actions. |
| Guides and guide details | Implemented but not fully tested | Four typed local guide records and matching detail routes. |
| Flight route pages and enquiry actions | Implemented but not fully tested | Twenty local route records, search/filters and dynamic route details; `tel:` and WhatsApp links. No live fare or booking system. Confirm the numbers are active before publication. |
| Contact | Partially implemented | Browser validation and an explicit “not sent” state. No server endpoint, external service, message transmission, or storage. |
| FAQ and About | Implemented but not fully tested | Informational routes exist. Claims and company details still require business-owner verification. |
| Image credits | Implemented and inspected | `/fontes-e-creditos`, `src/data/photo-credits.ts`, and `IMAGE-CREDITS.md`; 27 typed image-credit entries were counted. Individual attribution/license compliance still needs a final review. |
| Destination-matching quiz | Implemented but not fully tested | Three steps, required-answer validation, progress, back/restart, focus behavior, region/style matching, and explanations. Ranking uses existing tags; budget and most durations are not supported ranking signals. |
| Personalized destination and experience suggestions | Implemented but not fully tested | Uses existing destination/experience/category relationships and related-destination fallbacks. It does not promise availability, trip duration, or budget fit. |
| Itinerary planning and sharing | Implemented but not fully tested | Add/remove/reorder destination and experience IDs; ordered list; local persistence; share URL via `?itens=`; safe allowlisting, duplicate removal, and invalid-item handling. Clipboard success and cross-device/browser variants remain unverified. |
| Budget planner | Implemented but not fully tested | Editable total, duration, traveller count and user-entered expense categories; BRL calculations and per-person/per-day averages. Blank categories are not treated as prices; all amounts are illustrative visitor inputs. |
| Saved destinations and experiences | Implemented but not fully tested | Save/unsave controls on cards and detail pages; `/salvos`; local storage; user-facing storage-unavailable messaging. Cross-device sync and account support do not exist. |
| Metadata, sitemap, and robots | Implemented but not fully tested | Page metadata helpers, canonical support where configured, `sitemap.ts`, and `robots.ts`. The production URL must be set before deployment verification. |
| Responsive design and accessibility | Implemented but not fully tested | Existing semantic landmarks, skip link, labels, statuses, focus styling, reduced-motion CSS, mobile navigation; new pages had no horizontal overflow at checked widths. Manual keyboard/screen-reader checks remain. |

## D. Complete route inventory

The current App Router page files contain the routes below. Dynamic route
counts come from current data/build output: 18 destinations, seven
experiences, five categories, four guides, and 20 flight route slugs.

| URL pattern | Purpose and main functionality | Main components/data | Status and known verification |
|---|---|---|---|
| `/` | Homepage, curated discovery, destination name/alias search, links to planning tools | `src/app/page.tsx`, `DestinationSearch`, destinations, experiences, guides | Implemented but not fully tested; no complete homepage regression suite in this phase. |
| `/destinos` | Destination discovery, search, region/category filters, sorting and reset | `DestinationBrowser`, `src/data/destinations.ts` | Implemented but not fully tested; Norte filtering was previously browser-checked. |
| `/destinos/[slug]` | Destination details, FAQs, tips, related content, route assistance and planner actions | Destination data, guides, flight routes, shared cards/actions | Implemented but not fully tested; statically generated for 18 slugs. |
| `/experiencias` | Experience/category directory and cards | `src/data/experiences.ts`, shared cards | Implemented but not fully tested. |
| `/experiencias/categoria/[slug]` | Editorial category archive, related destinations/guides | Experience category, destination and guide data | Implemented but not fully tested; five category slugs are generated. |
| `/experiencias/[slug]` | Individual experience details, related content and planner actions | Experience, destination and guide data | Implemented but not fully tested; seven experience slugs are generated. |
| `/planejar` | Hub linking quiz, itinerary, budget planner and saved items | Planning tool cards | Implemented and browser-smoke-tested (HTTP 200). |
| `/planejar/quiz` | Interest/duration/budget/style/region questionnaire and recommendations | `DestinationQuiz`, destination matching helper and local typed data | Implemented but not fully tested; focused validation and recommendation flow checked. |
| `/planejar/orcamento` | Editable user-input estimate in BRL | `BudgetPlanner` | Implemented but not fully tested; one calculation case checked. |
| `/roteiro` | Ordered personal itinerary, add/remove/reorder, summary and link sharing | `ItineraryPlanner`, local planner provider, destinations and experiences | Implemented but not fully tested; `?itens=d~slug,e~slug` restores recognized IDs. Invalid/unknown IDs are ignored, duplicates removed, maximum 30 accepted items, query payloads above 4096 characters rejected. |
| `/salvos` | View and manage saved destinations and experiences | `SavedItems`, local planner provider and typed data | Implemented but not fully tested; save, unsave and persistence across reload were checked. |
| `/guias` | Guide index | `src/data/guides.ts` and guide cards | Implemented but not fully tested. |
| `/guias/[slug]` | Individual guide article | Guide dataset and related destinations | Implemented but not fully tested; four guide slugs are generated. |
| `/voos` | Route discovery, search and enquiry links | `FlightRouteBrowser`, `FlightContactOptions`, flight route data | Implemented but not fully tested; `?destino=...` prefills the route text search, not an availability search. |
| `/voos/[slug]` | Details for a locally listed flight route and enquiry actions | Flight route dataset/contact helper | Implemented but not fully tested; 20 route slugs are generated. |
| `/sobre` | About information | About page content | Implemented but not fully tested; verify all company claims before publication. |
| `/contato` | Contact information and client-side validation form | `ContactForm` | Partially implemented; submission is not delivered or stored. |
| `/faq` | Frequently asked questions | Local page content | Implemented but not fully tested. |
| `/fontes-e-creditos` | Image author/source/license listing | `photo-credits.ts` | Implemented and inspected; image/license review still pending. |
| `/robots.txt` | Crawl directives and optional sitemap reference | `src/app/robots.ts` | Implemented but not fully tested against production configuration. |
| `/sitemap.xml` | Public canonical URL inventory | `src/app/sitemap.ts` and current route data | Implemented but not fully tested; returns an empty sitemap if `NEXT_PUBLIC_SITE_URL` is absent. |
| Next.js not-found handling | Fallback for unknown routes/slugs | `src/app/not-found.tsx`, dynamic pages call `notFound()` | Implemented; full error-page UX was not part of focused Phase 3 QA. |

## E. Files changed

No files were removed in Phase 3. The following are the important files added
or changed during this phase:

| File | Purpose and change | Feature depending on it |
|---|---|---|
| `src/components/planning/travel-planner-provider.tsx` | Added shared, sanitized local planner state for saved items and itinerary; storage events and visible/accessibility notices for storage failures. | Saves and itinerary persistence. |
| `src/components/planning/travel-actions.tsx` | Added accessible save and itinerary toggle buttons. | Destination and experience cards/details. |
| `src/components/planning/destination-quiz.tsx` | Added three-step quiz, validation, progress, focus handling, explanations and fallback recommendations. | `/planejar/quiz`. |
| `src/components/planning/budget-planner.tsx` | Added visitor-entered inputs, editable expense categories, BRL arithmetic and illustrative summaries. | `/planejar/orcamento`. |
| `src/components/planning/itinerary-planner.tsx` | Added list editing, reordering, filtering, sharing, query restoration and URL validation. | `/roteiro`. |
| `src/components/planning/saved-items.tsx` | Added local saved-items directory and empty/storage states. | `/salvos`. |
| `src/lib/destination-matching.ts` | Added transparent matching based on existing destination and experience tags. | Quiz destination and experience results. |
| `src/app/planejar/page.tsx` | Added planning tools hub. | `/planejar`. |
| `src/app/planejar/quiz/page.tsx` | Added quiz route and metadata. | `/planejar/quiz`. |
| `src/app/planejar/orcamento/page.tsx` | Added budget route and metadata. | `/planejar/orcamento`. |
| `src/app/roteiro/page.tsx` | Added itinerary route and metadata. | `/roteiro`. |
| `src/app/salvos/page.tsx` | Added saved-items route and metadata. | `/salvos`. |
| `src/app/layout.tsx` | Wrapped the app in the shared planner provider. | Local saved/itinerary state throughout the app. |
| `src/lib/navigation.ts` | Added the Planejar navigation item. | Header and footer navigation. |
| `src/app/sitemap.ts` | Added the planning hub, quiz, budget, itinerary and saved-items routes. | SEO route inventory. |
| `src/app/page.tsx` | Added a planning-hub call to action. | Homepage discovery. |
| `src/components/ui/travel-cards.tsx` | Added save/itinerary actions to destination and experience cards. | Discovery cards and related listings. |
| `src/app/destinos/[slug]/page.tsx` | Added save/itinerary actions to destination detail pages. | Destination planning. |
| `src/app/experiencias/[slug]/page.tsx` | Added save/itinerary actions to experience detail pages. | Experience planning. |
| `src/app/globals.css` | Added responsive planner, quiz, budget, itinerary, saved-item and action styles; included reduced-motion handling for quiz progress. | Phase 3 responsive UI. |
| `README.md` | Updated route/feature inventory and marked planning tools implemented with stated limitations. | Project setup and roadmap documentation. |
| `LATIVERA-PROJECT-STATUS.md` | Created this ongoing handover report; no previous file with this name was found. | Project status and future handover. |

Git status showed the project files as untracked, so this list is an
implementation record from the current task, not a Git-derived diff against a
known tracked baseline.

## F. Data, images and external integrations

- **Destinations:** `src/data/destinations.ts`, 18 typed destination records.
- **Experiences:** `src/data/experiences.ts`, seven typed experience records
  and five editorial categories.
- **Guides:** `src/data/guides.ts`, four typed guide records.
- **Flight routes:** `src/data/flight-routes.ts`, 20 approved route records.
- **Phase 3 data changes:** no new destination, experience, price, or operator
  records were added. Matching derives from the data already in these files.
- **Images:** local assets are under `public/images` and rendered through the
  shared `TravelImage`/Next Image component. The current typed credit map
  contains 27 image entries; `IMAGE-CREDITS.md` documents source and license
  links. Recheck each source and required attribution/share-alike conditions
  before distribution.
- **External APIs/services:** none integrated for planning, discovery or
  contact delivery. WhatsApp actions build `wa.me` links with prefilled
  messages; telephone actions use `tel:` links. Those actions are user
  initiated and do not prove that the numbers are active.
- **Contact form:** browser-side validation only. It neither sends nor stores
  messages.
- **Illustrative/local data:** quiz match scores are editorial-tag matching,
  not verified suitability. Budget figures are calculated only from visitor
  inputs. Saved items and itinerary IDs remain local to the browser; the
  share URL encodes public destination/experience identifiers.
- **Environment:** `NEXT_PUBLIC_SITE_URL` is documented in `.env.example` and
  README as the canonical public origin. It must be configured for production
  canonical URLs and a populated sitemap. Do not store credentials or
  personal data in client-exposed `NEXT_PUBLIC_*` variables.

## G. SEO and technical status

- **Metadata/titles:** root metadata and page-level title/description data
  exist. The shared helpers are in `src/lib/metadata.ts`; new planning routes
  use canonical-aware metadata.
- **Canonicals/social metadata:** configured conditionally using
  `NEXT_PUBLIC_SITE_URL`. The deployed canonical output has not been verified.
- **Sitemap/robots:** `src/app/sitemap.ts` maps current static/dynamic records
  to URLs when a site origin is present; `src/app/robots.ts` permits public
  crawling and includes a sitemap URL only when configured. Production output
  and search-engine indexing are not verified.
- **Structured data:** homepage WebSite data, destination detail data
  (TouristDestination, FAQ and breadcrumbs), and experience-page breadcrumb
  data exist. This report does not assert indexing, rich-result eligibility,
  rankings, or production correctness.
- **Internal links:** destination, experience, guide, flight-assistance and
  planning links are data-driven or route-based. New planning routes are
  linked from the hub, homepage/navigation, cards, and detail actions.
- **Image handling:** `TravelImage` uses `next/image`, local paths, alt text
  and photo attribution records. Visual crop and performance on actual devices
  remain to be reviewed.
- **Accessibility:** semantic route landmarks, skip link, labeled inputs,
  fieldsets, live status/error messages, focus-visible styling, focus movement
  for quiz steps/results, descriptive action labels, reduced-motion handling,
  and an accessible mobile menu exist. No automated accessibility audit or
  manual screen-reader assessment was run.
- **Responsive behavior:** focused browser checks measured no horizontal
  overflow on new tools at 375, 768, and 1280 CSS-pixel viewport widths.
  This does not constitute full cross-device visual QA.
- **Performance:** no Lighthouse, Web Vitals, or load testing was run. During
  development a Next Image LCP warning appeared for a first saved-card image
  marked lazy; the first saved/result card was changed to eager loading. A
  final performance audit remains pending.
- **Error handling:** unknown dynamic slugs call `notFound()`. Quiz validation,
  empty/fallback results, storage failures and malformed itinerary identifiers
  have explicit states. Storage-denial and clipboard-denial paths were
  inspected in code but not manually forced in the browser.
- **Build/type safety:** final lint, typecheck and production build all
  completed successfully; details are in Section H.

## H. Test and command results

### Final required commands

Executed sequentially after implementation:

| Command | Result |
|---|---|
| `npm run lint` | Passed, exit code 0. |
| `npm run typecheck` | Passed, exit code 0 (`tsc --noEmit`). |
| `npm run build` | Passed, exit code 0. Next.js compiled successfully and generated all 72 static pages/routes reported by the build. The route output included 18 destination details, seven experience details, five experience categories, four guide details, and 20 flight route details. |

### Automated tests

- No `test` script or test files were found in the project. No automated test
  suite was run or claimed.
- An interim lint pass flagged synchronous state updates in effects. The
  storage initialization and shared-link status handling were adjusted; final
  lint passed.

### Focused browser checks

- The five new routes `/planejar`, `/planejar/quiz`,
  `/planejar/orcamento`, `/roteiro`, and `/salvos` returned HTTP 200 and
  rendered the expected page title and H1.
- Quiz: an incomplete first step showed validation; selected culture, duration,
  budget, style, and Norte region produced linked destination
  recommendations including Belém and Manaus and related experience
  suggestions.
- Budget: entered total R$ 1,200, three days, two travellers, R$ 400
  transport and R$ 200 lodging. The displayed subtotal/difference was
  R$ 600, per-person budget R$ 600, and per-person/day budget R$ 200.
- Saved items: save/unsave behavior was checked for destination and experience
  records; an experience remained saved after a full page reload.
- Itinerary: adding and reordering items, generating a summary/link,
  restoring known items, ignoring an unknown item, and removing a test item
  were checked. Clipboard API success was not confirmed.
- Responsive: all four new interactive routes (`/planejar/quiz`,
  `/planejar/orcamento`, `/roteiro`, `/salvos`) had no measured horizontal
  overflow at 375, 768, and 1280 viewport widths.
- Test-only saved and itinerary records were removed from the shared browser
  after checks. No user account or personal information was entered.
- Some early browser assertions used ambiguous role names or ran before
  client hydration; those assertions were corrected and rerun. They were
  browser-test selector/timing issues, not application failures.
- A development-only Next Image LCP warning was observed and the first
  relevant image was changed to eager loading. No final production-build
  warning was reported.

## I. Outstanding issues and final QA backlog

Items below are verification or future-development work; they do not negate
the completed Phase 3 build.

### Priority 1 — final verification before production

- [ ] Manually test quiz and planner keyboard navigation, focus order,
  screen-reader announcements, visible focus, and reduced-motion behavior.
- [ ] Test clipboard success and failure/fallback paths and shared links in
  separate browser contexts/devices; test malformed, duplicate, oversized,
  and empty itinerary URLs.
- [ ] Simulate denied/unavailable local storage and quota/write failures;
  verify notices, in-session behavior, cross-tab updates, and persistence.
- [ ] Visually inspect all new pages at mobile, tablet and desktop sizes and
  in a second browser; current overflow measurements are not a visual audit.
- [ ] Review quiz mapping and fallback results with a Portuguese-speaking
  editor; confirm that category labels remain honest about the limited
  underlying data.
- [ ] Verify all destination/geographic statements against accessible
  authoritative sources. Earlier IBGE requests returned 403; do not treat
  their data as independently verified by this implementation.
- [ ] Recheck source pages, attribution and license requirements for the 27
  image-credit records, including share-alike obligations where relevant.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real canonical production origin, then
  inspect page canonicals, Open Graph URLs, sitemap and robots output on the
  deployment.
- [ ] Confirm the listed telephone/WhatsApp numbers are current and
  authorized for publication.
- [ ] Run Lighthouse/Core Web Vitals and verify image delivery, font behavior,
  network load and performance on representative real devices.

### Priority 2 — open product/infrastructure decisions

- [ ] The contact form is not a delivery channel. Phase 4 needs an approved
  provider/backend, server-side validation, abuse protection, message
  retention policy and honest success/error UX before enabling submissions.
- [ ] Privacy/terms disclosures must match actual business identity and data
  practices; those details are not established in this codebase.
- [ ] Destination costs, typical trip lengths, seasonal claims and operator
  availability need verified data sources before the quiz can use them for
  ranking or budget fit.
- [ ] No live flight data, booking integration, checkout, payment flow,
  traveller account or commercial operator integration exists.

## J. Next-phase roadmap

1. **Completed: Phase 3 planning tools.** Keep the current scope
   non-commercial, transparent and local-first.
2. **Next recommended development phase: Phase 4 — content, SEO, and
   contact.** Define a scalable editorial/blog structure, strengthen
   internal linking and metadata based on genuine search intent, and only
   implement contact delivery after backend/provider, spam, privacy and
   operational decisions are confirmed.
3. **Later: Phase 5 — verified commercial partnerships.** Confirm operators,
   inventory, prices, cancellation rules, customer support and operational
   responsibilities before adding enquiries, availability, booking or payment.
4. **Final site-wide QA remains a separate verification milestone.** Complete
   the checklist in Section I before production; the Phase 3 task intentionally
   did not perform a full website-wide audit.

## K. HANDOVER SUMMARY FOR CHATGPT

1. **Current development phase:** Phase 3 — planning tools implemented.
2. **Features completed this phase:** three-step destination quiz and
   tag-based recommendations; ordered, locally persisted, shareable itinerary;
   visitor-entered illustrative BRL budget planner; save/unsave destination
   and experience items with a local saved-items page.
3. **Routes added:** `/planejar`, `/planejar/quiz`,
   `/planejar/orcamento`, `/roteiro`, `/salvos`. Itinerary links use
   `/roteiro?itens=d~slug,e~slug`; `/voos?destino=...` remains an existing
   search prefill.
4. **Important files changed:** `src/components/planning/*`,
   `src/lib/destination-matching.ts`, the five new `src/app` route pages,
   `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`,
   `src/app/sitemap.ts`, `src/lib/navigation.ts`,
   `src/components/ui/travel-cards.tsx`, destination/experience detail pages,
   `README.md`, and this report.
5. **Actual checks:** final `npm run lint`, `npm run typecheck`, and
   `npm run build` passed. Build generated 72 routes/pages. Focused browser
   checks passed for new routes, quiz validation/recommendations, budget
   arithmetic, save persistence, itinerary handling and responsive overflow.
6. **Known limitations:** quiz budget is collected but not used to claim
   destination affordability; duration matching is limited to the existing
   weekend tag. Contact form does not send data. No live fare, booking,
   operator, or price data. Clipboard/storage-denial cases are not manually
   verified.
7. **Postponed final QA:** keyboard/screen-reader checks, storage and
   clipboard failure simulation, full visual/cross-browser review, geographic
   source verification, image-license audit, production canonical/sitemap
   validation, phone-number confirmation, and performance checks.
8. **Next recommended development phase:** Phase 4 content/SEO/contact,
   after provider, privacy, spam-protection and operational requirements are
   decided. Phase 5 commercial work remains later.
9. **Preserve these constraints:** use Brazilian Portuguese; reuse typed local
   data and licensed credited imagery; do not fabricate prices, availability,
   reviews, business details or operator claims; keep discovery separate from
   booking; never claim the contact form sends messages; keep local storage
   non-sensitive and explain its device-only limits; follow the agreed phase
   order and do not start commercial integrations without confirmed
   requirements.
