# ADR 0010 — Prefer real PCam media; migrate with provenance and hash deduplication

- **Status:** Accepted
- **Date:** 2026-08-08

## Context

Engineering credibility depends heavily on real machines, cells, software screens, installations and demonstrations. Generic stock imagery would weaken the redesign. At the same time, WordPress Multisite and SQL/BLOB storage contain duplicated or differently named copies of media.

Video has already moved to Cloudflare Stream.

## Decision

Use real PCam media wherever usable and legally appropriate.

For migration:

- calculate SHA-256 on original binary content for exact deduplication;
- preserve a source URL/source identifier -> canonical asset map;
- keep provenance and editorial metadata separate from the physical file;
- use perceptual similarity only to flag possible near-duplicates for review, not for automatic deletion;
- avoid importing WordPress-generated thumbnails as independent canonical originals when a better source exists;
- preserve Cloudflare Stream UIDs and map them to editorial video records.

Product images currently obtained from SQL/BLOB/imagefetch mechanisms should ultimately be migrated to Cloudflare storage/CDN rather than forcing the new website to retain the legacy delivery path.

## Editorial implications

Alt text and captions are usage- and language-specific even when the underlying binary asset is shared across languages.

## Consequences

The media library becomes smaller and traceable while the site retains authentic engineering imagery. Future storage changes can occur behind the asset manifest without rewriting content.
