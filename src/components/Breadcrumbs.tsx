import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronRight, Home } from 'lucide-react';
import { PageId } from '../types';
import { FRAMEWORKS } from '../data/frameworksData';
import { findInsightBySlug } from '../data/insightsData';
import { CANONICAL_ORIGIN } from '../utils/seo';

interface BreadcrumbNode {
  label: string;
  page?: PageId;
  path: string;
  url: string;
}

interface BreadcrumbsProps {
  currentPage: PageId;
  frameworkId?: string;
  insightSlug?: string;
  onNavigate: (pageOrPath: PageId | string, param?: string) => void;
}

function buildCanonicalUrl(path: string): string {
  const normalized = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;
  return `${CANONICAL_ORIGIN}${normalized}`;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage,
  frameworkId,
  insightSlug,
  onNavigate,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const items = useMemo<BreadcrumbNode[]>(() => {
    if (currentPage === 'home') return [];

    const nodes: Array<{ label: string; page?: PageId; path: string }> = [
      { label: 'Home', page: 'home', path: '/' },
    ];

    switch (currentPage) {
      case 'book':
        nodes.push({ label: 'The Book', page: 'book', path: '/book' });
        break;
      case 'sample':
        nodes.push({ label: 'The Book', page: 'book', path: '/book' });
        nodes.push({ label: 'Sample Reading Room', page: 'sample', path: '/book/sample' });
        break;
      case 'buy':
        nodes.push({ label: 'The Book', page: 'book', path: '/book' });
        nodes.push({ label: 'Get the Book', page: 'buy', path: '/book/buy' });
        break;
      case 'frameworks':
        nodes.push({
          label: '12 Signature Frameworks',
          page: 'frameworks',
          path: '/frameworks',
        });
        break;
      case 'cao-framework':
        nodes.push({
          label: '12 Signature Frameworks',
          page: 'frameworks',
          path: '/frameworks',
        });
        nodes.push({
          label: 'C.A.O. Framework',
          page: 'cao-framework',
          path: '/cao-framework',
        });
        break;
      case 'framework-detail': {
        const fw = FRAMEWORKS.find((f) => f.id === frameworkId) || FRAMEWORKS[0];
        nodes.push({
          label: '12 Signature Frameworks',
          page: 'frameworks',
          path: '/frameworks',
        });
        nodes.push({
          label: fw?.title || 'Framework Detail',
          page: 'framework-detail',
          path: `/frameworks/${fw?.id || frameworkId || 'trust-economy'}`,
        });
        break;
      }
      case 'insights':
      case 'blog':
      case 'ideas':
        nodes.push({ label: 'Insights', page: 'insights', path: '/insights' });
        break;
      case 'insight-detail':
      case 'blog-detail':
      case 'article-detail': {
        const insight = findInsightBySlug(insightSlug || '');
        nodes.push({ label: 'Insights', page: 'insights', path: '/insights' });
        nodes.push({
          label: insight?.title || 'Insight',
          page: 'insight-detail',
          path: `/insights/${insight?.slug || insightSlug || ''}`,
        });
        break;
      }
      case 'resources':
        nodes.push({ label: 'Implementation Lab', page: 'resources', path: '/resources' });
        break;
      case 'toolkit':
        nodes.push({ label: 'Implementation Lab', page: 'resources', path: '/resources' });
        nodes.push({ label: 'Living AI Toolkit', page: 'toolkit', path: '/toolkit' });
        break;
      case 'engineers':
        nodes.push({ label: 'For Engineers', page: 'engineers', path: '/engineers' });
        break;
      case 'students':
        nodes.push({ label: 'For Students', page: 'students', path: '/students' });
        break;
      case 'organizations':
      case 'teams':
        nodes.push({
          label: 'For Organizations',
          page: 'organizations',
          path: '/organizations',
        });
        break;
      case 'manifesto':
        nodes.push({ label: 'The Manifesto', page: 'manifesto', path: '/manifesto' });
        break;
      case 'author':
        nodes.push({ label: 'About Harsh Verma', page: 'author', path: '/author' });
        break;
      case 'speaking':
        nodes.push({ label: 'About Harsh Verma', page: 'author', path: '/author' });
        nodes.push({ label: 'Speaking & Keynotes', page: 'speaking', path: '/speaking' });
        break;
      case 'press':
        nodes.push({ label: 'About Harsh Verma', page: 'author', path: '/author' });
        nodes.push({ label: 'Press & Media Kit', page: 'press', path: '/press' });
        break;
      case 'stories':
        nodes.push({ label: 'Reader Stories', page: 'stories', path: '/stories' });
        break;
      case 'contact':
        nodes.push({ label: 'Contact', page: 'contact', path: '/contact' });
        break;
      case 'assessment':
        nodes.push({
          label: '12 Signature Frameworks',
          page: 'frameworks',
          path: '/frameworks',
        });
        nodes.push({
          label: 'C.A.O. Assessment',
          page: 'cao-framework',
          path: '/cao-framework',
        });
        break;
      default:
        break;
    }

    return nodes.map((node) => ({
      ...node,
      url: buildCanonicalUrl(node.path),
    }));
  }, [currentPage, frameworkId, insightSlug]);

  const breadcrumbSchema = useMemo(() => {
    if (items.length <= 1) return null;
    const currentNode = items[items.length - 1];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${currentNode.url}#breadcrumb`,
      name: `${currentNode.label} Breadcrumb Trail`,
      itemListElement: items.map((node, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: node.label,
        item: node.url,
      })),
    };
  }, [items]);

  if (items.length <= 1) return null;

  const routeKey = `${currentPage}:${frameworkId || ''}:${insightSlug || ''}`;

  return (
    <div className="bg-[#FAFAF7]/90 dark:bg-[#070B14]/90 border-b border-[#101828]/[0.06] dark:border-white/[0.06] no-print">
      {breadcrumbSchema && (
        <script
          id="breadcrumb-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      <motion.nav
        key={routeKey}
        aria-label="Breadcrumb"
        initial={prefersReducedMotion ? false : { opacity: 0, y: -2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5"
      >
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-[#475467] dark:text-slate-400"
        >
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const isFirst = idx === 0;

            return (
              <li
                key={`${item.url}-${idx}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="inline-flex items-center gap-1.5 sm:gap-2 min-w-0"
              >
                {idx > 0 && (
                  <ChevronRight
                    className="w-3 h-3 text-[#98A2B3] dark:text-slate-600 shrink-0"
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  <span
                    itemProp="name"
                    aria-current="page"
                    title={item.label}
                    className="text-blue-900 dark:text-blue-300 font-semibold truncate max-w-[220px] sm:max-w-md lg:max-w-xl"
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.path}
                    itemProp="item"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.page || item.path);
                    }}
                    className="inline-flex items-center gap-1 text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:focus-visible:outline-blue-400 rounded-xs"
                  >
                    {isFirst && (
                      <Home className="w-3 h-3 opacity-70 shrink-0" aria-hidden="true" />
                    )}
                    <span itemProp="name" className="whitespace-nowrap">
                      {item.label}
                    </span>
                  </a>
                )}

                {isLast && <link itemProp="item" href={item.url} />}
                <meta itemProp="position" content={String(idx + 1)} />
              </li>
            );
          })}
        </ol>
      </motion.nav>
    </div>
  );
};
