import React from 'react';
import { X, Sparkles, Activity } from 'lucide-react';
import { CAOBenchmark } from './CAOBenchmark';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBuyModal?: () => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  onOpenBuyModal,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 flex items-center justify-center bg-black/80 backdrop-blur-xs no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cao-benchmark-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-[#FAFAF7] dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col transition-colors">
        
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 px-6 py-4 border-b border-[#101828]/10 dark:border-white/10 bg-[#FAFAF7]/95 dark:bg-[#0D1527]/95 backdrop-blur-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <div>
              <h2
                id="cao-benchmark-modal-title"
                className="font-serif text-lg sm:text-xl font-bold text-[#101828] dark:text-white leading-tight"
              >
                C.A.O. Career Benchmark & Role Diagnostic
              </h2>
              <span className="text-[11px] font-mono text-[#475467] dark:text-slate-400 block">
                Based on Beyond AI Engineering by Harsh Verma
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close diagnostic"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 overscroll-contain">
          <CAOBenchmark
            isModal={true}
            onOpenBuyModal={onOpenBuyModal}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};
