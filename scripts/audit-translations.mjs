import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const exists = (rel) => fs.existsSync(path.join(root, rel));
const failures = [];
const fail = (message) => failures.push(message);

const localeConfig = readJson('src/data/i18n/locales.json');
const locales = Object.keys(localeConfig.locales);
const implemented = locales.filter((locale) => localeConfig.locales[locale].implemented);
const sourceLocale = localeConfig.sourceLocale;
const routes = readJson('src/data/i18n/routes.json');

if (!implemented.includes(sourceLocale)) fail(`source locale ${sourceLocale} must be implemented`);

// Route identity is canonical; every published locale must supply an explicit
// path instead of relying on locale-prefix substitution.
for (const [routeId, route] of Object.entries(routes)) {
  for (const locale of implemented) {
    const value = route.paths?.[locale];
    if (!value) fail(`route ${routeId}: missing ${locale} path`);
    else if (!value.startsWith(`/${locale}/`)) fail(`route ${routeId}: ${locale} path must start /${locale}/ (${value})`);
  }
}
for (const locale of implemented) {
  const seen = new Map();
  for (const [routeId, route] of Object.entries(routes)) {
    const value = route.paths?.[locale];
    if (!value) continue;
    if (seen.has(value)) fail(`${locale}: duplicate route path ${value} (${seen.get(value)}, ${routeId})`);
    seen.set(value, routeId);
  }
}

function loadLocaleJson(area, locale) {
  const rel = `src/data/${area}/locales/${locale}.json`;
  if (!exists(rel)) {
    fail(`${area}: published locale ${locale} has no ${rel}`);
    return {};
  }
  return readJson(rel);
}

function auditRevisionedArea(area, facts, extraCheck) {
  const ids = facts.map((item) => item.id);
  const canonical = new Set(ids);
  const sourceCopy = loadLocaleJson(area, sourceLocale);

  for (const id of ids) {
    if (!sourceCopy[id]) fail(`${area}: source locale ${sourceLocale} missing ${id}`);
    else if (!Number.isInteger(sourceCopy[id].revision) || sourceCopy[id].revision < 1) fail(`${area}/${id}: source revision must be a positive integer`);
  }
  for (const id of Object.keys(sourceCopy)) if (!canonical.has(id)) fail(`${area}: ${sourceLocale} has unknown canonical id ${id}`);

  for (const locale of implemented) {
    const localized = loadLocaleJson(area, locale);
    const slugSeen = new Map();
    for (const fact of facts) {
      const copy = localized[fact.id];
      if (!copy) { fail(`${area}: ${locale} missing ${fact.id}`); continue; }
      if (!copy.slug) fail(`${area}/${fact.id}: ${locale} slug is empty`);
      else if (slugSeen.has(copy.slug)) fail(`${area}: ${locale} duplicate slug ${copy.slug} (${slugSeen.get(copy.slug)}, ${fact.id})`);
      else slugSeen.set(copy.slug, fact.id);

      if (locale !== sourceLocale) {
        const sourceRevision = sourceCopy[fact.id]?.revision;
        if (copy.reviewedAgainstRevision !== sourceRevision) {
          fail(`${area}/${fact.id}: ${locale} is stale or unreviewed (reviewed ${copy.reviewedAgainstRevision ?? 'never'}, source revision ${sourceRevision ?? '?'})`);
        }
      }
      extraCheck?.(fact, copy, locale);
    }
    for (const id of Object.keys(localized)) if (!canonical.has(id)) fail(`${area}: ${locale} has unknown canonical id ${id}`);
  }
}

// UI copy is also revisioned so changing shared navigation/template language
// makes existing translations explicitly stale until the user reviews them.
const sourceUiPath = `src/data/i18n/ui/${sourceLocale}.json`;
const sourceUi = exists(sourceUiPath) ? readJson(sourceUiPath) : (fail(`missing source UI ${sourceUiPath}`), {});
for (const locale of implemented) {
  const rel = `src/data/i18n/ui/${locale}.json`;
  if (!exists(rel)) { fail(`published locale ${locale} has no UI copy (${rel})`); continue; }
  const ui = readJson(rel);
  if (locale !== sourceLocale && ui.reviewedAgainstRevision !== sourceUi.revision) {
    fail(`UI ${locale} is stale or unreviewed (reviewed ${ui.reviewedAgainstRevision ?? 'never'}, source revision ${sourceUi.revision ?? '?'})`);
  }
}

const productFacts = readJson('src/data/products/facts.json');
auditRevisionedArea('products', productFacts, (fact, copy, locale) => {
  const canonicalKeys = new Set((fact.specs ?? []).map((spec) => spec.key));
  const localizedKeys = new Set((copy.specs ?? []).map((spec) => spec.key));
  if (canonicalKeys.size !== localizedKeys.size || [...canonicalKeys].some((key) => !localizedKeys.has(key))) {
    fail(`products/${fact.id}: ${locale} spec keys do not match canonical facts`);
  }
});

const storyFacts = readJson('src/data/stories/facts.json');
auditRevisionedArea('stories', storyFacts, (fact, copy, locale) => {
  if (fact.reportedQuote && fact.reportedQuote.locale !== locale && !copy.quote) {
    fail(`stories/${fact.id}: ${locale} needs an explicit translated quote`);
  }
});

if (failures.length) {
  console.error('Multilingual content audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`translation audit passed: ${implemented.length} published locale(s), ${Object.keys(routes).length} canonical routes, ${productFacts.length} products, ${storyFacts.length} stories`);
