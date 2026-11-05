import React from 'react';
import { PageId } from '../types';
import { ExternalLink, Award, Shield, Cpu, BookOpen, ArrowRight, CheckCircle2, Sparkles, Building2, GraduationCap } from 'lucide-react';
import { BOOK_DETAILS } from '../data/bookData';

interface AuthorViewProps {
  onNavigate: (page: PageId) => void;
  onOpenSpeakingModal: () => void;
  onOpenBuyModal: () => void;
}

export const AuthorView: React.FC<AuthorViewProps> = ({
  onNavigate,
  onOpenSpeakingModal,
  onOpenBuyModal,
}) => {
  const credibilityBlocks = [
    { title: 'Principal AI Engineer', desc: 'Palo Alto Networks · Enterprise agentic systems & autonomous cyber defense' },
    {
      title: 'Keynote Speaker',
      desc: 'Global Tech Summits & Executive AI Briefings · Keynotes on Autonomous Agents, Systems Curation & The Trust Economy',
      highlight: true,
      action: onOpenSpeakingModal,
    },
    { title: 'Fellow & IEEE Senior', desc: 'Fellow of RSA, IFGICT & BCS · IEEE Senior Member · Forbes Tech Council' },
    { title: 'Silicon Valley Advisor', desc: 'Mentor & Evaluator at Berkeley SkyDeck, Techstars & Mayfield AI Garage' },
  ];

  const authoredBooks = [
    {
      title: 'Beyond AI Engineering',
      subtitle: 'From Creator to Curator: Build Your Authority and Lead the AI Agent Revolution',
      focus: 'Career OS for engineers navigating autonomous agents, systems judgment, and the transition from code writer to high-leverage curator.',
      badge: 'Current Release',
      isCurrent: true,
      linkText: 'Explore This Book',
      action: () => onNavigate('book'),
    },
    {
      title: 'AI vs. AI: Engineering the Cybersecurity Counteroffensive',
      subtitle: 'Autonomous Systems & Real-Time Threat Mitigation',
      focus: 'Empirical research and architectural case studies on building real-time autonomous AI counter-offensive systems against weaponized AI adversaries.',
      badge: 'Technical Volume',
      isCurrent: false,
      linkText: 'Learn More on harshverma.me',
      externalUrl: 'https://www.harshverma.me/page-books#book1',
    },
  ];

  const journeySteps = [
    { stage: 'Foundations & Distributed Systems', note: 'Large-scale fault tolerance, memory architectures & high-throughput concurrency' },
    { stage: 'Machine Learning & Frontier AI', note: 'Deep learning models, synthetic data pipelines & reasoning model infrastructure' },
    { stage: 'Cybersecurity & Counteroffensives', note: 'AI security governance, zero-trust semantic boundaries & adversarial resilience' },
    { stage: 'Principal AI Engineer (Palo Alto Networks)', note: 'Architecting enterprise multi-agent workflows and autonomous defense fabrics' },
    { stage: 'Stanford GSB & Ecosystem Mentorship', note: 'Stanford Distinguished Scholar, Berkeley SkyDeck advisor & Techstars mentor' },
    { stage: 'Beyond AI Engineering & The Trust Economy', note: 'Authoring the definitive operating system for engineers in the agentic era' },
  ];

  const credentials = [
    'Principal Software Engineer in AI at Palo Alto Networks',
    'Stanford Distinguished Scholar (Stanford Graduate School of Business LEAD)',
    'Official Member, Forbes Technology Council',
    'Senior Member, IEEE (Institute of Electrical and Electronics Engineers)',
    'Fellow of RSA (Royal Society for the Arts, Manufactures and Commerce)',
    'Fellow of BCS (The Chartered Institute for IT)',
    'Fellow of IFGICT (International Federation of Green ICT)',
    'Advisor & Evaluator at Berkeley SkyDeck, Techstars & Mayfield Fund AI Garage',
    'International Keynote Speaker & Executive AI Advisor',
  ];

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="pt-16 sm:pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Bio & Grounded Credentials */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold">
                About the Author
              </span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-xs text-[#475467] dark:text-slate-400 font-sans">
                Silicon Valley, California
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] dark:text-white">
              Harsh Verma
            </h1>

            <h2 className="font-serif text-xl sm:text-2xl text-blue-950 dark:text-blue-300 italic">
              Principal AI Engineer · Author · Keynote Speaker · AI & Cybersecurity Leader
            </h2>

            <div className="space-y-4 text-base text-[#475467] dark:text-slate-300 leading-relaxed font-sans">
              <p className="font-medium text-[#101828] dark:text-slate-100 text-lg">
                Harsh Verma is a Silicon Valley-based Principal AI Software Engineer at <strong>Palo Alto Networks</strong>, researcher, author, and keynote speaker whose work sits at the frontier of autonomous agent ecosystems, AI security governance, and enterprise distributed systems.
              </p>
              <p>
                Recognized as a <strong>Stanford Distinguished Scholar</strong> by the Stanford Graduate School of Business, an official member of the <strong>Forbes Technology Council</strong>, a <strong>Fellow of the RSA, IFGICT, and BCS</strong>, and an <strong>IEEE Senior Member</strong>, Harsh actively mentors and evaluates startup founders across leading accelerators including <strong>Berkeley SkyDeck</strong>, <strong>Techstars</strong>, and the <strong>Mayfield Fund AI Garage</strong>.
              </p>
              <div className="p-6 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl shadow-2xs">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-semibold block mb-2">
                  The Core Inquiry
                </span>
                <blockquote className="font-serif text-lg sm:text-xl font-medium text-[#101828] dark:text-slate-100 italic leading-snug">
                  "As AI becomes capable of performing more engineering tasks, what becomes uniquely valuable about the engineer?"
                </blockquote>
                <p className="text-xs text-[#475467] dark:text-slate-400 mt-3">
                  This foundational question drove Harsh to author <em>Beyond AI Engineering: From Creator to Curator</em>—establishing the career operating system for the next generation of Super Engineers.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={BOOK_DETAILS.authorAboutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Official Portfolio (harshverma.me)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenSpeakingModal}
                className="px-5 py-3 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Invite Harsh to Speak
              </button>
            </div>
          </div>

          {/* Right: Author Portrait (User Attached Picture) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm sm:max-w-md w-full">
              <div className="rounded-2xl overflow-hidden border border-[#101828]/10 dark:border-white/15 shadow-xl bg-white dark:bg-[#0D1527] group">
                <div className="aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                  <img
                    src="/assets/aistudio/harsh_verma_87a0217e.jpg"
                    alt="Harsh Verma, Author of Beyond AI Engineering"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('public/assets')) {
                        target.src = '/public/assets/aistudio/harsh_verma_87a0217e.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
                
                <div className="p-5 bg-white dark:bg-[#0D1527] border-t border-[#101828]/[0.08] dark:border-white/10 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-serif font-bold text-lg text-[#101828] dark:text-white">Harsh Verma</div>
                      <div className="text-xs text-[#475467] dark:text-slate-400">Principal AI Software Engineer · Author · Keynote Speaker</div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2 py-1 rounded font-semibold border border-blue-100 dark:border-blue-900/60">
                      Silicon Valley
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#101828]/[0.06] dark:border-white/10 flex items-center justify-between text-[11px] text-[#475467] dark:text-slate-400">
                    <span>Palo Alto Networks</span>
                    <span
                      onClick={onOpenSpeakingModal}
                      className="font-semibold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900 px-2 py-0.5 rounded transition-colors cursor-pointer"
                      title="Invite Harsh to speak"
                    >
                      Keynote Speaker
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CREDIBILITY BLOCKS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credibilityBlocks.map((block) => (
            <div
              key={block.title}
              onClick={block.action}
              className={`p-6 rounded-xl border text-left transition-all hover:-translate-y-1 duration-300 ${
                block.highlight
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800/80 hover:border-blue-900 dark:hover:border-blue-400 shadow-xs cursor-pointer group'
                  : 'bg-white dark:bg-[#0D1527] border-[#101828]/10 dark:border-white/10 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className={`font-serif text-xl sm:text-2xl font-bold ${block.highlight ? 'text-blue-950 dark:text-blue-300 group-hover:text-blue-900 dark:group-hover:text-blue-200' : 'text-[#101828] dark:text-white'}`}>
                  {block.title}
                </div>
                {block.highlight && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 font-bold bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded">
                    Global Speaker
                  </span>
                )}
              </div>
              <p className="text-xs text-[#475467] dark:text-slate-300 leading-relaxed font-sans">
                {block.desc}
              </p>
              {block.action && (
                <div className="mt-3 pt-2 border-t border-blue-200 dark:border-blue-900/60 text-xs font-semibold text-blue-900 dark:text-blue-400 flex items-center gap-1 group-hover:underline">
                  <span>Invite Harsh to Speak</span>
                  <span>→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. AUTHORED BOOKS SHOWCASE */}
      <section className="py-20 bg-white dark:bg-[#070B14] border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
              Published Works
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
              Books by Harsh Verma
            </h2>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 mt-2">
              Exploring the evolution of the software discipline, agentic architectures, and cybersecurity defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {authoredBooks.map((book) => (
              <div
                key={book.title}
                className="bg-[#FAFAF7] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-2xs hover:border-blue-900 dark:hover:border-blue-400 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded font-semibold border border-blue-100 dark:border-blue-900/60">
                      {book.badge}
                    </span>
                    <BookOpen className="w-4 h-4 text-[#98A2B3] dark:text-slate-500" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-1">
                    {book.title}
                  </h3>
                  <div className="font-serif text-sm text-[#475467] dark:text-blue-300/80 italic mb-4">
                    {book.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed mb-6 font-sans">
                    {book.focus}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#101828]/[0.08] dark:border-white/10">
                  {book.isCurrent ? (
                    <button
                      onClick={book.action}
                      className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{book.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href={book.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1.5"
                    >
                      <span>{book.linkText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY I WROTE THIS BOOK */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
            Author Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
            Why I Wrote This Book
          </h2>
        </div>

        <div className="bg-white dark:bg-[#0D1527] p-8 sm:p-12 rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-sm space-y-5 text-sm sm:text-base text-[#344054] dark:text-slate-300 leading-relaxed">
          <p className="font-serif italic text-lg sm:text-xl text-[#101828] dark:text-slate-100">
            "I watched AI begin performing tasks engineers had spent years learning to do. Instead of asking how engineers could compete with machines, I began asking where human value moves when implementation becomes cheaper. Beyond AI Engineering is my answer."
          </p>
          <p>
            At Palo Alto Networks and throughout my career across distributed systems, autonomous security, and machine learning, I witnessed a recurring trap: engineers doubling down on raw typing velocity rather than cultivating systems discernment.
          </p>
          <p>
            In the modern era, the highest-leverage engineers operate as <strong>"Super Engineers"</strong>: professionals who bridge architecture, AI product sense, autonomous multi-agent governance, and security invariants. They do not just write tickets; they decide what deserves to exist.
          </p>
          <p>
            This book is the field operating manual for making that transition.
          </p>
        </div>
      </section>

      {/* 5. THE JOURNEY TIMELINE */}
      <section className="py-20 bg-[#FAF9F5] dark:bg-[#0A101D] border-y border-[#101828]/[0.08] dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
              Career Trajectory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
              The Journey
            </h2>
          </div>

          <div className="space-y-4">
            {journeySteps.map((step, idx) => (
              <div
                key={step.stage}
                className="bg-white dark:bg-[#0D1527] p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-blue-900/40 dark:hover:border-blue-400/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-[#FAFAF7] dark:bg-[#131F3A] font-mono text-xs font-bold text-blue-900 dark:text-blue-400 flex items-center justify-center border border-[#101828]/10 dark:border-white/10">
                    0{idx + 1}
                  </span>
                  <span className="font-serif font-bold text-lg text-[#101828] dark:text-white">
                    {step.stage}
                  </span>
                </div>
                <div className="text-xs text-[#475467] dark:text-slate-400 sm:text-right font-sans">
                  {step.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SELECTED CREDENTIALS & AFFILIATIONS */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono block mb-2">
            Professional Accreditations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101828] dark:text-white">
            Selected Credentials & Memberships
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {credentials.map((cred) => (
            <div
              key={cred}
              className="p-4 bg-white dark:bg-[#0D1527] rounded-lg border border-[#101828]/10 dark:border-white/10 flex items-center gap-3 text-xs sm:text-sm font-medium text-[#101828] dark:text-slate-200 shadow-2xs"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-900 dark:text-blue-400 shrink-0" />
              <span>{cred}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center space-y-3">
          <a
            href={BOOK_DETAILS.authorAboutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-4 inline-flex items-center gap-1.5"
          >
            <span>Visit Harsh Verma's Complete Biography on harshverma.me</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
};
