# ADR 0002 — Redesign the experience; do not reproduce WordPress 1:1

- **Status:** Accepted
- **Date:** 2026-08-08

## Context

The current WordPress Multisite accumulated product pages, shortcodes, theme conventions, support functions, SQL-backed layouts and language inconsistencies over time. Recreating the same structure in Astro would preserve historical implementation constraints rather than solve the site's current business problems.

Legacy URLs can be preserved through redirects after the target information architecture is stable.

## Decision

The English site is the first redesigned canonical experience. Content from the existing English site is source material, not a page-by-page migration specification.

The redesign may:

- merge multiple legacy pages into a stronger canonical page;
- split an overloaded page into distinct buyer or support journeys;
- rewrite headings and structure while preserving factual meaning;
- promote useful engineering material into Knowledge/Application pages;
- demote obsolete or low-value pages;
- create new pages where the existing site does not adequately explain the solution.

Legacy `en.pcam.com` URLs will later receive explicit 301 mappings to the new canonical pages. URL preservation must not force the new site to inherit the legacy information architecture.

## Guardrails

- Do not delete factual product capabilities merely because a page is being consolidated.
- Preserve provenance so statements can be traced to source material.
- Do not invent specifications, compatibility, results or customer claims while rewriting.
- Redirect mapping is a migration workstream, not a reason to keep poor new URLs.

## Consequences

The migration is partly editorial/product design work, not only code conversion. Content review and redirect mapping remain required before final cutover.
