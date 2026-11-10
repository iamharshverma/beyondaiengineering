import React, { useState } from 'react';
import { PageId } from '../types';
import { BOOK_DETAILS } from '../data/bookData';
import { ArrowUpRight, CheckCircle2, Users, ShieldCheck, Sparkles, BookOpen, Mail, Loader2, Send } from 'lucide-react';
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
  const [teamSubmitted, setTeamSubmitted] = useState(false);
  const [teamMailtoUrl, setTeamMailtoUrl] = useState('');

  // Direct author copy form state
  const [showDirectForm, setShowDirectForm] = useState(false);
  const [directName, setDirectName] = useState('');
  const [directEmail, setDirectEmail] = useState('');
  const [directNotes, setDirectNotes] = useState('');
  const [directSubmitting, setDirectSubmitting] = useState(false);
  const [directSubmitted, setDirectSubmitted] = useState(false);
  const [directMailtoUrl, setDirectMailtoUrl] = useState('');

  const formats = [
    {
      id: 'hardcover' as const,
      name: 'Hardcover Collector’s Edition',
      subtitle: 'Navy Embossed Cloth with Gold Foil & Archival Acid-Free Paper',
      price: '$34.00',
      description: 'The permanent physical volume for your engineering library. Includes full architectural diagrams, durable binding, and complimentary companion digital Lab worksheets.',
      badge: 'Bestseller Choice',
    },
    {
      id: 'paperback' as const,
      name: 'Paperback Field Manual',
      subtitle: 'Lightweight Trade Edition for Daily Reference',
      price: '$24.00',
      description: 'The everyday companion for your desk or commute. Perfect for university coursework, book clubs, and engineering team reading circles.',
      badge: 'Everyday Practical',
    },
    {
      id: 'ebook' as const,
      name: 'Digital eBook & PDF Bundle',
      subtitle: 'Kindle, ePub & High-Resolution DRM-Free PDF',
      price: '$16.99',
      description: 'Instant delivery to your e-reader or workstation. Features interactive hyperlinked footnotes, vector schematics, and direct links to Lab worksheets.',
      badge: 'Instant Delivery',
    },
    {
      id: 'audiobook' as const,
      name: 'Unabridged Audiobook',
      subtitle: '10 Hours Narrated by Author Harsh Verma',
      price: '$26.00',
      description: 'Listen on Audible, Apple Books, or Spotify. Features author commentary on enterprise agent governance and real-world cybersecurity war stories.',
      badge: 'Author Narrated',
    },
  ];

  const currentFmt = formats.find((f) => f.id === selectedFormat) || formats[0];

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeamSubmitting(true);
    try {
      const res = await sendBookInquiryToAuthor({
        formType: 'Team & Bulk Book Order',
        name: teamName,
        email: teamEmail,
        organization: teamOrg || 'Engineering Organization',
        formatOrCopies: teamSize,
        notesOrMessage: teamNotes || 'Requested bulk quote and information pack.',
        sourcePage: '/book/buy',
      });
      setTeamMailtoUrl(res.mailtoUrl);
      setTeamSubmitted(true);
    } finally {
      setTeamSubmitting(false);
    }
  };

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDirectSubmitting(true);
    try {
      const res = await sendBookInquiryToAuthor({
        formType: 'Book Order (Direct Author Copy)',
        name: directName,
        email: directEmail,
        formatOrCopies: `${currentFmt.name} (${currentFmt.price})`,
        notesOrMessage: directNotes || `Inquiry to get a copy of ${currentFmt.name}.`,
        sourcePage: `/book/buy (${currentFmt.name})`,
      });
      setDirectMailtoUrl(res.mailtoUrl);
      setDirectSubmitted(true);
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
            <div className="relative group max-w-[320px] sm:max-w-[360px] animate-float">
              <div className="rounded-xl overflow-hidden book-shadow border border-[#101828]/10 dark:border-white/20 bg-[#0E1B38]">
                <img
                  src="/assets/images/book_hardcover_mockup_1793842329740.jpg"
                  alt="Beyond AI Engineering hardcover book by Harsh Verma"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('public/assets')) {
                      target.src = '/public/assets/images/book_hardcover_mockup_1793842329740.jpg';
                    }
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                <button
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
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
                  Official Book Distribution
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  <Mail className="w-3 h-3" />
                  <span>Direct Author: {AUTHOR_EMAIL}</span>
                </span>
              </div>
              <h1 className="font-serif text-fluid-hero font-bold tracking-tight text-[#101828] dark:text-white mb-2 text-balance">
                Ready to Go Beyond AI Engineering?
              </h1>
              <p className="font-serif text-lg text-[#475467] dark:text-slate-300 italic">
                From Creator to Curator: Build Your Authority and Lead the AI Agent Revolution
              </p>
            </div>

            {/* Format Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {formats.map((fmt) => (
                <div
                  key={fmt.id}
                  onClick={() => {
                    setSelectedFormat(fmt.id);
                    setDirectSubmitted(false);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer hover:-translate-y-0.5 duration-200 ${
                    selectedFormat === fmt.id
                      ? 'border-blue-900 dark:border-blue-400 bg-white dark:bg-[#111C35] ring-2 ring-blue-900/10 dark:ring-blue-400/20 shadow-sm'
                      : 'border-[#101828]/10 dark:border-white/10 bg-[#FAFAF7] dark:bg-[#0D1527] hover:border-[#101828]/30 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 font-semibold">
                      {fmt.badge}
                    </span>
                    <span className="font-serif text-lg font-bold text-[#101828] dark:text-white">{fmt.price}</span>
                  </div>
                  <div className="font-serif font-bold text-base text-[#101828] dark:text-white mb-1">{fmt.name}</div>
                  <p className="text-[11px] text-[#475467] dark:text-slate-400 leading-relaxed line-clamp-2">{fmt.description}</p>
                </div>
              ))}
            </div>

            {/* Selected Format Retailers & Direct Author Option */}
            <div className="bg-white dark:bg-[#0D1527] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                    {currentFmt.name}
                  </h3>
                  <span className="text-xs text-[#475467] dark:text-slate-400">Available from authorized booksellers or direct author order:</span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                  {currentFmt.price}
                </div>
              </div>

              {/* Direct Author Form Toggle */}
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-950 dark:text-blue-300">
                      Request Direct Copy from Harsh Verma
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDirectForm(!showDirectForm)}
                    className="text-xs font-semibold text-blue-900 dark:text-blue-300 underline hover:text-blue-700 cursor-pointer"
                  >
                    {showDirectForm ? 'Close Form' : 'Order Direct Copy →'}
                  </button>
                </div>

                <p className="text-xs text-[#475467] dark:text-slate-300">
                  Submissions are emailed directly to <strong>{AUTHOR_EMAIL}</strong> for direct author distribution or invoice requests.
                </p>

                {showDirectForm && (
                  <div className="pt-2">
                    {!directSubmitted ? (
                      <form onSubmit={handleDirectSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-mono uppercase text-[#101828] dark:text-slate-300 font-semibold mb-1">
                              Your Name
                            </label>
                            <input
                              required
                              type="text"
                              value={directName}
                              onChange={(e) => setDirectName(e.target.value)}
                              placeholder="Your full name"
                              className="w-full text-xs p-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0A101F] text-[#101828] dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase text-[#101828] dark:text-slate-300 font-semibold mb-1">
                              Your Email
                            </label>
                            <input
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
                          <label className="block text-[11px] font-mono uppercase text-[#101828] dark:text-slate-300 font-semibold mb-1">
                            Delivery Address / Custom Request
                          </label>
                          <textarea
                            rows={2}
                            value={directNotes}
                            onChange={(e) => setDirectNotes(e.target.value)}
                            placeholder="Mailing address for physical books, or special notes for Harsh Verma"
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
                              <span>Send Book Order to {AUTHOR_EMAIL}</span>
                            </>
                          )}
                        </button>
                      </form>
                    ) : (
                      <div className="bg-emerald-50 dark:bg-emerald-950/60 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                        <div className="font-serif font-bold text-base text-emerald-950 dark:text-emerald-200">
                          Book Request Dispatched to Harsh Verma!
                        </div>
                        <p className="text-xs text-emerald-800 dark:text-emerald-300">
                          Your request for <strong>{currentFmt.name}</strong> was sent directly to <strong>{AUTHOR_EMAIL}</strong>. Harsh will follow up at <strong>{directEmail}</strong>.
                        </p>
                        {directMailtoUrl && (
                          <div className="pt-1">
                            <a
                              href={directMailtoUrl}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-900 dark:text-blue-300 underline"
                            >
                              <span>Send backup copy via mail client</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Retailer Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href="https://amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/15 dark:border-white/10 rounded-lg hover:border-blue-900 dark:hover:border-blue-400 font-medium flex items-center justify-between text-[#101828] dark:text-slate-200 transition-colors"
                >
                  <span>Amazon Worldwide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://barnesandnoble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/15 dark:border-white/10 rounded-lg hover:border-blue-900 dark:hover:border-blue-400 font-medium flex items-center justify-between text-[#101828] dark:text-slate-200 transition-colors"
                >
                  <span>Barnes & Noble</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://bookshop.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/15 dark:border-white/10 rounded-lg hover:border-blue-900 dark:hover:border-blue-400 font-medium flex items-center justify-between text-[#101828] dark:text-slate-200 transition-colors"
                >
                  <span>Bookshop.org (Independent Bookstores)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://audible.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/15 dark:border-white/10 rounded-lg hover:border-blue-900 dark:hover:border-blue-400 font-medium flex items-center justify-between text-[#101828] dark:text-slate-200 transition-colors"
                >
                  <span>Audible & Apple Books</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              <div className="text-[11px] text-[#475467] dark:text-slate-400 pt-2 border-t border-[#101828]/[0.08] dark:border-white/10 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>All editions include complimentary access to the Beyond AI Engineering Lab canvases.</span>
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
                Bring the Creator–Architect–Orchestrator framework into your engineering organization. Bulk requests are dispatched directly to Harsh Verma (<strong>{AUTHOR_EMAIL}</strong>) with custom tiered discounts and a private virtual Q&A session.
              </p>
            </div>

            {!teamSubmitted ? (
              <form onSubmit={handleBulkSubmit} className="space-y-4 max-w-lg mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#101828] dark:text-slate-200 font-semibold mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-blue-900 dark:focus:outline-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#101828] dark:text-slate-200 font-semibold mb-1">
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      value={teamEmail}
                      onChange={(e) => setTeamEmail(e.target.value)}
                      placeholder="lead@company.com"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-blue-900 dark:focus:outline-blue-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#101828] dark:text-slate-200 font-semibold mb-1">
                      Number of Copies Needed
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-blue-900 dark:focus:outline-blue-400"
                    >
                      <option value="10-24 copies">10–24 copies (15% discount + Lab Bundle)</option>
                      <option value="25-50 copies">25–50 copies (25% discount + Virtual Q&A)</option>
                      <option value="51-100 copies">51–100 copies (35% discount + Custom Workshop)</option>
                      <option value="100+ copies">100+ copies (Enterprise Campus Licensing)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#101828] dark:text-slate-200 font-semibold mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={teamOrg}
                      onChange={(e) => setTeamOrg(e.target.value)}
                      placeholder="e.g. OpenAI, Palantir, Stanford"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-blue-900 dark:focus:outline-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#101828] dark:text-slate-200 font-semibold mb-1">
                    Timeline / Delivery Notes
                  </label>
                  <textarea
                    rows={2}
                    value={teamNotes}
                    onChange={(e) => setTeamNotes(e.target.value)}
                    placeholder="Specify target delivery timeline, physical vs digital distribution, or briefing requests."
                    className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-blue-900 dark:focus:outline-blue-400"
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
                      <span>Send Team Bulk Inquiry to {AUTHOR_EMAIL}</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                  Bulk Request Dispatched to Harsh Verma!
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, {teamName}. Your inquiry for <strong>{teamSize}</strong> has been transmitted directly to <strong>{AUTHOR_EMAIL}</strong>. We will send volume invoice details to <strong>{teamEmail}</strong> within 24 hours.
                </p>
                {teamMailtoUrl && (
                  <div className="pt-2">
                    <a
                      href={teamMailtoUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 dark:text-blue-400 underline hover:opacity-80"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send a copy via your personal mail app</span>
                    </a>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setTeamSubmitted(false);
                    setTeamEmail('');
                    setTeamNotes('');
                  }}
                  className="mt-2 text-xs text-[#475467] dark:text-slate-400 underline hover:text-[#101828] dark:hover:text-white cursor-pointer block mx-auto"
                >
                  Submit another request
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
