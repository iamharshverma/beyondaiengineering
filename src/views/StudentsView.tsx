import React, { useState } from 'react';
import { PageId } from '../types';
import { GraduationCap, ArrowRight, CheckCircle2, Shield, Cpu, Users, FileText, Download } from 'lucide-react';

interface StudentsViewProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  onNavigate,
  onOpenAssessment,
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

Explore full chapters & lab at https://beyondaiengineering.com/students`;

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
      <section className="pt-16 sm:pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-blue-900 font-semibold">
              The Next Generation of Builders
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] text-balance">
            Starting Your Engineering Career in the AI Era?
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#101828] font-normal italic leading-relaxed text-balance">
            "You are not late. You are learning engineering while the profession itself is being reinvented."
          </p>

          <p className="text-base text-[#475467] max-w-2xl mx-auto leading-relaxed">
            Forget the noise claiming software engineering is dead. AI is eliminating the mindless busywork of syntax translation, elevating early-career talent into systems thinkers, curators, and architects from day one.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleDownloadRoadmap}
              className="px-5 py-3 text-xs font-semibold bg-[#101828] text-white rounded-md hover:bg-blue-950 transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadedRoadmap ? 'Roadmap Downloaded!' : 'Download Student Career Roadmap'}</span>
            </button>
            <button
              onClick={onOpenAssessment}
              className="px-5 py-3 text-xs font-semibold bg-white border border-[#101828]/20 rounded-md text-[#101828] hover:bg-black/5 transition-colors cursor-pointer"
            >
              Build Your C.A.O. Profile
            </button>
          </div>
        </div>
      </section>

      {/* 2. BUILD 3 PROJECTS, NOT 20 */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#475467] font-mono block mb-2">
            Strategic Portfolio Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] tracking-tight mb-4">
            Build 3 Projects, Not 20
          </h2>
          <p className="text-base text-[#475467] leading-relaxed">
            Recruiters and engineering directors are exhausted by 20 cloned tutorial apps. To stand out, you need three deliberate proofs of capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Project 1 */}
          <div className="bg-white p-8 rounded-2xl border border-[#101828]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                  PROJECT 01
                </span>
                <span className="text-[#98A2B3]">Technical Rigor</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#101828] mb-2">
                Technical Evidence
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] mb-6">
                Show that you can build deeply without relying blindly on black-box abstractions.
              </p>
              <div className="space-y-2 text-xs text-[#101828] border-t border-[#101828]/[0.08] pt-4">
                <div className="font-semibold text-blue-950 font-mono text-[10px] uppercase">What to Showcase:</div>
                <p className="text-[#475467]">
                  A custom memory allocator, network socket protocol, or reproducible distributed consensus node. Demonstrates mastery of core CS principles.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#101828]/[0.06] text-xs font-medium text-blue-900">
              Proves: "I know how machines actually work."
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white p-8 rounded-2xl border border-purple-200 ring-2 ring-purple-900/5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded">
                  PROJECT 02
                </span>
                <span className="text-[#98A2B3]">Critical Judgment</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#101828] mb-2">
                Judgment Evidence
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] mb-6">
                Show that you can evaluate decisions, latency trade-offs, hallucination rates, or ethical boundaries.
              </p>
              <div className="space-y-2 text-xs text-[#101828] border-t border-[#101828]/[0.08] pt-4">
                <div className="font-semibold text-purple-950 font-mono text-[10px] uppercase">What to Showcase:</div>
                <p className="text-[#475467]">
                  A public benchmark analyzing model failure modes under noisy adversarial input, complete with Architecture Decision Records (ADRs).
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#101828]/[0.06] text-xs font-medium text-purple-900">
              Proves: "I possess engineering judgment."
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white p-8 rounded-2xl border border-[#101828]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                  PROJECT 03
                </span>
                <span className="text-[#98A2B3]">Collaboration & Trust</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#101828] mb-2">
                Collaboration Evidence
              </h3>
              <p className="text-xs sm:text-sm text-[#475467] mb-6">
                Show that you can communicate, design agent authority boundaries, and work beyond pure code.
              </p>
              <div className="space-y-2 text-xs text-[#101828] border-t border-[#101828]/[0.08] pt-4">
                <div className="font-semibold text-emerald-950 font-mono text-[10px] uppercase">What to Showcase:</div>
                <p className="text-[#475467]">
                  An agentic workflow with human-in-the-loop cryptographic validation gates, open-source documentation, and clear stakeholder risk analysis.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#101828]/[0.06] text-xs font-medium text-emerald-900">
              Proves: "I am ready to lead in production."
            </div>
          </div>

        </div>

        {/* 4 Callout Action Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-5 bg-[#FAFAF7] border border-[#101828]/10 rounded-xl">
            <h4 className="font-serif font-bold text-base text-[#101828] mb-1">Career Roadmap</h4>
            <p className="text-xs text-[#475467] mb-3">Download the comprehensive student curriculum guide.</p>
            <button onClick={handleDownloadRoadmap} className="text-xs font-semibold text-blue-900 underline cursor-pointer">
              Get Roadmap PDF/TXT →
            </button>
          </div>

          <div className="p-5 bg-[#FAFAF7] border border-[#101828]/10 rounded-xl">
            <h4 className="font-serif font-bold text-base text-[#101828] mb-1">C.A.O. Profile</h4>
            <p className="text-xs text-[#475467] mb-3">Benchmark your current baseline strengths.</p>
            <button onClick={onOpenAssessment} className="text-xs font-semibold text-blue-900 underline cursor-pointer">
              Start Diagnostic →
            </button>
          </div>

          <div className="p-5 bg-[#FAFAF7] border border-[#101828]/10 rounded-xl">
            <h4 className="font-serif font-bold text-base text-[#101828] mb-1">Free Toolkit</h4>
            <p className="text-xs text-[#475467] mb-3">Explore open-source agent & evaluation tools.</p>
            <button onClick={() => onNavigate('toolkit')} className="text-xs font-semibold text-blue-900 underline cursor-pointer">
              Open Toolkit →
            </button>
          </div>

          <div className="p-5 bg-[#FAFAF7] border border-[#101828]/10 rounded-xl">
            <h4 className="font-serif font-bold text-base text-[#101828] mb-1">30/60/90 Plan</h4>
            <p className="text-xs text-[#475467] mb-3">Execute your first quarterly transition.</p>
            <button onClick={() => onNavigate('resources')} className="text-xs font-semibold text-blue-900 underline cursor-pointer">
              View Lab Canvases →
            </button>
          </div>
        </div>

      </section>
    </div>
  );
};
