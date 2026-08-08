# ADR-002 — Redesign the experience; do not reproduce WordPress 1:1

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** Migration strategy; content structure; legacy URLs

---

## 1. Context and Problem

The current WordPress Multisite accumulated product pages, shortcodes, theme
conventions, support functions, SQL-backed layouts and language
inconsistencies over time. Recreating the same structure in Astro would
preserve historical implementation constraints rather than solve the site's
current business problems.

Legacy URLs can be preserved through redirects after the target information
architecture is stable, so URL continuity does not require structural
continuity.

---

## 2. Decision

The English site is the first redesigned canonical experience. Content from
the existing English site is source material, not a page-by-page migration
specification.

The redesign may:

- merge multiple legacy pages into a stronger canonical page;
- split an overloaded page into distinct buyer or support journeys;
- rewrite headings and structure while preserving factual meaning;
- promote useful engineering material into Knowledge/Application pages;
- demote obsolete or low-value pages;
- create new pages where the existing site does not adequately explain the
  solution.

Legacy `en.pcam.com` URLs will later receive explicit 301 mappings to the new
canonical pages. URL preservation must not force the new site to inherit the
legacy information architecture.

---

## 3. Alternatives Considered

- **1:1 page-for-page migration.** Rejected: it would carry historical
  implementation constraints into the new stack and lock in the information
  architecture that ADR-001 identifies as ineffective.
- **Preserve legacy URLs by preserving legacy structure.** Rejected: §1
  establishes that redirects decouple the two, so structural continuity buys
  nothing that a 301 map does not.

---

## 4. Rationale

Separating *content as source material* from *structure as a decision* is what
lets the redesign serve ADR-001's outcomes. Deferring the redirect map until
the target IA is stable avoids mapping to URLs that are still moving.

---

## 5. Binding Rules

1. Do not delete factual product capabilities merely because a page is being
   consolidated.
2. Preserve provenance so statements can be traced to source material.
3. Do not invent specifications, compatibility, results or customer claims
   while rewriting.
4. Redirect mapping is a migration workstream, not a reason to keep poor new
   URLs.
5. Legacy content is source material; it does not by itself justify a page in
   the new IA.

---

## 6. Consequences

The migration is partly editorial and product-design work, not only code
conversion. Content review and redirect mapping remain required before final
cutover.

---

## 7. Future Evolution

Revisit when the target IA stabilises and the 301 map is authored — that map
becomes the artifact this ADR defers, and its existence may warrant its own
ADR if it constrains future URL changes.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.

---

## References

- [ADR-001](ADR-001-business-outcomes-first.md) — business purpose the redesign serves
- [ADR-003](ADR-003-seo-first-multilingual-information-architecture.md) — target URL model
- [ADR-010](ADR-010-real-media-provenance-and-deduplication.md) — media provenance during migration
- `CONTENT_SOURCES.md`, `MIGRATION_NOTES.md`
