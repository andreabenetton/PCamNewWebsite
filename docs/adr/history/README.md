# ADR amendment history

One file per amended ADR: `ADR-NNN-amendments.md`. A file exists here **only**
once its ADR has been amended at least once — `adr-index.json` carries the
count, and the validator fails on either direction of mismatch
(`history-file-missing` / `history-file-orphan`).

ADR bodies read **current**: amendments are folded into §1–§8 in place, and the
narrative of how the decision evolved lives here. Load these files only when
researching history, not when implementing.

## Note format

```markdown
### Amendment YYYY-MM-DD — <title>

What changed, and why.
```

The `(date, title)` pair is the amendment's identity: the ADR's `## Amendments`
log-table row must repeat both verbatim so the two can be reconciled. Add a
`(ii)` / `(iii)` suffix only when two headings would otherwise be
byte-identical — same-day amendments with distinct titles need none.

Amending an ADR is a triple, in one commit series: edit the body, append the
note here, add the log row and bump `amendments` in `adr-index.json`. The
rationale goes in the commit body — git is the change record; there is no
changelog.
