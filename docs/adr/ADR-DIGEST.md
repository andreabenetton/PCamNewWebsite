# ADR Digest — current-state summaries for fast navigation

**Status:** Informational (non-normative). This is the **cheapest correct
entry point** into the ADR set for a contributor or an automated session: one
compact, *currently-true* entry per ADR with its operative rules and
§-citations. It decides nothing — on any discrepancy the ADR wins, and this
digest is what gets fixed.

**How to use (read this before opening full ADRs):**

1. Look your topic up in the keyword table below.
2. Read the matching digest entries. For most tasks this plus the
   repository-root `CLAUDE.md` is enough context to implement correctly.
3. Open the **full ADR** only when your change touches its area's substance,
   or when the entry flags nuance you need.

**Maintenance:** every new ADR gets an entry here; every amendment updates its
entry. `node tools/validate_adr_index/validate.js` fails when an ADR is
missing from this file. Statuses here mirror the ADR headers.

**All twelve ADRs are currently `Proposed` — none is binding yet.** Treat them
as the intended direction under review, not as settled constraints.

Index and governance: [`ADR-MASTER.md`](ADR-MASTER.md). Format:
[`ADR-TEMPLATE.md`](ADR-TEMPLATE.md).

---

## Keyword → ADR lookup

| You are working on… | Read |
|---|---|
| writing/amending an ADR, ADR status, governance, agent guardrails | **ADR-000** (+ ADR-MASTER lifecycle) |
| page purpose, calls to action, whether a page should exist, marketing claims | **ADR-001** (+ ADR-007 voice) |
| migrating legacy content, consolidating/splitting pages, 301 redirect map | **ADR-002** |
| URLs, locales, hreflang, canonical, sitemap, navigation structure, SEO | **ADR-003** |
| routing, static vs server rendering, React islands, client-side JavaScript | **ADR-004** (+ ADR-011 budget) |
| hosting, Workers, R2, Cloudflare Images, Stream, where assets live | **ADR-005** |
| committing, branching, deploying, staging vs production, rollback | **ADR-006** |
| page copy, tone, technical depth, acronyms, ROI claims | **ADR-007** (+ ADR-001) |
| primary navigation, support area, partner area, authentication placement | **ADR-008** |
| SQL, SOAP licenses, downloads, forms, APIs, credentials, mocks | **ADR-009** |
| images, video, alt text, deduplication, provenance, media manifest | **ADR-010** |
| performance, accessibility, contrast, keyboard, responsive, overflow | **ADR-011** |

---

## Digest entries

### ADR-000 — Decision governance for humans and coding agents
*Proposed.* ADRs are the durable record of *why*; `CLAUDE.md` carries the
current *what*. Read the relevant ADRs before changing IA, URLs, rendering,
React usage, deployment, auth, integration boundaries, media strategy or
editorial positioning (§2). Never silently violate an ADR; state the conflict
and propose a superseding ADR instead (§5 rules 1–2). No ADR for trivial code
choices (§5 rule 3).

### ADR-001 — The website exists to sell and to keep customers successful
*Proposed.* Every public page must serve prospect acquisition, customer
success, or both — a page serving neither is a merge/removal candidate (§5
rule 1). Lead with manufacturing problems and outcomes; make CTAs concrete;
avoid unsupported "innovative"/"Industry 4.0" claims (§5 rules 2–6). Page count
and visual similarity to the legacy site are explicitly not success criteria
(§5 rule 7).

### ADR-002 — Redesign the experience; do not reproduce WordPress 1:1
*Proposed.* Legacy content is source material, not a migration spec (§2). Pages
may be merged, split, rewritten, promoted or demoted. Do not drop factual
capabilities during consolidation, and never invent specs or customer claims
(§5 rules 1–3). Legacy URLs get an explicit 301 map later; URL preservation
must not dictate the new IA (§5 rule 4).

### ADR-003 — SEO-first multilingual information architecture under locale paths
*Proposed.* Single domain, locale paths `/en/ /de/ /it/ /fr/ /es/ /pt/` (§2.1);
English first, other locales reserved and never published as empty or
low-quality copies (§5 rule 5). Public IA: Solutions, Applications, Products,
Customer Stories, Knowledge, Company/Contact (§2.2). One canonical page per
search intent; structured data, sitemap and metadata are part of the page
model, not post-launch work (§5 rules 1, 4). Every public URL carries a locale
prefix (§5 rule 6).

### ADR-004 — Astro owns routing; static-first; React only for bounded islands
*Proposed.* Astro owns routing; no client-side router may take it over (§5
rule 1). Prefer static generation; server-render only for genuine live-data or
auth needs (§5 rule 2). React only for bounded islands — filters,
configurators, interactive diagrams, authenticated widgets; heroes, product
and solution pages, stories, knowledge articles and stateless navigation stay
Astro/HTML (§2). Client JavaScript needs an interaction justification (§5
rule 4).

### ADR-005 — Cloudflare is the production target for site, media and video
*Proposed.* Workers/static assets for the site, Stream for video, R2 for large
files, Images or CDN-backed assets for delivery (§2). Editorial copy references
logical media identifiers, never physical storage paths (§5 rule 5). Do not
couple content to WordPress upload paths, never put secrets in client code or
Git, do not assume Cloudflare can reach a private SQL host, do not re-upload
Stream video (§5 rules 1–4). `public/media` is a prototype convenience, not the
final decision. Hosting alternatives were never recorded — open input (§3).

### ADR-006 — Local Git is source of truth; deployment is explicit
*Proposed.* Commit ≠ publish. Deploy only on an explicit user instruction in
the current task, and only from a clean tree (§5 rules 1, 6). Never hide
production-only edits outside Git; keep rollback possible by checking out a
previous revision and redeploying (§5 rules 2, 4). Dashboard edits do not
substitute for repository changes, except secrets (§2).

### ADR-007 — Editorial voice must demonstrate engineering mastery
*Proposed.* Page shape: problem → why it occurs → engineering approach →
component interaction → interfaces/specs → outcome → evidence → next action
(§2). Prefer concrete manufacturing terminology, cause/effect, real workflows,
source-backed results. Ban empty superlatives, buzzword density, unexpanded
acronyms, vendor-generic claims, and fabricated precision or ROI (§5 rules
1–5). Depth must stay scannable, not a feature dump (§6).

### ADR-008 — Separate prospect, customer-support and partner journeys
*Proposed.* Three navigationally distinct layers: public acquisition, support,
partner (§2). Support optimizes task completion, not cross-selling (§5 rule 2).
The partner area is a mock — it must not imply that authentication or protected
data exists, and stays `noindex` while non-functional (§5 rules 3–4). Auth
arrives behind the Support/Partner boundary without restructuring public pages
(§5 rule 5).

### ADR-009 — Keep SQL/auth/license/download integrations behind explicit boundaries
*Proposed.* The frontend consumes typed application interfaces, never raw SQL,
shortcodes, DB credentials, WordPress session assumptions or legacy PHP output
(§2). Never expose credentials to the browser; parameterize queries; validate
upstream responses; define timeout/cache/error behaviour per endpoint (§5 rules
1–4). Authenticated data is a separate security design (§5 rule 6). Mocks must
be clearly labelled (§5 rule 7).

### ADR-010 — Prefer real PCam media; migrate with provenance and hash deduplication
*Proposed.* Real PCam media over stock (§5 rule 1). Deduplicate on SHA-256 of
original binary content only; perceptual similarity may flag near-duplicates
for review but must never auto-delete (§5 rules 2–3). Maintain the
source-identifier → canonical-asset map and keep provenance separate from the
binary (§5 rules 4–5). Preserve Stream UIDs (§5 rule 6). Alt text and captions
are usage- and language-specific even when the binary is shared (§5 rule 7).

### ADR-011 — Performance, accessibility and responsive behavior are baseline requirements
*Proposed.* Acceptance criteria, not a later optimization phase (§2). Semantic
HTML, keyboard operability, meaningful focus, sufficient contrast, and **state
never conveyed by colour alone** (§5 rules 1–4). Respect reduced motion (§5
rule 5). Content-driven responsive layouts with **no horizontal page overflow
at any supported width** (§5 rule 6). Minimal client JS; no essential public
content behind client-side rendering (§5 rules 8–9). Budgets are still
qualitative — numeric thresholds are an open input (§7).
