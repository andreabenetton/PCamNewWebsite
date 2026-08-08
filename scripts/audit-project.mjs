import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceRoot = path.join(root, 'src');
const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(astro|tsx|ts|jsx|js)$/.test(entry.name)) files.push(full);
  }
};
walk(sourceRoot);

const warnings = [];
const missingImports = [];

function resolveLocalImport(file, specifier) {
  const base = specifier.startsWith('@/')
    ? path.join(sourceRoot, specifier.slice(2))
    : path.resolve(path.dirname(file), specifier);
  const candidates = [
    base,
    `${base}.astro`, `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.jsx`, `${base}.json`,
    path.join(base, 'index.astro'), path.join(base, 'index.ts'), path.join(base, 'index.tsx'), path.join(base, 'index.js')
  ];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('href="#"')) warnings.push(`${path.relative(root,file)}: placeholder href="#"`);
  if (/\bTODO\b|\bFIXME\b/.test(text)) warnings.push(`${path.relative(root,file)}: TODO/FIXME remains`);

  for (const match of text.matchAll(/(?:from\s+|import\s*)['"]([^'"]+)['"]/g)) {
    const specifier = match[1];
    if ((specifier.startsWith('.') || specifier.startsWith('@/')) && !resolveLocalImport(file, specifier)) {
      missingImports.push(`${path.relative(root,file)} -> ${specifier}`);
    }
  }
}

const productCount = JSON.parse(fs.readFileSync(path.join(sourceRoot, 'data', 'products', 'facts.json'), 'utf8')).length;
const storyCount = JSON.parse(fs.readFileSync(path.join(sourceRoot, 'data', 'stories', 'facts.json'), 'utf8')).length;

console.log(`audited ${files.length} source files; ${productCount} products; ${storyCount} customer-evidence records`);
if (warnings.length || missingImports.length) {
  if (warnings.length) console.error(warnings.join('\n'));
  if (missingImports.length) console.error(`missing local imports:\n${missingImports.join('\n')}`);
  process.exit(1);
}
console.log('project audit passed');
