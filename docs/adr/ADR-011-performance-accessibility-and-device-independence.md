# ADR-011 — Performance, accessibility and responsive behavior are baseline requirements

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** Performance budget; accessibility; responsive behaviour

---

## 1. Context and Problem

The website must work reliably for prospects and customers on desktops,
tablets and phones, across variable network conditions. A modern visual design
that performs poorly, requires excessive JavaScript or becomes difficult to use
on touch/keyboard devices would undermine both sales and customer
satisfaction.

---

## 2. Decision

Performance, accessibility and responsive behavior are acceptance criteria,
not later optimization phases.

Animations or visual effects must not interfere with reading technical content
or operating the interface.

---

## 3. Alternatives Considered

- **Treat performance and accessibility as a post-launch optimization
  phase.** Rejected: §1 ties both directly to sales and customer satisfaction,
  and retrofitting them typically forces layout and markup rework.
- **Fixed desktop breakpoints only.** Rejected by §5 rule 6 in favour of
  content-driven responsive layouts.

---

## 4. Rationale

Both properties are cheap to hold and expensive to retrofit, because each
depends on markup and layout decisions made at authoring time. Making them
acceptance criteria means a visually appealing but inaccessible or slow page
does not ship and then wait for a cleanup phase that may not come.

---

## 5. Binding Rules

1. Semantic HTML and a logical heading hierarchy.
2. Keyboard-operable navigation and interactive controls.
3. Meaningful focus states.
4. Sufficient contrast; state must not be conveyed by colour alone.
5. Respect reduced-motion preferences where animation is used.
6. Responsive layouts designed for content, not fixed desktop breakpoints
   only. No horizontal page overflow at any supported viewport width.
7. Images sized and encoded appropriately, lazy-loaded where suitable.
8. Minimal client JavaScript by default.
9. No essential public content hidden behind client-side rendering.
10. Forms and future authenticated tools must provide clear validation and
    error states.

---

## 6. Consequences

Design decisions are judged on clarity and robustness as well as visual appeal.
React islands and media must justify their performance cost.

---

## 7. Future Evolution

Revisit to attach measurable budgets — the current rules are qualitative, so
"performs poorly" is not yet testable in CI. Adding numeric thresholds (payload
budgets, Core Web Vitals targets, a contrast-audit gate) is the natural next
step and does not require superseding this ADR.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.
The measurable budgets in §7 are an open input.

---

## References

- [ADR-004](ADR-004-astro-static-first-react-islands.md) — JavaScript budget and island policy
- [ADR-010](ADR-010-real-media-provenance-and-deduplication.md) — media weight
- [ADR-007](ADR-007-engineering-credibility-editorial-policy.md) — depth must stay scannable
