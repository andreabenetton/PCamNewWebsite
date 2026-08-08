# ADR 0005 — Cloudflare is the production target for site, media and video

- **Status:** Accepted
- **Date:** 2026-08-08

## Context

The final PCam stack is intended to leave the WordPress runtime behind. Video has already been moved to Cloudflare Stream. Product images, documents and other assets will also be migrated to Cloudflare infrastructure. Dynamic integrations may later require server-side endpoints.

## Decision

Cloudflare is the target production platform:

- Astro static output / runtime: Cloudflare Workers or the appropriate Cloudflare static-assets deployment model;
- video: Cloudflare Stream;
- large files and documents: Cloudflare R2 where appropriate;
- image delivery/optimization: Cloudflare Images or CDN-backed static/R2 assets where justified;
- future server-side proxy/API functions: Cloudflare runtime when network reachability and security allow it.

Editorial content must refer to logical media identifiers or stable URLs so storage can move without rewriting page copy.

The current prototype may keep local assets under `public/media`, but that is a development convenience, not the final storage decision.

## Guardrails

- Do not couple page content to WordPress upload paths.
- Do not place secrets in client code or Git.
- Do not assume Cloudflare can directly reach private `sql01`; the final API/network topology must be designed separately.
- Do not re-upload Stream video merely to fit a new frontend architecture.

## Consequences

The website can be deployed independently of WordPress. Media and dynamic services remain replaceable behind stable application boundaries.
