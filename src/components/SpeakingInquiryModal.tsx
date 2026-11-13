import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Mic, Loader2, Mail, AlertCircle } from 'lucide-react';
import { sendBookInquiryToAuthor, AUTHOR_EMAIL } from '../utils/emailService';
import { trackEvent } from '../utils/analytics';

interface SpeakingInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export const SpeakingInquiryModal: React.FC<SpeakingInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = 'The Engineer After Code',
}) => {
  const [topic, setTopic] = useState(defaultTopic);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [eventType, setEventType] = useState('Conference Keynote');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sent' | 'fallback' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTopic(defaultTopic);
      setStatus('idle');
      setStatusMsg('');
    }
  }, [defaultTopic, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    try {
      const res = await sendBookInquiryToAuthor({
        formType: 'Speaking & Keynote Inquiry',
        name,
        email,
        organization,
        formatOrCopies: `${eventType} (${topic})`,
        notesOrMessage: message || 'Speaking and keynote inquiry.',
        sourcePage: '/speaking-inquiry',
      });
      setMailtoUrl(res.mailtoUrl);
      setStatusMsg(res.message);
      setStatus(res.success ? 'sent' : 'fallback');
      trackEvent('speaking_inquiry', { topic, eventType, delivered: res.success });
    } catch {
      setStatus('error');
      setStatusMsg(`Unable to process request. Please email ${AUTHOR_EMAIL} directly.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setStatusMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#FAFAF7] dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 my-8 text-[#101828] dark:text-slate-100 transition-colors">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors cursor-pointer"
          aria-label="Close speaking inquiry modal"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'idle' || status === 'error' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-blue-900 dark:text-blue-400 mb-1">
                <Mic className="w-3.5 h-3.5" />
                <span>Executive & Conference Briefings</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
                Invite Harsh Verma to Speak
              </h2>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 mt-1">
                Keynotes, executive offsites, and university talks on engineering leadership, autonomous agents, and the Trust Economy.
              </p>
            </div>

            {status === 'error' && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-mono font-semibold text-[#101828] dark:text-slate-200 mb-1">
                  Selected Keynote / Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white"
                >
                  <option value="The Engineer After Code">The Engineer After Code</option>
                  <option value="From Creator to Orchestrator">From Creator to Orchestrator</option>
                  <option value="The Trust Economy">The Trust Economy</option>
                  <option value="When AI Agents Become Digital Actors">When AI Agents Become Digital Actors</option>
                  <option value="Building the AI-Native Engineering Organization">Building the AI-Native Engineering Organization</option>
                  <option value="Custom Executive Session">Custom Executive Briefing</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#101828] dark:text-slate-200 mb-1">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#101828] dark:text-slate-200 mb-1">
                    Work Email
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#101828] dark:text-slate-200 mb-1">
                    Organization / Event
                  </label>
                  <input
                    required
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Company, Summit, or University"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#101828] dark:text-slate-200 mb-1">
                    Event Format
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white"
                  >
                    <option value="Conference Keynote">Conference Keynote</option>
                    <option value="Executive Briefing / Offsite">Executive Briefing / Offsite</option>
                    <option value="Engineering All-Hands">Engineering All-Hands</option>
                    <option value="University / Academic Lecture">University / Academic Lecture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-[#101828] dark:text-slate-200 mb-1">
                  Event Details & Target Dates
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share audience size, target dates, virtual or in-person format, and focus areas."
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium border border-[#101828]/20 dark:border-white/20 rounded-md text-[#475467] dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Speaking Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto border ${
                status === 'sent'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40'
              }`}
            >
              {status === 'sent' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
              {status === 'sent'
                ? 'Speaking Request Sent'
                : 'Complete Dispatch via Email App'}
            </h3>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              {statusMsg}
            </p>
            {mailtoUrl && (
              <div className="pt-2">
                <a
                  href={mailtoUrl}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-blue-900 text-white hover:bg-blue-950 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open in Email Client ({AUTHOR_EMAIL})</span>
                </a>
              </div>
            )}
            <div className="pt-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-white rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
