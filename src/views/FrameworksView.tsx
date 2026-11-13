import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PageId, Framework } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { FRAMEWORKS } from '../data/frameworksData';
import {
  Search,
  Compass,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowRight,
  Share2,
  CheckCircle2,
  Circle,
  LayoutList,
  Columns2,
  Sparkles,
  BookOpen,
  Lightbulb,
  Wrench,
  Check,
} from 'lucide-react';

interface FrameworksViewProps {
  onNavigate: (page: PageId | string) => void;
  onOpenAssessment: () => void;
}

type ExploreMode = 'codex' | 'deck';
type CardLens = 'schematic' | 'application' | 'lab';

const PHASE_THEME: Record<
  Framework['caoPhase'],
  { badge: string; accent: string; dot: string; label: string }
> = {
  All: {
    badge: 'text-blue-900 dark:text-blue-300 bg-blue-900/[0.07] dark:bg-blue-400/15 border-blue-900/20 dark:border-blue-400/30',
    accent: 'border-l-blue-900 dark:border-l-blue-400',
    dot: 'bg-blue-900 dark:bg-blue-400',
    label: 'Foundation',
  },
  Creator: {
    badge: 'text-emerald-800 dark:text-emerald-300 bg-emerald-900/[0.07] dark:bg-emerald-400/15 border-emerald-800/20 dark:border-emerald-400/30',
    accent: 'border-l-emerald-700 dark:border-l-emerald-400',
    dot: 'bg-emerald-600 dark:bg-emerald-400',
    label: 'Creator Tier',
  },
  Architect: {
    badge: 'text-blue-900 dark:text-sky-300 bg-sky-900/[0.07] dark:bg-sky-400/15 border-sky-800/20 dark:border-sky-400/30',
    accent: 'border-l-sky-700 dark:border-l-sky-400',
    dot: 'bg-sky-600 dark:bg-sky-400',
    label: 'Architect Tier',
  },
  Orchestrator: {
    badge: 'text-indigo-900 dark:text-indigo-300 bg-indigo-900/[0.07] dark:bg-indigo-400/15 border-indigo-800/20 dark:border-indigo-400/30',
    accent: 'border-l-indigo-700 dark:border-l-indigo-400',
    dot: 'bg-indigo-600 dark:bg-indigo-400',
    label: 'Orchestrator Tier',
  },
};

function parseSchematicNodes(description: string): { prefix?: string; steps: string[] } {
  if (description.includes('->')) {
    const colonIdx = description.indexOf(':');
    const firstArrowIdx = description.indexOf('->');
    let prefix: string | undefined;
    let body = description;
    if (colonIdx > -1 && colonIdx < firstArrowIdx) {
      prefix = description.slice(0, colonIdx).trim();
      body = description.slice(colonIdx + 1).trim();
    }
    const steps = body
      .replace(/\.$/, '')
      .split('->')
      .map((s) => s.trim())
      .filter(Boolean);
    return { prefix, steps };
  }

  if (description.includes(' + ')) {
    const colonIdx = description.indexOf(':');
    const prefix = colonIdx > -1 ? description.slice(0, colonIdx).trim() : undefined;
    const body = colonIdx > -1 ? description.slice(colonIdx + 1).trim() : description;
    const steps = body
      .replace(/\.$/, '')
      .split('+')
      .map((s) => s.trim())
      .filter(Boolean);
    return { prefix, steps };
  }

  return { steps: [description] };
}

const InteractiveSchematic: React.FC<{
  framework: Framework;
  activeNode: number;
  onSelectNode: (idx: number) => void;
}> = ({ framework, activeNode, onSelectNode }) => {
  const { prefix, steps } = parseSchematicNodes(framework.diagramDescription);
  const isPipeline = steps.length > 1;

  return (
    <div className="p-4 sm:p-5 bg-white dark:bg-[#11192E] rounded-xl border border-blue-900/15 dark:border-blue-400/20 shadow-2xs space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5" />
          <span>{prefix ? `Schematic · ${prefix}` : 'Architectural Schematic'}</span>
        </span>
        {isPipeline && (
          <span className="text-[10px] font-mono text-[#667085] dark:text-slate-400">
            Click node to inspect flow ({activeNode + 1}/{steps.length})
          </span>
        )}
      </div>

      {isPipeline ? (
        <div className="flex flex-col sm:flex-row sm:items-stretch gap-2">
          {steps.map((step, idx) => {
            const isSelected = activeNode === idx;
            return (
              <React.Fragment key={idx}>
                <button
                  type="button"
                  onClick={() => onSelectNode(idx)}
                  className={`flex-1 text-left p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-900/40 dark:border-blue-400/50 shadow-2xs'
                      : 'bg-[#FAFAF7] dark:bg-[#0D1527] border-[#101828]/10 dark:border-white/10 hover:border-blue-900/25 dark:hover:border-blue-400/30'
                  }`}
                >
                  <div className="font-mono text-[10px] font-bold text-blue-900 dark:text-blue-400 mb-1 tabular-nums">
                    STEP 0{idx + 1}
                  </div>
                  <div className="text-xs font-medium text-[#101828] dark:text-slate-100 leading-snug">
                    {step}
                  </div>
                </button>
                {idx < steps.length - 1 && (
                  <div className="hidden sm:flex items-center justify-center text-blue-900/40 dark:text-blue-400/40 shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <p className="font-mono text-xs text-[#101828] dark:text-blue-200 leading-relaxed bg-[#FAFAF7] dark:bg-[#0D1527] p-3.5 rounded-lg border border-[#101828]/[0.06] dark:border-white/10">
          {framework.diagramDescription}
        </p>
      )}
    </div>
  );
};

export const FrameworksView: React.FC<FrameworksViewProps> = ({
  onNavigate,
  onOpenAssessment,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [exploreMode, setExploreMode] = useState<ExploreMode>('codex');
  const [expandedFrameworkId, setExpandedFrameworkId] = useState<string>('cao-framework');
  const [activeDeckId, setActiveDeckId] = useState<string>('cao-framework');
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [activeLensByFw, setActiveLensByFw] = useState<Record<string, CardLens>>({});
  const [activeNodeByFw, setActiveNodeByFw] = useState<Record<string, number>>({});
  const [practicedIds, setPracticedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('beyond-frameworks-practiced');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFrameworks = FRAMEWORKS.filter((fw) => {
    const matchesPhase =
      selectedPhase === 'All' || fw.caoPhase === selectedPhase || fw.caoPhase === 'All';
    const matchesSearch =
      fw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fw.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fw.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  useEffect(() => {
    if (
      filteredFrameworks.length > 0 &&
      !filteredFrameworks.some((fw) => fw.id === activeDeckId)
    ) {
      setActiveDeckId(filteredFrameworks[0].id);
    }
  }, [filteredFrameworks, activeDeckId]);

  const togglePracticed = (id: string) => {
    setPracticedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('beyond-frameworks-practiced', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleShareFramework = (fw: Framework) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `"${fw.title}: ${fw.subtitle}" from ${SITE_CONFIG.book.title} by ${SITE_CONFIG.author.name}.\n\nDefinition: ${fw.definition}\n\nExplore at ${SITE_CONFIG.canonicalOrigin}/frameworks/${fw.id}`
      );
      setCopiedId(fw.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleJumpToFramework = (id: string) => {
    setExpandAll(false);
    setExpandedFrameworkId(id);
    setActiveDeckId(id);
    if (exploreMode === 'codex') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'nearest',
        });
      }
    }
  };

  const getLens = (id: string): CardLens => activeLensByFw[id] || 'schematic';
  const setLens = (id: string, lens: CardLens) =>
    setActiveLensByFw((prev) => ({ ...prev, [id]: lens }));

  const getNode = (id: string): number => activeNodeByFw[id] ?? 0;
  const setNode = (id: string, nodeIdx: number) =>
    setActiveNodeByFw((prev) => ({ ...prev, [id]: nodeIdx }));

  const practicedCount = practicedIds.length;
  const practicedPct = Math.round((practicedCount / FRAMEWORKS.length) * 100);

  const activeDeckFw =
    filteredFrameworks.find((fw) => fw.id === activeDeckId) || filteredFrameworks[0];

  const renderExpandedBody = (fw: Framework, idx: number) => {
    const lens = getLens(fw.id);
    const isPracticed = practicedIds.includes(fw.id);
    const nextFw = filteredFrameworks[(idx + 1) % filteredFrameworks.length];

    return (
      <div className="px-6 pb-7 pt-4 border-t border-[#101828]/[0.08] dark:border-white/10 bg-[#FAFAF7]/70 dark:bg-[#0A101F] space-y-5">
        {/* Core Definition */}
        <div className="bg-white dark:bg-[#11192E] p-4 sm:p-5 rounded-xl border border-[#101828]/[0.08] dark:border-white/10 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#667085] dark:text-slate-400 block mb-1.5">
            Core Concept Definition
          </span>
          <p className="text-sm sm:text-base text-[#101828] dark:text-slate-100 leading-relaxed font-sans">
            {fw.definition}
          </p>
        </div>

        {/* Interactive Lens Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            role="tablist"
            aria-label={`${fw.title} interactive views`}
            className="inline-flex flex-wrap gap-1.5 p-1 rounded-lg bg-[#101828]/[0.04] dark:bg-white/[0.04] border border-[#101828]/[0.06] dark:border-white/[0.08]"
          >
            {[
              { id: 'schematic' as CardLens, label: 'Schematic & Why', icon: Compass },
              { id: 'application' as CardLens, label: 'Field Application', icon: Lightbulb },
              { id: 'lab' as CardLens, label: 'Action Lab', icon: Wrench },
            ].map((tab) => {
              const Icon = tab.icon;
              const selected = lens === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setLens(fw.id, tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    selected
                      ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] shadow-2xs'
                      : 'text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => togglePracticed(fw.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-md border transition-colors cursor-pointer ${
              isPracticed
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-700/30 dark:border-emerald-400/30'
                : 'bg-white dark:bg-[#11192E] text-[#475467] dark:text-slate-300 border-[#101828]/15 dark:border-white/15 hover:border-blue-900/40 dark:hover:border-blue-400/40'
            }`}
          >
            {isPracticed ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Circle className="w-3.5 h-3.5" />
            )}
            <span>{isPracticed ? 'Practiced' : 'Mark as Practiced'}</span>
          </button>
        </div>

        {/* Dynamic Lens Panel */}
        <AnimatePresence mode="wait">
          {lens === 'schematic' && (
            <motion.div
              key="schematic"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-xl bg-white dark:bg-[#11192E] border border-[#101828]/[0.06] dark:border-white/10">
                <span className="text-[11px] font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold block mb-1.5">
                  Why It Matters in the Agentic AI Era
                </span>
                <p className="text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                  {fw.whyItMatters}
                </p>
              </div>

              <InteractiveSchematic
                framework={fw}
                activeNode={getNode(fw.id)}
                onSelectNode={(nIdx) => setNode(fw.id, nIdx)}
              />
            </motion.div>
          )}

          {lens === 'application' && (
            <motion.div
              key="application"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-5 bg-white dark:bg-[#11192E] rounded-xl border border-[#101828]/[0.08] dark:border-white/10 space-y-2.5"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-blue-900 dark:text-blue-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Real-World Engineering Application</span>
              </span>
              <p className="text-sm text-[#101828] dark:text-slate-200 leading-relaxed">
                {fw.realWorldApplication}
              </p>
            </motion.div>
          )}

          {lens === 'lab' && (
            <motion.div
              key="lab"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-5 bg-blue-50/50 dark:bg-blue-950/25 rounded-xl border border-blue-900/15 dark:border-blue-400/20 space-y-3"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-blue-950 dark:text-blue-300 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Try It Yourself — Field Exercise</span>
              </span>
              <p className="text-sm text-[#101828] dark:text-slate-100 leading-relaxed">
                {fw.tryItYourself}
              </p>
              <div className="pt-1 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-[#475467] dark:text-slate-400">
                  Check off when completed in your workflow.
                </span>
                <button
                  type="button"
                  onClick={() => togglePracticed(fw.id)}
                  className="text-xs font-semibold text-blue-900 dark:text-blue-300 hover:underline cursor-pointer"
                >
                  {isPracticed ? 'Completed ✓' : 'Complete Exercise →'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action & Chapter Bar */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-[#101828]/[0.08] dark:border-white/10">
          <span className="font-mono text-[#475467] dark:text-slate-400 inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400 shrink-0" />
            <span>
              In the Book: <strong className="text-[#101828] dark:text-white">{fw.relatedChapter}</strong>
            </span>
          </span>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() =>
                onNavigate(fw.id === 'cao-framework' ? 'cao-framework' : `/frameworks/${fw.id}`)
              }
              className="text-blue-900 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Dedicated Deep Dive & Citation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleShareFramework(fw)}
              className="text-[#475467] dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-300 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              {copiedId === fw.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedId === fw.id ? 'Copied!' : 'Share'}</span>
            </button>

            {filteredFrameworks.length > 1 && nextFw && (
              <button
                type="button"
                onClick={() => handleJumpToFramework(nextFw.id)}
                className="text-[#101828] dark:text-slate-200 hover:text-blue-900 dark:hover:text-blue-300 font-mono text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Next: {nextFw.title}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-14 sm:pt-20 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
            12 Signature Knowledge Pages
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] dark:text-white">
            The Ideas Behind Beyond AI Engineering
          </h1>
          <p className="text-base sm:text-lg text-[#475467] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Twelve core frameworks designed to redefine engineering capability, systems architecture, and professional authority in the agentic AI era.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#98A2B3] dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search frameworks (e.g. Trust Economy, Human API)..."
                aria-label="Search frameworks"
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-white rounded-md focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['All', 'Creator', 'Architect', 'Orchestrator'].map((phase) => (
                <button
                  type="button"
                  key={phase}
                  onClick={() => setSelectedPhase(phase)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedPhase === phase
                      ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14]'
                      : 'bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white'
                  }`}
                >
                  {phase}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FRAMEWORKS INTERACTIVE WORKBENCH & CODEX */}
      <section className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Highlight C.A.O. Operating System Spotlight */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-linear-to-r from-blue-950 via-[#101828] to-slate-900 text-white shadow-lg border border-blue-500/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="text-blue-300 text-xs font-mono font-semibold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Foundational Operating System</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              The C.A.O. Framework: Creator · Architect · Orchestrator
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Explore the dedicated deep-dive with an interactive concentric triad, stage comparison table, 12-scenario diagnostic console, and citation formats.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('cao-framework')}
            className="relative z-10 px-5 py-2.5 text-xs font-semibold bg-white text-[#101828] rounded-md hover:bg-blue-50 transition-colors shadow whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Explore C.A.O. Deep Dive</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Explorer Controls + Quick Index Bar */}
        <div className="mb-8 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl p-4 sm:p-5 space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
                <span className="font-semibold text-[#101828] dark:text-white uppercase tracking-wider">
                  Framework Mastery Progress
                </span>
                <span className="tabular-nums text-blue-900 dark:text-blue-400 font-bold">
                  {practicedCount} / {FRAMEWORKS.length} Practiced ({practicedPct}%)
                </span>
              </div>
              <div className="w-56 sm:w-64 h-1.5 bg-[#101828]/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-900 dark:bg-blue-400 transition-all duration-300"
                  style={{ width: `${practicedPct}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-md border border-[#101828]/15 dark:border-white/15 p-0.5 bg-[#FAFAF7] dark:bg-[#11192E]">
                <button
                  type="button"
                  onClick={() => setExploreMode('codex')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                    exploreMode === 'codex'
                      ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14]'
                      : 'text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white'
                  }`}
                >
                  <LayoutList className="w-3.5 h-3.5" />
                  <span>Interactive Codex</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExploreMode('deck')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                    exploreMode === 'deck'
                      ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14]'
                      : 'text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white'
                  }`}
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  <span>Split Workbench</span>
                </button>
              </div>

              {exploreMode === 'codex' && (
                <button
                  type="button"
                  onClick={() => {
                    setExpandAll((prev) => !prev);
                    if (expandAll) setExpandedFrameworkId('');
                  }}
                  className="px-3 py-1.5 text-xs font-mono font-semibold border border-[#101828]/15 dark:border-white/15 rounded-md text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  {expandAll ? 'Collapse All' : 'Expand All 12'}
                </button>
              )}
            </div>
          </div>

          {/* Horizontal Quick-Jump Matrix Strip */}
          {filteredFrameworks.length > 0 && (
            <div className="pt-3 border-t border-[#101828]/[0.06] dark:border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {filteredFrameworks.map((fw, i) => {
                const isActive =
                  exploreMode === 'deck'
                    ? activeDeckId === fw.id
                    : expandedFrameworkId === fw.id;
                const isDone = practicedIds.includes(fw.id);
                const theme = PHASE_THEME[fw.caoPhase];

                return (
                  <button
                    key={fw.id}
                    type="button"
                    onClick={() => handleJumpToFramework(fw.id)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] border-[#101828] dark:border-white font-semibold'
                        : 'bg-[#FAFAF7] dark:bg-[#11192E] border-[#101828]/10 dark:border-white/10 text-[#475467] dark:text-slate-300 hover:border-blue-900/40 dark:hover:border-blue-400/40'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isDone ? 'bg-emerald-500' : theme.dot}`}
                      aria-hidden="true"
                    />
                    <span className="tabular-nums opacity-70">{String(i + 1).padStart(2, '0')}</span>
                    <span className="whitespace-nowrap">{fw.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Main Frameworks Container (div:nth-of-type(3) or target div) */}
        {filteredFrameworks.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl space-y-3">
            <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
              No frameworks match that filter
            </h3>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-400">
              Try resetting your search query or C.A.O. tier filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedPhase('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : exploreMode === 'deck' && activeDeckFw ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Selector Rail */}
            <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24">
              {filteredFrameworks.map((fw, idx) => {
                const selected = fw.id === activeDeckFw.id;
                const done = practicedIds.includes(fw.id);
                const theme = PHASE_THEME[fw.caoPhase];

                return (
                  <button
                    key={fw.id}
                    id={fw.id}
                    type="button"
                    onClick={() => setActiveDeckId(fw.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      selected
                        ? 'bg-white dark:bg-[#0D1527] border-blue-900 dark:border-blue-400 shadow-sm ring-1 ring-blue-900/10 dark:ring-blue-400/20'
                        : 'bg-white/60 dark:bg-[#0D1527]/60 border-[#101828]/10 dark:border-white/10 hover:bg-white dark:hover:bg-[#0D1527]'
                    }`}
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2 text-[10px] font-mono">
                        <span className="tabular-nums text-[#667085] dark:text-slate-400">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="uppercase tracking-wider font-semibold text-blue-900 dark:text-blue-400">
                          {theme.label}
                        </span>
                      </div>
                      <div className="font-serif text-base font-bold text-[#101828] dark:text-white truncate">
                        {fw.title}
                      </div>
                    </div>
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                    ) : (
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                          selected ? 'text-blue-900 dark:text-blue-400 translate-x-0.5' : 'text-slate-400'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Interactive Canvas */}
            <div className="lg:col-span-8 bg-white dark:bg-[#0D1527] border border-blue-900/30 dark:border-blue-400/30 rounded-2xl shadow-md overflow-hidden">
              <div className="p-6 sm:p-8 space-y-2 border-b border-[#101828]/[0.08] dark:border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 text-[11px] font-mono font-semibold uppercase tracking-wider rounded-sm border ${
                      PHASE_THEME[activeDeckFw.caoPhase].badge
                    }`}
                  >
                    {PHASE_THEME[activeDeckFw.caoPhase].label}
                  </span>
                  <span className="text-xs font-mono text-[#667085] dark:text-slate-400 tabular-nums">
                    Framework {String(filteredFrameworks.findIndex((f) => f.id === activeDeckFw.id) + 1).padStart(2, '0')} of {filteredFrameworks.length}
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
                  {activeDeckFw.title}
                </h2>
                <p className="text-sm text-[#475467] dark:text-blue-300/90 font-medium">
                  {activeDeckFw.subtitle}
                </p>
              </div>

              {renderExpandedBody(
                activeDeckFw,
                Math.max(0, filteredFrameworks.findIndex((f) => f.id === activeDeckFw.id))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFrameworks.map((fw, idx) => {
              const isExpanded = expandAll || expandedFrameworkId === fw.id;
              const isDone = practicedIds.includes(fw.id);
              const theme = PHASE_THEME[fw.caoPhase];

              return (
                <div
                  key={fw.id}
                  id={fw.id}
                  className={`bg-white dark:bg-[#0D1527] border border-l-4 ${theme.accent} rounded-xl transition-all shadow-xs overflow-hidden ${
                    isExpanded
                      ? 'border-blue-900/60 dark:border-blue-400/60 ring-1 ring-blue-900/10 dark:ring-blue-400/20 shadow-md'
                      : 'border-[#101828]/10 dark:border-white/10 hover:border-[#101828]/30 dark:hover:border-white/25'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (expandAll) {
                        setExpandAll(false);
                        setExpandedFrameworkId(fw.id);
                      } else {
                        setExpandedFrameworkId(isExpanded ? '' : fw.id);
                      }
                    }}
                    aria-expanded={isExpanded}
                    className="w-full text-left p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <div
                        className={`hidden sm:flex w-10 h-10 rounded-lg items-center justify-center font-mono text-xs font-bold tabular-nums shrink-0 border transition-colors ${
                          isExpanded
                            ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] border-transparent'
                            : 'bg-[#FAFAF7] dark:bg-[#11192E] text-[#475467] dark:text-slate-300 border-[#101828]/10 dark:border-white/10 group-hover:border-blue-900/30'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                          <span
                            className={`uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs border ${theme.badge}`}
                          >
                            {theme.label}
                          </span>
                          <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">
                            ·
                          </span>
                          <span className="text-[#475467] dark:text-slate-400 truncate">
                            {fw.relatedChapter.split('&')[0]}
                          </span>
                          {isDone && (
                            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Practiced</span>
                            </span>
                          )}
                        </div>

                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors">
                          {fw.title}
                        </h2>
                        <div className="text-xs sm:text-sm text-[#475467] dark:text-blue-300/80 font-medium font-sans">
                          {fw.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-[#475467] dark:text-slate-400 shrink-0">
                      <span className="text-xs font-mono hidden sm:inline">
                        {isExpanded ? 'Close' : 'Explore'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-blue-900 dark:text-blue-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                      )}
                    </div>
                  </button>

                  {isExpanded && renderExpandedBody(fw, idx)}
                </div>
              );
            })}
          </div>
        )}

        {/* Assessment CTA Block */}
        <div className="mt-16 text-center bg-[#101828] dark:bg-[#0D1527] text-white p-8 rounded-2xl border border-transparent dark:border-white/10 shadow-md">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
            Measure Your C.A.O. Operating Profile
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mb-6">
            Take the 12-scenario self-reflection benchmark to discover where your current engineering instincts lie across these frameworks.
          </p>
          <button
            type="button"
            onClick={onOpenAssessment}
            className="px-5 py-2.5 text-xs font-semibold bg-white text-[#101828] rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Start 12-Scenario Assessment →
          </button>
        </div>
      </section>
    </div>
  );
};
