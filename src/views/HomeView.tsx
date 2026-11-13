import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PageId } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { CHAPTERS } from '../data/bookData';
import { BookMockup3D } from '../components/BookMockup3D';
import { ScrollStory } from '../components/ScrollStory';
import { CAOInteractiveFramework } from '../components/CAOInteractiveFramework';
import { trackEvent } from '../utils/analytics';
import {
  ArrowRight,
  ArrowUpRight,
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
  AlertCircle,
  Mail,
  BookOpen,
  Wrench,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import { sendBookInquiryToAuthor } from '../utils/emailService';

interface HomeViewProps {
  onNavigate: (page: PageId, slug?: string) => void;
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
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailMailto, setEmailMailto] = useState('');
  const [activeShiftIdx, setActiveShiftIdx] = useState<number>(0);
  const [activeDiagramLayer, setActiveDiagramLayer] = useState<'abundant' | 'scarce'>('scarce');
  const [isShiftAutoPlaying, setIsShiftAutoPlaying] = useState<boolean>(true);
  const [isShiftHovered, setIsShiftHovered] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isShiftAutoPlaying || isShiftHovered) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveShiftIdx((prev) => (prev + 1) % 6);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [isShiftAutoPlaying, isShiftHovered]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setEmailSubmitting(true);
    trackEvent('newsletter_signup', { location: 'home_footer', recipient: SITE_CONFIG.author.directRecipientEmail });
    try {
      const res = await sendBookInquiryToAuthor({
        formType: 'Newsletter Subscription',
        name: 'Newsletter Reader',
        email: emailInput.trim(),
        notesOrMessage: `Requested to join "${SITE_CONFIG.newsletter.name}" dispatches from beyondaiengineering.com.`,
        sourcePage: '/',
      });
      setEmailMailto(res.mailtoUrl);
      if (res.success) {
        setEmailStatus('sent');
        setEmailMessage(res.message);
      } else {
        setEmailStatus('fallback');
        setEmailMessage(res.message);
      }
    } finally {
      setEmailSubmitting(false);
    }
  };

  const audienceCards: Array<{
    title: string;
    role: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    targetPage: PageId;
    ctaLabel: string;
  }> = [
    {
      title: 'The Working Engineer',
      role: 'Staff & Senior Developers',
      icon: Layers,
      description: 'You already know how to build. Move your leverage from syntax generation to system invariants and architecture.',
      targetPage: 'engineers',
      ctaLabel: 'Pathway for Engineers',
    },
    {
      title: 'The AI / ML Professional',
      role: 'Machine Learning & Data Engineers',
      icon: Cpu,
      description: 'Move beyond model weights toward production systems, evaluation harnesses, deterministic guardrails, and trust.',
      targetPage: 'frameworks',
      ctaLabel: 'Explore Frameworks',
    },
    {
      title: 'The Technical Leader',
      role: 'CTOs, VPs & Engineering Directors',
      icon: Shield,
      description: 'Align teams, autonomous agents, authority boundaries, risk, and accountability into one durable operating system.',
      targetPage: 'organizations',
      ctaLabel: 'For Organizations',
    },
    {
      title: 'The Student & Graduate',
      role: 'Future Engineering Talent',
      icon: GraduationCap,
      description: 'Enter engineering with an AI-native mindset while building verifiable evidence of judgment—not just framework trivia.',
      targetPage: 'students',
      ctaLabel: 'Pathway for Students',
    },
  ];

  const shifts = [
    {
      title: 'From Syntax to Problem Framing',
      before: 'Syntactic translation & boilerplate velocity',
      after: 'Problem framing, invariant design & edge-case rigor',
      chapterRef: 'Ch 3 · From HOW to WHAT',
      frameworkSlug: 'how-to-what',
      abundantSignal: 'Boilerplate & CRUD scaffolding',
      scarceSignal: 'Boundary constraints & invariants',
      explanation:
        'When agents generate valid syntax in seconds, ambiguity becomes the primary production bug. Value concentrates in engineers who specify exact state invariants before a line is emitted.',
      curatorMove: 'Write an Architectural Decision Spec with explicit failure boundaries before prompting any code.',
    },
    {
      title: 'From Solo Typing to Orchestration',
      before: 'Solo line-by-line code ownership',
      after: 'Supervisory orchestration across agentic workflows',
      chapterRef: 'Ch 2 · The C.A.O. Engine',
      frameworkSlug: 'cao-framework',
      abundantSignal: 'Single-threaded PR authoring',
      scarceSignal: 'Multi-agent verification loops',
      explanation:
        'Productivity no longer scales with typing speed—it scales with how safely you decompose work across human reviewers and autonomous agents without compounding hidden complexity.',
      curatorMove: 'Split agent tasks into isolated, deterministic verification checkpoints rather than monolithic prompts.',
    },
    {
      title: 'From Trivia to Inspectable Proof',
      before: 'Closed-book algorithm memorization',
      after: 'Inspectable system portfolios & failure postmortems',
      chapterRef: 'Ch 9 · Digital Paper Trail',
      frameworkSlug: 'digital-paper-trail',
      abundantSignal: 'Generic flashcards & tutorials',
      scarceSignal: 'Traceable production decisions',
      explanation:
        'When anyone can generate clean demo apps on demand, hiring and peer credibility shift toward verifiable trade-off logs, benchmark results, and honest incident postmortems.',
      curatorMove: 'Publish architectural decision records and latency/failure benchmarks alongside every shipped project.',
    },
    {
      title: 'From Guessing to Deterministic Evals',
      before: 'Ad-hoc prompt trial and error',
      after: 'Deterministic evaluation harnesses & trust budgets',
      chapterRef: 'Ch 4 · The Trust Economy',
      frameworkSlug: 'trust-economy',
      abundantSignal: 'Vibe-checked prompt tweaks',
      scarceSignal: 'Regression suites & trust SLAs',
      explanation:
        'Probabilistic models degrade silently across edge cases and model upgrades. Reliable teams treat prompts and tool calls like production software governed by repeatable eval harnesses.',
      curatorMove: 'Gate every agent workflow behind an automated golden-dataset eval suite with clear drift thresholds.',
    },
    {
      title: 'From Tickets to Human APIs',
      before: 'Invisible individual ticket completion',
      after: 'Cross-functional Human API contracts & team leverage',
      chapterRef: 'Ch 6 · The Human API',
      frameworkSlug: 'human-api',
      abundantSignal: 'Siloed Jira queue execution',
      scarceSignal: 'Clear cross-team intent contracts',
      explanation:
        'As execution speed rises, coordination friction becomes the dominant drag. Teams win by defining crisp ownership, escalation paths, and interface contracts between people and agents.',
      curatorMove: 'Define explicit SLA and handoff contracts between autonomous services and accountable engineering owners.',
    },
    {
      title: 'From Blind Velocity to Ethical Curation',
      before: 'Uncritical deployment of generated diffs',
      after: 'Ethical curation & explicit accountability ownership',
      chapterRef: 'Ch 8 · Ethical Curation',
      frameworkSlug: 'ethical-curation',
      abundantSignal: 'Unreviewed auto-merged output',
      scarceSignal: 'Security, safety & human sign-off',
      explanation:
        'AI cannot sign an incident report or answer to regulators. Long-term authority belongs to Curators who know when to audit, constrain, or reject fluent but brittle machine output.',
      curatorMove: 'Require human provenance sign-off on high-blast-radius changes, data boundaries, and external agent actions.',
    },
  ];
  const activeShift = shifts[activeShiftIdx] || shifts[0];

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

  const signatureFrameworks = [
    {
      slug: 'cao-framework',
      page: 'cao-framework' as PageId,
      code: '01 · BACKBONE',
      name: 'The C.A.O. Framework',
      summary: 'Progression from Creator (build) to Architect (design) to Orchestrator (govern).',
    },
    {
      slug: 'trust-economy',
      page: 'frameworks' as PageId,
      code: '02 · ECONOMICS',
      name: 'The Trust Economy',
      summary: 'Why abundant AI output makes verified human judgment the highest-value asset.',
    },
    {
      slug: 'how-to-what',
      page: 'frameworks' as PageId,
      code: '03 · STRATEGY',
      name: 'From HOW to WHAT',
      summary: 'Shifting engineering focus from implementation mechanics to problem specification.',
    },
    {
      slug: 'human-api',
      page: 'frameworks' as PageId,
      code: '04 · COLLABORATION',
      name: 'The Human API',
      summary: 'Structured interfaces, reliability guarantees, and clarity between people and agents.',
    },
    {
      slug: 'ethical-curation',
      page: 'frameworks' as PageId,
      code: '05 · GOVERNANCE',
      name: 'Ethical Curation',
      summary: 'Production risk audits, drift observability, and refusing unverified AI output.',
    },
  ];

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="pt-12 sm:pt-20 pb-20 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold">
              <span>{SITE_CONFIG.book.fullTitle}</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-[#475467] dark:text-slate-400">By {SITE_CONFIG.author.name}</span>
            </div>

            <h1 className="font-serif text-fluid-hero font-bold tracking-tight text-[#101828] dark:text-white text-balance">
              The Engineering After Code
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-[#101828] dark:text-slate-100 font-normal leading-relaxed text-balance">
              <strong className="font-semibold text-blue-900 dark:text-blue-300 block mb-2 font-sans tracking-tight text-lg sm:text-2xl">
                From Being Creator to Curator !!
              </strong>
              AI can increasingly write the implementation.{' '}
              <strong className="font-semibold text-blue-950 dark:text-blue-400">
                Your advantage moves to judgment.
              </strong>
            </p>

            <p className="text-base sm:text-lg text-[#475467] dark:text-slate-300 max-w-xl leading-relaxed">
              <strong className="font-semibold text-blue-900 dark:text-blue-300 block mb-1 font-sans tracking-tight text-lg sm:text-2xl">
                Build Your Authority &amp; Lead the AI Revolution.
              </strong>
              Learn how to move from Creator to Architect to Orchestrator—and build a career around systems thinking, AI orchestration, responsibility, professional authority, and trust.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  trackEvent('book_purchase_click', { source: 'home_hero' });
                  onOpenBuyModal();
                }}
                className="px-6 py-3.5 text-sm font-semibold tracking-wide text-white bg-[#101828] dark:bg-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Get the Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('cao-framework')}
                className="px-5 py-3.5 text-sm font-semibold text-[#101828] dark:text-slate-200 bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Explore the C.A.O. Framework
              </button>

              <motion.button
                type="button"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  trackEvent('cao_assessment_start', { source: 'home_hero' });
                  onOpenAssessment();
                }}
                className="px-5 py-3.5 text-sm font-semibold text-blue-900 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/50 border border-blue-900/20 dark:border-blue-400/30 rounded-md hover:bg-blue-100/80 dark:hover:bg-blue-900/50 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Take Assessment</span>
              </motion.button>
            </div>

            {/* 3-Stage Mini Trajectory */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#101828]/10 dark:border-white/10">
              <button
                type="button"
                onClick={() => onNavigate('cao-framework')}
                className="text-left p-3 rounded-lg bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 hover:border-blue-900/40 dark:hover:border-blue-400/40 transition-colors cursor-pointer"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block">
                  01 · Creator
                </span>
                <span className="text-xs font-medium text-[#101828] dark:text-slate-200">Build & Implement</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('cao-framework')}
                className="text-left p-3 rounded-lg bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 hover:border-blue-900/40 dark:hover:border-blue-400/40 transition-colors cursor-pointer"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block">
                  02 · Architect
                </span>
                <span className="text-xs font-medium text-[#101828] dark:text-slate-200">Frame & Design</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('cao-framework')}
                className="text-left p-3 rounded-lg bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 hover:border-blue-900/40 dark:hover:border-blue-400/40 transition-colors cursor-pointer"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block">
                  03 · Orchestrator
                </span>
                <span className="text-xs font-medium text-[#101828] dark:text-slate-200">Curate & Govern</span>
              </button>
            </div>

            {/* Author Credibility Ribbon */}
            <div className="pt-2 text-xs text-[#475467] dark:text-slate-400 flex flex-wrap items-center gap-2">
              <span>By</span>
              <button
                type="button"
                onClick={() => onNavigate('author')}
                className="text-[#101828] dark:text-white font-semibold hover:underline cursor-pointer"
              >
                {SITE_CONFIG.author.name}
              </button>
              <span>— {SITE_CONFIG.author.headline}</span>
            </div>
          </div>

          {/* Right Column: 3D Book Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <BookMockup3D
              onSelectPhase={() => onNavigate('cao-framework')}
              onOpenSample={onOpenSample}
            />
          </div>
        </div>
      </section>

      {/* 2.5. WHY EVERYTHING CHANGED / INTERACTIVE PARADIGM SHIFT EXPLORER */}
      <section
        className="py-20 bg-white dark:bg-[#070B14] border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors"
        onMouseEnter={() => setIsShiftHovered(true)}
        onMouseLeave={() => setIsShiftHovered(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Narrative + Clickable Animated Paradigm Diagram */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-widest text-blue-900 dark:text-blue-400 font-mono font-semibold inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-900 dark:bg-blue-400" />
                  </span>
                  Why Everything Changed
                </span>
                <span className="text-[11px] font-mono text-[#475467] dark:text-slate-400">
                  Interactive Map
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white tracking-tight">
                From Writing Code to Orchestrating Intelligence
              </h2>
              <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 leading-relaxed">
                When implementation becomes abundant, organizational bottlenecks shift upward—toward system boundaries, evaluation rigor, security governance, and verifiable trust.
              </p>

              {/* Interactive SVG Shift Diagram */}
              <div className="p-5 rounded-2xl bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 shadow-xs space-y-4">
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="text-[#475467] dark:text-slate-400">
                    Click either layer to compare:
                  </span>
                  <div className="inline-flex rounded-md border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#11192E] p-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDiagramLayer('abundant');
                        setIsShiftAutoPlaying(false);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                        activeDiagramLayer === 'abundant'
                          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                          : 'text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white'
                      }`}
                    >
                      Abundant
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDiagramLayer('scarce');
                        setIsShiftAutoPlaying(false);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                        activeDiagramLayer === 'scarce'
                          ? 'bg-blue-900 text-white dark:bg-blue-500'
                          : 'text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white'
                      }`}
                    >
                      Scarce
                    </button>
                  </div>
                </div>

                <svg
                  viewBox="0 0 360 176"
                  className="w-full h-auto select-none"
                  role="img"
                  aria-label="Interactive diagram showing engineering value migrating from Abundant Code Output to Scarce Curator Judgment"
                >
                  {/* Left Interactive Box: Abundant Layer */}
                  <g
                    onClick={() => {
                      setActiveDiagramLayer('abundant');
                      setIsShiftAutoPlaying(false);
                    }}
                    className="cursor-pointer transition-opacity"
                    role="button"
                    tabIndex={0}
                    aria-label="Inspect Abundant Layer: Code Output"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveDiagramLayer('abundant');
                        setIsShiftAutoPlaying(false);
                      }
                    }}
                  >
                    <rect
                      x="10"
                      y="18"
                      width="142"
                      height="140"
                      rx="10"
                      className={
                        activeDiagramLayer === 'abundant'
                          ? 'fill-rose-50/70 dark:fill-rose-950/30 stroke-rose-600 dark:stroke-rose-400 transition-all'
                          : 'fill-white dark:fill-[#11192E] stroke-[#101828]/20 dark:stroke-white/20 hover:stroke-rose-500/60 transition-all'
                      }
                      strokeWidth={activeDiagramLayer === 'abundant' ? 1.75 : 1}
                    />
                    <text x="81" y="42" textAnchor="middle" className="fill-[#475467] dark:fill-slate-400 text-[9px] font-mono">
                      ABUNDANT LAYER
                    </text>
                    <text x="81" y="68" textAnchor="middle" className="fill-[#101828] dark:fill-white text-[13px] font-serif font-bold">
                      Code Output
                    </text>
                    <text x="81" y="90" textAnchor="middle" className="fill-[#475467] dark:fill-slate-400 text-[9.5px]">
                      {activeShift.abundantSignal.slice(0, 26)}
                    </text>
                    <text x="81" y="106" textAnchor="middle" className="fill-[#475467] dark:fill-slate-400 text-[9.5px]">
                      Routine Generation
                    </text>
                    <text x="81" y="136" textAnchor="middle" className="fill-rose-700 dark:fill-rose-400 text-[9.5px] font-mono font-semibold">
                      Commoditizing Fast
                    </text>
                  </g>

                  {/* Animated Signal Transfer Path */}
                  <path
                    d="M156 88 L200 88"
                    className="stroke-blue-200 dark:stroke-blue-900"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M156 88 L200 88"
                    className="stroke-blue-700 dark:stroke-blue-400 animate-flow-dash"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M193 81 L202 88 L193 95"
                    fill="none"
                    className="stroke-blue-800 dark:stroke-blue-300"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text x="179" y="72" textAnchor="middle" className="fill-blue-900 dark:fill-blue-300 text-[8.5px] font-mono font-bold">
                    0{activeShiftIdx + 1}
                  </text>

                  {/* Right Interactive Box: Scarce Layer */}
                  <g
                    onClick={() => {
                      setActiveDiagramLayer('scarce');
                      setIsShiftAutoPlaying(false);
                    }}
                    className="cursor-pointer transition-opacity"
                    role="button"
                    tabIndex={0}
                    aria-label="Inspect Scarce Layer: Curator Judgment"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveDiagramLayer('scarce');
                        setIsShiftAutoPlaying(false);
                      }
                    }}
                  >
                    <rect
                      x="208"
                      y="18"
                      width="142"
                      height="140"
                      rx="10"
                      className={
                        activeDiagramLayer === 'scarce'
                          ? 'fill-blue-50/90 dark:fill-blue-950/50 stroke-blue-800 dark:stroke-blue-400 transition-all'
                          : 'fill-blue-50/40 dark:fill-blue-950/20 stroke-blue-900/35 dark:stroke-blue-400/35 hover:stroke-blue-700 transition-all'
                      }
                      strokeWidth={activeDiagramLayer === 'scarce' ? 2 : 1.25}
                    />
                    <text x="279" y="42" textAnchor="middle" className="fill-blue-900 dark:fill-blue-300 text-[9px] font-mono font-semibold">
                      SCARCE LAYER
                    </text>
                    <text x="279" y="68" textAnchor="middle" className="fill-[#101828] dark:fill-white text-[13px] font-serif font-bold">
                      Curator Judgment
                    </text>
                    <text x="279" y="90" textAnchor="middle" className="fill-[#101828] dark:fill-slate-200 text-[9.5px] font-medium">
                      {activeShift.scarceSignal.slice(0, 26)}
                    </text>
                    <text x="279" y="106" textAnchor="middle" className="fill-[#475467] dark:fill-slate-300 text-[9.5px]">
                      Evals &amp; Accountability
                    </text>
                    <text x="279" y="136" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-400 text-[9.5px] font-mono font-semibold">
                      Compounding Authority
                    </text>
                  </g>
                </svg>

                {/* Diagram Dynamic Insight Bar */}
                <div
                  aria-live="polite"
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed transition-colors ${
                    activeDiagramLayer === 'abundant'
                      ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-[#475467] dark:text-slate-300'
                      : 'bg-white dark:bg-[#11192E] border-blue-900/20 dark:border-blue-400/30 text-[#475467] dark:text-slate-300'
                  }`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider font-bold mb-1 text-[#101828] dark:text-white">
                    {activeDiagramLayer === 'abundant'
                      ? `Shift 0${activeShiftIdx + 1} · What AI Commoditizes`
                      : `Shift 0${activeShiftIdx + 1} · Where Human Authority Grows`}
                  </div>
                  {activeDiagramLayer === 'abundant'
                    ? `${activeShift.before} — fast to automate, zero long-term career differentiation.`
                    : `${activeShift.after} — high-leverage engineering leadership that AI amplifies rather than replaces.`}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Shift Selector + Live Deep-Dive Card */}
            <div className="lg:col-span-7 space-y-5">
              {/* Interactive affordance & playback controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-[#101828]/[0.08] dark:border-white/10">
                <div className="flex items-center gap-2 text-xs text-[#475467] dark:text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400 shrink-0" />
                  <span className="font-medium text-[#101828] dark:text-white">
                    Click any shift card below
                  </span>
                  <span className="hidden sm:inline text-[#667085] dark:text-slate-400">
                    to inspect why it matters and what Curators do instead
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono tabular-nums text-[11px] text-[#475467] dark:text-slate-400">
                    0{activeShiftIdx + 1} / 06
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsShiftAutoPlaying((prev) => !prev)}
                    aria-label={isShiftAutoPlaying ? 'Pause shift auto-cycle' : 'Play shift auto-cycle'}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#101828]/10 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#0D1527] text-[11px] font-mono text-[#101828] dark:text-slate-200 hover:border-blue-900/40 dark:hover:border-blue-400/40 transition-colors cursor-pointer"
                  >
                    {isShiftAutoPlaying ? (
                      <>
                        <Pause className="w-3 h-3 text-blue-900 dark:text-blue-400" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-blue-900 dark:text-blue-400" />
                        <span>Auto</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 6 Interactive Shift Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {shifts.map((shift, idx) => {
                  const isActive = idx === activeShiftIdx;
                  return (
                    <button
                      type="button"
                      key={shift.title}
                      aria-pressed={isActive}
                      onClick={() => {
                        setActiveShiftIdx(idx);
                        setIsShiftAutoPlaying(false);
                      }}
                      className={`group text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 ${
                        isActive
                          ? 'bg-white dark:bg-[#11192E] border-blue-900 dark:border-blue-400 shadow-md ring-1 ring-blue-900/15 dark:ring-blue-400/25 -translate-y-0.5'
                          : 'bg-[#FAFAF7] dark:bg-[#0D1527] border-[#101828]/10 dark:border-white/10 hover:bg-white dark:hover:bg-[#11192E] hover:border-blue-900/45 dark:hover:border-blue-400/45 hover:-translate-y-0.5 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span className="inline-flex items-center gap-2 text-[10px] font-mono tabular-nums uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold">
                          {isActive && (
                            <span className="relative flex h-2 w-2" aria-hidden="true">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-900 dark:bg-blue-400" />
                            </span>
                          )}
                          <span>Shift 0{idx + 1}</span>
                        </span>

                        <span
                          className={`inline-flex items-center gap-0.5 text-[10px] font-mono transition-all ${
                            isActive
                              ? 'text-blue-900 dark:text-blue-300 font-semibold'
                              : 'text-[#667085] dark:text-slate-400 group-hover:text-blue-900 dark:group-hover:text-blue-300'
                          }`}
                        >
                          <span>{isActive ? 'Inspecting' : 'Details'}</span>
                          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-xs text-[#667085] dark:text-slate-400 line-through decoration-slate-400/60 leading-snug">
                          {shift.before}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-[#101828] dark:text-white leading-snug">
                          → {shift.after}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Shift Expanded Deep-Dive Panel */}
              <div
                aria-live="polite"
                className="p-6 rounded-2xl bg-[#FAF9F5] dark:bg-[#0D1527] border border-blue-900/20 dark:border-blue-400/30 shadow-xs space-y-4 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold">
                    <span>Shift 0{activeShiftIdx + 1} Breakdown</span>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-[#475467] dark:text-slate-300 font-normal">{activeShift.chapterRef}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('framework-detail', activeShift.frameworkSlug)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-900 dark:text-blue-300 hover:underline cursor-pointer"
                  >
                    <span>Explore Framework</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101828] dark:text-white">
                  {activeShift.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                  {activeShift.explanation}
                </p>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#11192E] border border-[#101828]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block mb-0.5">
                      The Curator Move
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-[#101828] dark:text-slate-100">
                      {activeShift.curatorMove}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('book')}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-[#101828] dark:bg-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>See Chapter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              Four distinct paths navigating one shared paradigm shift. Select your track to explore dedicated resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {audienceCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  type="button"
                  key={card.title}
                  onClick={() => onNavigate(card.targetPage)}
                  className="text-left bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 p-6 rounded-xl hover:border-blue-900/40 dark:hover:border-blue-400/40 transition-all flex flex-col justify-between cursor-pointer group"
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
                  <div className="pt-5 text-xs font-semibold text-blue-900 dark:text-blue-400 flex items-center gap-1 group-hover:underline">
                    <span>{card.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

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
                15 Infographics. 11 Chapters. Zero Fluff.
              </h2>
              <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Every chapter includes a full-page blueprint mapping real-world case studies, weekly engineering experiments, and a 4-point curator's checklist.
              </p>
            </div>

            {onOpenInfographicModal && (
              <button
                type="button"
                onClick={() => onOpenInfographicModal('infographic-intro')}
                className="px-4 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer shadow-xs shrink-0"
              >
                Explore All 15 Infographics →
              </button>
            )}
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
                sub: 'Systems Craft & Durable Career Paths',
                img: '/assets/aistudio/ChatGPT_Image_Nov_4__2026__06_16_07_PM-8_c9db1dc2.png',
              },
            ].map((card) => (
              <button
                type="button"
                key={card.id}
                onClick={() => onOpenInfographicModal && onOpenInfographicModal(card.id)}
                className="text-left group bg-white dark:bg-[#0D1527] rounded-xl border border-[#101828]/10 dark:border-white/10 overflow-hidden shadow-2xs hover:shadow-lg hover:border-blue-900/60 dark:hover:border-blue-400/60 transition-all cursor-pointer flex flex-col"
              >
                <div className="relative aspect-3/4 w-full overflow-hidden bg-slate-900">
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
                <div className="p-4 flex-1 flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#101828] dark:text-white leading-tight mb-1">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-[#475467] dark:text-slate-300 font-sans">
                      {card.sub}
                    </p>
                  </div>
                  <div className="pt-3 text-[11px] font-semibold text-blue-900 dark:text-blue-400 group-hover:underline flex items-center gap-1">
                    <span>Inspect Infographic</span>
                    <span>→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT READERS WILL BUILD (EVIDENCE ARTIFACTS) */}
      <section className="py-24 bg-white dark:bg-[#070B14] border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors">
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
                <button
                  type="button"
                  key={artifact.name}
                  onClick={() => onNavigate('resources')}
                  className="text-left bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 p-6 rounded-xl hover:border-blue-900 dark:hover:border-blue-400 transition-all cursor-pointer group shadow-2xs"
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
                </button>
              );
            })}
          </div>

          {/* Chapter-by-Chapter Strip */}
          <div className="pt-10 border-t border-[#101828]/[0.08] dark:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold block">
                  Chapter-by-Chapter Curriculum
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                  Inside the 11 Chapters
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('book')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Full Table of Contents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CHAPTERS.slice(0, 4).map((ch) => (
                <button
                  type="button"
                  key={ch.number}
                  onClick={() => onNavigate('book')}
                  className="text-left p-4 rounded-xl bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 hover:border-blue-900/40 dark:hover:border-blue-400/40 transition-colors cursor-pointer"
                >
                  <span className="text-[10px] font-mono tabular-nums uppercase text-blue-900 dark:text-blue-400 font-bold block mb-1">
                    Chapter {ch.number} · {ch.part}
                  </span>
                  <div className="font-serif font-bold text-sm text-[#101828] dark:text-white mb-1">
                    {ch.title}
                  </div>
                  <p className="text-[11px] text-[#475467] dark:text-slate-400 line-clamp-2">
                    {ch.subtitle}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5.2 SIGNATURE FRAMEWORKS GRID */}
      <section className="py-20 bg-[#FAFAF7] dark:bg-[#0A101D] border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold block mb-1">
                12 Signature Operating Models
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
                Explore the Signature Frameworks
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('frameworks')}
              className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Browse All 12 Frameworks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {signatureFrameworks.map((fw) => (
              <button
                type="button"
                key={fw.slug}
                onClick={() =>
                  fw.page === 'cao-framework'
                    ? onNavigate('cao-framework')
                    : onNavigate('frameworks', fw.slug)
                }
                className="text-left p-5 rounded-xl bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 hover:border-blue-900 dark:hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <span className="text-[10px] font-mono tabular-nums text-blue-900 dark:text-blue-400 font-bold block mb-2">
                    {fw.code}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#101828] dark:text-white mb-2 group-hover:text-blue-900 dark:group-hover:text-blue-400">
                    {fw.name}
                  </h3>
                  <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                    {fw.summary}
                  </p>
                </div>
                <span className="pt-4 text-[11px] font-semibold text-blue-900 dark:text-blue-400 inline-flex items-center gap-1">
                  <span>Open Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5. AUTHOR SPOTLIGHT — HARSH VERMA */}
      <section className="py-24 bg-white dark:bg-[#070B14] border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAFAF7] dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10 p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Author Image */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative max-w-xs w-full group">
                  <div className="rounded-xl overflow-hidden border border-[#101828]/10 dark:border-white/15 shadow-lg bg-slate-100 aspect-3/4">
                    <img
                      src={SITE_CONFIG.author.portraitPrimary}
                      alt={`${SITE_CONFIG.author.name}, Author of ${SITE_CONFIG.book.title}`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('public/assets')) {
                          target.src = `/public${SITE_CONFIG.author.portraitPrimary}`;
                        }
                      }}
                    />
                  </div>
                  <div className="text-center mt-3">
                    <span className="text-xs font-serif font-bold text-[#101828] dark:text-white">
                      {SITE_CONFIG.author.name}
                    </span>
                    <span className="block text-[11px] text-[#475467] dark:text-slate-400">
                      Principal AI Engineer · Palo Alto Networks
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Grounded Bio & Leadership */}
              <div className="lg:col-span-8 space-y-4 text-left">
                <div className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold">
                  Meet the Author · {SITE_CONFIG.author.headline}
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white leading-tight">
                  {SITE_CONFIG.author.name}
                </h2>

                <p className="font-serif text-lg text-blue-950 dark:text-blue-300 italic">
                  "AI can increasingly write the code. Your advantage moves to deciding what deserves to be built."
                </p>

                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed font-sans">
                  {SITE_CONFIG.author.verifiedBio}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.08] dark:border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block mb-1">
                      Current Volume
                    </span>
                    <div className="font-serif font-bold text-sm text-[#101828] dark:text-white">
                      {SITE_CONFIG.book.title}
                    </div>
                    <div className="text-[11px] text-[#475467] dark:text-slate-400">
                      {SITE_CONFIG.book.subtitle} — {SITE_CONFIG.book.tagline}
                    </div>
                  </div>

                  <div className="p-3.5 bg-white dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.08] dark:border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 font-bold block mb-1">
                      Cybersecurity Volume
                    </span>
                    <div className="font-serif font-bold text-sm text-[#101828] dark:text-white">AI vs. AI</div>
                    <div className="text-[11px] text-[#475467] dark:text-slate-400">
                      Engineering the Cybersecurity Counteroffensive.
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('author')}
                    className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Read Full Author Biography</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={SITE_CONFIG.author.personalSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-semibold border border-[#101828]/20 dark:border-white/20 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Official Profile on harshverma.me</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PUBLICATIONS, MEDIA VENUES & READER PERSPECTIVES */}
      <section className="py-24 bg-[#FAFAF7] dark:bg-[#0A101D] border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
              Publications, Advisory & Reader Notes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
              Where Harsh Verma Contributes & Advises
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {SITE_CONFIG.author.mediaVenues.map((venue) => (
              <div
                key={venue.name}
                className="p-6 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block mb-2">
                    {venue.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#101828] dark:text-white mb-2">
                    {venue.name}
                  </h3>
                  <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                    {venue.description}
                  </p>
                </div>
                {venue.url && (
                  <a
                    href={venue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-4 text-xs font-semibold text-blue-900 dark:text-blue-400 inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Verify Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {SITE_CONFIG.book.approvedEndorsements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SITE_CONFIG.book.approvedEndorsements.map((end, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl"
                >
                  <p className="font-serif text-base sm:text-lg text-[#101828] dark:text-slate-100 italic leading-relaxed mb-4">
                    "{end.quote}"
                  </p>
                  <div className="text-xs font-semibold text-[#101828] dark:text-white">{end.author}</div>
                  <div className="text-xs text-[#475467] dark:text-slate-400">{end.title}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#101828] dark:text-white">
                  Submit an Early Reader Reflection or Case Study
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 mt-1">
                  Only verified reader endorsements appear here. Applying the C.A.O. Framework in production or coursework? Share your perspective.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('stories')}
                  className="px-4 py-2 text-xs font-semibold border border-[#101828]/20 dark:border-white/20 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  Explore Reader Stories
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 cursor-pointer"
                >
                  Share Review
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6.5 STARTER TOOLKIT & LAB PREVIEW */}
      <section className="py-16 bg-white dark:bg-[#070B14] border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold">
                <Wrench className="w-4 h-4" />
                <span>Companion Lab & 15 Downloadable Tools</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
                Ready-to-Use Engineering Canvases, Audits & Roadmaps
              </h2>
              <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                Explore the 30/60/90-day transition canvas, AI evaluation rubric, ethical curation audit checklist, and Human API template across all three career stages.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('resources')}
                className="px-5 py-3 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Open Companion Resources</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('insights')}
                className="px-5 py-3 text-xs font-semibold border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-slate-200 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Read Insights & Columns
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EMAIL CAPTURE: THE ENGINEER AFTER CODE DISPATCH */}
      <section className="py-20 bg-[#FAFAF7] dark:bg-[#0A101D] transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-blue-900 dark:text-blue-400 font-mono block mb-2 font-semibold">
            {SITE_CONFIG.newsletter.name}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white mb-3">
            Continue Beyond the Book
          </h2>
          <p className="text-sm sm:text-base text-[#475467] dark:text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
            {SITE_CONFIG.newsletter.description} Direct requests are routed to Harsh Verma ({SITE_CONFIG.author.publicContactEmail}).
          </p>

          {emailStatus === 'idle' && (
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
              <label htmlFor="home-newsletter-email" className="sr-only">Work email address</label>
              <input
                id="home-newsletter-email"
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
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Request Dispatches</span>
                )}
              </button>
            </form>
          )}

          {emailStatus === 'sent' && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 rounded-lg max-w-md mx-auto text-xs sm:text-sm font-medium space-y-2">
              <p>✓ {emailMessage}</p>
              {!SITE_CONFIG.newsletter.isEspConfigured && (
                <p className="text-[11px] opacity-80">
                  Note: Automated double-opt-in mailing list delivery is currently handled directly by the author's inbox.
                </p>
              )}
            </div>
          )}

          {emailStatus === 'fallback' && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 rounded-lg max-w-md mx-auto text-xs sm:text-sm space-y-3">
              <div className="flex items-start gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{emailMessage}</span>
              </div>
              {emailMailto && (
                <a
                  href={emailMailto}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md text-xs font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Email Client to Send Request</span>
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SCROLL STORY */}
      <ScrollStory onNavigate={onNavigate} />
    </div>
  );
};
