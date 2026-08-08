# PCam website agent instructions

## Operating model

This repository is **local-first**. The user's local Git repository is the source of truth for versions and rollback.

1. Work locally.
2. Run `npm run dev` for interactive review.
3. Run `npm run check` and `npm run build` before proposing a release.
4. Commit the intended revision to local Git.
5. **Never deploy unless the user explicitly asks to publish/deploy.**
6. Production deployment is `npm run deploy:production`; staging is `npm run deploy:staging`.
7. Deployment scripts reject a dirty Git tree by default.

Do not make production changes through the Cloudflare dashboard as a substitute for repository changes. Configuration belongs in Git unless it is a secret.

## Architecture

- Astro owns routing and static generation.
- English is implemented under `/en/`; `de`, `it`, `fr`, `es`, `pt` are reserved in Astro i18n configuration.
- React is for bounded interactive islands only. Do not turn the public site into a client-side SPA.
- Public acquisition IA: Solutions -> Applications -> Customer evidence -> Contact.
- Existing-customer tasks live under `/support/`.
- Partner workspace is currently a non-functional, noindex UX mock.
- SQL, license SOAP, protected downloads and authentication are intentionally not connected in this prototype.

## Content rules

- Preserve engineering meaning; do not invent product specifications or customer results.
- Claims and selected technical values should be traceable to `CONTENT_SOURCES.md` and/or the legacy source URL in `src/data/products.ts` / `src/data/stories.ts`.
- Prefer buyer problems and operational outcomes over generic marketing adjectives.
- Keep product pages technically useful: problem, fit, capabilities, outcomes, specs, interfaces, evidence.
- Keep case-study pages explicit about what is reported versus what still needs customer validation.

## Media rules

- Existing PCam media is preferred over generic stock imagery.
- `src/data/media.json` maps legacy assets to stable local targets.
- Run `npm run media:sync` on a networked local workstation to retrieve protected legacy `/images/Module...` files using read-only GET requests.
- The migration target is Cloudflare. During prototype development the files can live in `public/media`; later the same manifest should be mapped to Cloudflare static assets/R2/Images without changing editorial content.
- Cloudflare Stream UIDs belong in `src/data/videos.ts` or a generated map; do not re-upload videos unless a migration decision explicitly requires it.

## Safety

- Never modify the legacy WordPress or SQL systems while doing content discovery unless the user explicitly authorizes a write operation.
- Never commit secrets, SQL credentials, API tokens or Cloudflare tokens.
- Use `.env` / Cloudflare secrets for future runtime credentials.
