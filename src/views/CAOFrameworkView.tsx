import React, { useEffect, useState } from 'react';
import { PageId } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { updatePageSeo, CANONICAL_ORIGIN } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { CAOInteractiveFramework } from '../components/CAOInteractiveFramework';
import { CAOBenchmark } from '../components/CAOBenchmark';
import { CiteThisFramework } from '../components/CiteThisFramework';
import {
  ArrowRight,
  BookOpen,
  Layers,
  CheckCircle2,
  ChevronRight,
  Activity,
  Download,
  AlertTriangle,
  Play,
  Pause,
} from 'lucide-react';

interface CAOFrameworkViewProps {
  onNavigate: (page: PageId | string) => void;
  onOpenAssessment: () => void;
  onOpenBuyModal: () => void;
}

const STAGE_DETAILS = {
  creator: {
    label: 'STAGE 01 · BUILD',
    title: 'The Creator',
    question: '"How do we implement this cleanly?"',
    focus: 'Implementation mechanics, prototyping, clean functions, unit tests, and localized debugging.',
    leverageShift: 'Coding agents accelerate syntax generation; enduring value comes from mastering core primitives and rapid verification.',
    artifacts: 'Working prototypes, automated unit tests, local benchmarks, reproducible PRs.',
    commonMistake: 'Confusing lines of generated code or ticket throughput with durable engineering judgment.',
    chapters: 'Chapters 1, 3 & 11',
  },
  architect: {
    label: 'STAGE 02 · DESIGN',
    title: 'The Architect',
    question: '"What system deserves to exist, and where are the failure boundaries?"',
    focus: 'System boundaries, data invariants, latency budgets, eval harnesses, and build-vs-buy trade-offs.',
    leverageShift: 'Directs coding agents within deterministic specifications and explicit architectural constraints.',
    artifacts: 'Architecture Decision Records (ADRs), threat models, golden evaluation datasets.',
    commonMistake: 'Over-abstraction before measuring failure modes or delegating schema invariants to unconstrained prompts.',
    chapters: 'Chapters 2, 4, 5 & 7',
  },
  orchestrator: {
    label: 'STAGE 03 · LEAD',
    title: 'The Orchestrator',
    question: '"Who owns trust, risk accountability, and multi-agent coordination?"',
    focus: 'Agentic Diplomacy, Human API contracts, cross-functional governance, and strategic technical authority.',
    leverageShift: 'Operates at the center of the Trust Economy—guaranteeing reliability across humans and autonomous actors.',
    artifacts: 'Human API policies, ethical curation audits, post-mortem War Stories, organizational standards.',
    commonMistake: 'Treating orchestration as hands-off delegation while losing touch with real production failure signals.',
    chapters: 'Chapters 5, 6, 8, 9 & 10',
  },
};

export const CAOFrameworkView: React.FC<CAOFrameworkViewProps> = ({
  onNavigate,
  onOpenAssessment,
  onOpenBuyModal,
}) => {
  const [activeConsoleStage, setActiveConsoleStage] = useState<'creator' | 'architect' | 'orchestrator'>('architect');
  const [downloadedGuide, setDownloadedGuide] = useState(false);
  const [isTriadAutoPlaying, setIsTriadAutoPlaying] = useState(true);
  const [isTriadHovered, setIsTriadHovered] = useState(false);

  const handleSelectTier = (stage: 'creator' | 'architect' | 'orchestrator') => {
    setActiveConsoleStage(stage);
    setIsTriadAutoPlaying(false);
  };

  useEffect(() => {
    if (!isTriadAutoPlaying || isTriadHovered) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const order: Array<'creator' | 'architect' | 'orchestrator'> = ['creator', 'architect', 'orchestrator'];
    const id = window.setInterval(() => {
      setActiveConsoleStage((prev) => order[(order.indexOf(prev) + 1) % order.length]);
    }, 4500);
    return () => window.clearInterval(id);
  }, [isTriadAutoPlaying, isTriadHovered]);

  useEffect(() => {
    updatePageSeo({
      title: `Creator Architect Orchestrator (C.A.O.) Framework | ${SITE_CONFIG.book.title}`,
      description:
        'The C.A.O. Framework by Harsh Verma maps the three evolutionary stages of engineering in the AI era: Creator (Build), Architect (Design), and Orchestrator (Govern).',
      canonicalPath: '/cao-framework',
      ogType: 'website',
      breadcrumbs: [{ name: 'C.A.O. Framework', path: '/cao-framework' }],
    });
  }, []);

  const handleDownloadGuide = () => {
    trackEvent('resource_download', { resource: 'cao_framework_reference_guide' });
    const text = `${SITE_CONFIG.book.fullTitle.toUpperCase()}
THE CREATOR – ARCHITECT – ORCHESTRATOR (C.A.O.) FRAMEWORK REFERENCE GUIDE
By ${SITE_CONFIG.author.name} (${SITE_CONFIG.canonicalOrigin}/cao-framework)

1. STAGE 01 — CREATOR (Build)
   - Key Question: ${STAGE_DETAILS.creator.question}
   - Primary Focus: ${STAGE_DETAILS.creator.focus}
   - Artifacts: ${STAGE_DETAILS.creator.artifacts}

2. STAGE 02 — ARCHITECT (Design)
   - Key Question: ${STAGE_DETAILS.architect.question}
   - Primary Focus: ${STAGE_DETAILS.architect.focus}
   - Artifacts: ${STAGE_DETAILS.architect.artifacts}

3. STAGE 03 — ORCHESTRATOR (Lead & Govern)
   - Key Question: ${STAGE_DETAILS.orchestrator.question}
   - Primary Focus: ${STAGE_DETAILS.orchestrator.focus}
   - Artifacts: ${STAGE_DETAILS.orchestrator.artifacts}

CORE INVARIANTS:
• You cannot orchestrate what you cannot architect.
• You cannot architect without understanding how code and models behave in creation.
• AI shifts time allocation toward problem framing, evaluation harnesses, and accountable governance.`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Beyond-AI-Engineering-CAO-Framework-Guide.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloadedGuide(true);
    setTimeout(() => setDownloadedGuide(false), 2500);
  };

  const selectedStageInfo = STAGE_DETAILS[activeConsoleStage];

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
          <span className="text-blue-900 dark:text-blue-400 font-semibold">C.A.O. Framework</span>
        </nav>
      </div>

      {/* 2. HERO */}
      <section className="pt-10 sm:pt-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-blue-900 dark:text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>Foundational Career Operating System</span>
          </div>

          <h1 className="font-serif text-fluid-hero font-bold tracking-tight text-[#101828] dark:text-white text-balance">
            The Creator · Architect · Orchestrator Framework
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
            How engineering leverage evolves from writing implementation syntax to designing system boundaries and governing autonomous intelligence.
          </p>

          <p className="text-sm sm:text-base text-[#475467] dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Developed by <strong>{SITE_CONFIG.author.name}</strong> in <em>{SITE_CONFIG.book.title}</em>, the C.A.O. triad gives engineers, students, and technical leaders a shared vocabulary for career progression in the agentic AI era.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
            <button
              type="button"
              onClick={() => {
                trackEvent('cao_assessment_start', { source: 'cao_framework_hero' });
                onOpenAssessment();
              }}
              className="px-5 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-blue-400 dark:text-blue-600" />
              <span>Take the 12-Scenario C.A.O. Benchmark</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadGuide}
              className="px-4 py-2.5 bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/15 text-[#101828] dark:text-slate-200 text-xs font-semibold rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
              <span>{downloadedGuide ? 'Reference Guide Downloaded' : 'Download C.A.O. Reference Guide (.txt)'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                trackEvent('book_purchase_click', { source: 'cao_framework_hero' });
                onOpenBuyModal();
              }}
              className="px-4 py-2.5 text-xs font-semibold text-blue-900 dark:text-blue-300 hover:underline inline-flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Get the Book</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SVG TRIAD DIAGRAM + STAGE EXPLORER */}
      <section
        className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10"
        onMouseEnter={() => setIsTriadHovered(true)}
        onMouseLeave={() => setIsTriadHovered(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Animated Triad Diagram */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 text-center shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#475467] dark:text-slate-400">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-900 dark:bg-blue-400" />
                </span>
                <span>Click Any Ring</span>
              </span>

              <button
                type="button"
                onClick={() => setIsTriadAutoPlaying((prev) => !prev)}
                aria-label={isTriadAutoPlaying ? 'Pause concentric triad cycle' : 'Play concentric triad cycle'}
                className="inline-flex items-center gap-1 px-2 py-1 rounded border border-[#101828]/10 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#11192E] text-[10px] font-mono uppercase text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer"
              >
                {isTriadAutoPlaying ? (
                  <>
                    <Pause className="w-2.5 h-2.5 text-blue-900 dark:text-blue-400" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-2.5 h-2.5 text-blue-900 dark:text-blue-400" />
                    <span>Cycle</span>
                  </>
                )}
              </button>
            </div>

            <svg
              viewBox="0 0 320 278"
              className="w-full max-w-[330px] mx-auto select-none"
              role="img"
              aria-label="Animated Interactive Creator Architect Orchestrator Triad"
            >
              <defs>
                <radialGradient id="caoAmbientGlow" cx="50%" cy="54%" r="50%">
                  <stop
                    offset="0%"
                    stopColor={
                      activeConsoleStage === 'creator'
                        ? '#2563EB'
                        : activeConsoleStage === 'architect'
                        ? '#9333EA'
                        : '#059669'
                    }
                    stopOpacity="0.18"
                  />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Soft Dynamic Ambient Halo */}
              <circle cx="160" cy="142" r="130" fill="url(#caoAmbientGlow)" className="transition-all duration-500" />

              {/* Outer Rotating Orbital Telemetry Track */}
              <circle
                cx="160"
                cy="138"
                r="128"
                fill="none"
                strokeDasharray="4 8"
                className="stroke-slate-300/80 dark:stroke-slate-700/80 animate-spin-slow"
                strokeWidth="1"
              />

              {/* Outer Ring: Orchestrator */}
              <circle
                cx="160"
                cy="138"
                r="116"
                onClick={() => handleSelectTier('orchestrator')}
                className={`cursor-pointer transition-all duration-300 ${
                  activeConsoleStage === 'orchestrator'
                    ? 'fill-emerald-500/15 stroke-emerald-600 dark:stroke-emerald-400'
                    : 'fill-slate-100/60 dark:fill-slate-800/30 stroke-slate-300 dark:stroke-slate-700 hover:stroke-emerald-500/70'
                }`}
                strokeWidth={activeConsoleStage === 'orchestrator' ? 2.5 : 1.2}
              />
              {activeConsoleStage === 'orchestrator' && (
                <circle
                  cx="160"
                  cy="138"
                  r="116"
                  fill="none"
                  className="stroke-emerald-500/50 animate-pulse pointer-events-none"
                  strokeWidth="6"
                />
              )}
              <text
                x="160"
                y="40"
                textAnchor="middle"
                className={`text-[11px] font-mono font-bold pointer-events-none transition-opacity duration-300 ${
                  activeConsoleStage === 'orchestrator'
                    ? 'fill-emerald-800 dark:fill-emerald-300 opacity-100'
                    : 'fill-emerald-800/70 dark:fill-emerald-300/60 opacity-80'
                }`}
              >
                03 · ORCHESTRATOR
              </text>

              {/* Middle Counter-Rotating Orbital Marker */}
              <circle
                cx="160"
                cy="148"
                r="92"
                fill="none"
                strokeDasharray="2 7"
                className="stroke-purple-400/30 dark:stroke-purple-500/25 animate-spin-reverse-slow pointer-events-none"
                strokeWidth="1"
              />

              {/* Middle Ring: Architect */}
              <circle
                cx="160"
                cy="148"
                r="82"
                onClick={() => handleSelectTier('architect')}
                className={`cursor-pointer transition-all duration-300 ${
                  activeConsoleStage === 'architect'
                    ? 'fill-purple-500/20 stroke-purple-600 dark:stroke-purple-400'
                    : 'fill-white/85 dark:fill-[#11192E]/85 stroke-slate-300 dark:stroke-slate-700 hover:stroke-purple-500/70'
                }`}
                strokeWidth={activeConsoleStage === 'architect' ? 2.5 : 1.2}
              />
              {activeConsoleStage === 'architect' && (
                <circle
                  cx="160"
                  cy="148"
                  r="82"
                  fill="none"
                  className="stroke-purple-500/45 animate-pulse pointer-events-none"
                  strokeWidth="5"
                />
              )}
              <text
                x="160"
                y="90"
                textAnchor="middle"
                className={`text-[11px] font-mono font-bold pointer-events-none transition-opacity duration-300 ${
                  activeConsoleStage === 'architect'
                    ? 'fill-purple-900 dark:fill-purple-300 opacity-100'
                    : 'fill-purple-800/70 dark:fill-purple-300/60 opacity-80'
                }`}
              >
                02 · ARCHITECT
              </text>

              {/* Animated Upward Progression Signal Path (Creator -> Architect -> Orchestrator) */}
              <line
                x1="160"
                y1="142"
                x2="160"
                y2="52"
                className="stroke-blue-600/40 dark:stroke-blue-400/40 animate-flow-dash pointer-events-none"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Inner Core: Creator */}
              <circle
                cx="160"
                cy="160"
                r="46"
                onClick={() => handleSelectTier('creator')}
                className={`cursor-pointer transition-all duration-300 ${
                  activeConsoleStage === 'creator'
                    ? 'fill-blue-500/25 stroke-blue-600 dark:stroke-blue-400'
                    : 'fill-slate-50 dark:fill-[#0D1527] stroke-slate-300 dark:stroke-slate-600 hover:stroke-blue-500/70'
                }`}
                strokeWidth={activeConsoleStage === 'creator' ? 2.5 : 1.2}
              />
              {activeConsoleStage === 'creator' && (
                <circle
                  cx="160"
                  cy="160"
                  r="46"
                  fill="none"
                  className="stroke-blue-500/50 animate-pulse pointer-events-none"
                  strokeWidth="5"
                />
              )}
              <text
                x="160"
                y="164"
                textAnchor="middle"
                className={`text-[11px] font-mono font-bold pointer-events-none transition-opacity duration-300 ${
                  activeConsoleStage === 'creator'
                    ? 'fill-blue-950 dark:fill-blue-200 opacity-100'
                    : 'fill-blue-900/75 dark:fill-blue-300/70 opacity-80'
                }`}
              >
                01 · CREATOR
              </text>
            </svg>

            <div className="flex justify-center gap-2 mt-4">
              {(['creator', 'architect', 'orchestrator'] as const).map((stage) => (
                <button
                  type="button"
                  key={stage}
                  onClick={() => handleSelectTier(stage)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase rounded-md cursor-pointer transition-all duration-200 ${
                    activeConsoleStage === stage
                      ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] font-bold shadow-xs -translate-y-0.5'
                      : 'bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/15 dark:border-white/15 text-[#475467] dark:text-slate-300 hover:border-blue-900/40 dark:hover:border-blue-400/40'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Active Stage Deep Detail */}
          <div
            key={activeConsoleStage}
            className="lg:col-span-7 bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 animate-stage-enter"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 dark:text-blue-400">
                {selectedStageInfo.label}
              </span>
              <span className="text-xs font-mono text-[#475467] dark:text-slate-400">
                Book Alignment: {selectedStageInfo.chapters}
              </span>
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white">
              {selectedStageInfo.title}
            </h2>

            <p className="font-serif text-lg italic text-blue-950 dark:text-blue-300">
              {selectedStageInfo.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-white dark:bg-[#11192E] rounded-xl border border-[#101828]/[0.08] dark:border-white/10">
                <strong className="font-mono text-[10px] uppercase tracking-wider text-[#475467] dark:text-slate-400 block mb-1">
                  Primary Engineering Focus
                </strong>
                <p className="text-[#101828] dark:text-slate-200 leading-relaxed">{selectedStageInfo.focus}</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#11192E] rounded-xl border border-[#101828]/[0.08] dark:border-white/10">
                <strong className="font-mono text-[10px] uppercase tracking-wider text-[#475467] dark:text-slate-400 block mb-1">
                  Leverage Shift in AI Era
                </strong>
                <p className="text-[#101828] dark:text-slate-200 leading-relaxed">{selectedStageInfo.leverageShift}</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#11192E] rounded-xl border border-[#101828]/[0.08] dark:border-white/10">
                <strong className="font-mono text-[10px] uppercase tracking-wider text-[#475467] dark:text-slate-400 block mb-1">
                  Tangible Proof Artifacts
                </strong>
                <p className="text-[#101828] dark:text-slate-200 leading-relaxed">{selectedStageInfo.artifacts}</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#11192E] rounded-xl border border-[#101828]/[0.08] dark:border-white/10">
                <strong className="font-mono text-[10px] uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Common Pitfall to Avoid</span>
                </strong>
                <p className="text-[#101828] dark:text-slate-200 leading-relaxed">{selectedStageInfo.commonMistake}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STAGE COMPARISON TABLE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold block mb-1">
            Side-by-Side Matrix
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white">
            Stage Comparison Across Key Dimensions
          </h2>
        </div>

        <div className="overflow-x-auto bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#101828]/10 dark:border-white/10 bg-[#FAFAF7] dark:bg-[#11192E]">
                <th className="p-4 font-mono uppercase text-[11px] text-[#475467] dark:text-slate-400">Dimension</th>
                <th className="p-4 font-serif font-bold text-[#101828] dark:text-white">01 · Creator</th>
                <th className="p-4 font-serif font-bold text-[#101828] dark:text-white">02 · Architect</th>
                <th className="p-4 font-serif font-bold text-[#101828] dark:text-white">03 · Orchestrator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#101828]/[0.06] dark:divide-white/10 text-[#475467] dark:text-slate-300">
              <tr>
                <td className="p-4 font-mono font-semibold text-[#101828] dark:text-white">Core Question</td>
                <td className="p-4">How do we build this feature?</td>
                <td className="p-4">What should exist & what are its bounds?</td>
                <td className="p-4">Who owns reliability, risk & trust?</td>
              </tr>
              <tr>
                <td className="p-4 font-mono font-semibold text-[#101828] dark:text-white">Relationship to AI</td>
                <td className="p-4">Uses AI for syntax & test generation</td>
                <td className="p-4">Constrains AI inside evals & invariants</td>
                <td className="p-4">Governs fleets of agents & human policies</td>
              </tr>
              <tr>
                <td className="p-4 font-mono font-semibold text-[#101828] dark:text-white">Primary Artifact</td>
                <td className="p-4">Running code & verified pull requests</td>
                <td className="p-4">ADRs, schemas & failure-mode models</td>
                <td className="p-4">Human API contracts & trust audits</td>
              </tr>
              <tr>
                <td className="p-4 font-mono font-semibold text-[#101828] dark:text-white">Companion Guide</td>
                <td className="p-4">
                  <button type="button" onClick={() => onNavigate('/frameworks/prompt-empathy')} className="text-blue-900 dark:text-blue-400 hover:underline cursor-pointer">
                    Prompt Empathy →
                  </button>
                </td>
                <td className="p-4">
                  <button type="button" onClick={() => onNavigate('/frameworks/how-to-what')} className="text-blue-900 dark:text-blue-400 hover:underline cursor-pointer">
                    From HOW to WHAT →
                  </button>
                </td>
                <td className="p-4">
                  <button type="button" onClick={() => onNavigate('/frameworks/human-api')} className="text-blue-900 dark:text-blue-400 hover:underline cursor-pointer">
                    The Human API →
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. OVERLAP & SYSTEMIC INTEGRATION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white text-center">
            Why the Tiers Are Concentric, Not Mutually Exclusive
          </h2>
          <div className="bg-[#FAF9F5] dark:bg-[#11192E] p-6 sm:p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-900 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-base text-[#101828] dark:text-white block">
                  You cannot orchestrate what you cannot architect.
                </strong>
                <span className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed block mt-0.5">
                  Without systems judgment, delegating authority to autonomous tools introduces blind spots around privilege boundaries, state corruption, and cascading failures.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-900 dark:text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-base text-[#101828] dark:text-white block">
                  You cannot architect credibly without understanding creation.
                </strong>
                <span className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed block mt-0.5">
                  Practical intuition about memory, concurrency, APIs, and model failure modes keeps architectural designs grounded in physical reality.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-900 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-base text-[#101828] dark:text-white block">
                  Time allocation shifts upward from keystrokes to verification.
                </strong>
                <span className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed block mt-0.5">
                  High-leverage engineers spend less calendar time typing routine syntax and far more time specifying problems, inspecting outputs, and hardening trust guarantees.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LIVE 12-SCENARIO C.A.O. BENCHMARK */}
      <section id="benchmark" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
            Live Self-Reflection Diagnostic
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white text-balance">
            Benchmark Your C.A.O. Operating Profile
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-400 mt-2 leading-relaxed">
            Work through 12 real-world engineering scenarios to map your Creator, Architect, and Orchestrator distribution and receive chapter recommendations.
          </p>
        </div>

        <div className="bg-[#FAF9F5] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-10 shadow-sm">
          <CAOBenchmark onOpenBuyModal={onOpenBuyModal} />
        </div>
      </section>

      {/* 7. INTERACTIVE OPERATING CONSOLE & CITATION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
            Interactive Console
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white">
            Explore Daily Rituals & Artifacts
          </h2>
        </div>

        <CAOInteractiveFramework
          selectedStage={activeConsoleStage}
          onSelectStage={setActiveConsoleStage}
          onOpenAssessment={onOpenAssessment}
        />

        <CiteThisFramework
          frameworkName="Creator–Architect–Orchestrator (C.A.O.) Framework"
          frameworkUrl={`${CANONICAL_ORIGIN}/cao-framework`}
        />
      </section>
    </div>
  );
};
