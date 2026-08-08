---
name: adr-lookup
description: Reading and navigating the PCam ADRs — find which decisions govern the area you are about to change, cheaply, without opening all twelve files. Use BEFORE changing information architecture, public URLs or routing, the rendering model, React usage, the deployment model, editorial policy, media architecture, or integration/authentication boundaries. For WRITING or AMENDING an ADR use adr-authoring instead.
---

# Reading PCam ADRs

## Order of operations

1. **Open [`docs/adr/ADR-DIGEST.md`](../../../docs/adr/ADR-DIGEST.md) first.**
   It has a keyword→ADR table and one current-state summary per ADR with
   §-citations. For most tasks the digest plus the repository-root `CLAUDE.md`
   is enough to implement correctly.
2. **Open the full ADR** only when your change touches that area's substance,
   or when the digest entry flags nuance you need.
3. **Never** read all twelve ADRs to answer one question — that is what the
   digest exists to prevent.

## Current status — read this before citing an ADR as a constraint

**All twelve ADRs are `Proposed`.** None is binding yet. Cite them as the
intended direction under review, and do not tell the user that something
"violates an accepted ADR" — nothing is accepted. If a change conflicts with a
proposed ADR, say so as a flag, not as a blocker.

## Authority order

1. Repository-root `CLAUDE.md` — current operating instructions.
2. ADRs — architectural and editorial intent.
3. `ADR-DIGEST.md` — navigation aid, non-normative. On any discrepancy the ADR
   wins and the digest gets fixed.

Existing code is not a source of truth when it conflicts with an accepted ADR.

## Citing

Cite as `ADR-NNN §5 rule 2` — section numbers are permanent, so a citation
stays valid across amendments. ADR bodies always read current; the evolution
narrative lives in `docs/adr/history/`, which you load only for history
research.

## When your change conflicts with an ADR

Do not silently implement against it and do not silently abandon the user's
request. State the conflict, name the ADR and rule, and offer the choice:
implement within the ADR, or record a superseding ADR (see `adr-authoring`).
