# ADR-007 — Editorial voice must demonstrate engineering mastery

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** Editorial policy; page structure; tone

---

## 1. Context and Problem

PCam sells engineering solutions for tool, mould and high-mix precision
manufacturing. Prospects must trust that PCam understands the production
system, machines, workflows, tooling, scheduling, measurement and automation
constraints — not merely that it sells software and robots.

The legacy site contains significant domain knowledge but often presents it as
product lists or generic marketing language.

---

## 2. Decision

Editorial content must demonstrate domain knowledge through precise
explanation, operational context and evidence.

Preferred structure for solution/product/application pages:

1. manufacturing problem or constraint;
2. why the problem occurs in real production;
3. engineering approach;
4. how PCam components interact;
5. interfaces/constraints/specifications that matter;
6. operational outcome;
7. evidence or relevant installation;
8. clear next action.

Voice: clear professional English aimed at engineers, manufacturing managers,
toolmakers and technical decision makers.

---

## 3. Alternatives Considered

- **Conventional short-form marketing copy.** Rejected: it cannot carry the
  cause/effect explanation that establishes domain credibility with this
  audience, and it is what the legacy site already does.
- **Publishing raw technical documentation.** Rejected implicitly by §6:
  depth must remain scannable and prioritized, not dumped as feature lists.

---

## 4. Rationale

For this buyer, technical depth *is* the sales argument — a page that explains
why a problem occurs demonstrates the understanding a prospect is evaluating.
Fixing a page structure makes that depth reviewable rather than dependent on an
individual writer's judgement.

---

## 5. Binding Rules

Prefer: concrete manufacturing terminology; cause/effect explanations; real
workflows; integration details; diagrams, real images and videos; measured or
source-backed results.

1. Avoid empty superlatives.
2. Avoid buzzword density.
3. Expand acronyms on first use.
4. Avoid claims that could apply to any industrial software vendor.
5. Never state fabricated precision or invented ROI numbers.
6. A page may be commercially persuasive without becoming vague.

---

## 6. Consequences

Some pages will be longer than generic marketing pages, but they must remain
scannable. Engineering detail should be structured, not dumped into
unprioritized feature lists.

---

## 7. Future Evolution

Revisit when translation begins: §2's voice guidance is written for English,
and ADR-003 §2.3 requires per-locale review for meaning. Whether this policy
transfers or needs per-locale editorial rules is an open question.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.

---

## References

- [ADR-001](ADR-001-business-outcomes-first.md) — business purpose the voice serves
- [ADR-002](ADR-002-not-a-one-to-one-wordpress-migration.md) — rewriting without inventing facts
- [ADR-010](ADR-010-real-media-provenance-and-deduplication.md) — real imagery as evidence
- `CONTENT_SOURCES.md` — claim traceability
