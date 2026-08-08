# validate_adr_index

Validates `docs/adr/adr-index.json` — the machine-readable ADR index —
against the ADR files, the per-ADR amendment-history files under
`docs/adr/history/`, `ADR-DIGEST.md` and `ADR-MASTER.md`, so the
agent-navigation layer cannot drift from the ADR set.

```sh
node tools/validate_adr_index/validate.js
```

It also runs as part of `npm run check`.

## Checks

- one index entry per `ADR-NNN-*.md` and vice versa
  (`missing-index-entry`, `orphan-index-entry`);
- contiguous, unique numbers from 0 (`duplicate-number`,
  `non-contiguous-number`), and the filename number matches the entry
  (`number-filename-mismatch`);
- `title` / `status` / `date` match the ADR headers (`title-mismatch`,
  `status-mismatch`, `date-mismatch`, plus `*-unparsed` when a header is
  missing or malformed);
- the `**Status:**` value begins with a canonical lifecycle word —
  `Proposed`, `Accepted`, `Superseded`, `Deprecated`
  (`status-not-canonical`);
- all eight numbered template sections are present (`missing-section`);
- amendment bookkeeping: `amendments` matches the `### Amendment ` heading
  count in `history/ADR-NNN-amendments.md` (`amendments-mismatch`) and the
  ADR's amendment-log table rows (`amendment-log-mismatch`); the history
  file exists iff the count is positive (`history-file-missing`,
  `history-file-orphan`); no amendment heading appears in a main ADR file
  (`amendment-body-in-main`);
- every `ADR-NNN-<slug>.md` citation resolves to a file on disk
  (`broken-adr-file-reference`);
- every ADR has a `### ADR-NNN — …` entry in `ADR-DIGEST.md`
  (`missing-digest-entry`) and a row in `ADR-MASTER.md`
  (`missing-master-row`).

This project does not categorize ADRs, so there are no cluster or pillar
checks.

When it fails after you add an ADR or an amendment, follow the propagation
checklist in [`docs/adr/ADR-MASTER.md`](../../docs/adr/ADR-MASTER.md).
