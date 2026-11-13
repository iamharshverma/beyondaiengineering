import React, { useState } from 'react';
import { PageId, Framework } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { FRAMEWORKS } from '../data/frameworksData';
import { Search, Compass, ChevronDown, ChevronUp, ArrowRight, Share2 } from 'lucide-react';

interface FrameworksViewProps {
  onNavigate: (page: PageId | string) => void;
  onOpenAssessment: () => void;
}

export const FrameworksView: React.FC<FrameworksViewProps> = ({
  onNavigate,
  onOpenAssessment,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFrameworkId, setExpandedFrameworkId] = useState<string>('cao-framework');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFrameworks = FRAMEWORKS.filter((fw) => {
    const matchesPhase = selectedPhase === 'All' || fw.caoPhase === selectedPhase || fw.caoPhase === 'All';
    const matchesSearch =
      fw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fw.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fw.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  const handleShareFramework = (fw: Framework) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `"${fw.title}: ${fw.subtitle}" from ${SITE_CONFIG.book.title} by ${SITE_CONFIG.author.name}.\n\nDefinition: ${fw.definition}\n\nExplore at ${SITE_CONFIG.canonicalOrigin}/frameworks/${fw.id}`
      );
      setCopiedId(fw.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
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

      {/* 2. FRAMEWORKS LIST */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-linear-to-r from-blue-900 via-[#101828] to-slate-900 text-white shadow-lg border border-blue-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-blue-300 text-xs font-mono font-semibold uppercase tracking-widest">
              Foundational Operating System
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
            className="px-5 py-2.5 text-xs font-semibold bg-white text-[#101828] rounded-md hover:bg-blue-50 transition-colors shadow whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Explore C.A.O. Deep Dive</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          {filteredFrameworks.map((fw) => {
            const isExpanded = expandedFrameworkId === fw.id;
            return (
              <div
                key={fw.id}
                id={fw.id}
                className={`bg-white dark:bg-[#0D1527] border rounded-xl transition-all shadow-xs overflow-hidden ${
                  isExpanded
                    ? 'border-blue-900 dark:border-blue-400 ring-1 ring-blue-900/10 dark:ring-blue-400/20'
                    : 'border-[#101828]/10 dark:border-white/10 hover:border-[#101828]/30 dark:hover:border-white/25'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedFrameworkId(isExpanded ? '' : fw.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-6 cursor-pointer flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="uppercase tracking-wider font-semibold text-blue-900 dark:text-blue-400">
                        {fw.caoPhase === 'All' ? 'Foundation' : `${fw.caoPhase} Tier`}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">·</span>
                      <span className="text-[#475467] dark:text-slate-400">
                        {fw.relatedChapter.split('&')[0]}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                      {fw.title}
                    </h2>
                    <div className="text-xs sm:text-sm text-[#475467] dark:text-blue-300/80 font-medium font-sans">
                      {fw.subtitle}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-[#475467] dark:text-slate-400 shrink-0">
                    <span className="text-xs hidden sm:inline">{isExpanded ? 'Collapse' : 'Explore'}</span>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-8 pt-2 border-t border-[#101828]/[0.08] dark:border-white/10 bg-[#FAFAF7]/50 dark:bg-[#0A101F] space-y-6">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#475467] dark:text-slate-400 block mb-1">
                        Definition
                      </span>
                      <p className="text-sm sm:text-base text-[#101828] dark:text-slate-100 leading-relaxed font-sans bg-white dark:bg-[#11192E] p-4 rounded-lg border border-[#101828]/[0.06] dark:border-white/10 shadow-2xs">
                        {fw.definition}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#475467] dark:text-slate-400 block mb-1">
                        Why It Matters in the Agentic AI Era
                      </span>
                      <p className="text-sm text-[#475467] dark:text-slate-300 leading-relaxed font-sans">
                        {fw.whyItMatters}
                      </p>
                    </div>

                    <div className="p-4 bg-white dark:bg-[#11192E] rounded-lg border border-blue-100 dark:border-blue-900/60 shadow-2xs">
                      <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold flex items-center gap-1.5 mb-1">
                        <Compass className="w-4 h-4" />
                        <span>Architectural Schematic</span>
                      </span>
                      <p className="font-mono text-xs text-[#101828] dark:text-blue-200 leading-relaxed">
                        {fw.diagramDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.06] dark:border-white/10 shadow-2xs">
                        <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-white block mb-1.5">
                          Real-World Application
                        </span>
                        <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                          {fw.realWorldApplication}
                        </p>
                      </div>

                      <div className="p-4 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.06] dark:border-white/10 shadow-2xs">
                        <span className="text-xs font-mono uppercase tracking-wider font-semibold text-blue-950 dark:text-blue-300 block mb-1.5">
                          Try It Yourself (Action Exercise)
                        </span>
                        <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                          {fw.tryItYourself}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-[#101828]/[0.08] dark:border-white/10">
                      <span className="font-mono text-[#475467] dark:text-slate-400">
                        Read full chapter analysis in: <strong className="text-[#101828] dark:text-white">{fw.relatedChapter}</strong>
                      </span>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => onNavigate(fw.id === 'cao-framework' ? 'cao-framework' : `/frameworks/${fw.id}`)}
                          className="text-blue-900 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Dedicated Page & Citation</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShareFramework(fw)}
                          className="text-[#475467] dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-300 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>{copiedId === fw.id ? 'Copied Framework!' : 'Share'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

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
