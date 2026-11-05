import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, ArrowLeft, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { ALL_INFOGRAPHICS } from '../data/bookData';

interface InfographicModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInfographicId?: string;
  onOpenBuyModal?: () => void;
}

export const InfographicModal: React.FC<InfographicModalProps> = ({
  isOpen,
  onClose,
  initialInfographicId,
  onOpenBuyModal,
}) => {
  const [currentId, setCurrentId] = useState<string>(initialInfographicId || ALL_INFOGRAPHICS[0].id);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    if (initialInfographicId) {
      setCurrentId(initialInfographicId);
      setZoomLevel(1);
      setImgError(false);
    }
  }, [initialInfographicId]);

  if (!isOpen) return null;

  const currentIndex = ALL_INFOGRAPHICS.findIndex((item) => item.id === currentId);
  const activeItem = currentIndex !== -1 ? ALL_INFOGRAPHICS[currentIndex] : ALL_INFOGRAPHICS[0];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentId(ALL_INFOGRAPHICS[currentIndex - 1].id);
      setZoomLevel(1);
      setImgError(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < ALL_INFOGRAPHICS.length - 1) {
      setCurrentId(ALL_INFOGRAPHICS[currentIndex + 1].id);
      setZoomLevel(1);
      setImgError(false);
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[94vh] bg-[#0E1525] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#0A0F1D]/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded">
              {activeItem.category} · {currentIndex + 1} of {ALL_INFOGRAPHICS.length}
            </span>
            <h3 className="font-serif text-sm sm:text-base font-semibold text-white truncate max-w-md sm:max-w-xl">
              {activeItem.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-2 text-slate-300 min-w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct Image Download */}
            <a
              href={activeItem.imageUrl}
              download={`${activeItem.id}.png`}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Download High-Res Infographic"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer ml-1"
              aria-label="Close infographic viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* Infographic Viewer (Center/Left) */}
          <div className="flex-1 overflow-auto bg-black/40 flex items-center justify-center p-4 relative select-none">
            
            {/* Prev / Next Floating Arrows */}
            <button
              disabled={currentIndex === 0}
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none transition-all shadow-lg cursor-pointer"
              aria-label="Previous Infographic"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              disabled={currentIndex === ALL_INFOGRAPHICS.length - 1}
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-blue-600 border border-white/20 text-white flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none transition-all shadow-lg cursor-pointer"
              aria-label="Next Infographic"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* The Image Canvas */}
            <div
              className="transition-transform duration-200 ease-out origin-center flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={imgError ? activeItem.fallbackUrl : activeItem.imageUrl}
                alt={activeItem.title}
                onError={() => {
                  if (!imgError) setImgError(true);
                }}
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10"
              />
            </div>
          </div>

          {/* Right Sidebar: Context & Actions */}
          <div className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-white/10 bg-[#0B1120] p-6 flex flex-col justify-between overflow-y-auto shrink-0 space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 block mb-1">
                  Book Infographic Teardown
                </span>
                <h4 className="font-serif text-xl font-bold text-white leading-tight">
                  {activeItem.title}
                </h4>
                <p className="text-xs text-blue-200/80 font-sans mt-1 italic">
                  {activeItem.subtitle}
                </p>
              </div>

              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Executive Summary
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              {/* Thumbnails Navigator */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                  All 15 Book Infographics
                </span>
                <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {ALL_INFOGRAPHICS.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentId(item.id);
                        setZoomLevel(1);
                        setImgError(false);
                      }}
                      className={`relative aspect-3/4 rounded overflow-hidden border cursor-pointer transition-all ${
                        item.id === currentId
                          ? 'border-blue-400 ring-2 ring-blue-500/50 scale-105'
                          : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                      }`}
                      title={item.title}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-mono text-center text-white py-0.5">
                        {item.chapterNumber === 0 ? 'Intro' : item.chapterNumber <= 11 ? `Ch ${item.chapterNumber}` : 'Blueprint'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href={activeItem.imageUrl}
                download={`${activeItem.id}.png`}
                className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download High-Res PNG</span>
              </a>

              {onOpenBuyModal && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenBuyModal();
                  }}
                  className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Order the Book (Hardcover & Digital)</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
