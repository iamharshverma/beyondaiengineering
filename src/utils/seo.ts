/**
 * Comprehensive SEO, Social Sharing Cards, Canonical URLs & Schema.org Entity Graph
 * for Beyond AI Engineering (https://www.beyondaiengineering.com)
 */

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'book' | 'article' | 'profile';
  ogImage?: string;
  breadcrumbs?: { name: string; path: string }[];
  schemaType?: 'WebSite' | 'Book' | 'ProfilePage' | 'Article' | 'ItemPage';
  articleData?: {
    headline: string;
    description: string;
    publishDate: string;
    keyQuote?: string;
  };
}

export const CANONICAL_ORIGIN = 'https://www.beyondaiengineering.com';
export const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/assets/images/book_hardcover_mockup_1793842329740.jpg`;
export const AUTHOR_PORTRAIT_IMAGE = `${CANONICAL_ORIGIN}/assets/aistudio/harsh_verma_87a0217e.jpg`;

export const ENTITY_IDS = {
  website: `${CANONICAL_ORIGIN}/#website`,
  book: `${CANONICAL_ORIGIN}/book#book`,
  author: `${CANONICAL_ORIGIN}/author#harsh-verma`,
  authorProfile: `${CANONICAL_ORIGIN}/author#profile`,
};

export const GLOBAL_AUTHOR_PERSON = {
  '@type': 'Person',
  '@id': ENTITY_IDS.author,
  name: 'Harsh Verma',
  jobTitle: 'Principal AI Engineer, Author & Cybersecurity Leader',
  description:
    'Harsh Verma is the author of Beyond AI Engineering and an AI and cybersecurity engineering leader focused on agentic AI, autonomous systems, and enterprise architecture.',
  url: `${CANONICAL_ORIGIN}/author`,
  image: [
    AUTHOR_PORTRAIT_IMAGE,
    `${CANONICAL_ORIGIN}/assets/aistudio/harsh_verma_speaker_portrait_d4e5f6.jpg`,
  ],
  sameAs: [
    'https://www.harshverma.me/',
    'https://www.harshverma.me/page-about',
    'https://www.linkedin.com/in/harshverma59/',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Palo Alto Networks',
  },
  memberOf: [
    { '@type': 'Organization', name: 'British Computer Society (Fellow of BCS)' },
    { '@type': 'Organization', name: 'IEEE (Senior Member)' },
    { '@type': 'Organization', name: 'Forbes Technology Council' },
  ],
};

export const GLOBAL_BOOK_ENTITY = {
  '@type': 'Book',
  '@id': ENTITY_IDS.book,
  url: `${CANONICAL_ORIGIN}/book`,
  name: 'Beyond AI Engineering',
  alternateName: 'Beyond AI Engineering: From Creator to Curator',
  headline: 'Build Your Authority and Lead the AI Agent Revolution',
  author: { '@id': ENTITY_IDS.author },
  image: DEFAULT_OG_IMAGE,
  inLanguage: 'en-US',
  description:
    'A practical career operating system for engineers navigating the age of AI agents. Move from Creator to Architect to Orchestrator.',
  publisher: {
    '@type': 'Organization',
    name: 'Beyond AI Engineering Publishing',
    url: CANONICAL_ORIGIN,
  },
  about: [
    { '@type': 'Thing', name: 'Artificial Intelligence Engineering' },
    { '@type': 'Thing', name: 'Autonomous Agents' },
    { '@type': 'Thing', name: 'The Trust Economy' },
    { '@type': 'Thing', name: 'Creator Architect Orchestrator Framework' },
  ],
};

/**
 * Updates head tags dynamically on route change
 */
export function updatePageSeo(config: PageSeoConfig) {
  if (typeof document === 'undefined') return;

  const fullCanonicalUrl = `${CANONICAL_ORIGIN}${config.canonicalPath}`;
  const ogImage = config.ogImage || DEFAULT_OG_IMAGE;

  // 1. Title
  document.title = config.title;

  // Helper for meta tags
  const setMeta = (nameAttr: string, key: string, content: string) => {
    let el = document.querySelector(`meta[${nameAttr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Meta description
  setMeta('name', 'description', config.description);

  // 3. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullCanonicalUrl);

  // 4. OpenGraph
  setMeta('property', 'og:title', config.title);
  setMeta('property', 'og:description', config.description);
  setMeta('property', 'og:url', fullCanonicalUrl);
  setMeta('property', 'og:image', ogImage);
  setMeta('property', 'og:type', config.ogType || 'website');
  setMeta('property', 'og:site_name', 'Beyond AI Engineering');

  // 5. Twitter Card
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', config.title);
  setMeta('name', 'twitter:description', config.description);
  setMeta('name', 'twitter:image', ogImage);

  // 6. Schema.org Connected Graph
  updateSchemaGraph(config, fullCanonicalUrl);
}

function updateSchemaGraph(config: PageSeoConfig, canonicalUrl: string) {
  let scriptEl = document.getElementById('beyond-schema-graph');
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'beyond-schema-graph';
    scriptEl.setAttribute('type', 'application/ld+json');
    document.head.appendChild(scriptEl);
  }

  const graphItems: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': ENTITY_IDS.website,
      url: `${CANONICAL_ORIGIN}/`,
      name: 'Beyond AI Engineering',
      alternateName: 'Beyond AI Engineering by Harsh Verma',
      publisher: { '@id': ENTITY_IDS.author },
    },
    GLOBAL_BOOK_ENTITY,
    GLOBAL_AUTHOR_PERSON,
  ];

  // Specific entity extensions based on route
  if (config.schemaType === 'ProfilePage' || config.canonicalPath === '/author') {
    graphItems.push({
      '@type': 'ProfilePage',
      '@id': ENTITY_IDS.authorProfile,
      url: canonicalUrl,
      mainEntity: { '@id': ENTITY_IDS.author },
    });
  }

  if (config.schemaType === 'Article' && config.articleData) {
    graphItems.push({
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      url: canonicalUrl,
      headline: config.articleData.headline,
      description: config.articleData.description,
      mainEntityOfPage: canonicalUrl,
      author: { '@id': ENTITY_IDS.author },
      publisher: {
        '@type': 'Organization',
        name: 'Beyond AI Engineering',
        url: CANONICAL_ORIGIN,
      },
      datePublished: config.articleData.publishDate,
      image: DEFAULT_OG_IMAGE,
    });
  }

  // Breadcrumbs
  if (config.breadcrumbs && config.breadcrumbs.length > 0) {
    const itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${CANONICAL_ORIGIN}/`,
      },
      ...config.breadcrumbs.map((b, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: b.name,
        item: `${CANONICAL_ORIGIN}${b.path}`,
      })),
    ];

    graphItems.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumbs`,
      itemListElement,
    });
  }

  scriptEl.textContent = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': graphItems,
    },
    null,
    2
  );
}
