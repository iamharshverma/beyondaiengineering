import React, { useEffect } from 'react';
import { PageId, Framework } from '../types';
import { FRAMEWORKS } from '../data/frameworksData';
import { updatePageSeo, CANONICAL_ORIGIN, PAGE_OG_IMAGES } from '../utils/seo';
import { CiteThisFramework } from '../components/CiteThisFramework';
import { trackEvent } from '../utils/analytics';
import { ChevronRight, ArrowLeft, ArrowRight, BookOpen, Layers, CheckCircle2, Shield, Compass, Sparkles } from 'lucide-react';

interface FrameworkDetailViewProps {
  frameworkId: string;
  onNavigate: (page: PageId) => void;
  onSelectFramework: (id: string) => void;
  onOpenBuyModal: () => void;
}

export const FrameworkDetailView: React.FC<FrameworkDetailViewProps> = ({
  frameworkId,
  onNavigate,
  onSelectFramework,
  onOpenBuyModal,
}) => {
  const framework = FRAMEWORKS.find((f) => f.id === frameworkId) || FRAMEWORKS[0];

  useEffect(() => {
    const ogImg = framework.id === 'cao-framework'
      ? PAGE_OG_IMAGES.caoFramework
      : PAGE_OG_IMAGES.frameworks;

    updatePageSeo({
      title: `${framework.title} | Beyond AI Engineering`,
      description: `${framework.subtitle}. Learn the ${framework.title} framework by Harsh Verma from Beyond AI Engineering: ${framework.definition.slice(0, 140)}...`,
      canonicalPath: `/frameworks/${framework.id}`,
      ogType: 'article',
      ogImage: ogImg,
      breadcrumbs: [
        { name: 'Frameworks', path: '/frameworks' },
        { name: framework.title, path: `/frameworks/${framework.id}` },
      ],
    });
  }, [framework]);

  const relatedFrameworks = FRAMEWORKS.filter((f) => f.id !== framework.id).slice(0, 3);

  return (
    <div className="space-y-0 pb-20">
      {/* 1. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => onNavigate('frameworks')}
            className="hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer"
          >
            Frameworks
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-900 dark:text-blue-400 font-semibold">{framework.title}</span>
        </nav>
      </div>

      {/* 2. HERO */}
      <section className="pt-8 sm:pt-14 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 px-2.5 py-0.5 rounded font-semibold uppercase">
              {framework.category} Framework
            </span>
            <span className="text-slate-400">·</span>
            <span className="bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 px-2.5 py-0.5 rounded font-semibold uppercase">
              {framework.caoPhase} Stage
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-[#475467] dark:text-slate-400">{framework.relatedChapter}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] dark:text-white leading-tight">
            {framework.title}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
            {framework.subtitle}
          </p>

          <div className="pt-2 text-xs text-[#475467] dark:text-slate-400">
            By <strong className="text-[#101828] dark:text-white">Harsh Verma</strong> · Principal AI Engineer & Author of <em>Beyond AI Engineering</em>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT BREAKDOWN */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Definition */}
        <div className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xs space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold">
            Formal Architectural Definition
          </h2>
          <p className="font-serif text-lg sm:text-xl text-[#101828] dark:text-white leading-relaxed">
            {framework.definition}
          </p>
        </div>

        {/* Why It Matters */}
        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
            Why This Framework Matters in the AI Era
          </h2>
          <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 leading-relaxed">
            {framework.whyItMatters}
          </p>
        </div>

        {/* Architectural Topology / Diagram Description */}
        <div className="bg-[#FAF9F5] dark:bg-[#11192E] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-900 dark:text-purple-300 font-bold">
            <Layers className="w-4 h-4" />
            <span>Conceptual Topology & System Diagram</span>
          </div>
          <p className="text-sm sm:text-base text-[#101828] dark:text-slate-200 leading-relaxed font-sans">
            {framework.diagramDescription}
          </p>
        </div>

        {/* Real-World Production Application */}
        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
            Real-World Production Application
          </h2>
          <div className="p-5 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl text-sm sm:text-base text-[#344054] dark:text-slate-300 leading-relaxed shadow-2xs">
            {framework.realWorldApplication}
          </div>
        </div>

        {/* Practical Try-It-Yourself Exercise */}
        <div className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Try It Yourself (Engineering Exercise)</span>
          </h2>
          <div className="p-6 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 rounded-xl text-sm sm:text-base text-[#101828] dark:text-slate-100 font-medium leading-relaxed">
            {framework.tryItYourself}
          </div>
        </div>

        {/* Cite This Framework */}
        <CiteThisFramework
          frameworkName={framework.title}
          frameworkUrl={`${CANONICAL_ORIGIN}/frameworks/${framework.id}`}
        />

        {/* Related Frameworks Links */}
        <div className="pt-8 border-t border-[#101828]/[0.08] dark:border-white/10">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#475467] dark:text-slate-400 mb-4 block">
            Explore Companion Frameworks
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedFrameworks.map((rf) => (
              <button
                key={rf.id}
                onClick={() => {
                  onSelectFramework(rf.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left p-4 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl hover:border-blue-900 dark:hover:border-blue-400 transition-all cursor-pointer shadow-xs group"
              >
                <span className="text-[10px] font-mono uppercase text-blue-900 dark:text-blue-400 font-semibold block mb-1">
                  {rf.caoPhase}
                </span>
                <h4 className="font-serif text-base font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                  {rf.title}
                </h4>
                <p className="text-xs text-[#475467] dark:text-slate-400 line-clamp-2 mt-1">
                  {rf.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* CTA to Book */}
        <div className="bg-[#FAF9F5] dark:bg-[#11192E] p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
            Master the Entire Operating System
          </h3>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            <em>Beyond AI Engineering</em> by Harsh Verma details every invariant, governance boundary, and career vector across 11 authoritative chapters.
          </p>
          <button
            onClick={() => {
              trackEvent('get_book_click', { source: `framework_${framework.id}` });
              onOpenBuyModal();
            }}
            className="px-5 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Get Beyond AI Engineering</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
