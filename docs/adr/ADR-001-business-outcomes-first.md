# ADR-001 — The website exists to sell and to keep customers successful

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** Business purpose; page role; editorial direction

---

## 1. Context and Problem

A technically faithful migration can still preserve a website that is
ineffective. The purpose of pcam.com is not to reproduce WordPress content or
to showcase an internal product taxonomy. Its primary business purposes are to
create qualified commercial opportunities and to help existing customers
succeed with PCam solutions.

PCam sells complex engineering solutions. Visitors may arrive with a
manufacturing problem rather than knowledge of product names. Existing
customers arrive with different tasks: support, manuals, licenses, downloads,
tickets or release information.

---

## 2. Decision

Every public page must have a clear role in one or both of these outcomes:

1. **Acquire and convert qualified prospects.**
2. **Reduce friction and increase satisfaction for existing customers.**

The site must guide prospects through a sequence such as:

`problem -> solution -> engineering explanation -> evidence -> next action`

It must guide customers through task-oriented support journeys rather than
forcing them through marketing navigation.

Metrics such as page count, visual similarity to the old site, or quantity of
migrated content are not success criteria by themselves.

---

## 3. Alternatives Considered

The original record did not enumerate alternatives. The rejected option
implicit in §1 is a **migration-completeness objective** — treating page parity
with the WordPress site as the definition of success. It is rejected because it
optimizes for volume rather than for either business outcome, and it is the
assumption ADR-002 then acts on.

---

## 4. Rationale

Naming the two outcomes gives every later editorial and structural argument a
tiebreaker. A page that serves neither outcome has no defence, which is what
makes consolidation and demotion decisions possible without case-by-case
negotiation.

---

## 5. Binding Rules

1. Every public page must serve prospect acquisition, customer success, or
   both; a page serving neither is a candidate for merge or removal.
2. Lead with manufacturing problems and operational outcomes.
3. Explain why a solution works, not only what the product is called.
4. Use customer evidence, real installations and technical specifics to reduce
   perceived risk.
5. Make calls to action concrete: demo, discuss an automation project, review
   an application, access support.
6. Avoid generic claims such as "innovative", "state of the art" or
   "Industry 4.0" unless immediately supported by specific meaning or evidence.
7. Do not treat page count or visual similarity to the legacy site as a
   success criterion.

---

## 6. Consequences

Some legacy pages will be merged, rewritten, demoted or omitted. The new site
may contain fewer public pages than WordPress while providing more useful buyer
and customer journeys.

---

## 7. Future Evolution

Revisit if the business adds an audience whose journey fits neither outcome —
for example investor relations, recruitment at scale, or a self-service
e-commerce motion. Adding such an audience requires a superseding ADR, because
§5 rule 1 would otherwise force those pages out.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.

---

## References

- [ADR-002](ADR-002-not-a-one-to-one-wordpress-migration.md) — redesign rather than 1:1 migration
- [ADR-007](ADR-007-engineering-credibility-editorial-policy.md) — editorial voice
- [ADR-008](ADR-008-separate-acquisition-support-and-partner-journeys.md) — journey separation
- `CONTENT_SOURCES.md` — provenance for claims
