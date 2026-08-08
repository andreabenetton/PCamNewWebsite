# PCam website

English-first, SEO-oriented redesign of pcam.com for tool, mould and high-mix precision manufacturing. This is **not** a 1:1 WordPress migration. The public site is organized around buyer problems, engineering solutions, applications, customer evidence and support tasks.

## Current architecture

- Astro 7 owns routing and static generation.
- React 19 is used only for bounded interactive islands.
- English is published under `/en/`.
- `de`, `it`, `fr`, `es` and `pt` are reserved but are not published until reviewed content exists.
- Cloudflare is the production target: Workers/static assets for the site, Stream for video, and R2/Images/static assets for migrated media where appropriate.
- SQL, license SOAP, protected downloads and authentication remain outside the static prototype behind explicit future integration boundaries.
- Local Git is the source of truth; deploy is a separate explicit action.

See `CLAUDE.md` for agent operating rules and `docs/adr/ADR-DIGEST.md` for the reasoning behind the architecture.

## Information architecture

The acquisition journey is intentionally not a product catalogue first:

```text
Solutions -> Applications -> Customer evidence -> Contact
```

Products remain directly accessible for engineers who already know what they need. Existing-customer tasks live under `/support/`; partner content has its own public entry point and a noindex workspace mock.

## Multilingual model

A content item has a **canonical identity independent from its localized slug**.

Static route equivalents live in:

```text
src/data/i18n/routes.json
```

For example, the same canonical route may eventually map to different slugs:

```text
en -> /en/applications/unattended-production/
it -> /it/applicazioni/produzione-non-presidiata/
de -> /de/anwendungen/unbemannte-fertigung/
```

Do not derive translated URLs by replacing `/en/` with another locale. Canonical/hreflang resolution uses explicit route or content identity.

Locale publication state and locale metadata live in:

```text
src/data/i18n/locales.json
```

Shared navigation/template copy lives in:

```text
src/data/i18n/ui/<locale>.json
```

### Translation review workflow

Translations are not propagated automatically.

When user-visible source-language content changes and other locales are already implemented, Codex/Claude must identify the affected equivalents, **ask whether they should be updated, and propose the translations for approval**. Only explicitly approved locales are changed.

Revision metadata makes this review state machine-checkable:

- source copy carries `revision`;
- non-source copy carries `reviewedAgainstRevision`;
- a source revision change makes older translated copies stale;
- `npm run audit:translations` reports missing or stale published-locale content.

A user may explicitly decide that a target-language text remains valid without modification. Only after that review may its `reviewedAgainstRevision` advance.

## Product content model

Product engineering facts and editorial language are separate.

```text
src/data/products/
  facts.json              canonical ID, product name, category, source facts
  locales/
    en.json               English slug and editorial copy
    de.json               future reviewed German copy
    ...
  types.ts
```

`facts.json` preserves source-backed engineering facts. Localized files contain buyer-facing language, localized spec presentation and localized slugs. Do not change canonical facts merely to make a translation read better.

`src/data/products.ts` assembles the canonical facts with the requested locale and exposes stable canonical-ID/path helpers.

## Customer evidence model

Customer evidence follows the same separation:

```text
src/data/stories/
  facts.json              company, source metric, source quotation, product IDs
  locales/
    en.json               English narrative and slug
    ...
  types.ts
```

The reported source quotation is preserved in canonical facts. A translated quotation is explicit localized copy; it must not overwrite the reported source text.

## SEO

SEO is part of the content model rather than a post-launch task.

- locale-prefixed public URLs;
- canonical links;
- hreflang generated from canonical route/content identity;
- `x-default` points to the English equivalent of the same page, not always the home page;
- locale-aware Open Graph locale;
- Organization, Product and Breadcrumb structured data;
- multilingual-ready sitemap generation;
- noindex on non-functional protected-area mocks.

The current sitemap contains the English public routes only. Adding an implemented locale extends it from the explicit localized route/product/story mappings.

## Media

The current PCam product images are streamed from legacy `/images/Module...` routes and require a permitted Referer/User-Agent. The migration manifest is `src/data/media.json`.

```bash
npm run media:sync
npm run media:hash
```

`media:sync` performs read-only GET requests and writes downloaded files into this local repository. `media:hash` generates SHA-256 data for exact deduplication.

During development media may live under `public/media`. For the final Cloudflare migration, set `PUBLIC_MEDIA_BASE_URL` to a Cloudflare-backed media domain; editorial content keeps stable logical asset references.

Existing Cloudflare Stream videos should keep their UIDs. Import the current UID map into `src/data/videos.ts` or a generated map rather than re-encoding video by default.

## Local workflow

Install from the committed lockfile:

```bash
npm ci
```

Optional legacy-media ingest:

```bash
npm run media:sync
npm run media:hash
```

Develop and review locally:

```bash
npm run dev
```

Before a commit intended for release:

```bash
npm run audit:translations
npm run check
npm run build
npm run preview
```

`npm run check` includes project/import checks, route checks, multilingual consistency checks and ADR consistency checks.

## Release workflow

Committing and publishing are separate operations.

```bash
npm run deploy:staging
npm run deploy:production
```

Deployment scripts reject a dirty Git tree. Agents must not deploy unless the user explicitly asks them to publish. Cloudflare dashboard edits do not replace repository changes, except for secrets or infrastructure state that cannot appropriately live in Git.

## Main project structure

```text
src/
  components/             reusable Astro components + bounded React islands
  data/
    i18n/                 locale state, canonical route map, shared UI copy
    products/             canonical facts + per-locale product copy
    stories/              canonical evidence + per-locale narratives
    media.json            legacy media provenance map
    videos.ts             Cloudflare Stream boundary
  layouts/
  lib/
  pages/[lang]/           locale-prefixed route tree
  styles/
scripts/
  audit-project.mjs
  audit-routes.mjs
  audit-translations.mjs
  generate-sitemap.mjs
  sync-legacy-media.mjs
  hash-media.mjs
  verify-clean-git.mjs
docs/adr/                 architecture decision records
```

## Content provenance

See `CONTENT_SOURCES.md` and `INGEST_REPORT.md`. Product claims, selected specifications and customer quotations are based on the English PCam source site. The new information architecture and editorial framing are deliberate redesign decisions, not a reproduction of the legacy WordPress structure.
