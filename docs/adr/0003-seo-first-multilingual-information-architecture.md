# ADR 0003 — SEO-first multilingual information architecture under locale paths

- **Status:** Accepted
- **Date:** 2026-08-08

## Context

PCam is multilingual and currently uses language subdomains. The redesign begins in English, but the URL model and content architecture must not need to be replaced when German, Italian, French, Spanish and Portuguese are added.

Search engines and users need stable canonical pages, explicit language alternatives and content that matches search intent rather than internal product naming alone.

## Decision

The target uses a single-domain locale path model:

- `/en/...`
- `/de/...`
- `/it/...`
- `/fr/...`
- `/es/...`
- `/pt/...`

English is implemented first. Other locales are reserved but must not be published as empty or low-quality copies.

The public acquisition information architecture is organized primarily around:

- **Solutions** — PCam engineering capabilities and solution families;
- **Applications** — manufacturing problems and desired operational outcomes;
- **Products** — detailed technical product information;
- **Customer Stories** — evidence and real-world outcomes;
- **Knowledge** — engineering explanation and domain expertise;
- **Company / Contact** — trust and conversion.

Each locale will eventually have:

- localized URLs where appropriate;
- canonical URLs;
- hreflang relationships;
- localized titles/descriptions;
- language-specific content reviewed for meaning, not mechanical string substitution.

## SEO principles

- One strong canonical page per search intent is preferred over multiple near-duplicate pages.
- Technical pages must answer substantive engineering questions, not exist only to target keywords.
- Internal links should connect Applications, Solutions, Products, evidence and Knowledge contextually.
- Structured data, sitemap and metadata are part of the page model, not post-launch additions.

## Consequences

Legacy subdomain URLs require a later explicit 301 map. Translation is a content workflow, not merely duplication of the English route tree.
