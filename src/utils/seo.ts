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

export const PAGE_OG_IMAGES = {
  home: `${CANONICAL_ORIGIN}/assets/images/book_hardcover_mockup_1793842329740.jpg`,
  book: `${CANONICAL_ORIGIN}/assets/images/book_hardcover_mockup_1793842329740.jpg`,
  sample: `${CANONICAL_ORIGIN}/assets/images/book_hardcover_mockup_1793842329740.jpg`,
  buy: `${CANONICAL_ORIGIN}/assets/images/book_hardcover_mockup_1793842329740.jpg`,
  author: AUTHOR_PORTRAIT_IMAGE,
  caoFramework: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png`,
  frameworks: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png`,
  manifesto: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-7_54b9a7c1.png`,
  resources: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png`,
  toolkit: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png`,
  students: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-6_eb2b1261.png`,
  speaking: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png`,
  press: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-9_aa999379.png`,
  ideas: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png`,
  stories: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png`,
  teams: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png`,
};

export const PAGE_SEO_CONFIGS: Record<string, PageSeoConfig> = {
  home: {
    title: 'Beyond AI Engineering | Harsh Verma',
    description:
      'Beyond AI Engineering by Harsh Verma explores how engineers move from Creator to Architect to Orchestrator in the age of AI agents, building careers around judgment, systems thinking, and trust.',
    canonicalPath: '/',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.home,
    schemaType: 'WebSite',
  },
  book: {
    title: 'The Book | Beyond AI Engineering — Harsh Verma',
    description:
      'Read Beyond AI Engineering: From Creator to Curator by Harsh Verma. The practical career operating system for engineers navigating AI agents, code generation, and systems orchestration.',
    canonicalPath: '/book',
    ogType: 'book',
    ogImage: PAGE_OG_IMAGES.book,
    schemaType: 'Book',
    breadcrumbs: [{ name: 'The Book', path: '/book' }],
  },
  sample: {
    title: 'Read a Sample Chapter | Beyond AI Engineering — Harsh Verma',
    description:
      'Read an exclusive excerpt from Beyond AI Engineering by Harsh Verma, including Preface (Escaping the Tyranny of Syntax), Introduction, and Chapter 1.',
    canonicalPath: '/book/sample',
    ogType: 'book',
    ogImage: PAGE_OG_IMAGES.sample,
    breadcrumbs: [
      { name: 'The Book', path: '/book' },
      { name: 'Read a Sample', path: '/book/sample' },
    ],
  },
  buy: {
    title: 'Buy Beyond AI Engineering | Hardcover, Paperback & Digital',
    description:
      'Order Beyond AI Engineering by Harsh Verma from Amazon, Barnes & Noble, Bookshop.org, and direct digital retailers globally.',
    canonicalPath: '/book/buy',
    ogType: 'book',
    ogImage: PAGE_OG_IMAGES.buy,
    breadcrumbs: [
      { name: 'The Book', path: '/book' },
      { name: 'Order Now', path: '/book/buy' },
    ],
  },
  teams: {
    title: 'Team & University Bulk Orders | Beyond AI Engineering',
    description:
      'Bring the Creator-Architect-Orchestrator operating system to your engineering organization or university department with tiered bulk pricing, reading syllabi, and author sessions.',
    canonicalPath: '/teams',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.teams,
    breadcrumbs: [{ name: 'Teams & Bulk Licensing', path: '/teams' }],
  },
  author: {
    title: 'Harsh Verma | Author of Beyond AI Engineering',
    description:
      'Harsh Verma is the author of Beyond AI Engineering, Principal AI Engineer at Palo Alto Networks, Fellow of BCS, IEEE Senior Member, and Forbes Technology Council Member.',
    canonicalPath: '/author',
    ogType: 'profile',
    ogImage: PAGE_OG_IMAGES.author,
    schemaType: 'ProfilePage',
    breadcrumbs: [{ name: 'Author', path: '/author' }],
  },
  'cao-framework': {
    title: 'The C.A.O. Framework (Creator → Architect → Orchestrator) | Beyond AI Engineering',
    description:
      'The defining three-phase operating system for software engineers navigating the age of autonomous AI agents by Harsh Verma: Creator (Build), Architect (Design), Orchestrator (Lead).',
    canonicalPath: '/cao-framework',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.caoFramework,
    breadcrumbs: [{ name: 'C.A.O. Framework', path: '/cao-framework' }],
  },
  frameworks: {
    title: '10 Proprietary Frameworks for the Agentic Era | Beyond AI Engineering',
    description:
      'Explore the 10 proprietary frameworks from Beyond AI Engineering by Harsh Verma: Trust Economy, How to What, Prompt Empathy, Agentic Diplomacy, Ethical Curation, and more.',
    canonicalPath: '/frameworks',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.frameworks,
    breadcrumbs: [{ name: 'Frameworks', path: '/frameworks' }],
  },
  manifesto: {
    title: 'The Engineer After Code Manifesto | Beyond AI Engineering',
    description:
      'The 10 foundational theses for software engineers building resilient, high-leverage careers in the era of generative models and autonomous agents.',
    canonicalPath: '/manifesto',
    ogType: 'article',
    ogImage: PAGE_OG_IMAGES.manifesto,
    schemaType: 'Article',
    breadcrumbs: [{ name: 'Manifesto', path: '/manifesto' }],
  },
  resources: {
    title: 'Interactive Engineering Lab & Canvases | Beyond AI Engineering',
    description:
      'Interactive strategy canvases, ethical AI audit rubrics, and the 30-60-90 day engineering leadership transition planner from Beyond AI Engineering.',
    canonicalPath: '/resources',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.resources,
    breadcrumbs: [{ name: 'Resources', path: '/resources' }],
  },
  toolkit: {
    title: 'The Living AI Engineering Toolkit | Beyond AI Engineering',
    description:
      'Curated agentic coding tools, prompt architectures, evaluation harnesses, and observability suites for modern AI orchestrators.',
    canonicalPath: '/toolkit',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.toolkit,
    breadcrumbs: [{ name: 'Toolkit', path: '/toolkit' }],
  },
  students: {
    title: 'Student & New Grad Guide | Beyond AI Engineering',
    description:
      'How computer science students and early-career engineers can thrive when LLMs write syntax: build proof of work, develop product judgment, and orchestrate systems.',
    canonicalPath: '/students',
    ogType: 'article',
    ogImage: PAGE_OG_IMAGES.students,
    breadcrumbs: [{ name: 'Students', path: '/students' }],
  },
  speaking: {
    title: 'Keynotes & Speaking | Harsh Verma — Beyond AI Engineering',
    description:
      'Book Harsh Verma for keynotes, executive briefings, and engineering all-hands on the future of engineering, autonomous agents, and the trust economy.',
    canonicalPath: '/speaking',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.speaking,
    breadcrumbs: [{ name: 'Speaking', path: '/speaking' }],
  },
  press: {
    title: 'Press Kit & Media Assets | Beyond AI Engineering',
    description:
      'Official press kit, high-resolution author portraits, book covers, approved author bio, and media inquiry contacts for Harsh Verma.',
    canonicalPath: '/press',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.press,
    breadcrumbs: [{ name: 'Press', path: '/press' }],
  },
  ideas: {
    title: 'Ideas Beyond the Book | Essays & Research by Harsh Verma',
    description:
      'In-depth essays, technical commentary, and ongoing research on the transition from code-centric to judgment-centric software engineering.',
    canonicalPath: '/ideas',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.ideas,
    breadcrumbs: [{ name: 'Ideas', path: '/ideas' }],
  },
  stories: {
    title: 'Reader Stories & Field Reports | Beyond AI Engineering',
    description:
      'Real-world accounts from engineers, managers, and architects putting the C.A.O. framework and trust economy principles into practice.',
    canonicalPath: '/stories',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.stories,
    breadcrumbs: [{ name: 'Stories', path: '/stories' }],
  },
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
