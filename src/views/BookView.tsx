import React, { useState } from 'react';
import { PageId } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { CHAPTERS, SPECIAL_SECTIONS, ALL_INFOGRAPHICS } from '../data/bookData';
import {
  ArrowRight,
  BookOpen,
  Maximize2,
  ShieldCheck,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface BookViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBuyModal: () => void;
  onOpenSample: (chapterNum?: number) => void;
  onOpenInfographicModal?: (infographicId?: string) => void;
}

const BOOK_FAQS = [
  {
    q: 'Is Beyond AI Engineering a prompt-engineering or API tutorial book?',
    a: 'No. Prompt syntax changes every few months. This book teaches the durable engineering operating system—the Creator–Architect–Orchestrator (C.A.O.) progression, systems invariants, deterministic evaluations, ethical curation, and human accountability.',
  },
  {
    q: 'Who benefits most from reading this book?',
    a: 'Software engineers (mid-level to principal), AI/ML practitioners, engineering directors/CTOs, and computer science students who want practical career and architectural frameworks that stay relevant as coding agents advance.',
  },
  {
    q: 'Do I need deep machine learning math or PhD background?',
    a: 'No. The book is written from a systems, software architecture, and production reliability perspective rather than model training mathematics.',
  },
  {
    q: 'How does this relate to Harsh Verma’s earlier cybersecurity work (AI vs. AI)?',
    a: 'AI vs. AI examined offensive and defensive autonomous cybersecurity systems. Beyond AI Engineering broadens those production reliability and adversarial lessons into a complete career and operating framework for all software engineers.',
  },
  {
    q: 'What are the 15 chapter infographics and downloadable lab canvases?',
    a: 'Every chapter and special blueprint pairs with a visual reference schematic and practical canvas exercises—such as the 30/60/90-day transition plan, evaluation rubric, and Human API contract.',
  },
  {
    q: 'Can engineering organizations or university courses adopt the book together?',
    a: 'Yes. Engineering leaders and faculty can request advance bulk packs, reading group discussion guides, or keynote sessions directly through the For Organizations page.',
  },
  {
    q: 'Can I preview the writing style before requesting a full copy?',
    a: 'Yes. You can read the Preface, Introduction, and Chapter 1 excerpt right in the browser or download the plain-text excerpt from the Sample Reading Room.',
  },
  {
    q: 'How do I request review copies, editions, or speaking sessions?',
    a: 'All edition inquiries, bulk licensing requests, and speaking invitations go directly to Harsh Verma via the Get the Book dialog or the Contact page.',
  },
];

export const BookView: React.FC<BookViewProps> = ({
  onNavigate,
  onOpenBuyModal,
  onOpenSample,
  onOpenInfographicModal,
}) => {
  const [activePartFilter, setActivePartFilter] = useState<string>('ALL');
  const [selectedSpecialTab, setSelectedSpecialTab] = useState<string>('intro');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const filteredChapters =
    activePartFilter === 'ALL'
      ? CHAPTERS
      : CHAPTERS.filter((c) => c.part === activePartFilter);

  const activeSpecialSection =
    SPECIAL_SECTIONS.find((s) => s.id === selectedSpecialTab) || SPECIAL_SECTIONS[0];

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="pt-16 sm:pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
            {SITE_CONFIG.book.fullTitle}
          </span>

          <h1 className="font-serif text-fluid-hero font-bold tracking-tight text-[#101828] dark:text-white text-balance">
            This Is Not Another Book About Prompting.
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic leading-relaxed text-balance">
            {SITE_CONFIG.book.tagline} Explore what happens after AI becomes good at producing the implementation.
          </p>

          <p className="text-base text-[#475467] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            By <strong className="text-[#101828] dark:text-white">{SITE_CONFIG.author.name}</strong> — {SITE_CONFIG.author.headline}.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <button
              type="button"
              onClick={onOpenBuyModal}
              className="px-6 py-3.5 text-sm font-semibold tracking-wide text-white bg-[#101828] dark:bg-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              <span>Order the Book</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onOpenSample(1)}
              className="px-6 py-3.5 text-sm font-semibold text-[#101828] dark:text-slate-200 bg-white dark:bg-[#0E1526] border border-[#101828]/20 dark:border-white/20 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-blue-900 dark:text-blue-400" />
              <span>Read Chapter 1 Sample</span>
            </button>
            {onOpenInfographicModal && (
              <button
                type="button"
                onClick={() => onOpenInfographicModal('infographic-intro')}
                className="px-6 py-3.5 text-sm font-semibold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-blue-800 dark:text-blue-400" />
                <span>Explore 15 Infographics</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. THE TRANSFORMATION BEFORE & AFTER */}
        <div className="mt-20 max-w-4xl mx-auto bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-8 sm:p-12 shadow-sm">
          <span className="text-xs font-mono uppercase tracking-widest text-[#475467] dark:text-slate-400 block text-center mb-6">
            The Fundamental Career Transformation
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-6 bg-[#FAFAF7] dark:bg-[#11192E] rounded-xl border border-rose-100 dark:border-rose-900/30 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold block mb-2">
                BEFORE (The Commodity Trap)
              </span>
              <div className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-2">
                "I write the code."
              </div>
              <p className="text-xs text-[#475467] dark:text-slate-400 leading-relaxed">
                Measured by keystrokes, syntax speed, and closing tickets. Rapidly commoditized by autonomous coding agents.
              </p>
            </div>

            <div className="p-6 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800/40 text-center relative">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block mb-2">
                AFTER (The High-Leverage Curator)
              </span>
              <div className="font-serif text-lg sm:text-xl font-bold text-[#101828] dark:text-white mb-2 leading-snug">
                "I determine what should exist, design the system, orchestrate intelligence, and own the outcome."
              </div>
              <p className="text-xs text-[#475467] dark:text-slate-400 leading-relaxed">
                Operating with systems judgment, authority boundaries, deterministic evals, and verified organizational trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHAPTERS & EDITORIAL TABLE OF CONTENTS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
            Table of Contents & Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] dark:text-white tracking-tight mb-4">
            The Architectural Journey
          </h2>
          <p className="text-base text-[#475467] dark:text-slate-300">
            Structured into four progressive parts designed to elevate your career from syntax generation to autonomous intelligence leadership.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {['ALL', 'PART I', 'PART II', 'PART III', 'PART IV'].map((part) => (
              <button
                type="button"
                key={part}
                onClick={() => setActivePartFilter(part)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activePartFilter === part
                    ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] shadow-xs'
                    : 'bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white'
                }`}
              >
                {part === 'ALL' ? 'All 11 Chapters' : part}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {filteredChapters.map((chapter) => (
            <div
              key={chapter.number}
              className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 hover:border-blue-900/60 dark:hover:border-blue-400/60 transition-all shadow-2xs text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
            >
              <div className="md:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono tabular-nums text-xs font-bold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
                    Chapter {chapter.number}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-xs text-[#475467] dark:text-slate-400 font-mono">
                    {chapter.part} · {chapter.partTitle}
                  </span>
                  <span className="text-xs text-[#98A2B3] dark:text-slate-500 font-mono tabular-nums ml-auto">
                    {chapter.readTime}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
                    {chapter.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-sans text-blue-950 dark:text-blue-300 font-medium italic mt-0.5">
                    {chapter.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                  {chapter.summary}
                </p>

                <div className="bg-[#FAF9F5] dark:bg-[#11192E] p-3.5 rounded-lg border border-[#101828]/[0.06] dark:border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 block mb-1">
                    Core Invariant
                  </span>
                  <p className="font-serif italic text-xs sm:text-sm text-[#101828] dark:text-slate-100">
                    "{chapter.keyTakeaway}"
                  </p>
                </div>

                {chapter.caseStudies && chapter.caseStudies.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[11px] font-mono uppercase text-[#475467] dark:text-slate-400 block mb-1.5">
                      Case Studies in This Chapter:
                    </span>
                    <div className="flex flex-wrap gap-3 text-xs text-[#101828] dark:text-slate-200 font-medium">
                      {chapter.caseStudies.map((cs, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{cs.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#101828]/[0.06] dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => onOpenSample(chapter.number)}
                    className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Sample Excerpt</span>
                  </button>
                  {onOpenInfographicModal && (
                    <button
                      type="button"
                      onClick={() => onOpenInfographicModal(`infographic-ch${chapter.number}`)}
                      className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Zoom Chapter Infographic</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onOpenBuyModal}
                    className="text-xs text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white cursor-pointer ml-auto"
                  >
                    Order Book →
                  </button>
                </div>
              </div>

              {chapter.infographicUrl && (
                <button
                  type="button"
                  onClick={() => onOpenInfographicModal && onOpenInfographicModal(`infographic-ch${chapter.number}`)}
                  className="md:col-span-4 group relative bg-slate-900 rounded-xl overflow-hidden border border-[#101828]/15 dark:border-white/10 shadow-sm cursor-pointer aspect-3/4 w-full flex items-center justify-center"
                >
                  <img
                    src={chapter.infographicUrl}
                    alt={`Chapter ${chapter.number} Infographic`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (chapter.infographicFallback && target.src !== chapter.infographicFallback) {
                        target.src = chapter.infographicFallback;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-black/80 text-white rounded text-xs font-medium backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Inspect Full Infographic</span>
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/80 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                    Ch {chapter.number} Infographic
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. SPECIAL SECTIONS & ACTION BLUEPRINTS */}
      <section className="py-20 bg-white dark:bg-[#070B14] border-t border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block mb-1">
              Frameworks & Blueprints
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
              Special Sections & Master Blueprints
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {SPECIAL_SECTIONS.map((sec) => (
              <button
                type="button"
                key={sec.id}
                onClick={() => setSelectedSpecialTab(sec.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedSpecialTab === sec.id
                    ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] shadow-xs'
                    : 'bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white'
                }`}
              >
                {sec.title.split(':')[0]}
              </button>
            ))}
          </div>

          <div className="bg-[#FAFAF7] dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold block">
                {activeSpecialSection.badge}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
                {activeSpecialSection.title}
              </h3>
              <p className="text-xs sm:text-sm text-blue-950 dark:text-blue-300 font-sans italic">
                {activeSpecialSection.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                {activeSpecialSection.summary}
              </p>

              <div className="p-3.5 bg-white dark:bg-[#11192E] rounded-xl border border-[#101828]/10 dark:border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 block mb-1">
                  Guiding Philosophy
                </span>
                <p className="font-serif italic text-xs sm:text-sm text-[#101828] dark:text-slate-100">
                  "{activeSpecialSection.keyTakeaway}"
                </p>
              </div>

              {activeSpecialSection.featuredPeople && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 block">
                    Featured Route Archetypes:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeSpecialSection.featuredPeople.map((p, idx) => (
                      <div key={idx} className="p-2.5 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/10 dark:border-white/10 text-xs">
                        <strong className="text-[#101828] dark:text-white block">{p.name}</strong>
                        <span className="text-[11px] text-[#475467] dark:text-slate-400">{p.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSpecialSection.actionSteps && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 block">
                    Execution Milestones:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeSpecialSection.actionSteps.map((step, idx) => (
                      <div key={idx} className="p-2.5 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/10 dark:border-white/10 text-xs">
                        <strong className="text-blue-900 dark:text-blue-400 block font-mono text-[11px]">{step.period}</strong>
                        <span className="text-[#101828] dark:text-slate-200 font-medium block">{step.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                {onOpenInfographicModal && (
                  <button
                    type="button"
                    onClick={() => {
                      const found = ALL_INFOGRAPHICS.find((i) => i.imageUrl === activeSpecialSection.infographicUrl);
                      onOpenInfographicModal(found ? found.id : 'infographic-intro');
                    }}
                    className="px-4 py-2 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Zoom This High-Resolution Infographic</span>
                  </button>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const found = ALL_INFOGRAPHICS.find((i) => i.imageUrl === activeSpecialSection.infographicUrl);
                if (onOpenInfographicModal) {
                  onOpenInfographicModal(found ? found.id : 'infographic-intro');
                }
              }}
              className="lg:col-span-5 group relative bg-slate-900 rounded-xl overflow-hidden border border-[#101828]/15 dark:border-white/10 shadow-md cursor-pointer aspect-3/4 w-full flex items-center justify-center"
            >
              <img
                src={activeSpecialSection.infographicUrl}
                alt={activeSpecialSection.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (activeSpecialSection.infographicFallback && target.src !== activeSpecialSection.infographicFallback) {
                    target.src = activeSpecialSection.infographicFallback;
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3.5 py-2 bg-black/80 text-white rounded text-xs font-medium backdrop-blur-xs flex items-center gap-2 shadow-md">
                  <Maximize2 className="w-4 h-4 text-blue-400" />
                  <span>Inspect Blueprint</span>
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 5.5. TEAM & UNIVERSITY BULK ORDERS + ONLINE SAMPLE READING ROOM */}
      <section className="py-16 bg-white dark:bg-[#070B14] border-t border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-semibold block">
                  Free Online Reading Room
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                  Read the Preface, Intro & Chapter 1
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                  Read an excerpt from <em>{SITE_CONFIG.book.title}</em> directly in your browser or download the plain-text reading packet.
                </p>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onNavigate('sample')}
                  className="px-5 py-2.5 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Open Sample Reading Room</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-linear-to-br from-[#101828] to-slate-900 text-white border border-slate-800 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold block">
                  Organization & Academic Licensing
                </span>
                <h3 className="font-serif text-2xl font-bold">
                  Bring the C.A.O. Operating System to Your Engineering Org
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Bulk copy inquiries, reading group discussion guides, and virtual keynote briefings with author Harsh Verma.
                </p>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onNavigate('organizations')}
                  className="px-5 py-2.5 text-xs font-semibold bg-white text-[#101828] rounded-md hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>For Organizations & Teams</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.6. VISUAL INFOGRAPHIC EXPLORER SHOWCASE */}
      <section className="py-20 bg-[#FAF9F5] dark:bg-[#0A101D] border-t border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold mb-2">
                <Layers className="w-4 h-4" />
                <span>Visual Blueprint Architecture</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white tracking-tight">
                15 High-Resolution Book Infographics
              </h2>
              <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 mt-1 max-w-2xl">
                Every chapter and special section includes a visual summary mapping real-world case studies, frameworks, and weekly labs.
              </p>
            </div>

            {onOpenInfographicModal && (
              <button
                type="button"
                onClick={() => onOpenInfographicModal('infographic-intro')}
                className="px-4 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Launch Interactive Infographic Viewer</span>
              </button>
            )}
          </div>

          <div className="relative overflow-hidden motion-reduce:overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            {/* Soft edge fades for floating track */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 z-10 bg-linear-to-r from-[#FAF9F5] dark:from-[#0A101D] to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 z-10 bg-linear-to-l from-[#FAF9F5] dark:from-[#0A101D] to-transparent"
            />

            <div className="flex w-max animate-marquee-ltr hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] py-3">
              {[0, 1].map((copyIdx) => (
                <div
                  key={copyIdx}
                  aria-hidden={copyIdx === 1}
                  className="flex items-stretch gap-5 pr-5 shrink-0"
                >
                  {ALL_INFOGRAPHICS.map((info) => (
                    <button
                      type="button"
                      key={`${copyIdx}-${info.id}`}
                      tabIndex={copyIdx === 1 ? -1 : undefined}
                      onClick={() => onOpenInfographicModal && onOpenInfographicModal(info.id)}
                      className="w-[210px] sm:w-[230px] shrink-0 text-left group bg-white dark:bg-[#0D1527] rounded-xl border border-[#101828]/10 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-900/60 dark:hover:border-blue-400/60 transition-all duration-300 cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-3/4 w-full overflow-hidden bg-slate-900">
                        <img
                          src={info.imageUrl}
                          alt={info.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (info.fallbackUrl && target.src !== info.fallbackUrl) {
                              target.src = info.fallbackUrl;
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                          <span className="px-2.5 py-1.5 bg-black/80 text-white rounded text-[11px] font-medium backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                            <Maximize2 className="w-3 h-3 text-blue-400" />
                            <span>Inspect</span>
                          </span>
                        </div>
                        <span className="absolute top-2 left-2 text-[9px] font-mono tabular-nums font-bold bg-black/80 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                          {info.chapterNumber === 0 ? 'Orientation' : info.chapterNumber <= 11 ? `Chapter ${info.chapterNumber}` : 'Blueprint'}
                        </span>
                      </div>
                      <div className="p-3.5 flex-1 flex flex-col justify-between w-full">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-semibold block mb-1">
                            {info.category}
                          </span>
                          <h3 className="font-serif text-xs font-bold text-[#101828] dark:text-white line-clamp-2 leading-tight">
                            {info.title}
                          </h3>
                        </div>
                        <div className="pt-2 mt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between w-full">
                          <span className="text-[10px] text-blue-900 dark:text-blue-400 font-medium font-mono">
                            Inspect Blueprint
                          </span>
                          <ArrowRight className="w-3 h-3 text-blue-900 dark:text-blue-400" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS ABOUT THE BOOK */}
      <section className="py-20 bg-[#FAF9F5] dark:bg-[#0A101D] border-t border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold block mb-1">
              Reader Guide
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {BOOK_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#101828] dark:text-white">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-900 dark:text-blue-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#475467] dark:text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed border-t border-[#101828]/[0.06] dark:border-white/10 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED BOOK ARCHITECTURE & SPECIFICATIONS BANNER */}
      <section className="py-16 bg-white dark:bg-[#070B14] border-t border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-[#FAFAF7] dark:bg-[#0D1527] rounded-xl border border-[#101828]/10 dark:border-white/10">
              <span className="text-xs font-mono uppercase text-[#475467] dark:text-slate-400 block mb-1">Structure</span>
              <strong className="font-serif text-xl sm:text-2xl font-bold text-[#101828] dark:text-white">11 Chapters</strong>
              <span className="block text-[11px] text-[#475467] dark:text-slate-400 mt-1">4 Progressive Parts</span>
            </div>
            <div className="p-4 bg-[#FAFAF7] dark:bg-[#0D1527] rounded-xl border border-[#101828]/10 dark:border-white/10">
              <span className="text-xs font-mono uppercase text-[#475467] dark:text-slate-400 block mb-1">Visual System</span>
              <strong className="font-serif text-xl sm:text-2xl font-bold text-[#101828] dark:text-white">15 Blueprints</strong>
              <span className="block text-[11px] text-[#475467] dark:text-slate-400 mt-1">12 Signature Frameworks</span>
            </div>
            <div className="p-4 bg-[#FAFAF7] dark:bg-[#0D1527] rounded-xl border border-[#101828]/10 dark:border-white/10">
              <span className="text-xs font-mono uppercase text-[#475467] dark:text-slate-400 block mb-1">Author</span>
              <strong className="font-serif text-xl sm:text-2xl font-bold text-[#101828] dark:text-white">{SITE_CONFIG.author.name}</strong>
              <span className="block text-[11px] text-[#475467] dark:text-slate-400 mt-1">Palo Alto Networks · Stanford Scholar</span>
            </div>
            <div className="p-4 bg-[#FAFAF7] dark:bg-[#0D1527] rounded-xl border border-[#101828]/10 dark:border-white/10">
              <span className="text-xs font-mono uppercase text-[#475467] dark:text-slate-400 block mb-1">Edition Status</span>
              <strong className="font-serif text-lg sm:text-xl font-bold text-[#101828] dark:text-white">Direct Inquiry</strong>
              <span className="block text-[11px] text-[#475467] dark:text-slate-400 mt-1">{SITE_CONFIG.book.editionNote}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
