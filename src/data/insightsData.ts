import { ARTICLES } from './articlesData';
import { BLOG_POSTS } from './blogData';

export type InsightPillar =
  | 'Systems & Architecture'
  | 'Agentic AI'
  | 'Careers After Code'
  | 'Governance & Ethics'
  | 'Forbes & Media';

export const INSIGHT_PILLARS: Array<'All' | InsightPillar> = [
  'All',
  'Systems & Architecture',
  'Agentic AI',
  'Careers After Code',
  'Governance & Ethics',
  'Forbes & Media',
];

export interface InsightItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  pillar: InsightPillar;
  syndicatedPlatform: string;
  publishDate: string;
  isoDate: string;
  modifiedDate: string;
  readTime: string;
  keyQuote: string;
  leadParagraph: string;
  content: string[];
  isFeatured: boolean;
  externalUrl?: string;
  relatedFrameworkId: string;
  relatedChapter: string;
  tags: string[];
  benchmarks?: { label: string; value: string; note?: string }[];
  sourceType: 'essay' | 'column' | 'field-note';
}

function toIsoDate(humanDate: string): string {
  const clean = humanDate.trim();
  if (/^\d{4}$/.test(clean)) return `${clean}-06-01`;
  const parsed = Date.parse(clean);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toISOString().split('T')[0];
  }
  return '2026-10-01';
}

function mapArticlePillar(topic: string, id: string): InsightPillar {
  if (topic === 'Cybersecurity' || id === 'ai-agents-authority-boundaries') {
    return 'Governance & Ethics';
  }
  if (topic === 'Agentic AI') return 'Agentic AI';
  if (topic === 'Systems Thinking') return 'Systems & Architecture';
  return 'Careers After Code';
}

function mapArticleFramework(id: string): { frameworkId: string; chapter: string } {
  switch (id) {
    case 'engineer-after-code':
      return { frameworkId: 'cao-framework', chapter: 'Chapter 1: Welcome to the New Age' };
    case 'why-ai-makes-judgment-more-valuable':
      return { frameworkId: 'trust-economy', chapter: 'Chapter 2 & Chapter 6' };
    case 'from-how-to-what':
      return { frameworkId: 'how-to-what', chapter: 'Chapter 7: From Stagnation to Innovation' };
    case 'ai-agents-authority-boundaries':
      return { frameworkId: 'agentic-diplomacy', chapter: 'Chapter 5 & Chapter 9' };
    case 'first-agent-experiment-not-product':
      return { frameworkId: 'prompt-empathy', chapter: 'Chapter 5: Mastering AI Workflows' };
    case 'why-multi-agent-systems-change-cybersecurity':
      return { frameworkId: 'human-api', chapter: 'Chapter 5 & Chapter 9' };
    case 'career-moat-for-engineers':
      return { frameworkId: 'digital-paper-trail', chapter: 'Chapter 6: Authority in the Trust Economy' };
    case 'why-professional-authority-beats-personal-branding':
      return { frameworkId: 'micro-community', chapter: 'Chapter 6 & Chapter 8' };
    case 'what-students-should-learn':
      return { frameworkId: 'proof-of-work', chapter: 'Chapter 11: Guide for Students' };
    default:
      return { frameworkId: 'cao-framework', chapter: 'Chapter 3: Reimagining the Engineer' };
  }
}

function mapBlogPillar(post: (typeof BLOG_POSTS)[number]): InsightPillar {
  const platform = post.syndicatedPlatform || '';
  if (platform.includes('Forbes') || post.category === 'Interviews') {
    return 'Forbes & Media';
  }
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

const normalizedArticles: InsightItem[] = ARTICLES.map((art, index) => {
  const mapping = mapArticleFramework(art.id);
  const iso = toIsoDate(art.publishDate);
  return {
    id: art.id,
    slug: art.id,
    title: art.title,
    subtitle: art.subtitle,
    pillar: mapArticlePillar(art.topic, art.id),
    syndicatedPlatform: 'Beyond AI Engineering',
    publishDate: art.publishDate,
    isoDate: iso,
    modifiedDate: iso,
    readTime: art.readTime,
    keyQuote: art.keyQuote,
    leadParagraph: art.leadParagraph,
    content: art.content,
    isFeatured: index < 2,
    relatedFrameworkId: mapping.frameworkId,
    relatedChapter: mapping.chapter,
    tags: [art.topic, 'Beyond AI Engineering'],
    sourceType: 'essay',
  };
});

const normalizedBlogPosts: InsightItem[] = BLOG_POSTS.map((post) => {
  const platform = post.syndicatedPlatform || 'harshverma.me';
  const iso = toIsoDate(post.publishDate);
  const isColumn =
    platform.includes('Forbes') ||
    platform === 'RSAC' ||
    platform === 'HackerNoon' ||
    platform === 'The AI Journal' ||
    platform === 'Founders Creative';

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    pillar: mapBlogPillar(post),
    syndicatedPlatform: platform,
    publishDate: post.publishDate,
    isoDate: iso,
    modifiedDate: iso,
    readTime: post.readTime,
    keyQuote: post.keyQuote,
    leadParagraph: post.leadParagraph,
    content: post.content,
    isFeatured: Boolean(post.isFeatured),
    externalUrl: post.externalUrl,
    relatedFrameworkId: post.relatedFrameworkId || 'cao-framework',
    relatedChapter:
      post.category === 'Cybersecurity'
        ? 'Chapter 5 & Chapter 9'
        : 'Chapter 3 & Chapter 8',
    tags: (post.tags || []).filter((t) => t !== 'The'),
    benchmarks: post.benchmarks,
    sourceType: isColumn ? 'column' : 'field-note',
  };
});

export const INSIGHTS: InsightItem[] = [...normalizedBlogPosts, ...normalizedArticles].sort((a, b) =>
  b.isoDate.localeCompare(a.isoDate)
);

export const INSIGHT_VENUES: string[] = [
  'All Venues',
  ...Array.from(new Set(INSIGHTS.map((item) => item.syndicatedPlatform))),
];

export interface FeaturedTopicItem {
  id: string;
  label: string;
  matcher: (item: InsightItem) => boolean;
}

export const FEATURED_TOPICS: FeaturedTopicItem[] = [
  {
    id: 'all',
    label: 'All Topics',
    matcher: () => true,
  },
  {
    id: 'agentic-ai',
    label: 'Agentic AI',
    matcher: (item) =>
      item.pillar === 'Agentic AI' ||
      /agent|mcp|autonomous/i.test(`${item.title} ${item.subtitle} ${item.tags.join(' ')}`),
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity & Defense',
    matcher: (item) =>
      item.tags.some((t) => /cybersecurity|security|rsac|privacy/i.test(t)) ||
      /security|attack|threat|rsac/i.test(`${item.title} ${item.subtitle}`),
  },
  {
    id: 'systems-architecture',
    label: 'Systems & Architecture',
    matcher: (item) =>
      item.pillar === 'Systems & Architecture' ||
      item.tags.some((t) => /architecture|system|benchmark|latency/i.test(t)),
  },
  {
    id: 'mcp-local-inference',
    label: 'MCP & Local Inference',
    matcher: (item) =>
      /mcp|local model|ollama|rag|latency|inference|durable/i.test(
        `${item.title} ${item.subtitle} ${item.tags.join(' ')}`
      ),
  },
  {
    id: 'ai-research',
    label: 'AI Research',
    matcher: (item) =>
      item.tags.some((t) => t.toLowerCase() === 'ai research') ||
      /research|eval|benchmark|model/i.test(`${item.title} ${item.subtitle}`),
  },
  {
    id: 'forbes-columns',
    label: 'Forbes & Media',
    matcher: (item) =>
      item.pillar === 'Forbes & Media' ||
      item.syndicatedPlatform.includes('Forbes') ||
      item.tags.some((t) => /forbes|interviews/i.test(t)),
  },
  {
    id: 'governance-ethics',
    label: 'Governance & Trust',
    matcher: (item) =>
      item.pillar === 'Governance & Ethics' ||
      /governance|trust|authority|ethical|policy/i.test(
        `${item.title} ${item.subtitle} ${item.tags.join(' ')}`
      ),
  },
  {
    id: 'careers-after-code',
    label: 'Careers After Code',
    matcher: (item) =>
      item.pillar === 'Careers After Code' ||
      /career|engineer|student|leadership|judgment|curator/i.test(
        `${item.title} ${item.subtitle} ${item.tags.join(' ')}`
      ),
  },
  {
    id: 'hackernoon-rsac',
    label: 'HackerNoon & RSAC',
    matcher: (item) =>
      item.syndicatedPlatform === 'HackerNoon' ||
      item.syndicatedPlatform === 'RSAC' ||
      item.tags.some((t) => /hackernoon|rsac/i.test(t)),
  },
];

export function matchesFeaturedTopic(item: InsightItem, topicId: string): boolean {
  const topic = FEATURED_TOPICS.find((t) => t.id === topicId);
  return topic ? topic.matcher(item) : true;
}

export const LEGACY_SLUG_ALIASES: Record<string, string> = {
  'from-builder-to-curator': 'engineer-after-code',
  'ai-agent-diplomacy': 'ai-agents-authority-boundaries',
  'death-of-junior-developer': 'what-students-should-learn',
  'trust-economy-software': 'why-ai-makes-judgment-more-valuable',
  'unlearning-code-habits': 'from-how-to-what',
  'enterprise-agent-governance': 'ai-governance-is-failing-because-were-regulating-models-instead-of-behavior',
  'the-clean-attack-problem-when-nothing-looks-wrong-but-everything-is-compromised':
    'the-clean-attack-problem-when-nothing-looks-wrong-but-everything-is-compromised',
};

export function findInsightBySlug(slug: string): InsightItem {
  const mapped = LEGACY_SLUG_ALIASES[slug] || slug;
  return (
    INSIGHTS.find((item) => item.slug === mapped || item.id === mapped) ||
    INSIGHTS[0]
  );
}
