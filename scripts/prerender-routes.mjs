import fs from 'fs';
import path from 'path';
import vm from 'vm';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const baseIndexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const ORIGIN = 'https://www.beyondaiengineering.com';
const DEFAULT_IMAGE = `${ORIGIN}/assets/images/book_hardcover_mockup_1793842329740.jpg`;
const AUTHOR_IMAGE = `${ORIGIN}/assets/aistudio/harsh_verma_87a0217e.jpg`;
const INSIGHTS_DEFAULT_IMAGE = `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png`;
const FRAMEWORKS_DEFAULT_IMAGE = `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png`;

const FRAMEWORK_OG_IMAGES = {
  'cao-framework': `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png`,
  'trust-economy': `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png`,
  'agentic-diplomacy': `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png`,
  'human-api': `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png`,
  'ethical-curation': `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png`,
  'digital-paper-trail': `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png`,
  'proof-of-work': `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png`,
  'micro-community': `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png`,
};

function loadTsArrayLiteral(relativePath, exportName) {
  const fullPath = path.resolve(relativePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  const clean = raw
    .replace(/^import\s+.*?;\s*$/gm, '')
    .replace(new RegExp(`export\\s+const\\s+${exportName}\\s*:\\s*[^=]+=`), `const ${exportName} =`);
  const ctx = {};
  vm.runInNewContext(`${clean}\nthis.__OUT = ${exportName};`, ctx);
  return ctx.__OUT;
}

function escapeAttr(val) {
  return String(val || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizeWhitespace(val) {
  return String(val || '').replace(/\s+/g, ' ').trim();
}

function truncateToWordBoundary(text, maxLength) {
  const clean = normalizeWhitespace(text);
  if (clean.length <= maxLength) return clean;
  const sliced = clean.slice(0, maxLength - 1);
  const lastSentenceEnd = Math.max(
    sliced.lastIndexOf('. '),
    sliced.lastIndexOf('! '),
    sliced.lastIndexOf('? ')
  );
  if (lastSentenceEnd >= Math.floor(maxLength * 0.68)) {
    return sliced.slice(0, lastSentenceEnd + 1).trim();
  }
  const lastSpace = sliced.lastIndexOf(' ');
  const trimmed = lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced;
  return `${trimmed.replace(/[,:;—–-]+$/, '').trim()}…`;
}

function buildSeoDescription(primary, secondary = '', fallback = '', maxLength = 158) {
  const first = normalizeWhitespace(primary);
  const second = normalizeWhitespace(secondary);
  const third = normalizeWhitespace(fallback);

  if (first.length >= 120 && first.length <= maxLength) return first;
  if (first.length > maxLength) return truncateToWordBoundary(first, maxLength);

  const withPunctuation = /[.!?]$/.test(first) ? first : `${first}.`;
  let combined = withPunctuation;

  if (second && !first.toLowerCase().includes(second.slice(0, 24).toLowerCase())) {
    combined = `${withPunctuation} ${second}`;
  } else if (third && !first.toLowerCase().includes(third.slice(0, 24).toLowerCase())) {
    combined = `${withPunctuation} ${third}`;
  }

  if (combined.length < 110 && third && combined !== `${withPunctuation} ${third}`) {
    combined = `${/\.|\?|!$/.test(combined) ? combined : `${combined}.`} ${third}`;
  }

  return truncateToWordBoundary(combined, maxLength);
}

function toIsoDate(humanDate) {
  const clean = String(humanDate || '').trim();
  if (/^\d{4}$/.test(clean)) return `${clean}-06-01`;
  const parsed = Date.parse(clean);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toISOString().split('T')[0];
  }
  return '2026-10-01';
}

function mapBlogPillar(post) {
  const platform = post.syndicatedPlatform || '';
  if (platform.includes('Forbes') || post.category === 'Interviews') return 'Forbes & Media';
  if (
    post.category === 'Cybersecurity' ||
    post.subCategory === 'Governance & Policy' ||
    post.subCategory === 'Trust & Safety' ||
    post.subCategory === 'Privacy & Security' ||
    post.subCategory === 'Access Control'
  ) {
    return 'Governance & Ethics';
  }
  if (post.category === 'Agentic AI' || post.subCategory === 'Agent Product Strategy') {
    return 'Agentic AI';
  }
  if (post.subCategory === 'Engineering Leadership' || post.subCategory === 'Executive Leadership') {
    return 'Careers After Code';
  }
  return 'Systems & Architecture';
}

function mapArticlePillar(topic, id) {
  if (topic === 'Cybersecurity' || id === 'ai-agents-authority-boundaries') {
    return 'Governance & Ethics';
  }
  if (topic === 'Agentic AI') return 'Agentic AI';
  if (topic === 'Systems Thinking') return 'Systems & Architecture';
  return 'Careers After Code';
}

// Extract slim global schema graph for non-root subpages so each subpage focuses on its own Article/DefinedTerm/BreadcrumbList
let subpageBaseSchemaJson = null;
try {
  const schemaMatch = baseIndexHtml.match(
    /<script id="beyond-schema-graph" type="application\/ld\+json">([\s\S]*?)<\/script>/
  );
  if (schemaMatch) {
    const parsedGraph = JSON.parse(schemaMatch[1]);
    if (Array.isArray(parsedGraph['@graph'])) {
      const coreTypes = new Set(['WebSite', 'Book', 'Person', 'DefinedTermSet']);
      subpageBaseSchemaJson = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': parsedGraph['@graph'].filter((node) => coreTypes.has(node['@type'])),
      });
    }
  }
} catch (err) {
  console.warn('[prerender] Could not filter #beyond-schema-graph for subpages:', err);
}

const staticRoutes = [
  {
    path: '/book',
    title: 'The Book | Beyond AI Engineering — Harsh Verma',
    description:
      'Explore all 11 chapters, 4 parts, and 15 visual blueprints of Beyond AI Engineering: From Creator to Curator by Harsh Verma.',
    ogType: 'book',
    ogImage: DEFAULT_IMAGE,
    webPageType: 'WebPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'The Book', path: '/book' },
    ],
  },
  {
    path: '/book/sample',
    title: 'Read a Sample Chapter | Beyond AI Engineering — Harsh Verma',
    description:
      'Read an excerpt from Beyond AI Engineering by Harsh Verma, including Escaping the Tyranny of Syntax and The Engineer After Code.',
    ogType: 'book',
    ogImage: DEFAULT_IMAGE,
    webPageType: 'WebPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'The Book', path: '/book' },
      { name: 'Sample Reading Room', path: '/book/sample' },
    ],
  },
  {
    path: '/book/buy',
    title: 'Get Beyond AI Engineering | Editions & Direct Author Inquiry',
    description:
      'Request Hardcover, Paperback, Digital, or bulk organizational editions of Beyond AI Engineering by Harsh Verma.',
    ogType: 'book',
    ogImage: DEFAULT_IMAGE,
    webPageType: 'WebPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'The Book', path: '/book' },
      { name: 'Get the Book', path: '/book/buy' },
    ],
  },
  {
    path: '/engineers',
    title: 'For Engineers | Build Your Next Chapter — Beyond AI Engineering',
    description:
      'Practical pathways for mid-to-senior software engineers moving from code output to systems design, judgment, and agent orchestration.',
    ogType: 'website',
    ogImage: FRAMEWORKS_DEFAULT_IMAGE,
    webPageType: 'WebPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'For Engineers', path: '/engineers' },
    ],
  },
  {
    path: '/organizations',
    title: 'For Organizations & Engineering Teams | Beyond AI Engineering',
    description:
      'Bulk book adoption, leadership reading groups, workshops, and keynotes to prepare engineering organizations for the agentic AI era.',
    ogType: 'website',
    ogImage: `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png`,
    webPageType: 'WebPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'For Organizations', path: '/organizations' },
    ],
  },
  {
    path: '/author',
    title: 'Harsh Verma | Author of Beyond AI Engineering',
    description:
      'Harsh Verma is a Principal AI Engineer at Palo Alto Networks, Stanford Distinguished Scholar, Fellow of RSA, BCS & IFGICT, and Forbes Technology Council Member.',
    ogType: 'profile',
    ogImage: AUTHOR_IMAGE,
    webPageType: 'ProfilePage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Author', path: '/author' },
    ],
  },
  {
    path: '/frameworks',
    title: '12 Signature Frameworks for the Agentic Era | Beyond AI Engineering',
    description:
      'Explore all 12 signature frameworks from Beyond AI Engineering by Harsh Verma: C.A.O. Framework, Trust Economy, How to What, Human API, and Ethical Curation.',
    ogType: 'website',
    ogImage: FRAMEWORKS_DEFAULT_IMAGE,
    webPageType: 'CollectionPage',
    keywords: 'C.A.O. Framework, Trust Economy, Prompt Empathy, Agentic Diplomacy, Human API, Beyond AI Engineering',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: '12 Signature Frameworks', path: '/frameworks' },
    ],
  },
  {
    path: '/manifesto',
    title: 'The Engineer After Code Manifesto | Beyond AI Engineering',
    description:
      'Eight foundational axioms for software engineers building resilient careers around judgment, boundaries, and trust.',
    ogType: 'article',
    ogImage: `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-7_54b9a7c1.png`,
    article: {
      type: 'Article',
      headline: 'The Engineering After Code Manifesto',
      datePublished: '2026-10-01',
      section: 'Manifesto',
      keywords: ['Engineering After Code', 'AI Manifesto', 'Trust Economy'],
    },
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'The Manifesto', path: '/manifesto' },
    ],
  },
  {
    path: '/resources',
    title: 'Implementation Lab & 15 Companion Resources | Beyond AI Engineering',
    description:
      '15 interactive canvases, evaluation checklists, governance matrices, and the 30/60/90-day career transition planner.',
    ogType: 'website',
    ogImage: `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png`,
    webPageType: 'CollectionPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Implementation Lab', path: '/resources' },
    ],
  },
  {
    path: '/toolkit',
    title: 'The Living AI Engineering Toolkit | Beyond AI Engineering',
    description:
      'Curated agentic coding tools, evaluation harnesses, observability suites, and security frameworks across 11 categories.',
    ogType: 'website',
    ogImage: `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png`,
    webPageType: 'CollectionPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Implementation Lab', path: '/resources' },
      { name: 'Living AI Toolkit', path: '/toolkit' },
    ],
  },
  {
    path: '/students',
    title: 'For Students & Early-Career Engineers | Beyond AI Engineering',
    description:
      'How computer science students build verifiable proof of work, core CS fundamentals, and engineering judgment when AI writes syntax.',
    ogType: 'article',
    ogImage: `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-6_eb2b1261.png`,
    article: {
      type: 'Article',
      headline: 'For Students & Early-Career Engineers in the Age of AI',
      datePublished: '2026-10-01',
      section: 'Early-Career Engineering',
      keywords: ['CS Students', 'Proof of Work', 'AI Engineering Careers'],
    },
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'For Students', path: '/students' },
    ],
  },
  {
    path: '/speaking',
    title: 'Keynotes & Speaking | Harsh Verma — Beyond AI Engineering',
    description:
      'Invite Harsh Verma for keynotes, executive offsites, university talks, and engineering department masterclasses.',
    ogType: 'website',
    ogImage: `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png`,
    webPageType: 'WebPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Author', path: '/author' },
      { name: 'Speaking & Keynotes', path: '/speaking' },
    ],
  },
  {
    path: '/press',
    title: 'Press Kit & Media Assets | Beyond AI Engineering',
    description:
      'Official press kit, high-resolution author portraits, book covers, verified author biographies, and media contacts.',
    ogType: 'website',
    ogImage: `${ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-9_aa999379.png`,
    webPageType: 'WebPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Author', path: '/author' },
      { name: 'Press & Media Kit', path: '/press' },
    ],
  },
  {
    path: '/stories',
    title: 'Transformation Archetypes & Reader Stories | Beyond AI Engineering',
    description:
      'Illustrative C.A.O. transition profiles showing how engineers and leaders apply the operating system, plus story submissions.',
    ogType: 'website',
    ogImage: FRAMEWORKS_DEFAULT_IMAGE,
    webPageType: 'CollectionPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Reader Stories', path: '/stories' },
    ],
  },
  {
    path: '/contact',
    title: 'Contact Harsh Verma | Beyond AI Engineering',
    description:
      'Reach Harsh Verma directly for individual book inquiries, bulk orders, speaking engagements, media requests, and engineering partnerships.',
    ogType: 'website',
    ogImage: AUTHOR_IMAGE,
    webPageType: 'ContactPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  {
    path: '/insights',
    title: 'Insights: Articles, Forbes Columns & Engineering Notes | Harsh Verma',
    description:
      'Ideas beyond the book: Forbes Technology Council columns, MCP & local inference benchmarks, RSAC & HackerNoon essays, and systems notes.',
    ogType: 'website',
    ogImage: INSIGHTS_DEFAULT_IMAGE,
    webPageType: 'CollectionPage',
    preserveFullGraph: true,
    keywords: 'AI Engineering Blog, Forbes Technology Council, MCP Architecture, Local LLM Benchmarks, Agentic Security',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
    ],
  },
];

// Dynamically generate routes for ALL 12 frameworks from frameworksData.ts
const frameworkRoutes = [];
const frameworks = loadTsArrayLiteral('src/data/frameworksData.ts', 'FRAMEWORKS');
for (const fw of frameworks) {
  const routePath = fw.id === 'cao-framework' ? '/cao-framework' : `/frameworks/${fw.id}`;
  const stageLabel =
    fw.caoPhase === 'All' ? 'Creator to Orchestrator' : `${fw.caoPhase} Stage`;
  const titleCandidate = `${fw.title} (${stageLabel}) | Beyond AI Engineering`;
  const hasFrameworkWord = /framework/i.test(fw.title);
  const fallbackTitle = hasFrameworkWord
    ? `${fw.title} | Beyond AI Engineering`
    : `${fw.title} Framework | Beyond AI Engineering`;
  const title =
    titleCandidate.length <= 72
      ? titleCandidate
      : fallbackTitle.length <= 72
      ? fallbackTitle
      : `${fw.title} | Harsh Verma`;

  const description = buildSeoDescription(
    `${fw.subtitle}: ${fw.definition}`,
    fw.whyItMatters,
    `Explored in ${fw.relatedChapter} of Beyond AI Engineering by Harsh Verma.`
  );
  const ogImage = FRAMEWORK_OG_IMAGES[fw.id] || FRAMEWORKS_DEFAULT_IMAGE;
  const keywordsList = Array.from(
    new Set([
      fw.title,
      `${fw.caoPhase} Stage`,
      fw.category,
      fw.relatedChapter,
      'Beyond AI Engineering',
      'Harsh Verma',
      'AI Engineering Framework',
    ])
  );

  frameworkRoutes.push({
    path: routePath,
    title,
    description,
    ogType: 'article',
    ogImage,
    imageAlt: `${fw.title} — ${fw.subtitle} | Beyond AI Engineering`,
    webPageType: 'WebPage',
    keywords: keywordsList.join(', '),
    frameworkTitle: fw.title,
    frameworkDefinition: fw.definition,
    article: {
      type: 'TechArticle',
      headline: `${fw.title}: ${fw.subtitle}`,
      datePublished: '2026-10-01',
      dateModified: '2026-11-13',
      section: `${fw.caoPhase} · ${fw.category}`,
      keywords: keywordsList,
    },
    twitterLabels: [
      {
        label: 'C.A.O. Tier',
        value: fw.caoPhase === 'All' ? 'Creator · Architect · Orchestrator' : fw.caoPhase,
      },
      {
        label: 'Book Chapter',
        value: fw.relatedChapter,
      },
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: '12 Signature Frameworks', path: '/frameworks' },
      { name: fw.title, path: routePath },
    ],
  });
}

// Dynamically generate routes for ALL blog posts + articles using full content markers
const insightRoutes = [];
const registeredSlugs = new Set();

const blogPosts = loadTsArrayLiteral('src/data/blogData.ts', 'BLOG_POSTS');
for (const post of blogPosts) {
  const slug = post.slug || post.id;
  if (!slug || registeredSlugs.has(slug)) continue;
  registeredSlugs.add(slug);

  const pillar = mapBlogPillar(post);
  const platform = post.syndicatedPlatform || 'harshverma.me';
  const isoDate = toIsoDate(post.publishDate);
  const resolvedImg = post.img
    ? post.img.startsWith('/')
      ? `${ORIGIN}${post.img}`
      : post.img
    : INSIGHTS_DEFAULT_IMAGE;

  const relatedChapter =
    post.category === 'Cybersecurity' ? 'Chapter 5 & Chapter 9' : 'Chapter 3 & Chapter 8';
  const cleanTags = (post.tags || []).filter((t) => t !== 'The');
  const keywordsList = Array.from(
    new Set([pillar, platform, ...cleanTags, relatedChapter, 'Harsh Verma', 'Beyond AI Engineering'])
  );

  const withVenue =
    platform !== 'Beyond AI Engineering'
      ? `${post.title} | ${platform} — Harsh Verma`
      : `${post.title} | Harsh Verma`;
  const title =
    withVenue.length <= 74
      ? withVenue
      : `${post.title} | Harsh Verma`.length <= 74
      ? `${post.title} | Harsh Verma`
      : truncateToWordBoundary(post.title, 70);

  const description = buildSeoDescription(
    post.subtitle,
    post.leadParagraph,
    `${post.keyQuote} (${pillar} · ${post.readTime})`
  );

  insightRoutes.push({
    path: `/insights/${slug}`,
    title,
    description,
    ogType: 'article',
    ogImage: resolvedImg,
    imageAlt: `${post.title} — ${pillar} by Harsh Verma`,
    webPageType: 'WebPage',
    keywords: keywordsList.join(', '),
    article: {
      type: pillar === 'Systems & Architecture' || pillar === 'Governance & Ethics' ? 'TechArticle' : 'Article',
      headline: post.title,
      datePublished: isoDate,
      dateModified: isoDate,
      section: pillar,
      keywords: keywordsList,
    },
    twitterLabels: [
      { label: 'Reading Time', value: post.readTime },
      { label: 'Publication', value: platform },
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
      { name: post.title, path: `/insights/${slug}` },
    ],
  });
}

const articles = loadTsArrayLiteral('src/data/articlesData.ts', 'ARTICLES');
for (const art of articles) {
  const slug = art.id;
  if (!slug || registeredSlugs.has(slug)) continue;
  registeredSlugs.add(slug);

  const pillar = mapArticlePillar(art.topic, art.id);
  const isoDate = toIsoDate(art.publishDate);
  const keywordsList = Array.from(
    new Set([pillar, 'Beyond AI Engineering', art.topic, 'Harsh Verma'])
  );
  const title =
    `${art.title} | Harsh Verma`.length <= 74
      ? `${art.title} | Harsh Verma`
      : truncateToWordBoundary(art.title, 70);
  const description = buildSeoDescription(
    art.subtitle,
    art.leadParagraph,
    `${art.keyQuote} (${pillar} · ${art.readTime})`
  );

  insightRoutes.push({
    path: `/insights/${slug}`,
    title,
    description,
    ogType: 'article',
    ogImage: INSIGHTS_DEFAULT_IMAGE,
    imageAlt: `${art.title} — ${pillar} by Harsh Verma`,
    webPageType: 'WebPage',
    keywords: keywordsList.join(', '),
    article: {
      type: pillar === 'Systems & Architecture' || pillar === 'Governance & Ethics' ? 'TechArticle' : 'Article',
      headline: art.title,
      datePublished: isoDate,
      dateModified: isoDate,
      section: pillar,
      keywords: keywordsList,
    },
    twitterLabels: [
      { label: 'Reading Time', value: art.readTime },
      { label: 'Publication', value: 'Beyond AI Engineering' },
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
      { name: art.title, path: `/insights/${slug}` },
    ],
  });
}

const routes = [...staticRoutes, ...frameworkRoutes, ...insightRoutes];

console.log(
  `Prerendering ${routes.length} canonical static pages (${staticRoutes.length} core + ${frameworkRoutes.length} frameworks + ${insightRoutes.length} insights) with dynamic OpenGraph & Schema.org JSON-LD...`
);

for (const r of routes) {
  const canonicalUrl = `${ORIGIN}${r.path}`;
  const ogImg = r.ogImage || DEFAULT_IMAGE;
  const ogType = r.ogType || 'website';
  const safeTitle = escapeAttr(r.title);
  const safeDesc = escapeAttr(r.description);
  const safeImgAlt = escapeAttr(r.imageAlt || `${r.title} — Beyond AI Engineering`);

  let html = baseIndexHtml;

  // Keep full schema graph on /insights, use core entities + route-specific schema on all other sub-pages
  if (!r.preserveFullGraph && subpageBaseSchemaJson) {
    html = html.replace(
      /<script id="beyond-schema-graph" type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="beyond-schema-graph" type="application/ld+json">${subpageBaseSchemaJson}</script>`
    );
  }

  html = html.replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${safeDesc}" />`
  );
  if (r.keywords) {
    html = html.replace(
      /<meta name="keywords" content=".*?" \/>/,
      `<meta name="keywords" content="${escapeAttr(r.keywords)}" />`
    );
  }
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta property="og:type" content=".*?" \/>/,
    `<meta property="og:type" content="${ogType}" />`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/,
    `<meta property="og:image" content="${escapeAttr(ogImg)}" />`
  );
  html = html.replace(
    /<meta property="og:image:alt" content=".*?" \/>/,
    `<meta property="og:image:alt" content="${safeImgAlt}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?" \/>/,
    `<meta name="twitter:image" content="${escapeAttr(ogImg)}" />`
  );
  html = html.replace(
    /<meta name="twitter:image:alt" content=".*?" \/>/,
    `<meta name="twitter:image:alt" content="${safeImgAlt}" />`
  );

  // Inject Article OpenGraph tags + Twitter custom labels
  const extraMetaLines = [];
  if (ogType === 'article' && r.article) {
    extraMetaLines.push(
      `<meta property="article:published_time" content="${escapeAttr(r.article.datePublished)}" />`
    );
    extraMetaLines.push(
      `<meta property="article:modified_time" content="${escapeAttr(
        r.article.dateModified || r.article.datePublished
      )}" />`
    );
    extraMetaLines.push(`<meta property="article:author" content="Harsh Verma" />`);
    if (r.article.section) {
      extraMetaLines.push(`<meta property="article:section" content="${escapeAttr(r.article.section)}" />`);
    }
    for (const tag of (r.article.keywords || []).slice(0, 6)) {
      extraMetaLines.push(`<meta property="article:tag" content="${escapeAttr(tag)}" />`);
    }
  }
  if (r.twitterLabels && r.twitterLabels.length > 0) {
    extraMetaLines.push(
      `<meta name="twitter:label1" content="${escapeAttr(r.twitterLabels[0].label)}" />`,
      `<meta name="twitter:data1" content="${escapeAttr(r.twitterLabels[0].value)}" />`
    );
    if (r.twitterLabels[1]) {
      extraMetaLines.push(
        `<meta name="twitter:label2" content="${escapeAttr(r.twitterLabels[1].label)}" />`,
        `<meta name="twitter:data2" content="${escapeAttr(r.twitterLabels[1].value)}" />`
      );
    }
  }

  // Build route-specific Schema.org JSON-LD nodes
  const extraGraphNodes = [
    {
      '@type': r.webPageType || 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: r.title,
      description: r.description,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${ORIGIN}/#website` },
      breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
      primaryImageOfPage: { '@type': 'ImageObject', url: ogImg },
      ...(r.webPageType === 'ProfilePage' ? { mainEntity: { '@id': `${ORIGIN}/author#harsh-verma` } } : {}),
    },
  ];

  if (r.frameworkTitle) {
    extraGraphNodes.push(
      {
        '@type': 'TechArticle',
        '@id': `${canonicalUrl}#article`,
        url: canonicalUrl,
        headline: r.article?.headline || r.title,
        description: r.description,
        mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
        author: { '@id': `${ORIGIN}/author#harsh-verma` },
        publisher: {
          '@type': 'Organization',
          name: 'Beyond AI Engineering',
          url: ORIGIN,
          founder: { '@id': `${ORIGIN}/author#harsh-verma` },
        },
        datePublished: r.article?.datePublished || '2026-10-01',
        dateModified: r.article?.dateModified || '2026-11-13',
        articleSection: r.article?.section,
        keywords: (r.article?.keywords || []).join(', '),
        image: ogImg,
      },
      {
        '@type': 'DefinedTerm',
        '@id': `${canonicalUrl}#term`,
        name: r.frameworkTitle,
        description: r.frameworkDefinition || r.description,
        url: canonicalUrl,
        inDefinedTermSet: { '@id': `${ORIGIN}/frameworks#terms` },
      }
    );
  } else if (r.article) {
    extraGraphNodes.push({
      '@type': r.article.type || 'Article',
      '@id': `${canonicalUrl}#article`,
      url: canonicalUrl,
      headline: r.article.headline,
      description: r.description,
      mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
      author: { '@id': `${ORIGIN}/author#harsh-verma` },
      publisher: {
        '@type': 'Organization',
        name: 'Beyond AI Engineering',
        url: ORIGIN,
        founder: { '@id': `${ORIGIN}/author#harsh-verma` },
      },
      datePublished: r.article.datePublished,
      dateModified: r.article.dateModified || r.article.datePublished,
      articleSection: r.article.section,
      keywords: (r.article.keywords || []).join(', '),
      image: ogImg,
    });
  }

  const breadcrumbSchema = r.breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        name: `${r.breadcrumbs[r.breadcrumbs.length - 1].name} Breadcrumb Trail`,
        itemListElement: r.breadcrumbs.map((node, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: node.name,
          item: `${ORIGIN}${node.path === '/' ? '/' : node.path}`,
        })),
      }
    : null;

  const headAdditions = [
    ...extraMetaLines,
    `<script id="beyond-route-schema" type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': extraGraphNodes,
    })}</script>`,
    breadcrumbSchema
      ? `<script id="prerender-breadcrumb-jsonld" type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`
      : '',
  ]
    .filter(Boolean)
    .join('\n    ');

  html = html.replace('</head>', `    ${headAdditions}\n  </head>`);

  const relativeDir = r.path.replace(/^\//, '');
  const targetDir = path.join(distDir, relativeDir);

  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
}

console.log('Static route prerendering complete!');
