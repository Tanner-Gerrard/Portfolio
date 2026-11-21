import fs from 'node:fs';
import path from 'node:path';

const CANONICAL_ORIGIN = 'https://nihilalpine.com';

const ROUTE_SPECS = [
  {
    routePath: '/professional-work',
    title: 'Static Labs — Professional Work | nihil',
    description:
      'FP1 Minimalist Chest Pack and modular on-water carry systems developed for Static Labs in partnership with Caid Lunt. Visit staticlabs.us.',
    image: `${CANONICAL_ORIGIN}/images/og/professional-work.jpg`,
    imageAlt: 'Static Labs FP1 Minimalist Chest Pack — Commercial softgoods design by Tanner Gerrard in partnership with Caid Lunt',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: 'Static Labs — FP1 Minimalist Chest Pack',
        description:
          'Minimalist fly fishing chest pack and modular on-water carry system developed for Static Labs in partnership with Caid Lunt.',
        url: `${CANONICAL_ORIGIN}/professional-work`,
        sameAs: 'https://staticlabs.us/',
        image: `${CANONICAL_ORIGIN}/images/og/professional-work.jpg`,
        genre: 'COMMERCIAL SOFTGOODS',
        creator: [
          {
            '@type': 'Person',
            name: 'Tanner Gerrard',
            url: `${CANONICAL_ORIGIN}/`,
          },
          {
            '@type': 'Person',
            name: 'Caid Lunt',
          },
        ],
        publisher: {
          '@type': 'Organization',
          name: 'Static Labs',
          url: 'https://staticlabs.us/',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_ORIGIN}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Professional Work',
            item: `${CANONICAL_ORIGIN}/professional-work`,
          },
        ],
      },
    ],
  },
  {
    routePath: '/connect',
    title: 'Connect | nihil',
    description:
      'Get in touch with Tanner Gerrard for collaborations in Softgoods and Technical Apparel design, field testing, and direct inquiries.',
    image: `${CANONICAL_ORIGIN}/images/og/connect.jpg`,
    imageAlt: 'Tanner Gerrard — Softgoods and Technical Apparel Designer in Utah',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Connect | nihil',
        url: `${CANONICAL_ORIGIN}/connect`,
        description:
          'Contact Tanner Gerrard for softgoods and technical alpine apparel collaborations, field testing, and direct orders.',
        mainEntity: {
          '@type': 'Person',
          name: 'Tanner Gerrard',
          jobTitle: 'Softgoods & Technical Apparel Designer',
          email: 'mailto:tannerbgerrard@gmail.com',
          url: `${CANONICAL_ORIGIN}/`,
          sameAs: [
            'https://www.linkedin.com/in/tanner-gerrard-8376241ba',
            'https://www.instagram.com/nihilalpine/',
          ],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Connect', item: `${CANONICAL_ORIGIN}/connect` },
        ],
      },
    ],
  },
  {
    routePath: '/project/01',
    title: 'CORIUM GLOVE | nihil',
    description:
      'Technical analysis and process archive for the CORIUM GLOVE. A durable second skin for your most demanding alpine ascents. Designed by Tanner Gerrard.',
    image: `${CANONICAL_ORIGIN}/images/og/01-corium-glove.jpg`,
    imageAlt: 'CORIUM GLOVE — 0.8mm technical leather alpine climbing glove by Tanner Gerrard',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: 'CORIUM GLOVE',
        description:
          'Constructed from 0.8mm technical leather with high-tenacity UHMWPE stitching. A 34g durable second skin engineered for high-output alpine ascents.',
        url: `${CANONICAL_ORIGIN}/project/01`,
        image: `${CANONICAL_ORIGIN}/images/og/01-corium-glove.jpg`,
        dateCreated: '2024',
        genre: 'DERMAL INTERFACE',
        material: 'Leather & UHMWPE',
        creator: {
          '@type': 'Person',
          name: 'Tanner Gerrard',
          url: `${CANONICAL_ORIGIN}/`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'CORIUM GLOVE', item: `${CANONICAL_ORIGIN}/project/01` },
        ],
      },
    ],
  },
  {
    routePath: '/project/02',
    title: 'ALPTOUR PACK | nihil',
    description:
      'Technical analysis and process archive for the ALPTOUR PACK. Approach heavy. summit light. Designed by Tanner Gerrard.',
    image: `${CANONICAL_ORIGIN}/images/og/02-alptour-pack.jpg`,
    imageAlt: 'ALPTOUR PACK — Modular Ultra 200X alpine pack by Tanner Gerrard',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: 'ALPTOUR PACK',
        description:
          'Modular Ultra 200X alpine load architecture collapsing from a 45L approach hauler to a 25L summit pack at 572g.',
        url: `${CANONICAL_ORIGIN}/project/02`,
        image: `${CANONICAL_ORIGIN}/images/og/02-alptour-pack.jpg`,
        dateCreated: '2026',
        genre: 'LOAD ARCHITECTURE',
        material: 'Ultra 200X',
        creator: {
          '@type': 'Person',
          name: 'Tanner Gerrard',
          url: `${CANONICAL_ORIGIN}/`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'ALPTOUR PACK', item: `${CANONICAL_ORIGIN}/project/02` },
        ],
      },
    ],
  },
  {
    routePath: '/project/03',
    title: 'VENTOUR JACKET | nihil',
    description:
      'Technical analysis and process archive for the VENTOUR JACKET. Mapped protection. zoned breathability. Designed by Tanner Gerrard.',
    image: `${CANONICAL_ORIGIN}/images/og/03-ventour-jacket.jpg`,
    imageAlt: 'VENTOUR JACKET — Zoned breathable 6.6 nylon alpine shell by Tanner Gerrard',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: 'VENTOUR JACKET',
        description:
          'Dynamic micro-climate alpine shell pairing uncalendared and calendared 6.6 nylon with mapped laser ventilation at 350g.',
        url: `${CANONICAL_ORIGIN}/project/03`,
        image: `${CANONICAL_ORIGIN}/images/og/03-ventour-jacket.jpg`,
        dateCreated: '2026',
        genre: 'CLIMATE SYSTEMS',
        material: '(Un)calendared 6.6 Nylon',
        creator: {
          '@type': 'Person',
          name: 'Tanner Gerrard',
          url: `${CANONICAL_ORIGIN}/`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'VENTOUR JACKET', item: `${CANONICAL_ORIGIN}/project/03` },
        ],
      },
    ],
  },
  {
    routePath: '/project/04',
    title: 'STRIDETOUR PANT | nihil',
    description:
      'Technical analysis and process archive for the STRIDETOUR PANT. High-output touring. mapped articulation. Designed by Tanner Gerrard.',
    image: `${CANONICAL_ORIGIN}/images/og/04-stridetour-pant.jpg`,
    imageAlt: 'STRIDETOUR PANT — Mechanical stretch 6.6 nylon alpine touring pant by Tanner Gerrard',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: 'STRIDETOUR PANT',
        description:
          'Procedurally patterned mechanical stretch 6.6 nylon alpine touring pant featuring 3D knee articulation and rotated seams at 347g.',
        url: `${CANONICAL_ORIGIN}/project/04`,
        image: `${CANONICAL_ORIGIN}/images/og/04-stridetour-pant.jpg`,
        dateCreated: '2025',
        genre: 'KINETIC SYSTEMS',
        material: 'Mechanical Stretch 6.6 Nylon',
        creator: {
          '@type': 'Person',
          name: 'Tanner Gerrard',
          url: `${CANONICAL_ORIGIN}/`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'STRIDETOUR PANT', item: `${CANONICAL_ORIGIN}/project/04` },
        ],
      },
    ],
  },
];

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderRouteHtml(templateHtml, spec) {
  const canonicalUrl = `${CANONICAL_ORIGIN}${spec.routePath}`;
  let html = templateHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(spec.title)}</title>`);
  html = html.replace(
    /<meta\s+name="title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="title" content="${escapeAttr(spec.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${escapeAttr(spec.description)}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/>/,
    `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:title" content="${escapeAttr(spec.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${escapeAttr(spec.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:image" content="${escapeAttr(spec.image)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:image:alt" content="${escapeAttr(spec.imageAlt)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:url" content="${escapeAttr(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:title" content="${escapeAttr(spec.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:description" content="${escapeAttr(spec.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:image" content="${escapeAttr(spec.image)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image:alt"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:image:alt" content="${escapeAttr(spec.imageAlt)}" />`
  );

  // Replace homepage JSON-LD scripts with route-specific structured data
  const jsonLdScripts = spec.jsonLd
    .map(
      (block) =>
        `    <script type="application/ld+json">\n${JSON.stringify(block, null, 2)
          .split('\n')
          .map((line) => `      ${line}`)
          .join('\n')}\n    </script>`
    )
    .join('\n');

  html = html.replace(
    /<!-- JSON-LD -->[\s\S]*?(?=<\/head>)/,
    `<!-- JSON-LD -->\n${jsonLdScripts}\n  `
  );

  return html;
}

const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run `vite build` before generating route HTML snapshots.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');

for (const spec of ROUTE_SPECS) {
  const targetDir = path.join(distDir, spec.routePath.replace(/^\//, ''));
  fs.mkdirSync(targetDir, { recursive: true });
  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, renderRouteHtml(templateHtml, spec), 'utf8');
}

console.log(`Generated ${ROUTE_SPECS.length} static SEO route snapshots in dist/.`);
