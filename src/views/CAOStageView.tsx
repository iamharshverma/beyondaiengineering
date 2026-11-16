import React, { useEffect } from 'react';
import { CAOStageId, PageId } from '../types';
import { CAO_STAGE_ORDER, CAO_STAGES } from '../data/caoStagesData';
import { updatePageSeo, CANONICAL_ORIGIN } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { SourceNote } from '../components/SourceNote';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Layers,
  AlertTriangle,
  Wrench,
} from 'lucide-react';

interface CAOStageViewProps {
  stageId: CAOStageId;
  onNavigate: (pageOrPath: PageId | string, param?: string) => void;
}

export const CAOStageView: React.FC<CAOStageViewProps> = ({ stageId, onNavigate }) => {
  const stage = CAO_STAGES[stageId] || CAO_STAGES.creator;

  useEffect(() => {
    updatePageSeo({
      title: stage.seoTitle,
      description: stage.seoDescription,
      canonicalPath: `/frameworks/${stage.id}`,
      ogType: 'article',
      schemaType: 'TechArticle',
      keywords: [
        'C.A.O. Framework',
        stage.shortLabel,
        `${stage.shortLabel} Stage`,
        'Beyond AI Engineering',
        'Harsh Verma',
      ],
      articleData: {
        headline: stage.title,
        description: stage.seoDescription,
        publishDate: '2026-10-15',
        modifiedDate: '2026-11-15',
        section: `C.A.O. Framework · Stage ${stage.stageNumber}`,
      },
      frameworkData: {
        id: stage.id,
        name: `${stage.shortLabel} Stage (C.A.O. Framework)`,
        subtitle: stage.subtitle,
        category: 'core',
        caoPhase: stage.shortLabel,
        definition: stage.definition,
      },
      breadcrumbs: [
        { name: 'C.A.O. Framework', path: '/cao-framework' },
        { name: `${stage.stageNumber}. ${stage.shortLabel}`, path: `/frameworks/${stage.id}` },
      ],
    });
  }, [stage]);

  const stageEntityUrl = `${CANONICAL_ORIGIN}/frameworks/${stage.id}`;

  return (
    <div className="pb-24">
      {/* Persistent Top C.A.O. Stage Switcher Navigation */}
      <div className="border-b border-[#101828]/[0.08] dark:border-white/10 bg-white/75 dark:bg-[#0D1527]/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onNavigate('/cao-framework')}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-[#101828]/5 dark:hover:bg-white/5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Overview
            </button>
            <span className="text-[#98A2B3]" aria-hidden="true">
              /
            </span>
            {CAO_STAGE_ORDER.map((id) => {
              const item = CAO_STAGES[id];
              const isActive = id === stage.id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onNavigate(`/frameworks/${id}`)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] font-semibold'
                      : 'text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-[#101828]/5 dark:hover:bg-white/5'
                  }`}
                >
                  {item.stageNumber}. {item.shortLabel}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              trackEvent('assessment_started', { source: `cao_stage_${stage.id}_switcher` });
              onNavigate('/assessment');
            }}
            className="px-3.5 py-1.5 rounded-md bg-blue-900 dark:bg-blue-500 text-white dark:text-[#070B14] text-xs font-semibold hover:bg-blue-950 dark:hover:bg-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Activity className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Take C.A.O. Assessment</span>
          </button>
        </div>
      </div>

      {/* Editorial Header */}
      <header className="pt-10 sm:pt-14 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
            <span className="font-semibold text-blue-900 dark:text-blue-300">
              C.A.O. Stage {stage.stageNumber}
            </span>
            <span aria-hidden="true">·</span>
            <span>Primary Mode: {stage.verb}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{stage.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] dark:text-white text-balance leading-[1.12]">
            {stage.headline}
          </h1>

          <p className="text-base sm:text-lg text-[#475467] dark:text-slate-300 leading-relaxed max-w-3xl">
            {stage.subtitle}
          </p>

          <div className="pt-3 border-t border-[#101828]/[0.08] dark:border-white/10 max-w-3xl">
            <p className="font-serif italic text-lg sm:text-xl text-blue-950 dark:text-blue-200">
              Core Question: “{stage.coreQuestion}”
            </p>
          </div>
        </div>
      </header>

      {/* Main Two-Column Asymmetric Editorial Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Editorial Long-Form Column */}
        <article className="lg:col-span-8 space-y-12 max-w-3xl">
          {/* 1. Definition & Why It Matters */}
          <section id="definition" className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              Definition & Why This Mode Matters Now
            </h2>
            <p className="text-base text-[#101828]/90 dark:text-slate-200 leading-relaxed">
              {stage.definition}
            </p>
            <div className="space-y-3 pt-2">
              {stage.whyItMatters.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base text-[#475467] dark:text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <SourceNote
              sourceId="cao-evolution-thesis"
              compact
              entityId={`${stageEntityUrl}#term`}
              articleId={`${stageEntityUrl}#article`}
              entityName={stage.title}
              entityUrl={stageEntityUrl}
            />
          </section>

          <hr className="border-[#101828]/10 dark:border-white/10" />

          {/* 2. Core Responsibilities */}
          <section id="responsibilities" className="space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              Core Engineering Responsibilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stage.coreResponsibilities.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-2"
                >
                  <div className="text-xs font-mono tabular-nums text-blue-900 dark:text-blue-400 font-semibold">
                    0{idx + 1}. Responsibility
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#101828] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-[#101828]/10 dark:border-white/10" />

          {/* 3. Essential Competencies */}
          <section id="competencies" className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              Essential Competencies
            </h2>
            <dl className="divide-y divide-[#101828]/10 dark:divide-white/10 border-y border-[#101828]/10 dark:border-white/10">
              {stage.essentialCompetencies.map((comp) => (
                <div key={comp.name} className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
                  <dt className="sm:col-span-4 font-serif font-bold text-base text-[#101828] dark:text-white">
                    {comp.name}
                  </dt>
                  <dd className="sm:col-span-8 text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                    {comp.descriptor}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <hr className="border-[#101828]/10 dark:border-white/10" />

          {/* 4. How AI Changes the Work */}
          <section id="ai-shift" className="space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              How AI Shifts Time Allocation in This Stage
            </h2>
            <div className="space-y-4">
              {stage.howAiChangesTheWork.map((row, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#11192E] space-y-3 text-sm"
                >
                  <div>
                    <span className="font-mono text-xs text-[#475467] dark:text-slate-400">
                      Before Agentic Workflows
                    </span>
                    <p className="text-[#101828] dark:text-slate-200 mt-0.5">{row.beforeAi}</p>
                  </div>
                  <div className="pt-2 border-t border-[#101828]/10 dark:border-white/10">
                    <span className="font-mono text-xs text-blue-900 dark:text-blue-400">
                      With Coding & Reasoning Agents
                    </span>
                    <p className="text-[#101828] dark:text-slate-200 mt-0.5">{row.withAi}</p>
                  </div>
                  <div className="pt-2 border-t border-[#101828]/10 dark:border-white/10">
                    <span className="font-mono text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                      Enduring Human Value
                    </span>
                    <p className="text-[#101828] dark:text-white font-medium mt-0.5">
                      {row.enduringHumanEdge}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-[#101828]/10 dark:border-white/10" />

          {/* 5. Practical Engineering Scenarios */}
          <section id="scenarios" className="space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              Practical Engineering Scenarios
            </h2>
            <div className="space-y-4">
              {stage.practicalScenarios.map((sc) => (
                <div
                  key={sc.title}
                  className="p-5 sm:p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-3"
                >
                  <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                    {sc.title}
                  </h3>
                  <p className="text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                    <strong className="text-[#101828] dark:text-white">Situation:</strong> {sc.situation}
                  </p>
                  <p className="text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                    <strong className="text-blue-900 dark:text-blue-300">{stage.shortLabel} Move:</strong>{' '}
                    {sc.stageMove}
                  </p>
                  <p className="text-sm text-emerald-900 dark:text-emerald-300 font-medium leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Outcome: {sc.outcome}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-[#101828]/10 dark:border-white/10" />

          {/* 6. Typical Mistakes + Realistic Example with SourceNote */}
          <section id="mistakes" className="space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              Typical Failure Modes & Realistic Case Grounding
            </h2>
            <div className="space-y-4">
              {stage.typicalMistakes.map((m) => (
                <div
                  key={m.mistake}
                  className="p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-2"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-300">
                    <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Pitfall: {m.mistake}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300">
                    <strong className="text-[#101828] dark:text-white">Risk:</strong> {m.consequence}
                  </p>
                  <p className="text-xs sm:text-sm text-[#101828] dark:text-slate-200">
                    <strong className="text-emerald-800 dark:text-emerald-300">Correction:</strong> {m.correction}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl border border-[#101828]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#11192E] space-y-3">
              <div className="text-xs font-mono text-[#475467] dark:text-slate-400">
                Anchored Case Example
              </div>
              <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                {stage.realisticExample.title}
              </h3>
              <p className="text-sm text-[#101828]/90 dark:text-slate-200 leading-relaxed">
                {stage.realisticExample.narrative}
              </p>
              <SourceNote
                sourceId={stage.realisticExample.sourceId}
                compact
                entityId={`${stageEntityUrl}#term`}
                articleId={`${stageEntityUrl}#article`}
                entityName={stage.title}
                entityUrl={stageEntityUrl}
              />
            </div>
          </section>

          <hr className="border-[#101828]/10 dark:border-white/10" />

          {/* 7. Practical Exercises */}
          <section id="exercises" className="space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              Practical Self-Development Exercises
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stage.practicalExercises.map((ex, idx) => (
                <div
                  key={ex.title}
                  className="p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-[#475467] dark:text-slate-400 tabular-nums">
                      Exercise 0{idx + 1} · {ex.duration}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#101828] dark:text-white">
                      {ex.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                      {ex.prompt}
                    </p>
                  </div>
                  <p className="pt-3 border-t border-[#101828]/10 dark:border-white/10 text-xs text-[#101828] dark:text-slate-200">
                    <strong>Output Artifact:</strong> {ex.deliverable}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Stage Navigation */}
          <nav
            aria-label="Adjacent C.A.O. stage navigation"
            className="pt-8 border-t border-[#101828]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4"
          >
            {stage.prevStageId ? (
              <button
                type="button"
                onClick={() => onNavigate(`/frameworks/${stage.prevStageId}`)}
                className="px-4 py-2.5 rounded-lg border border-[#101828]/15 dark:border-white/15 bg-white dark:bg-[#0D1527] text-xs font-semibold text-[#101828] dark:text-white hover:border-blue-900 dark:hover:border-blue-400 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Previous: {stage.prevStageLabel}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate('/cao-framework')}
                className="px-4 py-2.5 rounded-lg border border-[#101828]/15 dark:border-white/15 bg-white dark:bg-[#0D1527] text-xs font-semibold text-[#101828] dark:text-white hover:border-blue-900 dark:hover:border-blue-400 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to C.A.O. Overview</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigate(`/frameworks/${stage.nextStageId}`)}
              className="px-5 py-2.5 rounded-lg bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Next: {stage.nextStageLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </nav>
        </article>

        {/* Right Sticky Margin Rail: Chapters, Workspaces, Diagnostic */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Related Companion Workspaces */}
            <div className="p-5 sm:p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 dark:text-blue-300">
                <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Interactive Companion Workspaces</span>
              </div>
              <div className="space-y-3 divide-y divide-[#101828]/10 dark:divide-white/10">
                {stage.relatedResources.map((res, idx) => (
                  <div key={res.slug} className={idx > 0 ? 'pt-3' : ''}>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/resources/${res.slug}`)}
                      className="text-left group cursor-pointer w-full"
                    >
                      <span className="font-serif font-bold text-sm text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 inline-flex items-center gap-1.5">
                        <span>{res.title}</span>
                        <ArrowRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                      <p className="text-xs text-[#475467] dark:text-slate-400 mt-1 leading-relaxed">
                        {res.whyUseIt}
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Book Chapters */}
            <div className="p-5 sm:p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#11192E] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#101828] dark:text-white">
                <BookOpen className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" aria-hidden="true" />
                <span>Aligned Chapters in Beyond AI Engineering</span>
              </div>
              <ul className="space-y-3 text-xs">
                {stage.relatedChapters.map((ch) => (
                  <li key={ch.chapter} className="space-y-0.5">
                    <div className="font-semibold text-[#101828] dark:text-white font-mono tabular-nums">
                      Chapter {ch.chapter}: {ch.title}
                    </div>
                    <p className="text-[#475467] dark:text-slate-300 leading-relaxed">{ch.relevance}</p>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('/book')}
                className="text-xs font-semibold text-blue-900 dark:text-blue-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Browse full 11-chapter map</span>
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>

            {/* Assessment Callout */}
            <div className="p-5 sm:p-6 rounded-xl border border-blue-900/20 dark:border-blue-400/20 bg-white dark:bg-[#0D1527] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-900 dark:text-blue-300">
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Check Your Own Balance</span>
              </div>
              <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                Measure your current Creator, Architect, and Orchestrator distribution across 15 practical engineering behaviors and get a 7/30/90-day transition plan.
              </p>
              <button
                type="button"
                onClick={() => {
                  trackEvent('assessment_started', { source: `cao_stage_${stage.id}_sidebar` });
                  onNavigate('/assessment');
                }}
                className="w-full px-4 py-2.5 rounded-lg bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Start 15-Item C.A.O. Assessment</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
