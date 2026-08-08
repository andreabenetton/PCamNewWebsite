# ADR-003 amendment history

### Amendment 2026-08-08 — Canonical identities and reviewed translation propagation

The initial ADR chose locale-prefixed URLs and required reviewed localized
content, but it did not define how equivalent pages remain identifiable when
slugs differ or how an agent should handle updates after multiple languages
exist.

This amendment adds canonical route/content identity, separates source facts
from localized copy, and introduces revision-based translation review. A source
change may make existing translations stale, but an agent must propose target
translations and obtain explicit user approval before changing those locales.
It also records that customer source quotations remain canonical evidence and
translated quotations are separate localized representations.
