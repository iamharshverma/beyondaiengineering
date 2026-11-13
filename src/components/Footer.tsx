import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PageId } from '../types';
import { ArrowUpRight, BookOpen, ExternalLink } from 'lucide-react';
import { BrandLogo } from './Navbar';
import { SITE_CONFIG } from '../config/siteConfig';

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
  const prefersReducedMotion = useReducedMotion();
  const handleNavigate = (page: PageId) => {
    onNavigate(page);
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="bg-[#101828] dark:bg-[#05080F] text-white pt-16 pb-12 border-t border-slate-800 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo size="md" />
              <div>
                <span className="text-xs tracking-wider text-blue-400 font-mono block">
                  The Book &amp; The Movement
                </span>
                <span className="text-xs uppercase tracking-wide text-amber-300 font-semibold block font-sans">
                  FROM BEING CREATOR TO CURATOR !!
                </span>
              </div>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Beyond AI Engineering
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md">
              {SITE_CONFIG.book.tagline} Helping software engineers, architects, students, and organizations move from writing code to exercising judgment and curating trusted AI systems.
            </p>
            <div className="pt-2 flex flex-wrap gap-3 items-center">
              <button
                onClick={onOpenBuyModal}
                className="px-4 py-2 text-xs font-semibold text-[#101828] bg-white rounded-md hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Get the Book</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <motion.button
                type="button"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={onOpenAssessment}
                className="px-4 py-2 text-xs font-semibold text-white border border-slate-700 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
              >
                Take C.A.O. Assessment
              </motion.button>
            </div>
          </div>

          {/* Quick Links Matrix */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="font-semibold text-xs uppercase tracking-wider font-mono text-slate-400 mb-4">
                Book & Frameworks
              </h3>
              <ul className="space-y-2.5 text-slate-300">
                <li>
                  <button onClick={() => handleNavigate('book')} className="hover:text-white transition-colors cursor-pointer">
                    The Book
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('sample')} className="hover:text-white transition-colors cursor-pointer text-blue-300">
                    Read Sample Excerpt
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('cao-framework')} className="hover:text-white transition-colors cursor-pointer">
                    C.A.O. Framework
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('frameworks')} className="hover:text-white transition-colors cursor-pointer">
                    12 Signature Frameworks
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('resources')} className="hover:text-white transition-colors cursor-pointer">
                    Implementation Lab
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('toolkit')} className="hover:text-white transition-colors cursor-pointer">
                    Living AI Toolkit
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('manifesto')} className="hover:text-white transition-colors cursor-pointer">
                    The Manifesto (8 Axioms)
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xs uppercase tracking-wider font-mono text-slate-400 mb-4">
                Pathways & Insights
              </h3>
              <ul className="space-y-2.5 text-slate-300">
                <li>
                  <button onClick={() => handleNavigate('insights')} className="hover:text-white transition-colors cursor-pointer text-blue-300 font-medium">
                    Insights & Dispatches
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('engineers')} className="hover:text-white transition-colors cursor-pointer">
                    For Engineers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('students')} className="hover:text-white transition-colors cursor-pointer">
                    For Students
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('organizations')} className="hover:text-white transition-colors cursor-pointer text-amber-300">
                    For Organizations
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('speaking')} className="hover:text-white transition-colors cursor-pointer">
                    Speaking & Keynotes
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('press')} className="hover:text-white transition-colors cursor-pointer">
                    Press & Media Kit
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-semibold text-xs uppercase tracking-wider font-mono text-slate-400 mb-4">
                About Harsh Verma
              </h3>
              <div className="space-y-3 text-slate-300 text-xs">
                <p className="leading-relaxed">
                  Principal AI Engineer at <strong className="text-white">Palo Alto Networks</strong>, Stanford Distinguished Scholar, Fellow of RSA, BCS & IFGICT, IEEE Senior Member, and Forbes Technology Council Member.
                </p>
                <div className="flex flex-col gap-1.5 pt-1">
                  <a
                    href={SITE_CONFIG.author.personalBlogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Harsh Verma Writing Archive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.harshverma.me/page-about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Personal Biography</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={SITE_CONFIG.author.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="pt-1 text-slate-400">
                  Advisor · Berkeley SkyDeck, Techstars & Mayfield Fund AI Garage
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Operating Principles */}
        <div className="py-8 border-b border-slate-800 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="text-xs text-slate-400">
            <span className="block text-white font-mono tabular-nums mb-1">01</span>
            AI makes execution easier.
          </div>
          <div className="text-xs text-slate-400">
            <span className="block text-white font-mono tabular-nums mb-1">02</span>
            Judgment becomes scarce.
          </div>
          <div className="text-xs text-slate-400">
            <span className="block text-white font-mono tabular-nums mb-1">03</span>
            Move from How to What.
          </div>
          <div className="text-xs text-slate-400">
            <span className="block text-white font-mono tabular-nums mb-1">04</span>
            Build for the Trust Economy.
          </div>
          <div className="text-xs text-slate-400 col-span-2 md:col-span-1">
            <span className="block text-white font-mono tabular-nums mb-1">05</span>
            Creator · Architect · Orchestrator
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Beyond AI Engineering © {new Date().getFullYear()} Harsh Verma.</span>
          </div>
          <div className="font-serif italic text-sm text-slate-300 tracking-wide">
            From Creator to Curator.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${SITE_CONFIG.author.publicContactEmail}`} className="hover:text-white transition-colors text-blue-300">
              {SITE_CONFIG.author.publicContactEmail}
            </a>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
              Contact
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNavigate('press')} className="hover:text-white transition-colors cursor-pointer">
              Media Kit
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
