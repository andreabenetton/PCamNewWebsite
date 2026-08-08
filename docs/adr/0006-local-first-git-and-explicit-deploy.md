# ADR 0006 — Local Git is source of truth; deployment is explicit

- **Status:** Accepted
- **Date:** 2026-08-08

## Context

The intended operating workflow is that the user runs Codex or Claude Code on a local workstation, reviews changes locally, and publishes only after explicit approval. Git on that workstation keeps the version history and rollback points.

This differs from workflows where a hosting dashboard or automatic push-to-production pipeline is treated as the primary state.

## Decision

The local Git repository is the source of truth for code, content, configuration and version history.

Normal workflow:

1. agent edits locally;
2. user reviews with `npm run dev`;
3. checks/build run locally;
4. intended revision is committed to Git;
5. user explicitly requests staging or production deployment;
6. deployment is performed from a clean, known Git state.

No agent may deploy merely because a build succeeds or a commit exists.

Cloudflare dashboard edits must not substitute for repository changes, except for secrets or infrastructure settings that cannot appropriately live in Git.

## Guardrails for agents

- Never publish without an explicit user instruction in the current task.
- Never hide production-only edits outside Git.
- Prefer small, reviewable commits.
- Preserve the ability to roll back by checking out a previous commit/tag and redeploying.
- Treat generated lockfiles and relevant deployment configuration as versioned project state.

## Consequences

The user controls releases and can inspect or reverse every website revision. Deployment automation is deliberately subordinate to local review and Git history.
