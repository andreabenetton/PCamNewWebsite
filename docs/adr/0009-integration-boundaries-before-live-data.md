# ADR 0009 — Keep SQL/auth/license/download integrations behind explicit boundaries

- **Status:** Accepted
- **Date:** 2026-08-08

## Context

The current system includes MS SQL-backed product/history/reference data, BLOB media, WordPress user-dependent queries, protected pages, Ninja Forms and SOAP-based license functions. The redesign prototype intentionally starts without these live integrations so the information architecture and experience can be evaluated independently.

Directly embedding legacy SQL or WordPress conventions into Astro pages would create a new form of tight coupling.

## Decision

Live data and protected functions must be introduced through explicit service boundaries.

The frontend should consume stable, typed application interfaces rather than:

- raw SQL snippets;
- WordPress Shortcoder content;
- direct database credentials;
- hidden WordPress session assumptions;
- legacy PHP rendering output.

Future integration layers may provide:

- product/reference/history APIs;
- media resolution;
- authentication/identity mapping;
- licenses;
- downloads;
- tickets/support data.

The first static prototype may use source-backed content and clearly labeled mocks for functions not yet connected.

## Guardrails

- Never expose SQL/SOAP credentials to the browser.
- Parameterize database queries.
- Validate upstream responses at service boundaries.
- Define timeout, cache and error behavior per endpoint.
- Do not make the public page tree depend on a specific backend implementation.
- Treat authenticated/customer-specific data as a separate security design.

## Consequences

The frontend can be redesigned and tested before backend migration is complete. Legacy services can be replaced incrementally without rewriting editorial pages.
