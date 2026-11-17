import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  Compass,
  ShieldCheck,
  ArrowRight,
  Check,
  Clock,
  CheckCircle2,
  Circle,
  RotateCcw,
} from 'lucide-react';
import { CAOSvgRoadmap, CAOStageId } from './CAOSvgRoadmap';

const ENGAGEMENT_STORAGE_KEY = 'beyond-cao-stage-engagement';

interface CAOEngagementState {
  timeSpentMs: Record<CAOStageId, number>;
  inspectedStages: CAOStageId[];
  reviewedBriefs: Record<CAOStageId, Array<'opportunity' | 'risk'>>;
  exploredCapabilities: Record<CAOStageId, string[]>;
}

const DEFAULT_ENGAGEMENT_STATE: CAOEngagementState = {
  timeSpentMs: { creator: 0, architect: 0, orchestrator: 0 },
  inspectedStages: [],
  reviewedBriefs: { creator: [], architect: [], orchestrator: [] },
  exploredCapabilities: { creator: [], architect: [], orchestrator: [] },
};

const VALID_STAGES: CAOStageId[] = ['creator', 'architect', 'orchestrator'];

const loadEngagementState = (): CAOEngagementState => {
  try {
    const raw = localStorage.getItem(ENGAGEMENT_STORAGE_KEY);
    if (!raw) return DEFAULT_ENGAGEMENT_STATE;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return DEFAULT_ENGAGEMENT_STATE;

    const safeTime: Record<CAOStageId, number> = {
      creator:
        typeof parsed.timeSpentMs?.creator === 'number' && parsed.timeSpentMs.creator >= 0
          ? parsed.timeSpentMs.creator
          : 0,
      architect:
        typeof parsed.timeSpentMs?.architect === 'number' && parsed.timeSpentMs.architect >= 0
          ? parsed.timeSpentMs.architect
          : 0,
      orchestrator:
        typeof parsed.timeSpentMs?.orchestrator === 'number' &&
        parsed.timeSpentMs.orchestrator >= 0
          ? parsed.timeSpentMs.orchestrator
          : 0,
    };

    const safeInspected: CAOStageId[] = Array.isArray(parsed.inspectedStages)
      ? parsed.inspectedStages.filter((s: unknown): s is CAOStageId =>
          VALID_STAGES.includes(s as CAOStageId)
        )
      : [];

    const sanitizeBriefs = (val: unknown): Array<'opportunity' | 'risk'> =>
      Array.isArray(val)
        ? val.filter(
            (item): item is 'opportunity' | 'risk' =>
              item === 'opportunity' || item === 'risk'
          )
        : [];

    const sanitizeCaps = (val: unknown): string[] =>
      Array.isArray(val) ? val.filter((item): item is string => typeof item === 'string') : [];

    return {
      timeSpentMs: safeTime,
      inspectedStages: safeInspected,
      reviewedBriefs: {
        creator: sanitizeBriefs(parsed.reviewedBriefs?.creator),
        architect: sanitizeBriefs(parsed.reviewedBriefs?.architect),
        orchestrator: sanitizeBriefs(parsed.reviewedBriefs?.orchestrator),
      },
      exploredCapabilities: {
        creator: sanitizeCaps(parsed.exploredCapabilities?.creator),
        architect: sanitizeCaps(parsed.exploredCapabilities?.architect),
        orchestrator: sanitizeCaps(parsed.exploredCapabilities?.orchestrator),
      },
    };
  } catch {
    return DEFAULT_ENGAGEMENT_STATE;
  }
};

const saveEngagementState = (state: CAOEngagementState): void => {
  try {
    localStorage.setItem(ENGAGEMENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota / private mode failures gracefully
  }
};

const formatDuration = (ms: number): string => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 60) {
    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  }
  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  return `${hours}h ${remMinutes}m`;
};

const computeStageExplorationPercent = (
  stageId: CAOStageId,
  engagement: CAOEngagementState
): number => {
  const stageInspectedScore = engagement.inspectedStages.includes(stageId) ? 25 : 0;
  const elapsedSeconds = (engagement.timeSpentMs[stageId] || 0) / 1000;
  const dwellScore = Math.min(25, (elapsedSeconds / 15) * 25);
  const briefsCount = engagement.reviewedBriefs[stageId]?.length || 0;
  const briefsScore = Math.min(25, briefsCount * 12.5);
  const capsCount = engagement.exploredCapabilities[stageId]?.length || 0;
  const capsScore = Math.min(25, (capsCount / 3) * 25);

  return Math.min(100, Math.round(stageInspectedScore + dwellScore + briefsScore + capsScore));
};

interface CAOInteractiveFrameworkProps {
  onOpenAssessment: () => void;
  selectedStage?: CAOStageId;
  onSelectStage?: (stage: CAOStageId) => void;
  enableAltitudeRoadmap?: boolean;
}

const getStageIndex = (stageId: CAOStageId): number => {
  if (stageId === 'creator') return 0;
  if (stageId === 'architect') return 1;
  return 2;
};

const getStageFromScroll = (progress: number): { stageId: CAOStageId; index: number } => {
  if (progress < 0.34) return { stageId: 'creator', index: 0 };
  if (progress < 0.68) return { stageId: 'architect', index: 1 };
  return { stageId: 'orchestrator', index: 2 };
};

export const CAOInteractiveFramework: React.FC<CAOInteractiveFrameworkProps> = ({
  onOpenAssessment,
  selectedStage: externalSelectedStage,
  onSelectStage,
  enableAltitudeRoadmap = false,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [internalStage, setInternalStage] = useState<CAOStageId>(
    enableAltitudeRoadmap ? 'creator' : 'architect'
  );
  const [interactionMode, setInteractionMode] = useState<'scroll' | 'manual'>('scroll');
  const [reachedStageIndex, setReachedStageIndex] = useState<number>(0);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(false);
  const [engagement, setEngagement] = useState<CAOEngagementState>(() =>
    loadEngagementState()
  );

  const selectedStage =
    externalSelectedStage !== undefined ? externalSelectedStage : internalStage;

  // Keep localStorage in sync whenever engagement updates
  useEffect(() => {
    saveEngagementState(engagement);
  }, [engagement]);

  // Observe whether the C.A.O. console is actively visible in viewport
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsSectionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsSectionVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Track active interaction time on the currently inspected stage while section & tab are visible
  useEffect(() => {
    if (!isSectionVisible) return;

    let lastTick = Date.now();
    const commitDelta = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        lastTick = Date.now();
        return;
      }
      const now = Date.now();
      const rawDelta = now - lastTick;
      lastTick = now;
      if (rawDelta <= 0) return;
      const boundedDelta = Math.min(rawDelta, 2500);

      setEngagement((prev) => ({
        ...prev,
        timeSpentMs: {
          ...prev.timeSpentMs,
          [selectedStage]: (prev.timeSpentMs[selectedStage] || 0) + boundedDelta,
        },
      }));
    };

    const intervalId = window.setInterval(commitDelta, 1000);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        commitDelta();
      } else {
        lastTick = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      commitDelta();
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isSectionVisible, selectedStage]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.78', 'end 0.55'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!enableAltitudeRoadmap || externalSelectedStage !== undefined) return;
    const { stageId, index } = getStageFromScroll(latest);
    setReachedStageIndex(index);
    if (interactionMode === 'scroll') {
      setInternalStage(stageId);
    }
  });

  const markStageInspected = useCallback((stageId: CAOStageId) => {
    setEngagement((prev) => {
      if (prev.inspectedStages.includes(stageId)) return prev;
      return {
        ...prev,
        inspectedStages: [...prev.inspectedStages, stageId],
      };
    });
  }, []);

  const handleStageChange = (stageId: CAOStageId) => {
    setInteractionMode('manual');
    setInternalStage(stageId);
    markStageInspected(stageId);
    if (onSelectStage) {
      onSelectStage(stageId);
    }
  };

  const handleToggleBriefReviewed = (
    stageId: CAOStageId,
    brief: 'opportunity' | 'risk'
  ) => {
    markStageInspected(stageId);
    setEngagement((prev) => {
      const current = prev.reviewedBriefs[stageId] || [];
      const exists = current.includes(brief);
      const next = exists ? current.filter((b) => b !== brief) : [...current, brief];
      return {
        ...prev,
        reviewedBriefs: {
          ...prev.reviewedBriefs,
          [stageId]: next,
        },
      };
    });
  };

  const handleToggleCapabilityExplored = (stageId: CAOStageId, cap: string) => {
    markStageInspected(stageId);
    setEngagement((prev) => {
      const current = prev.exploredCapabilities[stageId] || [];
      const exists = current.includes(cap);
      const next = exists ? current.filter((c) => c !== cap) : [...current, cap];
      return {
        ...prev,
        exploredCapabilities: {
          ...prev.exploredCapabilities,
          [stageId]: next,
        },
      };
    });
  };

  const handleResetEngagement = () => {
    setEngagement(DEFAULT_ENGAGEMENT_STATE);
    saveEngagementState(DEFAULT_ENGAGEMENT_STATE);
  };

  const handleResumeScrollSync = () => {
    setInteractionMode('scroll');
    const { stageId, index } = getStageFromScroll(scrollYProgress.get());
    setReachedStageIndex(index);
    setInternalStage(stageId);
  };

  const stages = [
    {
      id: 'creator' as const,
      name: 'CREATOR',
      actionVerb: 'Build',
      shortDesc: 'Turns ideas into working systems.',
      colorAccent: 'blue',
      activeRingClass:
        'border-blue-700 dark:border-blue-400 shadow-md ring-2 ring-blue-700/15 dark:ring-blue-400/20 bg-white dark:bg-[#111C35]',
      verbTextClass: 'text-blue-800 dark:text-blue-300',
      badgeClass: 'text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800/60',
      icon: Sparkles,
      capabilities: [
        'Implementation',
        'Experimentation',
        'Prototyping',
        'Technical depth',
        'Evaluation',
      ],
      cognitiveQuestion: 'How do I build this rapidly and reliably?',
      primaryRisk: 'Commoditization as frontier models automate syntax synthesis.',
      careerAltitude: 'Individual Contributor / Builder / Specialist',
    },
    {
      id: 'architect' as const,
      name: 'ARCHITECT',
      actionVerb: 'Design',
      shortDesc: 'Decides what should be built and how the system should work.',
      colorAccent: 'purple',
      activeRingClass:
        'border-purple-700 dark:border-purple-400 shadow-md ring-2 ring-purple-700/15 dark:ring-purple-400/20 bg-white dark:bg-[#111C35]',
      verbTextClass: 'text-purple-800 dark:text-purple-300',
      badgeClass: 'text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 border-purple-200 dark:border-purple-800/60',
      icon: Compass,
      capabilities: [
        'Systems thinking',
        'Trade-offs',
        'AI Product Sense',
        'Risk mitigation',
        'Business context',
        'How → What cognitive shift',
      ],
      cognitiveQuestion: 'What should be built, and what invariant boundaries protect it?',
      primaryRisk: 'Over-engineering without customer validation or empirical feedback.',
      careerAltitude: 'Staff Engineer / Systems Architect / Technical Lead',
    },
    {
      id: 'orchestrator' as const,
      name: 'ORCHESTRATOR',
      actionVerb: 'Lead',
      shortDesc: 'Coordinates AI, humans, systems, permissions, and outcomes.',
      colorAccent: 'emerald',
      activeRingClass:
        'border-emerald-700 dark:border-emerald-400 shadow-md ring-2 ring-emerald-700/15 dark:ring-emerald-400/20 bg-white dark:bg-[#111C35]',
      verbTextClass: 'text-emerald-800 dark:text-emerald-300',
      badgeClass: 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800/60',
      icon: ShieldCheck,
      capabilities: [
        'AI agents & multi-actor swarms',
        'Human-AI collaboration',
        'Authority boundaries (Agentic Diplomacy)',
        'Accountability & trust stewardship',
        'Strategic business outcomes',
        'Responsible automation',
      ],
      cognitiveQuestion: 'How do autonomous intelligence and human authority coordinate safely?',
      primaryRisk: 'Detaching from technical reality or failing to monitor agent degradation.',
      careerAltitude: 'Principal AI Engineer / VP Engineering / CTO / Founder',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="cao-console"
      className="py-24 bg-[#FAFAF7] dark:bg-[#070B14] relative transition-colors scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
            The Central Operating System
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] dark:text-white tracking-tight mb-4 text-balance">
            From Creator to Architect to Orchestrator
          </h2>
          <p className="text-base sm:text-lg text-[#475467] dark:text-slate-300 leading-relaxed">
            AI does not eliminate engineering. It expands the responsibility and altitude of the engineer.
          </p>
        </div>

        {/* Scroll-Triggered Progressive Horizontal SVG Altitude Roadmap */}
        {enableAltitudeRoadmap && (
          <>
            <CAOSvgRoadmap
              selectedStage={selectedStage}
              reachedStageIndex={
                externalSelectedStage !== undefined
                  ? getStageIndex(externalSelectedStage)
                  : reachedStageIndex
              }
              scrollProgress={scrollYProgress}
              interactionMode={interactionMode}
              onSelectStage={handleStageChange}
              onResumeScrollSync={handleResumeScrollSync}
            />

            {/* Architect & Orchestrator Journey Exploration Progress Panel */}
            {(() => {
              const architectPct = computeStageExplorationPercent('architect', engagement);
              const orchestratorPct = computeStageExplorationPercent('orchestrator', engagement);
              const totalTimeMs =
                (engagement.timeSpentMs.creator || 0) +
                (engagement.timeSpentMs.architect || 0) +
                (engagement.timeSpentMs.orchestrator || 0);
              const hasAnyProgress =
                totalTimeMs > 0 ||
                engagement.inspectedStages.length > 0 ||
                architectPct > 0 ||
                orchestratorPct > 0;

              return (
                <div
                  aria-label="Architect and Orchestrator journey exploration progress"
                  className="mb-10 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] p-4 sm:p-5 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#101828]/[0.07] dark:border-white/10">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#475467] dark:text-slate-400 font-semibold block">
                        Journey Exploration Progress
                      </span>
                      <p className="text-xs text-[#475467] dark:text-slate-300 mt-0.5">
                        Tracks your active clicks, time spent, and reviewed stage briefs across higher engineering altitudes.
                      </p>
                    </div>
                    {hasAnyProgress && (
                      <button
                        type="button"
                        onClick={handleResetEngagement}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-[#475467] dark:text-slate-300 border border-[#101828]/10 dark:border-white/15 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Architect Progress Meter */}
                    <div className="rounded-lg bg-[#FAF9F5] dark:bg-[#0A101F] border border-[#101828]/[0.07] dark:border-white/10 p-3.5 sm:p-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Compass className="w-4 h-4 text-purple-700 dark:text-purple-400 shrink-0" />
                          <span className="font-serif text-sm sm:text-base font-bold text-[#101828] dark:text-white truncate">
                            Architect Journey
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-800 dark:text-purple-300">
                            02 · Design
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-purple-800 dark:text-purple-300 tabular-nums shrink-0">
                          {architectPct}%
                        </span>
                      </div>

                      <div
                        role="progressbar"
                        aria-label="Architect journey explored percentage"
                        aria-valuenow={architectPct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="w-full h-2.5 rounded-full bg-[#101828]/10 dark:bg-white/10 overflow-hidden mb-2.5"
                      >
                        <div
                          style={{
                            width: `${architectPct}%`,
                            transition: prefersReducedMotion ? 'none' : 'width 300ms ease',
                          }}
                          className="h-full rounded-full bg-purple-600 dark:bg-purple-400"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#475467] dark:text-slate-400">
                        <span className="tabular-nums">
                          Time: {formatDuration(engagement.timeSpentMs.architect)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleStageChange('architect')}
                          className="font-semibold text-purple-800 dark:text-purple-300 hover:underline cursor-pointer"
                        >
                          {selectedStage === 'architect' ? 'Inspecting now' : 'Explore Architect →'}
                        </button>
                      </div>
                    </div>

                    {/* Orchestrator Progress Meter */}
                    <div className="rounded-lg bg-[#FAF9F5] dark:bg-[#0A101F] border border-[#101828]/[0.07] dark:border-white/10 p-3.5 sm:p-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                          <span className="font-serif text-sm sm:text-base font-bold text-[#101828] dark:text-white truncate">
                            Orchestrator Journey
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                            03 · Lead
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 tabular-nums shrink-0">
                          {orchestratorPct}%
                        </span>
                      </div>

                      <div
                        role="progressbar"
                        aria-label="Orchestrator journey explored percentage"
                        aria-valuenow={orchestratorPct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="w-full h-2.5 rounded-full bg-[#101828]/10 dark:bg-white/10 overflow-hidden mb-2.5"
                      >
                        <div
                          style={{
                            width: `${orchestratorPct}%`,
                            transition: prefersReducedMotion ? 'none' : 'width 300ms ease',
                          }}
                          className="h-full rounded-full bg-emerald-600 dark:bg-emerald-400"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#475467] dark:text-slate-400">
                        <span className="tabular-nums">
                          Time: {formatDuration(engagement.timeSpentMs.orchestrator)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleStageChange('orchestrator')}
                          className="font-semibold text-emerald-800 dark:text-emerald-300 hover:underline cursor-pointer"
                        >
                          {selectedStage === 'orchestrator' ? 'Inspecting now' : 'Explore Orchestrator →'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </>
        )}

        {/* 3 Connected Stages Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-12">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.id;
            return (
              <button
                type="button"
                key={stage.id}
                onClick={() => handleStageChange(stage.id)}
                aria-pressed={isSelected}
                className={`text-left p-6 sm:p-8 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between hover:-translate-y-0.5 duration-200 ${
                  isSelected
                    ? stage.activeRingClass
                    : 'border-[#101828]/10 dark:border-white/10 hover:border-[#101828]/30 dark:hover:border-white/20 shadow-xs bg-white dark:bg-[#0D1527]'
                }`}
              >
                {/* Connecting step indicator */}
                <div className="flex items-center justify-between mb-4 w-full text-xs font-mono">
                  <span className="font-semibold text-[#667085] dark:text-slate-400 tabular-nums">
                    Stage 0{idx + 1}
                  </span>
                  <span className={`font-semibold uppercase tracking-wider ${stage.verbTextClass}`}>
                    {stage.actionVerb}
                  </span>
                </div>

                <div className="w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#FAFAF7] dark:bg-[#131F3A] border border-[#101828]/10 dark:border-white/10 flex items-center justify-center text-[#101828] dark:text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                      {stage.name}
                    </h3>
                  </div>

                  <p className="text-sm text-[#475467] dark:text-slate-300 mb-6 font-medium">
                    {stage.shortDesc}
                  </p>

                  <div className="border-t border-[#101828]/[0.08] dark:border-white/10 pt-4 mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-[#475467] dark:text-slate-400 block mb-2">
                      Core Capabilities
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#101828] dark:text-slate-200">
                      {stage.capabilities.map((cap) => (
                        <li key={cap} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-800 dark:text-blue-400 shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="w-full mt-4 pt-3 border-t border-[#101828]/[0.06] dark:border-white/10 text-xs text-[#475467] dark:text-slate-400 flex items-center justify-between gap-2">
                  <span>{stage.careerAltitude}</span>
                  <span className={`font-semibold underline shrink-0 ${isSelected ? stage.verbTextClass : 'text-blue-900 dark:text-blue-400'}`}>
                    {isSelected ? 'Active' : 'Inspect'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Deep Dive Drawer */}
        {selectedStage && (() => {
          const activeStage = stages.find((s) => s.id === selectedStage)!;
          const activeTimeMs = engagement.timeSpentMs[selectedStage] || 0;
          const activePct = computeStageExplorationPercent(selectedStage, engagement);
          const reviewedBriefs = engagement.reviewedBriefs[selectedStage] || [];
          const exploredCaps = engagement.exploredCapabilities[selectedStage] || [];
          const isOpportunityReviewed = reviewedBriefs.includes('opportunity');
          const isRiskReviewed = reviewedBriefs.includes('risk');

          return (
            <div className="bg-[#FAF9F5] dark:bg-[#0A101F] border border-[#101828]/10 dark:border-white/10 rounded-xl p-6 sm:p-8 mb-16 shadow-xs">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#101828]/10 dark:border-white/10">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#475467] dark:text-slate-400">
                      Operating Altitude Deep Dive
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
                      The {activeStage.name} Paradigm
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Stage Detail Inspector: Time Spent Metric */}
                    <div
                      aria-label={`Time Spent on ${activeStage.name}`}
                      className="px-3.5 py-2 rounded-lg bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 flex items-center gap-2.5 shadow-2xs"
                    >
                      <Clock className="w-4 h-4 text-blue-800 dark:text-blue-400 shrink-0" />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#667085] dark:text-slate-400 block leading-none mb-1">
                          Time Spent
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-bold text-[#101828] dark:text-white tabular-nums leading-none">
                            {formatDuration(activeTimeMs)}
                          </span>
                          <span className="text-[10px] font-mono text-[#475467] dark:text-slate-400 tabular-nums leading-none">
                            · {activePct}% explored
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-[#475467] dark:text-slate-400 font-mono">
                      Guiding Question: <br className="hidden sm:block" />
                      <span className="text-[#101828] dark:text-white font-semibold font-serif text-sm italic">
                        "{activeStage.cognitiveQuestion}"
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
                  <div className="bg-white dark:bg-[#0D1527] p-5 rounded-lg border border-[#101828]/[0.08] dark:border-white/10 shadow-2xs flex flex-col justify-between">
                    <div>
                      <h5 className="font-semibold text-[#101828] dark:text-white mb-2 font-mono text-xs uppercase tracking-wider">
                        The AI Opportunity
                      </h5>
                      <p className="text-[#475467] dark:text-slate-300 leading-relaxed text-xs sm:text-sm mb-4">
                        {selectedStage === 'creator' && 'Leverage AI code generation tools to ship 5x faster, prototype ideas in hours rather than weeks, and explore multiple implementation strategies concurrently.'}
                        {selectedStage === 'architect' && 'Use models to simulate failure modes, generate adversarial regression tests, and explore trade-off matrices between latency, cost, and maintainability.'}
                        {selectedStage === 'orchestrator' && 'Deploy autonomous agent swarms that handle repetitive operations under strict cryptographic validation, while focusing human capital on high-stakes business strategy.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleBriefReviewed(selectedStage, 'opportunity')}
                      aria-pressed={isOpportunityReviewed}
                      className={`self-start inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono font-semibold border transition-colors cursor-pointer ${
                        isOpportunityReviewed
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600/30 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300'
                          : 'bg-[#FAFAF7] dark:bg-[#111C35] border-[#101828]/15 dark:border-white/15 text-[#475467] dark:text-slate-300 hover:border-[#101828]/30 dark:hover:border-white/30'
                      }`}
                    >
                      {isOpportunityReviewed ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Circle className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {isOpportunityReviewed ? 'Opportunity Reviewed' : 'Mark Opportunity Reviewed'}
                      </span>
                    </button>
                  </div>

                  <div className="bg-white dark:bg-[#0D1527] p-5 rounded-lg border border-[#101828]/[0.08] dark:border-white/10 shadow-2xs flex flex-col justify-between">
                    <div>
                      <h5 className="font-semibold text-rose-900 dark:text-rose-400 mb-2 font-mono text-xs uppercase tracking-wider">
                        The Primary Risk
                      </h5>
                      <p className="text-[#475467] dark:text-slate-300 leading-relaxed text-xs sm:text-sm mb-4">
                        {activeStage.primaryRisk}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleBriefReviewed(selectedStage, 'risk')}
                      aria-pressed={isRiskReviewed}
                      className={`self-start inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono font-semibold border transition-colors cursor-pointer ${
                        isRiskReviewed
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600/30 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300'
                          : 'bg-[#FAFAF7] dark:bg-[#111C35] border-[#101828]/15 dark:border-white/15 text-[#475467] dark:text-slate-300 hover:border-[#101828]/30 dark:hover:border-white/30'
                      }`}
                    >
                      {isRiskReviewed ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Circle className="w-3.5 h-3.5" />
                      )}
                      <span>{isRiskReviewed ? 'Risk Reviewed' : 'Mark Risk Reviewed'}</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Stage Competency Checkpoints */}
                <div className="bg-white dark:bg-[#0D1527] p-4 sm:p-5 rounded-lg border border-[#101828]/[0.08] dark:border-white/10 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 font-semibold">
                      Explore Core Competencies ({exploredCaps.length}/{activeStage.capabilities.length})
                    </span>
                    <span className="text-[11px] font-mono text-[#667085] dark:text-slate-400">
                      Click competencies to log your journey progress
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {activeStage.capabilities.map((cap) => {
                      const isDone = exploredCaps.includes(cap);
                      return (
                        <button
                          key={cap}
                          type="button"
                          onClick={() => handleToggleCapabilityExplored(selectedStage, cap)}
                          aria-pressed={isDone}
                          className={`text-left px-3 py-2 rounded-md border text-xs flex items-center gap-2 transition-colors cursor-pointer ${
                            isDone
                              ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-700/35 dark:border-blue-400/40 text-blue-950 dark:text-blue-200 font-semibold'
                              : 'bg-[#FAFAF7] dark:bg-[#0A101F] border-[#101828]/10 dark:border-white/10 text-[#344054] dark:text-slate-300 hover:border-[#101828]/30 dark:hover:border-white/25'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400 shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-[#98A2B3] dark:text-slate-500 shrink-0" />
                          )}
                          <span className="truncate">{cap}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Where Are You Today? Call to Action */}
        <div className="bg-[#101828] dark:bg-[#0D1527] text-white rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-md border border-transparent dark:border-white/10">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono block mb-2">
            Interactive Diagnostic
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Where are you today?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Most engineers operate with a blend of capabilities (e.g. 55% Creator, 30% Architect, 15% Orchestrator). Discover your current distribution and pinpoint your next career breakthrough.
          </p>
          <button
            onClick={onOpenAssessment}
            className="px-6 py-3 text-sm font-semibold tracking-wide text-[#101828] dark:text-[#070B14] bg-white rounded-md hover:bg-slate-100 transition-all shadow-sm hover:shadow inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Take the C.A.O. Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
