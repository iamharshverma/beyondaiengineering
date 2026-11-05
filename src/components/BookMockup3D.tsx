import React, { useState } from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

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
    <div className="relative w-full max-w-md mx-auto lg:max-w-none flex items-center justify-center py-6">
      {/* Ambient luxury glow background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-amber-500/10 dark:from-blue-600/25 dark:via-indigo-600/15 dark:to-amber-500/15 blur-3xl -z-10 rounded-full" />

      {/* 3D Book Container with luxury floating animation */}
      <div className="relative group perspective-1000 animate-float">
        <div className="book-spine-depth transition-transform duration-500 ease-out cursor-pointer hover:rotate-y-[-6deg]">
          <div className="relative rounded-xl overflow-hidden book-shadow border border-slate-900/15 dark:border-white/20 bg-[#0E1B38] max-w-[340px] sm:max-w-[380px] shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <img
              src="/assets/images/book_hardcover_mockup_1793842329740.jpg"
              alt="Beyond AI Engineering hardcover book by Harsh Verma"
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('public/assets')) {
                  target.src = '/public/assets/images/book_hardcover_mockup_1793842329740.jpg';
                }
              }}
            />

            {/* Subtle editorial gold/light sheen on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 dark:via-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </div>

        {/* Floating Interactive C.A.O. Nodes around the book */}
        
        {/* Node 1: Creator */}
        <div
          onMouseEnter={() => setActiveHoverNode('creator')}
          onMouseLeave={() => setActiveHoverNode(null)}
          onClick={() => onSelectPhase && onSelectPhase('creator')}
          className={`absolute -top-4 -left-4 sm:-left-8 bg-white/95 dark:bg-[#0F172A]/90 backdrop-blur-md border border-[#101828]/10 dark:border-white/15 rounded-xl p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all cursor-pointer z-20 ${
            activeHoverNode === 'creator' ? 'scale-105 border-blue-600 dark:border-blue-400 ring-2 ring-blue-100 dark:ring-blue-900/50' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] tracking-wider uppercase font-mono text-[#475467] dark:text-slate-400">Stage 01</div>
              <div className="text-xs font-bold text-[#101828] dark:text-white">Creator · Build</div>
            </div>
          </div>
          <div className="text-[11px] text-[#475467] dark:text-slate-400 mt-1 hidden sm:block">
            Turns ideas into working systems
          </div>
        </div>

        {/* Node 2: Architect */}
        <div
          onMouseEnter={() => setActiveHoverNode('architect')}
          onMouseLeave={() => setActiveHoverNode(null)}
          onClick={() => onSelectPhase && onSelectPhase('architect')}
          className={`absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 bg-white/95 dark:bg-[#0F172A]/90 backdrop-blur-md border border-[#101828]/10 dark:border-white/15 rounded-xl p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all cursor-pointer z-20 ${
            activeHoverNode === 'architect' ? 'scale-105 border-violet-600 dark:border-purple-400 ring-2 ring-violet-100 dark:ring-purple-900/50' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] tracking-wider uppercase font-mono text-[#475467] dark:text-slate-400">Stage 02</div>
              <div className="text-xs font-bold text-[#101828] dark:text-white">Architect · Design</div>
            </div>
          </div>
          <div className="text-[11px] text-[#475467] dark:text-slate-400 mt-1 hidden sm:block">
            Decides what should be built
          </div>
        </div>

        {/* Node 3: Orchestrator */}
        <div
          onMouseEnter={() => setActiveHoverNode('orchestrator')}
          onMouseLeave={() => setActiveHoverNode(null)}
          onClick={() => onSelectPhase && onSelectPhase('orchestrator')}
          className={`absolute -bottom-4 -left-2 sm:-left-6 bg-white/95 dark:bg-[#0F172A]/90 backdrop-blur-md border border-[#101828]/10 dark:border-white/15 rounded-xl p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all cursor-pointer z-20 ${
            activeHoverNode === 'orchestrator' ? 'scale-105 border-emerald-600 dark:border-emerald-400 ring-2 ring-emerald-100 dark:ring-emerald-900/50' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] tracking-wider uppercase font-mono text-[#475467] dark:text-slate-400">Stage 03</div>
              <div className="text-xs font-bold text-[#101828] dark:text-white">Orchestrator · Lead</div>
            </div>
          </div>
          <div className="text-[11px] text-[#475467] dark:text-slate-400 mt-1 hidden sm:block">
            Coordinates AI, humans & trust
          </div>
        </div>
      </div>

      {/* Quick Sample Trigger */}
      {onOpenSample && (
        <button
          onClick={onOpenSample}
          className="absolute -bottom-10 text-xs font-medium text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
        >
          Read Free Sample Chapter Excerpt →
        </button>
      )}
    </div>
  );
};
