import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';
import { FRAMEWORKS } from '../data/frameworksData';
import { INSIGHTS } from '../data/insightsData';
import {
  CANONICAL_ORIGIN,
  DEFAULT_OG_IMAGE,
  ENTITY_IDS,
  GLOBAL_AUTHOR_PERSON,
  GLOBAL_BOOK_ENTITY,
  GLOBAL_FAQ_PAGE,
  GLOBAL_FRAMEWORKS_SET,
  PAGE_OG_IMAGES,
  buildSeoDescription,
} from '../utils/seo';

/**
 * Automated Sitemap & Schema.org Graph Synchronizer (src/scripts/generate-sitemap.ts)
 * - Uses fast-glob to crawl src/views for page definitions and generates public/sitemap.xml
 * - Extends & synchronizes index.html <script id="beyond-schema-graph"> with BreadcrumbList,
 *   Blog, and Article rich snippets for all blog posts mapped to the Author Person entity.
 */

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

const BASE_URL = process.env.BASE_URL || CANONICAL_ORIGIN;

function getIsoDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function buildRootSchemaGraph() {
  const articleNodes = INSIGHTS.map((insight) => {
    const articleUrl = `${CANONICAL_ORIGIN}/insights/${insight.slug}`;
    const imageUrl = insight.img
      ? insight.img.startsWith('/')
        ? `${CANONICAL_ORIGIN}${insight.img}`
        : insight.img
      : PAGE_OG_IMAGES.insights;

    return {
      '@type': 'Article',
      '@id': `${articleUrl}#article`,
      url: articleUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${articleUrl}#webpage`,
      },
      headline: insight.title,
      alternativeHeadline: insight.subtitle,
      description: buildSeoDescription(insight.subtitle, insight.leadParagraph, insight.keyQuote),
      image: imageUrl,
      datePublished: insight.isoDate,
      dateModified: insight.modifiedDate,
      articleSection: insight.pillar,
      keywords: Array.from(
        new Set([insight.pillar, insight.syndicatedPlatform, ...insight.tags])
      ).join(', '),
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      isPartOf: {
        '@id': `${CANONICAL_ORIGIN}/insights#blog`,
      },
      author: {
        '@id': ENTITY_IDS.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Beyond AI Engineering',
        url: CANONICAL_ORIGIN,
        founder: {
          '@id': ENTITY_IDS.author,
        },
      },
    };
  });

  const siteBreadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': `${CANONICAL_ORIGIN}/#breadcrumb`,
    name: 'Beyond AI Engineering Site Hierarchy',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'The Book', item: `${CANONICAL_ORIGIN}/book` },
      {
        '@type': 'ListItem',
        position: 3,
        name: '12 Signature Frameworks',
        item: `${CANONICAL_ORIGIN}/frameworks`,
      },
      { '@type': 'ListItem', position: 4, name: 'Insights', item: `${CANONICAL_ORIGIN}/insights` },
    ],
  };

  const insightsBreadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': `${CANONICAL_ORIGIN}/insights#breadcrumb`,
    name: 'Insights Breadcrumb Trail',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${CANONICAL_ORIGIN}/insights` },
    ],
  };

  const insightsBlogEntity = {
    '@type': 'Blog',
    '@id': `${CANONICAL_ORIGIN}/insights#blog`,
    url: `${CANONICAL_ORIGIN}/insights`,
    name: 'Beyond AI Engineering Insights & Technical Essays',
    description:
      'Forbes Technology Council columns, MCP & local inference benchmarks, RSAC security briefings, and systems engineering essays by Harsh Verma.',
    inLanguage: 'en-US',
    isPartOf: { '@id': ENTITY_IDS.website },
    breadcrumb: { '@id': `${CANONICAL_ORIGIN}/insights#breadcrumb` },
    author: { '@id': ENTITY_IDS.author },
    publisher: {
      '@type': 'Organization',
      name: 'Beyond AI Engineering',
      url: CANONICAL_ORIGIN,
      founder: { '@id': ENTITY_IDS.author },
    },
    blogPost: articleNodes.map((node) => ({ '@id': node['@id'] })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': ENTITY_IDS.website,
        url: `${CANONICAL_ORIGIN}/`,
        name: 'Beyond AI Engineering',
        alternateName: 'Beyond AI Engineering by Harsh Verma',
        description:
          'A practical career operating system for engineers navigating the age of AI agents.',
        publisher: {
          '@id': ENTITY_IDS.author,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${CANONICAL_ORIGIN}/#webpage`,
        url: `${CANONICAL_ORIGIN}/`,
        name: 'Beyond AI Engineering | From Creator to Curator — Harsh Verma',
        description:
          'Beyond AI Engineering: From Creator to Curator by Harsh Verma explores how engineers move from Creator to Architect to Orchestrator in the age of AI agents.',
        inLanguage: 'en-US',
        isPartOf: { '@id': ENTITY_IDS.website },
        breadcrumb: { '@id': `${CANONICAL_ORIGIN}/#breadcrumb` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: DEFAULT_OG_IMAGE,
        },
      },
      GLOBAL_BOOK_ENTITY,
      GLOBAL_AUTHOR_PERSON,
      GLOBAL_FRAMEWORKS_SET,
      GLOBAL_FAQ_PAGE,
      siteBreadcrumbList,
      insightsBreadcrumbList,
      insightsBlogEntity,
      ...articleNodes,
    ],
  };
}

function syncIndexHtmlSchemaGraph(): void {
  const indexPath = path.resolve('index.html');
  if (!fs.existsSync(indexPath)) return;

  const html = fs.readFileSync(indexPath, 'utf-8');
  const schemaGraph = buildRootSchemaGraph();
  const formattedJson = JSON.stringify(schemaGraph, null, 2)
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n');

  const replacement = `<script id="beyond-schema-graph" type="application/ld+json">\n${formattedJson}\n    </script>`;
  const pattern = /<script id="beyond-schema-graph" type="application\/ld\+json">[\s\S]*?<\/script>/;

  if (!pattern.test(html)) {
    console.warn('[schema-sync] Could not locate #beyond-schema-graph in index.html');
    return;
  }

  const updatedHtml = html.replace(pattern, replacement);
  if (updatedHtml !== html) {
    fs.writeFileSync(indexPath, updatedHtml, 'utf-8');
    console.log(
      `[schema-sync] Updated index.html Schema.org @graph (${INSIGHTS.length} Article nodes + BreadcrumbList + Author mapping)`
    );
  } else {
    console.log(
      `[schema-sync] index.html Schema.org @graph already up-to-date (${INSIGHTS.length} Article nodes)`
    );
  }
}

export async function generateSitemap(): Promise<number> {
  syncIndexHtmlSchemaGraph();
  console.log('Crawling src/views with fast-glob...');

  const viewFiles = await glob('src/views/**/*.tsx', {
    cwd: process.cwd(),
    absolute: true,
  });

  const urls: SitemapUrl[] = [];
  const currentDate = getIsoDate(new Date());

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
        for (const fw of FRAMEWORKS) {
          if (fw.id !== 'cao-framework') {
            urls.push({
              loc: `/frameworks/${fw.id}`,
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
        for (const entry of INSIGHTS) {
          urls.push({
            loc: `/insights/${entry.slug}`,
            lastmod: entry.modifiedDate || entry.isoDate || lastmod,
            changefreq: 'monthly',
            priority: '0.85',
          });
        }
        break;
      default:
        break;
    }
  }

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
