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
    <section className="py-24 sm:py-32 bg-[#FAF9F5] border-y border-[#101828]/[0.06] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Eyebrow */}
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-[#475467] font-mono">
            The Fundamental Economic Shift
          </span>
        </div>

        {/* Section Title */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-center font-bold text-[#101828] tracking-tight max-w-3xl mx-auto mb-16 text-balance">
          AI is making output abundant.
        </h2>

        {/* Abundant Output Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {abundantItems.map((item, index) => (
            <div
              key={item.label}
              className="bg-white border border-[#101828]/[0.08] p-6 rounded-lg shadow-xs hover:border-[#101828]/20 transition-all text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#98A2B3]">0{index + 1}</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded">
                  Abundant
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#101828] mb-1">
                {item.label} <span className="text-slate-400 font-sans text-sm font-normal">→ abundant</span>
              </h3>
              <p className="text-xs text-[#475467] leading-relaxed">
                {item.note}
              </p>
            </div>
          ))}
        </div>

        {/* Dramatic White Space & Scarcity Reveal */}
        <div className="my-16 sm:my-24 text-center max-w-2xl mx-auto py-12 px-6 bg-white border border-[#101828]/10 rounded-2xl shadow-sm relative">
          <div className="text-xs uppercase tracking-widest text-amber-700 font-mono mb-2">
            The Immutable Law of Complements
          </div>
          
          <div className="font-serif text-4xl sm:text-6xl font-bold text-[#101828] tracking-tight mb-4">
            Judgment <span className="text-blue-900">→ scarce.</span>
          </div>

          <div className="h-px w-24 bg-[#101828]/20 mx-auto my-6" />

          <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-[#101828] mb-3">
            Welcome to the Trust Economy.
          </h4>

          <p className="text-base text-[#475467] leading-relaxed mb-6 font-sans">
            When AI can generate unlimited technical output, credible human judgment becomes more valuable—not less. Employers and organizations don’t pay for sheer code volume; they pay for systems that work without catastrophic surprises.
          </p>

          <button
            onClick={() => onNavigate('frameworks')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-blue-700 transition-colors group cursor-pointer"
          >
            <span>Explore the Trust Economy Framework</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
