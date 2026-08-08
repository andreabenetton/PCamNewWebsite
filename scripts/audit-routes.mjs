import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'src');
const readJson = async (rel) => JSON.parse(await fs.readFile(path.join(root, rel), 'utf8'));

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (/\.(astro|tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const localeConfig = await readJson('src/data/i18n/locales.json');
const routes = await readJson('src/data/i18n/routes.json');
const productFacts = await readJson('src/data/products/facts.json');
const storyFacts = await readJson('src/data/stories/facts.json');
const implemented = Object.entries(localeConfig.locales).filter(([, meta]) => meta.implemented).map(([locale]) => locale);
const valid = new Set();

for (const route of Object.values(routes)) {
  for (const locale of implemented) if (route.paths?.[locale]) valid.add(route.paths[locale]);
}
for (const locale of implemented) {
  const products = await readJson(`src/data/products/locales/${locale}.json`);
  const stories = await readJson(`src/data/stories/locales/${locale}.json`);
  const productRoot = routes.products.paths[locale];
  const storyRoot = routes['customer-stories'].paths[locale];
  for (const fact of productFacts) if (products[fact.id] && productRoot) valid.add(`${productRoot}${products[fact.id].slug}/`);
  for (const fact of storyFacts) if (stories[fact.id] && storyRoot) valid.add(`${storyRoot}${stories[fact.id].slug}/`);
}

const sourceFiles = await walk(sourceRoot);
const localePattern = implemented.join('|');
const routeRegex = new RegExp(`['"\\x60]((?:/(?:${localePattern})/)[A-Za-z0-9_./-]*/?)['"\\x60]`, 'g');
const seen = new Set();
const broken = [];
for (const file of sourceFiles) {
  const text = await fs.readFile(file, 'utf8');
  for (const match of text.matchAll(routeRegex)) {
    let href = match[1].split('#')[0].split('?')[0];
    if (!href.endsWith('/')) href += '/';
    seen.add(href);
    if (!valid.has(href)) broken.push(`${path.relative(root, file)} -> ${href}`);
  }
}

if (broken.length) {
  console.error('Broken literal internal routes:');
  for (const item of [...new Set(broken)]) console.error(`- ${item}`);
  process.exitCode = 1;
} else {
  console.log(`route audit passed: ${valid.size} generated localized routes, ${seen.size} literal internal targets checked`);
}
