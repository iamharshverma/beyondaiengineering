import React from 'react';
import { X, BookOpen, Clock, Calendar, Share2 } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenBuyModal?: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenBuyModal,
}) => {
  if (!article) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Read "${article.title}" by Harsh Verma from Beyond AI Engineering.`);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAFAF7] rounded-2xl border border-[#101828]/10 shadow-2xl p-6 sm:p-10 my-8 text-[#101828] max-h-[92vh] flex flex-col">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#101828]/10 mb-6 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-[#475467]">
            <span>IDEAS BEYOND THE BOOK</span>
            <span>·</span>
            <span className="text-blue-900 font-semibold">{article.topic}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#475467] hover:text-[#101828] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto pr-2 space-y-6 flex-1">
          {/* Metadata & Headline */}
          <div>
            <div className="flex items-center gap-3 text-xs text-[#475467] mb-2 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishDate}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101828] leading-tight mb-3">
              {article.title}
            </h1>
            <p className="font-serif text-lg text-[#475467] italic leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          {/* Author Byline */}
          <div className="flex items-center gap-3 py-3 border-y border-[#101828]/10 text-xs">
            <img
              src="/assets/aistudio/harsh_verma_87a0217e.jpg"
              alt="Harsh Verma"
              className="w-10 h-10 rounded-full object-cover object-top border border-[#101828]/20"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('public/assets')) {
                  target.src = '/public/assets/aistudio/harsh_verma_87a0217e.jpg';
                }
              }}
            />
            <div>
              <div className="font-semibold text-[#101828]">Harsh Verma</div>
              <div className="text-[#475467]">Author, Beyond AI Engineering · Principal AI Engineer at Palo Alto Networks</div>
            </div>
          </div>

          {/* Key Quote Callout */}
          <div className="p-5 bg-white border border-[#101828]/10 rounded-xl shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-900 block mb-1">
              Core Axiom
            </span>
            <p className="font-serif text-lg sm:text-xl font-medium text-[#101828] italic">
              "{article.keyQuote}"
            </p>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-[#101828] leading-relaxed font-sans">
            <p className="font-medium text-base sm:text-lg text-[#101828] leading-relaxed">
              {article.leadParagraph}
            </p>
            {article.content.map((p, idx) => (
              <p key={idx} className="text-[#344054] leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#101828]/10 mt-6 flex items-center justify-between gap-3 shrink-0 text-xs">
          <button
            onClick={handleShare}
            className="text-[#475467] hover:text-[#101828] flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Essay</span>
          </button>

          {onOpenBuyModal && (
            <button
              onClick={() => {
                onClose();
                onOpenBuyModal();
              }}
              className="px-4 py-2 font-semibold bg-[#101828] text-white rounded-md hover:bg-blue-950 transition-colors cursor-pointer"
            >
              Explore the Book
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
