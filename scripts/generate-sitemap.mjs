import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const productSource = await fs.readFile(path.join(root, 'src/data/products.ts'), 'utf8');
const storySource = await fs.readFile(path.join(root, 'src/data/stories.ts'), 'utf8');
const productSlugs = [...productSource.matchAll(/slug:\s*'([^']+)'/g)].map((m)=>m[1]);
const storySlugs = [...storySource.matchAll(/slug:\s*'([^']+)'/g)].map((m)=>m[1]);
const routes = [
  '/en/', '/en/solutions/', '/en/solutions/cnc-automation/', '/en/solutions/digital-production/',
  '/en/solutions/cnc-monitoring/', '/en/solutions/tool-management/', '/en/solutions/edm-cam/', '/en/solutions/measurement/',
  '/en/applications/', '/en/applications/unattended-production/', '/en/applications/connect-cnc-machines/',
  '/en/applications/production-planning/', '/en/applications/tool-data-management/', '/en/applications/quality-measurement/',
  '/en/products/', '/en/customer-stories/', '/en/knowledge/',
  '/en/knowledge/automation-for-tool-and-mould-making/', '/en/knowledge/mes-for-tool-and-mould-manufacturing/',
  '/en/knowledge/unattended-cnc-machining/', '/en/company/', '/en/company/history/', '/en/partners/', '/en/support/', '/en/support/specifications/', '/en/contact/',
  ...productSlugs.map((slug)=>`/en/products/${slug}/`),
  ...storySlugs.map((slug)=>`/en/customer-stories/${slug}/`)
];
const unique = [...new Set(routes)].sort();
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${unique.map((route)=>`  <url><loc>https://pcam.com${route}</loc><xhtml:link rel="alternate" hreflang="en" href="https://pcam.com${route}" /></url>`).join('\n')}\n</urlset>\n`;
await fs.writeFile(path.join(root, 'public/sitemap.xml'), xml);
console.log(`generated sitemap with ${unique.length} English URLs`);
