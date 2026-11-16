import { SITE_CONFIG } from '../config/siteConfig';
import {
  EPISTEMIC_SOURCES,
  EpistemicSourceItem,
  SOURCE_CATEGORY_LABELS,
  VERIFICATION_STATUS_LABELS,
} from '../data/sourcesData';

const CANONICAL_ORIGIN = SITE_CONFIG.canonicalOrigin;
const AUTHOR_ENTITY_ID = `${CANONICAL_ORIGIN}/author#harsh-verma`;
const BOOK_ENTITY_ID = `${CANONICAL_ORIGIN}/book#book`;

export interface SourceCitationEntityContext {
  /** Schema.org @id of the DefinedTerm or concept entity (e.g. https://.../frameworks/trust-economy#term) */
  entityId?: string;
  /** Schema.org @id of the Article / TechArticle entity */
  articleId?: string;
  /** Human-readable title of the target framework or page entity */
  entityName?: string;
  /** Canonical URL of the target framework or page */
  entityUrl?: string;
}

/**
 * Authoritative mapping from framework / stage slugs to epistemic reference IDs
 * in EPISTEMIC_SOURCES. Ensures every framework page links its reference definitions
 * cleanly to verified public records, manuscript theses, or pedagogical archetypes.
 */
export const FRAMEWORK_SOURCE_IDS: Record<string, string[]> = {
  'cao-framework': ['cao-evolution-thesis', 'trust-economy-thesis'],
  creator: ['cao-evolution-thesis', 'scenario-creator-pr-velocity'],
  architect: ['cao-evolution-thesis', 'scenario-fintech-migration'],
  orchestrator: ['cao-evolution-thesis', 'knight-capital-2012'],
  'how-to-what': ['cao-evolution-thesis', 'harsh-verma-blog'],
  'trust-economy': ['trust-economy-thesis', 'air-canada-tribunal-2024'],
  'prompt-empathy': ['harsh-verma-blog', 'cao-evolution-thesis'],
  'agentic-diplomacy': ['knight-capital-2012', 'air-canada-tribunal-2024'],
  'human-api': ['cao-evolution-thesis', 'harsh-forbes-curation'],
  'ai-product-sense': ['trust-economy-thesis', 'harsh-forbes-curation'],
  'ethical-curation': ['air-canada-tribunal-2024', 'knight-capital-2012'],
  'unlearn-relearn': ['cao-evolution-thesis', 'harsh-verma-blog'],
  'digital-paper-trail': ['harsh-verma-blog', 'trust-economy-thesis'],
  'micro-community': ['harsh-forbes-curation', 'cao-evolution-thesis'],
  'proof-of-work': ['harsh-verma-blog', 'scenario-creator-pr-velocity'],
};

export function getFrameworkSourceIds(frameworkId: string): string[] {
  return FRAMEWORK_SOURCE_IDS[frameworkId] || ['cao-evolution-thesis'];
}

export function getFrameworkSources(frameworkId: string): EpistemicSourceItem[] {
  return getFrameworkSourceIds(frameworkId)
    .map((id) => EPISTEMIC_SOURCES[id])
    .filter((item): item is EpistemicSourceItem => Boolean(item));
}

function resolveOrigin(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).origin;
  } catch {
    return undefined;
  }
}

function buildSourceAuthorEntity(source: EpistemicSourceItem): Record<string, unknown> {
  if (source.authorOrOrg.toLowerCase().includes('harsh verma')) {
    return {
      '@type': 'Person',
      '@id': AUTHOR_ENTITY_ID,
      name: SITE_CONFIG.author.name,
      url: `${CANONICAL_ORIGIN}/author`,
      sameAs: SITE_CONFIG.author.personalSiteUrl,
    };
  }

  const origin = resolveOrigin(source.externalUrl);
  return {
    '@type': 'Organization',
    name: source.authorOrOrg,
    ...(origin ? { url: origin } : {}),
  };
}

function buildSourcePublisherEntity(source: EpistemicSourceItem): Record<string, unknown> | undefined {
  if (!source.publisher) return undefined;

  if (source.publisher === 'Beyond AI Engineering Manuscript') {
    return {
      '@type': 'Organization',
      name: SITE_CONFIG.siteName,
      url: CANONICAL_ORIGIN,
      founder: { '@id': AUTHOR_ENTITY_ID },
    };
  }

  const origin = resolveOrigin(source.externalUrl);
  return {
    '@type': 'Organization',
    name: source.publisher,
    ...(origin ? { url: origin } : {}),
  };
}

/**
 * Builds a single Schema.org Citation JSON-LD node wrapping an EpistemicSourceItem
 * and linking verified source properties (author, publisher, url, datePublished, status)
 * back to its target framework DefinedTerm and TechArticle entities.
 */
export function buildCitationEntityNode(
  source: EpistemicSourceItem,
  context: SourceCitationEntityContext = {}
): Record<string, unknown> {
  const baseUri = context.entityUrl
    ? context.entityUrl.replace(/#.*$/, '')
    : CANONICAL_ORIGIN;
  const citationId = `${baseUri}#citation-${source.id}`;

  const aboutEntities: Array<{ '@id': string }> = [];
  if (context.entityId) {
    aboutEntities.push({ '@id': context.entityId });
  }
  if (context.articleId && context.articleId !== context.entityId) {
    aboutEntities.push({ '@id': context.articleId });
  }

  const publisherEntity = buildSourcePublisherEntity(source);
  const authorEntity = buildSourceAuthorEntity(source);
  const isManuscriptThesis = source.publisher === 'Beyond AI Engineering Manuscript';

  const node: Record<string, unknown> = {
    '@type': ['Citation', 'CreativeWork'],
    '@id': citationId,
    name: source.sourceTitle,
    headline: source.sourceTitle,
    description: source.claimSupported,
    abstract: source.explanation,
    creativeWorkStatus: VERIFICATION_STATUS_LABELS[source.verificationStatus],
    genre: SOURCE_CATEGORY_LABELS[source.category],
    inLanguage: 'en-US',
    author: authorEntity,
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'source-id',
        value: source.id,
      },
      {
        '@type': 'PropertyValue',
        propertyID: 'epistemic-category',
        value: source.category,
      },
      {
        '@type': 'PropertyValue',
        propertyID: 'verification-status',
        value: source.verificationStatus,
      },
    ],
  };

  if (source.date) {
    node.datePublished = source.date;
  }

  if (source.externalUrl) {
    node.url = source.externalUrl;
    node.sameAs = source.externalUrl;
    node.isAccessibleForFree = true;
  } else if (isManuscriptThesis) {
    node.url = `${CANONICAL_ORIGIN}/book`;
  }

  if (publisherEntity) {
    node.publisher = publisherEntity;
  }

  if (isManuscriptThesis) {
    node.isPartOf = { '@id': BOOK_ENTITY_ID };
  }

  if (aboutEntities.length > 0) {
    node.about = aboutEntities.length === 1 ? aboutEntities[0] : aboutEntities;
    if (context.entityName) {
      node.mentions = aboutEntities[0];
    }
  }

  return node;
}

/**
 * Generates the standalone JSON-LD payload embedded by <SourceNote />, including both
 * the structured Citation node and the explicit `citation` reference links binding it
 * to the host framework's DefinedTerm and TechArticle entities.
 */
export function buildSourceNoteCitationJsonLd(
  source: EpistemicSourceItem,
  context: SourceCitationEntityContext = {}
): Record<string, unknown> {
  const citationNode = buildCitationEntityNode(source, context);
  const citationRef = { '@id': citationNode['@id'] as string };
  const graph: Record<string, unknown>[] = [citationNode];

  if (context.entityId) {
    graph.push({
      '@type': 'DefinedTerm',
      '@id': context.entityId,
      ...(context.entityName ? { name: context.entityName } : {}),
      ...(context.entityUrl ? { url: context.entityUrl } : {}),
      citation: citationRef,
    });
  }

  if (context.articleId && context.articleId !== context.entityId) {
    graph.push({
      '@type': 'TechArticle',
      '@id': context.articleId,
      ...(context.entityName ? { headline: context.entityName } : {}),
      ...(context.entityUrl ? { url: context.entityUrl } : {}),
      citation: citationRef,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/**
 * Builds all Citation JSON-LD nodes and `@id` references for a given framework or
 * C.A.O. stage page so head Schema.org graphs stay synchronized with SourceNote blocks.
 */
export function buildFrameworkCitationBundle(
  frameworkId: string,
  context: SourceCitationEntityContext
): {
  citationRefs: Array<{ '@id': string }>;
  citationNodes: Record<string, unknown>[];
} {
  const sources = getFrameworkSources(frameworkId);
  const citationNodes = sources.map((src) => buildCitationEntityNode(src, context));
  const citationRefs = citationNodes.map((node) => ({ '@id': node['@id'] as string }));
  return { citationRefs, citationNodes };
}
