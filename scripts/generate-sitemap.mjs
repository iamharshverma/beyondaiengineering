import fs from 'fs';
import path from 'path';

/**
 * Automated Sitemap Generator for Beyond AI Engineering
 * Scans router definitions, framework catalogs, and published articles
 * to build an up-to-date sitemap.xml with lastmod timestamps.
 */

const BASE_URL = process.env.BASE_URL || 'https://www.beyondaiengineering.com';
const currentDate = new Date().toISOString().split('T')[0];

function getFrameworkIds() {
  const filePath = path.resolve('src/data/frameworksData.ts');
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
  const ids = Array.from(new Set(matches.map(m => m[1])));
  return ids;
}

function getArticleIds() {
  const filePath = path.resolve('src/data/articlesData.ts');
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
  const ids = Array.from(new Set(matches.map(m => m[1])));
  return ids;
}

function getFileLastMod(relPath) {
  try {
    const fullPath = path.resolve(relPath);
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      return stat.mtime.toISOString().split('T')[0];
    }
  } catch (e) {}
  return currentDate;
}

export function generateSitemapXml() {
  const frameworkIds = getFrameworkIds();
  const articleIds = getArticleIds();

  const coreLastMod = getFileLastMod('src/App.tsx');
  const frameworksLastMod = getFileLastMod('src/data/frameworksData.ts');
  const articlesLastMod = getFileLastMod('src/data/articlesData.ts');

  const pages = [
    // Core Entity Pages
    { loc: '/', lastmod: coreLastMod, changefreq: 'weekly', priority: '1.0' },
    { loc: '/book', lastmod: coreLastMod, changefreq: 'weekly', priority: '0.95' },
    { loc: '/book/sample', lastmod: coreLastMod, changefreq: 'monthly', priority: '0.90' },
    { loc: '/book/buy', lastmod: coreLastMod, changefreq: 'monthly', priority: '0.90' },
    { loc: '/teams', lastmod: coreLastMod, changefreq: 'monthly', priority: '0.85' },
    { loc: '/author', lastmod: coreLastMod, changefreq: 'monthly', priority: '0.95' },

    // Primary Framework Pages
    { loc: '/cao-framework', lastmod: frameworksLastMod, changefreq: 'weekly', priority: '0.95' },
    { loc: '/frameworks', lastmod: frameworksLastMod, changefreq: 'weekly', priority: '0.90' },
  ];

  // Dynamic Framework Detail Pages
  for (const id of frameworkIds) {
    if (id !== 'cao-framework') {
      pages.push({
        loc: `/frameworks/${id}`,
        lastmod: frameworksLastMod,
        changefreq: 'monthly',
        priority: '0.85',
      });
    }
  }

  // Audience & Knowledge Pages
  pages.push(
    { loc: '/manifesto', lastmod: coreLastMod, changefreq: 'monthly', priority: '0.85' },
    { loc: '/resources', lastmod: coreLastMod, changefreq: 'weekly', priority: '0.85' },
    { loc: '/toolkit', lastmod: coreLastMod, changefreq: 'weekly', priority: '0.85' },
    { loc: '/students', lastmod: coreLastMod, changefreq: 'monthly', priority: '0.85' },
    { loc: '/speaking', lastmod: coreLastMod, changefreq: 'monthly', priority: '0.80' },
    { loc: '/press', lastmod: coreLastMod, changefreq: 'monthly', priority: '0.80' },
    { loc: '/ideas', lastmod: articlesLastMod, changefreq: 'weekly', priority: '0.85' }
  );

  // Dynamic Article Detail Pages
  for (const id of articleIds) {
    pages.push({
      loc: `/ideas/${id}`,
      lastmod: articlesLastMod,
      changefreq: 'monthly',
      priority: '0.80',
    });
  }

  // Reader Stories
  pages.push({
    loc: '/stories',
    lastmod: coreLastMod,
    changefreq: 'monthly',
    priority: '0.80',
  });

  // Construct XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  for (const p of pages) {
    const fullUrl = `${BASE_URL}${p.loc === '/' ? '/' : p.loc}`;
    xml += '  <url>\n';
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${p.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
    xml += `    <priority>${p.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  // Save to public/sitemap.xml
  const publicPath = path.resolve('public/sitemap.xml');
  fs.mkdirSync(path.dirname(publicPath), { recursive: true });
  fs.writeFileSync(publicPath, xml, 'utf-8');
  console.log(`Successfully generated sitemap with ${pages.length} URLs -> public/sitemap.xml`);

  // If dist/ exists, also save to dist/sitemap.xml
  const distPath = path.resolve('dist/sitemap.xml');
  if (fs.existsSync(path.resolve('dist'))) {
    fs.writeFileSync(distPath, xml, 'utf-8');
    console.log(`Copied sitemap to dist/sitemap.xml`);
  }

  return pages.length;
}

// Execute if run directly
generateSitemapXml();
