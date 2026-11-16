import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PageId } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { updatePageSeo, CANONICAL_ORIGIN, buildDynamicFrameworkSeo } from '../utils/seo';
import { FRAMEWORKS } from '../data/frameworksData';
import { trackEvent } from '../utils/analytics';
import { CAOInteractiveFramework } from '../components/CAOInteractiveFramework';
import { CAOBenchmark } from '../components/CAOBenchmark';
import { CiteThisFramework } from '../components/CiteThisFramework';
import { SourceNote } from '../components/SourceNote';
import { getFrameworkSourceIds } from '../utils/sourceNoteSchema';
import {
  ArrowRight,
  BookOpen,
  Layers,
  CheckCircle2,
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

const STAGE_META = {
  creator: {
    code: '01 · CREATOR',
    subtitle: 'Build & Verify',
    radius: 48,
    hex: '#2563EB',
    hexDark: '#60A5FA',
    dotClass: 'bg-blue-600 dark:bg-blue-400',
    badgeClass:
      'text-blue-900 dark:text-blue-300 bg-blue-50/90 dark:bg-blue-950/50 border-blue-900/20 dark:border-blue-400/30',
    activeTabClass:
      'bg-blue-950 dark:bg-blue-500 text-white dark:text-[#070B14] border-blue-950 dark:border-blue-400 shadow-sm -translate-y-0.5',
    panelBorderClass: 'border-t-blue-600 dark:border-t-blue-400',
  },
  architect: {
    code: '02 · ARCHITECT',
    subtitle: 'Frame & Design',
    radius: 88,
    hex: '#7C3AED',
    hexDark: '#A78BFA',
    dotClass: 'bg-purple-600 dark:bg-purple-400',
    badgeClass:
      'text-purple-900 dark:text-purple-300 bg-purple-50/90 dark:bg-purple-950/50 border-purple-900/20 dark:border-purple-400/30',
    activeTabClass:
      'bg-purple-950 dark:bg-purple-500 text-white dark:text-[#070B14] border-purple-950 dark:border-purple-400 shadow-sm -translate-y-0.5',
    panelBorderClass: 'border-t-purple-600 dark:border-t-purple-400',
  },
  orchestrator: {
    code: '03 · ORCHESTRATOR',
    subtitle: 'Govern & Lead',
    radius: 128,
    hex: '#059669',
    hexDark: '#34D399',
    dotClass: 'bg-emerald-600 dark:bg-emerald-400',
    badgeClass:
      'text-emerald-900 dark:text-emerald-300 bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-900/20 dark:border-emerald-400/30',
    activeTabClass:
      'bg-emerald-900 dark:bg-emerald-500 text-white dark:text-[#070B14] border-emerald-900 dark:border-emerald-400 shadow-sm -translate-y-0.5',
    panelBorderClass: 'border-t-emerald-600 dark:border-t-emerald-400',
  },
} as const;

export const CAOFrameworkView: React.FC<CAOFrameworkViewProps> = ({
  onNavigate,
  onOpenAssessment,
  onOpenBuyModal,
}) => {
  const [activeConsoleStage, setActiveConsoleStage] = useState<'creator' | 'architect' | 'orchestrator'>('architect');
  const [hoveredRing, setHoveredRing] = useState<'creator' | 'architect' | 'orchestrator' | null>(null);
  const [downloadedGuide, setDownloadedGuide] = useState(false);
  const [isTriadAutoPlaying, setIsTriadAutoPlaying] = useState(true);
  const [isTriadHovered, setIsTriadHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
    const caoFramework = FRAMEWORKS.find((f) => f.id === 'cao-framework');
    if (caoFramework) {
      updatePageSeo(buildDynamicFrameworkSeo(caoFramework));
      return;
    }
    updatePageSeo({
      title: `Creator Architect Orchestrator (C.A.O.) Framework | ${SITE_CONFIG.book.title}`,
      description:
        'The C.A.O. Framework by Harsh Verma maps the three evolutionary stages of engineering in the AI era: Creator (Build), Architect (Design), and Orchestrator (Govern).',
      canonicalPath: '/cao-framework',
      ogType: 'article',
      schemaType: 'TechArticle',
      keywords: [
        'C.A.O. Framework',
        'Creator Architect Orchestrator',
        'Beyond AI Engineering',
        'Harsh Verma',
        'AI Agent Governance',
      ],
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
      {/* 1. HERO */}
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
                trackEvent('assessment_started', { source: 'cao_framework_hero' });
                onOpenAssessment();
              }}
              className="px-5 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-blue-400 dark:text-blue-600" />
              <span>Take the 15-Item C.A.O. Assessment</span>
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
        onMouseLeave={() => {
          setIsTriadHovered(false);
          setHoveredRing(null);
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Interactive Animated Concentric Triad Diagram */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0D1527] border border-[#101828]/12 dark:border-white/12 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-300">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  {!prefersReducedMotion && isTriadAutoPlaying && !isTriadHovered && (
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${STAGE_META[activeConsoleStage].dotClass}`}
                    />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 transition-colors duration-300 ${STAGE_META[activeConsoleStage].dotClass}`}
                  />
                </span>
                <span>Interactive Triad · Select a ring</span>
              </div>

              <button
                type="button"
                onClick={() => setIsTriadAutoPlaying((prev) => !prev)}
                aria-label={isTriadAutoPlaying ? 'Pause concentric triad cycle' : 'Play concentric triad cycle'}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#101828]/12 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#11192E] text-[10px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:border-blue-900/30 dark:hover:border-blue-400/30 transition-colors cursor-pointer"
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

            <div className="relative py-1">
              <svg
                viewBox="0 0 340 316"
                className="w-full max-w-[348px] mx-auto select-none overflow-visible"
                role="group"
                aria-label="Interactive Creator Architect Orchestrator Concentric Rings"
              >
                <defs>
                  <radialGradient id="caoAmbientGlow" cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      stopColor={STAGE_META[activeConsoleStage].hex}
                      stopOpacity="0.22"
                    />
                    <stop
                      offset="65%"
                      stopColor={STAGE_META[activeConsoleStage].hex}
                      stopOpacity="0.06"
                    />
                    <stop offset="100%" stopColor={STAGE_META[activeConsoleStage].hex} stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Ambient Radial Glow Anchored to Selected Ring Stage */}
                <circle
                  cx="170"
                  cy="158"
                  r="146"
                  fill="url(#caoAmbientGlow)"
                  className="transition-all duration-500 pointer-events-none"
                />

                {/* Outer Telemetry Compass Ring */}
                <g className="animate-spin-slow pointer-events-none">
                  <circle cx="170" cy="158" r="144" fill="none" stroke="transparent" strokeWidth="1" />
                  <circle
                    cx="170"
                    cy="158"
                    r="142"
                    fill="none"
                    strokeDasharray="3 9"
                    className="stroke-slate-300/75 dark:stroke-slate-700/75"
                    strokeWidth="1"
                  />
                  <circle cx="170" cy="16" r="2" className="fill-slate-400/70 dark:fill-slate-500/70" />
                  <circle cx="170" cy="300" r="2" className="fill-slate-400/70 dark:fill-slate-500/70" />
                </g>

                {/* Radial Axis Guides (Subtle Architectural Crosshair) */}
                <line
                  x1="170"
                  y1="22"
                  x2="170"
                  y2="294"
                  strokeDasharray="2 6"
                  className="stroke-slate-300/50 dark:stroke-slate-700/50 pointer-events-none"
                  strokeWidth="1"
                />
                <line
                  x1="34"
                  y1="158"
                  x2="306"
                  y2="158"
                  strokeDasharray="2 6"
                  className="stroke-slate-300/40 dark:stroke-slate-700/40 pointer-events-none"
                  strokeWidth="1"
                />

                {/* 03. OUTER RING — ORCHESTRATOR (r = 128) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-pressed={activeConsoleStage === 'orchestrator'}
                  aria-label="Select Stage 03: Orchestrator ring"
                  onClick={() => handleSelectTier('orchestrator')}
                  onMouseEnter={() => setHoveredRing('orchestrator')}
                  onMouseLeave={() => setHoveredRing(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectTier('orchestrator');
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  {activeConsoleStage === 'orchestrator' && (
                    <circle
                      cx="170"
                      cy="158"
                      r="128"
                      fill="none"
                      className="stroke-emerald-500/35 dark:stroke-emerald-400/35 pointer-events-none transition-all duration-300"
                      strokeWidth="10"
                    />
                  )}
                  <circle
                    cx="170"
                    cy="158"
                    r="128"
                    className={`transition-all duration-300 ${
                      activeConsoleStage === 'orchestrator'
                        ? 'fill-emerald-500/[0.14] dark:fill-emerald-400/[0.16] stroke-emerald-600 dark:stroke-emerald-400'
                        : hoveredRing === 'orchestrator'
                        ? 'fill-emerald-500/[0.08] stroke-emerald-500/80 dark:stroke-emerald-400/80'
                        : 'fill-slate-100/70 dark:fill-[#11192E]/70 stroke-slate-300/90 dark:stroke-slate-700'
                    }`}
                    strokeWidth={activeConsoleStage === 'orchestrator' ? 2.75 : hoveredRing === 'orchestrator' ? 2 : 1.25}
                  />
                  <text
                    x="170"
                    y="49"
                    textAnchor="middle"
                    className={`text-[10.5px] font-mono font-bold tracking-wider pointer-events-none transition-all duration-300 ${
                      activeConsoleStage === 'orchestrator'
                        ? 'fill-emerald-800 dark:fill-emerald-300 opacity-100'
                        : hoveredRing === 'orchestrator'
                        ? 'fill-emerald-700 dark:fill-emerald-300 opacity-95'
                        : 'fill-slate-500 dark:fill-slate-400 opacity-75'
                    }`}
                  >
                    03 · ORCHESTRATOR
                  </text>
                  <text
                    x="170"
                    y="273"
                    textAnchor="middle"
                    className={`text-[9.5px] font-sans font-medium pointer-events-none transition-opacity duration-300 ${
                      activeConsoleStage === 'orchestrator'
                        ? 'fill-emerald-800/90 dark:fill-emerald-200/90 opacity-100'
                        : 'fill-slate-500 dark:fill-slate-400 opacity-65'
                    }`}
                  >
                    Govern &amp; Lead
                  </text>
                </g>

                {/* 02. MIDDLE RING — ARCHITECT (r = 88) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-pressed={activeConsoleStage === 'architect'}
                  aria-label="Select Stage 02: Architect ring"
                  onClick={() => handleSelectTier('architect')}
                  onMouseEnter={() => setHoveredRing('architect')}
                  onMouseLeave={() => setHoveredRing(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectTier('architect');
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  {activeConsoleStage === 'architect' && (
                    <circle
                      cx="170"
                      cy="158"
                      r="88"
                      fill="none"
                      className="stroke-purple-500/35 dark:stroke-purple-400/35 pointer-events-none transition-all duration-300"
                      strokeWidth="9"
                    />
                  )}
                  <circle
                    cx="170"
                    cy="158"
                    r="88"
                    className={`transition-all duration-300 ${
                      activeConsoleStage === 'architect'
                        ? 'fill-purple-500/[0.16] dark:fill-purple-400/[0.18] stroke-purple-600 dark:stroke-purple-400'
                        : hoveredRing === 'architect'
                        ? 'fill-purple-500/[0.08] stroke-purple-500/80 dark:stroke-purple-400/80'
                        : 'fill-white/95 dark:fill-[#0F172A]/95 stroke-slate-300/90 dark:stroke-slate-700'
                    }`}
                    strokeWidth={activeConsoleStage === 'architect' ? 2.75 : hoveredRing === 'architect' ? 2 : 1.25}
                  />
                  <text
                    x="170"
                    y="92"
                    textAnchor="middle"
                    className={`text-[10.5px] font-mono font-bold tracking-wider pointer-events-none transition-all duration-300 ${
                      activeConsoleStage === 'architect'
                        ? 'fill-purple-900 dark:fill-purple-300 opacity-100'
                        : hoveredRing === 'architect'
                        ? 'fill-purple-800 dark:fill-purple-300 opacity-95'
                        : 'fill-slate-500 dark:fill-slate-400 opacity-75'
                    }`}
                  >
                    02 · ARCHITECT
                  </text>
                  <text
                    x="170"
                    y="231"
                    textAnchor="middle"
                    className={`text-[9.5px] font-sans font-medium pointer-events-none transition-opacity duration-300 ${
                      activeConsoleStage === 'architect'
                        ? 'fill-purple-900/90 dark:fill-purple-200/90 opacity-100'
                        : 'fill-slate-500 dark:fill-slate-400 opacity-65'
                    }`}
                  >
                    Frame &amp; Design
                  </text>
                </g>

                {/* 01. INNER CORE — CREATOR (r = 48) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-pressed={activeConsoleStage === 'creator'}
                  aria-label="Select Stage 01: Creator core ring"
                  onClick={() => handleSelectTier('creator')}
                  onMouseEnter={() => setHoveredRing('creator')}
                  onMouseLeave={() => setHoveredRing(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectTier('creator');
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  {activeConsoleStage === 'creator' && (
                    <circle
                      cx="170"
                      cy="158"
                      r="48"
                      fill="none"
                      className="stroke-blue-500/35 dark:stroke-blue-400/35 pointer-events-none transition-all duration-300"
                      strokeWidth="9"
                    />
                  )}
                  <circle
                    cx="170"
                    cy="158"
                    r="48"
                    className={`transition-all duration-300 ${
                      activeConsoleStage === 'creator'
                        ? 'fill-blue-500/[0.18] dark:fill-blue-400/[0.2] stroke-blue-600 dark:stroke-blue-400'
                        : hoveredRing === 'creator'
                        ? 'fill-blue-500/[0.08] stroke-blue-500/80 dark:stroke-blue-400/80'
                        : 'fill-[#FAFAF7] dark:fill-[#0B1222] stroke-slate-300/90 dark:stroke-slate-600'
                    }`}
                    strokeWidth={activeConsoleStage === 'creator' ? 2.75 : hoveredRing === 'creator' ? 2 : 1.25}
                  />
                  <text
                    x="170"
                    y="153"
                    textAnchor="middle"
                    className={`text-[10.5px] font-mono font-bold tracking-wider pointer-events-none transition-all duration-300 ${
                      activeConsoleStage === 'creator'
                        ? 'fill-blue-950 dark:fill-blue-200 opacity-100'
                        : hoveredRing === 'creator'
                        ? 'fill-blue-900 dark:fill-blue-300 opacity-95'
                        : 'fill-slate-600 dark:fill-slate-400 opacity-80'
                    }`}
                  >
                    01 · CREATOR
                  </text>
                  <text
                    x="170"
                    y="170"
                    textAnchor="middle"
                    className={`text-[9.5px] font-sans font-medium pointer-events-none transition-opacity duration-300 ${
                      activeConsoleStage === 'creator'
                        ? 'fill-blue-900 dark:fill-blue-200/90 opacity-100'
                        : 'fill-slate-500 dark:fill-slate-400 opacity-65'
                    }`}
                  >
                    Build &amp; Verify
                  </text>
                </g>

                {/* Active Highlight Selection Ring: Expanding Selection Pulse + Orbiting Highlight Comet */}
                {!prefersReducedMotion && (
                  <motion.circle
                    key={`pulse-${activeConsoleStage}`}
                    cx="170"
                    cy="158"
                    fill="none"
                    stroke={STAGE_META[activeConsoleStage].hex}
                    strokeWidth="2.5"
                    initial={{ r: STAGE_META[activeConsoleStage].radius, opacity: 0.75 }}
                    animate={{ r: STAGE_META[activeConsoleStage].radius + 14, opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-none"
                  />
                )}

                <g className={`${prefersReducedMotion ? '' : 'animate-spin-reverse-slow'} pointer-events-none`}>
                  {/* Hidden centering circle guarantees SVG fill-box stays anchored at (170, 158) */}
                  <circle
                    cx="170"
                    cy="158"
                    r={STAGE_META[activeConsoleStage].radius + 4}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="1"
                  />
                  {/* Sweeping Highlight Arc Along Selected Ring */}
                  <circle
                    cx="170"
                    cy="158"
                    r={STAGE_META[activeConsoleStage].radius}
                    fill="none"
                    stroke={STAGE_META[activeConsoleStage].hex}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.round(STAGE_META[activeConsoleStage].radius * 0.85)} 999`}
                    className="opacity-95"
                  />
                  {/* Orbiting Highlight Beacon Node */}
                  <circle
                    cx={170 + STAGE_META[activeConsoleStage].radius}
                    cy="158"
                    r="7.5"
                    fill={STAGE_META[activeConsoleStage].hex}
                    fillOpacity="0.22"
                  />
                  <circle
                    cx={170 + STAGE_META[activeConsoleStage].radius}
                    cy="158"
                    r="3.8"
                    fill={STAGE_META[activeConsoleStage].hex}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>

            {/* Active Ring Telemetry Caption */}
            <div className="mt-1 mb-3 flex items-center justify-center gap-2 text-[11px] font-mono text-[#475467] dark:text-slate-400">
              <span className="uppercase tracking-wider">Selected Ring:</span>
              <span
                className={`px-2 py-0.5 rounded border font-semibold ${STAGE_META[activeConsoleStage].badgeClass}`}
              >
                {STAGE_META[activeConsoleStage].code} · {STAGE_META[activeConsoleStage].subtitle}
              </span>
            </div>

            {/* Synchronized Ring Selector Controls */}
            <div className="grid grid-cols-3 gap-2">
              {(['creator', 'architect', 'orchestrator'] as const).map((stage) => {
                const isSelected = activeConsoleStage === stage;
                const meta = STAGE_META[stage];
                return (
                  <button
                    type="button"
                    key={stage}
                    onClick={() => handleSelectTier(stage)}
                    aria-pressed={isSelected}
                    className={`px-2.5 py-2 text-[11px] font-mono uppercase rounded-lg border cursor-pointer transition-all duration-200 flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? `${meta.activeTabClass} font-bold`
                        : 'bg-[#FAFAF7] dark:bg-[#11192E] border-[#101828]/12 dark:border-white/15 text-[#475467] dark:text-slate-300 hover:border-blue-900/40 dark:hover:border-blue-400/40 hover:text-[#101828] dark:hover:text-white'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isSelected ? 'bg-white dark:bg-[#070B14]' : meta.dotClass
                      }`}
                      aria-hidden="true"
                    />
                    <span>{stage}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Active Stage Deep Detail (Animated Stage Transition) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConsoleStage}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 border-t-[3px] ${STAGE_META[activeConsoleStage].panelBorderClass} rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-mono font-bold uppercase tracking-wider ${STAGE_META[activeConsoleStage].badgeClass}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${STAGE_META[activeConsoleStage].dotClass}`}
                      aria-hidden="true"
                    />
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

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#101828]/10 dark:border-white/10">
                  <span className="text-xs text-[#475467] dark:text-slate-400">
                    Full field guide, practical scenarios & exercises:
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/frameworks/${activeConsoleStage}`)}
                    className="px-4 py-2 rounded-lg bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore {selectedStageInfo.title} Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dedicated Deep-Dive Stage Links Strip */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['creator', 'architect', 'orchestrator'] as const).map((stageKey, index) => {
            const info = STAGE_DETAILS[stageKey];
            return (
              <button
                key={stageKey}
                type="button"
                onClick={() => onNavigate(`/frameworks/${stageKey}`)}
                className="text-left p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] hover:border-blue-900 dark:hover:border-blue-400 transition-colors group cursor-pointer flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-blue-900 dark:text-blue-400 font-semibold">
                    0{index + 1}. Standalone Deep Dive
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300">
                    {info.title}
                  </h3>
                  <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                    {info.focus}
                  </p>
                </div>
                <span className="text-xs font-semibold text-blue-900 dark:text-blue-300 inline-flex items-center gap-1">
                  <span>Open /frameworks/{stageKey}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            );
          })}
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

        <div className="mt-10 space-y-4">
          {getFrameworkSourceIds('cao-framework').map((srcId) => (
            <SourceNote
              key={srcId}
              sourceId={srcId}
              entityId={`${CANONICAL_ORIGIN}/cao-framework#term`}
              articleId={`${CANONICAL_ORIGIN}/cao-framework#article`}
              entityName="C.A.O. Framework (Creator, Architect, Orchestrator)"
              entityUrl={`${CANONICAL_ORIGIN}/cao-framework`}
            />
          ))}
        </div>

        <CiteThisFramework
          frameworkName="Creator–Architect–Orchestrator (C.A.O.) Framework"
          frameworkUrl={`${CANONICAL_ORIGIN}/cao-framework`}
        />
      </section>
    </div>
  );
};
