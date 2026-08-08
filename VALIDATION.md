# Prototype validation status

## Checks completed in the generation environment

- local-import audit across Astro/TS/TSX source: passed;
- literal internal-route audit: passed;
- project placeholder/TODO audit: passed;
- JavaScript migration/deploy scripts parsed with `node --check`: passed;
- TypeScript data modules parsed with Node type stripping: passed;
- English sitemap generation: 52 public URLs;
- structured product inventory: 20 products;
- structured customer evidence: 6 records;
- SHA-256 media manifest generated for currently bundled media.

## Check that must run on the user's workstation

The generation container cannot install Astro from the external npm registry, so an actual Astro compilation could not be executed here. After unpacking:

```bash
npm install
npm run media:sync
npm run media:hash
npm run check
npm run build
npm run preview
```

Resolve any dependency/API drift reported by the installed Astro version before accepting the first local commit. Once the first install succeeds, commit `package-lock.json` so subsequent agent runs use the same dependency graph.

## Release rule

A deploy is not a validation step. Validate locally first, commit the intended revision to local Git, then deploy only on an explicit user instruction. The deploy scripts contain a clean-working-tree guard.
