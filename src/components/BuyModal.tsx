import React, { useState } from 'react';
import { X, Book, Sparkles, CheckCircle2, ArrowUpRight, Users } from 'lucide-react';
import { BOOK_DETAILS } from '../data/bookData';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSample?: () => void;
}

export const BuyModal: React.FC<BuyModalProps> = ({
  isOpen,
  onClose,
  onOpenSample,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'hardcover' | 'paperback' | 'ebook' | 'audiobook' | 'bulk'>('hardcover');
  const [teamSize, setTeamSize] = useState('25-50 copies');
  const [teamEmail, setTeamEmail] = useState('');
  const [teamSubmitted, setTeamSubmitted] = useState(false);

  if (!isOpen) return null;

  const formats = [
    {
      id: 'hardcover' as const,
      name: 'Hardcover Edition',
      subtitle: 'Embossed Navy Cloth & Archival Paper',
      price: '$34.00',
      description: 'The definitive collector’s edition. Includes companion digital lab worksheets and author architectural diagrams.',
      availability: 'Available worldwide via major booksellers',
    },
    {
      id: 'paperback' as const,
      name: 'Paperback Edition',
      subtitle: 'Everyday Field Manual',
      price: '$24.00',
      description: 'The portable desk companion for working engineers, university courses, and technical reading groups.',
      availability: 'Ships globally with next-day dispatch',
    },
    {
      id: 'ebook' as const,
      name: 'Digital eBook',
      subtitle: 'ePub, Kindle & DRM-Free PDF Bundle',
      price: '$16.99',
      description: 'Instant download with hyperlinked footnotes, interactive code references, and high-resolution diagrams.',
      availability: 'Immediate digital delivery',
    },
    {
      id: 'audiobook' as const,
      name: 'Audiobook Edition',
      subtitle: 'Unabridged Author-Narrated Audio',
      price: '$26.00',
      description: 'Full 10-hour author narration with supplementary audio commentary on enterprise agent governance.',
      availability: 'Audible, Apple Books & Spotify',
    },
  ];

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTeamSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAFAF7] dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 my-8 text-[#101828] dark:text-slate-100 max-h-[92vh] flex flex-col transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-[#101828]/10 dark:border-white/10 shrink-0">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold block mb-1">
            Official Book Editions & Retailers
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
            Get Beyond AI Engineering
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 mt-1">
            Choose your preferred format or request bulk licensing for your engineering team.
          </p>
        </div>

        {/* Format Selector Pills / Segmented Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6 shrink-0">
          {formats.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setSelectedFormat(fmt.id)}
              className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                selectedFormat === fmt.id
                  ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] border-[#101828] dark:border-white shadow-xs'
                  : 'bg-white dark:bg-[#11192E] text-[#475467] dark:text-slate-300 border-[#101828]/10 dark:border-white/10 hover:border-[#101828]/30 dark:hover:border-white/30'
              }`}
            >
              <div className="truncate">{fmt.name.split(' ')[0]}</div>
              <div className="text-[10px] opacity-80">{fmt.price}</div>
            </button>
          ))}
          <button
            onClick={() => setSelectedFormat('bulk')}
            className={`col-span-2 sm:col-span-1 p-2.5 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
              selectedFormat === 'bulk'
                ? 'bg-blue-900 dark:bg-blue-600 text-white border-blue-900 dark:border-blue-600 shadow-xs'
                : 'bg-white dark:bg-[#11192E] text-[#475467] dark:text-slate-300 border-[#101828]/10 dark:border-white/10 hover:border-[#101828]/30 dark:hover:border-white/30'
            }`}
          >
            <div className="truncate flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Team Orders</span>
            </div>
            <div className="text-[10px] opacity-80">Tiered Pricing</div>
          </button>
        </div>

        {/* Active Format Content */}
        <div className="overflow-y-auto pr-1 flex-1">
          {selectedFormat !== 'bulk' ? (
            <div className="space-y-6">
              {(() => {
                const currentFmt = formats.find((f) => f.id === selectedFormat)!;
                return (
                  <div className="bg-white dark:bg-[#11192E] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-xs space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                          {currentFmt.name}
                        </h3>
                        <p className="text-xs font-mono uppercase text-blue-900 dark:text-blue-400 font-semibold tracking-wider">
                          {currentFmt.subtitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-2xl font-bold text-[#101828] dark:text-white">{currentFmt.price}</span>
                        <span className="block text-[11px] text-[#475467] dark:text-slate-400">USD MSRP</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                      {currentFmt.description}
                    </p>

                    <div className="text-xs text-[#101828] dark:text-slate-200 font-mono pt-2 border-t border-[#101828]/[0.08] dark:border-white/10">
                      Status: <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{currentFmt.availability}</span>
                    </div>

                    {/* Retailer Placeholders */}
                    <div className="pt-4 space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 block">
                        Select Retailer
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <a
                          href="https://amazon.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-[#FAFAF7] dark:bg-[#17233E] border border-[#101828]/15 dark:border-white/10 rounded-lg hover:border-blue-900 dark:hover:border-blue-400 font-medium flex items-center justify-between text-[#101828] dark:text-slate-200 transition-colors group"
                        >
                          <span>Amazon Worldwide</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-900 dark:group-hover:text-blue-400" />
                        </a>
                        <a
                          href="https://barnesandnoble.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-[#FAFAF7] dark:bg-[#17233E] border border-[#101828]/15 dark:border-white/10 rounded-lg hover:border-blue-900 dark:hover:border-blue-400 font-medium flex items-center justify-between text-[#101828] dark:text-slate-200 transition-colors group"
                        >
                          <span>Barnes & Noble</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-900 dark:group-hover:text-blue-400" />
                        </a>
                        <a
                          href="https://bookshop.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-[#FAFAF7] dark:bg-[#17233E] border border-[#101828]/15 dark:border-white/10 rounded-lg hover:border-blue-900 dark:hover:border-blue-400 font-medium flex items-center justify-between text-[#101828] dark:text-slate-200 transition-colors group"
                        >
                          <span>Bookshop.org (Indie Booksellers)</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-900 dark:group-hover:text-blue-400" />
                        </a>
                        <a
                          href="https://audible.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-[#FAFAF7] dark:bg-[#17233E] border border-[#101828]/15 dark:border-white/10 rounded-lg hover:border-blue-900 dark:hover:border-blue-400 font-medium flex items-center justify-between text-[#101828] dark:text-slate-200 transition-colors group"
                        >
                          <span>Audible & Apple Books</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-900 dark:group-hover:text-blue-400" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* Bulk Team Order Form */
            <div className="bg-white dark:bg-[#11192E] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-xs">
              {!teamSubmitted ? (
                <form onSubmit={handleBulkSubmit} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-900 dark:text-blue-400" />
                    <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                      Team & Institutional Bulk Licensing
                    </h3>
                  </div>
                  <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                    Bring the Creator–Architect–Orchestrator framework to your entire engineering organization or computer science department. Bulk orders (10+ copies) include complimentary digital Lab toolkits and an optional private Q&A session with Harsh Verma.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                        Team Size / Copies
                      </label>
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#0A101F] text-[#101828] dark:text-white focus:outline-blue-900 dark:focus:outline-blue-400"
                      >
                        <option value="10-24 copies">10–24 copies (15% discount)</option>
                        <option value="25-50 copies">25–50 copies (25% discount)</option>
                        <option value="51-100 copies">51–100 copies (35% discount)</option>
                        <option value="100+ copies">100+ copies / Enterprise Campus</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                        Work Email
                      </label>
                      <input
                        required
                        type="email"
                        value={teamEmail}
                        onChange={(e) => setTeamEmail(e.target.value)}
                        placeholder="lead@company.com"
                        className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#0A101F] text-[#101828] dark:text-white focus:outline-blue-900 dark:focus:outline-blue-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer shadow-sm mt-3"
                  >
                    Request Team Bulk Quote & Info Pack
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                    Bulk Inquiry Received
                  </h4>
                  <p className="text-xs text-[#475467] dark:text-slate-300 max-w-sm mx-auto">
                    We have received your request for <strong>{teamSize}</strong>. Our publishing liaison will reach out to <strong>{teamEmail}</strong> within 24 hours with custom invoice details.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer / Sample Link */}
        <div className="pt-4 border-t border-[#101828]/10 mt-6 flex items-center justify-between text-xs text-[#475467] shrink-0">
          <span>ISBN: {BOOK_DETAILS.isbn}</span>
          {onOpenSample && (
            <button
              onClick={() => {
                onClose();
                onOpenSample();
              }}
              className="text-blue-900 font-semibold hover:underline cursor-pointer"
            >
              Want to read a chapter first? Click here →
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
