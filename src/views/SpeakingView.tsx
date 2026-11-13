import React, { useEffect } from 'react';
import { PageId } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
import { Mic } from 'lucide-react';

interface SpeakingViewProps {
  onNavigate: (page: PageId) => void;
  onOpenSpeakingModal: (topic?: string) => void;
}

export const SpeakingView: React.FC<SpeakingViewProps> = ({
  onNavigate,
  onOpenSpeakingModal,
}) => {
  useEffect(() => {
    updatePageSeo({
      title: `Keynotes & Speaking | ${SITE_CONFIG.author.name} — ${SITE_CONFIG.book.title}`,
      description:
        'Invite Harsh Verma for keynotes, executive offsites, university talks, and engineering department masterclasses on the agentic AI era.',
      canonicalPath: '/speaking',
      ogType: 'website',
      ogImage: PAGE_OG_IMAGES.speaking,
      breadcrumbs: [{ name: 'Speaking', path: '/speaking' }],
    });
  }, []);

  const keynotes = [
    {
      title: 'The Engineer After Code',
      subtitle: 'What becomes valuable when AI can increasingly produce the implementation?',
      audience: 'General Engineering All-Hands, Global Developer Conferences',
      keyTakeaway:
        'Why syntax synthesis is no longer a career moat, and how engineers build irreplaceable leverage around systems thinking and problem curation.',
    },
    {
      title: 'From Creator to Orchestrator',
      subtitle: 'A career operating system for technical professionals in the agentic AI era.',
      audience: 'Staff Engineers, Team Leads, Technical Managers',
      keyTakeaway:
        'The three-stage evolution: shifting from building components to designing architectures to orchestrating autonomous intelligence with verified authority boundaries.',
    },
    {
      title: 'The Trust Economy',
      subtitle: 'Why human judgment becomes more valuable as AI makes information abundant.',
      audience: 'Executive Offsites, Enterprise Leaders, Founders',
      keyTakeaway:
        'The economic mechanics of generative technology: as technical output drops to zero marginal cost, verified human accountability becomes the scarcest commodity.',
    },
    {
      title: 'When AI Agents Become Digital Actors',
      subtitle: 'Security, authority, identity, and accountability for autonomous systems.',
      audience: 'Cybersecurity Summits, AI Architects, Infrastructure Teams',
      keyTakeaway:
        'Designing zero-trust semantic boundaries for autonomous multi-agent systems, mitigating indirect prompt injection, and preventing catastrophic delegation failures.',
    },
    {
      title: 'Building the AI-Native Engineering Organization',
      subtitle: 'How engineering teams evolve beyond AI-assisted coding.',
      audience: 'VPs of Engineering, CTOs, R&D Leadership',
      keyTakeaway:
        'A tactical blueprint for engineering leaders: restructuring sprint rituals, replacing shallow metrics with evaluation telemetry, and nurturing an elite curator culture.',
    },
  ];

  const audienceTypes = [
    { title: 'Global Tech Summits', desc: 'Keynotes delivered for software architecture, cybersecurity, and AI practitioner conferences.' },
    { title: 'Enterprise All-Hands', desc: 'Bespoke internal sessions aligning engineering departments with agentic workflows and review standards.' },
    { title: 'Executive Offsites', desc: 'Strategic briefings on autonomous agent risk, observability, and capability evolution.' },
    { title: 'University Keynotes', desc: 'Inspiring future engineering talent to build verifiable proof of work and core CS depth.' },
  ];

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
            Keynotes & Executive Briefings
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] dark:text-white text-balance">
            Bring {SITE_CONFIG.book.title} to Your Organization
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic max-w-2xl mx-auto leading-relaxed">
            Keynotes, executive offsites, and technical masterclasses by {SITE_CONFIG.author.name} on navigating the agentic AI revolution.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenSpeakingModal()}
              className="px-6 py-3.5 text-sm font-semibold tracking-wide text-white bg-[#101828] dark:bg-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Mic className="w-4 h-4 text-blue-400 dark:text-blue-600" />
              <span>Invite Harsh to Speak</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('organizations')}
              className="px-5 py-3.5 text-sm font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-slate-200 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              View Organization Programs
            </button>
          </div>
        </div>
      </section>

      {/* 2. KEYNOTE OFFERINGS */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
            Signature Topics
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
            Keynote Programs
          </h2>
        </div>

        <div className="space-y-6">
          {keynotes.map((keynote, idx) => (
            <div
              key={keynote.title}
              className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 hover:border-blue-900/60 dark:hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="font-bold text-blue-900 dark:text-blue-400 tabular-nums">
                    TOPIC 0{idx + 1}
                  </span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span className="text-[#475467] dark:text-slate-400">Ideal for: {keynote.audience}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                  {keynote.title}
                </h3>
                <p className="font-serif text-base text-blue-950 dark:text-blue-300 italic">
                  {keynote.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed pt-1">
                  {keynote.keyTakeaway}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenSpeakingModal(keynote.title)}
                  className="px-4 py-2 text-xs font-semibold border border-[#101828]/20 dark:border-white/20 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Book This Keynote →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AUDIENCE FORMATS */}
      <section className="py-20 bg-[#FAF9F5] dark:bg-[#0A101F] border-t border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl font-bold text-[#101828] dark:text-white">
              Formats & Event Types
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceTypes.map((aud) => (
              <div key={aud.title} className="bg-white dark:bg-[#0D1527] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-2xs hover:-translate-y-0.5 duration-200">
                <h4 className="font-serif font-bold text-lg text-[#101828] dark:text-white mb-2">{aud.title}</h4>
                <p className="text-xs text-[#475467] dark:text-slate-400 leading-relaxed">{aud.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
