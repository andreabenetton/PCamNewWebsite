import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mediaRoot = path.join(root, 'public', 'media');
const output = path.join(root, 'src', 'data', 'media-hashes.json');

async function walk(dir) {
  const out = [];
  let entries = [];
  try { entries = await fs.readdir(dir, { withFileTypes: true }); }
  catch { return out; }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

const files = (await walk(mediaRoot)).sort();
const items = [];
const byHash = new Map();

for (const file of files) {
  const bytes = await fs.readFile(file);
  const hash = crypto.createHash('sha256').update(bytes).digest('hex');
  const rel = `/${path.relative(path.join(root, 'public'), file).split(path.sep).join('/')}`;
  const item = { path: rel, bytes: bytes.length, sha256: hash };
  items.push(item);
  if (!byHash.has(hash)) byHash.set(hash, []);
  byHash.get(hash).push(rel);
}

const duplicates = [...byHash.entries()]
  .filter(([, paths]) => paths.length > 1)
  .map(([sha256, paths]) => ({ sha256, paths }));

const manifest = {
  generatedAt: new Date().toISOString(),
  algorithm: 'sha256',
  files: items,
  duplicates
};

await fs.writeFile(output, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`hashed ${items.length} media files; ${duplicates.length} exact duplicate groups -> ${path.relative(root, output)}`);
