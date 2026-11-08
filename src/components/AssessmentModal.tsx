import React, { useState } from 'react';
import { X, ArrowRight, RotateCcw, CheckCircle, Share2, Printer, Award, FileText } from 'lucide-react';
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
        `I just took the C.A.O. Engineering Assessment from Beyond AI Engineering by Harsh Verma! My archetype: ${result?.archetypeTitle} (Creator: ${result?.creatorPct}%, Architect: ${result?.architectPct}%, Orchestrator: ${result?.orchestratorPct}%). Discover yours: https://www.beyondaiengineering.com/cao-framework`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    document.body.classList.add('printing-assessment');
    const cleanup = () => {
      document.body.classList.remove('printing-assessment');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
    // Fallback for browsers that don't trigger afterprint
    setTimeout(cleanup, 1500);
  };

  // Geometry for C.A.O. Triad Radar
  const renderTriadRadar = (creatorPct: number, architectPct: number, orchestratorPct: number, isPrint = false) => {
    const cx = 130;
    const cy = 115;
    const R = 72;
    const sin30 = 0.5;
    const cos30 = 0.8660;

    // Minimum radius so 0% still has a small visible vertex anchor
    const cR = Math.max(8, (creatorPct / 100) * R);
    const aR = Math.max(8, (architectPct / 100) * R);
    const oR = Math.max(8, (orchestratorPct / 100) * R);

    // Vertex points for user polygon
    const cPt = { x: cx, y: cy - cR };
    const aPt = { x: cx + aR * cos30, y: cy + aR * sin30 };
    const oPt = { x: cx - oR * cos30, y: cy + oR * sin30 };

    // Outer reference triangle
    const outC = `${cx},${cy - R}`;
    const outA = `${cx + R * cos30},${cy + R * sin30}`;
    const outO = `${cx - R * cos30},${cy + R * sin30}`;

    // Mid reference triangle (66%)
    const midR = R * 0.66;
    const midC = `${cx},${cy - midR}`;
    const midA = `${cx + midR * cos30},${cy + midR * sin30}`;
    const midO = `${cx - midR * cos30},${cy + midR * sin30}`;

    // Inner reference triangle (33%)
    const inR = R * 0.33;
    const inC = `${cx},${cy - inR}`;
    const inA = `${cx + inR * cos30},${cy + inR * sin30}`;
    const inO = `${cx - inR * cos30},${cy + inR * sin30}`;

    return (
      <svg
        viewBox="0 0 260 215"
        className={`w-full max-w-[280px] mx-auto select-none overflow-visible ${isPrint ? 'my-3' : ''}`}
        aria-label="C.A.O. Triad Radar Chart"
      >
        {/* Background Grid Triangles */}
        <polygon
          points={`${outC} ${outA} ${outO}`}
          fill="none"
          stroke={isPrint ? '#CBD5E1' : 'currentColor'}
          className="text-slate-300 dark:text-slate-700/60"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <polygon
          points={`${midC} ${midA} ${midO}`}
          fill="none"
          stroke={isPrint ? '#E2E8F0' : 'currentColor'}
          className="text-slate-200 dark:text-slate-800"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <polygon
          points={`${inC} ${inA} ${inO}`}
          fill="none"
          stroke={isPrint ? '#F1F5F9' : 'currentColor'}
          className="text-slate-100 dark:text-slate-800/60"
          strokeWidth="1"
        />

        {/* Radial Spokes from Center */}
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - R}
          stroke={isPrint ? '#94A3B8' : 'currentColor'}
          className="text-slate-300 dark:text-slate-700"
          strokeWidth="1"
        />
        <line
          x1={cx}
          y1={cy}
          x2={cx + R * cos30}
          y2={cy + R * sin30}
          stroke={isPrint ? '#94A3B8' : 'currentColor'}
          className="text-slate-300 dark:text-slate-700"
          strokeWidth="1"
        />
        <line
          x1={cx}
          y1={cy}
          x2={cx - R * cos30}
          y2={cy + R * sin30}
          stroke={isPrint ? '#94A3B8' : 'currentColor'}
          className="text-slate-300 dark:text-slate-700"
          strokeWidth="1"
        />

        {/* Center Point */}
        <circle cx={cx} cy={cy} r={2} className="fill-slate-400 dark:fill-slate-600" />

        {/* User Data Polygon */}
        <polygon
          points={`${cPt.x},${cPt.y} ${aPt.x},${aPt.y} ${oPt.x},${oPt.y}`}
          className={
            isPrint
              ? 'fill-blue-600/25 stroke-blue-700'
              : 'fill-blue-600/30 dark:fill-blue-400/25 stroke-blue-600 dark:stroke-blue-400'
          }
          strokeWidth="2"
        />

        {/* Data Vertices */}
        <circle cx={cPt.x} cy={cPt.y} r={4.5} className="fill-blue-600 dark:fill-blue-400 stroke-white stroke-2" />
        <circle cx={aPt.x} cy={aPt.y} r={4.5} className="fill-purple-600 dark:fill-purple-400 stroke-white stroke-2" />
        <circle cx={oPt.x} cy={oPt.y} r={4.5} className="fill-emerald-600 dark:fill-emerald-400 stroke-white stroke-2" />

        {/* Vertex Axis Labels */}
        {/* Creator (Top) */}
        <text
          x={cx}
          y={cy - R - 14}
          textAnchor="middle"
          className="text-[10px] font-mono font-semibold fill-blue-700 dark:fill-blue-300 uppercase tracking-wider"
        >
          Creator ({creatorPct}%)
        </text>
        <text
          x={cx}
          y={cy - R - 4}
          textAnchor="middle"
          className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400"
        >
          Build & Syntax
        </text>

        {/* Architect (Bottom Right) */}
        <text
          x={cx + R * cos30 + 10}
          y={cy + R * sin30 + 14}
          textAnchor="start"
          className="text-[10px] font-mono font-semibold fill-purple-700 dark:fill-purple-300 uppercase tracking-wider"
        >
          Architect ({architectPct}%)
        </text>
        <text
          x={cx + R * cos30 + 10}
          y={cy + R * sin30 + 24}
          textAnchor="start"
          className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400"
        >
          Design & Boundaries
        </text>

        {/* Orchestrator (Bottom Left) */}
        <text
          x={cx - R * cos30 - 10}
          y={cy + R * sin30 + 14}
          textAnchor="end"
          className="text-[10px] font-mono font-semibold fill-emerald-700 dark:fill-emerald-300 uppercase tracking-wider"
        >
          Orchestrator ({orchestratorPct}%)
        </text>
        <text
          x={cx - R * cos30 - 10}
          y={cy + R * sin30 + 24}
          textAnchor="end"
          className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400"
        >
          Governance & Trust
        </text>
      </svg>
    );
  };

  const currentDateString = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* 1. Modal Viewport Presentation (Screen) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto no-print">
        <div className="relative w-full max-w-2xl bg-[#FAFAF7] dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 my-8 text-[#101828] dark:text-slate-100 transition-colors">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close assessment"
          >
            <X className="w-5 h-5" />
          </button>

          {!completed ? (
            <div>
              {/* Header & Progress */}
              <div className="mb-6 pb-4 border-b border-[#101828]/10 dark:border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-[#475467] dark:text-slate-400 mb-2">
                  <span className="font-semibold text-blue-900 dark:text-blue-300 tracking-wider">
                    C.A.O. CAREER BENCHMARK
                  </span>
                  <span>Scenario {currentQuestionIndex + 1} of {totalQuestions}</span>
                </div>
                <div className="w-full bg-[#101828]/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-900 dark:bg-blue-400 h-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Scenario */}
              <div className="mb-7">
                <span className="text-xs uppercase tracking-wider font-mono text-blue-900 dark:text-blue-400 block mb-2 font-semibold">
                  Scenario {currentQuestionIndex + 1 < 10 ? `0${currentQuestionIndex + 1}` : currentQuestionIndex + 1}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101828] dark:text-white leading-snug">
                  {currentQ.scenario}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option.stage)}
                    className="w-full text-left p-4 sm:p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#11192E] hover:border-blue-900 dark:hover:border-blue-400 hover:ring-1 hover:ring-blue-900/20 dark:hover:ring-blue-400/20 transition-all text-sm group cursor-pointer shadow-xs"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full border border-[#101828]/20 dark:border-white/20 flex items-center justify-center font-mono text-xs text-[#475467] dark:text-slate-400 shrink-0 group-hover:border-blue-900 dark:group-hover:border-blue-400 group-hover:text-blue-900 dark:group-hover:text-blue-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-[#101828] dark:text-slate-100 font-medium leading-relaxed">
                        {option.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer Back action if > 0 */}
              <div className="flex justify-between items-center text-xs text-[#475467] dark:text-slate-400">
                {currentQuestionIndex > 0 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    className="hover:text-[#101828] dark:hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    ← Previous scenario
                  </button>
                ) : (
                  <span />
                )}
                <span>10 real-world engineering decisions</span>
              </div>
            </div>
          ) : (
            /* Assessment Results Screen */
            result && (
              <div className="animate-in fade-in duration-300">
                <div className="text-center mb-6 pb-6 border-b border-[#101828]/10 dark:border-white/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#475467] dark:text-slate-400 block mb-1">
                    C.A.O. Diagnostic Results · {currentDateString}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white mb-2">
                    {result.archetypeTitle}
                  </h3>
                  <p className="text-sm text-[#475467] dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                {/* Radar Chart & Distribution Grid */}
                <div className="bg-white dark:bg-[#11192E] p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 mb-6 shadow-xs">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 mb-3 flex justify-between items-center">
                    <span>Operating Equilibrium</span>
                    <span className="font-semibold text-blue-900 dark:text-blue-300">10-Scenario Metric</span>
                  </div>

                  {/* SVG Triad Radar Visualization */}
                  <div className="py-2">
                    {renderTriadRadar(result.creatorPct, result.architectPct, result.orchestratorPct)}
                  </div>

                  {/* Multi-segment horizontal bar */}
                  <div className="h-4 w-full rounded-md overflow-hidden flex text-[10px] font-bold text-white mb-4">
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

                  {/* Unboxed metric numbers (zero-pill discipline) */}
                  <div className="grid grid-cols-3 gap-3 text-center border-t border-[#101828]/10 dark:border-white/10 pt-3">
                    <div>
                      <span className="block text-[10px] uppercase font-mono text-blue-800 dark:text-blue-300 font-semibold">
                        Creator
                      </span>
                      <strong className="text-lg font-bold text-[#101828] dark:text-white font-mono tabular-nums">
                        {result.creatorPct}%
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-mono text-purple-800 dark:text-purple-300 font-semibold">
                        Architect
                      </span>
                      <strong className="text-lg font-bold text-[#101828] dark:text-white font-mono tabular-nums">
                        {result.architectPct}%
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-mono text-emerald-800 dark:text-emerald-300 font-semibold">
                        Orchestrator
                      </span>
                      <strong className="text-lg font-bold text-[#101828] dark:text-white font-mono tabular-nums">
                        {result.orchestratorPct}%
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Strengths & Blind Spots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
                  <div className="p-4 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/10 dark:border-white/10">
                    <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 uppercase font-mono tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Key Strengths
                    </h4>
                    <ul className="space-y-1.5 text-[#475467] dark:text-slate-300 leading-relaxed">
                      {result.keyStrengths.map((str, idx) => (
                        <li key={idx}>· {str}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/10 dark:border-white/10">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-300 uppercase font-mono tracking-wider mb-2">
                      Blind Spots to Watch
                    </h4>
                    <ul className="space-y-1.5 text-[#475467] dark:text-slate-300 leading-relaxed">
                      {result.blindSpots.map((spot, idx) => (
                        <li key={idx}>· {spot}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommended 30-Day Actions */}
                <div className="bg-[#FAF9F5] dark:bg-[#11192E] p-4 rounded-lg border border-[#101828]/10 dark:border-white/10 mb-6 text-xs">
                  <h4 className="font-semibold text-blue-950 dark:text-blue-300 uppercase font-mono tracking-wider mb-2">
                    Your Recommended 30-Day Growth Roadmap
                  </h4>
                  <ul className="space-y-1.5 text-[#101828] dark:text-slate-200">
                    {result.recommended30DayActions.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-blue-800 dark:text-blue-400 font-bold">0{idx + 1}.</span>
                        <span className="leading-relaxed">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#101828]/10 dark:border-white/10">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handlePrint}
                      className="px-3 py-2 text-xs border border-blue-900/30 dark:border-blue-400/30 rounded-md text-blue-900 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-950/40 hover:bg-blue-100/50 dark:hover:bg-blue-900/40 flex items-center gap-1.5 font-medium cursor-pointer"
                      title="Print or export as PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Export PDF Report</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="px-3 py-2 text-xs border border-[#101828]/20 dark:border-white/20 rounded-md text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copiedLink ? 'Copied Summary!' : 'Share'}</span>
                    </button>
                    <button
                      onClick={handleRestart}
                      className="px-3 py-2 text-xs border border-[#101828]/20 dark:border-white/20 rounded-md text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake</span>
                    </button>
                  </div>

                  {onOpenBuyModal && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBuyModal();
                      }}
                      className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
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

      {/* 2. Isolated Printable Executive PDF Report Document */}
      {result && (
        <div id="cao-print-report" className="hidden font-sans text-slate-900">
          <div className="max-w-3xl mx-auto border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 block">
                Official Career Benchmark
              </span>
              <h1 className="font-serif text-2xl font-bold text-slate-900">
                Beyond AI Engineering · C.A.O. Diagnostic
              </h1>
              <p className="text-xs text-slate-600">
                By Harsh Verma · Fellow BCS, IEEE Senior Member, Forbes Technology Council
              </p>
            </div>
            <div className="text-right font-mono text-xs text-slate-500">
              <div>Assessment Date: {currentDateString}</div>
              <div>ID: BAE-CAO-{Math.abs(result.creatorPct * 31 + result.orchestratorPct * 17)}</div>
            </div>
          </div>

          {/* Archetype Designation */}
          <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded">
            <span className="text-[11px] font-mono uppercase text-blue-900 tracking-wider font-semibold block mb-1">
              Primary Engineering Profile
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-950 mb-2">
              {result.archetypeTitle}
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Triad Breakdown with Vector Graphic */}
          <div className="grid grid-cols-2 gap-6 items-center mb-6 border border-slate-200 p-4 rounded">
            <div>
              {renderTriadRadar(result.creatorPct, result.architectPct, result.orchestratorPct, true)}
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="border-b border-slate-200 pb-1 font-bold text-slate-900 uppercase">
                Triad Equilibrium Breakdown
              </div>
              <div>
                <div className="flex justify-between text-blue-900 font-semibold mb-0.5">
                  <span>Creator (Build & Syntax):</span>
                  <span>{result.creatorPct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                  <div className="bg-blue-700 h-full" style={{ width: `${result.creatorPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-purple-900 font-semibold mb-0.5">
                  <span>Architect (Design & Boundaries):</span>
                  <span>{result.architectPct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                  <div className="bg-purple-700 h-full" style={{ width: `${result.architectPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-emerald-900 font-semibold mb-0.5">
                  <span>Orchestrator (Governance & Trust):</span>
                  <span>{result.orchestratorPct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                  <div className="bg-emerald-700 h-full" style={{ width: `${result.orchestratorPct}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Blind Spots */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="p-4 border border-slate-200 rounded">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-emerald-900 mb-2">
                Core Strengths
              </h3>
              <ul className="text-xs space-y-1.5 text-slate-700">
                {result.keyStrengths.map((str, idx) => (
                  <li key={idx}>✓ {str}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 border border-slate-200 rounded">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-amber-900 mb-2">
                Strategic Blind Spots
              </h3>
              <ul className="text-xs space-y-1.5 text-slate-700">
                {result.blindSpots.map((spot, idx) => (
                  <li key={idx}>⚠ {spot}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended 30-Day Plan */}
          <div className="p-4 border border-slate-200 rounded mb-8">
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-900 mb-2">
              Personalized 30-Day Transition Action Plan
            </h3>
            <ol className="text-xs space-y-2 text-slate-700 list-decimal pl-4">
              {result.recommended30DayActions.map((act, idx) => (
                <li key={idx} className="leading-relaxed">
                  {act}
                </li>
              ))}
            </ol>
          </div>

          {/* Author Footnote & Verification */}
          <div className="border-t border-slate-300 pt-3 text-[10px] font-mono text-slate-500 flex justify-between">
            <div>
              Beyond AI Engineering · Harsh Verma · ISBN 978-1-965432-01-3
            </div>
            <div>
              https://www.beyondaiengineering.com
            </div>
          </div>
        </div>
      )}
    </>
  );
};
