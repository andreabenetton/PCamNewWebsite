# ADR 0000 — Decision governance for humans and coding agents

- **Status:** Accepted
- **Date:** 2026-08-08

## Context

The PCam website will be maintained locally with tools such as Codex or Claude Code. These agents are effective at implementation but can unintentionally drift architecture or editorial intent when optimizing a local task. The project therefore needs durable reasoning in the repository, not only instructions in a chat history.

## Decision

Architecture Decision Records are the durable source for major project decisions.

Before changing any of the following, a human or agent must read the relevant ADRs:

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

## Agent guardrails

- Do not silently violate an accepted ADR.
- If a requested implementation appears to conflict with an ADR, state the conflict and propose a superseding ADR.
- Do not create an ADR for trivial code choices.
- Record the reason for a major change, not merely the chosen technology.
- Prefer reversible implementation details inside the boundaries established by these ADRs.

## Consequences

The repository carries both code and rationale. Future changes may take slightly longer to initiate, but structural drift and accidental rewrites become much less likely.
