---
name: adr-authoring
description: Writing a NEW PCam ADR, amending an existing one, accepting or superseding one, and the full propagation checklist (master index, digest, adr-index.json, history files). Use whenever authoring or changing an ADR, or when a requested change conflicts with one and needs a superseding record. For READING/navigating existing ADRs use adr-lookup instead. Rule of thumb: an ADR change that skips master-index, digest or index-json propagation is incomplete.
---

# Authoring and amending PCam ADRs

## Format

Use the eight-section template in
[`docs/adr/ADR-TEMPLATE.md`](../../../docs/adr/ADR-TEMPLATE.md): Context and
Problem, Decision, Alternatives Considered, Rationale, Binding Rules,
Consequences, Future Evolution, Decision Status — then a `## References`
section. **All eight numbered sections are mandatory** and the validator
enforces their presence.

A new ADR has no `## Amendments` end-matter; that appears with its first
amendment.

- **File naming.** `docs/adr/ADR-NNN-lowercase-kebab.md`, three-digit,
  next free number after the highest in `ADR-MASTER.md`.
- **Tone.** Concise, technical, English. Same editorial standard as the site
  itself (ADR-007): no buzzwords, no fabricated precision.
- **Section numbers are permanent.** When amending, tombstone a withdrawn rule
  and take a fresh number for a new one; never renumber, because other
  documents cite `ADR-NNN §5 rule 2`.

## Status honesty

Mark status truthfully — `Proposed`, `Accepted`, `Superseded (→ ADR-NNN)`,
`Deprecated`. **Do not mark an ADR `Accepted` that the user has not explicitly
accepted.** The existing twelve were all written as `Accepted` without a
recorded acceptance and had to be reverted to `Proposed`; do not recreate that
problem.

The `**Status:**` value must begin with exactly one canonical lifecycle word so
tooling can key on it. A short parenthetical qualifier may follow
(`Proposed (parameters deferred)`); never multi-sentence prose.

## No invented details

If a fact, constraint, or trade-off was not supplied, do not invent it. State
the missing input as an explicit assumption in §1 or §4, note it in §8 as an
open input, and surface it in the chat reply so the user can confirm or
correct. This applies especially to §3 Alternatives Considered: if no
alternatives were recorded when the decision was taken, say so — do not
manufacture plausible-sounding rejected options.

## Propagation checklist — new ADR

In one commit series:

1. Write the ADR from the template.
2. Add its row to the `## ADR index` table in
   [`docs/adr/ADR-MASTER.md`](../../../docs/adr/ADR-MASTER.md).
3. Add its `### ADR-NNN — <title>` entry to `docs/adr/ADR-DIGEST.md`, and add
   its keyword row to the digest's lookup table.
4. Add its record to `docs/adr/adr-index.json` with `"amendments": 0`.
5. Run `npm run audit:adr` (also runs inside `npm run check`).
6. Put the decision's rationale in the **commit body** — git is the change
   record; there is no changelog.

## Propagation checklist — amendment

A triple, in one commit series:

1. Edit the §1–§8 body in place so it reads current.
2. Append a note to `docs/adr/history/ADR-NNN-amendments.md` with heading
   grammar `### Amendment YYYY-MM-DD — <title>`.
3. Add the row to the ADR's `## Amendments` log table repeating that
   `(date, title)` verbatim, and bump `amendments` in `adr-index.json`.

Amendment notes never live in the main ADR file — the validator rejects an
`### Amendment` heading there.

## Accepting a proposed ADR

Flip all three together in one commit: the `**Status:**` header, the
`ADR-MASTER.md` index row, and `status` in `adr-index.json`. The validator
fails on any partial flip. Record who accepted it and why in the commit body.

## Superseding

A re-decision is a **new** ADR, never an edit to the old decision. Set the old
ADR's status to `Superseded (→ ADR-NNN)` in all three places, and reference the
superseded ADR from the new one's `## References`.

## No categorization

This project deliberately has no ADR clusters and no "core pillars" grouping —
with twelve records a flat index is navigable, and each grouping layer is
another thing that can drift. Do not add one.
