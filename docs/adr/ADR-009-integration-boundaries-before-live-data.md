# ADR-009 — Keep SQL/auth/license/download integrations behind explicit boundaries

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** Integration architecture; security boundaries; data access

---

## 1. Context and Problem

The current system includes MS SQL-backed product/history/reference data, BLOB
media, WordPress user-dependent queries, protected pages, form handling and
SOAP-based license functions. The redesign prototype intentionally starts
without these live integrations so the information architecture and experience
can be evaluated independently.

Directly embedding legacy SQL or WordPress conventions into Astro pages would
create a new form of tight coupling.

---

## 2. Decision

Live data and protected functions must be introduced through explicit service
boundaries.

The frontend consumes stable, typed application interfaces rather than: raw SQL
snippets; WordPress shortcode content; direct database credentials; hidden
WordPress session assumptions; or legacy PHP rendering output.

Future integration layers may provide product/reference/history APIs; media
resolution; authentication/identity mapping; licenses; downloads; and
tickets/support data.

The first static prototype may use source-backed content and clearly labeled
mocks for functions not yet connected.

---

## 3. Alternatives Considered

- **Query SQL directly from page templates.** Rejected: reproduces the legacy
  coupling in a new stack and would expose credentials to the rendering layer.
- **Connect live integrations before the IA is settled.** Rejected: §1 makes
  independent evaluation of the experience the reason for deferring them.

---

## 4. Rationale

Deferring integration is only safe if the seam is defined in advance —
otherwise "later" becomes another tight coupling. Naming the boundary now lets
the frontend be redesigned and tested while the backend migration proceeds
independently, and keeps authenticated data inside its own security design
rather than inheriting WordPress session assumptions.

---

## 5. Binding Rules

1. Never expose SQL/SOAP credentials to the browser.
2. Parameterize database queries.
3. Validate upstream responses at service boundaries.
4. Define timeout, cache and error behavior per endpoint.
5. Do not make the public page tree depend on a specific backend
   implementation.
6. Treat authenticated/customer-specific data as a separate security design.
7. Label mocks clearly; a mock must not read as a working integration.

---

## 6. Consequences

The frontend can be redesigned and tested before backend migration is
complete. Legacy services can be replaced incrementally without rewriting
editorial pages.

---

## 7. Future Evolution

Revisit when the first live integration is connected — that is when §5 rules 3
and 4 stop being aspirational and need concrete per-endpoint definitions, and
when the network topology deferred by ADR-005 §5 rule 3 must be resolved.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.

---

## References

- [ADR-005](ADR-005-cloudflare-native-target.md) — runtime and network reachability
- [ADR-008](ADR-008-separate-acquisition-support-and-partner-journeys.md) — where authentication lands
- [ADR-004](ADR-004-astro-static-first-react-islands.md) — islands as integration consumers
