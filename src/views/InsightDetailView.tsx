import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { INSIGHTS, findInsightBySlug } from '../data/insightsData';
import { FRAMEWORKS } from '../data/frameworksData';
import { SITE_CONFIG } from '../config/siteConfig';
import { sendBookInquiryToAuthor, AUTHOR_EMAIL } from '../utils/emailService';
import { trackEvent } from '../utils/analytics';
import { updatePageSeo, buildDynamicInsightSeo } from '../utils/seo';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Clock,
  Layers,
  BookOpen,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Share2,
} from 'lucide-react';

interface InsightDetailViewProps {
  slug: string;
  onNavigate: (page: PageId | string, param?: string) => void;
  onSelectInsight: (slug: string) => void;
  onOpenBuyModal: () => void;
  onOpenSample: () => void;
}

export const InsightDetailView: React.FC<InsightDetailViewProps> = ({
  slug,
  onNavigate,
  onSelectInsight,
  onOpenBuyModal,
  onOpenSample,
}) => {
  const insight = findInsightBySlug(slug);
  const relatedFramework =
    FRAMEWORKS.find((f) => f.id === insight.relatedFrameworkId) || FRAMEWORKS[0];
  const relatedInsights = INSIGHTS.filter(
    (item) => item.slug !== insight.slug && item.pillar === insight.pillar
  ).slice(0, 3);

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');
  const [dispatchMessage, setDispatchMessage] = useState('');
  const [dispatchMailto, setDispatchMailto] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setDispatchStatus('idle');
    updatePageSeo(buildDynamicInsightSeo(insight));
  }, [insight]);

  const handleCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${SITE_CONFIG.canonicalOrigin}/insights/${insight.slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent('newsletter_signup', { source: 'insight_detail', slug: insight.slug });
    try {
      const res = await sendBookInquiryToAuthor({
        formType: 'Newsletter Subscription',
        name: 'Insight Reader',
        email,
        notesOrMessage: `Subscribed while reading "${insight.title}" (/insights/${insight.slug}).`,
        sourcePage: `/insights/${insight.slug}`,
      });
      setDispatchMailto(res.mailtoUrl);
      setDispatchMessage(res.message);
      setDispatchStatus(res.success ? 'sent' : 'fallback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-0 pb-20">
      {/* 1. ARTICLE HEADER */}
      <header className="pt-10 sm:pt-14 pb-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="space-y-5">
          <button
            type="button"
            onClick={() => onNavigate('insights')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Insights</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
            <span className="font-bold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
              {insight.pillar}
            </span>
            <span aria-hidden="true">·</span>
            <span>{insight.syndicatedPlatform}</span>
            <span aria-hidden="true">·</span>
            <span>{insight.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Clock className="w-3 h-3" />
              {insight.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] dark:text-white leading-tight text-balance">
            {insight.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
            {insight.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={SITE_CONFIG.author.portraitPrimary}
                alt={SITE_CONFIG.author.name}
                className="w-10 h-10 rounded-full object-cover object-top border border-[#101828]/15 dark:border-white/15"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('author')}
                  className="font-bold text-[#101828] dark:text-white hover:underline cursor-pointer block text-left"
                >
                  {SITE_CONFIG.author.name}
                </button>
                <div className="text-[#475467] dark:text-slate-400">
                  Principal AI Engineer · Author of {SITE_CONFIG.book.title}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyUrl}
                className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/15 dark:border-white/15 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied' : 'Share Link'}</span>
              </button>
              {insight.externalUrl && (
                <a
                  href={insight.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold bg-blue-950 dark:bg-blue-500 text-white rounded-md hover:bg-blue-900 inline-flex items-center gap-1.5"
                >
                  <span>Original on {insight.syndicatedPlatform}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 3. LONG-FORM EDITORIAL BODY (constrained max-w-2xl measure) */}
      <article className="py-12 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <p className="font-serif text-lg sm:text-xl text-[#101828] dark:text-slate-100 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none">
          {insight.leadParagraph}
        </p>

        {/* Key Thesis Quote Card (no thick left border) */}
        <blockquote className="p-6 bg-[#FAF9F5] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl font-serif italic text-lg sm:text-xl text-[#101828] dark:text-slate-100 leading-relaxed">
          "{insight.keyQuote}"
        </blockquote>

        {/* Paragraphs */}
        <div className="space-y-5 text-base text-[#344054] dark:text-slate-300 leading-relaxed font-sans">
          {insight.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Optional Benchmark Telemetry Table */}
        {insight.benchmarks && insight.benchmarks.length > 0 && (
          <div className="pt-4">
            <div className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl overflow-hidden">
              <div className="px-5 py-3 bg-[#FAFAF7] dark:bg-[#11192E] border-b border-[#101828]/[0.08] dark:border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-[#101828] dark:text-white">
                Measured Benchmark Findings
              </div>
              <div className="divide-y divide-[#101828]/[0.08] dark:divide-white/10">
                {insight.benchmarks.map((bm) => (
                  <div key={bm.label} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-semibold text-[#101828] dark:text-white">{bm.label}</div>
                      {bm.note && (
                        <div className="text-[#475467] dark:text-slate-400">{bm.note}</div>
                      )}
                    </div>
                    <div className="font-mono font-bold text-blue-900 dark:text-blue-400 tabular-nums">
                      {bm.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Framework & Chapter Cross-Link Card */}
        <div className="pt-6 border-t border-[#101828]/[0.08] dark:border-white/10">
          <div className="p-6 bg-[#FAF9F5] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold">
              <Layers className="w-4 h-4" />
              <span>Connected Operating Framework</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
              {relatedFramework.title}: {relatedFramework.subtitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              {relatedFramework.definition}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    relatedFramework.id === 'cao-framework'
                      ? 'cao-framework'
                      : `/frameworks/${relatedFramework.id}`
                  )
                }
                className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open {relatedFramework.title} Deep Dive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onOpenSample}
                className="px-4 py-2 text-xs font-semibold bg-white dark:bg-[#11192E] border border-[#101828]/20 dark:border-white/15 text-[#101828] dark:text-slate-200 rounded-md inline-flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                <span>Read Book Sample</span>
              </button>
              <button
                type="button"
                onClick={onOpenBuyModal}
                className="px-4 py-2 text-xs font-semibold bg-white dark:bg-[#11192E] border border-[#101828]/20 dark:border-white/15 text-[#101828] dark:text-slate-200 rounded-md cursor-pointer"
              >
                Get the Book
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Dispatch Signup */}
        <div className="p-6 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-semibold">
            {SITE_CONFIG.newsletter.name}
          </div>
          <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
            Subscribe for Upcoming Architecture & Field Dispatches
          </h3>
          {dispatchStatus === 'idle' ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/20 dark:border-white/15 rounded-md text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                <span>Subscribe</span>
              </button>
            </form>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#101828] dark:text-white">
                {dispatchStatus === 'sent' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                )}
                <span>{dispatchMessage}</span>
              </div>
              {dispatchMailto && (
                <a
                  href={dispatchMailto}
                  className="inline-flex items-center gap-1 font-semibold text-blue-900 dark:text-blue-400 underline"
                >
                  <span>Send via email client to {AUTHOR_EMAIL}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </article>

      {/* 4. RELATED INSIGHTS */}
      {relatedInsights.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-[#101828]/[0.08] dark:border-white/10">
          <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-6">
            More in {insight.pillar}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedInsights.map((rel) => (
              <button
                key={rel.slug}
                type="button"
                onClick={() => onSelectInsight(rel.slug)}
                className="bg-white dark:bg-[#0D1527] p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 hover:border-blue-900 dark:hover:border-blue-400/60 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono text-[#475467] dark:text-slate-400 mb-2">
                    {rel.syndicatedPlatform} · {rel.publishDate}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#101828] dark:text-white mb-2 leading-snug">
                    {rel.title}
                  </h4>
                </div>
                <span className="text-xs font-semibold text-blue-900 dark:text-blue-400 inline-flex items-center gap-1 pt-2">
                  <span>Read Insight</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
