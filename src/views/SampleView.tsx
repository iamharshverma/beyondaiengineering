import React, { useEffect } from 'react';
import { PageId } from '../types';
import { updatePageSeo, CANONICAL_ORIGIN } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { ChevronRight, BookOpen, ArrowRight, Download, CheckCircle2, Layers } from 'lucide-react';

interface SampleViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBuyModal: () => void;
  onOpenInfographicModal?: (infographicId?: string) => void;
}

export const SampleView: React.FC<SampleViewProps> = ({
  onNavigate,
  onOpenBuyModal,
  onOpenInfographicModal,
}) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Read a Sample Chapter | Beyond AI Engineering by Harsh Verma',
      description:
        'Read an exclusive excerpt from Beyond AI Engineering by Harsh Verma, including the Preface, Introduction (The Engineer After Code), and Chapter 1.',
      canonicalPath: '/book/sample',
      ogType: 'book',
      breadcrumbs: [
        { name: 'The Book', path: '/book' },
        { name: 'Read a Sample', path: '/book/sample' },
      ],
    });
  }, []);

  const handleDownloadPdf = () => {
    trackEvent('resource_download', { resource: 'sample_chapter_text' });
    const sampleText = `BEYOND AI ENGINEERING: FROM CREATOR TO CURATOR
By Harsh Verma

=== PREFACE: ESCAPING THE TYRANNY OF SYNTAX ===
For over half a century, the software engineer's primary economic leverage was syntactic translation. Knowing how to translate human requirements into code gave engineers high compensation and respect.

Today, foundation models and autonomous coding agents synthesize clean, multi-file software in milliseconds. When code generation becomes free and instantaneous, what is the scarce asset that commands premium value?

The answer is human systems judgment.

=== INTRODUCTION: THE ENGINEER AFTER CODE ===
The engineer of the next decade is not a displaced typist. They are a systems architect and an intelligence orchestrator. They design invariants, govern multi-agent authority boundaries, and guarantee business outcomes in the Trust Economy.

=== CHAPTER 1: WELCOME TO THE NEW AGE OF ENGINEERING ===
The old paradigm was about "How do we write this?" The new paradigm is "What deserves to be built, and what verifiable evidence justifies it?"

To read the complete book across 11 chapters, companion lab canvases, and full architectural teardowns, visit https://www.beyondaiengineering.com/book`;

    const blob = new Blob([sampleText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Beyond-AI-Engineering-Sample-Harsh-Verma.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

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
            onClick={() => onNavigate('book')}
            className="hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer"
          >
            The Book
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-900 dark:text-blue-400 font-semibold">Read a Sample</span>
        </nav>
      </div>

      {/* 2. HERO */}
      <section className="pt-8 sm:pt-14 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-900 dark:text-blue-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Book Excerpt</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] dark:text-white">
            Read an Exclusive Excerpt from Beyond AI Engineering
          </h1>

          <p className="font-serif text-xl text-[#475467] dark:text-slate-300 italic max-w-2xl mx-auto">
            Preface & Introduction: The Engineer After Code
          </p>

          <div className="pt-2 text-xs text-[#475467] dark:text-slate-400">
            By <strong className="text-[#101828] dark:text-white">Harsh Verma</strong> · Principal AI Engineer at Palo Alto Networks & Stanford Scholar
          </div>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => {
                trackEvent('get_book_click', { source: 'sample_hero' });
                onOpenBuyModal();
              }}
              className="px-5 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Continue Reading — Get the Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDownloadPdf}
              className="px-4 py-2.5 bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/15 text-[#101828] dark:text-slate-200 text-xs font-semibold rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
              <span>Download Text Excerpt</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. READING ROOM CONTENT */}
      <article className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* PREFACE */}
        <section className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold block">
            Author’s Preface
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white">
            Escaping the Tyranny of Syntax
          </h2>
          <div className="prose prose-slate dark:prose-invert text-sm sm:text-base text-[#344054] dark:text-slate-300 leading-relaxed space-y-4 font-serif">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none text-base sm:text-lg text-[#101828] dark:text-slate-100">
              For over half a century, the prestige and market compensation of the software engineer rested on syntactic translation. If you knew how to translate ambiguous human requirements into clean, bug-free C, Java, Python, or TypeScript, you possessed an economic superpower.
            </p>
            <p>
              That superpower is being commoditized at unprecedented speed. Foundation models can now generate syntactically correct functions, database schemas, and unit test suites in milliseconds. When code generation becomes free and instantaneous, what is the scarce asset that commands premium value?
            </p>
            <p>
              The answer is human systems judgment. Civil engineers do not lay every brick; aerospace engineers do not rivet every wing panel. Their value lies in stress calculations, aerodynamic modeling, boundary resilience, and structural judgment. The engineer of the next decade is not a displaced typist; they are a systems architect and an intelligence orchestrator.
            </p>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="space-y-4 pt-8 border-t border-[#101828]/[0.08] dark:border-white/10">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold block">
            Introduction
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white">
            The Engineer After Code
          </h2>
          <div className="prose prose-slate dark:prose-invert text-sm sm:text-base text-[#344054] dark:text-slate-300 leading-relaxed space-y-4 font-serif">
            <p>
              Welcome to the Trust Economy. In this new world, software output is abundant, but verified human accountability is scarce. Clients and employers do not pay for code volume; they pay for systems that work without catastrophic surprises at 3:00 AM.
            </p>
            <div className="p-6 bg-[#FAF9F5] dark:bg-[#11192E] border-l-4 border-blue-900 dark:border-blue-400 my-6 rounded-r-xl italic font-serif text-base sm:text-lg text-[#101828] dark:text-slate-100">
              "AI can increasingly write the code. Your advantage moves to deciding what deserves to be built."
            </div>
            <p>
              This book is designed as a career operating system. It provides the frameworks, evaluation matrices, and daily engineering rituals to help you transition from a code producer to an authoritative systems curator.
            </p>
          </div>
        </section>

        {/* C.A.O. DIAGRAM CALLOUT */}
        <div className="bg-[#FAF9F5] dark:bg-[#0D1527] p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold">
            <Layers className="w-4 h-4" />
            <span>Foundational Diagram</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
            The Creator → Architect → Orchestrator Triad
          </h3>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
            The central backbone of the book maps how your cognitive focus shifts across the three stages:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
            <div className="p-3 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.08] dark:border-white/10">
              <span className="font-mono font-bold text-blue-800 dark:text-blue-300 block mb-1">CREATOR (Build)</span>
              <span className="text-[#475467] dark:text-slate-300">Syntax, prototyping, algorithms, unit execution.</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.08] dark:border-white/10">
              <span className="font-mono font-bold text-purple-800 dark:text-purple-300 block mb-1">ARCHITECT (Design)</span>
              <span className="text-[#475467] dark:text-slate-300">Trade-offs, failure modes, data boundaries, schemas.</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.08] dark:border-white/10">
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 block mb-1">ORCHESTRATOR (Lead)</span>
              <span className="text-[#475467] dark:text-slate-300">Multi-agent governance, trust, human accountability.</span>
            </div>
          </div>
        </div>

        {/* CLOSING CONVERSION BOX */}
        <div className="pt-8 border-t border-[#101828]/[0.08] dark:border-white/10 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
            Ready to Read the Complete Book?
          </h3>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            Get instant access to all 11 chapters, 15 high-resolution architectural infographics, companion lab canvases, and the full 30/60/90-day transition roadmap.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                trackEvent('get_book_click', { source: 'sample_footer' });
                onOpenBuyModal();
              }}
              className="px-6 py-3 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Continue Reading — Get Beyond AI Engineering</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('cao-framework')}
              className="px-4 py-3 bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/15 text-[#101828] dark:text-slate-200 text-xs font-semibold rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Explore C.A.O. Framework
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
