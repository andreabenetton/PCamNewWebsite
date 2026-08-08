import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await fs.readFile(path.join(root, 'src/data/media.json'), 'utf8'));
const only = new Set(process.argv.slice(2));
let ok = 0;
let skipped = 0;
let failed = 0;

for (const [slug, item] of Object.entries(manifest)) {
  if (only.size && !only.has(slug)) continue;
  const destination = path.join(root, 'public', item.target.replace(/^\//, ''));
  try {
    await fs.access(destination);
    console.log(`skip ${slug}: already exists`);
    skipped++;
    continue;
  } catch {}

  await fs.mkdir(path.dirname(destination), { recursive: true });
  try {
    const response = await fetch(item.legacyUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Referer': 'https://en.pcam.com/',
        'User-Agent': 'Mozilla/5.0 (compatible; PCamMigrationReadOnly/1.0; +https://pcam.com)'
      }
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(destination, bytes);
    console.log(`ok   ${slug}: ${(bytes.length / 1024).toFixed(1)} KiB -> ${path.relative(root, destination)}`);
    ok++;
  } catch (error) {
    console.error(`fail ${slug}: ${error.message}`);
    failed++;
  }
}

console.log(`\nmedia sync: ${ok} downloaded, ${skipped} existing, ${failed} failed`);
if (failed) process.exitCode = 1;
