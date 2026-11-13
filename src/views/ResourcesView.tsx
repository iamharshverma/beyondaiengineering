import React, { useState, useMemo } from 'react';
import { PageId, LabResource } from '../types';
import { LAB_RESOURCES } from '../data/resourcesData';
import { trackEvent } from '../utils/analytics';
import { ArrowRight, FileText, Wrench, Clock, Download, Maximize2, Search } from 'lucide-react';

interface ResourcesViewProps {
  onNavigate: (page: PageId) => void;
  onOpenCanvas: (resource: LabResource) => void;
  onOpenAssessment: () => void;
  onOpenInfographicModal?: (infographicId?: string) => void;
}

const PILLARS = [
  'All Pillars',
  'Career Resources',
  'AI Engineering Resources',
  'Student Resources',
] as const;

const CATEGORIES = ['ALL', 'ASSESS', 'BUILD', 'LEAD', 'GROW', 'EXECUTE'] as const;

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  onNavigate,
  onOpenCanvas,
  onOpenAssessment,
  onOpenInfographicModal,
}) => {
  const [activePillar, setActivePillar] = useState<string>('All Pillars');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return LAB_RESOURCES.filter((r) => {
      const matchesPillar = activePillar === 'All Pillars' || r.pillar === activePillar;
      const matchesCat = activeCategory === 'ALL' || r.category === activeCategory;
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.artifactProduced.toLowerCase().includes(q) ||
        (r.relatedChapter && r.relatedChapter.toLowerCase().includes(q));
      return matchesPillar && matchesCat && matchesSearch;
    });
  }, [activePillar, activeCategory, searchQuery]);

  const handleDownloadResource = (res: LabResource) => {
    trackEvent('resource_download', { resourceId: res.id, title: res.title });
    const fieldsText = res.defaultFields
      ? Object.entries(res.defaultFields)
          .map(([k, v]) => `## ${k}\n${v}\n`)
          .join('\n')
      : '';

    const content = `# ${res.title}
Category: ${res.category}${res.pillar ? ` · ${res.pillar}` : ''}
${res.relatedChapter ? `Book Reference: ${res.relatedChapter}\n` : ''}${res.targetAudience ? `Target Audience: ${res.targetAudience}\n` : ''}Artifact Produced: ${res.artifactProduced}
Estimated Time: ${res.estimatedTime}

---

## Overview
${res.description}

${fieldsText}
---
From Beyond AI Engineering: From Creator to Curator by Harsh Verma
https://www.beyondaiengineering.com/resources
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${res.id}-beyond-ai-engineering.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setDownloadedId(res.id);
    setTimeout(() => setDownloadedId(null), 2200);
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
            Practical Implementation Lab · {LAB_RESOURCES.length} Playbooks & Canvases
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] dark:text-white text-balance">
            Beyond AI Engineering Lab
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
            The book gives you the framework. The Lab helps you put it to work.
          </p>
          <p className="text-sm sm:text-base text-[#475467] dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            15 interactive canvases, evaluation checklists, and governance roadmaps organized across Career, AI Engineering, and Student implementation tracks.
          </p>

          {/* Primary Actions */}
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('toolkit')}
              className="px-4 py-2 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/15 text-[#101828] dark:text-slate-200 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs whitespace-nowrap"
            >
              <Wrench className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
              <span>Explore The Living AI Toolkit (11 Categories)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onOpenAssessment}
              className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              Take 12-Scenario C.A.O. Diagnostic
            </button>
          </div>

          {/* Search Bar */}
          <div className="pt-6 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#98A2B3] dark:text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search canvases, checklists, or chapters..."
                aria-label="Search implementation lab resources"
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-[#0D1527] text-[#101828] dark:text-white border border-[#101828]/20 dark:border-white/15 rounded-md focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400 placeholder:text-slate-400 shadow-xs"
              />
            </div>
          </div>

          {/* Pillar Filter Tabs */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {PILLARS.map((pillar) => (
              <button
                key={pillar}
                type="button"
                onClick={() => setActivePillar(pillar)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activePillar === pillar
                    ? 'bg-blue-950 dark:bg-blue-500 text-white shadow-xs'
                    : 'bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white'
                }`}
              >
                {pillar}
              </button>
            ))}
          </div>

          {/* Action Category Tabs */}
          <div className="pt-2 flex flex-wrap justify-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-[11px] font-mono font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] shadow-xs'
                    : 'bg-transparent text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'All Actions' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. RESOURCES GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-xs font-mono text-[#475467] dark:text-slate-400 mb-6 pb-3 border-b border-[#101828]/[0.08] dark:border-white/10">
          <span>
            Showing <strong className="text-[#101828] dark:text-white tabular-nums">{filteredResources.length}</strong> of{' '}
            <span className="tabular-nums">{LAB_RESOURCES.length}</span> resources
          </span>
          {(activePillar !== 'All Pillars' || activeCategory !== 'ALL' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setActivePillar('All Pillars');
                setActiveCategory('ALL');
                setSearchQuery('');
              }}
              className="text-blue-900 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10">
            <p className="font-serif text-xl text-[#101828] dark:text-white mb-2">
              No resources matched your current filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActivePillar('All Pillars');
                setActiveCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md cursor-pointer"
            >
              Show All 15 Resources
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl p-6 hover:border-blue-900 dark:hover:border-blue-400/60 transition-all duration-300 shadow-2xs hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
                      {res.category}
                      {res.pillar ? ` · ${res.pillar.replace(' Resources', '')}` : ''}
                    </span>
                    <span className="text-[#475467] dark:text-slate-400 flex items-center gap-1 tabular-nums">
                      <Clock className="w-3 h-3" />
                      {res.estimatedTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white mb-2 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed mb-4">
                    {res.description}
                  </p>

                  <div className="p-3 bg-[#FAFAF7] dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.06] dark:border-white/10 mb-6 space-y-1.5">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 block">
                        Artifact Produced
                      </span>
                      <div className="text-xs font-medium text-[#101828] dark:text-slate-200">
                        {res.artifactProduced}
                      </div>
                    </div>
                    {(res.relatedChapter || res.targetAudience) && (
                      <div className="pt-1.5 border-t border-[#101828]/[0.06] dark:border-white/10 text-[11px] text-[#475467] dark:text-slate-400">
                        {res.relatedChapter && <div>{res.relatedChapter}</div>}
                        {res.targetAudience && <div>For: {res.targetAudience}</div>}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-3 border-t border-[#101828]/[0.08] dark:border-white/10 flex items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => onOpenCanvas(res)}
                    className="font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Open Interactive Canvas</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadResource(res)}
                    className="text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadedId === res.id ? 'Downloaded .md' : 'Download .md'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 30/60/90 DAY ACTION PLAN INFOGRAPHIC SPOTLIGHT */}
        <div className="mt-16 bg-[#FAF9F5] dark:bg-[#0D1527] p-8 sm:p-10 rounded-2xl border border-[#101828]/10 dark:border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 transition-colors">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold block">
              Featured Lab Blueprint
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              Your 30 / 60 / 90 Day Transition Plan
            </h3>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              Transform from linear execution developer to strategic system curator across a structured 3-month sprint: Days 1–30 (Audit & Mindset), Days 31–60 (Prototyping & Boundaries), Days 61–90 (Public Proof & Leadership).
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {onOpenInfographicModal && (
                <button
                  type="button"
                  onClick={() => onOpenInfographicModal('infographic-plan')}
                  className="px-4 py-2 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Full Infographic Blueprint</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  const planCanvas =
                    LAB_RESOURCES.find((r) => r.id === '30-60-90-career-plan') || LAB_RESOURCES[0];
                  onOpenCanvas(planCanvas);
                }}
                className="px-4 py-2 bg-white dark:bg-[#11192E] border border-[#101828]/20 dark:border-white/15 text-[#101828] dark:text-slate-200 text-xs font-semibold rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                <span>Launch Interactive Worksheet</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenInfographicModal && onOpenInfographicModal('infographic-plan')}
            aria-label="Inspect Action Plan 30/60/90 Day Blueprint Infographic"
            className="w-full lg:w-72 aspect-3/4 rounded-xl overflow-hidden bg-slate-900 border border-[#101828]/15 dark:border-white/20 shadow-md shrink-0 cursor-pointer group relative text-left"
          >
            <img
              src="/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_16_PM-4_1a969073.png"
              alt="Action Plan: Your 30/60/90 Day Plan Infographic"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-3 py-1.5 bg-black/80 text-white rounded text-xs font-medium backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Zoom Infographic</span>
              </span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
