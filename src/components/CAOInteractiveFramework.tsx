import React, { useState } from 'react';
import { Sparkles, Compass, ShieldCheck, ArrowRight, Check } from 'lucide-react';

interface CAOInteractiveFrameworkProps {
  onOpenAssessment: () => void;
}

export const CAOInteractiveFramework: React.FC<CAOInteractiveFrameworkProps> = ({
  onOpenAssessment,
}) => {
  const [selectedStage, setSelectedStage] = useState<'creator' | 'architect' | 'orchestrator'>('architect');

  const stages = [
    {
      id: 'creator' as const,
      name: 'CREATOR',
      actionVerb: 'Build',
      shortDesc: 'Turns ideas into working systems.',
      colorAccent: 'blue',
      badgeClass: 'text-blue-800 bg-blue-50 border-blue-200',
      icon: Sparkles,
      capabilities: [
        'Implementation',
        'Experimentation',
        'Prototyping',
        'Technical depth',
        'Evaluation',
      ],
      cognitiveQuestion: 'How do I build this rapidly and reliably?',
      primaryRisk: 'Commoditization as frontier models automate syntax synthesis.',
      careerAltitude: 'Individual Contributor / Builder / Specialist',
    },
    {
      id: 'architect' as const,
      name: 'ARCHITECT',
      actionVerb: 'Design',
      shortDesc: 'Decides what should be built and how the system should work.',
      colorAccent: 'purple',
      badgeClass: 'text-purple-800 bg-purple-50 border-purple-200',
      icon: Compass,
      capabilities: [
        'Systems thinking',
        'Trade-offs',
        'AI Product Sense',
        'Risk mitigation',
        'Business context',
        'How → What cognitive shift',
      ],
      cognitiveQuestion: 'What should be built, and what invariant boundaries protect it?',
      primaryRisk: 'Over-engineering without customer validation or empirical feedback.',
      careerAltitude: 'Staff Engineer / Systems Architect / Technical Lead',
    },
    {
      id: 'orchestrator' as const,
      name: 'ORCHESTRATOR',
      actionVerb: 'Lead',
      shortDesc: 'Coordinates AI, humans, systems, permissions, and outcomes.',
      colorAccent: 'emerald',
      badgeClass: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      icon: ShieldCheck,
      capabilities: [
        'AI agents & multi-actor swarms',
        'Human-AI collaboration',
        'Authority boundaries (Agentic Diplomacy)',
        'Accountability & trust stewardship',
        'Strategic business outcomes',
        'Responsible automation',
      ],
      cognitiveQuestion: 'How do autonomous intelligence and human authority coordinate safely?',
      primaryRisk: 'Detaching from technical reality or failing to monitor agent degradation.',
      careerAltitude: 'Principal AI Engineer / VP Engineering / CTO / Founder',
    },
  ];

  return (
    <section className="py-24 bg-[#FAFAF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#475467] font-mono block mb-2">
            The Central Operating System
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] tracking-tight mb-4 text-balance">
            From Creator to Architect to Orchestrator
          </h2>
          <p className="text-base sm:text-lg text-[#475467] leading-relaxed">
            AI does not eliminate engineering. It expands the responsibility and altitude of the engineer.
          </p>
        </div>

        {/* 3 Connected Stages Ribbon (Not an Org Chart; An Intellectual Progression) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-12">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`p-6 sm:p-8 rounded-xl border transition-all cursor-pointer bg-white relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-900 shadow-md ring-2 ring-blue-900/10'
                    : 'border-[#101828]/10 hover:border-[#101828]/30 shadow-xs'
                }`}
              >
                {/* Connecting step indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-semibold text-[#98A2B3]">
                    STAGE 0{idx + 1}
                  </span>
                  <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded border ${stage.badgeClass}`}>
                    {stage.actionVerb}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#FAFAF7] border border-[#101828]/10 flex items-center justify-center text-[#101828]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#101828]">
                      {stage.name}
                    </h3>
                  </div>

                  <p className="text-sm text-[#475467] mb-6 font-medium">
                    {stage.shortDesc}
                  </p>

                  <div className="border-t border-[#101828]/[0.08] pt-4 mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-mono text-[#475467] block mb-2">
                      Core Capabilities
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#101828]">
                      {stage.capabilities.map((cap) => (
                        <li key={cap} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-800 shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#101828]/[0.06] text-[11px] text-[#475467] flex items-center justify-between">
                  <span>{stage.careerAltitude}</span>
                  <span className="font-medium text-blue-900 underline">Details</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Deep Dive Drawer */}
        {selectedStage && (
          <div className="bg-[#FAF9F5] border border-[#101828]/10 rounded-xl p-6 sm:p-8 mb-16 shadow-xs">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#101828]/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#475467]">
                    Operating Altitude Deep Dive
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828]">
                    The {stages.find(s => s.id === selectedStage)?.name} Paradigm
                  </h4>
                </div>
                <div className="text-xs text-[#475467] font-mono">
                  Guiding Question: <br className="hidden sm:block" />
                  <span className="text-[#101828] font-semibold font-serif text-sm italic">
                    "{stages.find(s => s.id === selectedStage)?.cognitiveQuestion}"
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="bg-white p-5 rounded-lg border border-[#101828]/[0.08]">
                  <h5 className="font-semibold text-[#101828] mb-2 font-mono text-xs uppercase tracking-wider">
                    The AI Opportunity
                  </h5>
                  <p className="text-[#475467] leading-relaxed text-xs sm:text-sm">
                    {selectedStage === 'creator' && 'Leverage AI code generation tools to ship 5x faster, prototype ideas in hours rather than weeks, and explore multiple implementation strategies concurrently.'}
                    {selectedStage === 'architect' && 'Use models to simulate failure modes, generate adversarial regression tests, and explore trade-off matrices between latency, cost, and maintainability.'}
                    {selectedStage === 'orchestrator' && 'Deploy autonomous agent swarms that handle repetitive operations under strict cryptographic validation, while focusing human capital on high-stakes business strategy.'}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-[#101828]/[0.08]">
                  <h5 className="font-semibold text-rose-900 mb-2 font-mono text-xs uppercase tracking-wider">
                    The Primary Risk
                  </h5>
                  <p className="text-[#475467] leading-relaxed text-xs sm:text-sm">
                    {stages.find(s => s.id === selectedStage)?.primaryRisk}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Where Are You Today? Call to Action */}
        <div className="bg-[#101828] text-white rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-md">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono block mb-2">
            Interactive Diagnostic
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Where are you today?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Most engineers operate with a blend of capabilities (e.g. 55% Creator, 30% Architect, 15% Orchestrator). Discover your current distribution and pinpoint your next career breakthrough.
          </p>
          <button
            onClick={onOpenAssessment}
            className="px-6 py-3 text-sm font-semibold tracking-wide text-[#101828] bg-white rounded-md hover:bg-slate-100 transition-all shadow-sm hover:shadow inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Take the C.A.O. Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
