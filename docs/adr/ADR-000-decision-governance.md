# ADR-000 — Decision governance for humans and coding agents

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** Documentation governance; agent behaviour

---

## 1. Context and Problem

The PCam website is maintained locally with coding agents such as Codex or
Claude Code. These agents are effective at implementation but can
unintentionally drift architecture or editorial intent while optimizing a
local task. Instructions given in a chat history do not survive the session
that produced them.

The project therefore needs durable reasoning stored in the repository, not
only in conversation.

---

## 2. Decision

Architecture Decision Records are the durable source for major project
decisions.

Before changing any of the following, a human or agent must read the relevant
ADRs:

- information architecture;
- public URLs and multilingual routing;
- rendering architecture;
- React usage;
- Cloudflare deployment model;
- authentication or partner/customer areas;
- SQL/API integration boundaries;
- media storage or migration strategy;
- editorial positioning and page purpose.

An accepted ADR remains in force until a later ADR explicitly supersedes it.

---

## 3. Alternatives Considered

The original record did not enumerate alternatives. Two are implicit in §1 and
are recorded here as the options this decision rejects:

- **Keep decisions in chat history / task prompts only.** Rejected: reasoning
  does not survive the session, so each new agent re-derives or contradicts it.
- **Keep decisions only in `CLAUDE.md`.** Rejected: that file states current
  rules but not the reasoning or the superseding history behind them, so a
  rule cannot be revisited safely.

---

## 4. Rationale

Separating *rationale* (ADRs) from *current instructions* (`CLAUDE.md`) lets an
agent act on a short rule set while still being able to discover why the rule
exists before changing it. Requiring an explicit superseding ADR makes a
reversal a visible, reviewable act rather than a silent edit.

---

## 5. Binding Rules

1. Do not silently violate an accepted ADR.
2. If a requested implementation appears to conflict with an ADR, state the
   conflict and propose a superseding ADR before implementing.
3. Do not create an ADR for trivial code choices.
4. Record the reason for a major change, not merely the chosen technology.
5. Prefer reversible implementation details inside the boundaries established
   by these ADRs.
6. An accepted ADR stays in force until explicitly superseded by a later ADR.

---

## 6. Consequences

The repository carries both code and rationale. Changes may take slightly
longer to initiate, but structural drift and accidental rewrites become much
less likely.

---

## 7. Future Evolution

Revisit when the set of governed areas in §2 no longer matches the project —
for example when authentication ships and its own boundaries need governing,
or when a second maintainer joins and review responsibilities need defining.
Changes are introduced by a superseding ADR, never by editing this one's
decision in place.

---

## 8. Decision Status

Proposed. Not yet binding. This ADR and the eleven that follow were converted
to the canonical template and returned to `Proposed` pending review; they were
previously marked `Accepted` without a recorded acceptance.

---

## References

- [ADR-MASTER.md](ADR-MASTER.md) — ADR lifecycle and index
- [ADR-TEMPLATE.md](ADR-TEMPLATE.md) — canonical format
- Repository-root `CLAUDE.md` — current operating instructions
