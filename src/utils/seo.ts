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
  isbn: '978-1-965432-01-3',
  numberOfPages: 312,
  bookFormat: [
    'https://schema.org/Hardcover',
    'https://schema.org/Paperback',
    'https://schema.org/EBook',
  ],
  publisher: {
    '@type': 'Organization',
    name: 'Beyond AI Engineering Publishing',
    url: CANONICAL_ORIGIN,
  },
  workExample: [
    {
      '@type': 'Book',
      bookFormat: 'https://schema.org/Hardcover',
      name: 'Beyond AI Engineering (Hardcover Edition)',
      url: `${CANONICAL_ORIGIN}/book/buy`,
    },
    {
      '@type': 'Book',
      bookFormat: 'https://schema.org/Paperback',
      name: 'Beyond AI Engineering (Paperback Edition)',
      url: `${CANONICAL_ORIGIN}/book/buy`,
    },
    {
      '@type': 'Book',
      bookFormat: 'https://schema.org/EBook',
      name: 'Beyond AI Engineering (Digital & Kindle Edition)',
      url: `${CANONICAL_ORIGIN}/book/buy`,
    },
  ],
  about: [
    { '@type': 'Thing', name: 'Artificial Intelligence Engineering' },
    { '@type': 'Thing', name: 'Autonomous Agents' },
    { '@type': 'Thing', name: 'The Trust Economy' },
    { '@type': 'Thing', name: 'Creator Architect Orchestrator Framework' },
    { '@type': 'Thing', name: 'Systems Architecture' },
    { '@type': 'Thing', name: 'Agentic Governance & Diplomacy' },
  ],
};

export const GLOBAL_FRAMEWORKS_SET = {
  '@type': 'DefinedTermSet',
  '@id': `${CANONICAL_ORIGIN}/frameworks#terms`,
  name: 'Beyond AI Engineering Proprietary Frameworks',
  description:
    'The 10 proprietary cognitive and operational frameworks developed by Harsh Verma for software engineers navigating the autonomous agent era.',
  hasDefinedTerm: [
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/cao-framework#term`,
      name: 'C.A.O. Framework (Creator, Architect, Orchestrator)',
      termCode: 'CAO',
      description: 'A three-stage evolutionary model tracking the progression of an engineer from code execution (Creator) to system boundaries (Architect) to agent governance (Orchestrator).',
      url: `${CANONICAL_ORIGIN}/cao-framework`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/trust-economy#term`,
      name: 'The Trust Economy',
      termCode: 'TRUST-ECON',
      description: 'As synthetic output multiplies at zero marginal cost, unverified volume collapses in value while verified human judgment, security, and accountability command a high premium.',
      url: `${CANONICAL_ORIGIN}/frameworks/trust-economy`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/how-to-what#term`,
      name: 'The How-to-What Cognitive Shift',
      termCode: 'HOW-WHAT',
      description: 'The transition from code execution mechanics to problem selection, systems boundary definition, and architectural direction.',
      url: `${CANONICAL_ORIGIN}/frameworks/how-to-what`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/prompt-empathy#term`,
      name: 'Prompt Empathy',
      termCode: 'PROMPT-EMP',
      description: 'Understanding LLM context ingestion, latent representations, and attention dynamics to design deterministic, robust agent workflows.',
      url: `${CANONICAL_ORIGIN}/frameworks/prompt-empathy`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/agentic-diplomacy#term`,
      name: 'Agentic Diplomacy',
      termCode: 'AGENT-DIP',
      description: 'Architecting multi-agent governance, authority limits, tool sandboxes, and cryptographic human approval checkpoints.',
      url: `${CANONICAL_ORIGIN}/frameworks/agentic-diplomacy`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/ethical-curation#term`,
      name: 'Ethical Curation',
      termCode: 'ETHIC-CUR',
      description: 'Continuous evaluation of autonomous systems for bias, hallucinations, and safety, ensuring engineers remain strictly accountable for deployed outcomes.',
      url: `${CANONICAL_ORIGIN}/frameworks/ethical-curation`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/ai-product-sense#term`,
      name: 'AI Product Sense',
      termCode: 'PROD-SENSE',
      description: 'Combining frontier model capabilities, token economics, and human psychology to build durable systems moats rather than ephemeral wrappers.',
      url: `${CANONICAL_ORIGIN}/frameworks/ai-product-sense`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/digital-paper-trail#term`,
      name: 'Digital Paper Trail',
      termCode: 'DIGITAL-TRAIL',
      description: 'Creating inspectable, public evidence of decision-making, Architecture Decision Records (ADRs), and system failure post-mortems.',
      url: `${CANONICAL_ORIGIN}/frameworks/digital-paper-trail`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/micro-community#term`,
      name: 'The Micro-Community Engine',
      termCode: 'MICRO-COMM',
      description: 'Curating high-trust peer networks of 20 to 50 elite domain practitioners rather than pursuing mass vanity social metrics.',
      url: `${CANONICAL_ORIGIN}/frameworks/micro-community`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/proof-of-work#term`,
      name: 'Proof of Work Framework',
      termCode: 'PROOF-WORK',
      description: 'Demonstrating technical authority through live, inspectable software artifacts, reproducible benchmarks, and verified deployments.',
      url: `${CANONICAL_ORIGIN}/frameworks/proof-of-work`,
    },
  ],
};

export const GLOBAL_FAQ_PAGE = {
  '@type': 'FAQPage',
  '@id': `${CANONICAL_ORIGIN}/#faq`,
  name: 'Frequently Asked Questions About Beyond AI Engineering',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Beyond AI Engineering?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beyond AI Engineering is a comprehensive book and career operating system by Harsh Verma for software engineers, tech leads, and computer science students. It provides actionable roadmaps to transition from syntax synthesis (Creator) to systems architecture (Architect) to autonomous agent orchestration and governance (Orchestrator).',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is Harsh Verma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Harsh Verma is the author of Beyond AI Engineering, a Principal AI Engineer at Palo Alto Networks, a Fellow of the British Computer Society (FBCS), an IEEE Senior Member, and a member of the Forbes Technology Council. He leads initiatives in agentic AI architecture and enterprise cybersecurity.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the C.A.O. Framework?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The C.A.O. Framework defines three tiers of engineering evolution: Creator (writing syntax, rapid prototyping), Architect (system boundaries, failure domains, trade-off evaluation), and Orchestrator (governing multi-agent systems, human-in-the-loop approvals, and business trust).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Trust Economy in software engineering?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Trust Economy is an economic law of technical labor in the generative AI era: as the cost of generating code approaches zero, raw code volume loses market value, while verified human judgment, security guarantees, and systems accountability become the most valuable technical assets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I read or purchase Beyond AI Engineering?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beyond AI Engineering is available globally in Hardcover, Paperback, and Digital editions through Amazon, Barnes & Noble, Bookshop.org, and direct digital distributors. You can also read free sample chapters and take the interactive C.A.O. Diagnostic directly at beyondaiengineering.com.',
      },
    },
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
    schemaType: 'Article',
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
    GLOBAL_FRAMEWORKS_SET,
    GLOBAL_FAQ_PAGE,
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
