import React, { useEffect, useState } from 'react';
import { PageId } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { FRAMEWORKS } from '../data/frameworksData';
import { updatePageSeo, CANONICAL_ORIGIN, buildDynamicFrameworkSeo } from '../utils/seo';
import { CiteThisFramework } from '../components/CiteThisFramework';
import { trackEvent } from '../utils/analytics';
import {
  ArrowRight,
  Layers,
  Compass,
  CheckCircle2,
  Copy,
  Check,
  Download,
  ShieldCheck,
} from 'lucide-react';

interface FrameworkDetailViewProps {
  frameworkId: string;
  onNavigate: (page: PageId) => void;
  onSelectFramework: (id: string) => void;
  onOpenBuyModal: () => void;
}

export const FrameworkDetailView: React.FC<FrameworkDetailViewProps> = ({
  frameworkId,
  onNavigate,
  onSelectFramework,
  onOpenBuyModal,
}) => {
  const framework = FRAMEWORKS.find((f) => f.id === frameworkId) || FRAMEWORKS[0];

  // Interactive mini-tool states
  const [trustChecklist, setTrustChecklist] = useState<boolean[]>([true, false, false, false, false]);
  const [questionView, setQuestionView] = useState<'before' | 'after'>('after');
  const [contractRole, setContractRole] = useState('Staff / Principal Engineer');
  const [contractScope, setContractScope] = useState('Production payment & authentication services');
  const [contractGate, setContractGate] = useState('Zero unverified AI SQL or schema migrations; deterministic CI evals required');
  const [contractCopied, setContractCopied] = useState(false);
  const [ethicalChecks, setEthicalChecks] = useState<boolean[]>([true, true, false, false, false]);

  useEffect(() => {
    updatePageSeo(buildDynamicFrameworkSeo(framework));
  }, [framework]);

  const relatedFrameworks = FRAMEWORKS.filter((f) => f.id !== framework.id).slice(0, 3);
  const trustScore = trustChecklist.filter(Boolean).length;
  const ethicalScore = ethicalChecks.filter(Boolean).length;

  const contractText = `HUMAN API OPERATING CONTRACT
Owner Role: ${contractRole}
Protected System Scope: ${contractScope}
Mandatory Verification Gate: ${contractGate}
Escalation Rule: Any ambiguous tolerance or PII boundary stalls execution for human sign-off.
Reference: ${SITE_CONFIG.book.title} by ${SITE_CONFIG.author.name} (${CANONICAL_ORIGIN}/frameworks/human-api)`;

  const handleCopyContract = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contractText);
      setContractCopied(true);
      setTimeout(() => setContractCopied(false), 2500);
    }
  };

  const handleDownloadContract = () => {
    trackEvent('resource_download', { resource: 'human_api_contract' });
    const blob = new Blob([contractText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Human-API-Contract-Template.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const renderInteractiveVisualModule = () => {
    if (framework.id === 'trust-economy') {
      const trustItems = [
        'Every AI-assisted change passes deterministic automated tests before human review.',
        'Sensitive actions require explicit, least-privilege human authorization bounds.',
        'At least one Architecture Decision Record (ADR) documents trade-offs monthly.',
        'Failure modes and hallucination fallback paths are explicitly instrumented.',
        'Someone named owns production accountability at 3:00 AM.',
      ];

      return (
        <div className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block">
                Economic Curve · Output Supply vs. Judgment Value
              </span>
              <svg viewBox="0 0 360 210" className="w-full h-auto" role="img" aria-label="Trust Economy Supply Abundance vs Judgment Scarcity Curve">
                <line x1="40" y1="175" x2="335" y2="175" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
                <line x1="40" y1="20" x2="40" y2="175" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
                <text x="190" y="198" textAnchor="middle" className="fill-[#475467] dark:fill-slate-400 text-[10px] font-mono">AI Model Code & Content Volume →</text>
                <text x="15" y="100" textAnchor="middle" transform="rotate(-90 15 100)" className="fill-[#475467] dark:fill-slate-400 text-[10px] font-mono">Economic Leverage →</text>
                <path d="M50 40 C120 55, 190 135, 325 162" fill="none" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" strokeDasharray="4 4" />
                <text x="245" y="148" className="fill-rose-700 dark:fill-rose-400 text-[10px] font-mono">Raw Syntax Value</text>
                <path d="M50 155 C140 138, 210 68, 325 32" fill="none" className="stroke-blue-800 dark:stroke-blue-400" strokeWidth="3" />
                <text x="215" y="42" className="fill-blue-900 dark:fill-blue-300 text-[10px] font-mono font-bold">Verified Judgment Premium</text>
              </svg>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold">
                  Judgment Scarcity Self-Check
                </span>
                <span className="font-mono tabular-nums text-xs font-bold text-[#101828] dark:text-white">
                  {trustScore} / 5 Verified
                </span>
              </div>
              <div className="space-y-2">
                {trustItems.map((item, idx) => (
                  <label key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/[0.08] dark:border-white/10 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={trustChecklist[idx]}
                      onChange={() =>
                        setTrustChecklist((prev) => prev.map((v, i) => (i === idx ? !v : v)))
                      }
                      className="mt-0.5 accent-blue-900"
                    />
                    <span className="text-[#101828] dark:text-slate-200 leading-relaxed">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (framework.id === 'how-to-what') {
      const comparisonPairs = [
        {
          before: 'How do I wire up this REST endpoint and write unit tests quickly?',
          after: 'What business invariant must this transaction preserve under network retries and partial failures?',
        },
        {
          before: 'How do I prompt an agent to scrape and summarize customer tickets?',
          after: 'What underlying workflow bottleneck causes repeat tickets, and what deterministic fix removes it?',
        },
      ];

      return (
        <div className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block mb-2">
                Decision Inversion Funnel
              </span>
              <svg viewBox="0 0 320 200" className="w-full h-auto" role="img" aria-label="Inverted Funnel from What Should Exist down to How to Implement">
                <polygon points="20,20 300,20 240,85 80,85" className="fill-blue-900/15 dark:fill-blue-400/20 stroke-blue-900 dark:stroke-blue-400" strokeWidth="1.5" />
                <text x="160" y="48" textAnchor="middle" className="fill-[#101828] dark:fill-white text-[12px] font-serif font-bold">01 · WHAT SHOULD EXIST?</text>
                <text x="160" y="66" textAnchor="middle" className="fill-[#475467] dark:fill-slate-300 text-[10px] font-mono">Problem Discovery & Opportunity Cost</text>
                <polygon points="84,92 236,92 200,140 120,140" className="fill-purple-900/15 dark:fill-purple-400/20 stroke-purple-800 dark:stroke-purple-400" strokeWidth="1.5" />
                <text x="160" y="120" textAnchor="middle" className="fill-[#101828] dark:fill-white text-[11px] font-serif font-bold">02 · BOUNDARIES & EVALS</text>
                <polygon points="124,147 196,147 180,188 140,188" className="fill-slate-200 dark:fill-slate-800 stroke-slate-500" strokeWidth="1.5" />
                <text x="160" y="172" textAnchor="middle" className="fill-[#101828] dark:fill-slate-200 text-[10px] font-mono">03 · HOW (Syntax)</text>
              </svg>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold">
                  Before / After Question Switcher
                </span>
                <div className="inline-flex rounded-md border border-[#101828]/15 dark:border-white/15 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuestionView('before')}
                    className={`px-3 py-1 text-xs font-mono cursor-pointer ${
                      questionView === 'before'
                        ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14]'
                        : 'bg-[#FAFAF7] dark:bg-[#11192E] text-[#475467] dark:text-slate-300'
                    }`}
                  >
                    Old: HOW
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionView('after')}
                    className={`px-3 py-1 text-xs font-mono cursor-pointer ${
                      questionView === 'after'
                        ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14]'
                        : 'bg-[#FAFAF7] dark:bg-[#11192E] text-[#475467] dark:text-slate-300'
                    }`}
                  >
                    New: WHAT
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {comparisonPairs.map((pair, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/10 dark:border-white/10">
                    <span className="text-[10px] font-mono uppercase text-[#475467] dark:text-slate-400 block mb-1">
                      {questionView === 'before' ? 'Implementation-First Question' : 'Direction & Invariant Question'}
                    </span>
                    <p className="font-serif text-sm sm:text-base text-[#101828] dark:text-white">
                      "{questionView === 'before' ? pair.before : pair.after}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (framework.id === 'human-api' || framework.id === 'prompt-empathy' || framework.id === 'agentic-diplomacy') {
      return (
        <div className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block">
                Hourglass Interface Topology
              </span>
              <svg viewBox="0 0 300 220" className="w-full h-auto" role="img" aria-label="Human API Hourglass Topology connecting stakeholders to autonomous tools">
                <polygon points="30,20 270,20 190,100 110,100" className="fill-blue-900/15 dark:fill-blue-400/20 stroke-blue-900 dark:stroke-blue-400" strokeWidth="1.5" />
                <text x="150" y="55" textAnchor="middle" className="fill-[#101828] dark:fill-white text-[11px] font-serif font-bold">Human Stakeholders & Intent</text>
                <rect x="90" y="96" width="120" height="28" rx="6" className="fill-[#101828] dark:fill-white" />
                <text x="150" y="114" textAnchor="middle" className="fill-white dark:fill-[#070B14] text-[10px] font-mono font-bold">THE HUMAN API</text>
                <polygon points="110,124 190,124 270,202 30,202" className="fill-emerald-900/15 dark:fill-emerald-400/20 stroke-emerald-700 dark:stroke-emerald-400" strokeWidth="1.5" />
                <text x="150" y="176" textAnchor="middle" className="fill-[#101828] dark:fill-white text-[11px] font-serif font-bold">Sandboxed Agent Tools & Evals</text>
              </svg>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block">
                Interactive 1-Page Human API Contract Builder
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label htmlFor="hapi-role" className="font-mono text-[10px] uppercase text-[#475467] dark:text-slate-400 block mb-1">
                    Accountable Role
                  </label>
                  <input
                    id="hapi-role"
                    type="text"
                    value={contractRole}
                    onChange={(e) => setContractRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-[#101828]/15 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="hapi-scope" className="font-mono text-[10px] uppercase text-[#475467] dark:text-slate-400 block mb-1">
                    Protected Domain
                  </label>
                  <input
                    id="hapi-scope"
                    type="text"
                    value={contractScope}
                    onChange={(e) => setContractScope(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-[#101828]/15 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white"
                  />
                </div>
              </div>
              <div className="text-xs">
                <label htmlFor="hapi-gate" className="font-mono text-[10px] uppercase text-[#475467] dark:text-slate-400 block mb-1">
                  Mandatory Verification Gate
                </label>
                <input
                  id="hapi-gate"
                  type="text"
                  value={contractGate}
                  onChange={(e) => setContractGate(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-[#101828]/15 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyContract}
                  className="px-3.5 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {contractCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{contractCopied ? 'Contract Copied' : 'Copy Contract'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadContract}
                  className="px-3.5 py-2 text-xs font-semibold border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-slate-200 rounded-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (framework.id === 'ethical-curation') {
      const auditQuestions = [
        'Have training or retrieval data sources been audited for provenance and copyright clarity?',
        'Are deterministic guardrails enforcing least-privilege access on external tool calls?',
        'Is user PII isolated from third-party LLM model retention logs?',
        'Can a human operator pause, override, or roll back agent actions in seconds?',
        'Is a specific named engineer or team accountable for automated outputs in production?',
      ];

      return (
        <div className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Interactive 5-Point Ethical Curation Audit</span>
            </div>
            <span className="font-mono tabular-nums text-xs font-bold text-[#101828] dark:text-white">
              Readiness: {ethicalScore} / 5 ({ethicalScore >= 4 ? 'Strong Governance' : 'Hardening Needed'})
            </span>
          </div>

          <div className="space-y-2">
            {auditQuestions.map((q, idx) => (
              <label key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/10 dark:border-white/10 text-xs sm:text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={ethicalChecks[idx]}
                  onChange={() =>
                    setEthicalChecks((prev) => prev.map((v, i) => (i === idx ? !v : v)))
                  }
                  className="mt-1 accent-blue-900"
                />
                <span className="text-[#101828] dark:text-slate-200">{q}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-0 pb-20">
      {/* 1. HERO */}
      <section className="pt-10 sm:pt-14 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-semibold">
            <span>{framework.category} Framework</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span>{framework.caoPhase} Stage</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-[#475467] dark:text-slate-400 normal-case">{framework.relatedChapter}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] dark:text-white leading-tight">
            {framework.title}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
            {framework.subtitle}
          </p>

          <div className="pt-2 text-xs text-[#475467] dark:text-slate-400">
            By <strong className="text-[#101828] dark:text-white">{SITE_CONFIG.author.name}</strong> · Author of <em>{SITE_CONFIG.book.title}</em>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT BREAKDOWN */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xs space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold">
            Formal Architectural Definition
          </h2>
          <p className="font-serif text-lg sm:text-xl text-[#101828] dark:text-white leading-relaxed">
            {framework.definition}
          </p>
        </div>

        {/* Bespoke Interactive Tool / Visual Module if Flagship */}
        {renderInteractiveVisualModule()}

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
            Why This Framework Matters in the AI Era
          </h2>
          <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 leading-relaxed">
            {framework.whyItMatters}
          </p>
        </div>

        <div className="bg-[#FAF9F5] dark:bg-[#11192E] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-900 dark:text-purple-300 font-bold">
            <Layers className="w-4 h-4" />
            <span>Conceptual Topology & System Diagram</span>
          </div>
          <p className="text-sm sm:text-base text-[#101828] dark:text-slate-200 leading-relaxed font-sans">
            {framework.diagramDescription}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
            Real-World Production Application
          </h2>
          <div className="p-5 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl text-sm sm:text-base text-[#344054] dark:text-slate-300 leading-relaxed shadow-2xs">
            {framework.realWorldApplication}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Try It Yourself (Engineering Exercise)</span>
          </h2>
          <div className="p-6 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 rounded-xl text-sm sm:text-base text-[#101828] dark:text-slate-100 font-medium leading-relaxed">
            {framework.tryItYourself}
          </div>
        </div>

        <CiteThisFramework
          frameworkName={framework.title}
          frameworkUrl={`${CANONICAL_ORIGIN}/frameworks/${framework.id}`}
        />

        {/* Related Frameworks Links */}
        <div className="pt-8 border-t border-[#101828]/[0.08] dark:border-white/10">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#475467] dark:text-slate-400 mb-4 block">
            Explore Companion Frameworks
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedFrameworks.map((rf) => (
              <button
                type="button"
                key={rf.id}
                onClick={() => {
                  onSelectFramework(rf.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left p-4 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl hover:border-blue-900 dark:hover:border-blue-400 transition-all cursor-pointer shadow-xs group"
              >
                <span className="text-[10px] font-mono uppercase text-blue-900 dark:text-blue-400 font-semibold block mb-1">
                  {rf.caoPhase}
                </span>
                <h4 className="font-serif text-base font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                  {rf.title}
                </h4>
                <p className="text-xs text-[#475467] dark:text-slate-400 line-clamp-2 mt-1">
                  {rf.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#FAF9F5] dark:bg-[#11192E] p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
            Master the Complete Operating System
          </h3>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            <em>{SITE_CONFIG.book.title}</em> by {SITE_CONFIG.author.name} details all 12 signature frameworks across 11 structured chapters.
          </p>
          <button
            type="button"
            onClick={() => {
              trackEvent('book_purchase_click', { source: `framework_${framework.id}` });
              onOpenBuyModal();
            }}
            className="px-5 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Get {SITE_CONFIG.book.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
