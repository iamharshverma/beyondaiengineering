import React, { useEffect, useState } from 'react';
import { PageId } from '../types';
import {
  AUDIENCE_JOURNEYS,
  AUDIENCE_JOURNEY_ORDER,
  AudienceJourneySlug,
} from '../data/journeysData';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { SourceNote } from '../components/SourceNote';
import {
  Activity,
  ArrowRight,
  Check,
  CheckSquare,
  Compass,
  Copy,
  Layers,
  Square,
  Wrench,
} from 'lucide-react';

interface JourneyViewProps {
  journeySlug: AudienceJourneySlug;
  onNavigate: (pageOrPath: PageId | string, param?: string) => void;
  onOpenBuyModal: () => void;
}

export const JourneyView: React.FC<JourneyViewProps> = ({
  journeySlug,
  onNavigate,
  onOpenBuyModal,
}) => {
  const journey = AUDIENCE_JOURNEYS[journeySlug] || AUDIENCE_JOURNEYS['working-engineers'];
  const storageKey = `beyond_ai_journey_checklist_${journey.slug}`;

  const [checked, setChecked] = useState<number[]>([0]);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setChecked(saved ? (JSON.parse(saved) as number[]) : [0]);
    } catch {
      setChecked([0]);
    }

    trackEvent('audience_journey_started', {
      journeySlug: journey.slug,
      step: 'landing',
    });
  }, [storageKey, journey.slug]);

  useEffect(() => {
    const ogImg =
      journey.slug === 'students'
        ? PAGE_OG_IMAGES.students
        : journey.slug === 'technical-leaders'
        ? PAGE_OG_IMAGES.organizations
        : PAGE_OG_IMAGES.engineers;

    updatePageSeo({
      title: journey.seoTitle,
      description: journey.seoDescription,
      canonicalPath: `/journeys/${journey.slug}`,
      ogType: 'article',
      ogImage: ogImg,
      schemaType: 'Article',
      articleData: {
        headline: journey.headline,
        description: journey.seoDescription,
        publishDate: '2026-10-15',
        modifiedDate: '2026-11-15',
        section: journey.shortLabel,
      },
      breadcrumbs: [
        { name: `Journey: ${journey.shortLabel}`, path: `/journeys/${journey.slug}` },
      ],
    });
  }, [journey]);

  const toggleChecklist = (idx: number) => {
    const next = checked.includes(idx)
      ? checked.filter((i) => i !== idx)
      : [...checked, idx];
    setChecked(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}
    trackEvent('audience_journey_started', {
      journeySlug: journey.slug,
      step: `checklist_${next.length}_of_${journey.checklistItems.length}`,
    });
  };

  const handleCopyTemplate = () => {
    if (!journey.outreachTemplate) return;
    navigator.clipboard?.writeText(journey.outreachTemplate.content);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2400);
  };

  return (
    <div className="pb-24">
      {/* Persistent Top Audience Journey Switcher */}
      <div className="border-b border-[#101828]/[0.08] dark:border-white/10 bg-white/75 dark:bg-[#0D1527]/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {AUDIENCE_JOURNEY_ORDER.map((slug) => {
              const item = AUDIENCE_JOURNEYS[slug];
              const isActive = slug === journey.slug;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => onNavigate(`/journeys/${slug}`)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] font-semibold'
                      : 'text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-[#101828]/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.shortLabel}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/assessment')}
            className="px-3.5 py-1.5 rounded-md bg-blue-900 dark:bg-blue-500 text-white dark:text-[#070B14] text-xs font-semibold hover:bg-blue-950 dark:hover:bg-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Activity className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Take C.A.O. Assessment</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="pt-10 sm:pt-14 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl space-y-4">
          <span className="text-xs font-mono font-semibold text-blue-900 dark:text-blue-300 block">
            {journey.kicker}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] dark:text-white text-balance leading-[1.12]">
            {journey.headline}
          </h1>

          <p className="font-serif text-lg sm:text-2xl italic text-blue-950 dark:text-blue-200 leading-relaxed">
            “{journey.quote}”
          </p>

          <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 max-w-3xl leading-relaxed">
            {journey.description}
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/assessment')}
              className="px-5 py-2.5 rounded-lg bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Start With C.A.O. Assessment</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(`/frameworks/${journey.primaryStageFocus}`)}
              className="px-4 py-2.5 rounded-lg border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0D1527] text-xs font-semibold text-[#101828] dark:text-white hover:border-blue-900 dark:hover:border-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" aria-hidden="true" />
              <span>Explore {journey.primaryStageFocus.toUpperCase()} Stage Guide</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Core Shifts / Tensions */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
              Diagnosis Before Tactics
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              {journey.coreTensionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {journey.coreTensions.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#475467] dark:text-slate-400 tabular-nums block">
                    0{idx + 1}. Common Trap
                  </span>
                  <p className="text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                    {t.symptom}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#101828]/10 dark:border-white/10">
                  <span className="font-mono text-xs text-blue-900 dark:text-blue-300 font-semibold block mb-1">
                    C.A.O. Reframe
                  </span>
                  <p className="text-sm font-medium text-[#101828] dark:text-white leading-relaxed">
                    {t.reframe}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <SourceNote sourceId={journey.sourceId} compact />
        </section>

        {/* Recommended 4-Step Platform Sequence */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
              Curated Pathway
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              Your Recommended 4-Step Sequence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {journey.recommendedSequence.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#11192E] flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-blue-900 dark:text-blue-400 tabular-nums">
                      Step {step.stepNumber}
                    </span>
                    <span className="text-[#475467] dark:text-slate-400">{step.phaseLabel}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#101828] dark:text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(step.targetPath)}
                  className="text-xs font-semibold text-blue-900 dark:text-blue-300 hover:underline inline-flex items-center gap-1 cursor-pointer text-left"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Checklist + Highlighted Companion Workspaces (+ Student Outreach) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Role Checklist */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-semibold text-blue-900 dark:text-blue-400 block mb-1">
                  Interactive Self-Check (Saved Locally)
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                  {journey.checklistTitle}
                </h2>
              </div>
              <span className="text-xs font-mono font-bold tabular-nums text-[#101828] dark:text-white">
                {checked.length}/{journey.checklistItems.length}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              {journey.checklistSubtitle}
            </p>

            <div className="space-y-2.5">
              {journey.checklistItems.map((item, idx) => {
                const isDone = checked.includes(idx);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleChecklist(idx)}
                    className={`w-full p-3.5 rounded-lg border text-left text-xs sm:text-sm flex items-start gap-2.5 transition-colors cursor-pointer ${
                      isDone
                        ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60 text-[#101828] dark:text-white'
                        : 'bg-[#FAFAF7] dark:bg-[#11192E] border-[#101828]/[0.08] dark:border-white/10 text-[#475467] dark:text-slate-300'
                    }`}
                  >
                    {isDone ? (
                      <CheckSquare className="w-4 h-4 text-blue-900 dark:text-blue-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Matched Workspaces + Optional Student Outreach Template */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 dark:text-blue-300">
                <Wrench className="w-4 h-4" aria-hidden="true" />
                <span>Recommended Interactive Workspaces</span>
              </div>
              <div className="space-y-3 divide-y divide-[#101828]/10 dark:divide-white/10">
                {journey.highlightedResources.map((res, idx) => (
                  <div key={res.slug} className={idx > 0 ? 'pt-3' : ''}>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/resources/${res.slug}`)}
                      className="text-left group w-full cursor-pointer"
                    >
                      <span className="font-serif font-bold text-lg text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 inline-flex items-center gap-1.5">
                        <span>{res.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                      <p className="text-xs text-[#475467] dark:text-slate-300 mt-1">{res.why}</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {journey.outreachTemplate ? (
              <div className="p-6 sm:p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-blue-900 dark:text-blue-300 font-semibold block mb-0.5">
                      Chapter 11 Playbook
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                      {journey.outreachTemplate.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyTemplate}
                    className="px-3 py-1.5 rounded-md bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTemplate ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs text-[#475467] dark:text-slate-300">
                  {journey.outreachTemplate.subtitle}
                </p>
                <pre className="p-4 rounded-xl bg-[#FAFAF7] dark:bg-[#11192E] border border-[#101828]/10 dark:border-white/10 text-[11px] font-mono text-[#101828] dark:text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {journey.outreachTemplate.content}
                </pre>
              </div>
            ) : (
              <div className="p-6 sm:p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#11192E] space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                  Read the Complete Book Edition
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                  Explore all 11 chapters, 12 frameworks, and organizational playbooks inside <em>Beyond AI Engineering</em> by Harsh Verma.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => onNavigate('/book/sample')}
                    className="px-4 py-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0D1527] text-xs font-semibold text-[#101828] dark:text-white cursor-pointer"
                  >
                    Read Free Sample Chapters
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('book_cta_click', { location: `journey_${journey.slug}` });
                      onOpenBuyModal();
                    }}
                    className="px-4 py-2 rounded-md bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold cursor-pointer"
                  >
                    Get the Book
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
