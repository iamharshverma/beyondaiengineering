import React, { useEffect, useState, useRef } from 'react';
import { PageId } from '../types';
import {
  SCALE_ASSESSMENT_QUESTIONS,
  LIKERT_SCALE_OPTIONS,
  ScaleScore,
  ScaleAssessmentResult,
  calculateScaleAssessmentResult,
  buildAssessmentReportMarkdown,
} from '../data/assessmentData';
import { trackEvent } from '../utils/analytics';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Compass,
  Copy,
  Download,
  Info,
  Printer,
  RotateCcw,
  Trash2,
  Wrench,
} from 'lucide-react';

interface AssessmentViewProps {
  onNavigate: (pageOrPath: PageId | string, param?: string) => void;
  onOpenBuyModal: () => void;
}

const DRAFT_STORAGE_KEY = 'beyond_ai_assessment_v2_draft';
const RESULT_STORAGE_KEY = 'beyond_ai_assessment_v2_completed_answers';

const DIMENSION_META = {
  creator: {
    label: '01 · Creator (Build & Verify)',
    short: 'Creator',
    colorClass: 'bg-blue-700 dark:bg-blue-400',
    textClass: 'text-blue-900 dark:text-blue-300',
    borderClass: 'border-blue-900/20 dark:border-blue-400/25',
  },
  architect: {
    label: '02 · Architect (Design & Boundaries)',
    short: 'Architect',
    colorClass: 'bg-indigo-700 dark:bg-indigo-400',
    textClass: 'text-indigo-900 dark:text-indigo-300',
    borderClass: 'border-indigo-900/20 dark:border-indigo-400/25',
  },
  orchestrator: {
    label: '03 · Orchestrator (Coordinate & Govern)',
    short: 'Orchestrator',
    colorClass: 'bg-emerald-700 dark:bg-emerald-400',
    textClass: 'text-emerald-900 dark:text-emerald-300',
    borderClass: 'border-emerald-900/20 dark:border-emerald-400/25',
  },
} as const;

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  onNavigate,
  onOpenBuyModal,
}) => {
  const [answers, setAnswers] = useState<Record<number, ScaleScore>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Record<number, ScaleScore>) : {};
    } catch {
      return {};
    }
  });

  const [completedResult, setCompletedResult] = useState<ScaleAssessmentResult | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const savedCompleted = localStorage.getItem(RESULT_STORAGE_KEY);
      if (savedCompleted) {
        const parsed = JSON.parse(savedCompleted) as Record<number, ScaleScore>;
        if (Object.keys(parsed).length === SCALE_ASSESSMENT_QUESTIONS.length) {
          return calculateScaleAssessmentResult(parsed);
        }
      }
    } catch {}
    return null;
  });

  const [activeGroupIdx, setActiveGroupIdx] = useState<number>(0); // 3 groups of 5 questions each
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const hasFiredStarted = useRef(false);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    updatePageSeo({
      title: 'C.A.O. Self-Assessment (15-Item Diagnostic) | Beyond AI Engineering',
      description:
        'Benchmark your engineering habits across Creator, Architect, and Orchestrator dimensions in 3 minutes. Instant 0-100 profile, 7/30/90-day plan, and Markdown/PDF export without registration.',
      canonicalPath: '/assessment',
      ogType: 'website',
      ogImage: PAGE_OG_IMAGES.caoFramework,
      schemaType: 'WebPage',
      breadcrumbs: [
        { name: 'C.A.O. Framework', path: '/cao-framework' },
        { name: 'C.A.O. Self-Assessment', path: '/assessment' },
      ],
    });
  }, []);

  // Persist draft answers locally
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(answers));
    } catch {}
  }, [answers]);

  const answeredCount = SCALE_ASSESSMENT_QUESTIONS.filter(
    (q) => answers[q.id] !== undefined
  ).length;
  const totalCount = SCALE_ASSESSMENT_QUESTIONS.length;
  const progressPct = Math.round((answeredCount / totalCount) * 100);

  const groups: Array<{
    key: 'creator' | 'architect' | 'orchestrator';
    title: string;
    subtitle: string;
    startIdx: number;
    endIdx: number;
  }> = [
    {
      key: 'creator',
      title: 'Part 1 of 3 · Creator Mode (Execution & Verification)',
      subtitle: 'Rate how consistently each behavior shows up in your weekly building and debugging.',
      startIdx: 0,
      endIdx: 5,
    },
    {
      key: 'architect',
      title: 'Part 2 of 3 · Architect Mode (Boundaries & Trade-offs)',
      subtitle: 'Rate how consistently you frame problems, invariants, cost budgets, and evaluation harnesses.',
      startIdx: 5,
      endIdx: 10,
    },
    {
      key: 'orchestrator',
      title: 'Part 3 of 3 · Orchestrator Mode (Governance & Trust)',
      subtitle: 'Rate your ownership of agent permissions, ethical curation, and cross-functional trust.',
      startIdx: 10,
      endIdx: 15,
    },
  ];

  const currentGroup = groups[activeGroupIdx];
  const visibleQuestions = SCALE_ASSESSMENT_QUESTIONS.slice(
    currentGroup.startIdx,
    currentGroup.endIdx
  );

  const handleSelectRating = (questionId: number, value: ScaleScore) => {
    if (!hasFiredStarted.current && Object.keys(answers).length === 0) {
      hasFiredStarted.current = true;
      trackEvent('assessment_started', { scaleType: '5_point_likert', questionCount: 15 });
    }
    setValidationError(null);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleClearDraft = () => {
    setAnswers({});
    setValidationError(null);
    setActiveGroupIdx(0);
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {}
  };

  const handleSubmitAssessment = () => {
    const firstMissing = SCALE_ASSESSMENT_QUESTIONS.find((q) => !answers[q.id]);
    if (firstMissing) {
      const targetGroup = Math.floor((firstMissing.id - 1) / 5);
      setActiveGroupIdx(targetGroup);
      setValidationError(
        `Please rate Statement ${firstMissing.id} before generating your report (${totalCount - answeredCount} remaining).`
      );
      setTimeout(() => {
        questionRefs.current[firstMissing.id]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 60);
      return;
    }

    const result = calculateScaleAssessmentResult(answers);
    try {
      localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(answers));
    } catch {}

    setCompletedResult(result);
    trackEvent('assessment_completed', {
      archetype: result.archetypeTitle,
      creatorScore: result.scores.creator,
      architectScore: result.scores.architect,
      orchestratorScore: result.scores.orchestrator,
      strongestDimension: result.strongestDimension,
    });
    trackEvent('assessment_report_viewed', {
      archetype: result.archetypeTitle,
      strongestDimension: result.strongestDimension,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    const prevArchetype = completedResult?.archetypeTitle || 'unknown';
    setCompletedResult(null);
    setAnswers({});
    setActiveGroupIdx(0);
    setValidationError(null);
    hasFiredStarted.current = false;
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      localStorage.removeItem(RESULT_STORAGE_KEY);
    } catch {}
    trackEvent('assessment_restarted', { previousArchetype: prevArchetype });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyMarkdown = () => {
    if (!completedResult) return;
    const md = buildAssessmentReportMarkdown(completedResult);
    navigator.clipboard?.writeText(md);
    setCopiedMarkdown(true);
    trackEvent('assessment_report_exported', {
      format: 'copy',
      archetype: completedResult.archetypeTitle,
    });
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    if (!completedResult) return;
    const md = buildAssessmentReportMarkdown(completedResult);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CAO-Assessment-Report-${completedResult.strongestDimension}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    trackEvent('assessment_report_exported', {
      format: 'markdown',
      archetype: completedResult.archetypeTitle,
    });
    trackEvent('resource_download', { resource: 'cao_assessment_markdown', format: 'md' });
  };

  const handlePrintPdf = () => {
    if (!completedResult) return;
    trackEvent('assessment_report_exported', {
      format: 'print',
      archetype: completedResult.archetypeTitle,
    });
    window.print();
  };

  // RENDER REPORT VIEW
  if (completedResult) {
    return (
      <div className="pb-24">
        <div id="cao-print-report" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10">
          {/* Header & Action Bar */}
          <header className="space-y-4 pb-8 border-b border-[#101828]/10 dark:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
              <span>C.A.O. Self-Assessment Report · Computed locally in browser</span>
              <span className="tabular-nums">15 Statements · 1–5 Scale</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] dark:text-white text-balance leading-[1.12]">
              {completedResult.archetypeTitle}
            </h1>

            <p className="text-base sm:text-lg text-blue-950 dark:text-blue-200 font-serif italic">
              {completedResult.headline}
            </p>

            <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 leading-relaxed max-w-3xl">
              {completedResult.narrative}
            </p>

            {/* Export Controls */}
            <div className="pt-3 flex flex-wrap items-center gap-2.5 no-print">
              <button
                type="button"
                onClick={handlePrintPdf}
                className="px-4 py-2 rounded-md bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Print / Save PDF</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="px-4 py-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0D1527] text-xs font-semibold text-[#101828] dark:text-white hover:border-blue-900 dark:hover:border-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Download Markdown (.md)</span>
              </button>
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="px-4 py-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0D1527] text-xs font-semibold text-[#101828] dark:text-white hover:border-blue-900 dark:hover:border-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copiedMarkdown ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />
                    <span>Copied Markdown</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy Report</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleRetake}
                className="px-3.5 py-2 rounded-md text-xs font-medium text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white inline-flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </header>

          {/* 3 Independent 0-100 Score Cards + Relative Balance Bar */}
          <section aria-labelledby="scores-heading" className="space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="scores-heading" className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                Dimension Profile (0–100 Independent Scores)
              </h2>
              <span className="text-xs font-mono text-[#475467] dark:text-slate-400">
                Strongest: {completedResult.strongestDimension.toUpperCase()} · Priority Growth:{' '}
                {completedResult.growthDimension.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['creator', 'architect', 'orchestrator'] as const).map((dim) => {
                const meta = DIMENSION_META[dim];
                const score = completedResult.scores[dim];
                const mean = completedResult.averages[dim];
                const share = completedResult.relativeBalance[dim];
                return (
                  <div
                    key={dim}
                    className={`p-5 rounded-xl border ${meta.borderClass} bg-white dark:bg-[#0D1527] space-y-3`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-mono font-semibold ${meta.textClass}`}>
                        {meta.label}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-serif text-4xl font-bold tabular-nums text-[#101828] dark:text-white">
                        {score}
                        <span className="text-base font-normal text-[#475467] dark:text-slate-400">
                          /100
                        </span>
                      </span>
                      <span className="text-xs font-mono tabular-nums text-[#475467] dark:text-slate-400">
                        Mean {mean} · {share}% share
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#101828]/10 dark:bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${meta.colorClass}`}
                        style={{ width: `${Math.max(4, score)}%` }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/frameworks/${dim}`)}
                      className="text-xs font-semibold text-blue-900 dark:text-blue-300 hover:underline inline-flex items-center gap-1 cursor-pointer no-print"
                    >
                      <span>Read {meta.short} deep dive</span>
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Normalized Relative Balance Strip */}
            <div className="p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#11192E] space-y-2.5">
              <div className="flex flex-wrap justify-between items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-300">
                <span>Normalized Triad Operating Balance (Relative Allocation)</span>
                <span className="tabular-nums font-semibold text-[#101828] dark:text-white">
                  Creator {completedResult.relativeBalance.creator}% · Architect{' '}
                  {completedResult.relativeBalance.architect}% · Orchestrator{' '}
                  {completedResult.relativeBalance.orchestrator}%
                </span>
              </div>
              <div className="h-3 w-full rounded-md overflow-hidden flex bg-[#101828]/10 dark:bg-white/10">
                <div
                  style={{ width: `${completedResult.relativeBalance.creator}%` }}
                  className="bg-blue-700 dark:bg-blue-400"
                  title={`Creator: ${completedResult.relativeBalance.creator}%`}
                />
                <div
                  style={{ width: `${completedResult.relativeBalance.architect}%` }}
                  className="bg-indigo-700 dark:bg-indigo-400"
                  title={`Architect: ${completedResult.relativeBalance.architect}%`}
                />
                <div
                  style={{ width: `${completedResult.relativeBalance.orchestrator}%` }}
                  className="bg-emerald-700 dark:bg-emerald-400"
                  title={`Orchestrator: ${completedResult.relativeBalance.orchestrator}%`}
                />
              </div>
            </div>
          </section>

          {/* Strengths & Development Gaps */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Observable Strengths</span>
              </div>
              <ul className="space-y-2.5 text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                {completedResult.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-800 dark:text-amber-300">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Primary Development Gaps</span>
              </div>
              <ul className="space-y-2.5 text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                {completedResult.developmentGaps.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 7 / 30 / 90-Day Roadmap */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 dark:text-blue-300">
              <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Recommended 7 / 30 / 90-Day Transition Roadmap</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Next 7 Days · Immediate Wins', items: completedResult.plan7Day },
                { label: 'Next 30 Days · Habits & ADRs', items: completedResult.plan30Day },
                { label: 'Next 90 Days · Durable Leverage', items: completedResult.plan90Day },
              ].map((horizon) => (
                <div
                  key={horizon.label}
                  className="p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#11192E] space-y-3"
                >
                  <h3 className="font-serif text-lg font-bold text-[#101828] dark:text-white">
                    {horizon.label}
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                    {horizon.items.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono text-xs text-blue-900 dark:text-blue-400 font-semibold mt-0.5">
                          0{i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Resources & Chapters */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 no-print">
            <div className="p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 dark:text-blue-300">
                <Wrench className="w-4 h-4" aria-hidden="true" />
                <span>Recommended Companion Workspaces</span>
              </div>
              <div className="space-y-3 divide-y divide-[#101828]/10 dark:divide-white/10">
                {completedResult.recommendedResources.map((res, idx) => (
                  <div key={res.slug} className={idx > 0 ? 'pt-3' : ''}>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/resources/${res.slug}`)}
                      className="text-left group cursor-pointer w-full"
                    >
                      <span className="font-serif font-bold text-base text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 inline-flex items-center gap-1.5">
                        <span>{res.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <p className="text-xs text-[#475467] dark:text-slate-300 mt-1">{res.reason}</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#101828] dark:text-white">
                <BookOpen className="w-4 h-4 text-blue-900 dark:text-blue-400" aria-hidden="true" />
                <span>Matched Book Chapters</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#475467] dark:text-slate-300">
                {completedResult.recommendedChapters.map((ch) => (
                  <li key={ch.chapter}>
                    <strong className="font-mono text-[#101828] dark:text-white">
                      Chapter {ch.chapter}: {ch.title}
                    </strong>
                    <p className="text-xs mt-0.5">{ch.reason}</p>
                  </li>
                ))}
              </ul>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/book/sample')}
                  className="text-xs font-semibold text-blue-900 dark:text-blue-300 hover:underline cursor-pointer"
                >
                  Read sample chapters →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('book_cta_click', { location: 'assessment_report' });
                    onOpenBuyModal();
                  }}
                  className="text-xs font-semibold text-[#101828] dark:text-white hover:underline cursor-pointer"
                >
                  Get the Book →
                </button>
              </div>
            </div>
          </section>

          <footer className="pt-4 border-t border-[#101828]/10 dark:border-white/10 text-xs text-[#475467] dark:text-slate-400">
            Educational disclaimer: This C.A.O. self-assessment is a structured reflection exercise designed to guide technical skill development and is not a clinical, HR, or validated psychometric instrument. All responses stay inside your browser&apos;s local storage.
          </footer>
        </div>
      </div>
    );
  }

  // RENDER QUESTIONNAIRE VIEW
  return (
    <div className="pb-24">
      <section className="pt-10 sm:pt-14 pb-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/10 dark:border-white/10">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
            <span className="font-semibold text-blue-900 dark:text-blue-300 inline-flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" aria-hidden="true" />
              <span>C.A.O. Operating Profile Assessment</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">15 Statements · ~3 Minutes</span>
            <span aria-hidden="true">·</span>
            <span>No email or sign-up required</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] dark:text-white text-balance leading-[1.12]">
            Where Do Your Engineering Habits Spend Leverage Today?
          </h1>

          <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 leading-relaxed max-w-3xl">
            Rate all 15 behavioral statements on a 1–5 scale across <strong>Creator</strong>,{' '}
            <strong>Architect</strong>, and <strong>Orchestrator</strong> modes to compute independent 0–100 dimension scores and a tailored 7/30/90-day transition plan.
          </p>

          {/* Upfront Disclaimer & Privacy Assurance */}
          <div className="p-4 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] flex items-start gap-3 text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
            <Info className="w-4 h-4 text-blue-900 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="text-[#101828] dark:text-white">
                Structured Self-Reflection · Local Browser Storage Only:
              </strong>{' '}
              This tool is an educational reflection diagnostic—not a psychometric or evaluative test. Your ratings stay stored locally in your browser so you never lose draft progress, and individual answers are never sent to analytics or servers.
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Progress & Section Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="font-semibold text-[#101828] dark:text-white tabular-nums">
              {answeredCount} of {totalCount} statements rated ({progressPct}%)
            </span>
            {answeredCount > 0 && (
              <button
                type="button"
                onClick={handleClearDraft}
                className="inline-flex items-center gap-1 text-[#475467] dark:text-slate-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Clear Draft</span>
              </button>
            )}
          </div>

          <div
            className="w-full h-2 rounded-full bg-[#101828]/10 dark:bg-white/10 overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Assessment completion progress"
          >
            <div
              className="h-full bg-blue-900 dark:bg-blue-400 transition-all duration-200"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* 3 Part Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {groups.map((grp, idx) => {
              const groupQs = SCALE_ASSESSMENT_QUESTIONS.slice(grp.startIdx, grp.endIdx);
              const doneInGroup = groupQs.filter((q) => answers[q.id] !== undefined).length;
              const isActive = activeGroupIdx === idx;
              return (
                <button
                  key={grp.key}
                  type="button"
                  onClick={() => setActiveGroupIdx(idx)}
                  className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'border-blue-900 dark:border-blue-400 bg-white dark:bg-[#0D1527]'
                      : 'border-[#101828]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#11192E] hover:border-[#101828]/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={isActive ? 'font-bold text-blue-900 dark:text-blue-300' : 'text-[#475467] dark:text-slate-400'}>
                      {DIMENSION_META[grp.key].short} (5 items)
                    </span>
                    <span className="tabular-nums text-[#475467] dark:text-slate-400">
                      {doneInGroup}/5
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Group Header */}
        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
            {currentGroup.title}
          </h2>
          <p className="text-sm text-[#475467] dark:text-slate-300">
            {currentGroup.subtitle}
          </p>
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div
            role="alert"
            className="p-4 rounded-xl border border-amber-700/30 bg-amber-50 dark:bg-amber-950/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-5">
          {visibleQuestions.map((q) => {
            const currentRating = answers[q.id];
            return (
              <div
                key={q.id}
                ref={(el) => {
                  questionRefs.current[q.id] = el;
                }}
                className="p-5 sm:p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
                  <span className="tabular-nums font-semibold text-blue-900 dark:text-blue-300">
                    Statement {q.id < 10 ? `0${q.id}` : q.id} of {totalCount}
                  </span>
                  <span>{q.contextHint}</span>
                </div>

                <p className="font-serif text-lg sm:text-xl font-semibold text-[#101828] dark:text-white leading-snug">
                  {q.statement}
                </p>

                <div
                  role="radiogroup"
                  aria-label={`Rating for Statement ${q.id}`}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-2"
                >
                  {LIKERT_SCALE_OPTIONS.map((opt) => {
                    const selected = currentRating === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => handleSelectRating(q.id, opt.value)}
                        className={`p-3 rounded-lg border text-left transition-colors cursor-pointer min-h-[44px] flex flex-col justify-between gap-1 ${
                          selected
                            ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] border-[#101828] dark:border-white font-semibold'
                            : 'bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-slate-200 border-[#101828]/15 dark:border-white/15 hover:border-blue-900 dark:hover:border-blue-400'
                        }`}
                      >
                        <span className="font-mono text-xs font-bold tabular-nums">
                          {opt.shortLabel}
                        </span>
                        <span
                          className={`text-[11px] leading-snug ${
                            selected
                              ? 'text-white/85 dark:text-[#070B14]/80'
                              : 'text-[#475467] dark:text-slate-400'
                          }`}
                        >
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation / Submit Bar */}
        <div className="pt-4 border-t border-[#101828]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            disabled={activeGroupIdx === 0}
            onClick={() => {
              setActiveGroupIdx((idx) => Math.max(0, idx - 1));
              window.scrollTo({ top: 180, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-lg border border-[#101828]/15 dark:border-white/15 bg-white dark:bg-[#0D1527] text-xs font-semibold text-[#101828] dark:text-white disabled:opacity-40 inline-flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Previous Section</span>
          </button>

          {activeGroupIdx < groups.length - 1 ? (
            <button
              type="button"
              onClick={() => {
                setActiveGroupIdx((idx) => Math.min(groups.length - 1, idx + 1));
                window.scrollTo({ top: 180, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-lg bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next: {groups[activeGroupIdx + 1].title.split('·')[1]}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitAssessment}
              className="px-6 py-3 rounded-lg bg-blue-900 dark:bg-blue-500 text-white dark:text-[#070B14] text-xs sm:text-sm font-semibold hover:bg-blue-950 dark:hover:bg-blue-400 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>Generate C.A.O. Profile Report ({answeredCount}/{totalCount})</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
