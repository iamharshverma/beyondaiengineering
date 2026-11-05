import React, { useState } from 'react';
import { PageId } from '../types';
import { BOOK_DETAILS } from '../data/bookData';
import { ArrowUpRight, CheckCircle2, Users, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

interface BuyViewProps {
  onNavigate: (page: PageId) => void;
  onOpenSample: () => void;
}

export const BuyView: React.FC<BuyViewProps> = ({ onNavigate, onOpenSample }) => {
  const [selectedFormat, setSelectedFormat] = useState<'hardcover' | 'paperback' | 'ebook' | 'audiobook'>('hardcover');
  const [teamSize, setTeamSize] = useState('25-50 copies');
  const [teamEmail, setTeamEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamSubmitted, setTeamSubmitted] = useState(false);

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

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTeamSubmitted(true);
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Cover Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-[320px] sm:max-w-[360px]">
              <div className="rounded-xl overflow-hidden book-shadow border border-[#101828]/10 bg-[#0E1B38]">
                <img
                  src="/src/assets/images/book_hardcover_mockup_1793842329740.jpg"
                  alt="Beyond AI Engineering hardcover book by Harsh Verma"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={onOpenSample}
                  className="text-xs font-semibold text-blue-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
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
              <span className="text-xs uppercase tracking-widest font-mono text-blue-900 font-semibold block mb-1">
                Official Book Distribution
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] mb-2">
                Ready to Go Beyond AI Engineering?
              </h1>
              <p className="font-serif text-lg text-[#475467] italic">
                From Creator to Curator: Build Your Authority and Lead the AI Agent Revolution
              </p>
            </div>

            {/* Format Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {formats.map((fmt) => (
                <div
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedFormat === fmt.id
                      ? 'border-blue-900 bg-white ring-2 ring-blue-900/10 shadow-sm'
                      : 'border-[#101828]/10 bg-[#FAFAF7] hover:border-[#101828]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 font-semibold">
                      {fmt.badge}
                    </span>
                    <span className="font-serif text-lg font-bold text-[#101828]">{fmt.price}</span>
                  </div>
                  <div className="font-serif font-bold text-base text-[#101828] mb-1">{fmt.name}</div>
                  <p className="text-[11px] text-[#475467] leading-relaxed line-clamp-2">{fmt.description}</p>
                </div>
              ))}
            </div>

            {/* Selected Format Retailers */}
            <div className="bg-white p-6 rounded-xl border border-[#101828]/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#101828]">
                    {formats.find((f) => f.id === selectedFormat)?.name}
                  </h3>
                  <span className="text-xs text-[#475467]">Choose your preferred authorized bookseller:</span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#101828]">
                  {formats.find((f) => f.id === selectedFormat)?.price}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href="https://amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#FAFAF7] border border-[#101828]/15 rounded-lg hover:border-blue-900 font-medium flex items-center justify-between text-[#101828] transition-colors"
                >
                  <span>Amazon Worldwide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://barnesandnoble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#FAFAF7] border border-[#101828]/15 rounded-lg hover:border-blue-900 font-medium flex items-center justify-between text-[#101828] transition-colors"
                >
                  <span>Barnes & Noble</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://bookshop.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#FAFAF7] border border-[#101828]/15 rounded-lg hover:border-blue-900 font-medium flex items-center justify-between text-[#101828] transition-colors"
                >
                  <span>Bookshop.org (Independent Bookstores)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://audible.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#FAFAF7] border border-[#101828]/15 rounded-lg hover:border-blue-900 font-medium flex items-center justify-between text-[#101828] transition-colors"
                >
                  <span>Audible & Apple Books</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              <div className="text-[11px] text-[#475467] pt-2 border-t border-[#101828]/[0.08] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>All editions include complimentary access to the Beyond AI Engineering Lab canvases.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. TEAM & BULK ORDERS */}
      <section className="py-20 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#101828]/10 shadow-sm">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-900 font-semibold block mb-1">
                Enterprise & University Licensing
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#101828] mb-2">
                Buying for an Engineering Team?
              </h2>
              <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                Bring the Creator–Architect–Orchestrator framework into your engineering organization. Bulk orders of 10+ copies receive tiered team discounts and a private virtual Q&A with Harsh Verma.
              </p>
            </div>

            {!teamSubmitted ? (
              <form onSubmit={handleBulkSubmit} className="space-y-4 max-w-lg mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#101828] font-semibold mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 bg-[#FAFAF7] focus:outline-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#101828] font-semibold mb-1">
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      value={teamEmail}
                      onChange={(e) => setTeamEmail(e.target.value)}
                      placeholder="lead@company.com"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 bg-[#FAFAF7] focus:outline-blue-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#101828] font-semibold mb-1">
                    Number of Copies Needed
                  </label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 bg-[#FAFAF7] focus:outline-blue-900"
                  >
                    <option value="10-24 copies">10–24 copies (15% discount + Lab Bundle)</option>
                    <option value="25-50 copies">25–50 copies (25% discount + Virtual Q&A)</option>
                    <option value="51-100 copies">51–100 copies (35% discount + Custom Workshop)</option>
                    <option value="100+ copies">100+ copies (Enterprise Campus Licensing)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold bg-[#101828] text-white rounded-md hover:bg-blue-950 transition-colors cursor-pointer shadow-xs"
                >
                  Request Bulk Invoice & Delivery Timeline
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#101828]">
                  Bulk Request Received
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] max-w-sm mx-auto">
                  Thank you, {teamName}. We have received your inquiry for <strong>{teamSize}</strong> and sent confirmation details to <strong>{teamEmail}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
