import React from 'react';
import { PageId } from '../types';
import { ArrowUpRight, BookOpen, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBuyModal: () => void;
  onOpenAssessment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBuyModal,
  onOpenAssessment,
}) => {
  const handleNavigate = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101828] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-mono">
              The Book & Movement
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              BEYOND AI ENGINEERING
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md">
              The practical career operating system for engineers in the age of AI agents. Helping builders move from producing code to exercising judgment, designing systems, and orchestrating trusted outcomes.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenBuyModal}
                className="px-4 py-2 text-xs font-semibold text-[#101828] bg-white rounded-md hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Get the Book</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenAssessment}
                className="px-4 py-2 text-xs font-semibold text-white border border-slate-700 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
              >
                Take C.A.O. Assessment
              </button>
            </div>
          </div>

          {/* Quick Links Matrix */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider font-mono text-slate-400 mb-4">
                The Work
              </h3>
              <ul className="space-y-2.5 text-slate-300">
                <li>
                  <button onClick={() => handleNavigate('book')} className="hover:text-white transition-colors cursor-pointer">
                    The Book
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('frameworks')} className="hover:text-white transition-colors cursor-pointer">
                    C.A.O. Framework
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('resources')} className="hover:text-white transition-colors cursor-pointer">
                    The Lab (Canvases)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('toolkit')} className="hover:text-white transition-colors cursor-pointer">
                    Living Toolkit
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('manifesto')} className="hover:text-white transition-colors cursor-pointer">
                    The Manifesto
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider font-mono text-slate-400 mb-4">
                Audience & Ideas
              </h3>
              <ul className="space-y-2.5 text-slate-300">
                <li>
                  <button onClick={() => handleNavigate('students')} className="hover:text-white transition-colors cursor-pointer">
                    For Students
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('ideas')} className="hover:text-white transition-colors cursor-pointer">
                    Ideas Beyond the Book
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('stories')} className="hover:text-white transition-colors cursor-pointer">
                    Reader Stories
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('speaking')} className="hover:text-white transition-colors cursor-pointer">
                    Keynotes & Speaking
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('press')} className="hover:text-white transition-colors cursor-pointer">
                    Press & Media Kit
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider font-mono text-slate-400 mb-4">
                Author & Ecosystem
              </h3>
              <div className="space-y-3 text-slate-300 text-xs">
                <p className="leading-relaxed">
                  <strong className="text-white">Harsh Verma</strong> is a Principal AI Software Engineer at <strong className="text-white">Palo Alto Networks</strong>, Stanford Distinguished Scholar, Fellow of RSA & BCS, IEEE Senior Member, and Forbes Technology Council Member.
                </p>
                <div className="flex flex-col gap-1.5 pt-1">
                  <a
                    href="https://www.harshverma.me/page-about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>About Harsh Verma (harshverma.me)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.harshverma.me/page-books#book1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Author's Books Catalog</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="pt-2 text-slate-400 space-y-1">
                  <div>Berkeley SkyDeck & Techstars Advisor</div>
                  <div>Mayfield Fund AI Garage Evaluator</div>
                  <div>Stanford GSB LEAD Scholar</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Intellectual Property Pillars */}
        <div className="py-8 border-b border-slate-800 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="text-xs text-slate-400">
            <span className="block text-white font-medium mb-1">01</span>
            AI makes execution easier.
          </div>
          <div className="text-xs text-slate-400">
            <span className="block text-white font-medium mb-1">02</span>
            Judgment becomes scarce.
          </div>
          <div className="text-xs text-slate-400">
            <span className="block text-white font-medium mb-1">03</span>
            Move from How to What.
          </div>
          <div className="text-xs text-slate-400">
            <span className="block text-white font-medium mb-1">04</span>
            Build for the Trust Economy.
          </div>
          <div className="text-xs text-slate-400 col-span-2 md:col-span-1">
            <span className="block text-white font-medium mb-1">05</span>
            Creator → Architect → Orchestrator.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Beyond AI Engineering © {new Date().getFullYear()} Harsh Verma. All rights reserved.</span>
          </div>
          <div className="font-serif italic text-sm text-slate-300 tracking-wide">
            Creator. Architect. Orchestrator.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNavigate('press')} className="hover:text-white transition-colors">
              Media Inquiries
            </button>
            <span>·</span>
            <button onClick={() => handleNavigate('manifesto')} className="hover:text-white transition-colors">
              The Manifesto
            </button>
            <span>·</span>
            <a href="https://www.harshverma.me" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Official Author Site
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
