import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, RotateCcw, Share2, Printer, Compass, AlertCircle, Award, BookOpen } from 'lucide-react';
import { ASSESSMENT_QUESTIONS, calculateAssessmentResult, AssessmentResult } from '../data/assessmentData';

interface CAOBenchmarkProps {
  isModal?: boolean;
  onOpenBuyModal?: () => void;
  onClose?: () => void;
}

export const CAOBenchmark: React.FC<CAOBenchmarkProps> = ({
  isModal = false,
  onOpenBuyModal,
  onClose,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'creator' | 'architect' | 'orchestrator'>>({});
  const [completed, setCompleted] = useState<boolean>(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

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
    if (!result) return;
    const shareText = `I just completed the Executive C.A.O. Benchmark from Beyond AI Engineering by Harsh Verma!\nMy Result: ${result.archetypeTitle} (Creator: ${result.creatorPct}%, Architect: ${result.architectPct}%, Orchestrator: ${result.orchestratorPct}%).\nTake the benchmark: https://www.beyondaiengineering.com/cao-framework`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
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
    setTimeout(cleanup, 1500);
  };

  const currentDateString = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // SVG Geometry for C.A.O. Triad Radar
  // ViewBox: 0 0 340 240 ensures ample horizontal margin for labels
  const renderTriadRadar = (creatorPct: number, architectPct: number, orchestratorPct: number, isPrint = false) => {
    const cx = 170;
    const cy = 118;
    const R = 68;
    const sin30 = 0.5;
    const cos30 = 0.8660;

    // Minimum radius so 0% has an anchor point
    const cR = Math.max(10, (creatorPct / 100) * R);
    const aR = Math.max(10, (architectPct / 100) * R);
    const oR = Math.max(10, (orchestratorPct / 100) * R);

    // Vertex points for user data polygon
    const cPt = { x: cx, y: cy - cR };
    const aPt = { x: cx + aR * cos30, y: cy + aR * sin30 };
    const oPt = { x: cx - oR * cos30, y: cy + oR * sin30 };

    // Outer reference triangle (100%)
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
        viewBox="0 0 340 240"
        className={`w-full max-w-[320px] mx-auto select-none overflow-visible ${isPrint ? 'my-2' : ''}`}
        aria-label="C.A.O. Triad Radar Visualization"
      >
        {/* Background Grid Triangles */}
        <polygon
          points={`${outC} ${outA} ${outO}`}
          fill="none"
          stroke={isPrint ? '#94A3B8' : 'currentColor'}
          className="text-slate-300 dark:text-slate-700/80"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <polygon
          points={`${midC} ${midA} ${midO}`}
          fill="none"
          stroke={isPrint ? '#CBD5E1' : 'currentColor'}
          className="text-slate-200 dark:text-slate-800"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <polygon
          points={`${inC} ${inA} ${inO}`}
          fill="none"
          stroke={isPrint ? '#E2E8F0' : 'currentColor'}
          className="text-slate-100 dark:text-slate-800/50"
          strokeWidth="1"
        />

        {/* Center Spokes */}
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

        {/* Center Anchor Point */}
        <circle cx={cx} cy={cy} r={2.5} className="fill-slate-400 dark:fill-slate-500" />

        {/* User Polygon */}
        <polygon
          points={`${cPt.x},${cPt.y} ${aPt.x},${aPt.y} ${oPt.x},${oPt.y}`}
          className={
            isPrint
              ? 'fill-blue-600/30 stroke-blue-700'
              : 'fill-blue-600/25 dark:fill-blue-400/25 stroke-blue-600 dark:stroke-blue-400'
          }
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Vertex Markers */}
        <circle cx={cPt.x} cy={cPt.y} r={4.5} className="fill-blue-600 dark:fill-blue-400 stroke-white stroke-2" />
        <circle cx={aPt.x} cy={aPt.y} r={4.5} className="fill-purple-600 dark:fill-purple-400 stroke-white stroke-2" />
        <circle cx={oPt.x} cy={oPt.y} r={4.5} className="fill-emerald-600 dark:fill-emerald-400 stroke-white stroke-2" />

        {/* Axis Labels - Positioned safely inside 340px width */}
        {/* Creator (Top) */}
        <text
          x={cx}
          y={cy - R - 18}
          textAnchor="middle"
          className="text-[11px] font-mono font-bold fill-blue-800 dark:fill-blue-300 uppercase tracking-wider"
        >
          Creator ({creatorPct}%)
        </text>
        <text
          x={cx}
          y={cy - R - 6}
          textAnchor="middle"
          className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400"
        >
          Build & Syntax
        </text>

        {/* Architect (Bottom Right) */}
        <text
          x={cx + R * cos30 + 12}
          y={cy + R * sin30 + 12}
          textAnchor="start"
          className="text-[11px] font-mono font-bold fill-purple-800 dark:fill-purple-300 uppercase tracking-wider"
        >
          Architect ({architectPct}%)
        </text>
        <text
          x={cx + R * cos30 + 12}
          y={cy + R * sin30 + 24}
          textAnchor="start"
          className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400"
        >
          Design & Boundaries
        </text>

        {/* Orchestrator (Bottom Left) */}
        <text
          x={cx - R * cos30 - 12}
          y={cy + R * sin30 + 12}
          textAnchor="end"
          className="text-[11px] font-mono font-bold fill-emerald-800 dark:fill-emerald-300 uppercase tracking-wider"
        >
          Orchestrator ({orchestratorPct}%)
        </text>
        <text
          x={cx - R * cos30 - 12}
          y={cy + R * sin30 + 24}
          textAnchor="end"
          className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400"
        >
          Governance & Trust
        </text>
      </svg>
    );
  };

  return (
    <div className="w-full">
      {!completed ? (
        /* Question Form */
        <div>
          {/* Header & Progress Indicator */}
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

          {/* Scenario Headline */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider font-mono text-blue-900 dark:text-blue-400 block mb-2 font-semibold">
              Scenario {currentQuestionIndex + 1 < 10 ? `0${currentQuestionIndex + 1}` : currentQuestionIndex + 1}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101828] dark:text-white leading-snug text-balance">
              {currentQ.scenario}
            </h3>
          </div>

          {/* Decision Options */}
          <div className="space-y-3 mb-6">
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

          {/* Previous Scenario Action */}
          <div className="flex justify-between items-center text-xs text-[#475467] dark:text-slate-400 pt-2 border-t border-[#101828]/10 dark:border-white/10">
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
            <span>Select based on your real engineering instinct</span>
          </div>
        </div>
      ) : (
        /* Results Presentation Screen */
        result && (
          <div className="space-y-6">
            {/* Top Archetype Banner */}
            <div className="text-center pb-5 border-b border-[#101828]/10 dark:border-white/10">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-300 font-semibold mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Diagnostic Completed · {currentDateString}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white mb-2 text-balance">
                {result.archetypeTitle}
              </h3>
              <p className="text-sm text-[#475467] dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Dashboard: Radar Chart & Metrics Grid */}
            <div className="bg-white dark:bg-[#11192E] p-5 sm:p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Radar Chart (Left on desktop) */}
                <div className="md:col-span-6 flex flex-col items-center justify-center">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 mb-2">
                    Triad Operating Equilibrium
                  </span>
                  {renderTriadRadar(result.creatorPct, result.architectPct, result.orchestratorPct)}
                </div>

                {/* Metric Breakdown (Right on desktop) */}
                <div className="md:col-span-6 space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono text-[#475467] dark:text-slate-400 mb-1.5">
                      <span>Total Distribution</span>
                      <span className="font-bold text-[#101828] dark:text-white">100% Equilibrium</span>
                    </div>
                    {/* Multi-segment horizontal bar */}
                    <div className="h-3 w-full rounded-md overflow-hidden flex text-[9px] font-bold text-white shadow-inner">
                      <div
                        style={{ width: `${result.creatorPct}%` }}
                        className="bg-blue-600 flex items-center justify-center transition-all"
                      />
                      <div
                        style={{ width: `${result.architectPct}%` }}
                        className="bg-purple-600 flex items-center justify-center transition-all"
                      />
                      <div
                        style={{ width: `${result.orchestratorPct}%` }}
                        className="bg-emerald-600 flex items-center justify-center transition-all"
                      />
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="space-y-2.5">
                    <div className="p-2.5 bg-blue-50/70 dark:bg-blue-950/40 rounded-lg border border-blue-100 dark:border-blue-900/30 flex justify-between items-center">
                      <div>
                        <span className="block text-[11px] font-mono font-semibold text-blue-900 dark:text-blue-300">
                          Creator (Build & Syntax)
                        </span>
                        <span className="text-[10px] text-blue-800/80 dark:text-blue-400/80">
                          Rapid prototyping & code execution
                        </span>
                      </div>
                      <span className="text-lg font-bold font-mono tabular-nums text-blue-950 dark:text-blue-200">
                        {result.creatorPct}%
                      </span>
                    </div>

                    <div className="p-2.5 bg-purple-50/70 dark:bg-purple-950/40 rounded-lg border border-purple-100 dark:border-purple-900/30 flex justify-between items-center">
                      <div>
                        <span className="block text-[11px] font-mono font-semibold text-purple-900 dark:text-purple-300">
                          Architect (Design & Boundaries)
                        </span>
                        <span className="text-[10px] text-purple-800/80 dark:text-purple-400/80">
                          Trade-offs, invariants & AI product sense
                        </span>
                      </div>
                      <span className="text-lg font-bold font-mono tabular-nums text-purple-950 dark:text-purple-200">
                        {result.architectPct}%
                      </span>
                    </div>

                    <div className="p-2.5 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-lg border border-emerald-100 dark:border-emerald-900/30 flex justify-between items-center">
                      <div>
                        <span className="block text-[11px] font-mono font-semibold text-emerald-900 dark:text-emerald-300">
                          Orchestrator (Governance & Trust)
                        </span>
                        <span className="text-[10px] text-emerald-800/80 dark:text-emerald-400/80">
                          Multi-agent diplomacy & organizational trust
                        </span>
                      </div>
                      <span className="text-lg font-bold font-mono tabular-nums text-emerald-950 dark:text-emerald-200">
                        {result.orchestratorPct}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Blind Spots Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white dark:bg-[#11192E] rounded-xl border border-[#101828]/10 dark:border-white/10">
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 uppercase font-mono tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  Key Strengths
                </h4>
                <ul className="space-y-2 text-[#475467] dark:text-slate-300 leading-relaxed">
                  {result.keyStrengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 dark:text-emerald-400">·</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white dark:bg-[#11192E] rounded-xl border border-[#101828]/10 dark:border-white/10">
                <h4 className="font-semibold text-amber-900 dark:text-amber-300 uppercase font-mono tracking-wider mb-2.5 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  Blind Spots to Watch
                </h4>
                <ul className="space-y-2 text-[#475467] dark:text-slate-300 leading-relaxed">
                  {result.blindSpots.map((spot, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 dark:text-amber-400">·</span>
                      <span>{spot}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended 30-Day Transition Roadmap */}
            <div className="bg-[#FAF9F5] dark:bg-[#11192E] p-4 sm:p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 text-xs">
              <h4 className="font-semibold text-blue-950 dark:text-blue-300 uppercase font-mono tracking-wider mb-2.5 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-blue-800 dark:text-blue-400 shrink-0" />
                Personalized 30-Day Transition Roadmap
              </h4>
              <ul className="space-y-2 text-[#101828] dark:text-slate-200">
                {result.recommended30DayActions.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-mono text-blue-800 dark:text-blue-400 font-bold shrink-0">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#101828]/10 dark:border-white/10">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 text-xs font-semibold border border-blue-900/30 dark:border-blue-400/30 rounded-md text-blue-900 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40 hover:bg-blue-100/70 dark:hover:bg-blue-900/50 flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                  title="Print or export as high-resolution PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Export PDF Report</span>
                </button>
                <button
                  onClick={handleShare}
                  className="px-3.5 py-2.5 text-xs font-medium border border-[#101828]/20 dark:border-white/20 rounded-md text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied Summary!' : 'Share Profile'}</span>
                </button>
                <button
                  onClick={handleRestart}
                  className="px-3.5 py-2.5 text-xs font-medium border border-[#101828]/20 dark:border-white/20 rounded-md text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>

              {onOpenBuyModal && (
                <button
                  onClick={() => {
                    if (onClose) onClose();
                    onOpenBuyModal();
                  }}
                  className="px-5 py-2.5 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Read Chapters 3 & 11 in the Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )
      )}

      {/* Formatted Isolated PDF Report for Print Mode */}
      {result && (
        <div id="cao-print-report" className="hidden font-sans text-slate-900">
          <div className="max-w-3xl mx-auto border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 block">
                Official Career Benchmark Report
              </span>
              <h1 className="font-serif text-2xl font-bold text-slate-900">
                Beyond AI Engineering · C.A.O. Diagnostic
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                By Harsh Verma · Fellow BCS, IEEE Senior Member, Forbes Technology Council
              </p>
            </div>
            <div className="text-right font-mono text-xs text-slate-500">
              <div>Assessment Date: {currentDateString}</div>
              <div>ID: BAE-CAO-{Math.abs(result.creatorPct * 31 + result.orchestratorPct * 17)}</div>
            </div>
          </div>

          {/* Archetype Profile */}
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
          <div className="p-4 border border-slate-200 rounded mb-6">
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
    </div>
  );
};
