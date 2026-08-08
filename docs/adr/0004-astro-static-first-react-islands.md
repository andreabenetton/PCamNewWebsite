# ADR 0004 — Astro owns routing; static-first; React only for bounded islands

- **Status:** Accepted
- **Date:** 2026-08-08

## Context

The public PCam site is primarily content, engineering explanation, product discovery and customer evidence. Most pages do not need a client-side application runtime. Some future experiences — filters, configurators, authenticated tools, live downloads or license functions — will require interactivity.

A React SPA would add unnecessary client-side routing and JavaScript to the entire public website. Astro provides server/static rendering with opt-in interactive islands.

## Decision

- Astro owns routing and page rendering.
- Stable editorial pages are statically generated whenever practical.
- Server rendering is introduced only for routes that genuinely require live server data or authentication.
- React is used only for bounded interactive islands.
- TanStack Router or another client-side site router must not replace Astro routing inside the public site.
- Client-side JavaScript must be justified by user interaction, not framework convenience.

Examples of appropriate React islands:

- product filters;
- rich selectors/configurators;
- interactive diagrams;
- authenticated license/download widgets;
- live search or account tools.

Examples that should remain Astro/HTML:

- hero sections;
- product explanations;
- solution pages;
- customer stories;
- knowledge articles;
- navigation that does not require application state.

## Consequences

The site keeps strong initial HTML, SEO, resilience and low JavaScript cost. Interactive features remain independently replaceable and can be connected to APIs later without turning the whole site into an SPA.
