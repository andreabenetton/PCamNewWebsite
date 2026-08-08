# ADR-003 — SEO-first multilingual information architecture under locale paths

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** URL model; information architecture; multilingual SEO

---

## 1. Context and Problem

PCam is multilingual and currently uses language subdomains. The redesign
begins in English, but the URL model and content architecture must not need to
be replaced when German, Italian, French, Spanish and Portuguese are added.

Search engines and users need stable canonical pages, explicit language
alternatives, and content that matches search intent rather than internal
product naming alone.

---

## 2. Decision

### 2.1 URL model

A single-domain locale path model:

- `/en/...`
- `/de/...`
- `/it/...`
- `/fr/...`
- `/es/...`
- `/pt/...`

English is implemented first. Other locales are reserved but must not be
published as empty or low-quality copies.

### 2.2 Public acquisition information architecture

Organized primarily around:

- **Solutions** — PCam engineering capabilities and solution families;
- **Applications** — manufacturing problems and desired operational outcomes;
- **Products** — detailed technical product information;
- **Customer Stories** — evidence and real-world outcomes;
- **Knowledge** — engineering explanation and domain expertise;
- **Company / Contact** — trust and conversion.

### 2.3 Per-locale obligations

Each locale will eventually have localized URLs where appropriate, canonical
URLs, hreflang relationships, localized titles/descriptions, and
language-specific content reviewed for meaning rather than mechanical string
substitution.

---

## 3. Alternatives Considered

- **Keep language subdomains** (`en.pcam.com`, `de.pcam.com`). Rejected:
  splits domain authority and makes hreflang and canonical management harder
  across a single editorial tree.
- **Publish all six locales at once.** Rejected as a quality risk: §2.1 forbids
  empty or machine-substituted locale trees, so locales ship when their content
  is reviewed.

---

## 4. Rationale

Choosing the locale-path model before the second language exists is what makes
it cheap; retrofitting it after translation would mean re-cutting every URL.
Organizing the IA around problems (Applications) as well as capabilities
(Solutions) follows from ADR-001: visitors arrive with a manufacturing problem,
not a product name.

---

## 5. Binding Rules

1. One strong canonical page per search intent is preferred over multiple
   near-duplicate pages.
2. Technical pages must answer substantive engineering questions, not exist
   only to target keywords.
3. Internal links should connect Applications, Solutions, Products, evidence
   and Knowledge contextually.
4. Structured data, sitemap and metadata are part of the page model, not
   post-launch additions.
5. A reserved locale must not be published as an empty or low-quality copy.
6. Locale prefixes are part of every public URL; do not introduce
   locale-less public routes.

---

## 6. Consequences

Legacy subdomain URLs require a later explicit 301 map. Translation is a
content workflow, not merely duplication of the English route tree.

---

## 7. Future Evolution

Revisit when the second locale is published — that is the first real test of
§2.3 — or if a market requires a country-specific domain, which the
single-domain model does not currently accommodate.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.

---

## References

- [ADR-002](ADR-002-not-a-one-to-one-wordpress-migration.md) — why legacy URLs do not constrain the IA
- [ADR-004](ADR-004-astro-static-first-react-islands.md) — Astro owns routing
- [ADR-008](ADR-008-separate-acquisition-support-and-partner-journeys.md) — journey separation within the IA
- `src/data/site.ts`, `astro.config.mjs` — implemented locale configuration
