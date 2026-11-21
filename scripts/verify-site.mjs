import fs from 'node:fs';
import path from 'node:path';

const CANONICAL_ORIGIN = 'https://nihilalpine.com';

const ROUTE_CHECKS = [
  {
    routePath: '/',
    distFile: 'index.html',
    canonical: `${CANONICAL_ORIGIN}/`,
    ogImage: `${CANONICAL_ORIGIN}/images/og/site.jpg`,
    jsonLdType: '"@type": "ItemList"',
  },
  {
    routePath: '/professional-work',
    distFile: 'professional-work/index.html',
    canonical: `${CANONICAL_ORIGIN}/professional-work`,
    ogImage: `${CANONICAL_ORIGIN}/images/og/professional-work.jpg`,
    jsonLdType: '"@type": "CreativeWork"',
  },
  {
    routePath: '/connect',
    distFile: 'connect/index.html',
    canonical: `${CANONICAL_ORIGIN}/connect`,
    ogImage: `${CANONICAL_ORIGIN}/images/og/connect.jpg`,
    jsonLdType: '"@type": "ContactPage"',
  },
  {
    routePath: '/project/01',
    distFile: 'project/01/index.html',
    canonical: `${CANONICAL_ORIGIN}/project/01`,
    ogImage: `${CANONICAL_ORIGIN}/images/og/01-corium-glove.jpg`,
    jsonLdType: '"@type": "CreativeWork"',
  },
  {
    routePath: '/project/02',
    distFile: 'project/02/index.html',
    canonical: `${CANONICAL_ORIGIN}/project/02`,
    ogImage: `${CANONICAL_ORIGIN}/images/og/02-alptour-pack.jpg`,
    jsonLdType: '"@type": "CreativeWork"',
  },
  {
    routePath: '/project/03',
    distFile: 'project/03/index.html',
    canonical: `${CANONICAL_ORIGIN}/project/03`,
    ogImage: `${CANONICAL_ORIGIN}/images/og/03-ventour-jacket.jpg`,
    jsonLdType: '"@type": "CreativeWork"',
  },
  {
    routePath: '/project/04',
    distFile: 'project/04/index.html',
    canonical: `${CANONICAL_ORIGIN}/project/04`,
    ogImage: `${CANONICAL_ORIGIN}/images/og/04-stridetour-pant.jpg`,
    jsonLdType: '"@type": "CreativeWork"',
  },
];

const EXPECTED_OG_IMAGES = [
  'images/og/site.jpg',
  'images/og/professional-work.jpg',
  'images/og/connect.jpg',
  'images/og/01-corium-glove.jpg',
  'images/og/02-alptour-pack.jpg',
  'images/og/03-ventour-jacket.jpg',
  'images/og/04-stridetour-pant.jpg',
];

const results = [];

function record(name, passed, detail) {
  results.push({ name, passed, detail });
  const badge = passed ? 'PASS' : 'FAIL';
  console.log(`[${badge}] ${name} — ${detail}`);
}

function verifyBuild() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const robotsPath = path.join(distDir, 'robots.txt');
  const sitemapPath = path.join(distDir, 'sitemap.xml');

  if (!fs.existsSync(distDir)) {
    record('dist directory', false, 'dist/ not found. Run `npm run build` first.');
    return;
  }

  // 1. robots.txt
  if (fs.existsSync(robotsPath)) {
    const robots = fs.readFileSync(robotsPath, 'utf8');
    const hasSitemap = robots.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`);
    const hasAllow = robots.includes('Allow: /');
    record(
      'dist/robots.txt',
      hasSitemap && hasAllow,
      hasSitemap && hasAllow
        ? 'Present and points to canonical sitemap.xml'
        : 'Missing expected Allow or Sitemap directive'
    );
  } else {
    record('dist/robots.txt', false, 'File missing from dist/');
  }

  // 2. sitemap.xml
  if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, 'utf8');
    const missingUrls = ROUTE_CHECKS.map((r) => r.canonical).filter(
      (url) => !sitemap.includes(`<loc>${url}</loc>`)
    );
    const hasTypo = sitemap.includes('nihialpine');
    record(
      'dist/sitemap.xml',
      missingUrls.length === 0 && !hasTypo,
      missingUrls.length === 0 && !hasTypo
        ? `Present with all ${ROUTE_CHECKS.length} canonical routes`
        : `Missing URLs: ${missingUrls.join(', ')}${hasTypo ? ' (found nihialpine typo)' : ''}`
    );
  } else {
    record('dist/sitemap.xml', false, 'File missing from dist/');
  }

  // 3. Dedicated JPG OG preview images
  const missingOg = EXPECTED_OG_IMAGES.filter((rel) => !fs.existsSync(path.join(distDir, rel)));
  record(
    'dist/images/og/*.jpg',
    missingOg.length === 0,
    missingOg.length === 0
      ? `All ${EXPECTED_OG_IMAGES.length} JPG social preview images present`
      : `Missing JPG previews: ${missingOg.join(', ')}`
  );

  // 4. Static route HTML snapshots
  for (const check of ROUTE_CHECKS) {
    const filePath = path.join(distDir, check.distFile);
    if (!fs.existsSync(filePath)) {
      record(`dist/${check.distFile}`, false, 'Static route HTML file missing');
      continue;
    }
    const html = fs.readFileSync(filePath, 'utf8');
    const hasCanonical = html.includes(`<link rel="canonical" href="${check.canonical}" />`);
    const hasOgImage = html.includes(`<meta property="og:image" content="${check.ogImage}" />`);
    const hasTwitterImage = html.includes(`<meta name="twitter:image" content="${check.ogImage}" />`);
    const hasJsonLd = html.includes(check.jsonLdType);
    const hasRootAssets = !html.includes('src="./assets/') && !html.includes('href="./assets/');
    const ok = hasCanonical && hasOgImage && hasTwitterImage && hasJsonLd && hasRootAssets;
    record(
      `dist/${check.distFile}`,
      ok,
      ok
        ? 'Canonical, JPG social tags, JSON-LD, and root-absolute assets verified'
        : `Issues: ${[
            !hasCanonical && 'canonical',
            !hasOgImage && 'og:image',
            !hasTwitterImage && 'twitter:image',
            !hasJsonLd && 'JSON-LD',
            !hasRootAssets && 'relative ./assets path',
          ]
            .filter(Boolean)
            .join(', ')}`
    );
  }
  // 5. Custom 404.html
  const notFoundPath = path.join(distDir, '404.html');
  if (fs.existsSync(notFoundPath)) {
    const html404 = fs.readFileSync(notFoundPath, 'utf8');
    const ok =
      html404.includes('noindex, follow') &&
      html404.includes('href="/"') &&
      html404.includes('href="/professional-work"') &&
      html404.includes('href="/project/01"');
    record(
      'dist/404.html',
      ok,
      ok
        ? 'Custom 404 page present with noindex and portfolio links'
        : '404.html missing expected noindex or navigation links'
    );
  } else {
    record('dist/404.html', false, 'Custom 404.html missing from dist/');
  }
}

async function verifyLive() {
  // 1. robots.txt
  try {
    const res = await fetch(`${CANONICAL_ORIGIN}/robots.txt`, { redirect: 'manual' });
    const body = await res.text();
    const ok = res.status === 200 && body.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`);
    record(
      'GET https://nihilalpine.com/robots.txt',
      ok,
      `HTTP ${res.status}${ok ? ' (Sitemap directive confirmed)' : ''}`
    );
  } catch (err) {
    record('GET https://nihilalpine.com/robots.txt', false, err.message);
  }

  // 2. sitemap.xml
  try {
    const res = await fetch(`${CANONICAL_ORIGIN}/sitemap.xml`, { redirect: 'manual' });
    const body = await res.text();
    const missing = ROUTE_CHECKS.map((r) => r.canonical).filter(
      (url) => !body.includes(`<loc>${url}</loc>`)
    );
    const ok = res.status === 200 && missing.length === 0;
    record(
      'GET https://nihilalpine.com/sitemap.xml',
      ok,
      `HTTP ${res.status}${ok ? ` (all ${ROUTE_CHECKS.length} routes present)` : ` (missing: ${missing.join(', ')})`}`
    );
  } catch (err) {
    record('GET https://nihilalpine.com/sitemap.xml', false, err.message);
  }

  // 3. www -> apex 301 redirect with query string preserved
  try {
    const res = await fetch('https://www.nihilalpine.com/?verify=1', { redirect: 'manual' });
    const location = res.headers.get('location') || '';
    const ok = res.status === 301 && location === `${CANONICAL_ORIGIN}/?verify=1`;
    record(
      '301 https://www.nihilalpine.com/?verify=1',
      ok,
      `HTTP ${res.status} -> ${location || '(no Location header)'}`
    );
  } catch (err) {
    record('301 https://www.nihilalpine.com/?verify=1', false, err.message);
  }

  // 4. http -> https upgrade
  try {
    const res = await fetch('http://nihilalpine.com/', { redirect: 'manual' });
    const location = res.headers.get('location') || '';
    const ok =
      (res.status === 301 || res.status === 308) && location.startsWith(`${CANONICAL_ORIGIN}/`);
    record(
      'HTTPS upgrade http://nihilalpine.com/',
      ok,
      `HTTP ${res.status} -> ${location || '(no Location header)'}`
    );
  } catch (err) {
    record('HTTPS upgrade http://nihilalpine.com/', false, err.message);
  }

  // 5. Live per-route canonical & JPG social card verification
  for (const check of ROUTE_CHECKS) {
    try {
      const res = await fetch(check.canonical, { redirect: 'follow' });
      const html = await res.text();
      const hasCanonical = html.includes(`<link rel="canonical" href="${check.canonical}" />`);
      const hasOgImage = html.includes(`<meta property="og:image" content="${check.ogImage}" />`);
      const ok = res.status === 200 && hasCanonical && hasOgImage;
      record(
        `GET ${check.canonical}`,
        ok,
        `HTTP ${res.status}${ok ? ' (route canonical + JPG og:image verified)' : ' (missing route-specific meta)'}`
      );
    } catch (err) {
      record(`GET ${check.canonical}`, false, err.message);
    }
  }

  // 6. Custom 404 page on invalid route
  try {
    const res = await fetch(`${CANONICAL_ORIGIN}/non-existent-route-check`, { redirect: 'manual' });
    const html = await res.text();
    const ok = res.status === 404 && html.includes('Off-Route Coordinates');
    record(
      'GET https://nihilalpine.com/non-existent-route-check',
      ok,
      `HTTP ${res.status}${ok ? ' (custom 404.html served)' : ''}`
    );
  } catch (err) {
    record('GET https://nihilalpine.com/non-existent-route-check', false, err.message);
  }
}

const args = new Set(process.argv.slice(2));
const runBuild = args.has('--build');
const runLive = args.has('--live') || !runBuild;

if (runBuild) {
  verifyBuild();
}
if (runLive) {
  await verifyLive();
}

const failed = results.filter((r) => !r.passed).length;
if (failed > 0) {
  console.error(`\nVerification failed (${failed} check${failed === 1 ? '' : 's'} failed).`);
  process.exit(1);
}

console.log(`\nAll ${results.length} verification checks passed.`);
