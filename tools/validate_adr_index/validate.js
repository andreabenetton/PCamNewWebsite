#!/usr/bin/env node
/**
 * Validates docs/adr/adr-index.json against the ADR files, the per-ADR
 * amendment-history files, and the digest — so the navigation layer cannot
 * drift from the ADR set.
 *
 * This project does not categorize ADRs, so there are no cluster or pillar
 * checks.
 *
 * Usage: node tools/validate_adr_index/validate.js
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ADR_DIR = join(ROOT, 'docs/adr');
const HISTORY_DIR = join(ADR_DIR, 'history');

const errors = [];
const fail = (code, msg) => errors.push(`${code}: ${msg}`);

const read = (p) => readFileSync(p, 'utf8');

// ── Load index ─────────────────────────────────────────────────────────────
const index = JSON.parse(read(join(ADR_DIR, 'adr-index.json')));
const entries = index.adrs;

// ── Load ADR files ─────────────────────────────────────────────────────────
const adrFiles = readdirSync(ADR_DIR)
  .filter((f) => /^ADR-\d{3}-.*\.md$/.test(f))
  .sort();

const byFile = new Map(entries.map((e) => [e.file, e]));

// one index entry per ADR file, and vice versa
for (const f of adrFiles) if (!byFile.has(f)) fail('missing-index-entry', f);
for (const e of entries) {
  if (!adrFiles.includes(e.file)) fail('orphan-index-entry', e.file);
}

// contiguous unique numbers from 0
const numbers = entries.map((e) => e.number).sort((a, b) => a - b);
new Set(numbers).size === numbers.length || fail('duplicate-number', numbers.join(','));
numbers.forEach((n, i) => {
  if (n !== i) fail('non-contiguous-number', `expected ${i}, got ${n}`);
});

// ── Header checks ──────────────────────────────────────────────────────────
const CANONICAL = ['Proposed', 'Accepted', 'Superseded', 'Deprecated'];

for (const e of entries) {
  const path = join(ADR_DIR, e.file);
  if (!existsSync(path)) continue;
  const body = read(path);

  // filename number must match the entry
  const fileNum = Number(/^ADR-(\d{3})-/.exec(e.file)[1]);
  if (fileNum !== e.number) fail('number-filename-mismatch', e.file);

  const title = /^#\s*ADR-\d{3}\s*—\s*(.+)$/m.exec(body);
  if (!title) fail('title-unparsed', e.file);
  else if (title[1].trim() !== e.title) {
    fail('title-mismatch', `${e.file}: header "${title[1].trim()}" vs index "${e.title}"`);
  }

  const status = /^\*\*Status:\*\*\s*(.+)$/m.exec(body);
  if (!status) fail('status-unparsed', e.file);
  else {
    const leading = status[1].trim().split(/[\s(]/)[0];
    if (!CANONICAL.includes(leading)) {
      fail('status-not-canonical', `${e.file}: "${status[1].trim()}"`);
    }
    if (leading !== e.status.split(/[\s(]/)[0]) {
      fail('status-mismatch', `${e.file}: header "${leading}" vs index "${e.status}"`);
    }
  }

  const date = /^\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})\s*$/m.exec(body);
  if (!date) fail('date-unparsed', e.file);
  else if (date[1] !== e.date) {
    fail('date-mismatch', `${e.file}: header ${date[1]} vs index ${e.date}`);
  }

  // all eight numbered sections present
  for (let s = 1; s <= 8; s++) {
    if (!new RegExp(`^##\\s*${s}\\.\\s`, 'm').test(body)) {
      fail('missing-section', `${e.file}: §${s}`);
    }
  }

  // amendment bookkeeping
  const historyFile = join(HISTORY_DIR, `ADR-${String(e.number).padStart(3, '0')}-amendments.md`);
  const logRows = [...body.matchAll(/^\|\s*(\d{4}-\d{2}-\d{2})\s*\|/gm)].length;

  if (/^###\s+Amendment\s/m.test(body)) {
    fail('amendment-body-in-main', `${e.file}: amendment notes belong in history/`);
  }

  if (e.amendments > 0) {
    if (!existsSync(historyFile)) fail('history-file-missing', e.file);
    else {
      const notes = [...read(historyFile).matchAll(/^###\s+Amendment\s/gm)].length;
      if (notes !== e.amendments) {
        fail('amendments-mismatch', `${e.file}: ${notes} notes vs index ${e.amendments}`);
      }
    }
    if (logRows !== e.amendments) {
      fail('amendment-log-mismatch', `${e.file}: ${logRows} log rows vs index ${e.amendments}`);
    }
  } else if (existsSync(historyFile)) {
    fail('history-file-orphan', historyFile);
  }

  // every ADR-NNN-*.md citation resolves
  for (const m of body.matchAll(/\(((?:history\/)?ADR-\d{3}-[a-z0-9-]+\.md)\)/g)) {
    if (!existsSync(join(ADR_DIR, m[1]))) {
      fail('broken-adr-file-reference', `${e.file} -> ${m[1]}`);
    }
  }
}

// ── Digest coverage ────────────────────────────────────────────────────────
const digest = read(join(ADR_DIR, 'ADR-DIGEST.md'));
for (const e of entries) {
  const tag = `ADR-${String(e.number).padStart(3, '0')}`;
  if (!new RegExp(`^###\\s*${tag}\\s*—`, 'm').test(digest)) {
    fail('missing-digest-entry', tag);
  }
}

// ── Master index coverage ──────────────────────────────────────────────────
const master = read(join(ADR_DIR, 'ADR-MASTER.md'));
for (const e of entries) {
  if (!master.includes(e.file)) fail('missing-master-row', e.file);
}

// ── Report ─────────────────────────────────────────────────────────────────
if (errors.length) {
  console.error(`adr-index: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error('  ' + e);
  process.exit(1);
}
console.log(`adr-index: OK — ${entries.length} ADRs, index/digest/master consistent`);
