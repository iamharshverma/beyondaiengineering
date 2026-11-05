import React, { useState } from 'react';
import { X, BookOpen, ArrowRight, ArrowLeft, Maximize2, FlaskConical, CheckSquare, Layers, ShieldCheck } from 'lucide-react';
import { CHAPTERS } from '../data/bookData';
import { Chapter } from '../types';

interface ChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChapterNumber?: number;
  onOpenBuyModal?: () => void;
  onOpenInfographicModal?: (infographicId?: string) => void;
}

export const ChapterModal: React.FC<ChapterModalProps> = ({
  isOpen,
  onClose,
  initialChapterNumber = 1,
  onOpenBuyModal,
  onOpenInfographicModal,
}) => {
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(initialChapterNumber);
  const [activeTab, setActiveTab] = useState<'overview' | 'infographic' | 'cases' | 'lab'>('overview');

  // Sync when initialChapterNumber changes
  React.useEffect(() => {
    setSelectedChapterNumber(initialChapterNumber);
  }, [initialChapterNumber]);

  if (!isOpen) return null;

  const currentChapter = CHAPTERS.find((c) => c.number === selectedChapterNumber) || CHAPTERS[0];
  const currentIndex = CHAPTERS.findIndex((c) => c.number === selectedChapterNumber);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAFAF7] dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-2xl p-6 sm:p-10 my-8 text-[#101828] dark:text-slate-100 max-h-[92vh] flex flex-col transition-colors">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#101828]/10 dark:border-white/10 mb-4 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
            <BookOpen className="w-4 h-4 text-blue-900 dark:text-blue-400" />
            <span>SAMPLE CHAPTER READER · {currentChapter.part}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close chapter reader"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter Header */}
        <div className="mb-4 shrink-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold">
              Chapter {currentChapter.number} · {currentChapter.readTime}
            </span>
            {currentChapter.infographicUrl && onOpenInfographicModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenInfographicModal(`infographic-ch${currentChapter.number}`);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zoom Full Infographic</span>
              </button>
            )}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white leading-tight">
            {currentChapter.title}
          </h2>
          <h3 className="text-xs sm:text-sm font-sans text-[#475467] dark:text-slate-300 italic mt-0.5">
            {currentChapter.subtitle}
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#101828]/10 dark:border-white/10 pb-2 mb-6 shrink-0 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14]'
                : 'text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            Overview & Excerpt
          </button>
          {currentChapter.infographicUrl && (
            <button
              onClick={() => setActiveTab('infographic')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'infographic'
                  ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14]'
                  : 'text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Chapter Infographic</span>
            </button>
          )}
          {currentChapter.caseStudies && currentChapter.caseStudies.length > 0 && (
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'cases'
                  ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14]'
                  : 'text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Real-World Cases ({currentChapter.caseStudies.length})</span>
            </button>
          )}
          {(currentChapter.labTryThisWeek || currentChapter.curatorChecklist) && (
            <button
              onClick={() => setActiveTab('lab')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'lab'
                  ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14]'
                  : 'text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Lab & Checklist</span>
            </button>
          )}
        </div>

        {/* Content Area (Scrollable) */}
        <div className="overflow-y-auto pr-2 space-y-6 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Takeaway Callout */}
              <div className="p-4 bg-white dark:bg-[#11192E] border border-[#101828]/10 dark:border-white/10 rounded-xl shadow-2xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 block mb-1">
                  Core Architectural Invariant
                </span>
                <p className="text-sm sm:text-base font-serif italic text-[#101828] dark:text-slate-100">
                  "{currentChapter.keyTakeaway}"
                </p>
              </div>

              {/* Chapter Summary */}
              <div className="text-sm text-[#475467] dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-[#11192E]/60 p-4 rounded-xl border border-[#101828]/5 dark:border-white/10">
                <strong className="text-[#101828] dark:text-white font-sans block mb-1">Chapter Synopsis: </strong>
                {currentChapter.summary}
              </div>

              {/* Key Concepts Preview */}
              {currentChapter.keyConcepts && currentChapter.keyConcepts.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 block">
                    Core Architectural Concepts
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentChapter.keyConcepts.map((kc, idx) => (
                      <div key={idx} className="p-3 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/10 dark:border-white/10 text-xs text-[#344054] dark:text-slate-200 leading-relaxed">
                        {kc}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Authentic Book Excerpt */}
              <div className="border-t border-[#101828]/10 dark:border-white/10 pt-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#475467] dark:text-slate-400 block mb-3">
                  Selected Text Excerpt from Chapter {currentChapter.number}
                </span>
                <div className="font-serif text-base sm:text-lg text-[#101828] dark:text-slate-100 leading-relaxed bg-white dark:bg-[#11192E] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-xs first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">
                  {currentChapter.sampleExcerpt}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'infographic' && currentChapter.infographicUrl && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400">
                  Visual Architecture Breakdown
                </span>
                {onOpenInfographicModal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenInfographicModal(`infographic-ch${currentChapter.number}`);
                    }}
                    className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Open in Fullscreen Zoom Viewer</span>
                  </button>
                )}
              </div>
              <div
                onClick={() => {
                  if (onOpenInfographicModal) {
                    onClose();
                    onOpenInfographicModal(`infographic-ch${currentChapter.number}`);
                  }
                }}
                className="group relative cursor-pointer bg-slate-900 rounded-xl overflow-hidden border border-[#101828]/15 dark:border-white/10 shadow-md flex items-center justify-center p-2"
              >
                <img
                  src={currentChapter.infographicUrl}
                  alt={`Chapter ${currentChapter.number} Infographic: ${currentChapter.title}`}
                  className="max-h-[60vh] w-auto object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (currentChapter.infographicFallback && target.src !== currentChapter.infographicFallback) {
                      target.src = currentChapter.infographicFallback;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-black/80 text-white rounded-lg text-xs font-medium backdrop-blur-xs flex items-center gap-2 shadow-lg">
                    <Maximize2 className="w-4 h-4 text-blue-400" />
                    <span>Click to Zoom & Inspect</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cases' && currentChapter.caseStudies && (
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 block">
                Real-World Case Studies Analyzed in Chapter {currentChapter.number}
              </span>
              <div className="space-y-3">
                {currentChapter.caseStudies.map((cs, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#11192E] p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 text-xs font-bold font-mono flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#101828] dark:text-white">
                        {cs.name}
                      </h4>
                    </div>
                    {cs.subtitle && (
                      <div className="text-xs font-mono text-blue-900 dark:text-blue-400 font-semibold pl-8">
                        {cs.subtitle}
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed pl-8">
                      {cs.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'lab' && (
            <div className="space-y-6">
              {currentChapter.labTryThisWeek && (
                <div className="bg-white dark:bg-[#11192E] p-6 rounded-xl border border-purple-200/80 dark:border-purple-800/40 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-900 dark:text-purple-300 font-bold mb-2">
                    <FlaskConical className="w-4 h-4" />
                    <span>Lab: Try This Week</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#101828] dark:text-slate-100 font-medium leading-relaxed">
                    {currentChapter.labTryThisWeek}
                  </p>
                </div>
              )}

              {currentChapter.curatorChecklist && currentChapter.curatorChecklist.length > 0 && (
                <div className="bg-white dark:bg-[#11192E] p-6 rounded-xl border border-blue-200/80 dark:border-blue-800/40 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 font-bold mb-3">
                    <CheckSquare className="w-4 h-4" />
                    <span>Curator's Checklist (4 Targeted Actions)</span>
                  </div>
                  <div className="space-y-2.5">
                    {currentChapter.curatorChecklist.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#344054] dark:text-slate-200">
                        <span className="w-5 h-5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="pt-4 border-t border-[#101828]/10 dark:border-white/10 mt-4 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                setSelectedChapterNumber(CHAPTERS[currentIndex - 1].number);
                setActiveTab('overview');
              }}
              className="px-3 py-1.5 text-xs font-medium border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-slate-200 rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Chapter</span>
            </button>
            <button
              disabled={currentIndex === CHAPTERS.length - 1}
              onClick={() => {
                setSelectedChapterNumber(CHAPTERS[currentIndex + 1].number);
                setActiveTab('overview');
              }}
              className="px-3 py-1.5 text-xs font-medium border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-slate-200 rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1 cursor-pointer"
            >
              <span>Next Chapter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {onOpenBuyModal && (
            <button
              onClick={() => {
                onClose();
                onOpenBuyModal();
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Get the Complete Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
