# English-site ingest and redesign coverage

This repository is a redesign from the English PCam public site, not a page-for-page clone. The goal is to preserve useful engineering knowledge and commercial evidence while replacing the legacy WordPress information architecture.

## Absorbed into the new public architecture

| Legacy content area | New destination / treatment |
|---|---|
| Home / Industry 4.0 positioning | `/en/` + Solutions + Applications |
| MES overview | `/en/solutions/digital-production/` + product pages + MES knowledge guide |
| Robotic systems | `/en/solutions/cnc-automation/` + automation product pages |
| CAD/CAM | `/en/solutions/edm-cam/` + PCamWire / PCamDieSink |
| CMM / measurement | `/en/solutions/measurement/` + PCamMMS |
| CNC monitoring / IoT | `/en/solutions/cnc-monitoring/` + PCamMonitor / PCamIoT |
| Tool management | `/en/solutions/tool-management/` + PCamToolManager |
| About / history | `/en/company/` + `/en/company/history/` |
| Partner network | `/en/partners/` + noindex Partner Area mock |
| Support | `/en/support/` task-oriented hub |
| Technical specifications | `/en/support/specifications/` |
| Downloads / manuals / licenses | noindex customer-area mocks, ready for future auth/API islands |
| Release notes | noindex UX mock, ready for the existing dynamic release-note source |
| Product catalogue | 20 structured product records under `/en/products/` |
| Customer references | selected outcome-led customer evidence under `/en/customer-stories/` |

## Deliberately not copied 1:1

- WordPress navigation hierarchy and Salient/WPBakery markup.
- Repeated generic marketing copy.
- Page-builder wrappers, plugin UI and shortcode implementation details.
- Language-selector links to locales that are not yet implemented.
- Legacy customer authentication UI.

## Dynamic data deferred to the integration phase

The machine assessment identified dynamic sources that should not be faked in the public prototype:

- MSSQL-backed product/reference/history datasets;
- customer-specific tickets and identity mappings;
- full release-note history;
- license SOAP service;
- protected manuals/download entitlements;
- Partner Area authentication and protected resources;
- the complete Cloudflare Stream UID map.

The current prototype defines the UX and integration boundaries for these surfaces while keeping the public acquisition site static-first.

## Media coverage

- official PCam logo is bundled;
- company visual is bundled;
- a real PCamFMC2 automation rendering is bundled;
- protected `/images/Module...` product visuals are mapped in `src/data/media.json` and can be fetched read-only with `npm run media:sync`;
- synced media can be hashed with `npm run media:hash` before deduplication / Cloudflare migration;
- `PUBLIC_MEDIA_BASE_URL` lets the final build move media to an R2/Images custom domain without rewriting product content;
- Cloudflare Stream player support is already present and becomes active when the existing UID map is imported.

## Before production cutover

A production content review should still decide which additional legacy news, reference, presentation and history records deserve standalone public pages. The redesign intentionally favors authoritative, maintained content over migrating every WordPress URL just because it exists. Redirect mapping is a separate later work package, as agreed.
