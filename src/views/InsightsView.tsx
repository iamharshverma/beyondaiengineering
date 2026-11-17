import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PageId } from '../types';
import {
  INSIGHTS,
  INSIGHT_PILLARS,
  INSIGHT_VENUES,
  FEATURED_TOPICS,
  matchesFeaturedTopic,
  InsightItem,
} from '../data/insightsData';
import { SITE_CONFIG } from '../config/siteConfig';
import { sendBookInquiryToAuthor, AUTHOR_EMAIL } from '../utils/emailService';
import { trackEvent } from '../utils/analytics';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
import { InsightThumbnail } from '../components/InsightThumbnail';
import { estimateInsightReadTime } from '../utils/readTime';
import {
  Search,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Clock,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface InsightsViewProps {
  onNavigate: (page: PageId | string, param?: string) => void;
  onSelectInsight: (slug: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  onNavigate,
  onSelectInsight,
}) => {
  const [selectedFeaturedTopic, setSelectedFeaturedTopic] = useState<string>('all');
  const [selectedPillar, setSelectedPillar] = useState<string>('All');
  const [selectedVenue, setSelectedVenue] = useState<string>('All Venues');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const topicsScrollRef = useRef<HTMLDivElement | null>(null);
  const topicButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const masonryGridRef = useRef<HTMLDivElement | null>(null);
  const cardArticleRefs = useRef<Record<string, HTMLElement | null>>({});
  const cardContentRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [masonryReady, setMasonryReady] = useState(false);
  const [canScrollTopicsLeft, setCanScrollTopicsLeft] = useState(false);
  const [canScrollTopicsRight, setCanScrollTopicsRight] = useState(false);

  // Newsletter dispatch state
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [submittingDispatch, setSubmittingDispatch] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');
  const [dispatchMessage, setDispatchMessage] = useState('');
  const [dispatchMailto, setDispatchMailto] = useState('');

  useEffect(() => {
    updatePageSeo({
      title: 'Insights: Articles, Forbes Columns & Engineering Notes | Harsh Verma',
      description:
        'Ideas beyond the book: Forbes Technology Council columns, MCP & local inference benchmarks, RSAC & HackerNoon essays, and systems architecture notes by Harsh Verma.',
      canonicalPath: '/insights',
      ogType: 'website',
      ogImage: PAGE_OG_IMAGES.insights,
      breadcrumbs: [{ name: 'Insights', path: '/insights' }],
    });
  }, []);

  const topicCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const topic of FEATURED_TOPICS) {
      map[topic.id] = INSIGHTS.filter((item) => topic.matcher(item)).length;
    }
    return map;
  }, []);

  const filteredInsights = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return INSIGHTS.filter((item) => {
      const matchesTopic = matchesFeaturedTopic(item, selectedFeaturedTopic);
      const matchesPillar = selectedPillar === 'All' || item.pillar === selectedPillar;
      const matchesVenue =
        selectedVenue === 'All Venues' || item.syndicatedPlatform === selectedVenue;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.syndicatedPlatform.toLowerCase().includes(q) ||
        item.pillar.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTopic && matchesPillar && matchesVenue && matchesQuery;
    });
  }, [selectedFeaturedTopic, selectedPillar, selectedVenue, searchQuery]);

  const leadItem: InsightItem | null = filteredInsights[0] || null;
  const masonryItems: InsightItem[] = filteredInsights.slice(1);

  const hasActiveFilters =
    selectedFeaturedTopic !== 'all' ||
    selectedPillar !== 'All' ||
    selectedVenue !== 'All Venues' ||
    searchQuery.trim().length > 0;

  const resetAllFilters = () => {
    setSelectedFeaturedTopic('all');
    setSelectedPillar('All');
    setSelectedVenue('All Venues');
    setSearchQuery('');
  };

  // Track horizontal scroll boundaries for Featured Topics ribbon
  useEffect(() => {
    const container = topicsScrollRef.current;
    if (!container) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollTopicsLeft(scrollLeft > 4);
      setCanScrollTopicsRight(scrollLeft + clientWidth < scrollWidth - 4);
    };

    updateScrollState();
    container.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            updateScrollState();
          })
        : null;
    observer?.observe(container);

    if (document.fonts && typeof document.fonts.ready?.then === 'function') {
      document.fonts.ready.then(updateScrollState);
    }

    return () => {
      observer?.disconnect();
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [selectedFeaturedTopic]);

  const scrollTopics = (direction: 'left' | 'right') => {
    const container = topicsScrollRef.current;
    if (!container) return;
    const offset = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedFeaturedTopic(topicId);
    const btn = topicButtonRefs.current[topicId];
    if (btn && typeof btn.scrollIntoView === 'function') {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  // Dynamic CSS Grid Masonry calculation via ResizeObserver (auto-rows: 4px, vertical gutter: 24px)
  useEffect(() => {
    if (masonryItems.length === 0) {
      setMasonryReady(false);
      return;
    }

    const ROW_UNIT = 4;
    const VERTICAL_GAP = 24;
    let rafId: number | null = null;

    const measureMasonry = () => {
      const isMultiColumn =
        typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;

      for (const item of masonryItems) {
        const articleEl = cardArticleRefs.current[item.slug];
        const contentEl = cardContentRefs.current[item.slug];
        if (!articleEl || !contentEl) continue;

        if (!isMultiColumn) {
          if (articleEl.style.gridRowEnd !== '') {
            articleEl.style.gridRowEnd = '';
          }
          continue;
        }

        const height = contentEl.getBoundingClientRect().height;
        const rowSpan = Math.max(1, Math.ceil((height + VERTICAL_GAP) / ROW_UNIT));
        const nextValue = `span ${rowSpan}`;
        if (articleEl.style.gridRowEnd !== nextValue) {
          articleEl.style.gridRowEnd = nextValue;
        }
      }

      setMasonryReady(true);
    };

    const scheduleMeasure = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measureMasonry);
    };

    measureMasonry();

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            scheduleMeasure();
          })
        : null;

    if (observer) {
      for (const item of masonryItems) {
        const contentEl = cardContentRefs.current[item.slug];
        if (contentEl) observer.observe(contentEl);
      }
    }

    window.addEventListener('resize', scheduleMeasure);
    if (document.fonts && typeof document.fonts.ready?.then === 'function') {
      document.fonts.ready.then(scheduleMeasure);
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [masonryItems]);

  const handleDispatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingDispatch(true);
    trackEvent('newsletter_signup', { source: 'insights_view', email: subscriberEmail });

    try {
      const res = await sendBookInquiryToAuthor({
        formType: 'Newsletter Subscription',
        name: 'Insights Reader',
        email: subscriberEmail,
        notesOrMessage: `Subscription request for "${SITE_CONFIG.newsletter.name}" from /insights.`,
        sourcePage: '/insights',
      });
      setDispatchMailto(res.mailtoUrl);
      setDispatchMessage(res.message);
      setDispatchStatus(res.success ? 'sent' : 'fallback');
    } finally {
      setSubmittingDispatch(false);
    }
  };

  const formatSourceType = (sourceType: InsightItem['sourceType']) => {
    if (sourceType === 'column') return 'Column';
    if (sourceType === 'field-note') return 'Field Note';
    return 'Essay';
  };

  return (
    <div className="space-y-0 pb-20">
      {/* 1. TOP FEATURED TOPICS HORIZONTAL SCROLL CONTAINER */}
      <section
        aria-label="Featured Topics Navigation"
        className="border-b border-[#101828]/[0.08] dark:border-white/10 bg-[#FAF9F5]/90 dark:bg-[#0B1222]/90"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4 mb-2.5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-semibold whitespace-nowrap">
                Featured Topics
              </span>
              {selectedFeaturedTopic !== 'all' && (
                <button
                  type="button"
                  onClick={() => handleSelectTopic('all')}
                  className="text-xs font-medium text-[#475467] dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-300 underline underline-offset-2 cursor-pointer whitespace-nowrap"
                >
                  Reset topic
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => scrollTopics('left')}
                disabled={!canScrollTopicsLeft}
                aria-label="Scroll featured topics left"
                className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-[#101828]/12 dark:border-white/12 bg-white dark:bg-[#0D1527] text-[#101828] dark:text-slate-200 hover:border-blue-900/40 dark:hover:border-blue-400/40 disabled:opacity-35 disabled:cursor-default transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTopics('right')}
                disabled={!canScrollTopicsRight}
                aria-label="Scroll featured topics right"
                className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-[#101828]/12 dark:border-white/12 bg-white dark:bg-[#0D1527] text-[#101828] dark:text-slate-200 hover:border-blue-900/40 dark:hover:border-blue-400/40 disabled:opacity-35 disabled:cursor-default transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            {canScrollTopicsLeft && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#FAF9F5] dark:from-[#0B1222] to-transparent z-10"
              />
            )}
            {canScrollTopicsRight && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#FAF9F5] dark:from-[#0B1222] to-transparent z-10"
              />
            )}

            <div
              ref={topicsScrollRef}
              role="region"
              aria-label="Featured Topics horizontal filter rail"
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-0.5"
            >
              {FEATURED_TOPICS.map((topic) => {
                const isSelected = selectedFeaturedTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    ref={(el) => {
                      topicButtonRefs.current[topic.id] = el;
                    }}
                    type="button"
                    onClick={() => handleSelectTopic(topic.id)}
                    aria-pressed={isSelected}
                    className={`snap-start shrink-0 inline-flex items-center gap-2 px-4 min-h-[40px] text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] border-[#101828] dark:border-white font-semibold shadow-2xs'
                        : 'bg-white dark:bg-[#11192E] border-[#101828]/12 dark:border-white/12 text-[#475467] dark:text-slate-300 hover:border-blue-900/40 dark:hover:border-blue-400/40 hover:text-[#101828] dark:hover:text-white'
                    }`}
                  >
                    <span>{topic.label}</span>
                    <span
                      className={`font-mono text-[11px] tabular-nums ${
                        isSelected
                          ? 'text-white/80 dark:text-[#070B14]/75'
                          : 'text-[#667085] dark:text-slate-400'
                      }`}
                    >
                      {topicCounts[topic.id] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL HEADER & SECONDARY SEARCH/VENUE/PILLAR FILTERS */}
      <section className="pt-8 sm:pt-12 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
              Essays, Columns & Technical Notes · {INSIGHTS.length} Publications
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] dark:text-white text-balance">
              Ideas Beyond the Book
            </h1>
            <p className="font-serif text-lg sm:text-xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
              Original essays, Forbes Technology Council columns, RSAC & HackerNoon security analyses, and empirical system benchmarks by {SITE_CONFIG.author.name}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('author')}
              className="px-4 py-2 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/15 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer whitespace-nowrap"
            >
              About Harsh Verma
            </button>
            <a
              href={SITE_CONFIG.author.personalBlogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>harshverma.me Archive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Search, Venue & Pillar Controls */}
        <div className="bg-[#FAF9F5] dark:bg-[#0D1527] p-4 sm:p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#98A2B3] dark:text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search essays, Forbes columns, MCP benchmarks, security notes..."
                aria-label="Search insights"
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-[#11192E] text-[#101828] dark:text-white border border-[#101828]/15 dark:border-white/15 rounded-md focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
              />
            </div>

            {/* Venue Dropdown */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="venue-select"
                className="text-xs font-mono text-[#475467] dark:text-slate-400 whitespace-nowrap"
              >
                Venue:
              </label>
              <select
                id="venue-select"
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="text-xs sm:text-sm py-2 px-3 rounded-md bg-white dark:bg-[#11192E] text-[#101828] dark:text-white border border-[#101828]/15 dark:border-white/15 focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
              >
                {INSIGHT_VENUES.map((venue) => (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Topic Pillar Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#101828]/[0.06] dark:border-white/10">
            {INSIGHT_PILLARS.map((pillar) => (
              <button
                key={pillar}
                type="button"
                onClick={() => setSelectedPillar(pillar)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedPillar === pillar
                    ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] shadow-xs'
                    : 'bg-white dark:bg-[#11192E] border border-[#101828]/10 dark:border-white/10 text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white'
                }`}
              >
                {pillar}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RESULTS COUNT & CSS GRID MASONRY EDITORIAL ARCHIVE */}
      <section className="pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex items-center justify-between text-xs font-mono text-[#475467] dark:text-slate-400 pb-3 border-b border-[#101828]/[0.08] dark:border-white/10">
          <span>
            Displaying{' '}
            <strong className="text-[#101828] dark:text-white tabular-nums">
              {filteredInsights.length}
            </strong>{' '}
            {filteredInsights.length === 1 ? 'insight' : 'insights'}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-blue-900 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredInsights.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10">
            <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-2">
              No insights match your search criteria
            </h2>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-400 mb-6">
              Try resetting your featured topic, pillar, publication venue, or search term.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md cursor-pointer"
            >
              Show All {INSIGHTS.length} Insights
            </button>
          </div>
        ) : (
          <>
            {/* TIER 1: LEAD FEATURED INSIGHT */}
            {leadItem && (
              <button
                type="button"
                onClick={() => onSelectInsight(leadItem.slug)}
                className="w-full text-left bg-white dark:bg-[#0D1527] border border-[#101828]/12 dark:border-white/10 rounded-2xl p-6 sm:p-8 hover:border-blue-900 dark:hover:border-blue-400/60 transition-all duration-200 shadow-xs hover:shadow-lg group cursor-pointer block"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400 mb-3.5">
                        <span className="font-bold text-blue-900 dark:text-blue-400">
                          Lead Dispatch · {leadItem.pillar}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{leadItem.syndicatedPlatform}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{leadItem.publishDate}</span>
                        <span aria-hidden="true">·</span>
                        {(() => {
                          const leadReadTime = estimateInsightReadTime(leadItem);
                          return (
                            <span
                              title={`Estimated read time from ~${leadReadTime.wordCount.toLocaleString()} words`}
                              aria-label={`Read Time: ${leadReadTime.label} (about ${leadReadTime.wordCount} words)`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-[#101828]/12 dark:border-white/15 bg-[#FAF9F5] dark:bg-[#111C35] text-[11px] font-mono text-[#475467] dark:text-slate-300 tabular-nums shrink-0"
                            >
                              <Clock className="w-3 h-3 text-blue-800 dark:text-blue-400 shrink-0" />
                              <span>{leadReadTime.label}</span>
                            </span>
                          );
                        })()}
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors mb-3 leading-tight text-balance">
                        {leadItem.title}
                      </h2>

                      <p className="font-serif text-lg text-[#475467] dark:text-slate-300 italic leading-relaxed mb-4">
                        {leadItem.subtitle}
                      </p>

                      <p className="text-sm text-[#475467] dark:text-slate-300 leading-relaxed mb-6">
                        {leadItem.leadParagraph}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#101828]/[0.08] dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                      <span className="font-mono text-[#475467] dark:text-slate-400">
                        Book Alignment: {leadItem.relatedChapter}
                      </span>
                      <span className="font-semibold text-blue-900 dark:text-blue-400 inline-flex items-center gap-1 group-hover:underline">
                        <span>Read Full Insight</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <InsightThumbnail item={leadItem} index={0} variant="lead" priority />
                  </div>
                </div>
              </button>
            )}

            {/* TIER 2: RESPONSIVE CSS GRID MASONRY ARCHIVE */}
            {masonryItems.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                    Publication & Field Note Archive
                  </h2>
                  <span className="text-xs font-mono text-[#475467] dark:text-slate-400 tabular-nums">
                    {masonryItems.length} entries
                  </span>
                </div>

                <div
                  ref={masonryGridRef}
                  data-layout="css-grid-masonry"
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-dense gap-5 md:gap-x-6 items-start ${
                    masonryReady ? 'md:auto-rows-[4px] md:gap-y-0' : 'md:gap-y-6'
                  }`}
                >
                  {masonryItems.map((item, idx) => {
                    const isWideFeature =
                      item.isFeatured && masonryItems.length >= 4 && idx % 6 === 0;
                    const showQuote =
                      Boolean(item.keyQuote) &&
                      (item.isFeatured ||
                        idx % 3 === 0 ||
                        ((item.benchmarks?.length ?? 0) === 0 && idx % 2 === 0));
                    const showExcerpt = item.isFeatured || idx % 4 === 1;
                    const compactBenchmarks = item.benchmarks?.slice(0, 2);

                    return (
                      <article
                        key={item.slug}
                        ref={(el) => {
                          cardArticleRefs.current[item.slug] = el;
                        }}
                        className={`min-w-0 ${masonryReady ? 'md:pb-6' : ''} ${
                          isWideFeature ? 'md:col-span-2' : ''
                        }`}
                      >
                        <button
                          ref={(el) => {
                            cardContentRefs.current[item.slug] = el;
                          }}
                          type="button"
                          onClick={() => onSelectInsight(item.slug)}
                          className={`w-full text-left bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl ${
                            isWideFeature ? 'p-5 sm:p-6' : 'p-4 sm:p-5'
                          } hover:border-blue-900 dark:hover:border-blue-400/60 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col gap-3.5 cursor-pointer group`}
                        >
                          {/* Editorial Thumbnail */}
                          <InsightThumbnail
                            item={item}
                            index={idx + 1}
                            variant={isWideFeature ? 'wide' : 'card'}
                            priority={idx < 3}
                          />

                          {/* Unboxed Metadata Line */}
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#475467] dark:text-slate-400">
                            <span className="font-semibold text-blue-900 dark:text-blue-400 truncate max-w-[200px]">
                              {item.pillar}
                            </span>
                            <span className="font-mono text-[11px] text-[#667085] dark:text-slate-400 truncate">
                              {formatSourceType(item.sourceType)} · {item.syndicatedPlatform}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className={`font-serif font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors leading-snug text-balance ${
                              isWideFeature || item.isFeatured ? 'text-2xl' : 'text-xl'
                            }`}
                          >
                            {item.title}
                          </h3>

                          {/* Subtitle Deck */}
                          <p className="text-xs sm:text-[13px] text-[#475467] dark:text-slate-300 leading-relaxed">
                            {item.subtitle}
                          </p>

                          {/* Benchmarks Readout Strip (for empirical notes) */}
                          {compactBenchmarks && compactBenchmarks.length > 0 && (
                            <dl className="grid grid-cols-2 gap-3 pt-2.5 border-t border-[#101828]/[0.06] dark:border-white/[0.08]">
                              {compactBenchmarks.map((bm, bIdx) => (
                                <div key={bIdx} className="min-w-0">
                                  <dt className="text-[11px] font-mono text-[#667085] dark:text-slate-400 truncate">
                                    {bm.label}
                                  </dt>
                                  <dd className="font-mono text-sm font-bold text-[#101828] dark:text-white tabular-nums mt-0.5">
                                    {bm.value}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          )}

                          {/* Editorial Pull Quote (subtle top/bottom hairline rules) */}
                          {showQuote && (
                            <blockquote className="py-2.5 border-y border-[#101828]/[0.08] dark:border-white/10 font-serif italic text-xs sm:text-[13px] text-[#344054] dark:text-slate-300 leading-relaxed">
                              “{item.keyQuote}”
                            </blockquote>
                          )}

                          {/* Lead Excerpt for Broadsheet Rhythm */}
                          {showExcerpt && !showQuote && (
                            <p className="text-xs text-[#667085] dark:text-slate-400 leading-relaxed line-clamp-3">
                              {item.leadParagraph}
                            </p>
                          )}

                          {/* Footer Metadata */}
                          {(() => {
                            const cardReadTime = estimateInsightReadTime(item);
                            return (
                              <div className="pt-3 border-t border-[#101828]/[0.06] dark:border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-[11px] font-mono text-[#475467] dark:text-slate-400 tabular-nums truncate">
                                    {item.publishDate}
                                  </span>
                                  <span
                                    title={`Estimated read time from ~${cardReadTime.wordCount.toLocaleString()} words`}
                                    aria-label={`Read Time: ${cardReadTime.label} (about ${cardReadTime.wordCount} words)`}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-[#101828]/12 dark:border-white/15 bg-[#FAF9F5] dark:bg-[#111C35] text-[11px] font-mono text-[#475467] dark:text-slate-300 tabular-nums shrink-0"
                                  >
                                    <Clock className="w-3 h-3 text-blue-800 dark:text-blue-400 shrink-0" />
                                    <span>{cardReadTime.label}</span>
                                  </span>
                                </div>
                                <span className="font-semibold text-blue-900 dark:text-blue-400 inline-flex items-center gap-1 group-hover:underline whitespace-nowrap shrink-0">
                                  <span>Read</span>
                                  <ArrowRight className="w-3 h-3" />
                                </span>
                              </div>
                            );
                          })()}
                        </button>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* 3. NEWSLETTER DISPATCH & AUTHOR CONVERSION BLOCK */}
        <div className="mt-12 bg-[#FAF9F5] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold">
                {SITE_CONFIG.newsletter.name} Dispatch
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
                Receive New Systems Notes & Field Essays
              </h2>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                {SITE_CONFIG.newsletter.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('book')}
                  className="font-semibold text-blue-900 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore the 11 Chapters</span>
                </button>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <button
                  type="button"
                  onClick={() => onNavigate('cao-framework')}
                  className="font-semibold text-[#101828] dark:text-slate-200 hover:underline cursor-pointer"
                >
                  Read the C.A.O. Framework
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              {dispatchStatus === 'idle' ? (
                <form onSubmit={handleDispatchSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      required
                      type="email"
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      placeholder="Enter your email address"
                      aria-label="Email address for dispatch subscription"
                      className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-[#11192E] border border-[#101828]/20 dark:border-white/15 rounded-md text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                    />
                    <button
                      type="submit"
                      disabled={submittingDispatch}
                      className="px-5 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap disabled:opacity-50"
                    >
                      {submittingDispatch ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-3.5 h-3.5" />
                          <span>Subscribe</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#475467] dark:text-slate-400">
                    Requests route directly to {AUTHOR_EMAIL}. Zero spam.
                  </p>
                </form>
              ) : (
                <div className="p-4 bg-white dark:bg-[#11192E] rounded-xl border border-[#101828]/10 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#101828] dark:text-white">
                    {dispatchStatus === 'sent' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    )}
                    <span>
                      {dispatchStatus === 'sent'
                        ? 'Subscription request sent'
                        : 'Finish via your email app'}
                    </span>
                  </div>
                  <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                    {dispatchMessage}
                  </p>
                  {dispatchMailto && (
                    <a
                      href={dispatchMailto}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 dark:text-blue-400 underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open pre-filled email to {AUTHOR_EMAIL}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
