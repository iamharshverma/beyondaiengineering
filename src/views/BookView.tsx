import React, { useState } from 'react';
import { PageId } from '../types';
import { BOOK_DETAILS, BOOK_PARTS, CHAPTERS, ENDORSEMENTS } from '../data/bookData';
import { ArrowRight, BookOpen, CheckCircle, FileText, ArrowDown } from 'lucide-react';

interface BookViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBuyModal: () => void;
  onOpenSample: (chapterNum?: number) => void;
}

export const BookView: React.FC<BookViewProps> = ({
  onNavigate,
  onOpenBuyModal,
  onOpenSample,
}) => {
  const [activePartFilter, setActivePartFilter] = useState<string>('ALL');

  const filteredChapters = activePartFilter === 'ALL'
    ? CHAPTERS
    : CHAPTERS.filter((c) => c.part === activePartFilter);

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="pt-16 sm:pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 font-semibold block">
            The Definitive Volume
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] text-balance">
            This Is Not Another Book About Prompting.
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#475467] italic leading-relaxed text-balance">
            Beyond AI Engineering explores what happens after AI becomes good at producing the implementation.
          </p>

          <p className="text-base text-[#475467] max-w-2xl mx-auto leading-relaxed">
            By <strong className="text-[#101828]">Harsh Verma</strong> — Principal AI Software Engineer at <strong>Palo Alto Networks</strong>, Stanford Distinguished Scholar, Fellow of RSA, IFGICT & BCS, and IEEE Senior Member.
          </p>
          <div className="text-xs text-[#475467]">
            Official Portfolio Reference: <a href="https://www.harshverma.me/page-books#book1" target="_blank" rel="noopener noreferrer" className="text-blue-900 font-semibold underline">harshverma.me/page-books#book1 ↗</a>
          </div>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={onOpenBuyModal}
              className="px-6 py-3.5 text-sm font-semibold tracking-wide text-white bg-[#101828] rounded-md hover:bg-blue-950 transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              <span>Order the Book</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenSample(1)}
              className="px-6 py-3.5 text-sm font-semibold text-[#101828] bg-white border border-[#101828]/20 rounded-md hover:bg-black/5 transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-blue-900" />
              <span>Read Chapter 1 Sample</span>
            </button>
          </div>
        </div>

        {/* 2. THE TRANSFORMATION BEFORE & AFTER */}
        <div className="mt-20 max-w-4xl mx-auto bg-white border border-[#101828]/10 rounded-2xl p-8 sm:p-12 shadow-sm">
          <span className="text-xs font-mono uppercase tracking-widest text-[#475467] block text-center mb-6">
            The Fundamental Career Transformation
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Before */}
            <div className="p-6 bg-[#FAFAF7] rounded-xl border border-rose-100 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-700 font-bold block mb-2">
                BEFORE (The Commodity Trap)
              </span>
              <div className="font-serif text-2xl font-bold text-[#101828] mb-2">
                "I write the code."
              </div>
              <p className="text-xs text-[#475467] leading-relaxed">
                Measured by keystrokes, syntax speed, and closing tickets. Highly vulnerable to AI code automation.
              </p>
            </div>

            {/* After */}
            <div className="p-6 bg-blue-50/50 rounded-xl border border-blue-200 text-center relative">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-900 font-bold block mb-2">
                AFTER (The High-Leverage Curator)
              </span>
              <div className="font-serif text-lg sm:text-xl font-bold text-[#101828] mb-2 leading-snug">
                "I determine what should exist, design the system, orchestrate intelligence, and own the outcome."
              </div>
              <p className="text-xs text-[#475467] leading-relaxed">
                Operating with systems judgment, authority boundaries, and verified organizational trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE BOOK JOURNEY: PARTS I – IV & CHAPTER PREVIEWS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#475467] font-mono block mb-2">
            Table of Contents & Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] tracking-tight mb-4">
            The Architectural Journey
          </h2>
          <p className="text-base text-[#475467]">
            Structured into four progressive parts designed to reshape your career altitude.
          </p>

          {/* Part Filter Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {['ALL', 'PART I', 'PART II', 'PART III', 'PART IV'].map((part) => (
              <button
                key={part}
                onClick={() => setActivePartFilter(part)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activePartFilter === part
                    ? 'bg-[#101828] text-white'
                    : 'bg-white border border-[#101828]/10 text-[#475467] hover:text-[#101828]'
                }`}
              >
                {part === 'ALL' ? 'All 11 Chapters' : part}
              </button>
            ))}
          </div>
        </div>

        {/* Chapters Editorial Layout */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredChapters.map((chapter) => (
            <div
              key={chapter.number}
              className="bg-white border border-[#101828]/10 rounded-xl p-6 sm:p-8 hover:border-blue-900 transition-all shadow-2xs text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                    Chapter {chapter.number}
                  </span>
                  <span className="text-xs text-[#475467] font-mono">
                    {chapter.part} · {chapter.partTitle}
                  </span>
                </div>
                <span className="text-xs text-[#98A2B3] font-mono">{chapter.readTime}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#101828] mb-1">
                {chapter.title}
              </h3>
              <div className="text-sm font-sans text-blue-950 font-medium mb-3">
                {chapter.subtitle}
              </div>

              <p className="text-xs sm:text-sm text-[#475467] leading-relaxed mb-4">
                {chapter.summary}
              </p>

              <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-[#101828]/[0.06] mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#475467] block mb-1">
                  Core Invariant
                </span>
                <p className="font-serif italic text-xs sm:text-sm text-[#101828]">
                  "{chapter.keyTakeaway}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#101828]/[0.06]">
                <button
                  onClick={() => onOpenSample(chapter.number)}
                  className="text-xs font-semibold text-blue-900 hover:text-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Chapter {chapter.number} Excerpt</span>
                </button>
                <button
                  onClick={onOpenBuyModal}
                  className="text-xs text-[#475467] hover:text-[#101828] cursor-pointer"
                >
                  Order Book →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOOK SPECS & FORMATS BANNER */}
      <section className="py-20 bg-[#FAF9F5] border-t border-[#101828]/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white rounded-xl border border-[#101828]/10">
              <span className="text-xs font-mono uppercase text-[#475467] block mb-1">Length</span>
              <strong className="font-serif text-2xl font-bold text-[#101828]">{BOOK_DETAILS.pageCount}</strong>
              <span className="block text-[11px] text-[#475467] mt-1">11 Core Chapters</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#101828]/10">
              <span className="text-xs font-mono uppercase text-[#475467] block mb-1">Author</span>
              <strong className="font-serif text-2xl font-bold text-[#101828]">Harsh Verma</strong>
              <span className="block text-[11px] text-[#475467] mt-1">Principal AI Engineer</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#101828]/10">
              <span className="text-xs font-mono uppercase text-[#475467] block mb-1">Formats</span>
              <strong className="font-serif text-2xl font-bold text-[#101828]">4 Editions</strong>
              <span className="block text-[11px] text-[#475467] mt-1">Hardcover, Paper, eBook, Audio</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#101828]/10">
              <span className="text-xs font-mono uppercase text-[#475467] block mb-1">ISBN</span>
              <strong className="font-serif text-xl sm:text-2xl font-bold text-[#101828]">978-1-965432</strong>
              <span className="block text-[11px] text-[#475467] mt-1">Global Distribution</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
