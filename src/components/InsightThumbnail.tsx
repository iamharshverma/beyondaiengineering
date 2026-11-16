import React, { useMemo, useState } from 'react';
import { InsightItem, InsightPillar } from '../data/insightsData';
import systemsArchThumb from '../assets/images/insights_systems_arch_1794789372486.jpg';
import agenticAiThumb from '../assets/images/insights_agentic_ai_1794789371938.jpg';
import careersCodeThumb from '../assets/images/insights_careers_code_1794789372869.jpg';
import governanceTrustThumb from '../assets/images/insights_governance_trust_1794789374345.jpg';
import forbesExecThumb from '../assets/images/insights_forbes_executive_1794789373863.jpg';

interface InsightThumbnailProps {
  item: InsightItem;
  index: number;
  variant?: 'lead' | 'wide' | 'card';
  priority?: boolean;
}

const PILLAR_ARTWORK_MAP: Record<InsightPillar, string[]> = {
  'Systems & Architecture': [
    systemsArchThumb,
    '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
    '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-1_9c345933.png',
  ],
  'Agentic AI': [
    agenticAiThumb,
    '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png',
    '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png',
  ],
  'Careers After Code': [
    careersCodeThumb,
    '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-6_eb2b1261.png',
    '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-5_dbbc71eb.png',
  ],
  'Governance & Ethics': [
    governanceTrustThumb,
    '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-4_ef9211f1.png',
    '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_06_PM-7_54b9a7c1.png',
  ],
  'Forbes & Media': [
    forbesExecThumb,
    '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png',
    '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_08_PM-10_e9c069eb.png',
  ],
};

const FRAMEWORK_ARTWORK_MAP: Record<string, string> = {
  'cao-framework': agenticAiThumb,
  'trust-economy': governanceTrustThumb,
  'how-to-what': systemsArchThumb,
  'prompt-empathy': agenticAiThumb,
  'agentic-diplomacy': governanceTrustThumb,
  'human-api': governanceTrustThumb,
  'ai-product-sense': systemsArchThumb,
  'ethical-curation': governanceTrustThumb,
  'unlearn-relearn': careersCodeThumb,
  'digital-paper-trail': careersCodeThumb,
  'micro-community': forbesExecThumb,
  'proof-of-work': careersCodeThumb,
};

function hashSlug(slug: string): number {
  let hash = 2166136261;
  for (let i = 0; i < slug.length; i += 1) {
    hash ^= slug.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Generates a compact, unique geometric SVG micro-schematic stamped on each
 * editorial thumbnail frame based on pillar topology & deterministic slug seed.
 */
const EditorialSchematicMark: React.FC<{ pillar: InsightPillar; seed: number }> = ({
  pillar,
  seed,
}) => {
  const stepA = 10 + (seed % 14);
  const stepB = 14 + ((seed >> 4) % 14);
  const stepC = 8 + ((seed >> 8) % 16);
  const nodeX = 14 + (seed % 20);
  const nodeY = 14 + ((seed >> 5) % 16);

  if (pillar === 'Agentic AI') {
    return (
      <svg
        viewBox="0 0 48 48"
        className="w-9 h-9 text-white/85"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <line x1="24" y1="6" x2={nodeX} y2={nodeY} stroke="currentColor" strokeWidth="1" />
        <circle cx={nodeX} cy={nodeY} r="2.2" fill="currentColor" />
        <circle cx="34" cy="30" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (pillar === 'Governance & Ethics') {
    return (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white/85" aria-hidden="true">
        <rect x="8" y="8" width="32" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="12" y1="24" x2="36" y2="24" stroke="currentColor" strokeWidth="1.2" />
        <circle cx={nodeX} cy="24" r="2.5" fill="currentColor" />
        <path d="M24 12 L24 36" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      </svg>
    );
  }

  if (pillar === 'Careers After Code') {
    return (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white/85" aria-hidden="true">
        <rect x="9" y={40 - stepA} width="7" height={stepA} fill="currentColor" opacity="0.5" />
        <rect x="20" y={40 - stepB} width="7" height={stepB} fill="currentColor" opacity="0.75" />
        <rect x="31" y={40 - stepC - 8} width="7" height={stepC + 8} fill="currentColor" />
      </svg>
    );
  }

  if (pillar === 'Forbes & Media') {
    return (
      <svg viewBox="0 0 48 48" className="w-9 h-9 text-white/85" aria-hidden="true">
        <line x1="8" y1="14" x2="40" y2="14" stroke="currentColor" strokeWidth="1.2" />
        <line x1="8" y1="24" x2={24 + (seed % 14)} y2="24" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        <line x1="8" y1="34" x2="34" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <circle cx="38" cy="34" r="2.2" fill="currentColor" />
      </svg>
    );
  }

  // Systems & Architecture
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9 text-white/85" aria-hidden="true">
      <polygon points="24,8 40,17 24,26 8,17" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <polyline points="8,24 24,33 40,24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.8" />
      <polyline points="8,31 24,40 40,31" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx={nodeX} cy="17" r="1.8" fill="currentColor" />
    </svg>
  );
};

export const InsightThumbnail: React.FC<InsightThumbnailProps> = ({
  item,
  index,
  variant = 'card',
  priority = false,
}) => {
  const seed = useMemo(() => hashSlug(item.slug), [item.slug]);

  const localFallbackSrc = useMemo(() => {
    if (variant === 'lead') {
      return PILLAR_ARTWORK_MAP[item.pillar][0];
    }
    const pillarPool = PILLAR_ARTWORK_MAP[item.pillar];
    const fwArt = FRAMEWORK_ARTWORK_MAP[item.relatedFrameworkId];
    const combinedPool = fwArt ? [pillarPool[0], fwArt, ...pillarPool.slice(1)] : pillarPool;
    return combinedPool[seed % combinedPool.length];
  }, [item.pillar, item.relatedFrameworkId, seed, variant]);

  const [fallbackLevel, setFallbackLevel] = useState<0 | 1 | 2>(0);

  const primaryExternal =
    item.img && !item.img.startsWith('/assets/') && !item.img.startsWith('/src/')
      ? item.img
      : null;

  const activeSrc =
    fallbackLevel === 0
      ? item.img || localFallbackSrc
      : fallbackLevel === 1
      ? localFallbackSrc
      : null;

  const aspectClass =
    variant === 'lead'
      ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[260px]'
      : variant === 'wide'
      ? 'aspect-[2/1]'
      : seed % 3 === 0
      ? 'aspect-[4/3]'
      : 'aspect-[16/9]';

  const entryNumber = String(index + 1).padStart(2, '0');
  const highlightMetric = item.benchmarks?.[0];

  const handleImageError = () => {
    if (fallbackLevel === 0 && primaryExternal && localFallbackSrc !== primaryExternal) {
      setFallbackLevel(1);
    } else {
      setFallbackLevel(2);
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border border-[#101828]/[0.08] dark:border-white/10 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0B1120] select-none ${aspectClass}`}
    >
      {activeSrc ? (
        <img
          src={activeSrc}
          alt={`${item.title} — ${item.pillar} editorial illustration`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="w-full h-full bg-gradient-to-br from-[#101828] via-[#1E3A8A] to-[#0F172A]"
        />
      )}

      {/* Measured contrast scrim for crisp archival captions */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#070B14]/85 via-[#070B14]/25 to-[#070B14]/20 pointer-events-none"
      />

      {/* Deterministic SVG architectural schematic in upper-right frame */}
      <div className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-[#070B14]/45 border border-white/15 backdrop-blur-[2px] pointer-events-none">
        <EditorialSchematicMark pillar={item.pillar} seed={seed} />
      </div>

      {/* Unboxed archival caption strip */}
      <div className="absolute inset-x-3 bottom-2.5 flex items-end justify-between gap-2 text-[11px] font-mono text-white/95 pointer-events-none">
        <span className="truncate">
          Fig. {entryNumber} · {item.syndicatedPlatform}
        </span>
        {highlightMetric && (
          <span className="tabular-nums font-semibold text-blue-200 whitespace-nowrap shrink-0">
            {highlightMetric.value}
          </span>
        )}
      </div>
    </div>
  );
};
