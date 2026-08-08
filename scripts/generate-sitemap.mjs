import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const readJson = async (rel) => JSON.parse(await fs.readFile(path.join(root, rel), 'utf8'));
const localeConfig = await readJson('src/data/i18n/locales.json');
const routes = await readJson('src/data/i18n/routes.json');
const productFacts = await readJson('src/data/products/facts.json');
const storyFacts = await readJson('src/data/stories/facts.json');
const sourceLocale = localeConfig.sourceLocale;
const implemented = Object.entries(localeConfig.locales).filter(([, meta]) => meta.implemented).map(([locale]) => locale);
const base = 'https://pcam.com';
const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

const groups = [];
for (const [routeId, route] of Object.entries(routes)) {
  if (!route.sitemap) continue;
  const paths = Object.fromEntries(implemented.flatMap((locale) => route.paths?.[locale] ? [[locale, route.paths[locale]]] : []));
  groups.push({ id: `route:${routeId}`, paths });
}

for (const fact of productFacts) {
  const paths = {};
  for (const locale of implemented) {
    const copy = await readJson(`src/data/products/locales/${locale}.json`);
    const rootPath = routes.products.paths[locale];
    if (copy[fact.id] && rootPath) paths[locale] = `${rootPath}${copy[fact.id].slug}/`;
  }
  groups.push({ id: `product:${fact.id}`, paths });
}

for (const fact of storyFacts) {
  const paths = {};
  for (const locale of implemented) {
    const copy = await readJson(`src/data/stories/locales/${locale}.json`);
    const rootPath = routes['customer-stories'].paths[locale];
    if (copy[fact.id] && rootPath) paths[locale] = `${rootPath}${copy[fact.id].slug}/`;
  }
  groups.push({ id: `story:${fact.id}`, paths });
}

const urlRows = [];
for (const group of groups) {
  const alternates = implemented.flatMap((locale) => group.paths[locale] ? [{ locale, path: group.paths[locale] }] : []);
  for (const current of alternates) {
    const links = alternates.map((item) => `    <xhtml:link rel="alternate" hreflang="${item.locale}" href="${escapeXml(base + item.path)}" />`);
    if (group.paths[sourceLocale]) links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(base + group.paths[sourceLocale])}" />`);
    urlRows.push(`  <url>\n    <loc>${escapeXml(base + current.path)}</loc>\n${links.join('\n')}\n  </url>`);
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlRows.join('\n')}\n</urlset>\n`;
await fs.writeFile(path.join(root, 'public/sitemap.xml'), xml);
console.log(`generated sitemap with ${urlRows.length} localized URLs across ${implemented.length} locale(s)`);
