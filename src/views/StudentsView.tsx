import React, { useState } from 'react';
import { PageId } from '../types';
import { GraduationCap, ArrowRight, CheckCircle2, Shield, Cpu, Users, FileText, Download, Maximize2, Layers } from 'lucide-react';

interface StudentsViewProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
  onOpenInfographicModal?: (infographicId?: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  onNavigate,
  onOpenAssessment,
  onOpenInfographicModal,
}) => {
  const [downloadedRoadmap, setDownloadedRoadmap] = useState(false);

  const handleDownloadRoadmap = () => {
    const text = `STUDENT CAREER ROADMAP: ENGINEERING IN THE AI ERA
Author: Harsh Verma (Beyond AI Engineering)

PRINCIPLE: BUILD 3 PROJECTS, NOT 20

PROJECT 1: TECHNICAL EVIDENCE
Goal: Prove you understand foundational computer science and systems under the hood.
Action: Build a low-level network protocol parser, local KV-store with memory caching, or distributed consensus simulation.
Evidence: Clean Git history, deterministic fuzzing tests, zero hallucinated dependencies.

PROJECT 2: JUDGMENT EVIDENCE
Goal: Prove you can evaluate trade-offs, failure modes, cost, and risk.
Action: Build a benchmark comparing latency, token consumption, and hallucination rates across 4 open-source models under adversarial input.
Evidence: Published Markdown Architecture Decision Record (ADR), comparative charts, clear conclusions.

PROJECT 3: COLLABORATION & GOVERNANCE EVIDENCE
Goal: Prove you understand human-AI boundary governance and multi-actor communication.
Action: Build an agent workflow with cryptographic human approval gates, audit logging, and automated safety rollback.
Evidence: Production-ready documentation, architecture schematic, security post-mortem.

Explore full chapters & lab at https://www.beyondaiengineering.com/students`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Student-Career-Roadmap-Beyond-AI-Engineering.txt';
    link.click();
    URL.revokeObjectURL(url);
    setDownloadedRoadmap(true);
    setTimeout(() => setDownloadedRoadmap(false), 3000);
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold">
              The Next Generation of Builders
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] dark:text-white text-balance">
            Starting Your Engineering Career in the AI Era?
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#101828] dark:text-slate-100 font-normal italic leading-relaxed text-balance">
            "You are not late. You are learning engineering while the profession itself is being reinvented."
          </p>

          <p className="text-base text-[#475467] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Forget the noise claiming software engineering is dead. AI is eliminating the mindless busywork of syntax translation, elevating early-career talent into systems thinkers, curators, and architects from day one.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleDownloadRoadmap}
              className="px-5 py-3 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadedRoadmap ? 'Roadmap Downloaded!' : 'Download Student Career Roadmap'}</span>
            </button>
            <button
              onClick={onOpenAssessment}
              className="px-5 py-3 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Build Your C.A.O. Profile
            </button>
          </div>
        </div>
      </section>

      {/* 2. BUILD 3 PROJECTS, NOT 20 */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
            Strategic Portfolio Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] dark:text-white tracking-tight mb-4">
            Build 3 Projects, Not 20
          </h2>
          <p className="text-base text-[#475467] dark:text-slate-300 leading-relaxed">
            Recruiters and engineering directors are exhausted by 20 cloned tutorial apps. To stand out, you need three deliberate proofs of capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Project 1 */}
          <div className="bg-white dark:bg-[#0D1527] p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-xs hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="font-bold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/60">
                  PROJECT 01
                </span>
                <span className="text-[#98A2B3] dark:text-slate-500">Technical Rigor</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-2">
                Technical Evidence
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 mb-6">
                Show that you can build deeply without relying blindly on black-box abstractions.
              </p>
              <div className="space-y-2 text-xs text-[#101828] dark:text-slate-300 border-t border-[#101828]/[0.08] dark:border-white/10 pt-4">
                <div className="font-semibold text-blue-950 dark:text-blue-300 font-mono text-[10px] uppercase">What to Showcase:</div>
                <p className="text-[#475467] dark:text-slate-400">
                  A custom memory allocator, network socket protocol, or reproducible distributed consensus node. Demonstrates mastery of core CS principles.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#101828]/[0.06] dark:border-white/10 text-xs font-medium text-blue-900 dark:text-blue-400">
              Proves: "I know how machines actually work."
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white dark:bg-[#0D1527] p-8 rounded-2xl border border-purple-200 dark:border-purple-800/60 ring-2 ring-purple-900/5 dark:ring-purple-400/10 shadow-xs hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="font-bold text-purple-900 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded border border-purple-100 dark:border-purple-900/60">
                  PROJECT 02
                </span>
                <span className="text-[#98A2B3] dark:text-slate-500">Critical Judgment</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-2">
                Judgment Evidence
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 mb-6">
                Show that you can evaluate decisions, latency trade-offs, hallucination rates, or ethical boundaries.
              </p>
              <div className="space-y-2 text-xs text-[#101828] dark:text-slate-300 border-t border-[#101828]/[0.08] dark:border-white/10 pt-4">
                <div className="font-semibold text-purple-950 dark:text-purple-300 font-mono text-[10px] uppercase">What to Showcase:</div>
                <p className="text-[#475467] dark:text-slate-400">
                  A public benchmark analyzing model failure modes under noisy adversarial input, complete with Architecture Decision Records (ADRs).
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#101828]/[0.06] dark:border-white/10 text-xs font-medium text-purple-900 dark:text-purple-400">
              Proves: "I possess engineering judgment."
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white dark:bg-[#0D1527] p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-xs hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/60">
                  PROJECT 03
                </span>
                <span className="text-[#98A2B3] dark:text-slate-500">Collaboration & Trust</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-2">
                Collaboration Evidence
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 mb-6">
                Show that you can communicate, design agent authority boundaries, and work beyond pure code.
              </p>
              <div className="space-y-2 text-xs text-[#101828] dark:text-slate-300 border-t border-[#101828]/[0.08] dark:border-white/10 pt-4">
                <div className="font-semibold text-emerald-950 dark:text-emerald-300 font-mono text-[10px] uppercase">What to Showcase:</div>
                <p className="text-[#475467] dark:text-slate-400">
                  An agentic workflow with human-in-the-loop cryptographic validation gates, open-source documentation, and clear stakeholder risk analysis.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#101828]/[0.06] dark:border-white/10 text-xs font-medium text-emerald-900 dark:text-emerald-400">
              Proves: "I am ready to lead in production."
            </div>
          </div>

        </div>

        {/* STUDENT VISUAL BLUEPRINTS & INFOGRAPHICS */}
        <div className="mb-16 bg-[#FAF9F5] dark:bg-[#0A101F] p-8 sm:p-10 rounded-2xl border border-[#101828]/10 dark:border-white/10 transition-colors">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold mb-1">
                <Layers className="w-4 h-4" />
                <span>Companion Visual Blueprints</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
                Early-Career Visual Frameworks
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 mt-1 max-w-xl">
                Extracted directly from Chapter 11 and Special Section IV of Beyond AI Engineering.
              </p>
            </div>
            {onOpenInfographicModal && (
              <button
                onClick={() => onOpenInfographicModal('infographic-ch11')}
                className="px-4 py-2 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center gap-1.5 self-start md:self-auto"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Open Full Infographic Viewer</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Chapter 11 Infographic */}
            <div
              onClick={() => onOpenInfographicModal && onOpenInfographicModal('infographic-ch11')}
              className="bg-white dark:bg-[#0D1527] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-2xs hover:border-blue-900/60 dark:hover:border-blue-400/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row gap-6 items-center"
            >
              <div className="w-full sm:w-36 aspect-3/4 rounded-lg overflow-hidden bg-slate-900 shrink-0 relative">
                <img
                  src="/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-2_f273f746.png"
                  alt="Chapter 11 Infographic: Guide for Students and Early-Career Engineers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 font-bold bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/60">
                  Chapter 11 Blueprint
                </span>
                <h4 className="font-serif font-bold text-lg text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors">
                  Starting Out: 3 Projects Not 10
                </h4>
                <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                  How to build verifiable public proof of work, high-conversion cold outreach templates, and bypass generic algorithm tests.
                </p>
                <div className="pt-2 text-xs font-semibold text-blue-900 dark:text-blue-400 flex items-center gap-1">
                  <span>Inspect Full Infographic</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* Card 2: Five Routes to Broader Impact */}
            <div
              onClick={() => onOpenInfographicModal && onOpenInfographicModal('infographic-routes')}
              className="bg-white dark:bg-[#0D1527] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-2xs hover:border-purple-900/60 dark:hover:border-purple-400/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row gap-6 items-center"
            >
              <div className="w-full sm:w-36 aspect-3/4 rounded-lg overflow-hidden bg-slate-900 shrink-0 relative">
                <img
                  src="/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_15_PM-3_2f0faec4.png"
                  alt="Special Section: Five Routes to Broader Impact"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-900 dark:text-purple-300 font-bold bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded border border-purple-100 dark:border-purple-900/60">
                  Special Section
                </span>
                <h4 className="font-serif font-bold text-lg text-[#101828] dark:text-white group-hover:text-purple-900 dark:group-hover:text-purple-300 transition-colors">
                  Five Routes to Broader Impact
                </h4>
                <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                  Learn from Shawn Wang, Kelsey Hightower, Reshma Saujani, Fei-Fei Li, and Jeremy Howard how to build outsized influence.
                </p>
                <div className="pt-2 text-xs font-semibold text-purple-900 dark:text-purple-400 flex items-center gap-1">
                  <span>Inspect Full Infographic</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Callout Action Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-5 bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl hover:-translate-y-0.5 duration-200">
            <h4 className="font-serif font-bold text-base text-[#101828] dark:text-white mb-1">Career Roadmap</h4>
            <p className="text-xs text-[#475467] dark:text-slate-400 mb-3">Download the comprehensive student curriculum guide.</p>
            <button onClick={handleDownloadRoadmap} className="text-xs font-semibold text-blue-900 dark:text-blue-400 underline cursor-pointer">
              Get Roadmap PDF/TXT →
            </button>
          </div>

          <div className="p-5 bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl hover:-translate-y-0.5 duration-200">
            <h4 className="font-serif font-bold text-base text-[#101828] dark:text-white mb-1">C.A.O. Profile</h4>
            <p className="text-xs text-[#475467] dark:text-slate-400 mb-3">Benchmark your current baseline strengths.</p>
            <button onClick={onOpenAssessment} className="text-xs font-semibold text-blue-900 dark:text-blue-400 underline cursor-pointer">
              Start Diagnostic →
            </button>
          </div>

          <div className="p-5 bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl hover:-translate-y-0.5 duration-200">
            <h4 className="font-serif font-bold text-base text-[#101828] dark:text-white mb-1">Free Toolkit</h4>
            <p className="text-xs text-[#475467] dark:text-slate-400 mb-3">Explore open-source agent & evaluation tools.</p>
            <button onClick={() => onNavigate('toolkit')} className="text-xs font-semibold text-blue-900 dark:text-blue-400 underline cursor-pointer">
              Open Toolkit →
            </button>
          </div>

          <div className="p-5 bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl hover:-translate-y-0.5 duration-200">
            <h4 className="font-serif font-bold text-base text-[#101828] dark:text-white mb-1">30/60/90 Plan</h4>
            <p className="text-xs text-[#475467] dark:text-slate-400 mb-3">Execute your first quarterly transition.</p>
            <button onClick={() => onNavigate('resources')} className="text-xs font-semibold text-blue-900 dark:text-blue-400 underline cursor-pointer">
              View Lab Canvases →
            </button>
          </div>
        </div>

      </section>
    </div>
  );
};
