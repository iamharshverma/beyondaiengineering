/**
 * Comprehensive SEO, Social Sharing Cards, Canonical URLs & Schema.org Entity Graph
 * for Beyond AI Engineering (https://www.beyondaiengineering.com)
 */

import { SITE_CONFIG } from '../config/siteConfig';
import { Framework } from '../types';
import { INSIGHTS, InsightItem } from '../data/insightsData';

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'book' | 'article' | 'profile';
  ogImage?: string;
  imageAlt?: string;
  keywords?: string[];
  breadcrumbs?: { name: string; path: string }[];
  schemaType?:
    | 'WebSite'
    | 'WebPage'
    | 'CollectionPage'
    | 'ContactPage'
    | 'Book'
    | 'ProfilePage'
    | 'Article'
    | 'TechArticle'
    | 'ItemPage';
  articleData?: {
    headline: string;
    description: string;
    publishDate: string;
    modifiedDate?: string;
    keyQuote?: string;
    section?: string;
    keywords?: string[];
  };
  frameworkData?: {
    id: string;
    name: string;
    subtitle: string;
    category: string;
    caoPhase: string;
    definition: string;
  };
  twitterLabels?: { label: string; value: string }[];
}

export const CANONICAL_ORIGIN = SITE_CONFIG.canonicalOrigin;
export const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/assets/images/book_hardcover_mockup_1793842329740.jpg`;
export const AUTHOR_PORTRAIT_IMAGE = `${CANONICAL_ORIGIN}${SITE_CONFIG.author.portraitPrimary}`;
export const AUTHOR_PORTRAIT_SECONDARY = `${CANONICAL_ORIGIN}${SITE_CONFIG.author.portraitSecondary}`;

export const ENTITY_IDS = {
  website: `${CANONICAL_ORIGIN}/#website`,
  book: `${CANONICAL_ORIGIN}/book#book`,
  author: `${CANONICAL_ORIGIN}/author#harsh-verma`,
  authorProfile: `${CANONICAL_ORIGIN}/author#profile`,
};

export const GLOBAL_AUTHOR_PERSON = {
  '@type': 'Person',
  '@id': ENTITY_IDS.author,
  name: SITE_CONFIG.author.name,
  jobTitle: SITE_CONFIG.author.title,
  description: SITE_CONFIG.author.verifiedBio,
  url: `${CANONICAL_ORIGIN}/author`,
  image: [AUTHOR_PORTRAIT_IMAGE, AUTHOR_PORTRAIT_SECONDARY],
  sameAs: [
    SITE_CONFIG.author.personalSiteUrl,
    'https://www.harshverma.me/page-about',
    SITE_CONFIG.author.linkedinUrl,
    SITE_CONFIG.author.forbesUrl,
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Palo Alto Networks',
  },
  memberOf: [
    { '@type': 'Organization', name: 'Royal Society of Arts (Fellow, FRSA)' },
    { '@type': 'Organization', name: 'British Computer Society (Fellow, FBCS)' },
    { '@type': 'Organization', name: 'IEEE (Senior Member)' },
    { '@type': 'Organization', name: 'Forbes Technology Council' },
  ],
};

export const GLOBAL_BOOK_ENTITY: Record<string, unknown> = {
  '@type': 'Book',
  '@id': ENTITY_IDS.book,
  url: `${CANONICAL_ORIGIN}/book`,
  name: SITE_CONFIG.book.title,
  alternateName: SITE_CONFIG.book.fullTitle,
  headline: SITE_CONFIG.book.tagline,
  author: { '@id': ENTITY_IDS.author },
  image: DEFAULT_OG_IMAGE,
  inLanguage: 'en-US',
  description: SITE_CONFIG.book.shortDescription,
  ...(SITE_CONFIG.book.isbn ? { isbn: SITE_CONFIG.book.isbn } : {}),
  ...(SITE_CONFIG.book.pageCount ? { numberOfPages: SITE_CONFIG.book.pageCount } : {}),
  ...(SITE_CONFIG.book.releaseDate ? { datePublished: SITE_CONFIG.book.releaseDate } : {}),
  bookFormat: [
    'https://schema.org/Hardcover',
    'https://schema.org/Paperback',
    'https://schema.org/EBook',
  ],
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
      name: 'Beyond AI Engineering (Digital Edition)',
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
  name: 'Beyond AI Engineering Signature Frameworks',
  description:
    'The 12 proprietary cognitive and operational frameworks developed by Harsh Verma for software engineers navigating the autonomous agent era.',
  hasDefinedTerm: [
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/cao-framework#term`,
      name: 'C.A.O. Framework (Creator, Architect, Orchestrator)',
      termCode: 'CAO',
      description:
        'A three-stage evolutionary model tracking the progression of an engineer from code execution (Creator) to system boundaries (Architect) to agent governance (Orchestrator).',
      url: `${CANONICAL_ORIGIN}/cao-framework`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/trust-economy#term`,
      name: 'The Trust Economy',
      termCode: 'TRUST-ECON',
      description:
        'As synthetic output multiplies at zero marginal cost, unverified volume collapses in value while verified human judgment, security, and accountability command a high premium.',
      url: `${CANONICAL_ORIGIN}/frameworks/trust-economy`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/how-to-what#term`,
      name: 'The How-to-What Cognitive Shift',
      termCode: 'HOW-WHAT',
      description:
        'The transition from code execution mechanics to problem selection, systems boundary definition, and architectural direction.',
      url: `${CANONICAL_ORIGIN}/frameworks/how-to-what`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/human-api#term`,
      name: 'The Human API',
      termCode: 'HUMAN-API',
      description:
        'The synthesis of Prompt Empathy and Agentic Diplomacy as an authoritative interface between human intent and multi-agent execution.',
      url: `${CANONICAL_ORIGIN}/frameworks/human-api`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/prompt-empathy#term`,
      name: 'Prompt Empathy',
      termCode: 'PROMPT-EMP',
      description:
        'Understanding LLM context ingestion, latent representations, and attention dynamics to design deterministic, robust agent workflows.',
      url: `${CANONICAL_ORIGIN}/frameworks/prompt-empathy`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/agentic-diplomacy#term`,
      name: 'Agentic Diplomacy',
      termCode: 'AGENT-DIP',
      description:
        'Architecting multi-agent governance, authority limits, tool sandboxes, and cryptographic human approval checkpoints.',
      url: `${CANONICAL_ORIGIN}/frameworks/agentic-diplomacy`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/ethical-curation#term`,
      name: 'Ethical Curation',
      termCode: 'ETHIC-CUR',
      description:
        'Continuous evaluation of autonomous systems for bias, hallucinations, and safety, ensuring engineers remain strictly accountable for deployed outcomes.',
      url: `${CANONICAL_ORIGIN}/frameworks/ethical-curation`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/ai-product-sense#term`,
      name: 'AI Product Sense',
      termCode: 'PROD-SENSE',
      description:
        'Combining frontier model capabilities, token economics, and human psychology to build durable systems moats rather than ephemeral wrappers.',
      url: `${CANONICAL_ORIGIN}/frameworks/ai-product-sense`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/unlearn-relearn#term`,
      name: 'Unlearn / Relearn',
      termCode: 'UNLEARN-RELEARN',
      description:
        'Continually challenging outdated implementation rituals and adapting intelligently to autonomous engineering workflows.',
      url: `${CANONICAL_ORIGIN}/frameworks/unlearn-relearn`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/digital-paper-trail#term`,
      name: 'Digital Paper Trail',
      termCode: 'DIGITAL-TRAIL',
      description:
        'Creating inspectable, public evidence of decision-making, Architecture Decision Records (ADRs), and system failure post-mortems.',
      url: `${CANONICAL_ORIGIN}/frameworks/digital-paper-trail`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/micro-community#term`,
      name: 'The Micro-Community Engine',
      termCode: 'MICRO-COMM',
      description:
        'Curating high-trust peer networks of 20 to 50 elite domain practitioners rather than pursuing mass vanity social metrics.',
      url: `${CANONICAL_ORIGIN}/frameworks/micro-community`,
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${CANONICAL_ORIGIN}/frameworks/proof-of-work#term`,
      name: 'Proof of Work Framework',
      termCode: 'PROOF-WORK',
      description:
        'Demonstrating technical authority through live, inspectable software artifacts, reproducible benchmarks, and verified deployments.',
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
        text: 'Beyond AI Engineering: From Creator to Curator by Harsh Verma is a book and career operating system for software engineers, tech leads, organizations, and students navigating the age of AI agents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is Harsh Verma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: SITE_CONFIG.author.verifiedBio,
      },
    },
    {
      '@type': 'Question',
      name: 'What is the C.A.O. Framework?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The C.A.O. Framework defines three operating modes in engineering: Creator (turning ideas into working systems), Architect (designing system boundaries and evaluating trade-offs), and Orchestrator (coordinating AI agents, humans, permissions, and strategic outcomes).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Trust Economy in software engineering?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Trust Economy describes what happens when AI makes technical output abundant: raw syntax loses scarcity while verified human judgment, security assurance, and accountability grow in value.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I request Beyond AI Engineering or arrange team orders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can explore free chapter excerpts, run the 12-scenario C.A.O. Diagnostic, download 15 implementation resources, and submit individual or organizational book inquiries directly at beyondaiengineering.com.',
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
  engineers: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png`,
  students: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-6_eb2b1261.png`,
  organizations: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png`,
  speaking: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png`,
  press: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-9_aa999379.png`,
  insights: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png`,
  stories: `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png`,
  contact: AUTHOR_PORTRAIT_IMAGE,
};

export const PAGE_SEO_CONFIGS: Record<string, PageSeoConfig> = {
  home: {
    title: 'Beyond AI Engineering | From Creator to Curator — Harsh Verma',
    description:
      'Beyond AI Engineering by Harsh Verma helps software engineers move from Creator to Architect to Orchestrator in the age of AI agents.',
    canonicalPath: '/',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.home,
    schemaType: 'WebSite',
  },
  book: {
    title: 'The Book | Beyond AI Engineering — Harsh Verma',
    description:
      'Explore all 11 chapters, 4 parts, and 15 visual blueprints of Beyond AI Engineering: From Creator to Curator by Harsh Verma.',
    canonicalPath: '/book',
    ogType: 'book',
    ogImage: PAGE_OG_IMAGES.book,
    schemaType: 'Book',
    breadcrumbs: [{ name: 'The Book', path: '/book' }],
  },
  sample: {
    title: 'Read a Sample Chapter | Beyond AI Engineering — Harsh Verma',
    description:
      'Read an excerpt from Beyond AI Engineering by Harsh Verma, including Escaping the Tyranny of Syntax, Chapter 1, and Chapter 3.',
    canonicalPath: '/book/sample',
    ogType: 'book',
    ogImage: PAGE_OG_IMAGES.sample,
    breadcrumbs: [
      { name: 'The Book', path: '/book' },
      { name: 'Read a Sample', path: '/book/sample' },
    ],
  },
  buy: {
    title: 'Get Beyond AI Engineering | Editions & Direct Author Inquiry',
    description:
      'Request Hardcover, Paperback, Digital, or bulk team editions of Beyond AI Engineering by Harsh Verma.',
    canonicalPath: '/book/buy',
    ogType: 'book',
    ogImage: PAGE_OG_IMAGES.buy,
    breadcrumbs: [
      { name: 'The Book', path: '/book' },
      { name: 'Get the Book', path: '/book/buy' },
    ],
  },
  engineers: {
    title: 'For Engineers | Build Your Next Chapter — Beyond AI Engineering',
    description:
      'Practical pathways for mid-to-senior software engineers moving from code output to systems design, judgment, and agent orchestration.',
    canonicalPath: '/engineers',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.engineers,
    breadcrumbs: [{ name: 'For Engineers', path: '/engineers' }],
  },
  students: {
    title: 'For Students & Early-Career Engineers | Beyond AI Engineering',
    description:
      'How CS students and early-career engineers build durable proof of work, systems fundamentals, and judgment when AI writes syntax.',
    canonicalPath: '/students',
    ogType: 'article',
    ogImage: PAGE_OG_IMAGES.students,
    schemaType: 'Article',
    breadcrumbs: [{ name: 'For Students', path: '/students' }],
  },
  organizations: {
    title: 'For Organizations & Engineering Teams | Beyond AI Engineering',
    description:
      'Bulk book adoption, leadership reading groups, workshops, and keynotes to prepare engineering organizations for the agentic AI era.',
    canonicalPath: '/organizations',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.organizations,
    breadcrumbs: [{ name: 'For Organizations', path: '/organizations' }],
  },
  teams: {
    title: 'For Organizations & Engineering Teams | Beyond AI Engineering',
    description:
      'Bring the Creator-Architect-Orchestrator operating system to your engineering organization or university department.',
    canonicalPath: '/organizations',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.organizations,
    breadcrumbs: [{ name: 'For Organizations', path: '/organizations' }],
  },
  author: {
    title: 'Harsh Verma | Author of Beyond AI Engineering',
    description:
      'Harsh Verma is a Principal AI Engineer at Palo Alto Networks, Stanford Distinguished Scholar, Fellow of RSA, BCS & IFGICT, and Forbes Technology Council Member.',
    canonicalPath: '/author',
    ogType: 'profile',
    ogImage: PAGE_OG_IMAGES.author,
    schemaType: 'ProfilePage',
    breadcrumbs: [{ name: 'Author', path: '/author' }],
  },
  'cao-framework': {
    title: 'The C.A.O. Framework (Creator → Architect → Orchestrator) | Beyond AI Engineering',
    description:
      'Explore Creator, Architect, and Orchestrator—the three operating stages of engineering value in the AI era, plus the 12-scenario diagnostic.',
    canonicalPath: '/cao-framework',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.caoFramework,
    breadcrumbs: [{ name: 'C.A.O. Framework', path: '/cao-framework' }],
  },
  frameworks: {
    title: '12 Signature Frameworks for the Agentic Era | Beyond AI Engineering',
    description:
      'Explore all 12 signature frameworks from Beyond AI Engineering by Harsh Verma, including Trust Economy, How → What, Human API, and Ethical Curation.',
    canonicalPath: '/frameworks',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.frameworks,
    schemaType: 'CollectionPage',
    keywords: [
      'AI Engineering Frameworks',
      'C.A.O. Framework',
      'Trust Economy',
      'Human API',
      'Prompt Empathy',
      'Agentic Diplomacy',
    ],
    breadcrumbs: [{ name: 'Frameworks', path: '/frameworks' }],
  },
  manifesto: {
    title: 'The Engineer After Code Manifesto | Beyond AI Engineering',
    description:
      'The 8 foundational axioms for software engineers building resilient, high-leverage careers around judgment, boundaries, and trust.',
    canonicalPath: '/manifesto',
    ogType: 'article',
    ogImage: PAGE_OG_IMAGES.manifesto,
    schemaType: 'Article',
    breadcrumbs: [{ name: 'Manifesto', path: '/manifesto' }],
  },
  resources: {
    title: 'Implementation Lab & 15 Companion Resources | Beyond AI Engineering',
    description:
      '15 interactive canvases, evaluation checklists, governance matrices, and student roadmaps aligned to Beyond AI Engineering.',
    canonicalPath: '/resources',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.resources,
    schemaType: 'CollectionPage',
    breadcrumbs: [{ name: 'Resources', path: '/resources' }],
  },
  toolkit: {
    title: 'The Living AI Engineering Toolkit | Beyond AI Engineering',
    description:
      'Curated agentic coding tools, evaluation harnesses, observability suites, and security frameworks for AI orchestrators.',
    canonicalPath: '/toolkit',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.toolkit,
    schemaType: 'CollectionPage',
    breadcrumbs: [
      { name: 'Resources', path: '/resources' },
      { name: 'Toolkit', path: '/toolkit' },
    ],
  },
  speaking: {
    title: 'Keynotes & Speaking | Harsh Verma — Beyond AI Engineering',
    description:
      'Invite Harsh Verma for keynotes, executive offsites, university talks, and engineering department masterclasses.',
    canonicalPath: '/speaking',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.speaking,
    schemaType: 'WebPage',
    breadcrumbs: [{ name: 'Speaking', path: '/speaking' }],
  },
  press: {
    title: 'Media & Press Kit | Beyond AI Engineering — Harsh Verma',
    description:
      'Approved author biographies, interview angles, high-resolution covers and portraits, and direct media inquiry contacts.',
    canonicalPath: '/press',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.press,
    schemaType: 'WebPage',
    breadcrumbs: [{ name: 'Press', path: '/press' }],
  },
  insights: {
    title: 'Insights: Articles, Forbes Columns & Engineering Notes | Harsh Verma',
    description:
      'Ideas beyond the book: Forbes Technology Council columns, MCP & local model benchmarks, essays, and systems architecture dispatches.',
    canonicalPath: '/insights',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.insights,
    schemaType: 'CollectionPage',
    keywords: [
      'AI Engineering Blog',
      'Forbes Technology Council',
      'MCP Architecture',
      'Local LLM Benchmarks',
      'Agentic Security',
    ],
    breadcrumbs: [{ name: 'Insights', path: '/insights' }],
  },
  ideas: {
    title: 'Insights: Articles, Forbes Columns & Engineering Notes | Harsh Verma',
    description:
      'In-depth essays, technical commentary, and ongoing research on the transition from code-centric to judgment-centric engineering.',
    canonicalPath: '/insights',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.insights,
    schemaType: 'CollectionPage',
    breadcrumbs: [{ name: 'Insights', path: '/insights' }],
  },
  blog: {
    title: 'Insights: Articles, Forbes Columns & Engineering Notes | Harsh Verma',
    description:
      'Field experiments, local model benchmarks, MCP implementations, Forbes columns, and engineering essays by Harsh Verma.',
    canonicalPath: '/insights',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.insights,
    schemaType: 'CollectionPage',
    breadcrumbs: [{ name: 'Insights', path: '/insights' }],
  },
  stories: {
    title: 'Transformation Archetypes & Reader Stories | Beyond AI Engineering',
    description:
      'Illustrative C.A.O. transition patterns across software engineering, architecture, and leadership, plus a community story submission channel.',
    canonicalPath: '/stories',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.stories,
    schemaType: 'CollectionPage',
    breadcrumbs: [{ name: 'Stories', path: '/stories' }],
  },
  contact: {
    title: 'Contact Harsh Verma | Beyond AI Engineering',
    description:
      'Reach Harsh Verma directly for individual book inquiries, bulk orders, speaking engagements, media requests, and engineering partnerships.',
    canonicalPath: '/contact',
    ogType: 'website',
    ogImage: PAGE_OG_IMAGES.contact,
    schemaType: 'ContactPage',
    breadcrumbs: [{ name: 'Contact', path: '/contact' }],
  },
};

export const FRAMEWORK_OG_IMAGES: Record<string, string> = {
  'cao-framework': `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png`,
  'trust-economy': `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png`,
  'agentic-diplomacy': `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png`,
  'human-api': `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png`,
  'ethical-curation': `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png`,
  'digital-paper-trail': `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png`,
  'proof-of-work': `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png`,
  'micro-community': `${CANONICAL_ORIGIN}/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png`,
};

function normalizeWhitespace(value: string): string {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

export function truncateToWordBoundary(text: string, maxLength: number): string {
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

export function buildSeoDescription(
  primary: string,
  secondary?: string,
  fallback?: string,
  maxLength = 158
): string {
  const first = normalizeWhitespace(primary);
  const second = normalizeWhitespace(secondary || '');
  const third = normalizeWhitespace(fallback || '');

  if (first.length >= 120 && first.length <= maxLength) {
    return first;
  }
  if (first.length > maxLength) {
    return truncateToWordBoundary(first, maxLength);
  }

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

function buildFrameworkSeoTitle(framework: Framework): string {
  const stageLabel =
    framework.caoPhase === 'All' ? 'Creator to Orchestrator' : `${framework.caoPhase} Stage`;
  const candidate = `${framework.title} (${stageLabel}) | ${SITE_CONFIG.book.title}`;
  if (candidate.length <= 72) return candidate;
  const hasFrameworkWord = /framework/i.test(framework.title);
  const fallback = hasFrameworkWord
    ? `${framework.title} | ${SITE_CONFIG.book.title}`
    : `${framework.title} Framework | ${SITE_CONFIG.book.title}`;
  if (fallback.length <= 72) return fallback;
  return `${framework.title} | Harsh Verma`;
}

function buildInsightSeoTitle(insight: InsightItem): string {
  const withVenue =
    insight.syndicatedPlatform && insight.syndicatedPlatform !== 'Beyond AI Engineering'
      ? `${insight.title} | ${insight.syndicatedPlatform} — ${SITE_CONFIG.author.name}`
      : `${insight.title} | ${SITE_CONFIG.author.name}`;
  if (withVenue.length <= 74) return withVenue;
  const standard = `${insight.title} | ${SITE_CONFIG.author.name}`;
  if (standard.length <= 74) return standard;
  return truncateToWordBoundary(insight.title, 70);
}

export function buildDynamicFrameworkSeo(framework: Framework): PageSeoConfig {
  const canonicalPath =
    framework.id === 'cao-framework' ? '/cao-framework' : `/frameworks/${framework.id}`;
  const ogImage = FRAMEWORK_OG_IMAGES[framework.id] || PAGE_OG_IMAGES.frameworks;
  const description = buildSeoDescription(
    `${framework.subtitle}: ${framework.definition}`,
    framework.whyItMatters,
    `Explored in ${framework.relatedChapter} of ${SITE_CONFIG.book.title} by ${SITE_CONFIG.author.name}.`
  );
  const title = buildFrameworkSeoTitle(framework);
  const keywords = Array.from(
    new Set([
      framework.title,
      `${framework.caoPhase} Stage`,
      framework.category,
      framework.relatedChapter,
      'Beyond AI Engineering',
      'Harsh Verma',
      'AI Engineering Framework',
    ])
  );

  return {
    title,
    description,
    canonicalPath,
    ogType: 'article',
    ogImage,
    imageAlt: `${framework.title} — ${framework.subtitle} | Beyond AI Engineering`,
    schemaType: 'TechArticle',
    keywords,
    articleData: {
      headline: `${framework.title}: ${framework.subtitle}`,
      description,
      publishDate: '2026-10-01',
      modifiedDate: '2026-11-13',
      section: `${framework.caoPhase} · ${framework.category}`,
      keywords,
    },
    frameworkData: {
      id: framework.id,
      name: framework.title,
      subtitle: framework.subtitle,
      category: framework.category,
      caoPhase: framework.caoPhase,
      definition: framework.definition,
    },
    twitterLabels: [
      {
        label: 'C.A.O. Tier',
        value: framework.caoPhase === 'All' ? 'Creator · Architect · Orchestrator' : framework.caoPhase,
      },
      {
        label: 'Book Chapter',
        value: framework.relatedChapter,
      },
    ],
    breadcrumbs: [
      { name: '12 Signature Frameworks', path: '/frameworks' },
      { name: framework.title, path: canonicalPath },
    ],
  };
}

export function buildDynamicInsightSeo(insight: InsightItem): PageSeoConfig {
  const canonicalPath = `/insights/${insight.slug}`;
  const resolvedImage = insight.img
    ? insight.img.startsWith('/')
      ? `${CANONICAL_ORIGIN}${insight.img}`
      : insight.img
    : PAGE_OG_IMAGES.insights;

  const description = buildSeoDescription(
    insight.subtitle,
    insight.leadParagraph,
    `${insight.keyQuote} (${insight.pillar} · ${insight.readTime})`
  );
  const title = buildInsightSeoTitle(insight);
  const keywords = Array.from(
    new Set([
      insight.pillar,
      insight.syndicatedPlatform,
      ...insight.tags,
      insight.relatedChapter,
      SITE_CONFIG.author.name,
      SITE_CONFIG.book.title,
    ])
  );

  return {
    title,
    description,
    canonicalPath,
    ogType: 'article',
    ogImage: resolvedImage,
    imageAlt: `${insight.title} — ${insight.pillar} by ${SITE_CONFIG.author.name}`,
    schemaType:
      insight.pillar === 'Systems & Architecture' || insight.pillar === 'Governance & Ethics'
        ? 'TechArticle'
        : 'Article',
    keywords,
    articleData: {
      headline: insight.title,
      description,
      publishDate: insight.isoDate,
      modifiedDate: insight.modifiedDate,
      keyQuote: insight.keyQuote,
      section: insight.pillar,
      keywords,
    },
    twitterLabels: [
      { label: 'Reading Time', value: insight.readTime },
      { label: 'Publication', value: insight.syndicatedPlatform },
    ],
    breadcrumbs: [
      { name: 'Insights', path: '/insights' },
      { name: insight.title, path: canonicalPath },
    ],
  };
}

function buildInsightsArticleSchemaNode(insight: InsightItem) {
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
    keywords: Array.from(new Set([insight.pillar, insight.syndicatedPlatform, ...insight.tags])).join(
      ', '
    ),
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
      name: SITE_CONFIG.siteName,
      url: CANONICAL_ORIGIN,
      founder: {
        '@id': ENTITY_IDS.author,
      },
    },
  };
}

export function updatePageSeo(config: PageSeoConfig) {
  if (typeof document === 'undefined') return;

  const fullCanonicalUrl = `${CANONICAL_ORIGIN}${config.canonicalPath}`;
  const ogImage = config.ogImage || DEFAULT_OG_IMAGE;
  const imageAlt = config.imageAlt || `${config.title} — ${SITE_CONFIG.siteName}`;
  const keywordsContent =
    config.keywords && config.keywords.length > 0
      ? config.keywords.join(', ')
      : 'Beyond AI Engineering, Harsh Verma, C.A.O. Framework, Trust Economy, Agentic AI, Software Engineering';

  document.title = config.title;

  const setMeta = (nameAttr: string, key: string, content: string) => {
    let el = document.querySelector(`meta[${nameAttr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const removeMeta = (nameAttr: string, key: string) => {
    document.querySelectorAll(`meta[${nameAttr}="${key}"]`).forEach((el) => el.remove());
  };

  setMeta('name', 'description', config.description);
  setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMeta('name', 'author', SITE_CONFIG.author.name);
  setMeta('name', 'keywords', keywordsContent);

  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullCanonicalUrl);

  setMeta('property', 'og:locale', 'en_US');
  setMeta('property', 'og:title', config.title);
  setMeta('property', 'og:description', config.description);
  setMeta('property', 'og:url', fullCanonicalUrl);
  setMeta('property', 'og:image', ogImage);
  setMeta('property', 'og:image:alt', imageAlt);
  setMeta('property', 'og:type', config.ogType || 'website');
  setMeta('property', 'og:site_name', SITE_CONFIG.siteName);

  // Clean previous article:tag entries before applying current route's tags
  removeMeta('property', 'article:tag');

  if (config.ogType === 'article' && config.articleData) {
    setMeta('property', 'article:published_time', config.articleData.publishDate);
    setMeta(
      'property',
      'article:modified_time',
      config.articleData.modifiedDate || config.articleData.publishDate
    );
    setMeta('property', 'article:author', SITE_CONFIG.author.name);
    if (config.articleData.section) {
      setMeta('property', 'article:section', config.articleData.section);
    } else {
      removeMeta('property', 'article:section');
    }
    if (config.articleData.keywords && config.articleData.keywords.length > 0) {
      config.articleData.keywords.slice(0, 6).forEach((tag) => {
        const tagMeta = document.createElement('meta');
        tagMeta.setAttribute('property', 'article:tag');
        tagMeta.setAttribute('content', tag);
        document.head.appendChild(tagMeta);
      });
    }
  } else {
    removeMeta('property', 'article:published_time');
    removeMeta('property', 'article:modified_time');
    removeMeta('property', 'article:author');
    removeMeta('property', 'article:section');
  }

  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', config.title);
  setMeta('name', 'twitter:description', config.description);
  setMeta('name', 'twitter:image', ogImage);
  setMeta('name', 'twitter:image:alt', imageAlt);

  if (config.twitterLabels && config.twitterLabels.length > 0) {
    const firstLabel = config.twitterLabels[0];
    setMeta('name', 'twitter:label1', firstLabel.label);
    setMeta('name', 'twitter:data1', firstLabel.value);
    if (config.twitterLabels[1]) {
      setMeta('name', 'twitter:label2', config.twitterLabels[1].label);
      setMeta('name', 'twitter:data2', config.twitterLabels[1].value);
    } else {
      removeMeta('name', 'twitter:label2');
      removeMeta('name', 'twitter:data2');
    }
  } else {
    removeMeta('name', 'twitter:label1');
    removeMeta('name', 'twitter:data1');
    removeMeta('name', 'twitter:label2');
    removeMeta('name', 'twitter:data2');
  }

  updateSchemaGraph(config, fullCanonicalUrl);
}

function updateSchemaGraph(config: PageSeoConfig, canonicalUrl: string) {
  document.getElementById('beyond-route-schema')?.remove();
  document.getElementById('prerender-breadcrumb-jsonld')?.remove();

  let scriptEl = document.getElementById('beyond-schema-graph');
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'beyond-schema-graph';
    scriptEl.setAttribute('type', 'application/ld+json');
    document.head.appendChild(scriptEl);
  }

  const webPageType =
    config.schemaType === 'CollectionPage'
      ? 'CollectionPage'
      : config.schemaType === 'ContactPage'
      ? 'ContactPage'
      : config.schemaType === 'ProfilePage'
      ? 'ProfilePage'
      : 'WebPage';

  const articleNodes = INSIGHTS.map(buildInsightsArticleSchemaNode);

  const siteBreadcrumbList = {
    '@type': 'BreadcrumbList',
    '@id': `${CANONICAL_ORIGIN}/#breadcrumb`,
    name: 'Beyond AI Engineering Primary Navigation',
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
    author: { '@id': ENTITY_IDS.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.siteName,
      url: CANONICAL_ORIGIN,
      founder: { '@id': ENTITY_IDS.author },
    },
    blogPost: articleNodes.map((node) => ({ '@id': node['@id'] })),
  };

  const graphItems: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': ENTITY_IDS.website,
      url: `${CANONICAL_ORIGIN}/`,
      name: SITE_CONFIG.siteName,
      alternateName: 'Beyond AI Engineering by Harsh Verma',
      publisher: { '@id': ENTITY_IDS.author },
    },
    {
      '@type': webPageType,
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: config.title,
      description: config.description,
      inLanguage: 'en-US',
      isPartOf: { '@id': ENTITY_IDS.website },
      breadcrumb: {
        '@id':
          config.canonicalPath !== '/' ? `${canonicalUrl}#breadcrumb` : `${CANONICAL_ORIGIN}/#breadcrumb`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: config.ogImage || DEFAULT_OG_IMAGE,
      },
      ...(webPageType === 'ProfilePage' ? { mainEntity: { '@id': ENTITY_IDS.author } } : {}),
    },
    GLOBAL_BOOK_ENTITY,
    GLOBAL_AUTHOR_PERSON,
    GLOBAL_FRAMEWORKS_SET,
    GLOBAL_FAQ_PAGE,
  ];

  // Include BreadcrumbList + Blog + all Article rich snippets on root and Insights hub
  if (config.canonicalPath === '/' || config.canonicalPath === '/insights') {
    graphItems.push(siteBreadcrumbList, insightsBlogEntity, ...articleNodes);
  }

  if (
    (config.schemaType === 'Article' || config.schemaType === 'TechArticle') &&
    config.articleData
  ) {
    graphItems.push({
      '@type': config.schemaType,
      '@id': `${canonicalUrl}#article`,
      url: canonicalUrl,
      headline: config.articleData.headline,
      description: config.articleData.description,
      mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
      author: { '@id': ENTITY_IDS.author },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.siteName,
        url: CANONICAL_ORIGIN,
        founder: { '@id': ENTITY_IDS.author },
      },
      datePublished: config.articleData.publishDate,
      dateModified: config.articleData.modifiedDate || config.articleData.publishDate,
      image: config.ogImage || DEFAULT_OG_IMAGE,
      ...(config.articleData.section ? { articleSection: config.articleData.section } : {}),
      ...(config.articleData.keywords && config.articleData.keywords.length > 0
        ? { keywords: config.articleData.keywords.join(', ') }
        : {}),
    });
  }

  if (config.frameworkData) {
    graphItems.push({
      '@type': 'DefinedTerm',
      '@id': `${canonicalUrl}#term`,
      name: config.frameworkData.name,
      description: config.frameworkData.definition,
      url: canonicalUrl,
      inDefinedTermSet: { '@id': `${CANONICAL_ORIGIN}/frameworks#terms` },
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
