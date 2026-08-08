import { execFileSync } from 'node:child_process';

if (process.env.ALLOW_DIRTY_DEPLOY === '1') {
  console.warn('ALLOW_DIRTY_DEPLOY=1: clean Git guard bypassed intentionally.');
  process.exit(0);
}

try {
  execFileSync('git', ['rev-parse', '--is-inside-work-tree'], { stdio: 'ignore' });
} catch {
  console.error('Deploy blocked: initialize Git first. Local Git is the release source of truth.');
  process.exit(1);
}

const dirty = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim();
if (dirty) {
  console.error('Deploy blocked: Git working tree is not clean. Review and commit the intended version first.');
  console.error(dirty);
  process.exit(1);
}

const commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
console.log(`Deploying clean Git revision ${commit}`);
