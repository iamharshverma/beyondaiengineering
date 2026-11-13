import React, { useState } from 'react';
import { PageId } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { trackEvent, buildUtmUrl } from '../utils/analytics';
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Mail,
  Loader2,
  Send,
  AlertCircle,
} from 'lucide-react';
import { sendBookInquiryToAuthor, AUTHOR_EMAIL } from '../utils/emailService';

interface BuyViewProps {
  onNavigate: (page: PageId) => void;
  onOpenSample: () => void;
}

export const BuyView: React.FC<BuyViewProps> = ({ onNavigate, onOpenSample }) => {
  const [selectedFormat, setSelectedFormat] = useState<'hardcover' | 'paperback' | 'ebook' | 'audiobook'>('hardcover');

  // Bulk order state
  const [teamSize, setTeamSize] = useState('25-50 copies');
  const [teamEmail, setTeamEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamOrg, setTeamOrg] = useState('');
  const [teamNotes, setTeamNotes] = useState('');
  const [teamSubmitting, setTeamSubmitting] = useState(false);
  const [teamStatus, setTeamStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');
  const [teamMessage, setTeamMessage] = useState('');
  const [teamMailtoUrl, setTeamMailtoUrl] = useState('');

  // Direct author copy form state
  const [showDirectForm, setShowDirectForm] = useState(true);
  const [directName, setDirectName] = useState('');
  const [directEmail, setDirectEmail] = useState('');
  const [directNotes, setDirectNotes] = useState('');
  const [directSubmitting, setDirectSubmitting] = useState(false);
  const [directStatus, setDirectStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');
  const [directMessage, setDirectMessage] = useState('');
  const [directMailtoUrl, setDirectMailtoUrl] = useState('');

  const editions = SITE_CONFIG.book.editions;
  const currentFmt = editions.find((e) => e.id === selectedFormat) || editions[0];
  const configuredRetailers = SITE_CONFIG.book.retailers.filter((r) => r.isConfigured && r.url);

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeamSubmitting(true);
    trackEvent('organization_inquiry', { copies: teamSize, source: 'buy_page' });
    try {
      const res = await sendBookInquiryToAuthor({
        formType: 'Team & Bulk Book Order',
        name: teamName,
        email: teamEmail,
        organization: teamOrg || 'Engineering Organization',
        formatOrCopies: teamSize,
        notesOrMessage: teamNotes || 'Requested bulk quote and team licensing details.',
        sourcePage: '/book/buy',
      });
      setTeamMailtoUrl(res.mailtoUrl);
      setTeamMessage(res.message);
      setTeamStatus(res.success ? 'sent' : 'fallback');
    } finally {
      setTeamSubmitting(false);
    }
  };

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDirectSubmitting(true);
    trackEvent('book_purchase_click', { format: currentFmt.format, source: 'buy_page_direct' });
    try {
      const res = await sendBookInquiryToAuthor({
        formType: 'Book Order (Direct Author Copy)',
        name: directName,
        email: directEmail,
        formatOrCopies: currentFmt.format,
        notesOrMessage: directNotes || `Inquiry to request a copy of ${currentFmt.format}.`,
        sourcePage: `/book/buy (${currentFmt.format})`,
      });
      setDirectMailtoUrl(res.mailtoUrl);
      setDirectMessage(res.message);
      setDirectStatus(res.success ? 'sent' : 'fallback');
    } finally {
      setDirectSubmitting(false);
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Cover Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-[320px] sm:max-w-[360px]">
              <div className="rounded-xl overflow-hidden book-shadow border border-[#101828]/10 dark:border-white/20 bg-[#0E1B38]">
                <img
                  src={SITE_CONFIG.book.coverImage}
                  alt={`${SITE_CONFIG.book.title} hardcover book by ${SITE_CONFIG.author.name}`}
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('public/assets')) {
                      target.src = `/public${SITE_CONFIG.book.coverImage}`;
                    }
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={onOpenSample}
                  className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Chapter 1 Sample First</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Buying Options */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1 text-xs font-mono">
                <span className="uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold">
                  Book Editions & Requests
                </span>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span className="text-[#475467] dark:text-slate-400 inline-flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <span>Author Desk: {AUTHOR_EMAIL}</span>
                </span>
              </div>
              <h1 className="font-serif text-fluid-hero font-bold tracking-tight text-[#101828] dark:text-white mb-2 text-balance">
                Get {SITE_CONFIG.book.title}
              </h1>
              <p className="font-serif text-lg text-[#475467] dark:text-slate-300 italic">
                {SITE_CONFIG.book.subtitle}: {SITE_CONFIG.book.tagline}
              </p>
            </div>

            {/* Format Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {editions.map((fmt) => (
                <button
                  type="button"
                  key={fmt.id}
                  onClick={() => {
                    setSelectedFormat(fmt.id);
                    setDirectStatus('idle');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedFormat === fmt.id
                      ? 'border-blue-900 dark:border-blue-400 bg-white dark:bg-[#111C35] ring-2 ring-blue-900/10 dark:ring-blue-400/20 shadow-sm'
                      : 'border-[#101828]/10 dark:border-white/10 bg-[#FAFAF7] dark:bg-[#0D1527] hover:border-[#101828]/30 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 font-semibold">
                      {fmt.specLabel}
                    </span>
                  </div>
                  <div className="font-serif font-bold text-base text-[#101828] dark:text-white mb-1">{fmt.format}</div>
                  <p className="text-[11px] text-[#475467] dark:text-slate-400 leading-relaxed">{fmt.subtitle}</p>
                </button>
              ))}
            </div>

            {/* Selected Format Retailers & Direct Author Option */}
            <div className="bg-white dark:bg-[#0D1527] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                    {currentFmt.format}
                  </h2>
                  <span className="text-xs text-[#475467] dark:text-slate-400">
                    {currentFmt.priceLabel} · Direct author fulfillment & edition updates
                  </span>
                </div>
              </div>

              {/* Direct Author Form Toggle */}
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-950 dark:text-blue-300">
                      {currentFmt.directRequestLabel}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDirectForm(!showDirectForm)}
                    className="text-xs font-semibold text-blue-900 dark:text-blue-300 underline hover:text-blue-700 cursor-pointer"
                  >
                    {showDirectForm ? 'Hide Form' : 'Open Form →'}
                  </button>
                </div>

                <p className="text-xs text-[#475467] dark:text-slate-300">
                  Submissions are emailed directly to <strong>{AUTHOR_EMAIL}</strong> for direct author copies, advance notifications, or team invoices.
                </p>

                {showDirectForm && (
                  <div className="pt-2">
                    {directStatus === 'idle' && (
                      <form onSubmit={handleDirectSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="buy-direct-name" className="block text-[11px] font-mono uppercase text-[#101828] dark:text-slate-300 font-semibold mb-1">
                              Your Name
                            </label>
                            <input
                              id="buy-direct-name"
                              required
                              type="text"
                              value={directName}
                              onChange={(e) => setDirectName(e.target.value)}
                              placeholder="Your full name"
                              className="w-full text-xs p-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0A101F] text-[#101828] dark:text-white"
                            />
                          </div>
                          <div>
                            <label htmlFor="buy-direct-email" className="block text-[11px] font-mono uppercase text-[#101828] dark:text-slate-300 font-semibold mb-1">
                              Your Email
                            </label>
                            <input
                              id="buy-direct-email"
                              required
                              type="email"
                              value={directEmail}
                              onChange={(e) => setDirectEmail(e.target.value)}
                              placeholder="you@domain.com"
                              className="w-full text-xs p-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0A101F] text-[#101828] dark:text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="buy-direct-notes" className="block text-[11px] font-mono uppercase text-[#101828] dark:text-slate-300 font-semibold mb-1">
                            Shipping Location / Custom Request
                          </label>
                          <textarea
                            id="buy-direct-notes"
                            rows={2}
                            value={directNotes}
                            onChange={(e) => setDirectNotes(e.target.value)}
                            placeholder="Optional city/country or specific edition questions for Harsh Verma"
                            className="w-full text-xs p-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0A101F] text-[#101828] dark:text-white"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={directSubmitting}
                          className="w-full py-2.5 text-xs font-semibold bg-blue-900 dark:bg-blue-600 text-white rounded-md hover:bg-blue-950 dark:hover:bg-blue-500 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                        >
                          {directSubmitting ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Dispatching to {AUTHOR_EMAIL}...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Send Edition Request to Harsh Verma</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}

                    {directStatus === 'sent' && (
                      <div className="bg-emerald-50 dark:bg-emerald-950/60 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                        <div className="font-serif font-bold text-base text-emerald-950 dark:text-emerald-200">
                          Request Dispatched to Harsh Verma
                        </div>
                        <p className="text-xs text-emerald-800 dark:text-emerald-300">{directMessage}</p>
                        <button
                          type="button"
                          onClick={() => setDirectStatus('idle')}
                          className="text-xs underline text-emerald-900 dark:text-emerald-200 cursor-pointer"
                        >
                          Submit another request
                        </button>
                      </div>
                    )}

                    {directStatus === 'fallback' && (
                      <div className="bg-amber-50 dark:bg-amber-950/50 p-4 rounded-lg border border-amber-200 dark:border-amber-800 space-y-2">
                        <div className="flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{directMessage}</span>
                        </div>
                        {directMailtoUrl && (
                          <a
                            href={directMailtoUrl}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded text-xs font-semibold"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Send via Your Email Client</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Retailer Links (Only shown when configured; otherwise transparent availability notice) */}
              {configuredRetailers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {configuredRetailers.map((retailer) => (
                    <a
                      key={retailer.id}
                      href={buildUtmUrl(retailer.url!, 'book_launch', 'website', retailer.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('retailer_click', { retailer: retailer.id, format: currentFmt.id })}
                      className="p-3 bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/15 dark:border-white/10 rounded-lg hover:border-blue-900 dark:hover:border-blue-400 font-medium flex items-center justify-between text-[#101828] dark:text-slate-200 transition-colors"
                    >
                      <span>{retailer.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="p-3.5 rounded-lg bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/10 dark:border-white/10 text-xs text-[#475467] dark:text-slate-300">
                  Direct bookstore and marketplace product links will appear here once public edition ISBNs and storefront URLs are finalized. Use the direct author request form above to reserve copies or review editions now.
                </div>
              )}

              <div className="text-[11px] text-[#475467] dark:text-slate-400 pt-2 border-t border-[#101828]/[0.08] dark:border-white/10 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>All readers receive complimentary web access to the 15 companion resources & lab canvases.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEAM & BULK ORDERS */}
      <section className="py-20 bg-[#FAF9F5] dark:bg-[#0A101D] transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#0D1527] p-8 sm:p-12 rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-sm">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold block mb-1">
                Enterprise & University Licensing
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white mb-2">
                Buying for an Engineering Team?
              </h2>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                Bring the Creator–Architect–Orchestrator framework into your organization. Requests go directly to Harsh Verma (<strong>{AUTHOR_EMAIL}</strong>) with reading guides and workshop options.
              </p>
            </div>

            {teamStatus === 'idle' && (
              <form onSubmit={handleBulkSubmit} className="space-y-4 max-w-lg mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="buy-team-name" className="block text-xs font-mono uppercase text-[#101828] dark:text-slate-200 font-semibold mb-1">
                      Your Name
                    </label>
                    <input
                      id="buy-team-name"
                      required
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Full name"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="buy-team-email" className="block text-xs font-mono uppercase text-[#101828] dark:text-slate-200 font-semibold mb-1">
                      Work Email
                    </label>
                    <input
                      id="buy-team-email"
                      required
                      type="email"
                      value={teamEmail}
                      onChange={(e) => setTeamEmail(e.target.value)}
                      placeholder="lead@company.com"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="buy-team-size" className="block text-xs font-mono uppercase text-[#101828] dark:text-slate-200 font-semibold mb-1">
                      Estimated Copies
                    </label>
                    <select
                      id="buy-team-size"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white"
                    >
                      <option value="10-24 copies">10–24 copies (Team Circle)</option>
                      <option value="25-50 copies">25–50 copies (Department + Q&A)</option>
                      <option value="51-100 copies">51–100 copies (Org-Wide + Workshop)</option>
                      <option value="100+ copies">100+ copies (Enterprise / Campus Licensing)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="buy-team-org" className="block text-xs font-mono uppercase text-[#101828] dark:text-slate-200 font-semibold mb-1">
                      Company / University
                    </label>
                    <input
                      id="buy-team-org"
                      type="text"
                      value={teamOrg}
                      onChange={(e) => setTeamOrg(e.target.value)}
                      placeholder="Organization name"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="buy-team-notes" className="block text-xs font-mono uppercase text-[#101828] dark:text-slate-200 font-semibold mb-1">
                    Timeline / Delivery Notes
                  </label>
                  <textarea
                    id="buy-team-notes"
                    rows={2}
                    value={teamNotes}
                    onChange={(e) => setTeamNotes(e.target.value)}
                    placeholder="Target dates, physical vs digital preference, or workshop interest."
                    className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={teamSubmitting}
                  className="w-full py-3 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {teamSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending inquiry to {AUTHOR_EMAIL}...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Team Inquiry to Harsh Verma</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {teamStatus === 'sent' && (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                  Bulk Request Dispatched to Harsh Verma
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                  {teamMessage}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTeamStatus('idle');
                    setTeamNotes('');
                  }}
                  className="mt-2 text-xs text-[#475467] dark:text-slate-400 underline hover:text-[#101828] dark:hover:text-white cursor-pointer block mx-auto"
                >
                  Submit another request
                </button>
              </div>
            )}

            {teamStatus === 'fallback' && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 max-w-lg mx-auto space-y-3">
                <div className="flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{teamMessage}</span>
                </div>
                {teamMailtoUrl && (
                  <a
                    href={teamMailtoUrl}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md text-xs font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open Email App to Send Request</span>
                  </a>
                )}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[#101828]/10 dark:border-white/10 text-center">
              <button
                type="button"
                onClick={() => onNavigate('organizations')}
                className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Explore Organization Programs & Keynotes →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
