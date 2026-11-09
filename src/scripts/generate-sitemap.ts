import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';

/**
 * Automated Sitemap Generator (src/scripts/generate-sitemap.ts)
 * Uses fast-glob to crawl the src/views folder for page definitions,
 * dynamically generates a public/sitemap.xml with accurate lastmod dates
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
      return Array.from(new Set(matches.map(m => m[1])));
    }
  } catch (err) {
    console.warn('Could not read frameworks data:', err);
  }
  return [];
}

function getArticleIds(): string[] {
  try {
    const filePath = path.resolve('src/data/articlesData.ts');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const matches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
      return Array.from(new Set(matches.map(m => m[1])));
    }
  } catch (err) {
    console.warn('Could not read articles data:', err);
  }
  return [];
}

function getBlogSlugs(): string[] {
  try {
    const filePath = path.resolve('src/data/blogData.ts');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const matches = [...content.matchAll(/(?:"slug"|slug):\s*['"]([^'"]+)['"]/g)];
      return Array.from(new Set(matches.map(m => m[1])));
    }
  } catch (err) {
    console.warn('Could not read blog data:', err);
  }
  return [];
}

export async function generateSitemap(): Promise<number> {
  console.log('Crawling src/views with fast-glob...');

  // 1. Crawl all view definitions using fast-glob
  const viewFiles = await glob('src/views/**/*.tsx', {
    cwd: process.cwd(),
    absolute: true,
  });

  const urls: SitemapUrl[] = [];
  const currentDate = getIsoDate(new Date());

  const frameworkIds = getFrameworkIds();
  const articleIds = getArticleIds();
  const blogSlugs = getBlogSlugs();

  // 2. Map view files to canonical route paths
  for (const filePath of viewFiles) {
    const fileName = path.basename(filePath);
    let stat: fs.Stats | null = null;
    try {
      stat = fs.statSync(filePath);
    } catch (e) {}

    const lastmod = stat ? getIsoDate(stat.mtime) : currentDate;

    switch (fileName) {
      case 'HomeView.tsx':
        urls.push({
          loc: '/',
          lastmod,
          changefreq: 'weekly',
          priority: '1.0',
        });
        break;

      case 'BookView.tsx':
        urls.push({
          loc: '/book',
          lastmod,
          changefreq: 'weekly',
          priority: '0.95',
        });
        break;

      case 'SampleView.tsx':
        urls.push({
          loc: '/book/sample',
          lastmod,
          changefreq: 'monthly',
          priority: '0.90',
        });
        break;

      case 'BuyView.tsx':
        urls.push({
          loc: '/book/buy',
          lastmod,
          changefreq: 'monthly',
          priority: '0.90',
        });
        break;

      case 'TeamsView.tsx':
        urls.push({
          loc: '/teams',
          lastmod,
          changefreq: 'monthly',
          priority: '0.85',
        });
        break;

      case 'AuthorView.tsx':
        urls.push({
          loc: '/author',
          lastmod,
          changefreq: 'monthly',
          priority: '0.95',
        });
        break;

      case 'CAOFrameworkView.tsx':
        urls.push({
          loc: '/cao-framework',
          lastmod,
          changefreq: 'weekly',
          priority: '0.95',
        });
        break;

      case 'FrameworksView.tsx':
        urls.push({
          loc: '/frameworks',
          lastmod,
          changefreq: 'weekly',
          priority: '0.90',
        });
        break;

      case 'FrameworkDetailView.tsx': {
        // Expand into all individual framework canonical routes
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
      }

      case 'ManifestoView.tsx':
        urls.push({
          loc: '/manifesto',
          lastmod,
          changefreq: 'monthly',
          priority: '0.85',
        });
        break;

      case 'ResourcesView.tsx':
        urls.push({
          loc: '/resources',
          lastmod,
          changefreq: 'weekly',
          priority: '0.85',
        });
        break;

      case 'ToolkitView.tsx':
        urls.push({
          loc: '/toolkit',
          lastmod,
          changefreq: 'weekly',
          priority: '0.85',
        });
        break;

      case 'StudentsView.tsx':
        urls.push({
          loc: '/students',
          lastmod,
          changefreq: 'monthly',
          priority: '0.85',
        });
        break;

      case 'SpeakingView.tsx':
        urls.push({
          loc: '/speaking',
          lastmod,
          changefreq: 'monthly',
          priority: '0.80',
        });
        break;

      case 'PressView.tsx':
        urls.push({
          loc: '/press',
          lastmod,
          changefreq: 'monthly',
          priority: '0.80',
        });
        break;

      case 'IdeasView.tsx':
        urls.push({
          loc: '/ideas',
          lastmod,
          changefreq: 'weekly',
          priority: '0.85',
        });
        break;

      case 'ArticleDetailView.tsx': {
        // Expand into all individual essay canonical routes
        for (const id of articleIds) {
          urls.push({
            loc: `/ideas/${id}`,
            lastmod,
            changefreq: 'monthly',
            priority: '0.80',
          });
        }
        break;
      }

      case 'StoriesView.tsx':
        urls.push({
          loc: '/stories',
          lastmod,
          changefreq: 'monthly',
          priority: '0.80',
        });
        break;

      case 'BlogView.tsx':
        urls.push({
          loc: '/blog',
          lastmod,
          changefreq: 'weekly',
          priority: '0.90',
        });
        break;

      case 'BlogDetailView.tsx': {
        // Expand into all individual blog post canonical routes
        for (const slug of blogSlugs) {
          urls.push({
            loc: `/blog/${slug}`,
            lastmod,
            changefreq: 'monthly',
            priority: '0.85',
          });
        }
        break;
      }

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

  // 3. Generate XML
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

  // 4. Write to public/sitemap.xml
  const publicPath = path.resolve('public/sitemap.xml');
  fs.mkdirSync(path.dirname(publicPath), { recursive: true });
  fs.writeFileSync(publicPath, xml, 'utf-8');
  console.log(`[sitemap] Wrote ${uniqueUrls.length} URLs to ${publicPath}`);

  // Also write to dist/sitemap.xml if dist exists
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
