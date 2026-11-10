import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { updatePageSeo } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { Users, BookOpen, CheckCircle2, Send, Building, GraduationCap, ShieldCheck, Trophy, ChevronRight, ArrowRight, Loader2, Mail } from 'lucide-react';
import { sendBookInquiryToAuthor, AUTHOR_EMAIL } from '../utils/emailService';

interface TeamsViewProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
}

export const TeamsView: React.FC<TeamsViewProps> = ({ onNavigate, onOpenAssessment }) => {
  const [teamSize, setTeamSize] = useState('25-50 copies');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [teamType, setTeamType] = useState('Enterprise Engineering Org');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');

  useEffect(() => {
    updatePageSeo({
      title: 'Bring Beyond AI Engineering to Your Team | Harsh Verma',
      description:
        'Equip your engineering organization or university with the Creator-Architect-Orchestrator operating system. Bulk licensing, team discussion guides, and executive briefings with Harsh Verma.',
      canonicalPath: '/teams',
      ogType: 'website',
      breadcrumbs: [{ name: 'Teams & Bulk Licensing', path: '/teams' }],
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent('team_inquiry', {
      teamSize,
      organization,
      teamType,
    });

    try {
      const res = await sendBookInquiryToAuthor({
        formType: 'Team & Bulk Book Order',
        name: contactName,
        email: workEmail,
        organization: `${organization} (${teamType})`,
        formatOrCopies: teamSize,
        notesOrMessage: message || 'Team bulk licensing inquiry.',
        sourcePage: '/teams',
      });
      setMailtoUrl(res.mailtoUrl);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-0 pb-20">
      {/* 1. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-900 dark:text-blue-400 font-semibold">Team & Bulk Orders</span>
        </nav>
      </div>

      {/* 2. HERO */}
      <section className="pt-8 sm:pt-14 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-900 dark:text-blue-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Enterprise & University Programs</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] dark:text-white">
            Bring Beyond AI Engineering to Your Team
          </h1>

          <p className="font-serif text-xl text-[#475467] dark:text-slate-300 italic max-w-2xl mx-auto">
            Equip your engineering organization to move from code generation to systems judgment, agent governance, and institutional trust.
          </p>

          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Tiered book licensing, tailored chapter reading roadmaps, and optional private author sessions with <strong>Harsh Verma</strong> for groups of 10 or more.
          </p>
        </div>
      </section>

      {/* 3. OFFERING BLOCKS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
            Program Components
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white">
            Everything Included for Your Organization
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl shadow-xs space-y-3">
            <BookOpen className="w-6 h-6 text-blue-900 dark:text-blue-400" />
            <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
              Tiered Bulk Books
            </h3>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              Available in collector Hardcover, lightweight Paperback, or DRM-free eBook bundles delivered directly to team members globally.
            </p>
            <div className="text-xs font-mono text-blue-900 dark:text-blue-400 pt-2">
              15% to 35% volume discounts
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl shadow-xs space-y-3">
            <ShieldCheck className="w-6 h-6 text-purple-900 dark:text-purple-400" />
            <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
              Discussion & Reading Guides
            </h3>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              Ready-to-run 4-week team reading syllabus with targeted architectural questions, internal hackathon prompts, and group debate prompts.
            </p>
            <div className="text-xs font-mono text-purple-900 dark:text-purple-400 pt-2">
              Complimentary with 10+ copies
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl shadow-xs space-y-3">
            <Trophy className="w-6 h-6 text-emerald-900 dark:text-emerald-400" />
            <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
              Author Briefing / Q&A
            </h3>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              Host a 45-minute private virtual executive briefing or team fireside Q&A with Harsh Verma focused on agent governance and career acceleration.
            </p>
            <div className="text-xs font-mono text-emerald-900 dark:text-emerald-400 pt-2">
              Available for 50+ copy orders
            </div>
          </div>
        </div>
      </section>

      {/* 4. INQUIRY FORM */}
      <section className="py-16 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0D1527] p-8 sm:p-10 rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-lg">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold block mb-1">
                  Custom Enterprise Quote
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
                  Request Team Information Pack
                </h3>
                <p className="text-xs text-[#475467] dark:text-slate-300 mt-1">
                  We will respond within 24 hours with volume discount pricing and invoice details.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                  Estimated Team Size / Quantity
                </label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                >
                  <option value="10-24 copies">10–24 copies (15% discount)</option>
                  <option value="25-50 copies">25–50 copies (25% discount)</option>
                  <option value="51-100 copies">51–100 copies (35% discount)</option>
                  <option value="100+ copies">100+ copies (Enterprise Campus License + Author Briefing)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. David Chen"
                    className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                    Work Email
                  </label>
                  <input
                    required
                    type="email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="dchen@company.com"
                    className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                    Company / University Name
                  </label>
                  <input
                    required
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Stripe, MIT, Palo Alto Networks"
                    className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                    Organization Type
                  </label>
                  <select
                    value={teamType}
                    onChange={(e) => setTeamType(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                  >
                    <option value="Enterprise Engineering Org">Enterprise Engineering Org</option>
                    <option value="AI / R&D Team">AI / R&D Team</option>
                    <option value="University / Academic Dept">University / Academic Dept</option>
                    <option value="Technical Leadership Program">Technical Leadership Program</option>
                    <option value="Developer Community">Developer Community</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                  Additional Goals / Timeline
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your team size, preferred format (hardcover/eBook), and target rollout date."
                  className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer shadow-sm mt-3 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching to {AUTHOR_EMAIL}...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Bulk Order Request to {AUTHOR_EMAIL}</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                Bulk Inquiry Dispatched to Harsh Verma!
              </h4>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, {contactName}. Your inquiry for <strong>{teamSize}</strong> for <strong>{organization}</strong> has been transmitted directly to <strong>{AUTHOR_EMAIL}</strong>. Our publishing team will follow up at <strong>{workEmail}</strong> within 24 business hours.
              </p>
              {mailtoUrl && (
                <div className="pt-2">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 dark:text-blue-400 underline hover:opacity-80"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send backup copy via personal mail client</span>
                  </a>
                </div>
              )}
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-semibold border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-white rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Submit Another
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
