import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { sendBookInquiryToAuthor, AUTHOR_EMAIL, BookInquiryPayload } from '../utils/emailService';
import { trackEvent } from '../utils/analytics';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';

interface ContactViewProps {
  onNavigate: (page: PageId) => void;
}

const CONTACT_TOPICS: Array<{
  label: string;
  formType: BookInquiryPayload['formType'];
}> = [
  { label: 'Individual Book Copy Inquiry', formType: 'Individual Book Inquiry' },
  { label: 'Team & Organization Bulk Order', formType: 'Team & Bulk Book Order' },
  { label: 'Speaking / Keynote Invitation', formType: 'Speaking & Keynote Inquiry' },
  { label: 'Media, Podcast & Press Inquiry', formType: 'General Contact Inquiry' },
  { label: 'General Reader Question', formType: 'General Contact Inquiry' },
];

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [selectedTopic, setSelectedTopic] = useState(CONTACT_TOPICS[0].label);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');

  useEffect(() => {
    updatePageSeo({
      title: `Contact ${SITE_CONFIG.author.name} | ${SITE_CONFIG.book.title}`,
      description:
        'Reach Harsh Verma directly for individual book inquiries, bulk organizational orders, speaking engagements, media requests, and engineering partnerships.',
      canonicalPath: '/contact',
      ogType: 'website',
      ogImage: PAGE_OG_IMAGES.contact,
      breadcrumbs: [{ name: 'Contact', path: '/contact' }],
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const topicConfig =
      CONTACT_TOPICS.find((t) => t.label === selectedTopic) || CONTACT_TOPICS[0];

    trackEvent('contact_form_submit', { topic: selectedTopic });

    try {
      const res = await sendBookInquiryToAuthor({
        formType: topicConfig.formType,
        name,
        email,
        organization: organization || 'Individual Reader',
        formatOrCopies: selectedTopic,
        notesOrMessage: message,
        sourcePage: '/contact',
      });
      setMailtoUrl(res.mailtoUrl);
      setStatusMessage(res.message);
      setSubmitStatus(res.success ? 'sent' : 'fallback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-0 pb-20">
      {/* 1. HERO + SPLIT CONTACT GRID */}
      <section className="pt-10 sm:pt-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
              Direct Author Channel
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#101828] dark:text-white text-balance">
              Connect with {SITE_CONFIG.author.name}
            </h1>
            <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 leading-relaxed">
              For individual book inquiries, corporate engineering reading groups, keynote invitations, or press interviews, submit a message here or write directly.
            </p>

            <div className="p-6 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl space-y-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 mb-1">
                  Public Contact Address
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.author.publicContactEmail}`}
                  className="font-mono text-sm font-bold text-blue-900 dark:text-blue-400 hover:underline"
                >
                  {SITE_CONFIG.author.publicContactEmail}
                </a>
              </div>
              <div className="pt-3 border-t border-[#101828]/[0.08] dark:border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 mb-1">
                  Author Inbox Routing
                </div>
                <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                  All web inquiries are routed directly to <strong>{AUTHOR_EMAIL}</strong>.
                </p>
              </div>
              <div className="pt-3 border-t border-[#101828]/[0.08] dark:border-white/10 flex flex-wrap gap-4 text-xs">
                <a
                  href={SITE_CONFIG.author.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#101828] dark:text-slate-200 hover:text-blue-900 dark:hover:text-blue-400 inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={SITE_CONFIG.author.personalSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#101828] dark:text-slate-200 hover:text-blue-900 dark:hover:text-blue-400 inline-flex items-center gap-1"
                >
                  <span>harshverma.me</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={SITE_CONFIG.author.forbesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#101828] dark:text-slate-200 hover:text-blue-900 dark:hover:text-blue-400 inline-flex items-center gap-1"
                >
                  <span>Forbes Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0D1527] p-8 sm:p-10 rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-lg">
            {submitStatus === 'idle' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                  >
                    {CONTACT_TOPICS.map((t) => (
                      <option key={t.label} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                    Organization / Affiliation (Optional)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Company, University, or Publication"
                    className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can Harsh help? Include book format preferences, event dates, or team context if applicable."
                    className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending to {AUTHOR_EMAIL}...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message to {AUTHOR_EMAIL}</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                {submitStatus === 'sent' ? (
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                ) : (
                  <AlertCircle className="w-12 h-12 text-amber-600 dark:text-amber-400 mx-auto" />
                )}
                <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                  {submitStatus === 'sent'
                    ? 'Message Dispatched'
                    : 'Complete Delivery via Email App'}
                </h2>
                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  {statusMessage}
                </p>
                {mailtoUrl && (
                  <div className="pt-2">
                    <a
                      href={mailtoUrl}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        submitStatus === 'fallback'
                          ? 'px-4 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md'
                          : 'text-blue-900 dark:text-blue-400 underline'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>
                        {submitStatus === 'fallback'
                          ? `Open Pre-Filled Email to ${AUTHOR_EMAIL}`
                          : 'Open backup copy in mail app'}
                      </span>
                    </a>
                  </div>
                )}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="px-4 py-2 text-xs font-semibold border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-white rounded-md hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
