import React from 'react';
import { motion, MotionValue, useReducedMotion, useTransform } from 'motion/react';
import { Sparkles, Compass, ShieldCheck, RotateCcw, Check } from 'lucide-react';

export type CAOStageId = 'creator' | 'architect' | 'orchestrator';

interface RoadmapStageMeta {
  id: CAOStageId;
  step: string;
  label: string;
  verb: string;
  altitudeLabel: string;
  x: number;
  y: number;
  strokeHex: string;
  accentTextClass: string;
  activeCardClass: string;
  dotBgClass: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROADMAP_STAGES: RoadmapStageMeta[] = [
  {
    id: 'creator',
    step: '01',
    label: 'Creator',
    verb: 'Build',
    altitudeLabel: 'Implementation Altitude',
    x: 150,
    y: 104,
    strokeHex: '#2563EB',
    accentTextClass: 'text-blue-800 dark:text-blue-300',
    activeCardClass:
      'border-blue-600/50 dark:border-blue-400/60 bg-blue-50/70 dark:bg-blue-950/50 ring-2 ring-blue-600/15 dark:ring-blue-400/20',
    dotBgClass: 'bg-blue-600 dark:bg-blue-400',
    icon: Sparkles,
  },
  {
    id: 'architect',
    step: '02',
    label: 'Architect',
    verb: 'Design',
    altitudeLabel: 'Systems Altitude',
    x: 450,
    y: 66,
    strokeHex: '#7C3AED',
    accentTextClass: 'text-purple-800 dark:text-purple-300',
    activeCardClass:
      'border-purple-600/50 dark:border-purple-400/60 bg-purple-50/70 dark:bg-purple-950/50 ring-2 ring-purple-600/15 dark:ring-purple-400/20',
    dotBgClass: 'bg-purple-600 dark:bg-purple-400',
    icon: Compass,
  },
  {
    id: 'orchestrator',
    step: '03',
    label: 'Orchestrator',
    verb: 'Lead',
    altitudeLabel: 'Governance Altitude',
    x: 750,
    y: 28,
    strokeHex: '#059669',
    accentTextClass: 'text-emerald-800 dark:text-emerald-300',
    activeCardClass:
      'border-emerald-600/50 dark:border-emerald-400/60 bg-emerald-50/70 dark:bg-emerald-950/50 ring-2 ring-emerald-600/15 dark:ring-emerald-400/20',
    dotBgClass: 'bg-emerald-600 dark:bg-emerald-400',
    icon: ShieldCheck,
  },
];

const ALTITUDE_PATH_D =
  'M 150 104 C 265 104, 335 66, 450 66 C 565 66, 635 28, 750 28';

const ALTITUDE_AREA_D =
  'M 150 104 C 265 104, 335 66, 450 66 C 565 66, 635 28, 750 28 L 750 132 L 150 132 Z';

interface CAOSvgRoadmapProps {
  selectedStage: CAOStageId;
  reachedStageIndex: number;
  scrollProgress: MotionValue<number>;
  interactionMode: 'scroll' | 'manual';
  onSelectStage: (stageId: CAOStageId) => void;
  onResumeScrollSync: () => void;
}

export const CAOSvgRoadmap: React.FC<CAOSvgRoadmapProps> = ({
  selectedStage,
  reachedStageIndex,
  scrollProgress,
  interactionMode,
  onSelectStage,
  onResumeScrollSync,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const clampedPathLength = useTransform(scrollProgress, [0.04, 0.86], [0.08, 1], {
    clamp: true,
  });

  const activeStageMeta =
    ROADMAP_STAGES.find((s) => s.id === selectedStage) || ROADMAP_STAGES[0];
  const activeIndex = ROADMAP_STAGES.findIndex((s) => s.id === selectedStage);

  const handleSvgNodeKeyDown = (
    e: React.KeyboardEvent<SVGGElement>,
    stageId: CAOStageId
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectStage(stageId);
    }
  };

  return (
    <div
      aria-label="Interactive C.A.O. Operating Altitude Roadmap"
      className="mb-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 bg-white/85 dark:bg-[#0D1527]/90 shadow-xs overflow-hidden"
    >
      {/* Top Architectural Telemetry Strip */}
      <div className="px-4 sm:px-6 py-3 border-b border-[#101828]/[0.07] dark:border-white/10 flex flex-wrap items-center justify-between gap-2 bg-[#FAF9F5]/80 dark:bg-[#0A101F]/90">
        <div className="flex items-center gap-2.5 text-xs font-mono">
          <span className="uppercase tracking-widest text-[#475467] dark:text-slate-400 font-semibold">
            Altitude Trajectory
          </span>
          <span className="text-[#101828]/25 dark:text-white/20" aria-hidden="true">
            ·
          </span>
          <span className={`font-semibold tabular-nums ${activeStageMeta.accentTextClass}`}>
            {activeStageMeta.step} {activeStageMeta.label} ({activeStageMeta.verb})
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono">
          {interactionMode === 'manual' ? (
            <button
              type="button"
              onClick={onResumeScrollSync}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#101828]/15 dark:border-white/15 text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-blue-700 dark:text-blue-400" />
              <span>Pinned · Sync to scroll</span>
            </button>
          ) : (
            <span className="text-[#475467] dark:text-slate-400 tabular-nums">
              Scroll-synced · Stage {activeIndex + 1} of 3
            </span>
          )}
        </div>
      </div>

      {/* Progressive Horizontal SVG Altitude Canvas */}
      <div className="px-2 sm:px-6 pt-4 pb-3 sm:pt-5 sm:pb-4">
        <div className="w-full relative">
          <svg
            viewBox="0 0 900 144"
            className="w-full h-auto block overflow-visible select-none"
            role="img"
            aria-label="Ascending progression curve from Creator (Stage 01) through Architect (Stage 02) to Orchestrator (Stage 03)"
          >
            <defs>
              <linearGradient id="caoAltitudeStroke" x1="150" y1="104" x2="750" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="caoAltitudeAreaFill" x1="450" y1="28" x2="450" y2="132" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.13" />
                <stop offset="65%" stopColor="#7C3AED" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>
              <filter id="caoWaypointGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Hairline architectural elevation grid lines */}
            <g className="stroke-[#101828]/[0.07] dark:stroke-white/[0.08]" strokeWidth="1" strokeDasharray="3 5">
              <line x1="60" y1="28" x2="840" y2="28" />
              <line x1="60" y1="66" x2="840" y2="66" />
              <line x1="60" y1="104" x2="840" y2="104" />
            </g>
            <line
              x1="60"
              y1="132"
              x2="840"
              y2="132"
              className="stroke-[#101828]/10 dark:stroke-white/10"
              strokeWidth="1"
            />

            {/* Left elevation index labels (desktop legible) */}
            <g className="fill-[#667085] dark:fill-slate-500 text-[10px] font-mono hidden sm:inline">
              <text x="58" y="23">L3</text>
              <text x="58" y="61">L2</text>
              <text x="58" y="99">L1</text>
            </g>

            {/* Subtle area wash under trajectory */}
            <path d={ALTITUDE_AREA_D} fill="url(#caoAltitudeAreaFill)" />

            {/* Dormant background path */}
            <path
              d={ALTITUDE_PATH_D}
              fill="none"
              className="stroke-[#101828]/12 dark:stroke-white/15"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Illuminated scroll-progress trajectory */}
            <motion.path
              d={ALTITUDE_PATH_D}
              fill="none"
              stroke="url(#caoAltitudeStroke)"
              strokeWidth="4"
              strokeLinecap="round"
              style={
                prefersReducedMotion
                  ? undefined
                  : { pathLength: clampedPathLength }
              }
            />

            {/* Waypoint vertical anchor stems + concentric interactive SVG nodes */}
            {ROADMAP_STAGES.map((stage, idx) => {
              const isSelected = selectedStage === stage.id;
              const isReached =
                interactionMode === 'scroll'
                  ? idx <= reachedStageIndex
                  : idx <= activeIndex;

              return (
                <g key={stage.id}>
                  {/* Vertical drop stem aligning waypoint to stage trigger below */}
                  <line
                    x1={stage.x}
                    y1={stage.y + 14}
                    x2={stage.x}
                    y2="144"
                    stroke={isSelected || isReached ? stage.strokeHex : 'currentColor'}
                    strokeOpacity={isSelected ? 0.8 : isReached ? 0.35 : 0.14}
                    strokeWidth={isSelected ? 2 : 1.25}
                    strokeDasharray={isSelected ? undefined : '3 3'}
                    className={
                      isSelected || isReached
                        ? undefined
                        : 'text-[#101828] dark:text-white'
                    }
                  />

                  {/* Interactive SVG Waypoint Trigger */}
                  <g
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect Stage ${stage.step}: ${stage.label} — ${stage.verb}`}
                    aria-pressed={isSelected}
                    onClick={() => onSelectStage(stage.id)}
                    onKeyDown={(e) => handleSvgNodeKeyDown(e, stage.id)}
                    className="cursor-pointer focus:outline-none"
                  >
                    {/* Invisible generous 48px-equivalent hit circle */}
                    <circle cx={stage.x} cy={stage.y} r="24" fill="transparent" />

                    {/* Outer active halo ring */}
                    {isSelected && (
                      <circle
                        cx={stage.x}
                        cy={stage.y}
                        r="19"
                        fill={stage.strokeHex}
                        fillOpacity="0.14"
                        stroke={stage.strokeHex}
                        strokeOpacity="0.55"
                        strokeWidth="1.5"
                      />
                    )}

                    {/* Node ring body */}
                    <circle
                      cx={stage.x}
                      cy={stage.y}
                      r={isSelected ? 12 : 9.5}
                      fill={isSelected ? stage.strokeHex : '#FFFFFF'}
                      stroke={isSelected || isReached ? stage.strokeHex : '#94A3B8'}
                      strokeWidth={isSelected ? 2.5 : 2}
                      filter={isSelected ? 'url(#caoWaypointGlow)' : undefined}
                      className={!isSelected ? 'dark:fill-[#0D1527]' : undefined}
                    />

                    {/* Inner center core */}
                    <circle
                      cx={stage.x}
                      cy={stage.y}
                      r={isSelected ? 4 : 3.2}
                      fill={
                        isSelected
                          ? '#FFFFFF'
                          : isReached
                          ? stage.strokeHex
                          : '#94A3B8'
                      }
                    />
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Synchronized 3-Column Stage Anchor Strip (aligned 1:1 with SVG x=150, 450, 750) */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-4 mt-1">
          {ROADMAP_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.id;
            const isTraversed =
              interactionMode === 'scroll'
                ? idx < reachedStageIndex
                : idx < activeIndex;

            return (
              <button
                type="button"
                key={stage.id}
                onClick={() => onSelectStage(stage.id)}
                aria-pressed={isSelected}
                className={`min-h-[44px] px-2 sm:px-3.5 py-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                  isSelected
                    ? stage.activeCardClass
                    : isTraversed
                    ? 'border-[#101828]/15 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#111C35]/70 hover:border-[#101828]/30 dark:hover:border-white/25'
                    : 'border-[#101828]/10 dark:border-white/10 bg-[#FAFAF7]/70 dark:bg-[#0A101F]/70 hover:border-[#101828]/25 dark:hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? `${stage.dotBgClass} text-white dark:text-[#070B14]`
                        : 'bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 text-[#475467] dark:text-slate-300'
                    }`}
                  >
                    {isTraversed ? (
                      <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    ) : (
                      <Icon className="w-3.5 h-3.5" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono text-[#667085] dark:text-slate-400 tabular-nums hidden sm:inline">
                        {stage.step}
                      </span>
                      <span className="font-serif text-xs sm:text-sm font-bold text-[#101828] dark:text-white truncate">
                        {stage.label}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#475467] dark:text-slate-400 truncate hidden md:block">
                      {stage.altitudeLabel}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono uppercase tracking-wider font-semibold shrink-0 hidden sm:inline ${
                    isSelected
                      ? stage.accentTextClass
                      : 'text-[#667085] dark:text-slate-400'
                  }`}
                >
                  {stage.verb}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
