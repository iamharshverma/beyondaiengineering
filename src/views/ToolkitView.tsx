import React, { useState } from 'react';
import { PageId, ToolkitItem } from '../types';
import { TOOLKIT_ITEMS, TOOLKIT_CATEGORIES } from '../data/toolkitData';
import { Search, ExternalLink, ArrowLeft, Wrench, Shield, CheckCircle } from 'lucide-react';

interface ToolkitViewProps {
  onNavigate: (page: PageId) => void;
}

export const ToolkitView: React.FC<ToolkitViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = TOOLKIT_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whatItDoes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bestFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whyItMatters.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <button
            onClick={() => onNavigate('resources')}
            className="text-xs font-mono text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white inline-flex items-center gap-1.5 mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Lab Overview</span>
          </button>

          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
            Evolving Ecosystem Directory
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] dark:text-white">
            The Living AI Engineering Toolkit
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
            Frameworks should last. Tools will change. This directory evolves with the ecosystem.
          </p>

          <p className="text-sm text-[#475467] dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Curated, battle-tested tools across 11 key engineering categories—tested for reliability, telemetry observability, and agent governance.
          </p>

          {/* Search bar */}
          <div className="pt-6 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#98A2B3] dark:text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g. LangGraph, DSPy, Phoenix, Guardrails)..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-[#0D1527] text-[#101828] dark:text-white border border-[#101828]/20 dark:border-white/15 rounded-md focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400 placeholder:text-slate-400 shadow-xs"
              />
            </div>
          </div>

          {/* Categories Pill/Tab Bar */}
          <div className="pt-6 flex flex-wrap justify-center gap-1.5">
            {TOOLKIT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] shadow-xs'
                    : 'bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TOOLKIT GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((tool) => (
            <div
              key={tool.id}
              className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl p-6 hover:border-blue-900 dark:hover:border-blue-400/60 transition-all duration-300 shadow-2xs hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="font-semibold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800/40">
                    {tool.category}
                  </span>
                  <span className="text-[#475467] dark:text-slate-400 text-[11px] font-sans">
                    {tool.pricing}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-2 flex items-center justify-between">
                  <span>{tool.name}</span>
                </h3>

                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed mb-4">
                  {tool.whatItDoes}
                </p>

                <div className="space-y-3 mb-6 text-xs">
                  <div className="p-2.5 bg-[#FAFAF7] dark:bg-[#11192E] rounded border border-[#101828]/[0.06] dark:border-white/10">
                    <strong className="block text-[10px] font-mono uppercase tracking-wider text-[#101828] dark:text-slate-200 mb-0.5">
                      Best For
                    </strong>
                    <span className="text-[#475467] dark:text-slate-300">{tool.bestFor}</span>
                  </div>

                  <div className="p-2.5 bg-blue-50/50 dark:bg-blue-950/40 rounded border border-blue-100/50 dark:border-blue-800/40">
                    <strong className="block text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-0.5">
                      Why It Matters
                    </strong>
                    <span className="text-[#101828] dark:text-slate-200">{tool.whyItMatters}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#101828]/[0.08] dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[#98A2B3] dark:text-slate-400">
                  Reviewed: {tool.lastReviewed}
                </span>
                <a
                  href={tool.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
