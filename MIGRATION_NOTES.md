# Migration boundaries after prototype approval

The prototype deliberately separates editorial redesign from live-system integration.

## Static/editorial migration

- English content is redesigned first.
- Other locales reuse the same route taxonomy and component model.
- Legacy per-language URLs are mapped later to the new `/lang/.../` routes using explicit 301 rules.
- Existing Multisite Language Switcher relations should be exported before WordPress retirement to assist that mapping.

## Media

Short term, synced images can live under `public/media` and deploy as Cloudflare Workers static assets. Before final migration, large media/document collections should be content-hashed, deduplicated and mapped to the selected Cloudflare storage/delivery product (Workers assets, R2 and/or Cloudflare Images). Editorial code should reference a manifest/resolver rather than WordPress URLs.

Cloudflare Stream remains the preferred video delivery layer. Import the existing UID mapping and render Stream players directly.

## Future dynamic islands / server APIs

These are intentionally mocked now:

- support request submission;
- protected manuals/downloads;
- license status/renewal;
- partner authentication/resources;
- customer login and user-specific data.

The public pages should remain static where possible. React islands should be added only for interactive state. Credentials and protected backends belong behind server-side Cloudflare endpoints, never in browser JavaScript.

## Local-first release model

Git on the user's workstation is the version history and release source of truth. Cloudflare is a deployment target, not an editing surface. `deploy:*` scripts are manual commands and include a clean-Git guard.
