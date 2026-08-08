# ADR-006 — Local Git is source of truth; deployment is explicit

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** Operating workflow; release control; agent authority

---

## 1. Context and Problem

The intended operating workflow is that the user runs Codex or Claude Code on a
local workstation, reviews changes locally, and publishes only after explicit
approval. Git on that workstation keeps the version history and rollback
points.

This differs from workflows where a hosting dashboard or an automatic
push-to-production pipeline is treated as the primary state.

---

## 2. Decision

The local Git repository is the source of truth for code, content,
configuration and version history.

Normal workflow:

1. agent edits locally;
2. user reviews with `npm run dev`;
3. checks/build run locally;
4. intended revision is committed to Git;
5. user explicitly requests staging or production deployment;
6. deployment is performed from a clean, known Git state.

No agent may deploy merely because a build succeeded or a commit exists.

Cloudflare dashboard edits must not substitute for repository changes, except
for secrets or infrastructure settings that cannot appropriately live in Git.

---

## 3. Alternatives Considered

- **Push-to-deploy CI on every commit.** Rejected: it makes committing and
  publishing the same act, removing the review step in §2 step 5.
- **Hosting dashboard as primary state.** Rejected: configuration would live
  outside version control, breaking rollback.

---

## 4. Rationale

Separating "committed" from "published" is what preserves the user's ability to
review and to roll back to any revision. Making deployment require an explicit
instruction — rather than inferring it from a green build — keeps release
authority with the user, which is the property an autonomous agent would
otherwise erode.

---

## 5. Binding Rules

1. Never publish without an explicit user instruction in the current task.
2. Never hide production-only edits outside Git.
3. Prefer small, reviewable commits.
4. Preserve the ability to roll back by checking out a previous commit/tag and
   redeploying.
5. Treat generated lockfiles and relevant deployment configuration as versioned
   project state.
6. Deploy only from a clean Git tree.

---

## 6. Consequences

The user controls releases and can inspect or reverse every website revision.
Deployment automation is deliberately subordinate to local review and Git
history.

---

## 7. Future Evolution

Revisit if a second maintainer or a staging-review workflow makes
per-deployment manual approval the bottleneck. Automating promotion to
*staging* while keeping production explicit would be the minimal change, and
requires a superseding ADR because §5 rule 1 covers both environments.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.

---

## References

- [ADR-005](ADR-005-cloudflare-native-target.md) — deployment target
- [ADR-000](ADR-000-decision-governance.md) — agent guardrails
- Repository-root `CLAUDE.md` — operating model and git discipline
- `scripts/verify-clean-git.mjs` — clean-tree enforcement
