import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types';

interface ScrollStoryProps {
  onNavigate: (page: PageId) => void;
}

export const ScrollStory: React.FC<ScrollStoryProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(4);

  const abundantItems = [
    { label: 'Code', state: 'abundant', note: 'Syntax generation drops to zero marginal cost' },
    { label: 'Content', state: 'abundant', note: 'Synthetic documentation, specs, and tests multiply instantly' },
    { label: 'Models', state: 'abundant', note: 'Commoditized frontier and open-weights models accessible to all' },
    { label: 'Automation', state: 'abundant', note: 'Repetitive pipelines and task execution operate continuously' },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F5] dark:bg-[#0A101F] border-y border-[#101828]/[0.06] dark:border-white/10 relative overflow-hidden transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Eyebrow */}
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono">
            The Fundamental Economic Shift
          </span>
        </div>

        {/* Section Title */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-center font-bold text-[#101828] dark:text-white tracking-tight max-w-3xl mx-auto mb-16 text-balance">
          AI is making output abundant.
        </h2>

        {/* Abundant Output Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {abundantItems.map((item, index) => (
            <div
              key={item.label}
              className="bg-white dark:bg-[#0D1527] border border-[#101828]/[0.08] dark:border-white/10 p-6 rounded-xl shadow-xs hover:border-blue-900/40 dark:hover:border-blue-400/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#98A2B3] dark:text-slate-500">0{index + 1}</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-700 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900/60 px-2 py-0.5 rounded">
                  Abundant
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#101828] dark:text-white mb-1">
                {item.label} <span className="text-slate-400 dark:text-slate-500 font-sans text-sm font-normal">→ abundant</span>
              </h3>
              <p className="text-xs text-[#475467] dark:text-slate-400 leading-relaxed">
                {item.note}
              </p>
            </div>
          ))}
        </div>

        {/* Dramatic White Space & Scarcity Reveal */}
        <div className="my-16 sm:my-24 text-center max-w-2xl mx-auto py-12 px-6 sm:px-10 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/15 rounded-2xl shadow-sm dark:shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-blue-500 to-indigo-500" />
          
          <div className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-mono mb-2 font-bold">
            The Immutable Law of Complements
          </div>
          
          <div className="font-serif text-4xl sm:text-6xl font-bold text-[#101828] dark:text-white tracking-tight mb-4">
            Judgment <span className="text-blue-900 dark:text-blue-400">→ scarce.</span>
          </div>

          <div className="h-px w-24 bg-[#101828]/20 dark:bg-white/20 mx-auto my-6" />

          <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-[#101828] dark:text-white mb-3">
            Welcome to the Trust Economy.
          </h4>

          <p className="text-base text-[#475467] dark:text-slate-300 leading-relaxed mb-6 font-sans">
            When AI can generate unlimited technical output, credible human judgment becomes more valuable—not less. Employers and organizations don’t pay for sheer code volume; they pay for systems that work without catastrophic surprises.
          </p>

          <button
            onClick={() => onNavigate('frameworks')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group cursor-pointer"
          >
            <span>Explore the Trust Economy Framework</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
