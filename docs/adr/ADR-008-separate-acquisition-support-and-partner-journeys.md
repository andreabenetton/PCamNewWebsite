# ADR-008 — Separate prospect, customer-support and partner journeys

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** Navigation; audience separation; partner area

---

## 1. Context and Problem

Prospects, existing customers and partners arrive with different intent. Mixing
product marketing, manuals, license renewal, downloads and partner resources in
the same primary navigation increases cognitive load and makes each audience
work harder.

---

## 2. Decision

The site has three distinct experience layers.

### 2.1 Public acquisition

Primary journey for prospects:

`Solutions -> Applications -> Products / Customer Stories / Knowledge -> Contact or Demo`

### 2.2 Existing-customer support

A task-oriented support area containing or eventually connecting: support
contact/tickets; manuals; downloads; release notes; licenses; technical
requirements.

Support pages must optimize task completion rather than cross-selling.

### 2.3 Partner area

A dedicated partner experience is planned. In the current prototype it is a
mockup only. Future capabilities may include authenticated access to documents,
sales material, technical resources, price information, training or
partner-specific support.

The mock must not pretend that authentication or protected data is already
implemented.

---

## 3. Alternatives Considered

- **One unified navigation for all audiences.** Rejected: it is the legacy
  arrangement and forces each audience through another's journey.
- **Cross-selling inside support pages.** Rejected by §2.2: it trades customer
  task completion for acquisition surface.

---

## 4. Rationale

Intent differs so sharply between the three audiences that a shared navigation
optimizes for none of them. Separating the layers now also places the future
authentication boundary at an edge that already exists, so introducing it later
does not restructure the public site.

---

## 5. Binding Rules

1. Keep the three layers navigationally distinct.
2. Support pages optimize task completion, not cross-selling.
3. The partner area must not imply that authentication or protected data
   exists while it is a mock.
4. The partner mock stays `noindex` while non-functional.
5. Future authentication is introduced behind the Support/Partner boundary,
   without restructuring public acquisition.

---

## 6. Consequences

Navigation becomes simpler and audience intent becomes clearer. Future
authentication can be introduced behind Support/Partner boundaries without
restructuring the public acquisition site.

---

## 7. Future Evolution

Revisit when authentication is actually implemented: §2.3's "mockup only"
constraint expires at that point, and the partner area's real capabilities will
need their own decision record alongside ADR-009's boundary work.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.

---

## References

- [ADR-001](ADR-001-business-outcomes-first.md) — the two business outcomes
- [ADR-003](ADR-003-seo-first-multilingual-information-architecture.md) — public IA
- [ADR-009](ADR-009-integration-boundaries-before-live-data.md) — auth and data boundaries
