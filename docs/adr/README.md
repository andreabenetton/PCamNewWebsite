# PCam Architecture Decision Records

These ADRs preserve the reasoning behind the PCam website redesign so that
future maintainers and coding agents do not optimize isolated details at the
expense of the overall product strategy.

**Start here:**

| File | Purpose |
|---|---|
| [`ADR-DIGEST.md`](ADR-DIGEST.md) | **Read this first.** Keyword lookup + one current-state summary per ADR. Enough context for most tasks. |
| [`ADR-MASTER.md`](ADR-MASTER.md) | Governance: lifecycle, when to write an ADR, the propagation checklist, and the ADR index. |
| [`ADR-TEMPLATE.md`](ADR-TEMPLATE.md) | The canonical eight-section format every ADR uses. |
| [`adr-index.json`](adr-index.json) | Machine-readable index, kept honest by `node tools/validate_adr_index/validate.js`. |
| `history/` | Per-ADR amendment notes. Created with an ADR's first amendment. |

**Current state: all twelve ADRs are `Proposed`, so none is binding yet.**
They were drafted 2026-08-08 marked `Accepted`, but no acceptance was
recorded; converting them to the canonical template returned them to
`Proposed`. See [`ADR-MASTER.md`](ADR-MASTER.md) for how to accept them.

Accepted ADRs are constraints, not suggestions. A change that intentionally
contradicts one requires a new ADR that explicitly supersedes it — do not
silently reinterpret an ADR because an implementation shortcut is convenient.
