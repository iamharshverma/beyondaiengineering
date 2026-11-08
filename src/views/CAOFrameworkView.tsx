import React, { useEffect } from 'react';
import { PageId } from '../types';
import { updatePageSeo, CANONICAL_ORIGIN } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { CAOInteractiveFramework } from '../components/CAOInteractiveFramework';
import { CAOBenchmark } from '../components/CAOBenchmark';
import { CiteThisFramework } from '../components/CiteThisFramework';
import { ArrowRight, BookOpen, Layers, CheckCircle2, Shield, Compass, Sparkles, ChevronRight, Activity } from 'lucide-react';

interface CAOFrameworkViewProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
  onOpenBuyModal: () => void;
}

export const CAOFrameworkView: React.FC<CAOFrameworkViewProps> = ({
  onNavigate,
  onOpenAssessment,
  onOpenBuyModal,
}) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Creator Architect Orchestrator Framework | Beyond AI Engineering',
      description:
        'The C.A.O. Framework by Harsh Verma defines the three evolutionary stages of the engineer in the age of AI agents: from Creator (Build) to Architect (Design) to Orchestrator (Lead).',
      canonicalPath: '/cao-framework',
      ogType: 'website',
      breadcrumbs: [{ name: 'C.A.O. Framework', path: '/cao-framework' }],
    });
  }, []);

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
          <span className="text-blue-900 dark:text-blue-400 font-semibold">C.A.O. Framework</span>
        </nav>
      </div>

      {/* 2. HERO */}
      <section className="pt-10 sm:pt-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-900 dark:text-blue-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Foundational Career Architecture</span>
          </div>

          <h1 className="font-serif text-fluid-hero font-bold tracking-tight text-[#101828] dark:text-white text-balance">
            The Creator · Architect · Orchestrator Framework
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
            The operating system for engineers navigating the age of autonomous AI agents.
          </p>

          <p className="text-sm sm:text-base text-[#475467] dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Developed by <strong>Harsh Verma</strong> in <em>Beyond AI Engineering</em>, the C.A.O. model maps the cognitive shift of engineering value from writing implementation syntax to designing system boundaries and orchestrating autonomous actors.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => {
                trackEvent('cao_assessment_start', { source: 'cao_framework_hero' });
                onOpenAssessment();
              }}
              className="px-5 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-blue-400 dark:text-blue-600" />
              <span>Take the C.A.O. Diagnostic Assessment</span>
            </button>
            <button
              onClick={() => {
                trackEvent('get_book_click', { source: 'cao_framework_hero' });
                onOpenBuyModal();
              }}
              className="px-5 py-2.5 bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/15 text-[#101828] dark:text-slate-200 text-xs font-semibold rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-900 dark:text-blue-400" />
              <span>Read Chapters 3 & 11 in the Book</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE 3-TIER STAGE BREAKDOWN */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
            Core Evolutionary Tiers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
            Three Stages of Engineering Evolution
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-400 mt-2">
            Engineers do not abandon previous tiers; rather, each tier becomes an integrated foundation for the next level of organizational leverage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TIER 1: CREATOR */}
          <div className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded">
                  STAGE 01 · BUILD
                </span>
                <span className="text-[11px] font-mono text-[#98A2B3]">Execution Tier</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-2">
                The Creator
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed mb-4">
                Mastery of implementation mechanics, programming language syntax, and localized problem solving. The Creator turns conceptual specifications into functional running code.
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-[#FAFAF7] dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.06] dark:border-white/10">
                  <strong className="block text-[10px] font-mono uppercase text-[#475467] dark:text-slate-400 mb-0.5">Primary Focus</strong>
                  <span className="text-[#101828] dark:text-slate-200">Writing clean code, debugging logic, building features, writing tests.</span>
                </div>
                <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg border border-blue-100/50 dark:border-blue-900/30">
                  <strong className="block text-[10px] font-mono uppercase text-blue-900 dark:text-blue-300 mb-0.5">AI Exposure</strong>
                  <span className="text-[#101828] dark:text-slate-200">High commoditization risk. Frontier models generate syntax in seconds.</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#101828]/[0.08] dark:border-white/10 text-xs text-[#475467] dark:text-slate-400 font-mono">
              Key Question: "How do we build this feature?"
            </div>
          </div>

          {/* TIER 2: ARCHITECT */}
          <div className="bg-white dark:bg-[#0D1527] border-2 border-blue-600/40 dark:border-blue-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative">
            <span className="absolute -top-3 left-6 bg-blue-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded">
              High Leverage Pivot
            </span>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded">
                  STAGE 02 · DESIGN
                </span>
                <span className="text-[11px] font-mono text-[#98A2B3]">Systems Tier</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-2">
                The Architect
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed mb-4">
                Systems thinking, architectural trade-offs, and boundary definition. The Architect evaluates opportunity costs, latency budgets, failure modes, and security constraints.
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-[#FAFAF7] dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.06] dark:border-white/10">
                  <strong className="block text-[10px] font-mono uppercase text-[#475467] dark:text-slate-400 mb-0.5">Primary Focus</strong>
                  <span className="text-[#101828] dark:text-slate-200">Evaluating trade-offs, data schemas, invariant boundaries, fail-safes.</span>
                </div>
                <div className="p-3 bg-purple-50/50 dark:bg-purple-950/30 rounded-lg border border-purple-100/50 dark:border-purple-900/30">
                  <strong className="block text-[10px] font-mono uppercase text-purple-900 dark:text-purple-300 mb-0.5">AI Advantage</strong>
                  <span className="text-[#101828] dark:text-slate-200">Directs AI generators into resilient, inspectable system topologies.</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#101828]/[0.08] dark:border-white/10 text-xs text-blue-900 dark:text-blue-400 font-mono font-semibold">
              Key Question: "What system deserves to exist and what are its boundaries?"
            </div>
          </div>

          {/* TIER 3: ORCHESTRATOR */}
          <div className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded">
                  STAGE 03 · LEAD
                </span>
                <span className="text-[11px] font-mono text-[#98A2B3]">Governance Tier</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-2">
                The Orchestrator
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed mb-4">
                Multi-agent governance, institutional trust, and human-AI alignment. The Orchestrator coordinates autonomous AI agents and multidisciplinary human teams toward strategic outcomes.
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-[#FAFAF7] dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.06] dark:border-white/10">
                  <strong className="block text-[10px] font-mono uppercase text-[#475467] dark:text-slate-400 mb-0.5">Primary Focus</strong>
                  <span className="text-[#101828] dark:text-slate-200">Authority matrices, consensus protocols, ethical curation, enterprise trust.</span>
                </div>
                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100/50 dark:border-emerald-900/30">
                  <strong className="block text-[10px] font-mono uppercase text-emerald-900 dark:text-emerald-300 mb-0.5">Market Moat</strong>
                  <span className="text-[#101828] dark:text-slate-200">The supreme value layer in the Trust Economy. The human who guarantees outcomes.</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#101828]/[0.08] dark:border-white/10 text-xs text-[#475467] dark:text-slate-400 font-mono">
              Key Question: "Who and what guarantees this system will not fail catastrophically?"
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE ROLE BENCHMARK DIAGNOSTIC */}
      <section id="benchmark" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
            Live Role Benchmark
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white text-balance">
            Benchmark Your Engineering Operating Profile
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-400 mt-2 text-balance leading-relaxed">
            Answer 10 executive engineering scenarios to calculate your Creator, Architect, and Orchestrator balance, visualize your triad radar, and export a formatted executive career report.
          </p>
        </div>

        <div className="bg-[#FAF9F5] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-10 shadow-sm">
          <CAOBenchmark onOpenBuyModal={onOpenBuyModal} />
        </div>
      </section>

      {/* 5. OVERLAP & SYSTEMIC INTEGRATION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white text-center">
            How the Responsibilities Overlap
          </h2>
          <p className="text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
            A common misconception is that becoming an Orchestrator means abandoning the Creator's craft. In reality, the three tiers form a concentric sphere of mastery:
          </p>

          <div className="bg-[#FAF9F5] dark:bg-[#11192E] p-6 sm:p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-900 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-base text-[#101828] dark:text-white block">You cannot orchestrate what you cannot architect.</strong>
                <span className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed block mt-0.5">
                  An orchestrator who does not understand systems design will delegate critical tasks to agents with inadequate sandboxing, leading to privilege escalation or database corruption.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-900 dark:text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-base text-[#101828] dark:text-white block">You cannot architect what you have never created.</strong>
                <span className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed block mt-0.5">
                  An architect with zero implementation intuition will design brittle abstractions that break when exposed to real-world memory pressure, network partitions, and latency spikes.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-900 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-base text-[#101828] dark:text-white block">AI inverts the time allocation, not the necessity of judgment.</strong>
                <span className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed block mt-0.5">
                  Where you once spent 80% of your time typing syntax and 20% designing systems, the C.A.O. framework shifts your allocation to 10% directing code, 40% designing boundaries, and 50% governing outcomes.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE EXPLORER MODULE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
            Interactive Deep Dive
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white">
            Explore the C.A.O. Operating Console
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-400 mt-2">
            Click into each tier to review its daily engineering rituals, cognitive traps to avoid, and required artifacts.
          </p>
        </div>

        <CAOInteractiveFramework onOpenAssessment={onOpenAssessment} />

        {/* 6. CITE THIS FRAMEWORK */}
        <CiteThisFramework
          frameworkName="Creator–Architect–Orchestrator (C.A.O.) Framework"
          frameworkUrl={`${CANONICAL_ORIGIN}/cao-framework`}
        />
      </section>
    </div>
  );
};
