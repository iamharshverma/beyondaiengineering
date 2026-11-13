import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';

/**
 * Automated Sitemap Generator (src/scripts/generate-sitemap.ts)
 * Uses fast-glob to crawl the src/views folder for page definitions,
 * dynamically generates public/sitemap.xml with accurate lastmod dates
 * for all canonical routes.
 */

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

const BASE_URL = process.env.BASE_URL || 'https://www.beyondaiengineering.com';

function getIsoDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getFrameworkIds(): string[] {
  try {
    const filePath = path.resolve('src/data/frameworksData.ts');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const matches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
      return Array.from(new Set(matches.map((m) => m[1])));
    }
  } catch (err) {
    console.warn('Could not read frameworks data:', err);
  }
  return [];
}

function getInsightSlugs(): string[] {
  const slugs: string[] = [];
  try {
    const blogPath = path.resolve('src/data/blogData.ts');
    if (fs.existsSync(blogPath)) {
      const content = fs.readFileSync(blogPath, 'utf-8');
      const matches = [...content.matchAll(/(?:"slug"|slug):\s*['"]([^'"]+)['"]/g)];
      for (const m of matches) slugs.push(m[1]);
    }
  } catch (err) {
    console.warn('Could not read blog data:', err);
  }
  try {
    const articlesPath = path.resolve('src/data/articlesData.ts');
    if (fs.existsSync(articlesPath)) {
      const content = fs.readFileSync(articlesPath, 'utf-8');
      const matches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
      for (const m of matches) slugs.push(m[1]);
    }
  } catch (err) {
    console.warn('Could not read articles data:', err);
  }
  return Array.from(new Set(slugs));
}

export async function generateSitemap(): Promise<number> {
  console.log('Crawling src/views with fast-glob...');

  const viewFiles = await glob('src/views/**/*.tsx', {
    cwd: process.cwd(),
    absolute: true,
  });

  const urls: SitemapUrl[] = [];
  const currentDate = getIsoDate(new Date());

  const frameworkIds = getFrameworkIds();
  const insightSlugs = getInsightSlugs();

  for (const filePath of viewFiles) {
    const fileName = path.basename(filePath);
    let stat: fs.Stats | null = null;
    try {
      stat = fs.statSync(filePath);
    } catch {}

    const lastmod = stat ? getIsoDate(stat.mtime) : currentDate;

    switch (fileName) {
      case 'HomeView.tsx':
        urls.push({ loc: '/', lastmod, changefreq: 'weekly', priority: '1.0' });
        break;
      case 'BookView.tsx':
        urls.push({ loc: '/book', lastmod, changefreq: 'weekly', priority: '0.95' });
        break;
      case 'SampleView.tsx':
        urls.push({ loc: '/book/sample', lastmod, changefreq: 'monthly', priority: '0.90' });
        break;
      case 'BuyView.tsx':
        urls.push({ loc: '/book/buy', lastmod, changefreq: 'monthly', priority: '0.90' });
        break;
      case 'EngineersView.tsx':
        urls.push({ loc: '/engineers', lastmod, changefreq: 'monthly', priority: '0.90' });
        break;
      case 'StudentsView.tsx':
        urls.push({ loc: '/students', lastmod, changefreq: 'monthly', priority: '0.85' });
        break;
      case 'TeamsView.tsx':
        urls.push({ loc: '/organizations', lastmod, changefreq: 'monthly', priority: '0.85' });
        break;
      case 'AuthorView.tsx':
        urls.push({ loc: '/author', lastmod, changefreq: 'monthly', priority: '0.95' });
        break;
      case 'CAOFrameworkView.tsx':
        urls.push({ loc: '/cao-framework', lastmod, changefreq: 'weekly', priority: '0.95' });
        break;
      case 'FrameworksView.tsx':
        urls.push({ loc: '/frameworks', lastmod, changefreq: 'weekly', priority: '0.90' });
        break;
      case 'FrameworkDetailView.tsx':
        for (const id of frameworkIds) {
          if (id !== 'cao-framework') {
            urls.push({
              loc: `/frameworks/${id}`,
              lastmod,
              changefreq: 'monthly',
              priority: '0.85',
            });
          }
        }
        break;
      case 'ManifestoView.tsx':
        urls.push({ loc: '/manifesto', lastmod, changefreq: 'monthly', priority: '0.85' });
        break;
      case 'ResourcesView.tsx':
        urls.push({ loc: '/resources', lastmod, changefreq: 'weekly', priority: '0.85' });
        break;
      case 'ToolkitView.tsx':
        urls.push({ loc: '/toolkit', lastmod, changefreq: 'weekly', priority: '0.85' });
        break;
      case 'SpeakingView.tsx':
        urls.push({ loc: '/speaking', lastmod, changefreq: 'monthly', priority: '0.80' });
        break;
      case 'PressView.tsx':
        urls.push({ loc: '/press', lastmod, changefreq: 'monthly', priority: '0.80' });
        break;
      case 'ContactView.tsx':
        urls.push({ loc: '/contact', lastmod, changefreq: 'monthly', priority: '0.80' });
        break;
      case 'StoriesView.tsx':
        urls.push({ loc: '/stories', lastmod, changefreq: 'monthly', priority: '0.80' });
        break;
      case 'InsightsView.tsx':
        urls.push({ loc: '/insights', lastmod, changefreq: 'weekly', priority: '0.90' });
        break;
      case 'InsightDetailView.tsx':
        for (const slug of insightSlugs) {
          urls.push({
            loc: `/insights/${slug}`,
            lastmod,
            changefreq: 'monthly',
            priority: '0.85',
          });
        }
        break;
      default:
        break;
    }
  }

  // Deduplicate URLs by loc
  const uniqueMap = new Map<string, SitemapUrl>();
  for (const item of urls) {
    if (!uniqueMap.has(item.loc)) {
      uniqueMap.set(item.loc, item);
    }
  }
  const uniqueUrls = Array.from(uniqueMap.values());

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  for (const item of uniqueUrls) {
    const fullLoc = `${BASE_URL}${item.loc === '/' ? '/' : item.loc}`;
    xml += '  <url>\n';
    xml += `    <loc>${fullLoc}</loc>\n`;
    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  const publicPath = path.resolve('public/sitemap.xml');
  fs.mkdirSync(path.dirname(publicPath), { recursive: true });
  fs.writeFileSync(publicPath, xml, 'utf-8');
  console.log(`[sitemap] Wrote ${uniqueUrls.length} canonical URLs to ${publicPath}`);

  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distPath, xml, 'utf-8');
    console.log(`[sitemap] Mirrored to ${distPath}`);
  }

  return uniqueUrls.length;
}

generateSitemap().catch((err) => {
  console.error('[sitemap] Failed to generate sitemap:', err);
  process.exit(1);
});
