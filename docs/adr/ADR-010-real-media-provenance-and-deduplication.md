# ADR-010 — Prefer real PCam media; migrate with provenance and hash deduplication

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** Media architecture; asset migration; provenance

---

## 1. Context and Problem

Engineering credibility depends heavily on real machines, cells, software
screens, installations and demonstrations. Generic stock imagery would weaken
the redesign. At the same time, WordPress Multisite and SQL/BLOB storage
contain duplicated or differently named copies of media.

Video has already moved to Cloudflare Stream.

---

## 2. Decision

Use real PCam media wherever usable and legally appropriate.

For migration:

- calculate SHA-256 on original binary content for exact deduplication;
- preserve a source URL/source identifier -> canonical asset map;
- keep provenance and editorial metadata separate from the physical file;
- use perceptual similarity only to flag possible near-duplicates for review,
  not for automatic deletion;
- avoid importing WordPress-generated thumbnails as independent canonical
  originals when a better source exists;
- preserve Cloudflare Stream UIDs and map them to editorial video records.

Product images currently obtained from SQL/BLOB/imagefetch mechanisms should
ultimately be migrated to Cloudflare storage/CDN rather than forcing the new
website to retain the legacy delivery path.

---

## 3. Alternatives Considered

- **Generic stock imagery.** Rejected: it would undercut the engineering
  credibility ADR-007 depends on.
- **Automatic deletion of perceptual near-duplicates.** Rejected explicitly in
  §2: perceptual similarity flags candidates for human review only, because
  visually similar frames may be editorially distinct.
- **Importing WordPress thumbnails as canonical originals.** Rejected where a
  better source exists, to avoid locking in a downscaled derivative.

---

## 4. Rationale

Exact-hash deduplication is safe and mechanical; perceptual matching is not,
so the two are given different authority. Separating provenance from the binary
is what lets the same asset carry different alt text and captions per language
and per usage, and lets storage move without touching editorial copy.

---

## 5. Binding Rules

1. Prefer real PCam media over stock imagery.
2. Deduplicate on SHA-256 of original binary content only.
3. Perceptual similarity may flag near-duplicates for review; it must never
   trigger automatic deletion.
4. Maintain the source-identifier -> canonical-asset map.
5. Keep provenance and editorial metadata separate from the physical file.
6. Preserve Cloudflare Stream UIDs; do not re-upload video to suit the
   frontend.
7. Alt text and captions are usage- and language-specific even when the
   underlying binary asset is shared across languages.

---

## 6. Consequences

The media library becomes smaller and traceable while the site retains
authentic engineering imagery. Future storage changes can occur behind the
asset manifest without rewriting content.

---

## 7. Future Evolution

Revisit when assets actually move to R2/Images: the manifest indirection this
ADR mandates is what should absorb that change, and if it does not, the
manifest design needs revision rather than the editorial content.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.

---

## References

- [ADR-005](ADR-005-cloudflare-native-target.md) — target storage
- [ADR-007](ADR-007-engineering-credibility-editorial-policy.md) — why real media matters
- `src/data/media.json`, `src/data/videos.ts`, `scripts/hash-media.mjs`,
  `scripts/sync-legacy-media.mjs`
