import React, { useState, useMemo, useEffect } from 'react';
import { PageId } from '../types';
import { INSIGHTS, INSIGHT_PILLARS, INSIGHT_VENUES, InsightItem } from '../data/insightsData';
import { SITE_CONFIG } from '../config/siteConfig';
import { sendBookInquiryToAuthor, AUTHOR_EMAIL } from '../utils/emailService';
import { trackEvent } from '../utils/analytics';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
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
} from 'lucide-react';

interface InsightsViewProps {
  onNavigate: (page: PageId | string, param?: string) => void;
  onSelectInsight: (slug: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  onNavigate,
  onSelectInsight,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<string>('All');
  const [selectedVenue, setSelectedVenue] = useState<string>('All Venues');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const filteredInsights = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return INSIGHTS.filter((item) => {
      const matchesPillar = selectedPillar === 'All' || item.pillar === selectedPillar;
      const matchesVenue =
        selectedVenue === 'All Venues' || item.syndicatedPlatform === selectedVenue;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.syndicatedPlatform.toLowerCase().includes(q) ||
        item.pillar.toLowerCase().includes(q);
      return matchesPillar && matchesVenue && matchesQuery;
    });
  }, [selectedPillar, selectedVenue, searchQuery]);

  const leadItem: InsightItem | null = filteredInsights[0] || null;
  const secondaryItems: InsightItem[] = filteredInsights.slice(1, 3);
  const remainingItems: InsightItem[] = filteredInsights.slice(3);

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

  return (
    <div className="space-y-0 pb-20">
      {/* 1. EDITORIAL HEADER & TOP FILTER RIBBON */}
      <section className="pt-10 sm:pt-14 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
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
              className="px-4 py-2 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/15 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              About Harsh Verma
            </button>
            <a
              href={SITE_CONFIG.author.personalBlogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5"
            >
              <span>harshverma.me Archive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Full-Width Top Control Bar */}
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
              <label htmlFor="venue-select" className="text-xs font-mono text-[#475467] dark:text-slate-400 whitespace-nowrap">
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

      {/* 3. RESULTS COUNT & EMPTY STATE */}
      <section className="pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between text-xs font-mono text-[#475467] dark:text-slate-400 pb-3 border-b border-[#101828]/[0.08] dark:border-white/10">
          <span>
            Displaying <strong className="text-[#101828] dark:text-white tabular-nums">{filteredInsights.length}</strong> insights
          </span>
          {(selectedPillar !== 'All' || selectedVenue !== 'All Venues' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedPillar('All');
                setSelectedVenue('All Venues');
                setSearchQuery('');
              }}
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
              Try resetting your topic pillar, publication venue, or search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedPillar('All');
                setSelectedVenue('All Venues');
                setSearchQuery('');
              }}
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
                className="w-full text-left bg-white dark:bg-[#0D1527] border border-[#101828]/12 dark:border-white/10 rounded-2xl p-8 sm:p-10 hover:border-blue-900 dark:hover:border-blue-400/60 transition-all duration-300 shadow-xs hover:shadow-xl group cursor-pointer block"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400 mb-4">
                  <span className="font-bold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
                    Lead Dispatch · {leadItem.pillar}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{leadItem.syndicatedPlatform}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadItem.publishDate}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Clock className="w-3 h-3" />
                    {leadItem.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors mb-3 leading-tight text-balance">
                  {leadItem.title}
                </h2>

                <p className="font-serif text-lg text-[#475467] dark:text-slate-300 italic leading-relaxed max-w-4xl mb-5">
                  {leadItem.subtitle}
                </p>

                <p className="text-sm text-[#475467] dark:text-slate-300 leading-relaxed max-w-4xl mb-6">
                  {leadItem.leadParagraph}
                </p>

                <div className="pt-4 border-t border-[#101828]/[0.08] dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <span className="font-mono text-[#475467] dark:text-slate-400">
                    Book Alignment: {leadItem.relatedChapter}
                  </span>
                  <span className="font-semibold text-blue-900 dark:text-blue-400 inline-flex items-center gap-1 group-hover:underline">
                    <span>Read Full Insight</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            )}

            {/* TIER 2: TWO SECONDARY SPOTLIGHTS */}
            {secondaryItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {secondaryItems.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => onSelectInsight(item.slug)}
                    className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-7 hover:border-blue-900 dark:hover:border-blue-400/60 hover:-translate-y-1 transition-all duration-300 shadow-2xs text-left flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400 mb-3">
                        <span className="font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
                          {item.pillar}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.syndicatedPlatform}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.publishDate}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#101828]/[0.06] dark:border-white/10 flex items-center justify-between text-xs">
                      <span className="font-mono text-[#475467] dark:text-slate-400 tabular-nums">
                        {item.readTime}
                      </span>
                      <span className="font-semibold text-blue-900 dark:text-blue-400 inline-flex items-center gap-1">
                        <span>Read Insight</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* TIER 3: FULL CHRONOLOGICAL ARCHIVE GRID */}
            {remainingItems.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                    Complete Publication & Field Note Archive
                  </h2>
                  <span className="text-xs font-mono text-[#475467] dark:text-slate-400 tabular-nums">
                    {remainingItems.length} entries
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingItems.map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => onSelectInsight(item.slug)}
                      className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl p-6 hover:border-blue-900 dark:hover:border-blue-400/60 hover:-translate-y-1 transition-all duration-300 shadow-2xs text-left flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-[#475467] dark:text-slate-400 mb-3">
                          <span className="font-semibold text-blue-900 dark:text-blue-400">
                            {item.pillar}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{item.syndicatedPlatform}</span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors mb-2 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#101828]/[0.06] dark:border-white/10 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-[#475467] dark:text-slate-400 tabular-nums">
                          {item.publishDate} · {item.readTime}
                        </span>
                        <span className="font-semibold text-blue-900 dark:text-blue-400 inline-flex items-center gap-1">
                          <span>Open</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* 4. NEWSLETTER DISPATCH & AUTHOR CONVERSION BLOCK */}
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
