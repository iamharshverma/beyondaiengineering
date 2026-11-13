import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
import { ArrowRight, ChevronRight, Layers, ShieldCheck, Compass } from 'lucide-react';

interface EngineersViewProps {
  onNavigate: (page: PageId | string, param?: string) => void;
  onOpenAssessment: () => void;
  onOpenSample: () => void;
}

const ENGINEER_SHIFTS = [
  {
    id: 'syntax-to-judgment',
    legacy: 'Writing & refactoring every function manually',
    next: 'Defining system invariants, failure boundaries & review gates',
    why: 'As synthesis latency approaches zero, code volume is abundant—engineering accountability is what enterprises reward.',
  },
  {
    id: 'tickets-to-problems',
    legacy: 'Translating pre-written Jira specs ("How do I code this?")',
    next: 'Questioning problem premises & trade-offs ("What deserves to exist?")',
    why: 'High-speed implementation of the wrong architecture creates compounding technical and operational debt.',
  },
  {
    id: 'single-services-to-agents',
    legacy: 'Deploying deterministic scripts & isolated CRUD APIs',
    next: 'Orchestrating bounded multi-agent workflows with telemetry & replay',
    why: 'Probabilistic models require deterministic scaffolds, least-privilege tool boundaries, and runtime observability.',
  },
];

export const EngineersView: React.FC<EngineersViewProps> = ({
  onNavigate,
  onOpenAssessment,
  onOpenSample,
}) => {
  const [selectedShiftIdx, setSelectedShiftIdx] = useState(0);

  useEffect(() => {
    updatePageSeo({
      title: 'For Engineers | Build Your Next Chapter — Beyond AI Engineering',
      description:
        'A tactical pathway for mid-to-senior software engineers moving from code output to systems judgment, agent orchestration, and durable technical authority.',
      canonicalPath: '/engineers',
      ogType: 'website',
      ogImage: PAGE_OG_IMAGES.engineers,
      breadcrumbs: [{ name: 'For Engineers', path: '/engineers' }],
    });
  }, []);

  const recommendedFrameworks = [
    {
      id: 'how-to-what',
      title: 'How → What',
      subtitle: 'Problem Selection & Architectural Direction',
      summary: 'Move upstream from syntax translation into deciding what deserves to be built and why.',
    },
    {
      id: 'trust-economy',
      title: 'The Trust Economy',
      subtitle: 'Verified Judgment Under Code Abundance',
      summary: 'Why verified reliability and accountability command a premium when generated code is free.',
    },
    {
      id: 'human-api',
      title: 'The Human API',
      subtitle: 'Prompt Empathy + Agentic Diplomacy',
      summary: 'Serve as the authoritative control plane between stakeholder goals and multi-agent tool swarms.',
    },
  ];

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
          <span className="text-blue-900 dark:text-blue-400 font-semibold">For Engineers</span>
        </nav>
      </div>

      {/* 2. HERO */}
      <section className="pt-8 sm:pt-14 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
            Career Operating System · Mid-to-Senior & Staff Engineers
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] dark:text-white text-balance">
            Build Your Next Chapter as an AI-Era Engineer
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic max-w-2xl mx-auto leading-relaxed">
            High-output coding is no longer a career moat. Leverage now belongs to engineers who master systems design, judgment, and agent orchestration.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="px-5 py-3 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Run 12-Scenario C.A.O. Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onOpenSample}
              className="px-5 py-3 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-slate-200 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Read Free Chapter Sample
            </button>
            <button
              type="button"
              onClick={() => onNavigate('resources')}
              className="px-5 py-3 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-slate-200 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Open 15 Lab Resources
            </button>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE ALTITUDE SHIFT */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
            Interactive Career Audit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
            Where Engineering Leverage Is Moving
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-3">
            {ENGINEER_SHIFTS.map((shift, idx) => (
              <button
                key={shift.id}
                type="button"
                onClick={() => setSelectedShiftIdx(idx)}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedShiftIdx === idx
                    ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] border-transparent shadow-md'
                    : 'bg-white dark:bg-[#0D1527] text-[#101828] dark:text-white border-[#101828]/10 dark:border-white/10 hover:border-blue-900/40'
                }`}
              >
                <div className="text-[11px] font-mono uppercase tracking-wider opacity-70 mb-1 tabular-nums">
                  Shift 0{idx + 1}
                </div>
                <div className="font-serif font-bold text-lg">{shift.next}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-[#0D1527] p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-[#FAFAF7] dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.06] dark:border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 block mb-1">
                  Commoditized Pattern
                </span>
                <p className="text-sm text-[#475467] dark:text-slate-300">
                  {ENGINEER_SHIFTS[selectedShiftIdx].legacy}
                </p>
              </div>

              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/40 rounded-lg border border-blue-100/60 dark:border-blue-800/40">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 font-bold block mb-1">
                  High-Leverage Curator Pattern
                </span>
                <p className="text-sm font-medium text-[#101828] dark:text-white">
                  {ENGINEER_SHIFTS[selectedShiftIdx].next}
                </p>
              </div>

              <p className="text-sm text-[#475467] dark:text-slate-300 leading-relaxed pt-2">
                {ENGINEER_SHIFTS[selectedShiftIdx].why}
              </p>
            </div>

            <div className="pt-4 border-t border-[#101828]/[0.08] dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onNavigate('cao-framework')}
                className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Explore the Full C.A.O. Framework</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('insights')}
                className="text-xs font-semibold text-[#101828] dark:text-slate-200 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read Engineering Insights</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECOMMENDED SIGNATURE FRAMEWORKS */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
              Recommended Playbooks
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white">
              Three Frameworks to Apply This Quarter
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('frameworks')}
            className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View all 12 frameworks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedFrameworks.map((fw) => (
            <button
              key={fw.id}
              type="button"
              onClick={() => onNavigate('framework-detail', fw.id)}
              className="bg-white dark:bg-[#0D1527] p-6 rounded-2xl border border-[#101828]/10 dark:border-white/10 hover:border-blue-900 dark:hover:border-blue-400/60 hover:-translate-y-1 transition-all duration-300 shadow-2xs text-left flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Signature Framework</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors mb-1">
                  {fw.title}
                </h3>
                <div className="text-xs font-medium text-[#475467] dark:text-slate-400 mb-3">
                  {fw.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                  {fw.summary}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#101828]/[0.06] dark:border-white/10 text-xs font-semibold text-blue-900 dark:text-blue-400 inline-flex items-center gap-1">
                <span>Inspect Deep Dive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Cross-Links */}
        <div className="mt-12 p-8 bg-[#FAF9F5] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-900 dark:text-blue-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Evidence Over Buzzwords</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
              Ready to Audit Your Operating Profile?
            </h3>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300">
              Complete the 12-scenario C.A.O. diagnostic or read deep systems essays in Insights.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="px-5 py-2.5 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 transition-colors cursor-pointer whitespace-nowrap"
            >
              Start Assessment
            </button>
            <button
              type="button"
              onClick={() => onNavigate('book')}
              className="px-5 py-2.5 text-xs font-semibold bg-white dark:bg-[#11192E] border border-[#101828]/20 dark:border-white/15 text-[#101828] dark:text-slate-200 rounded-md hover:bg-black/5 transition-colors cursor-pointer whitespace-nowrap"
            >
              Explore the Book
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
