# PCam Astro redesign

English-first, SEO-oriented redesign of pcam.com for tool, mould and high-mix precision manufacturing. This is **not** a 1:1 WordPress migration. The site is reorganized around buyer intent, engineering solutions, applications, customer evidence and support tasks.

## What is implemented

- Astro 7 static-first site with React 19 islands where useful.
- English site under `/en/`.
- i18n routing reserved for `en`, `de`, `it`, `fr`, `es`, `pt`.
- Solutions, Applications, Products, Customer Stories, Knowledge, Company, Partners, Support and Contact.
- 20 structured product records.
- customer-evidence pages based on current PCam references.
- engineering knowledge content for tool/mould automation, MES and unattended CNC production.
- mock Partner Area, downloads, manuals and license UX.
- real PCam brand assets and a real automation rendering bundled locally.
- protected legacy product-image manifest + read-only sync script.
- SHA-256 media manifest generation for exact deduplication.
- internal route/import audits that run before release.
- Cloudflare Stream integration boundary.
- Cloudflare Workers static-assets deployment configuration.
- Git-clean deployment guard.

## Local workflow

```bash
npm install
npm run media:sync     # optional but recommended: fetch current PCam product media
npm run media:hash     # SHA-256 manifest for exact deduplication
npm run dev
```

Before a release:

```bash
npm run check
npm run build
npm run preview
```

Commit the intended version to local Git. Publishing is deliberately separate:

```bash
npm run deploy:staging
npm run deploy:production
```

The deploy scripts reject a dirty Git tree. **Agents must not deploy unless the user explicitly asks them to publish.** See `AGENTS.md` / `CLAUDE.md`.

## Media sync

The current PCam product images are streamed from legacy `/images/Module...` routes and require a permitted Referer/User-Agent. The manifest is `src/data/media.json`.

```bash
npm run media:sync
# or selected products only
node scripts/sync-legacy-media.mjs pcammes pcamrobocube pcamgantry
```

The script performs GET requests only and writes downloaded files into this local repository. It does not modify WordPress or SQL. Once the media migration is finalized, set `PUBLIC_MEDIA_BASE_URL` (see `.env.example`) to a Cloudflare custom media domain backed by R2/Images/static assets without rewriting product copy.

## Cloudflare target

The current prototype is static, so it can deploy as Cloudflare Workers static assets from `dist/` using `wrangler.jsonc`. Dynamic server routes are intentionally deferred until SQL/auth/license/download integration is designed. Videos remain on Cloudflare Stream.

Future large images/documents can move to R2/Cloudflare Images while the application keeps stable logical asset references.

## Project structure

```text
src/
  components/       reusable Astro components + React island
  data/             products, customer evidence, media and video maps
  lib/              routing helpers
  pages/[lang]/     locale-prefixed route tree
  styles/           responsive design system
scripts/
  sync-legacy-media.mjs
  audit-project.mjs
  generate-sitemap.mjs
  verify-clean-git.mjs
public/
  brand/
  media/
```

## Content provenance

See `CONTENT_SOURCES.md` and `INGEST_REPORT.md`. Product claims, selected specifications and customer quotations are based on the current English PCam website. The information architecture and editorial framing are newly written for this redesign.

## Generation-environment note

The container used to create this prototype could reach web content through research/download tools but its npm registry path did not expose Astro packages. `npm install` therefore could not be completed here. The project includes a dependency-light standard Astro setup and local source audit; the first `npm install` on the user's workstation should generate `package-lock.json`, which should then be committed to local Git.
