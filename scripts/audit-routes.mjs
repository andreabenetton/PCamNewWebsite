import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagesRoot = path.join(root, 'src', 'pages');

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (/\.(astro|tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const pageFiles = await walk(pagesRoot);
const sourceFiles = await walk(path.join(root, 'src'));
const valid = new Set(['/en/']);

for (const file of pageFiles) {
  let rel = path.relative(pagesRoot, file).split(path.sep).join('/');
  if (!rel.endsWith('.astro')) continue;
  if (rel.includes('[slug]')) continue;
  rel = rel.replace(/\.astro$/, '');
  rel = rel.replace('[lang]', 'en');
  rel = rel.replace(/\/index$/, '');
  valid.add(`/${rel}/`.replace(/\/+/g, '/'));
}

const productText = await fs.readFile(path.join(root, 'src', 'data', 'products.ts'), 'utf8');
for (const match of productText.matchAll(/slug:\s*'([^']+)'/g)) valid.add(`/en/products/${match[1]}/`);
const storyText = await fs.readFile(path.join(root, 'src', 'data', 'stories.ts'), 'utf8');
for (const match of storyText.matchAll(/slug:\s*'([^']+)'/g)) valid.add(`/en/customer-stories/${match[1]}/`);

const seen = new Set();
const broken = [];
for (const file of sourceFiles) {
  const text = await fs.readFile(file, 'utf8');
  for (const match of text.matchAll(/['"`]((?:\/en\/)[A-Za-z0-9_./-]*\/?)['"`]/g)) {
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
  console.log(`route audit passed: ${valid.size} generated English routes, ${seen.size} literal internal targets checked`);
}
