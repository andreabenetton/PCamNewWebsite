# ADR Master Document

Status: active
Last updated: 2026-08-08

---

## Purpose

This document defines the **role, scope, and governance of ADRs**
(Architecture Decision Records) for the PCam website.

ADRs capture **architectural and editorial decisions and their rationale**
(the *why*). They do not define component APIs, CSS or runtime behaviour
(the *how*) — that lives in the code and in the repository-root `CLAUDE.md`.

---

## Authority order

1. **Repository-root `CLAUDE.md`** — current operating instructions. Binding
   on every session.
2. **ADRs** (`docs/adr/ADR-*.md`) — the source of truth for architectural and
   editorial intent.
3. **[`ADR-DIGEST.md`](ADR-DIGEST.md)** — navigation aid. Non-normative; on
   any discrepancy the ADR wins and the digest is fixed.

Existing code is not a source of truth when it conflicts with an accepted ADR.
If `CLAUDE.md` and an accepted ADR disagree, that is a defect: raise it and
resolve it explicitly rather than picking one silently.

---

## ADR lifecycle

| Status | Meaning |
|---|---|
| `Proposed` | Written and under review. **Not binding.** |
| `Accepted` | Binding until explicitly superseded. |
| `Superseded (→ ADR-NNN)` | Replaced; kept for the historical record. |
| `Deprecated` | No longer applies; not replaced. |

The `**Status:**` header value MUST begin with exactly one of those canonical
words so tooling can key on it (see [`ADR-TEMPLATE.md`](ADR-TEMPLATE.md) §8).
The Status column in the index below holds the **bare canonical word only**,
plus the `(→ ADR-NNN)` pointer when superseded.

A re-decision is a **new superseding ADR**, never an edit to the old decision.

---

## When to write an ADR

An ADR MUST be written when changing:

- business purpose or the role of a page class;
- information architecture, public URLs or multilingual routing;
- the rendering model or React usage;
- the deployment model or hosting target;
- content governance or editorial policy;
- media architecture or storage;
- authentication or integration boundaries.

An ADR is NOT needed for component structure, styling, copy edits within an
existing policy, or dependency bumps.

---

## Adding or amending an ADR

**New ADR** — in one commit series:

1. Copy [`ADR-TEMPLATE.md`](ADR-TEMPLATE.md); all eight numbered sections are
   mandatory. Omit the `## Amendments` end-matter until the first amendment.
2. Name the file `docs/adr/ADR-NNN-lowercase-kebab.md`, taking the next free
   number after the highest in the index below.
3. Add a row to the [ADR index](#adr-index).
4. Add an entry to [`ADR-DIGEST.md`](ADR-DIGEST.md) and a record to
   [`adr-index.json`](adr-index.json) with `"amendments": 0`.
5. Run `node tools/validate_adr_index/validate.js`.
6. Put the decision's rationale in the **commit body** — git is the change
   record; there is no changelog.

**Amendment** — a triple, in one commit series:

1. Edit the §1–§8 body in place so it reads current. Section numbers are
   permanent: tombstone a withdrawn rule, take a fresh number for a new one.
2. Append a note to `docs/adr/history/ADR-NNN-amendments.md` with heading
   grammar `### Amendment YYYY-MM-DD — <title>`.
3. Add the row to the ADR's `## Amendments` log table and bump `amendments`
   in `adr-index.json`.

---

## ADR index

| ADR | Decision | Status |
|---|---|---|
| [000](ADR-000-decision-governance.md) | Decision governance for humans and coding agents | Proposed |
| [001](ADR-001-business-outcomes-first.md) | The website exists to sell and to keep customers successful | Proposed |
| [002](ADR-002-not-a-one-to-one-wordpress-migration.md) | Redesign the experience; do not reproduce WordPress 1:1 | Proposed |
| [003](ADR-003-seo-first-multilingual-information-architecture.md) | SEO-first multilingual information architecture under locale paths | Proposed |
| [004](ADR-004-astro-static-first-react-islands.md) | Astro owns routing; static-first; React only for bounded islands | Proposed |
| [005](ADR-005-cloudflare-native-target.md) | Cloudflare is the production target for site, media and video | Proposed |
| [006](ADR-006-local-first-git-and-explicit-deploy.md) | Local Git is source of truth; deployment is explicit | Proposed |
| [007](ADR-007-engineering-credibility-editorial-policy.md) | Editorial voice must demonstrate engineering mastery | Proposed |
| [008](ADR-008-separate-acquisition-support-and-partner-journeys.md) | Separate prospect, customer-support and partner journeys | Proposed |
| [009](ADR-009-integration-boundaries-before-live-data.md) | Keep SQL/auth/license/download integrations behind explicit boundaries | Proposed |
| [010](ADR-010-real-media-provenance-and-deduplication.md) | Prefer real PCam media; migrate with provenance and hash deduplication | Proposed |
| [011](ADR-011-performance-accessibility-and-device-independence.md) | Performance, accessibility and responsive behavior are baseline requirements | Proposed |

**All twelve are `Proposed` and therefore not yet binding.** They were written
on 2026-08-08 marked `Accepted`, but no acceptance was recorded; they were
returned to `Proposed` when converted to the canonical template. Accepting them
is a deliberate act: flip the Status header, the index row and `adr-index.json`
together, in one commit.

---

## Notes on scope

This project deliberately does not use ADR clusters or a "core pillars"
grouping. With twelve records a flat index is navigable, and every additional
grouping layer is another thing that can drift from the ADR set.
