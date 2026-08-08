# ADR-XXX — <Title>

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Superseded (→ ADR-XXX) | Deprecated
**Decision Makers:** <names/role>
**Scope:** <area>

<!-- Status field convention — see §8. The value MUST begin with exactly one
canonical lifecycle word (Proposed | Accepted | Superseded (→ ADR-NNN) |
Deprecated) so tooling can key on it. A short parenthetical qualifier MAY
follow (e.g. `Accepted (mechanism)`); never multi-sentence prose. -->

---

## 1. Context and Problem
Describe the situation and the problem that requires a decision.
Include product constraints and risks, but avoid implementation detail.

---

## 2. Decision
State the decision clearly and unambiguously.
If needed, structure into sub-decisions (2.1, 2.2...).

---

## 3. Alternatives Considered
Enumerate viable alternatives and why they were rejected or deferred.
If none were recorded when the decision was taken, say so explicitly —
do not invent alternatives to fill the section.

---

## 4. Rationale
Explain why the decision was made, including guiding principles and trade-offs.

---

## 5. Binding Rules
List the high-level rules derived from the decision, numbered so other
documents can cite them (`ADR-XXX §5 rule N`). Keep them architectural;
avoid component names, CSS selectors and other implementation detail.

---

## 6. Consequences
Describe positive and negative consequences, and accepted trade-offs.

---

## 7. Future Evolution
Define triggers for revisiting this ADR and how changes must be introduced.

---

## 8. Decision Status
State whether the ADR is binding and how changes are handled.

**Status field convention (binding for every ADR).** The header
`**Status:**` value MUST begin with exactly one canonical lifecycle state —
`Proposed`, `Accepted`, `Superseded (→ ADR-NNN)`, or `Deprecated` — so tooling
and other ADRs can key on the leading token. A short single-clause
parenthetical qualifier MAY follow the canonical word, mirroring the
`Superseded (→ ADR-NNN)` form (e.g. `Accepted (mechanism)`,
`Proposed (parameters deferred)`). Do NOT put multi-sentence prose in the
Status field: extended rationale — deferred parameters, waived obligations —
belongs in this section and in the `## Amendments` end-matter / history file.
The ADR-MASTER `## ADR index` Status column holds the **bare canonical word
only** (plus the `(→ ADR-NNN)` pointer when Superseded); per-ADR nuance lives
in the ADR header parenthetical and the amendment-log table, never in the
index column.

---

## References
List related ADRs and authoritative sources.

---

## Amendments

<!-- End-matter for AMENDED ADRs only. Omit this whole section until the
first amendment. Always the LAST top-level section, holding ONLY the
pointer paragraph and the log table. Amending an ADR is a triple, one
commit series: (1) edit the §1–§8 body in place so it reads current
(§-numbers are permanent — tombstone withdrawn rules, take fresh numbers
for new ones); (2) append a full date-keyed note to
docs/adr/history/ADR-XXX-amendments.md with heading grammar
`### Amendment YYYY-MM-DD — <title>`, describing what changed and why;
(3) add the table row below. A `(ii)`/`(iii)` suffix is added ONLY when
two headings would otherwise be byte-identical — same-day amendments with
distinct titles share the date and need none. The row's identity is the
(date, title) pair: the Date cell uses the identical key and the Amendment
cell carries the title verbatim, so the validator can reconcile every row
against its note. -->

Amended N×; the body above reads current. Evolution notes:
[history/ADR-XXX-amendments.md](history/ADR-XXX-amendments.md).
When/why: `git log --follow docs/adr/history/ADR-XXX-amendments.md`.

| Date | Amendment | Effect |
|---|---|---|
| YYYY-MM-DD | <title, verbatim from the history heading> | <one-line effect> |
