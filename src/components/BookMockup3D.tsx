import React, { useState } from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface BookMockup3DProps {
  onSelectPhase?: (phase: 'creator' | 'architect' | 'orchestrator') => void;
  onOpenSample?: () => void;
}

export const BookMockup3D: React.FC<BookMockup3DProps> = ({
  onSelectPhase,
  onOpenSample,
}) => {
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-none flex items-center justify-center py-6 px-2 sm:px-4">
      <div className="relative group perspective-1000 animate-float w-full flex justify-center">
        <div className="book-spine-depth transition-transform duration-500 ease-out">
          <div className="relative rounded-xl overflow-hidden book-shadow border border-slate-900/15 dark:border-white/20 bg-[#0E1B38] max-w-[260px] sm:max-w-[330px] md:max-w-[360px] shadow-2xl">
            <img
              src={SITE_CONFIG.book.coverImage}
              alt="Beyond AI Engineering: From Creator to Curator hardcover book by Harsh Verma"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('public/assets')) {
                  target.src = '/public/assets/images/book_hardcover_mockup_1793842329740.jpg';
                }
              }}
            />
          </div>
        </div>

        {/* Node 1: Creator */}
        <button
          type="button"
          onMouseEnter={() => setActiveHoverNode('creator')}
          onMouseLeave={() => setActiveHoverNode(null)}
          onClick={() => onSelectPhase && onSelectPhase('creator')}
          className={`text-left absolute -top-3 left-0 sm:-top-4 sm:-left-6 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border border-[#101828]/15 dark:border-white/15 rounded-xl p-2.5 sm:p-3 shadow-md transition-all cursor-pointer z-20 ${
            activeHoverNode === 'creator' ? 'scale-105 border-blue-600 dark:border-blue-400' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#475467] dark:text-slate-400">01 · Build</div>
              <div className="text-xs font-bold text-[#101828] dark:text-white whitespace-nowrap">Creator</div>
            </div>
          </div>
          <div className="text-[11px] text-[#475467] dark:text-slate-400 mt-1 hidden sm:block">
            Turns ideas into working systems
          </div>
        </button>

        {/* Node 2: Architect */}
        <button
          type="button"
          onMouseEnter={() => setActiveHoverNode('architect')}
          onMouseLeave={() => setActiveHoverNode(null)}
          onClick={() => onSelectPhase && onSelectPhase('architect')}
          className={`text-left absolute top-1/2 right-0 sm:-right-6 -translate-y-1/2 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border border-[#101828]/15 dark:border-white/15 rounded-xl p-2.5 sm:p-3 shadow-md transition-all cursor-pointer z-20 ${
            activeHoverNode === 'architect' ? 'scale-105 border-purple-600 dark:border-purple-400' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#475467] dark:text-slate-400">02 · Design</div>
              <div className="text-xs font-bold text-[#101828] dark:text-white whitespace-nowrap">Architect</div>
            </div>
          </div>
          <div className="text-[11px] text-[#475467] dark:text-slate-400 mt-1 hidden sm:block">
            Decides what should be built
          </div>
        </button>

        {/* Node 3: Orchestrator */}
        <button
          type="button"
          onMouseEnter={() => setActiveHoverNode('orchestrator')}
          onMouseLeave={() => setActiveHoverNode(null)}
          onClick={() => onSelectPhase && onSelectPhase('orchestrator')}
          className={`text-left absolute -bottom-3 left-1 sm:-bottom-4 sm:-left-4 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border border-[#101828]/15 dark:border-white/15 rounded-xl p-2.5 sm:p-3 shadow-md transition-all cursor-pointer z-20 ${
            activeHoverNode === 'orchestrator' ? 'scale-105 border-emerald-600 dark:border-emerald-400' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#475467] dark:text-slate-400">03 · Lead</div>
              <div className="text-xs font-bold text-[#101828] dark:text-white whitespace-nowrap">Orchestrator</div>
            </div>
          </div>
          <div className="text-[11px] text-[#475467] dark:text-slate-400 mt-1 hidden sm:block">
            Coordinates AI, humans & trust
          </div>
        </button>
      </div>

      {onOpenSample && (
        <button
          type="button"
          onClick={onOpenSample}
          className="absolute -bottom-10 text-xs font-medium text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
        >
          Read Sample Chapter Excerpt →
        </button>
      )}
    </div>
  );
};
