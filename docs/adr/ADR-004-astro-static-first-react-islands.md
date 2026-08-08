# ADR-004 — Astro owns routing; static-first; React only for bounded islands

**Date:** 2026-08-08
**Status:** Proposed
**Decision Makers:** Project owner
**Scope:** Rendering architecture; client-side JavaScript budget

---

## 1. Context and Problem

The public PCam site is primarily content, engineering explanation, product
discovery and customer evidence. Most pages do not need a client-side
application runtime. Some future experiences — filters, configurators,
authenticated tools, live downloads or license functions — will require
interactivity.

A React SPA would add client-side routing and JavaScript to the entire public
website. Astro provides server/static rendering with opt-in interactive
islands.

---

## 2. Decision

- Astro owns routing and page rendering.
- Stable editorial pages are statically generated whenever practical.
- Server rendering is introduced only for routes that genuinely require live
  server data or authentication.
- React is used only for bounded interactive islands.
- A client-side site router must not replace Astro routing inside the public
  site.
- Client-side JavaScript must be justified by user interaction, not framework
  convenience.

Appropriate React islands: product filters; rich selectors/configurators;
interactive diagrams; authenticated license/download widgets; live search or
account tools.

Must remain Astro/HTML: hero sections; product explanations; solution pages;
customer stories; knowledge articles; navigation that does not require
application state.

---

## 3. Alternatives Considered

- **React SPA for the whole public site.** Rejected: adds client-side routing
  and a JavaScript runtime cost to pages that are predominantly content,
  weakening initial HTML, SEO and resilience.
- **A client-side site router layered inside Astro.** Rejected for the same
  reason and because it would duplicate routing authority.

---

## 4. Rationale

The public site's value is content that must be indexable and fast on variable
networks (ADR-011). Making interactivity opt-in per island keeps the default
cost at zero and leaves each interactive feature independently replaceable —
including later connection to the APIs ADR-009 anticipates — without
converting the site into an application.

---

## 5. Binding Rules

1. Astro owns routing; no client-side router may take over public-site
   navigation.
2. Prefer static generation; use server rendering only where live data or
   authentication genuinely requires it.
3. React is permitted only for bounded interactive islands.
4. Client-side JavaScript requires an interaction justification.
5. Navigation that does not need application state stays in Astro/HTML.

---

## 6. Consequences

The site keeps strong initial HTML, SEO, resilience and low JavaScript cost.
Interactive features remain independently replaceable and can be connected to
APIs later without turning the whole site into an SPA.

---

## 7. Future Evolution

Revisit when an authenticated area (ADR-008 partner/support) needs enough
shared client state that per-island isolation becomes the constraint rather
than the benefit. Introducing an application shell for such an area requires a
superseding ADR scoped to that area, not to the public site.

---

## 8. Decision Status

Proposed. Not yet binding. Returned to `Proposed` during the conversion to the
canonical template; previously marked `Accepted` without a recorded acceptance.

---

## References

- [ADR-003](ADR-003-seo-first-multilingual-information-architecture.md) — routing and locale model
- [ADR-005](ADR-005-cloudflare-native-target.md) — deployment target for static output
- [ADR-009](ADR-009-integration-boundaries-before-live-data.md) — service boundaries islands consume
- [ADR-011](ADR-011-performance-accessibility-and-device-independence.md) — performance baseline
