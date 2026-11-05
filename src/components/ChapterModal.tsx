import React, { useState } from 'react';
import { X, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { CHAPTERS } from '../data/bookData';
import { Chapter } from '../types';

interface ChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChapterNumber?: number;
  onOpenBuyModal?: () => void;
}

export const ChapterModal: React.FC<ChapterModalProps> = ({
  isOpen,
  onClose,
  initialChapterNumber = 1,
  onOpenBuyModal,
}) => {
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(initialChapterNumber);

  if (!isOpen) return null;

  const currentChapter = CHAPTERS.find((c) => c.number === selectedChapterNumber) || CHAPTERS[0];
  const currentIndex = CHAPTERS.findIndex((c) => c.number === selectedChapterNumber);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAFAF7] rounded-2xl border border-[#101828]/10 shadow-2xl p-6 sm:p-10 my-8 text-[#101828] max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#101828]/10 mb-6 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-[#475467]">
            <BookOpen className="w-4 h-4 text-blue-900" />
            <span>SAMPLE CHAPTER EXCERPT · {currentChapter.part}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#475467] hover:text-[#101828] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            aria-label="Close chapter reader"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area (Scrollable) */}
        <div className="overflow-y-auto pr-2 space-y-6 flex-1">
          {/* Chapter Header */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-blue-900 mb-1">
              Chapter {currentChapter.number} · {currentChapter.readTime}
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#101828] mb-2 leading-tight">
              {currentChapter.title}
            </h2>
            <h3 className="text-sm sm:text-base font-sans text-[#475467] italic">
              {currentChapter.subtitle}
            </h3>
          </div>

          {/* Key Takeaway Callout */}
          <div className="p-4 bg-white border border-[#101828]/10 rounded-xl shadow-2xs">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#475467] block mb-1">
              Core Architectural Takeaway
            </span>
            <p className="text-sm font-serif italic text-[#101828]">
              "{currentChapter.keyTakeaway}"
            </p>
          </div>

          {/* Chapter Summary */}
          <div className="text-sm text-[#475467] leading-relaxed">
            <strong className="text-[#101828] font-sans">Chapter Overview: </strong>
            {currentChapter.summary}
          </div>

          {/* Authentic Book Excerpt */}
          <div className="border-t border-[#101828]/10 pt-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#475467] block mb-3">
              Selected Text Excerpt from Chapter {currentChapter.number}
            </span>
            <div className="font-serif text-base sm:text-lg text-[#101828] leading-relaxed bg-white p-6 rounded-xl border border-[#101828]/10 shadow-xs first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">
              {currentChapter.sampleExcerpt}
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="pt-6 border-t border-[#101828]/10 mt-6 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => setSelectedChapterNumber(CHAPTERS[currentIndex - 1].number)}
              className="px-3 py-1.5 text-xs font-medium border border-[#101828]/20 rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              disabled={currentIndex === CHAPTERS.length - 1}
              onClick={() => setSelectedChapterNumber(CHAPTERS[currentIndex + 1].number)}
              className="px-3 py-1.5 text-xs font-medium border border-[#101828]/20 rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 flex items-center gap-1 cursor-pointer"
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
              className="px-4 py-2 text-xs font-semibold bg-[#101828] text-white rounded-md hover:bg-blue-950 transition-colors flex items-center gap-1.5 cursor-pointer"
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
