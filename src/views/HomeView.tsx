import React, { useState } from 'react';
import { PageId } from '../types';
import { BookMockup3D } from '../components/BookMockup3D';
import { ScrollStory } from '../components/ScrollStory';
import { CAOInteractiveFramework } from '../components/CAOInteractiveFramework';
import { ENDORSEMENTS } from '../data/bookData';
import {
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  GraduationCap,
  FileCheck,
  Compass,
  FileCode,
  Network,
  Milestone,
  CheckCircle2,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { sendBookInquiryToAuthor } from '../utils/emailService';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBuyModal: () => void;
  onOpenAssessment: () => void;
  onOpenSample: () => void;
  onOpenInfographicModal?: (infographicId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenBuyModal,
  onOpenAssessment,
  onOpenSample,
  onOpenInfographicModal,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setEmailSubmitting(true);
    try {
      await sendBookInquiryToAuthor({
        formType: 'Individual Book Inquiry',
        name: 'Newsletter Reader',
        email: emailInput.trim(),
        notesOrMessage: 'Requested to join Beyond AI Engineering updates and receive C.A.O. field guide.',
        sourcePage: '/',
      });
      setEmailSubmitted(true);
    } finally {
      setEmailSubmitting(false);
    }
  };

  const audienceCards = [
    {
      title: 'The Working Engineer',
      role: 'Staff & Senior Developers',
      icon: Layers,
      description: 'You already know how to build. Now you need to understand where your value moves when AI handles more implementation.',
    },
    {
      title: 'The AI / ML Professional',
      role: 'Machine Learning & Data Engineers',
      icon: Cpu,
      description: 'Move beyond models toward production systems, orchestration, evaluation, trust, and real-world outcomes.',
    },
    {
      title: 'The Technical Leader',
      role: 'CTOs, VPs & Engineering Directors',
      icon: Shield,
      description: 'Learn how to think about people, AI agents, authority, risk, and accountability as one operating system.',
    },
    {
      title: 'The Student',
      role: 'Future Engineering Talent',
      icon: GraduationCap,
      description: 'Enter engineering with an AI-native mindset while building evidence of judgment—not just a list of technologies.',
    },
  ];

  const artifactCards = [
    { name: 'C.A.O. Career Map', icon: Compass, note: 'Personal transition trajectory' },
    { name: 'Human Advantage Inventory', icon: Shield, note: 'Irreplaceable technical depth' },
    { name: 'AI Workflow Experiment', icon: Cpu, note: 'High-leverage agent pipeline' },
    { name: 'Ethical AI Audit', icon: FileCheck, note: 'Accountability & governance gate' },
    { name: 'Professional Positioning', icon: Sparkles, note: 'Curator vs syntax generator' },
    { name: 'War Story Narrative', icon: FileCode, note: 'Architectural lessons from failure' },
    { name: 'Digital Paper Trail', icon: Milestone, note: 'Inspectable proof of decisions' },
    { name: 'Micro-Community Map', icon: Network, note: 'Curated 30-peer trust circle' },
    { name: '30/60/90-Day Plan', icon: CheckCircle2, note: 'Quarterly execution sprint' },
  ];

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="pt-12 sm:pt-20 pb-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold">
                BEYOND AI ENGINEERING
              </span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-xs text-[#475467] dark:text-slate-400 font-sans">
                By Harsh Verma
              </span>
            </div>

            <h1 className="font-serif text-fluid-hero font-bold tracking-tight text-[#101828] dark:text-white text-balance">
              The Engineering After Code
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-[#101828] dark:text-slate-100 font-normal leading-relaxed text-balance">
              <strong className="font-bold text-blue-900 dark:text-blue-300 block mb-2 font-sans tracking-tight text-lg sm:text-2xl">
                From Being Creator to Curator !!
              </strong>
              AI can increasingly write the implementation. <br className="hidden sm:block" />
              <strong className="font-semibold text-blue-950 dark:text-blue-400">Your advantage moves to judgment.</strong>
            </p>

            <p className="text-base sm:text-lg text-[#475467] dark:text-slate-300 max-w-xl leading-relaxed">
              Learn how to move from Creator to Architect to Orchestrator—and build a career around systems thinking, AI orchestration, responsibility, professional authority, and trust.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBuyModal}
                className="px-6 py-3.5 text-sm font-semibold tracking-wide text-white bg-[#101828] dark:bg-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
              >
                <span>Get the Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('cao-framework')}
                className="px-6 py-3.5 text-sm font-semibold text-[#101828] dark:text-slate-200 bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Explore the C.A.O. Framework
              </button>
            </div>

            {/* Author Credibility Ribbon */}
            <div className="pt-6 border-t border-[#101828]/10 dark:border-white/10 text-xs text-[#475467] dark:text-slate-400 flex items-center gap-2">
              <span>By</span>
              <strong className="text-[#101828] dark:text-white font-medium">Harsh Verma</strong>
              <span>— Principal AI Engineer, Keynote Speaker, AI & Cybersecurity Leader</span>
            </div>
          </div>

          {/* Right Column: 3D Book Mockup with animated nodes */}
          <div className="lg:col-span-5 flex justify-center">
            <BookMockup3D
              onSelectPhase={() => onNavigate('frameworks')}
              onOpenSample={onOpenSample}
            />
          </div>

        </div>
      </section>

      {/* 2. SCROLL STORY: AI MAKES OUTPUT ABUNDANT */}
      <ScrollStory onNavigate={onNavigate} />

      {/* 3. C.A.O. FRAMEWORK INTERACTIVE SECTION */}
      <CAOInteractiveFramework onOpenAssessment={onOpenAssessment} />

      {/* 4. WHO THIS BOOK IS FOR */}
      <section className="py-24 bg-white dark:bg-[#070B14] border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
              Audience & Operating Horizons
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] dark:text-white tracking-tight mb-4">
              Who This Book Is For
            </h2>
            <p className="text-base text-[#475467] dark:text-slate-300">
              Four distinct paths navigating one shared paradigm shift.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {audienceCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 p-6 rounded-xl hover:border-[#101828]/30 dark:hover:border-blue-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#131D33] border border-[#101828]/10 dark:border-white/10 flex items-center justify-center text-[#101828] dark:text-blue-400 mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-semibold mb-1">
                      {card.role}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Unifying Question Callout */}
          <div className="text-center max-w-2xl mx-auto py-8 px-6 bg-[#FAF9F5] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl">
            <blockquote className="font-serif text-lg sm:text-xl font-medium text-[#101828] dark:text-slate-100 italic">
              "Different starting points. One larger question: What kind of engineer will you become because AI exists?"
            </blockquote>
          </div>

        </div>
      </section>

      {/* 4.5. 15 CHAPTER INFOGRAPHICS & VISUAL BLUEPRINTS */}
      <section className="py-20 bg-[#FAF9F5] dark:bg-[#0A101D] border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-blue-900 dark:text-blue-400 font-mono block mb-2 font-bold">
                Publication-Grade Visual Guides
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] dark:text-white tracking-tight">
                15 Infographics. 11 Chapters. 0 Fluff.
              </h2>
              <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Every chapter includes a full-page blueprint mapping real-world case studies (Simon Willison, Knight Capital, swyx, Zillow Offers, Duolingo, Waymo), actionable weekly experiments, and a 4-point curator's checklist.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {onOpenInfographicModal && (
                <button
                  onClick={() => onOpenInfographicModal('infographic-intro')}
                  className="px-4 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
                >
                  Explore All 15 Infographics →
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'infographic-intro',
                tag: 'Orientation',
                title: 'From Creator to Curator',
                sub: 'The C.A.O. Framework & Learning Focus',
                img: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-1_cab3095f.png',
              },
              {
                id: 'infographic-ch1',
                tag: 'Chapter 1',
                title: 'The New Age of Engineering',
                sub: 'Simon Willison & Knight Capital',
                img: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_04_PM-2_73d3bcaa.png',
              },
              {
                id: 'infographic-ch2',
                tag: 'Chapter 2',
                title: 'From HOW to WHAT',
                sub: 'swyx & Zillow Offers Case Studies',
                img: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_05_PM-3_0750658f.png',
              },
              {
                id: 'infographic-ch7',
                tag: 'Chapter 7',
                title: 'From Stagnation to Innovation',
                sub: 'Anti-LeetCode Manifesto & Career Path',
                img: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png',
              },
            ].map((card) => (
              <div
                key={card.id}
                onClick={() => onOpenInfographicModal && onOpenInfographicModal(card.id)}
                className="group bg-white dark:bg-[#0D1527] rounded-xl border border-[#101828]/10 dark:border-white/10 overflow-hidden shadow-2xs hover:shadow-lg hover:border-blue-900/60 dark:hover:border-blue-400/60 transition-all cursor-pointer flex flex-col"
              >
                <div className="relative aspect-3/4 overflow-hidden bg-slate-900">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('public/assets')) {
                        target.src = `/public${card.img}`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                    <span className="px-3 py-1.5 bg-black/80 text-white rounded text-xs font-medium backdrop-blur-xs">
                      Click to Zoom & Inspect
                    </span>
                  </div>
                  <span className="absolute top-2 left-2 text-[10px] font-mono font-bold bg-black/80 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                    {card.tag}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#101828] dark:text-white leading-tight mb-1">
                      {card.title}
                    </h4>
                    <p className="text-[11px] text-[#475467] dark:text-slate-300 font-sans">
                      {card.sub}
                    </p>
                  </div>
                  <div className="pt-3 text-[11px] font-semibold text-blue-900 dark:text-blue-400 group-hover:underline flex items-center gap-1">
                    <span>Inspect Infographic</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT READERS WILL BUILD (EVIDENCE ARTIFACTS) */}
      <section className="py-24 bg-white dark:bg-[#070B14] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
              Verifiable Outputs
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] dark:text-white tracking-tight mb-4">
              Don't Just Read the Book. Build Evidence.
            </h2>
            <p className="text-base text-[#475467] dark:text-slate-300">
              Every chapter produces a tangible artifact for your career portfolio and professional authority.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {artifactCards.map((artifact) => {
              const Icon = artifact.icon;
              return (
                <div
                  key={artifact.name}
                  onClick={() => onNavigate('resources')}
                  className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 p-6 rounded-xl hover:border-blue-900 dark:hover:border-blue-400 transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-md bg-[#FAFAF7] dark:bg-[#131D33] text-blue-950 dark:text-blue-300 flex items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/40">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                      {artifact.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#475467] dark:text-slate-300 pl-11">
                    {artifact.note}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('resources')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group cursor-pointer"
            >
              <span>Explore Companion Resources & Lab Canvases</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* 5.5. AUTHOR SPOTLIGHT — HARSH VERMA */}
      <section className="py-24 bg-[#FAFAF7] dark:bg-[#0A101D] border-y border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10 p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Author Image */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative max-w-xs w-full group">
                  <div className="rounded-xl overflow-hidden border border-[#101828]/10 dark:border-white/15 shadow-lg bg-slate-100 aspect-3/4">
                    <img
                      src="/assets/aistudio/harsh_verma_87a0217e.jpg"
                      alt="Harsh Verma, Author of Beyond AI Engineering"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('public/assets')) {
                          target.src = '/public/assets/aistudio/harsh_verma_87a0217e.jpg';
                        }
                      }}
                    />
                  </div>
                  <div className="text-center mt-3">
                    <span className="text-xs font-serif font-bold text-[#101828] dark:text-white">Harsh Verma</span>
                    <span className="block text-[11px] text-[#475467] dark:text-slate-400">Silicon Valley, California</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Grounded Bio & Leadership */}
              <div className="lg:col-span-8 space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-blue-900 dark:text-blue-300 font-semibold bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-0.5 rounded">
                    Meet the Author
                  </span>
                  <span className="text-xs text-[#475467] dark:text-slate-400">· Principal AI Engineer, Palo Alto Networks · Keynote Speaker</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white leading-tight">
                  Harsh Verma
                </h2>

                <p className="font-serif text-lg text-blue-950 dark:text-blue-300 italic">
                  "AI can increasingly write the code. Your advantage moves to deciding what deserves to be built."
                </p>

                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed font-sans">
                  Harsh Verma is a Principal Software Engineer in AI at <strong>Palo Alto Networks</strong>, a <strong>Stanford Distinguished Scholar</strong> (Stanford Graduate School of Business LEAD program), an official member of the <strong>Forbes Technology Council</strong>, a <strong>Fellow of RSA, IFGICT & BCS</strong>, and an <strong>IEEE Senior Member</strong>. He serves as an advisor and mentor at <strong>Berkeley SkyDeck</strong>, <strong>Techstars</strong>, and the <strong>Mayfield Fund AI Garage</strong>.
                </p>

                {/* Published Books Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-[#FAFAF7] dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.08] dark:border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block mb-1">
                      Current Volume
                    </span>
                    <div className="font-serif font-bold text-sm text-[#101828] dark:text-white">Beyond AI Engineering</div>
                    <div className="text-[11px] text-[#475467] dark:text-slate-400">The career operating system for the agentic AI era.</div>
                  </div>

                  <div className="p-3.5 bg-[#FAFAF7] dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.08] dark:border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 font-bold block mb-1">
                      Cybersecurity Volume
                    </span>
                    <div className="font-serif font-bold text-sm text-[#101828] dark:text-white">AI vs. AI</div>
                    <div className="text-[11px] text-[#475467] dark:text-slate-400">Engineering the Cybersecurity Counteroffensive.</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate('author')}
                    className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Read Full Author Biography</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://www.harshverma.me/page-about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-semibold border border-[#101828]/20 dark:border-white/20 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    View Official Profile on harshverma.me ↗
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL ENDORSEMENTS */}
      <section className="py-24 bg-white dark:bg-[#070B14] border-y border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
              Early Praise & Critical Acclaim
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
              What Technical Leaders Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ENDORSEMENTS.map((end, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl flex flex-col justify-between"
              >
                <p className="font-serif text-base sm:text-lg text-[#101828] dark:text-slate-100 italic leading-relaxed mb-6">
                  "{end.quote}"
                </p>
                <div className="pt-4 border-t border-[#101828]/10 dark:border-white/10">
                  <div className="font-bold text-sm text-[#101828] dark:text-white">{end.name}</div>
                  <div className="text-xs text-[#475467] dark:text-slate-400">{end.role} · {end.organization}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EMAIL CAPTURE: CONTINUE BEYOND THE BOOK */}
      <section className="py-20 bg-[#FAFAF7] dark:bg-[#0A101D] transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-blue-900 dark:text-blue-400 font-mono block mb-2 font-semibold">
            Stay on the Frontier
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white mb-3">
            Continue Beyond the Book
          </h2>
          <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
            Get new frameworks, tools, and practical experiments for becoming an AI-era engineer. Direct from author Harsh Verma. No spam, ever.
          </p>

          {!emailSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
              <input
                required
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your work email"
                className="w-full sm:w-80 px-4 py-2.5 text-sm bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-white rounded-md focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
              />
              <button
                type="submit"
                disabled={emailSubmitting}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer shadow-xs disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {emailSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <span>Join Beyond AI Engineering</span>
                )}
              </button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 rounded-lg max-w-md mx-auto text-xs sm:text-sm font-medium">
              ✓ Welcome! You have joined the Beyond AI Engineering community. We have sent the introductory C.A.O. field guide to your inbox.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
