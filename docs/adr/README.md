# PCam Architecture Decision Records

These ADRs preserve the reasoning behind the PCam website redesign so that future maintainers and coding agents do not optimize isolated details at the expense of the overall product strategy.

## How to use these ADRs

- Read this index and the relevant ADRs before making structural changes.
- Accepted ADRs are constraints, not suggestions.
- A change that intentionally contradicts an accepted ADR requires a new ADR that explicitly **supersedes** it.
- Do not silently reinterpret an ADR because a framework feature, library, or implementation shortcut is convenient.
- Small implementation details do not need an ADR. Changes to business purpose, information architecture, rendering model, deployment model, content governance, media architecture, authentication boundaries, or multilingual SEO do.
- When a user explicitly changes a decision, record the new decision before or together with the code change.

## Decision index

| ADR | Decision | Status |
|---|---|---|
| [0000](0000-decision-governance.md) | Decision governance for humans and coding agents | Accepted |
| [0001](0001-business-outcomes-first.md) | The website exists to sell and to keep customers successful | Accepted |
| [0002](0002-not-a-one-to-one-wordpress-migration.md) | Redesign the experience; do not reproduce WordPress 1:1 | Accepted |
| [0003](0003-seo-first-multilingual-information-architecture.md) | SEO-first multilingual information architecture under locale paths | Accepted |
| [0004](0004-astro-static-first-react-islands.md) | Astro owns routing; static-first; React only for bounded islands | Accepted |
| [0005](0005-cloudflare-native-target.md) | Cloudflare is the production target for site, media and video | Accepted |
| [0006](0006-local-first-git-and-explicit-deploy.md) | Local Git is source of truth; deployment is explicit | Accepted |
| [0007](0007-engineering-credibility-editorial-policy.md) | Editorial voice must demonstrate engineering mastery | Accepted |
| [0008](0008-separate-acquisition-support-and-partner-journeys.md) | Separate prospect, customer-support and partner journeys | Accepted |
| [0009](0009-integration-boundaries-before-live-data.md) | Keep SQL/auth/license/download integrations behind explicit boundaries | Accepted |
| [0010](0010-real-media-provenance-and-deduplication.md) | Prefer real PCam media; migrate with provenance and hash deduplication | Accepted |
| [0011](0011-performance-accessibility-and-device-independence.md) | Performance, accessibility and responsive behavior are baseline requirements | Accepted |

## Core test for future decisions

When uncertain, ask these questions in order:

1. Does this help a qualified prospect understand why PCam is relevant and what to do next?
2. Does this help an existing customer complete a task with less friction?
3. Does this preserve or strengthen engineering credibility?
4. Does this keep content, URLs and media maintainable across languages?
5. Does this preserve a simple local development and Git rollback model?
6. Does this keep Cloudflare deployment and future integrations cleanly separated?

If the answer is no, the change probably needs a stronger justification or a new ADR.
