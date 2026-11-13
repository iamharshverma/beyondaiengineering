import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Share2,
  Printer,
  Compass,
  AlertCircle,
  Award,
  Download,
  BookOpen,
  Mail,
  Loader2,
  Send,
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS, calculateAssessmentResult, AssessmentResult } from '../data/assessmentData';
import { SITE_CONFIG } from '../config/siteConfig';
import { trackEvent } from '../utils/analytics';
import { sendBookInquiryToAuthor, AUTHOR_EMAIL } from '../utils/emailService';

interface CAOBenchmarkProps {
  isModal?: boolean;
  onOpenBuyModal?: () => void;
  onClose?: () => void;
}

export const CAOBenchmark: React.FC<CAOBenchmarkProps> = ({
  onOpenBuyModal,
  onClose,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'creator' | 'architect' | 'orchestrator'>>({});
  const [completed, setCompleted] = useState<boolean>(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadedReport, setDownloadedReport] = useState(false);

  // Optional non-gated email plan dispatch state
  const [planEmail, setPlanEmail] = useState('');
  const [planName, setPlanName] = useState('');
  const [planSending, setPlanSending] = useState(false);
  const [planStatus, setPlanStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');
  const [planMessage, setPlanMessage] = useState('');
  const [planMailto, setPlanMailto] = useState('');

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
      trackEvent('cao_assessment_complete', {
        archetype: calculated.archetypeTitle,
        creatorPct: calculated.creatorPct,
        architectPct: calculated.architectPct,
        orchestratorPct: calculated.orchestratorPct,
      });
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setCompleted(false);
    setResult(null);
    setPlanStatus('idle');
    setPlanEmail('');
    setPlanName('');
  };

  const currentDateString = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const reportId = result
    ? `BAE-CAO-${Math.abs(result.creatorPct * 31 + result.orchestratorPct * 17 + 104)}`
    : '';

  const handleShare = () => {
    if (!result) return;
    const shareText = `I completed the C.A.O. Benchmark from ${SITE_CONFIG.book.title} by ${SITE_CONFIG.author.name}.\nProfile: ${result.archetypeTitle} (Creator: ${result.creatorPct}%, Architect: ${result.architectPct}%, Orchestrator: ${result.orchestratorPct}%).\nExplore: ${SITE_CONFIG.canonicalOrigin}/cao-framework`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSendPlanEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || !planEmail.trim()) return;
    setPlanSending(true);
    try {
      const summaryNotes = [
        `Diagnostic Profile: ${result.archetypeTitle} (${reportId})`,
        `Triad Balance: Creator ${result.creatorPct}% | Architect ${result.architectPct}% | Orchestrator ${result.orchestratorPct}%`,
        `30-Day Plan:\n${result.recommended30DayActions.map((a, i) => `${i + 1}. ${a}`).join('\n')}`,
        `Recommended Chapters: ${result.recommendedChapters.map((c) => `Ch ${c.chapter} (${c.title})`).join(', ')}`,
      ].join('\n\n');

      const res = await sendBookInquiryToAuthor({
        formType: 'C.A.O. Assessment Report',
        name: planName.trim() || 'C.A.O. Assessment Reader',
        email: planEmail.trim(),
        formatOrCopies: result.archetypeTitle,
        notesOrMessage: summaryNotes,
        sourcePage: '/cao-framework (Assessment Optional Plan)',
      });
      setPlanMailto(res.mailtoUrl);
      setPlanMessage(res.message);
      setPlanStatus(res.success ? 'sent' : 'fallback');
    } finally {
      setPlanSending(false);
    }
  };

  const generatePrintRadarSvg = (creatorPct: number, architectPct: number, orchestratorPct: number) => {
    const cx = 170;
    const cy = 118;
    const R = 68;
    const sin30 = 0.5;
    const cos30 = 0.866;

    const cR = Math.max(10, (creatorPct / 100) * R);
    const aR = Math.max(10, (architectPct / 100) * R);
    const oR = Math.max(10, (orchestratorPct / 100) * R);

    const cPt = { x: cx, y: cy - cR };
    const aPt = { x: cx + aR * cos30, y: cy + aR * sin30 };
    const oPt = { x: cx - oR * cos30, y: cy + oR * sin30 };

    const outC = `${cx},${cy - R}`;
    const outA = `${cx + R * cos30},${cy + R * sin30}`;
    const outO = `${cx - R * cos30},${cy + R * sin30}`;

    const midR = R * 0.66;
    const inR = R * 0.33;

    return `
      <svg viewBox="0 0 340 240" width="310" height="215" style="margin: 0 auto; display: block; overflow: visible;">
        <polygon points="${outC} ${outA} ${outO}" fill="none" stroke="#94A3B8" stroke-width="1.2" stroke-dasharray="3 3" />
        <polygon points="${cx},${cy - midR} ${cx + midR * cos30},${cy + midR * sin30} ${cx - midR * cos30},${cy + midR * sin30}" fill="none" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="2 2" />
        <polygon points="${cx},${cy - inR} ${cx + inR * cos30},${cy + inR * sin30} ${cx - inR * cos30},${cy + inR * sin30}" fill="none" stroke="#E2E8F0" stroke-width="1" />
        <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - R}" stroke="#94A3B8" stroke-width="1" />
        <line x1="${cx}" y1="${cy}" x2="${cx + R * cos30}" y2="${cy + R * sin30}" stroke="#94A3B8" stroke-width="1" />
        <line x1="${cx}" y1="${cy}" x2="${cx - R * cos30}" y2="${cy + R * sin30}" stroke="#94A3B8" stroke-width="1" />
        <circle cx="${cx}" cy="${cy}" r="2.5" fill="#64748B" />
        <polygon points="${cPt.x},${cPt.y} ${aPt.x},${aPt.y} ${oPt.x},${oPt.y}" fill="rgba(37, 99, 235, 0.25)" stroke="#1D4ED8" stroke-width="2.5" />
        <circle cx="${cPt.x}" cy="${cPt.y}" r="4.5" fill="#2563EB" stroke="#ffffff" stroke-width="2" />
        <circle cx="${aPt.x}" cy="${aPt.y}" r="4.5" fill="#9333EA" stroke="#ffffff" stroke-width="2" />
        <circle cx="${oPt.x}" cy="${oPt.y}" r="4.5" fill="#059669" stroke="#ffffff" stroke-width="2" />
        <text x="${cx}" y="${cy - R - 16}" text-anchor="middle" font-family="monospace" font-size="11px" font-weight="bold" fill="#1E40AF">CREATOR (${creatorPct}%)</text>
        <text x="${cx}" y="${cy - R - 5}" text-anchor="middle" font-family="monospace" font-size="9px" fill="#64748B">Build & Syntax</text>
        <text x="${cx + R * cos30 + 10}" y="${cy + R * sin30 + 12}" text-anchor="start" font-family="monospace" font-size="11px" font-weight="bold" fill="#6B21A8">ARCHITECT (${architectPct}%)</text>
        <text x="${cx + R * cos30 + 10}" y="${cy + R * sin30 + 23}" text-anchor="start" font-family="monospace" font-size="9px" fill="#64748B">Design & Boundaries</text>
        <text x="${cx - R * cos30 - 10}" y="${cy + R * sin30 + 12}" text-anchor="end" font-family="monospace" font-size="11px" font-weight="bold" fill="#065F46">ORCHESTRATOR (${orchestratorPct}%)</text>
        <text x="${cx - R * cos30 - 10}" y="${cy + R * sin30 + 23}" text-anchor="end" font-family="monospace" font-size="9px" fill="#64748B">Governance & Trust</text>
      </svg>
    `;
  };

  const handlePrint = () => {
    if (!result) return;
    trackEvent('resource_download', { resource: 'cao_pdf_report', archetype: result.archetypeTitle });

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    const radarSvgHtml = generatePrintRadarSvg(result.creatorPct, result.architectPct, result.orchestratorPct);

    const printHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${SITE_CONFIG.book.title} · C.A.O. Diagnostic Report · ${result.archetypeTitle}</title>
        <style>
          @page { size: A4 portrait; margin: 1.2cm 1.5cm; }
          * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
            color: #0F172A;
            background: #FFFFFF;
            margin: 0;
            padding: 0;
            font-size: 10pt;
            line-height: 1.5;
          }
          .header {
            border-bottom: 2px solid #0F172A;
            padding-bottom: 12px;
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .brand-title { font-family: Georgia, serif; font-size: 18pt; font-weight: bold; color: #0F172A; margin: 0; }
          .brand-sub { font-size: 8.5pt; color: #475569; margin-top: 3px; }
          .meta-box { text-align: right; font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 8pt; color: #64748B; line-height: 1.4; }
          .archetype-banner {
            background: #F8FAFC;
            border: 1px solid #CBD5E1;
            border-top: 3px solid #1E40AF;
            border-radius: 6px;
            padding: 14px 16px;
            margin-bottom: 16px;
          }
          .archetype-kicker { font-family: ui-monospace, monospace; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.1em; color: #1E40AF; font-weight: bold; margin-bottom: 3px; }
          .archetype-title { font-family: Georgia, serif; font-size: 16pt; font-weight: bold; color: #020617; margin: 0 0 6px 0; }
          .archetype-summary { font-size: 9pt; color: #334155; line-height: 1.5; margin: 0; }
          .dashboard-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 16px;
            border: 1px solid #E2E8F0;
            border-radius: 6px;
            padding: 14px;
            background: #FAFAFA;
            align-items: center;
          }
          .score-card { margin-bottom: 10px; }
          .score-label { display: flex; justify-content: space-between; font-family: ui-monospace, monospace; font-size: 8.5pt; margin-bottom: 3px; font-weight: 600; }
          .bar-bg { background: #E2E8F0; height: 7px; border-radius: 3.5px; overflow: hidden; }
          .bar-fill { height: 100%; border-radius: 3.5px; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
          .card { border: 1px solid #E2E8F0; border-radius: 6px; padding: 12px 14px; background: #FFFFFF; }
          .card-title { font-family: ui-monospace, monospace; font-size: 8pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px 0; }
          .text-emerald { color: #065F46; }
          .text-amber { color: #92400E; }
          .text-blue { color: #1E40AF; }
          ul, ol { margin: 0; padding-left: 16px; font-size: 8.5pt; color: #334155; }
          li { margin-bottom: 4px; line-height: 1.4; }
          .roadmap-box { border: 1px solid #E2E8F0; border-radius: 6px; padding: 12px 14px; background: #FFFFFF; margin-bottom: 12px; }
          .disclaimer { font-size: 7.5pt; color: #64748B; margin-bottom: 10px; }
          .footer { border-top: 1px solid #CBD5E1; padding-top: 8px; display: flex; justify-content: space-between; font-family: ui-monospace, monospace; font-size: 7.5pt; color: #64748B; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand-title">${SITE_CONFIG.book.title} · C.A.O. Self-Reflection</div>
            <div class="brand-sub">By ${SITE_CONFIG.author.name} · ${SITE_CONFIG.author.headline}</div>
          </div>
          <div class="meta-box">
            <div><strong>Date:</strong> ${currentDateString}</div>
            <div><strong>Profile ID:</strong> ${reportId}</div>
          </div>
        </div>

        <div class="archetype-banner">
          <div class="archetype-kicker">Primary Operating Profile</div>
          <div class="archetype-title">${result.archetypeTitle}</div>
          <p class="archetype-summary">${result.summary}</p>
        </div>

        <div class="dashboard-grid">
          <div>${radarSvgHtml}</div>
          <div>
            <div style="font-family: ui-monospace, monospace; font-size: 8pt; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 10px; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px;">
              Triad Operating Equilibrium
            </div>
            <div class="score-card">
              <div class="score-label" style="color: #1E40AF;"><span>Creator (Build & Syntax)</span><span>${result.creatorPct}%</span></div>
              <div class="bar-bg"><div class="bar-fill" style="width: ${result.creatorPct}%; background: #2563EB;"></div></div>
            </div>
            <div class="score-card">
              <div class="score-label" style="color: #6B21A8;"><span>Architect (Design & Boundaries)</span><span>${result.architectPct}%</span></div>
              <div class="bar-bg"><div class="bar-fill" style="width: ${result.architectPct}%; background: #9333EA;"></div></div>
            </div>
            <div class="score-card">
              <div class="score-label" style="color: #065F46;"><span>Orchestrator (Governance & Trust)</span><span>${result.orchestratorPct}%</span></div>
              <div class="bar-bg"><div class="bar-fill" style="width: ${result.orchestratorPct}%; background: #059669;"></div></div>
            </div>
          </div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-title text-emerald">✓ Key Strengths</div>
            <ul>${result.keyStrengths.map((str) => `<li>${str}</li>`).join('')}</ul>
          </div>
          <div class="card">
            <div class="card-title text-amber">Growth Opportunities</div>
            <ul>${result.blindSpots.map((spot) => `<li>${spot}</li>`).join('')}</ul>
          </div>
        </div>

        <div class="roadmap-box">
          <div class="card-title text-blue">Personalized 30-Day Transition Plan & Recommended Chapters</div>
          <ol>${result.recommended30DayActions.map((act) => `<li>${act}</li>`).join('')}</ol>
          <p style="font-size: 8pt; color: #334155; margin: 8px 0 0 0;">
            <strong>Chapters:</strong> ${result.recommendedChapters.map((c) => `Ch ${c.chapter}: ${c.title}`).join(' · ')}
          </p>
        </div>

        <div class="disclaimer">Note: This self-reflection diagnostic is an educational career-planning tool accompanying Beyond AI Engineering and is not a clinical or formal psychometric assessment.</div>

        <div class="footer">
          <div>${SITE_CONFIG.book.fullTitle} · ${SITE_CONFIG.author.name}</div>
          <div>${SITE_CONFIG.canonicalOrigin}/cao-framework</div>
        </div>
      </body>
      </html>
    `;

    doc.open();
    doc.write(printHtml);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }, 250);
  };

  const handleDownloadTextReport = () => {
    if (!result) return;
    trackEvent('resource_download', { resource: 'cao_text_report', archetype: result.archetypeTitle });

    const reportContent = `================================================================================
${SITE_CONFIG.book.fullTitle.toUpperCase()} · C.A.O. SELF-REFLECTION REPORT
Author: ${SITE_CONFIG.author.name} · ${SITE_CONFIG.author.headline}
Canonical Reference: ${SITE_CONFIG.canonicalOrigin}/cao-framework
================================================================================

ASSESSMENT DATE: ${currentDateString}
REPORT ID: ${reportId}

PRIMARY OPERATING PROFILE: ${result.archetypeTitle}
${result.summary}

TRIAD OPERATING EQUILIBRIUM:
• Creator (Build & Syntax):          ${result.creatorPct}%
• Architect (Design & Boundaries):   ${result.architectPct}%
• Orchestrator (Governance & Trust): ${result.orchestratorPct}%

CORE STRENGTHS:
${result.keyStrengths.map((s, idx) => `[${idx + 1}] ${s}`).join('\n')}

GROWTH OPPORTUNITIES:
${result.blindSpots.map((b, idx) => `[${idx + 1}] ${b}`).join('\n')}

30-DAY TRANSITION ROADMAP:
${result.recommended30DayActions.map((a, idx) => `[Step ${idx + 1}] ${a}`).join('\n')}

RECOMMENDED BOOK CHAPTERS:
${result.recommendedChapters.map((c) => `• Chapter ${c.chapter}: ${c.title} — ${c.reason}`).join('\n')}

RECOMMENDED LAB EXERCISES:
${result.recommendedExercises.map((e) => `• ${e}`).join('\n')}

================================================================================
Educational self-reflection guide from ${SITE_CONFIG.book.title}.
================================================================================
`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Beyond_AI_Engineering_CAO_Report_${result.archetypeTitle.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setDownloadedReport(true);
    setTimeout(() => setDownloadedReport(false), 2500);
  };

  const renderTriadRadar = (creatorPct: number, architectPct: number, orchestratorPct: number) => {
    const cx = 170;
    const cy = 118;
    const R = 68;
    const sin30 = 0.5;
    const cos30 = 0.866;

    const cR = Math.max(10, (creatorPct / 100) * R);
    const aR = Math.max(10, (architectPct / 100) * R);
    const oR = Math.max(10, (orchestratorPct / 100) * R);

    const cPt = { x: cx, y: cy - cR };
    const aPt = { x: cx + aR * cos30, y: cy + aR * sin30 };
    const oPt = { x: cx - oR * cos30, y: cy + oR * sin30 };

    const outC = `${cx},${cy - R}`;
    const outA = `${cx + R * cos30},${cy + R * sin30}`;
    const outO = `${cx - R * cos30},${cy + R * sin30}`;

    const midR = R * 0.66;
    const inR = R * 0.33;

    return (
      <svg
        viewBox="0 0 340 240"
        className="w-full max-w-[320px] mx-auto select-none overflow-visible"
        aria-label="C.A.O. Triad Radar Visualization"
      >
        <polygon
          points={`${outC} ${outA} ${outO}`}
          fill="none"
          stroke="currentColor"
          className="text-slate-300 dark:text-slate-700/80"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <polygon
          points={`${cx},${cy - midR} ${cx + midR * cos30},${cy + midR * sin30} ${cx - midR * cos30},${cy + midR * sin30}`}
          fill="none"
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-800"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <polygon
          points={`${cx},${cy - inR} ${cx + inR * cos30},${cy + inR * sin30} ${cx - inR * cos30},${cy + inR * sin30}`}
          fill="none"
          stroke="currentColor"
          className="text-slate-100 dark:text-slate-800/50"
          strokeWidth="1"
        />
        <line x1={cx} y1={cy} x2={cx} y2={cy - R} stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
        <line x1={cx} y1={cy} x2={cx + R * cos30} y2={cy + R * sin30} stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
        <line x1={cx} y1={cy} x2={cx - R * cos30} y2={cy + R * sin30} stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={2.5} className="fill-slate-400 dark:fill-slate-500" />
        <polygon
          points={`${cPt.x},${cPt.y} ${aPt.x},${aPt.y} ${oPt.x},${oPt.y}`}
          className="fill-blue-600/25 dark:fill-blue-400/25 stroke-blue-600 dark:stroke-blue-400"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx={cPt.x} cy={cPt.y} r={4.5} className="fill-blue-600 dark:fill-blue-400 stroke-white stroke-2" />
        <circle cx={aPt.x} cy={aPt.y} r={4.5} className="fill-purple-600 dark:fill-purple-400 stroke-white stroke-2" />
        <circle cx={oPt.x} cy={oPt.y} r={4.5} className="fill-emerald-600 dark:fill-emerald-400 stroke-white stroke-2" />
        <text x={cx} y={cy - R - 18} textAnchor="middle" className="text-[11px] font-mono font-bold fill-blue-800 dark:fill-blue-300 uppercase tracking-wider">
          Creator ({creatorPct}%)
        </text>
        <text x={cx} y={cy - R - 6} textAnchor="middle" className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400">
          Build & Syntax
        </text>
        <text x={cx + R * cos30 + 12} y={cy + R * sin30 + 12} textAnchor="start" className="text-[11px] font-mono font-bold fill-purple-800 dark:fill-purple-300 uppercase tracking-wider">
          Architect ({architectPct}%)
        </text>
        <text x={cx + R * cos30 + 12} y={cy + R * sin30 + 24} textAnchor="start" className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400">
          Design & Boundaries
        </text>
        <text x={cx - R * cos30 - 12} y={cy + R * sin30 + 12} textAnchor="end" className="text-[11px] font-mono font-bold fill-emerald-800 dark:fill-emerald-300 uppercase tracking-wider">
          Orchestrator ({orchestratorPct}%)
        </text>
        <text x={cx - R * cos30 - 12} y={cy + R * sin30 + 24} textAnchor="end" className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400">
          Governance & Trust
        </text>
      </svg>
    );
  };

  return (
    <div className="w-full">
      {!completed ? (
        <div>
          <div className="mb-6 pb-4 border-b border-[#101828]/10 dark:border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-[#475467] dark:text-slate-400 mb-2">
              <span className="font-semibold text-blue-900 dark:text-blue-300 tracking-wider">
                C.A.O. SELF-REFLECTION BENCHMARK
              </span>
              <span className="tabular-nums">
                Scenario {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-[#101828]/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-900 dark:bg-blue-400 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider font-mono tabular-nums text-blue-900 dark:text-blue-400 block mb-2 font-semibold">
              Scenario {currentQuestionIndex + 1 < 10 ? `0${currentQuestionIndex + 1}` : currentQuestionIndex + 1}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101828] dark:text-white leading-snug text-balance">
              {currentQ.scenario}
            </h3>
          </div>

          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => (
              <button
                type="button"
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

          <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-[#475467] dark:text-slate-400 pt-2 border-t border-[#101828]/10 dark:border-white/10">
            {currentQuestionIndex > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                className="hover:text-[#101828] dark:hover:text-white underline underline-offset-4 cursor-pointer"
              >
                ← Previous scenario
              </button>
            ) : (
              <span />
            )}
            <span>Educational self-reflection tool · No email required to view results</span>
          </div>
        </div>
      ) : (
        result && (
          <div className="space-y-6">
            <div className="text-center pb-5 border-b border-[#101828]/10 dark:border-white/10">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-300 font-semibold mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Self-Reflection Completed · {currentDateString}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white mb-2 text-balance">
                {result.archetypeTitle}
              </h3>
              <p className="text-sm text-[#475467] dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                {result.summary}
              </p>
            </div>

            <div className="bg-white dark:bg-[#11192E] p-5 sm:p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-6 flex flex-col items-center justify-center">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 mb-2">
                    Triad Operating Equilibrium
                  </span>
                  {renderTriadRadar(result.creatorPct, result.architectPct, result.orchestratorPct)}
                </div>

                <div className="md:col-span-6 space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono text-[#475467] dark:text-slate-400 mb-1.5">
                      <span>Total Distribution</span>
                      <span className="font-bold text-[#101828] dark:text-white tabular-nums">100% Equilibrium</span>
                    </div>
                    <div className="h-3 w-full rounded-md overflow-hidden flex text-[9px] font-bold text-white shadow-inner">
                      <div style={{ width: `${result.creatorPct}%` }} className="bg-blue-600 transition-all" />
                      <div style={{ width: `${result.architectPct}%` }} className="bg-purple-600 transition-all" />
                      <div style={{ width: `${result.orchestratorPct}%` }} className="bg-emerald-600 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-2.5 bg-blue-50/70 dark:bg-blue-950/40 rounded-lg border border-blue-100 dark:border-blue-900/30 flex justify-between items-center">
                      <div>
                        <span className="block text-[11px] font-mono font-semibold text-blue-900 dark:text-blue-300">
                          Creator (Build & Syntax)
                        </span>
                        <span className="text-[10px] text-blue-800/80 dark:text-blue-400/80">
                          Rapid prototyping & implementation fluency
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

            {/* Strengths & Growth Opportunities */}
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
                  Growth Opportunities
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

            {/* Personalized 30-Day Transition Plan + Chapters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#FAF9F5] dark:bg-[#11192E] p-4 rounded-xl border border-[#101828]/10 dark:border-white/10">
                <h4 className="font-semibold text-blue-950 dark:text-blue-300 uppercase font-mono tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-blue-800 dark:text-blue-400 shrink-0" />
                  30-Day Transition Plan
                </h4>
                <ul className="space-y-2 text-[#101828] dark:text-slate-200">
                  {result.recommended30DayActions.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono tabular-nums text-blue-800 dark:text-blue-400 font-bold shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed">{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF9F5] dark:bg-[#11192E] p-4 rounded-xl border border-[#101828]/10 dark:border-white/10">
                <h4 className="font-semibold text-blue-950 dark:text-blue-300 uppercase font-mono tracking-wider mb-2.5 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-800 dark:text-blue-400 shrink-0" />
                  Recommended Chapters & Exercises
                </h4>
                <ul className="space-y-2 text-[#101828] dark:text-slate-200 mb-3">
                  {result.recommendedChapters.map((ch) => (
                    <li key={ch.chapter}>
                      <strong className="font-mono text-blue-900 dark:text-blue-300">Ch {ch.chapter}:</strong> {ch.title} —{' '}
                      <span className="text-[#475467] dark:text-slate-400">{ch.reason}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-[#101828]/10 dark:border-white/10 text-[11px] text-[#475467] dark:text-slate-400">
                  <strong className="text-[#101828] dark:text-slate-200">Suggested Lab Exercises:</strong>{' '}
                  {result.recommendedExercises.join(' · ')}
                </div>
              </div>
            </div>

            {/* Optional Non-Gated Email Summary Dispatch */}
            <div className="bg-white dark:bg-[#11192E] p-4 sm:p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
                  <Mail className="w-4 h-4" />
                  <span>Optional: Send My Diagnostic Plan to Harsh Verma for Follow-Up</span>
                </div>
              </div>

              {planStatus === 'idle' && (
                <form onSubmit={handleSendPlanEmail} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="text-xs px-3 py-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#0D1527] text-[#101828] dark:text-white"
                  />
                  <input
                    required
                    type="email"
                    value={planEmail}
                    onChange={(e) => setPlanEmail(e.target.value)}
                    placeholder="Your email address"
                    className="text-xs px-3 py-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#0D1527] text-[#101828] dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={planSending}
                    className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {planSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>{planSending ? 'Sending...' : `Send to ${AUTHOR_EMAIL}`}</span>
                  </button>
                </form>
              )}

              {planStatus === 'sent' && (
                <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                  ✓ {planMessage}
                </div>
              )}

              {planStatus === 'fallback' && (
                <div className="text-xs text-amber-800 dark:text-amber-300 flex flex-wrap items-center justify-between gap-2">
                  <span>{planMessage}</span>
                  {planMailto && (
                    <a
                      href={planMailto}
                      className="px-3 py-1.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded font-semibold"
                    >
                      Open Email Client →
                    </a>
                  )}
                </div>
              )}
            </div>

            <p className="text-[11px] text-[#475467] dark:text-slate-400">
              Note: This diagnostic is a structured career-reflection exercise accompanying <em>{SITE_CONFIG.book.title}</em>, not a formal psychometric or clinical evaluation.
            </p>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#101828]/10 dark:border-white/10">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 text-xs font-semibold border border-blue-900/30 dark:border-blue-400/30 rounded-md text-white bg-blue-900 hover:bg-blue-950 dark:bg-blue-600 dark:hover:bg-blue-500 flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
                >
                  <Printer className="w-4 h-4 text-white" />
                  <span>Export PDF Report</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadTextReport}
                  className="px-3.5 py-2.5 text-xs font-medium border border-[#101828]/20 dark:border-white/20 rounded-md text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadedReport ? 'Downloaded!' : 'Download .txt'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-3.5 py-2.5 text-xs font-medium border border-[#101828]/20 dark:border-white/20 rounded-md text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied Summary!' : 'Share Profile'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-3.5 py-2.5 text-xs font-medium border border-[#101828]/20 dark:border-white/20 rounded-md text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>

              {onOpenBuyModal && (
                <button
                  type="button"
                  onClick={() => {
                    if (onClose) onClose();
                    onOpenBuyModal();
                  }}
                  className="px-5 py-2.5 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Explore Chapters 3 & 11 in the Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};
