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

A locale prefix alone is not a multilingual content model. Equivalent pages may
need different localized slugs, while engineering facts, product identity and
customer evidence must remain traceable across every language. Coding agents
also need a deterministic way to detect when a source-language change has left
an existing translation stale without silently rewriting that translation.

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

Every translatable page or structured content record has a canonical identity
that does not depend on its localized slug. Static equivalents are resolved
through an explicit route map. Products and customer stories use canonical IDs
plus locale-specific copy and slugs.

Engineering/product facts and source customer evidence are stored separately
from localized editorial copy. Source-language copy is revisioned. For an
implemented non-source locale, `reviewedAgainstRevision` records the source
revision that a human explicitly reviewed; a newer source revision makes the
translation stale until that review happens.

Translation propagation is a human decision. When source-language content is
added or changed and equivalent content exists in other implemented locales,
the agent must propose concrete translations and ask which locales to update.
It must not write those translations automatically.

---

## 3. Alternatives Considered

- **Keep language subdomains** (`en.pcam.com`, `de.pcam.com`). Rejected:
  splits domain authority and makes hreflang and canonical management harder
  across a single editorial tree.
- **Publish all six locales at once.** Rejected as a quality risk: §2.1 forbids
  empty or machine-substituted locale trees, so locales ship when their content
  is reviewed.
- **Assume equivalent pages share the same slug and replace only `/en/`.**
  Rejected: translated search intent and terminology may require different
  slugs, and prefix substitution cannot express that identity safely.
- **Automatically translate every existing locale when the source changes.**
  Rejected: technical meaning, customer quotations, market terminology and SEO
  wording require explicit editorial review. Automation may propose a
  translation but may not decide to publish it.

---

## 4. Rationale

Choosing the locale-path model before the second language exists is what makes
it cheap; retrofitting it after translation would mean re-cutting every URL.
Organizing the IA around problems (Applications) as well as capabilities
(Solutions) follows from ADR-001: visitors arrive with a manufacturing problem,
not a product name.

Canonical identity separates "this is the same engineering concept" from "this
language uses the same words and slug". Separating facts from localized copy
prevents translation work from accidentally changing specifications or source
evidence. Revision metadata turns cross-language drift into an auditable state,
while requiring user approval keeps language quality an editorial decision.

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
7. Canonical page/product/story identity must be independent from a localized
   slug.
8. Resolve language equivalents through explicit route or content mappings;
   never invent a translated URL by replacing only the locale prefix.
9. Keep canonical engineering facts and reported customer evidence separate
   from localized editorial copy.
10. A source-copy update increments its revision. Existing translated copies
    remain stale until a human explicitly reviews them against that revision.
11. When equivalent content exists in other implemented locales, an agent must
    ask whether to propagate an addition or update and must include proposed
    translations in that request. It may change only locales explicitly
    approved by the user.
12. Preserve reported source quotations unchanged. Any translated quotation is
    a distinct localized representation linked to the same canonical evidence.

---

## 6. Consequences

Legacy subdomain URLs require a later explicit 301 map. Translation is a
content workflow, not merely duplication of the English route tree.

The repository carries more explicit multilingual state: canonical IDs, route
maps, locale copy, source revisions and review revisions. That adds small
editorial overhead but allows hreflang, sitemaps, localized slugs and agent
behaviour to be validated before deployment. A source change may deliberately
make `npm run audit:translations` fail until the user decides what should
happen in the other implemented languages.

---

## 7. Future Evolution

Revisit when the second locale is published — that is the first real test of
§2.3 — or if a market requires a country-specific domain, which the
single-domain model does not currently accommodate.

If some products or stories are legitimately market-specific, extend the
canonical content model with an explicit locale-availability decision rather
than weakening the missing-translation audit globally.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.

---

## References

- [ADR-002](ADR-002-not-a-one-to-one-wordpress-migration.md) — why legacy URLs do not constrain the IA
- [ADR-004](ADR-004-astro-static-first-react-islands.md) — Astro owns routing
- [ADR-007](ADR-007-engineering-credibility-editorial-policy.md) — translation must preserve engineering meaning
- [ADR-008](ADR-008-separate-acquisition-support-and-partner-journeys.md) — journey separation within the IA
- `src/data/i18n/`, `src/data/products/`, `src/data/stories/` — implemented multilingual content model

## Amendments

| Date | Title |
|---|---|
| 2026-08-08 | Canonical identities and reviewed translation propagation |
