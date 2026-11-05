import React, { useState } from 'react';
import { PageId, LabResource } from '../types';
import { LAB_RESOURCES } from '../data/resourcesData';
import { ArrowRight, FileText, CheckCircle, Wrench, Clock, Download, ExternalLink } from 'lucide-react';

interface ResourcesViewProps {
  onNavigate: (page: PageId) => void;
  onOpenCanvas: (resource: LabResource) => void;
  onOpenAssessment: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  onNavigate,
  onOpenCanvas,
  onOpenAssessment,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'ASSESS', 'BUILD', 'LEAD', 'GROW', 'EXECUTE'];

  const filteredResources = activeCategory === 'ALL'
    ? LAB_RESOURCES
    : LAB_RESOURCES.filter((r) => r.category === activeCategory);

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 font-semibold block">
            Practical Implementation Lab
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828]">
            Beyond AI Engineering Lab
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#475467] italic leading-relaxed">
            The book gives you the framework. The Lab helps you put it to work.
          </p>
          <p className="text-sm sm:text-base text-[#475467] max-w-xl mx-auto leading-relaxed">
            A comprehensive suite of interactive canvases, evaluation checklists, and governance roadmaps to transform your day-to-day engineering practice.
          </p>

          {/* Quick link to Toolkit */}
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate('toolkit')}
              className="px-4 py-2 text-xs font-semibold bg-white border border-[#101828]/20 rounded-md hover:bg-black/5 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5 text-blue-900" />
              <span>Explore The Living AI Toolkit (11 Categories)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenAssessment}
              className="px-4 py-2 text-xs font-semibold bg-[#101828] text-white rounded-md hover:bg-blue-950 transition-colors cursor-pointer"
            >
              Take C.A.O. Diagnostic
            </button>
          </div>

          {/* Category Tabs */}
          <div className="pt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#101828] text-white shadow-xs'
                    : 'bg-white border border-[#101828]/10 text-[#475467] hover:text-[#101828]'
                }`}
              >
                {cat === 'ALL' ? 'All Lab Worksheets' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. RESOURCES GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white border border-[#101828]/10 rounded-xl p-6 hover:border-blue-900 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                    {res.category}
                  </span>
                  <span className="text-[#98A2B3] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {res.estimatedTime}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#101828] mb-2 leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-[#475467] leading-relaxed mb-4">
                  {res.description}
                </p>

                <div className="p-3 bg-[#FAFAF7] rounded-lg border border-[#101828]/[0.06] mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#475467] block mb-0.5">
                    Artifact Produced
                  </span>
                  <div className="text-xs font-medium text-[#101828]">
                    {res.artifactProduced}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-3 border-t border-[#101828]/[0.08] flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => onOpenCanvas(res)}
                  className="font-semibold text-blue-900 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Use Online</span>
                </button>
                <button
                  onClick={() => onOpenCanvas(res)}
                  className="text-[#475467] hover:text-[#101828] flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
