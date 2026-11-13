import React, { useState } from 'react';
import { X, CheckCircle2, ArrowUpRight, Users, Mail, Loader2, Send, AlertCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { sendBookInquiryToAuthor, AUTHOR_EMAIL } from '../utils/emailService';
import { trackEvent, buildUtmUrl } from '../utils/analytics';

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
  const [teamContactName, setTeamContactName] = useState('');
  const [teamEmail, setTeamEmail] = useState('');
  const [teamOrg, setTeamOrg] = useState('');
  const [teamNotes, setTeamNotes] = useState('');
  const [teamSubmitting, setTeamSubmitting] = useState(false);
  const [teamStatus, setTeamStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');
  const [teamStatusMsg, setTeamStatusMsg] = useState('');
  const [teamMailtoUrl, setTeamMailtoUrl] = useState('');

  const [showDirectForm, setShowDirectForm] = useState(true);
  const [directName, setDirectName] = useState('');
  const [directEmail, setDirectEmail] = useState('');
  const [directNotes, setDirectNotes] = useState('');
  const [directSubmitting, setDirectSubmitting] = useState(false);
  const [directStatus, setDirectStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');
  const [directStatusMsg, setDirectStatusMsg] = useState('');
  const [directMailtoUrl, setDirectMailtoUrl] = useState('');

  if (!isOpen) return null;

  const editions = SITE_CONFIG.book.editions;
  const currentFmt = editions.find((e) => e.id === selectedFormat) || editions[0];
  const configuredRetailers = SITE_CONFIG.book.retailers.filter((r) => r.isConfigured && r.url);

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeamSubmitting(true);
    try {
      const res = await sendBookInquiryToAuthor({
        formType: 'Team & Bulk Book Order',
        name: teamContactName || 'Team Lead',
        email: teamEmail,
        organization: teamOrg || 'Engineering Team',
        formatOrCopies: teamSize,
        notesOrMessage: teamNotes || 'Requested organizational bulk licensing and team copies.',
        sourcePage: '/buy-modal (Team Order)',
      });
      setTeamMailtoUrl(res.mailtoUrl);
      setTeamStatusMsg(res.message);
      setTeamStatus(res.success ? 'sent' : 'fallback');
      trackEvent('organization_inquiry', { source: 'buy_modal', copies: teamSize, delivered: res.success });
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
        formatOrCopies: currentFmt.format,
        notesOrMessage: directNotes || `Inquiry regarding ${currentFmt.format} of Beyond AI Engineering.`,
        sourcePage: `/buy-modal (${currentFmt.format})`,
      });
      setDirectMailtoUrl(res.mailtoUrl);
      setDirectStatusMsg(res.message);
      setDirectStatus(res.success ? 'sent' : 'fallback');
      trackEvent('book_purchase_click', { edition: currentFmt.id, channel: 'direct_author', delivered: res.success });
    } finally {
      setDirectSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAFAF7] dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 my-8 text-[#101828] dark:text-slate-100 max-h-[92vh] flex flex-col transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5 pb-4 border-b border-[#101828]/10 dark:border-white/10 shrink-0">
          <div className="text-xs font-mono text-blue-900 dark:text-blue-400 mb-1">
            Beyond AI Engineering · Direct & Organizational Inquiries ({AUTHOR_EMAIL})
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
            Get Beyond AI Engineering
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 mt-1">
            Select an edition or organizational tier to submit a direct request to Harsh Verma ({AUTHOR_EMAIL}).
          </p>
        </div>

        {/* Format Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5 shrink-0">
          {editions.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => {
                setSelectedFormat(fmt.id);
                setDirectStatus('idle');
              }}
              className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-colors cursor-pointer ${
                selectedFormat === fmt.id
                  ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] border-[#101828] dark:border-white'
                  : 'bg-white dark:bg-[#11192E] text-[#475467] dark:text-slate-300 border-[#101828]/10 dark:border-white/10 hover:border-[#101828]/30 dark:hover:border-white/30'
              }`}
            >
              <div className="truncate">{fmt.format.split(' ')[0]}</div>
              <div className="text-[11px] opacity-80">{fmt.price !== null ? `$${fmt.price.toFixed(2)}` : 'Direct Inquiry'}</div>
            </button>
          ))}
          <button
            onClick={() => setSelectedFormat('bulk')}
            className={`col-span-2 sm:col-span-1 p-2.5 rounded-lg border text-xs font-semibold text-center transition-colors cursor-pointer flex flex-col items-center justify-center ${
              selectedFormat === 'bulk'
                ? 'bg-blue-900 dark:bg-blue-600 text-white border-blue-900 dark:border-blue-600'
                : 'bg-white dark:bg-[#11192E] text-[#475467] dark:text-slate-300 border-[#101828]/10 dark:border-white/10 hover:border-[#101828]/30 dark:hover:border-white/30'
            }`}
          >
            <div className="truncate flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Teams</span>
            </div>
            <div className="text-[11px] opacity-80">Bulk Orders</div>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto pr-1 flex-1">
          {selectedFormat !== 'bulk' ? (
            <div className="space-y-5">
              <div className="bg-white dark:bg-[#11192E] p-5 sm:p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                      {currentFmt.format}
                    </h3>
                    <p className="text-xs font-mono text-blue-900 dark:text-blue-400">
                      {currentFmt.subtitle} · {currentFmt.specLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-semibold text-[#101828] dark:text-slate-200">
                      {currentFmt.price !== null ? `$${currentFmt.price.toFixed(2)} USD` : currentFmt.priceLabel}
                    </span>
                  </div>
                </div>

                {/* Direct Author Request Section */}
                <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-950 dark:text-blue-300">
                      <Mail className="w-4 h-4" />
                      <span>Direct Request to Harsh Verma</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDirectForm(!showDirectForm)}
                      className="text-xs font-semibold text-blue-900 dark:text-blue-300 underline cursor-pointer"
                    >
                      {showDirectForm ? 'Hide Form' : 'Open Form'}
                    </button>
                  </div>

                  {showDirectForm && (
                    <div className="pt-1">
                      {directStatus === 'idle' ? (
                        <form onSubmit={handleDirectSubmit} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="block text-xs font-medium text-[#101828] dark:text-slate-300 mb-1">
                                Your Name
                              </label>
                              <input
                                required
                                type="text"
                                value={directName}
                                onChange={(e) => setDirectName(e.target.value)}
                                placeholder="Full name"
                                className="w-full text-xs p-2.5 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0A101F] text-[#101828] dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-[#101828] dark:text-slate-300 mb-1">
                                Your Email
                              </label>
                              <input
                                required
                                type="email"
                                value={directEmail}
                                onChange={(e) => setDirectEmail(e.target.value)}
                                placeholder="you@domain.com"
                                className="w-full text-xs p-2.5 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0A101F] text-[#101828] dark:text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#101828] dark:text-slate-300 mb-1">
                              Shipping Location / Request Notes
                            </label>
                            <textarea
                              rows={2}
                              value={directNotes}
                              onChange={(e) => setDirectNotes(e.target.value)}
                              placeholder={`Request ${currentFmt.format}, release updates, or signed copy details`}
                              className="w-full text-xs p-2.5 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0A101F] text-[#101828] dark:text-white"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={directSubmitting}
                            className="w-full py-2.5 text-xs font-semibold bg-blue-900 dark:bg-blue-600 text-white rounded-md hover:bg-blue-950 dark:hover:bg-blue-500 transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                          >
                            {directSubmitting ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" />
                                <span>{currentFmt.directRequestLabel}</span>
                              </>
                            )}
                          </button>
                        </form>
                      ) : (
                        <div
                          className={`p-4 rounded-lg border text-center space-y-2 ${
                            directStatus === 'sent'
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
                              : 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800'
                          }`}
                        >
                          {directStatus === 'sent' ? (
                            <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 mx-auto" />
                          ) : (
                            <AlertCircle className="w-7 h-7 text-amber-600 dark:text-amber-400 mx-auto" />
                          )}
                          <div className="font-serif font-bold text-base text-[#101828] dark:text-white">
                            {directStatus === 'sent' ? 'Inquiry Sent to Harsh Verma' : 'Complete Request via Email App'}
                          </div>
                          <p className="text-xs text-[#475467] dark:text-slate-300">{directStatusMsg}</p>
                          {directMailtoUrl && (
                            <div className="pt-1">
                              <a
                                href={directMailtoUrl}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-900 text-white text-xs font-semibold hover:bg-blue-950"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>Send via Email Client</span>
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Retailer Links */}
                <div className="pt-1 space-y-2">
                  <span className="text-xs font-mono text-[#475467] dark:text-slate-400 block">
                    Authorized Retail Channels
                  </span>
                  {configuredRetailers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {configuredRetailers.map((retailer) => (
                        <a
                          key={retailer.id}
                          href={buildUtmUrl(retailer.url!, 'buy_modal', 'retailer', retailer.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent('retailer_click', { retailer: retailer.name })}
                          className="p-3 bg-[#FAFAF7] dark:bg-[#17233E] border border-[#101828]/15 dark:border-white/10 rounded-lg hover:border-blue-900 dark:hover:border-blue-400 font-medium flex items-center justify-between text-[#101828] dark:text-slate-200 transition-colors"
                        >
                          <span>{retailer.name}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#475467] dark:text-slate-400 p-3 rounded-lg border border-[#101828]/10 dark:border-white/10 bg-[#FAFAF7] dark:bg-[#0A101F]">
                      Direct storefront links (Amazon, Barnes & Noble, Bookshop.org, Audible) will appear here once edition URLs are finalized. Use the direct request form above to reserve or inquire now.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#11192E] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10">
              {teamStatus === 'idle' ? (
                <form onSubmit={handleBulkSubmit} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-900 dark:text-blue-400" />
                    <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                      Team & Institutional Bulk Orders
                    </h3>
                  </div>
                  <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                    Equip your engineering organization, leadership team, or university course with cohorts of 10–100+ copies. Inquiries go directly to <strong>{AUTHOR_EMAIL}</strong>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-medium text-[#101828] dark:text-slate-200 mb-1">
                        Estimated Quantity
                      </label>
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#0A101F] text-[#101828] dark:text-white"
                      >
                        <option value="10-24 copies">10–24 copies</option>
                        <option value="25-50 copies">25–50 copies</option>
                        <option value="51-100 copies">51–100 copies</option>
                        <option value="100+ copies">100+ copies / Organization-wide</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#101828] dark:text-slate-200 mb-1">
                        Contact Name
                      </label>
                      <input
                        required
                        type="text"
                        value={teamContactName}
                        onChange={(e) => setTeamContactName(e.target.value)}
                        placeholder="Full name"
                        className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#0A101F] text-[#101828] dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#101828] dark:text-slate-200 mb-1">
                        Work Email
                      </label>
                      <input
                        required
                        type="email"
                        value={teamEmail}
                        onChange={(e) => setTeamEmail(e.target.value)}
                        placeholder="lead@company.com"
                        className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#0A101F] text-[#101828] dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#101828] dark:text-slate-200 mb-1">
                        Organization / University
                      </label>
                      <input
                        type="text"
                        value={teamOrg}
                        onChange={(e) => setTeamOrg(e.target.value)}
                        placeholder="Organization name"
                        className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#0A101F] text-[#101828] dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#101828] dark:text-slate-200 mb-1">
                      Target Dates & Format Preferences
                    </label>
                    <textarea
                      rows={2}
                      value={teamNotes}
                      onChange={(e) => setTeamNotes(e.target.value)}
                      placeholder="Preferred editions, shipping region, or optional author session."
                      className="w-full text-xs p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#0A101F] text-[#101828] dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={teamSubmitting}
                    className="w-full py-3 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {teamSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Bulk Order Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3">
                  {teamStatus === 'sent' ? (
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  ) : (
                    <AlertCircle className="w-10 h-10 text-amber-600 dark:text-amber-400 mx-auto" />
                  )}
                  <h4 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                    {teamStatus === 'sent' ? 'Bulk Inquiry Sent to Harsh Verma' : 'Complete Dispatch via Email Client'}
                  </h4>
                  <p className="text-xs text-[#475467] dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                    {teamStatusMsg}
                  </p>
                  {teamMailtoUrl && (
                    <div className="pt-2">
                      <a
                        href={teamMailtoUrl}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-blue-900 text-white text-xs font-semibold hover:bg-blue-950"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email Client</span>
                      </a>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setTeamStatus('idle');
                      setTeamNotes('');
                    }}
                    className="block mx-auto mt-2 text-xs text-[#475467] dark:text-slate-400 underline hover:text-[#101828] dark:hover:text-white cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#101828]/10 dark:border-white/10 mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#475467] dark:text-slate-400 shrink-0">
          <span>{SITE_CONFIG.book.isbn ? `ISBN: ${SITE_CONFIG.book.isbn}` : SITE_CONFIG.book.editionNote}</span>
          {onOpenSample && (
            <button
              onClick={() => {
                onClose();
                onOpenSample();
              }}
              className="text-blue-900 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
            >
              Read a sample chapter first →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
