import React, { useState } from 'react';
import { X, ArrowRight, RotateCcw, CheckCircle, Download, Share2 } from 'lucide-react';
import { ASSESSMENT_QUESTIONS, calculateAssessmentResult, AssessmentResult } from '../data/assessmentData';

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'creator' | 'architect' | 'orchestrator'>>({});
  const [completed, setCompleted] = useState<boolean>(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const currentQ = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;

  const handleSelectOption = (stage: 'creator' | 'architect' | 'orchestrator') => {
    const updatedAnswers = {
      ...answers,
      [currentQ.id]: stage,
    };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const calculated = calculateAssessmentResult(updatedAnswers);
      setResult(calculated);
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setCompleted(false);
    setResult(null);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `I just took the C.A.O. Engineering Assessment from Beyond AI Engineering by Harsh Verma! My result: ${result?.archetypeTitle} (Creator: ${result?.creatorPct}%, Architect: ${result?.architectPct}%, Orchestrator: ${result?.orchestratorPct}%).`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAFAF7] rounded-2xl border border-[#101828]/10 shadow-2xl p-6 sm:p-8 my-8 text-[#101828]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#475467] hover:text-[#101828] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
          aria-label="Close assessment"
        >
          <X className="w-5 h-5" />
        </button>

        {!completed ? (
          <div>
            {/* Header & Progress */}
            <div className="mb-6 pb-4 border-b border-[#101828]/10">
              <div className="flex items-center justify-between text-xs font-mono text-[#475467] mb-2">
                <span>C.A.O. CAREER DIAGNOSTIC</span>
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              </div>
              <div className="w-full bg-[#101828]/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-900 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Scenario */}
            <div className="mb-8">
              <span className="text-xs uppercase tracking-wider font-mono text-blue-900 block mb-2 font-semibold">
                Scenario 0{currentQuestionIndex + 1}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101828] leading-snug">
                {currentQ.scenario}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.stage)}
                  className="w-full text-left p-4 sm:p-5 rounded-xl border border-[#101828]/10 bg-white hover:border-blue-900 hover:ring-1 hover:ring-blue-900/20 transition-all text-sm group cursor-pointer shadow-xs"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full border border-[#101828]/20 flex items-center justify-center font-mono text-xs text-[#475467] shrink-0 group-hover:border-blue-900 group-hover:text-blue-900 group-hover:bg-blue-50">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-[#101828] font-medium leading-relaxed">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer Back action if > 0 */}
            <div className="flex justify-between items-center text-xs text-[#475467]">
              {currentQuestionIndex > 0 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  className="hover:text-[#101828] underline underline-offset-4 cursor-pointer"
                >
                  ← Previous question
                </button>
              ) : (
                <span />
              )}
              <span>Answer honestly based on your real engineering instinct</span>
            </div>
          </div>
        ) : (
          /* Assessment Results Screen */
          result && (
            <div className="animate-in fade-in duration-300">
              <div className="text-center mb-6 pb-6 border-b border-[#101828]/10">
                <span className="text-xs font-mono uppercase tracking-widest text-[#475467] block mb-1">
                  Your C.A.O. Diagnostic Results
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#101828] mb-2">
                  {result.archetypeTitle}
                </h3>
                <p className="text-sm text-[#475467] max-w-lg mx-auto">
                  {result.summary}
                </p>
              </div>

              {/* Score Breakdown Bar */}
              <div className="bg-white p-5 rounded-xl border border-[#101828]/10 mb-6 shadow-xs">
                <div className="text-xs font-mono uppercase tracking-wider text-[#475467] mb-3 flex justify-between">
                  <span>Current Operating Profile</span>
                  <span className="text-[#101828] font-bold">100% Total Distribution</span>
                </div>

                {/* Multi-segment horizontal bar */}
                <div className="h-6 w-full rounded-md overflow-hidden flex text-[10px] font-bold text-white mb-4">
                  <div
                    style={{ width: `${result.creatorPct}%` }}
                    className="bg-blue-600 flex items-center justify-center transition-all"
                  >
                    {result.creatorPct > 15 ? `${result.creatorPct}%` : ''}
                  </div>
                  <div
                    style={{ width: `${result.architectPct}%` }}
                    className="bg-purple-600 flex items-center justify-center transition-all"
                  >
                    {result.architectPct > 15 ? `${result.architectPct}%` : ''}
                  </div>
                  <div
                    style={{ width: `${result.orchestratorPct}%` }}
                    className="bg-emerald-600 flex items-center justify-center transition-all"
                  >
                    {result.orchestratorPct > 15 ? `${result.orchestratorPct}%` : ''}
                  </div>
                </div>

                {/* Metric labels */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-blue-50 rounded">
                    <span className="block text-[10px] uppercase font-mono text-blue-800">Creator (Build)</span>
                    <strong className="text-base font-bold text-blue-900">{result.creatorPct}%</strong>
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <span className="block text-[10px] uppercase font-mono text-purple-800">Architect (Design)</span>
                    <strong className="text-base font-bold text-purple-900">{result.architectPct}%</strong>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded">
                    <span className="block text-[10px] uppercase font-mono text-emerald-800">Orchestrator (Lead)</span>
                    <strong className="text-base font-bold text-emerald-900">{result.orchestratorPct}%</strong>
                  </div>
                </div>
              </div>

              {/* Strengths & Blind Spots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
                <div className="p-4 bg-white rounded-lg border border-[#101828]/10">
                  <h4 className="font-semibold text-emerald-900 uppercase font-mono tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Key Strengths
                  </h4>
                  <ul className="space-y-1.5 text-[#475467]">
                    {result.keyStrengths.map((str, idx) => (
                      <li key={idx}>· {str}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-lg border border-[#101828]/10">
                  <h4 className="font-semibold text-amber-900 uppercase font-mono tracking-wider mb-2">
                    Blind Spots to Watch
                  </h4>
                  <ul className="space-y-1.5 text-[#475467]">
                    {result.blindSpots.map((spot, idx) => (
                      <li key={idx}>· {spot}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended 30-Day Actions */}
              <div className="bg-[#FAF9F5] p-4 rounded-lg border border-[#101828]/10 mb-6 text-xs">
                <h4 className="font-semibold text-blue-950 uppercase font-mono tracking-wider mb-2">
                  Your Recommended 30-Day Growth Actions
                </h4>
                <ul className="space-y-1.5 text-[#101828]">
                  {result.recommended30DayActions.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-blue-800 font-bold">0{idx + 1}.</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleRestart}
                    className="px-3 py-2 text-xs border border-[#101828]/20 rounded-md text-[#475467] hover:text-[#101828] hover:bg-black/5 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-3 py-2 text-xs border border-[#101828]/20 rounded-md text-[#475467] hover:text-[#101828] hover:bg-black/5 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copied Summary!' : 'Share Profile'}</span>
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
                    <span>Read Beyond AI Engineering</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
};
