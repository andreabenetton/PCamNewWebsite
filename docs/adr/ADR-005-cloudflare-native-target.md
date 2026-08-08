# ADR-005 — Cloudflare is the production target for site, media and video

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** Hosting; media and video storage; runtime topology

---

## 1. Context and Problem

The final PCam stack is intended to leave the WordPress runtime behind. Video
has already been moved to Cloudflare Stream. Product images, documents and
other assets will also be migrated to Cloudflare infrastructure. Dynamic
integrations may later require server-side endpoints.

---

## 2. Decision

Cloudflare is the target production platform:

- Astro static output / runtime: Cloudflare Workers or the appropriate
  Cloudflare static-assets deployment model;
- video: Cloudflare Stream;
- large files and documents: Cloudflare R2 where appropriate;
- image delivery/optimization: Cloudflare Images or CDN-backed static/R2
  assets where justified;
- future server-side proxy/API functions: Cloudflare runtime when network
  reachability and security allow it.

Editorial content must refer to logical media identifiers or stable URLs so
storage can move without rewriting page copy.

The current prototype may keep local assets under `public/media`, but that is a
development convenience, not the final storage decision.

---

## 3. Alternatives Considered

The original record did not enumerate alternatives. Implicit in §1 is
**staying on the WordPress runtime**, rejected because the redesign's purpose
is to leave it; and **re-uploading Stream video to a new provider**, rejected
explicitly in §5 rule 4 as churn with no editorial benefit.

Other hosting platforms were not recorded as evaluated. This is an open input
to confirm before acceptance.

---

## 4. Rationale

Video already living in Stream anchors the choice: consolidating the remaining
assets on the same platform avoids a split delivery topology. Requiring
editorial content to reference logical identifiers rather than storage paths is
what keeps the storage decision reversible — the same requirement ADR-010
enforces through the asset manifest.

---

## 5. Binding Rules

1. Do not couple page content to WordPress upload paths.
2. Do not place secrets in client code or Git.
3. Do not assume Cloudflare can directly reach a private SQL host; the final
   API/network topology must be designed separately.
4. Do not re-upload Stream video merely to fit a new frontend architecture.
5. Editorial copy references logical media identifiers or stable URLs, never
   physical storage locations.

---

## 6. Consequences

The website can be deployed independently of WordPress. Media and dynamic
services remain replaceable behind stable application boundaries.

---

## 7. Future Evolution

Revisit when server-side functions are actually required — the reachability
question in §5 rule 3 is unresolved and will force a topology decision that
this ADR deliberately defers to ADR-009's boundary work.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.
The hosting alternatives noted in §3 are an open input.

---

## References

- [ADR-004](ADR-004-astro-static-first-react-islands.md) — what is deployed
- [ADR-006](ADR-006-local-first-git-and-explicit-deploy.md) — how deployment is triggered
- [ADR-009](ADR-009-integration-boundaries-before-live-data.md) — integration topology
- [ADR-010](ADR-010-real-media-provenance-and-deduplication.md) — media manifest
- `wrangler.jsonc`, `src/data/media.json`, `src/data/videos.ts`
