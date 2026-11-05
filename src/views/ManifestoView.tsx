import React, { useState } from 'react';
import { PageId } from '../types';
import { Share2, Download, Printer, ArrowRight, Check } from 'lucide-react';

interface ManifestoViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBuyModal: () => void;
}

export const ManifestoView: React.FC<ManifestoViewProps> = ({
  onNavigate,
  onOpenBuyModal,
}) => {
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  const principles = [
    {
      num: '01',
      title: 'BUILD DEEPLY. THINK BROADLY.',
      desc: 'Master the low-level foundations of computing, while elevating your perspective to global system architectures.',
    },
    {
      num: '02',
      title: 'MOVE FROM HOW TO WHAT.',
      desc: 'Execution speed is cheap. Deciding which system deserves to exist is the ultimate competitive advantage.',
    },
    {
      num: '03',
      title: 'USE AI FOR LEVERAGE. NEVER OUTSOURCE JUDGMENT.',
      desc: 'Let models synthesize the syntax; never let them make the trade-offs that determine safety and trust.',
    },
    {
      num: '04',
      title: 'A MODEL IS NOT A SYSTEM.',
      desc: 'A model is a probabilistic matrix. A system is a deterministic promise to your users, wrapped in boundaries.',
    },
    {
      num: '05',
      title: 'DESIGN FOR UNCERTAINTY.',
      desc: 'Assume stochastic outputs will drift, tools will timeout, and inputs will be adversarial. Build defensive resilience.',
    },
    {
      num: '06',
      title: 'NEVER AUTOMATE RESPONSIBILITY AWAY.',
      desc: 'If an autonomous agent fails in production, you own the catastrophic outcome. Retain clear human authority.',
    },
    {
      num: '07',
      title: 'BUILD FOR THE TRUST ECONOMY.',
      desc: 'When synthetic output becomes infinite, verified human credibility becomes the scarcest asset on earth.',
    },
    {
      num: '08',
      title: 'LEAVE EVIDENCE BEHIND.',
      desc: 'Do not claim capability through buzzwords. Build a verifiable Digital Paper Trail of decisions, post-mortems, and proof of work.',
    },
  ];

  const handleShareQuote = (quote: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`"${quote}" — The Beyond AI Engineering Manifesto by Harsh Verma. https://beyondaiengineering.com/manifesto`);
      setCopiedQuote(quote);
      setTimeout(() => setCopiedQuote(null), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-0 bg-[#FAFAF7]">
      {/* 1. MANIFESTO HERO */}
      <section className="pt-20 sm:pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-b border-[#101828]/[0.08]">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-900 font-semibold block mb-2">
          The Beyond AI Engineering Manifesto
        </span>
        <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-[#101828] mb-6">
          The Engineer After Code
        </h1>
        <p className="font-serif text-xl sm:text-2xl text-[#475467] italic max-w-2xl mx-auto leading-relaxed">
          Eight guiding axioms for technical professionals navigating the generative AI and autonomous agent revolution.
        </p>

        <div className="pt-8 flex justify-center gap-3 no-print">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold bg-[#101828] text-white rounded-md hover:bg-blue-950 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save Manifesto</span>
          </button>
          <button
            onClick={() => handleShareQuote("The future of engineering will not be determined by AI alone. It will be determined by the people who decide how AI should be used.")}
            className="px-4 py-2 text-xs font-semibold bg-white border border-[#101828]/20 rounded-md text-[#101828] hover:bg-black/5 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedQuote ? 'Copied Axiom!' : 'Share Manifesto'}</span>
          </button>
        </div>
      </section>

      {/* 2. THE EDITORIAL PRINCIPLES SCROLL */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {principles.map((item) => (
          <div
            key={item.num}
            className="text-left border-l-2 border-[#101828]/20 pl-6 sm:pl-10 py-2 relative group"
          >
            <div className="font-mono text-xs font-semibold text-blue-900 tracking-wider mb-2">
              AXIOM {item.num}
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] tracking-tight leading-tight mb-4">
              {item.title}
            </h2>

            <p className="text-base sm:text-xl text-[#475467] leading-relaxed font-sans max-w-2xl">
              {item.desc}
            </p>

            <button
              onClick={() => handleShareQuote(item.title)}
              className="mt-4 text-xs text-[#98A2B3] group-hover:text-blue-900 transition-colors flex items-center gap-1 cursor-pointer no-print"
            >
              <Share2 className="w-3 h-3" />
              <span>{copiedQuote === item.title ? 'Copied quote to clipboard!' : 'Copy quote'}</span>
            </button>
          </div>
        ))}

        {/* 3. CLIMACTIC TRIAD & CLOSING */}
        <div className="pt-20 pb-12 text-center border-t border-[#101828]/10 space-y-8">
          <div className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] space-y-2">
            <div>CREATOR.</div>
            <div>ARCHITECT.</div>
            <div>ORCHESTRATOR.</div>
          </div>

          <div className="h-px w-20 bg-[#101828]/20 mx-auto" />

          <div className="font-serif text-xl sm:text-2xl text-[#101828] italic font-medium leading-relaxed">
            Build the system. <br />
            Design what matters. <br />
            Orchestrate the outcome.
          </div>

          <div className="max-w-2xl mx-auto p-8 bg-white border border-[#101828]/10 rounded-2xl shadow-xs">
            <blockquote className="font-serif text-xl sm:text-2xl text-[#101828] font-semibold leading-relaxed">
              "The future of engineering will not be determined by AI alone. It will be determined by the people who decide how AI should be used."
            </blockquote>
            <div className="text-xs uppercase tracking-widest text-[#475467] font-mono mt-4">
              — Harsh Verma, Beyond AI Engineering
            </div>
          </div>

          <div className="pt-6 no-print flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenBuyModal}
              className="px-6 py-3 text-xs font-semibold bg-[#101828] text-white rounded-md hover:bg-blue-950 transition-colors cursor-pointer shadow-sm"
            >
              Order the Hardcover Edition
            </button>
            <button
              onClick={() => onNavigate('frameworks')}
              className="px-6 py-3 text-xs font-semibold bg-white border border-[#101828]/20 rounded-md text-[#101828] hover:bg-black/5 transition-colors cursor-pointer"
            >
              Explore the 12 Frameworks
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
