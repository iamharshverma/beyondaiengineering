import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import {
  BookOpen,
  CheckCircle2,
  Send,
  ShieldCheck,
  Trophy,
  ChevronRight,
  Loader2,
  Mail,
  Download,
  AlertCircle,
} from 'lucide-react';
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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');
  const [downloadedGuide, setDownloadedGuide] = useState(false);

  useEffect(() => {
    updatePageSeo({
      title: 'For Organizations & Engineering Teams | Beyond AI Engineering',
      description:
        'Bulk book adoption, leadership reading groups, workshops, and keynotes to prepare engineering organizations for the agentic AI era.',
      canonicalPath: '/organizations',
      ogType: 'website',
      ogImage: PAGE_OG_IMAGES.organizations,
      breadcrumbs: [{ name: 'For Organizations', path: '/organizations' }],
    });
  }, []);

  const handleDownloadGuide = () => {
    trackEvent('resource_download', { resourceId: '4-week-team-reading-guide' });
    const guideText = `4-WEEK ENGINEERING READING GROUP SYLLABUS
Companion to ${SITE_CONFIG.book.fullTitle} by ${SITE_CONFIG.author.name}

WEEK 1: THE SHIFT (PART I — CHAPTERS 1–3)
Focus: C.A.O. Operating Model & Escaping the Syntax Trap
Discussion Prompts:
1. Where does our engineering team spend disproportionate time in the "Creator" mode on work an agent should draft?
2. Which "How" tickets last sprint masked an unexamined "What" product assumption?
Exercise: Have every engineer complete the 12-scenario C.A.O. Diagnostic (${SITE_CONFIG.canonicalOrigin}/cao-framework).

WEEK 2: AI WORKFLOWS & AUTHORITY (PART II — CHAPTERS 4–6)
Focus: Prompt Empathy, Agentic Diplomacy & Evaluation Rigor
Discussion Prompts:
1. Which tools in our staging/production environments currently lack strict mutation guardrails?
2. How do we separate synthetic output volume from verifiable Digital Paper Trail evidence in PR reviews?
Exercise: Draft a 1-page Human API Contract for code review and agent testing gates.

WEEK 3: ORGANIZATIONAL LEVERAGE (PART III — CHAPTERS 7–9)
Focus: From Stagnation to Innovation & Safe Delegation
Discussion Prompts:
1. Where do we mistake "vibe-checking outputs" for deterministic evaluation benchmarks?
2. Who owns incident accountability when an automated workflow fails silently at 3:00 AM?
Exercise: Run the Ethical AI & Liability Audit on one live or planned AI workflow.

WEEK 4: PRACTICE & 90-DAY ROLLOUT (PART IV — CHAPTERS 10–11)
Focus: Open-Source Stack, Team Transition & Reading Retrospectives
Discussion Prompts:
1. Which open-source observability or evaluation tool should become standard across our repositories this quarter?
2. What measurable system reliability metric will define success over the next 90 days?

For bulk copies, team workshops, or executive briefings, contact ${SITE_CONFIG.author.publicContactEmail} or visit ${SITE_CONFIG.canonicalOrigin}/organizations
`;

    const blob = new Blob([guideText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '4-Week-Reading-Group-Guide-Beyond-AI-Engineering.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloadedGuide(true);
    setTimeout(() => setDownloadedGuide(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent('organization_inquiry', {
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
        notesOrMessage: message || 'Organization & bulk book inquiry.',
        sourcePage: '/organizations',
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
      {/* 1. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-900 dark:text-blue-400 font-semibold">For Organizations</span>
        </nav>
      </div>

      {/* 2. HERO */}
      <section className="pt-8 sm:pt-14 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-900 dark:text-blue-400 block">
            Enterprise, Leadership & University Programs
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] dark:text-white text-balance">
            Prepare Your Engineering Teams for the Agentic AI Era
          </h1>

          <p className="font-serif text-xl text-[#475467] dark:text-slate-300 italic max-w-2xl mx-auto">
            Equip your engineering organization to move from raw code generation to systems judgment, agent governance, and institutional trust.
          </p>

          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Tailored bulk copy arrangements, structured 4-week reading group guides, and optional private author briefings with <strong>{SITE_CONFIG.author.name}</strong>.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleDownloadGuide}
              className="px-4 py-2.5 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadedGuide ? 'Discussion Guide Downloaded!' : 'Download 4-Week Reading Group Guide'}</span>
            </button>
            <button
              type="button"
              onClick={onOpenAssessment}
              className="px-4 py-2.5 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/15 text-[#101828] dark:text-slate-200 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Preview Team C.A.O. Diagnostic
            </button>
          </div>
        </div>
      </section>

      {/* 3. OFFERING BLOCKS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
            Program Tracks
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white">
            Three Ways Organizations Adopt the Book
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl shadow-xs space-y-3">
            <BookOpen className="w-6 h-6 text-blue-900 dark:text-blue-400" />
            <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
              Corporate Learning & Engineering Teams
            </h3>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              Arrange Hardcover, Paperback, or Digital group orders delivered to distributed engineering departments worldwide, paired with the 4-week study syllabus.
            </p>
            <div className="text-xs font-mono text-blue-900 dark:text-blue-400 pt-2">
              Tailored volume arrangements on request
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl shadow-xs space-y-3">
            <Trophy className="w-6 h-6 text-purple-900 dark:text-purple-400" />
            <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
              Tech Leadership Briefings & Offsites
            </h3>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              Host a private executive briefing or engineering all-hands Q&A with {SITE_CONFIG.author.name} covering agent authority matrices, evaluation telemetry, and career ladders.
            </p>
            <div className="text-xs font-mono text-purple-900 dark:text-purple-400 pt-2">
              Custom half-day or fireside formats
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl shadow-xs space-y-3">
            <ShieldCheck className="w-6 h-6 text-emerald-800 dark:text-emerald-400" />
            <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
              University & CS Program Adoption
            </h3>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              Equip computer science cohorts, capstone courses, and graduate AI engineering labs with the 3-Project Proof of Work rubric and Human API governance guidelines.
            </p>
            <div className="text-xs font-mono text-emerald-800 dark:text-emerald-400 pt-2">
              Academic & lab evaluation inquiries open
            </div>
          </div>
        </div>
      </section>

      {/* 4. INQUIRY FORM */}
      <section className="py-16 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0D1527] p-8 sm:p-10 rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-lg">
          {submitStatus === 'idle' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold block mb-1">
                  Direct Organizational Inquiry
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
                  Request Team & Bulk Book Information
                </h3>
                <p className="text-xs text-[#475467] dark:text-slate-300 mt-1">
                  Inquiries route directly to Harsh Verma (<span className="font-mono">{AUTHOR_EMAIL}</span>) with availability and volume options.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200 mb-1">
                  Estimated Team Size / Copies
                </label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                >
                  <option value="10-24 copies">10–24 copies (Engineering Team)</option>
                  <option value="25-50 copies">25–50 copies (Department Rollout)</option>
                  <option value="51-100 copies">51–100 copies (Organization + Q&A)</option>
                  <option value="100+ copies">100+ copies (Enterprise / University Cohort)</option>
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
                    placeholder="Your full name"
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
                    placeholder="name@organization.com"
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
                    placeholder="Organization or Department"
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
                  placeholder="Share your preferred book format, target reading-group timeline, or briefing interest."
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
                    <span>Sending to {AUTHOR_EMAIL}...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Organization Inquiry to {AUTHOR_EMAIL}</span>
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
              <h4 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                {submitStatus === 'sent'
                  ? 'Organization Inquiry Sent'
                  : 'Complete Delivery via Email App'}
              </h4>
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
                        : 'text-blue-900 dark:text-blue-400 underline hover:opacity-80'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>
                      {submitStatus === 'fallback'
                        ? `Open Pre-Filled Email to ${AUTHOR_EMAIL}`
                        : 'Send backup copy via personal mail client'}
                    </span>
                  </a>
                </div>
              )}
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitStatus('idle')}
                  className="px-4 py-2 text-xs font-semibold border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-white rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Submit Another
                </button>
                <button
                  type="button"
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
