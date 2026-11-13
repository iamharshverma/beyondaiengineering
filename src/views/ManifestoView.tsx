import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { trackEvent } from '../utils/analytics';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
import { Share2, Download, Printer } from 'lucide-react';

interface ManifestoViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBuyModal: () => void;
}

export const ManifestoView: React.FC<ManifestoViewProps> = ({
  onNavigate,
  onOpenBuyModal,
}) => {
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);
  const [downloadedManifesto, setDownloadedManifesto] = useState(false);

  useEffect(() => {
    updatePageSeo({
      title: 'The Engineer After Code Manifesto | Beyond AI Engineering',
      description:
        'Eight foundational axioms for software engineers building resilient, high-leverage careers around judgment, boundaries, and trust.',
      canonicalPath: '/manifesto',
      ogType: 'article',
      ogImage: PAGE_OG_IMAGES.manifesto,
      schemaType: 'Article',
      breadcrumbs: [{ name: 'Manifesto', path: '/manifesto' }],
    });
  }, []);

  const principles = [
    {
      num: '01',
      title: 'BUILD DEEPLY. THINK BROADLY.',
      desc: 'Master the low-level foundations of computing, while elevating your perspective to global system architectures.',
    },
    {
      num: '02',
      title: 'MOVE FROM HOW TO WHAT.',
      desc: 'Execution speed is cheap. Deciding which system deserves to exist is the ultimate competitive advantage.',
    },
    {
      num: '03',
      title: 'USE AI FOR LEVERAGE. NEVER OUTSOURCE JUDGMENT.',
      desc: 'Let models synthesize the syntax; never let them make the trade-offs that determine safety and trust.',
    },
    {
      num: '04',
      title: 'A MODEL IS NOT A SYSTEM.',
      desc: 'A model is a probabilistic matrix. A system is a deterministic promise to your users, wrapped in boundaries.',
    },
    {
      num: '05',
      title: 'DESIGN FOR UNCERTAINTY.',
      desc: 'Assume stochastic outputs will drift, tools will timeout, and inputs will be adversarial. Build defensive resilience.',
    },
    {
      num: '06',
      title: 'NEVER AUTOMATE RESPONSIBILITY AWAY.',
      desc: 'If an autonomous agent fails in production, you own the catastrophic outcome. Retain clear human authority.',
    },
    {
      num: '07',
      title: 'BUILD FOR THE TRUST ECONOMY.',
      desc: 'When synthetic output becomes infinite, verified human credibility becomes the scarcest asset on earth.',
    },
    {
      num: '08',
      title: 'LEAVE EVIDENCE BEHIND.',
      desc: 'Do not claim capability through buzzwords. Build a verifiable Digital Paper Trail of decisions, post-mortems, and proof of work.',
    },
  ];

  const handleShareQuote = (quote: string) => {
    trackEvent('manifesto_share', { quote });
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `"${quote}" — The Beyond AI Engineering Manifesto by ${SITE_CONFIG.author.name}. ${SITE_CONFIG.canonicalOrigin}/manifesto`
      );
      setCopiedQuote(quote);
      setTimeout(() => setCopiedQuote(null), 2500);
    }
  };

  const handleDownloadManifesto = () => {
    trackEvent('manifesto_download', { format: 'txt' });
    const text = `THE BEYOND AI ENGINEERING MANIFESTO: THE ENGINEER AFTER CODE
By ${SITE_CONFIG.author.name} (${SITE_CONFIG.book.fullTitle})

${principles.map((p) => `AXIOM ${p.num} — ${p.title}\n${p.desc}\n`).join('\n')}
---
CREATOR. ARCHITECT. ORCHESTRATOR.
Build the system. Design what matters. Orchestrate the outcome.

"The future of engineering will not be determined by AI alone. It will be determined by the people who decide how AI should be used."
Read more at ${SITE_CONFIG.canonicalOrigin}/manifesto`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Beyond-AI-Engineering-Manifesto.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloadedManifesto(true);
    setTimeout(() => setDownloadedManifesto(false), 3000);
  };

  const handlePrint = () => {
    trackEvent('manifesto_download', { format: 'print' });
    window.print();
  };

  return (
    <div className="space-y-0 bg-[#FAFAF7] dark:bg-[#070B14] transition-colors">
      {/* 1. MANIFESTO HERO */}
      <section className="pt-20 sm:pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-b border-[#101828]/[0.08] dark:border-white/10">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-semibold block mb-2">
          The Beyond AI Engineering Manifesto
        </span>
        <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-[#101828] dark:text-white mb-6 text-balance">
          The Engineering After Code
        </h1>
        <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic max-w-2xl mx-auto leading-relaxed">
          Eight guiding axioms for technical professionals navigating the generative AI and autonomous agent revolution.
        </p>

        <div className="pt-8 flex flex-wrap justify-center gap-3 no-print">
          <button
            type="button"
            onClick={handleDownloadManifesto}
            className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadedManifesto ? 'Downloaded TXT!' : 'Download Manifesto (.txt)'}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
          <button
            type="button"
            onClick={() =>
              handleShareQuote(
                'The future of engineering will not be determined by AI alone. It will be determined by the people who decide how AI should be used.'
              )
            }
            className="px-4 py-2 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedQuote ? 'Copied Axiom!' : 'Share Quote'}</span>
          </button>
        </div>
      </section>

      {/* 2. THE EDITORIAL PRINCIPLES SCROLL (hairline top dividers, no thick left borders) */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {principles.map((item) => (
          <div
            key={item.num}
            className="text-left border-t border-[#101828]/12 dark:border-white/10 pt-8 group"
          >
            <div className="font-mono text-xs font-semibold text-blue-900 dark:text-blue-400 tracking-wider mb-2 tabular-nums">
              AXIOM {item.num}
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] dark:text-white tracking-tight leading-tight mb-4">
              {item.title}
            </h2>

            <p className="text-base sm:text-xl text-[#475467] dark:text-slate-300 leading-relaxed font-sans max-w-2xl">
              {item.desc}
            </p>

            <button
              type="button"
              onClick={() => handleShareQuote(item.title)}
              className="mt-4 text-xs text-[#475467] dark:text-slate-400 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer no-print"
            >
              <Share2 className="w-3 h-3" />
              <span>{copiedQuote === item.title ? 'Copied quote to clipboard!' : 'Copy axiom quote'}</span>
            </button>
          </div>
        ))}

        {/* 3. CLIMACTIC TRIAD & CLOSING */}
        <div className="pt-20 pb-12 text-center border-t border-[#101828]/10 dark:border-white/10 space-y-8">
          <div className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] dark:text-white space-y-2">
            <div>CREATOR.</div>
            <div>ARCHITECT.</div>
            <div>ORCHESTRATOR.</div>
          </div>

          <div className="h-px w-20 bg-[#101828]/20 dark:bg-white/20 mx-auto" />

          <div className="font-serif text-xl sm:text-2xl text-[#101828] dark:text-slate-200 italic font-medium leading-relaxed">
            Build the system. <br />
            Design what matters. <br />
            Orchestrate the outcome.
          </div>

          <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl shadow-xs">
            <blockquote className="font-serif text-xl sm:text-2xl text-[#101828] dark:text-white font-semibold leading-relaxed">
              "The future of engineering will not be determined by AI alone. It will be determined by the people who decide how AI should be used."
            </blockquote>
            <div className="text-xs uppercase tracking-widest text-[#475467] dark:text-slate-400 font-mono mt-4">
              — {SITE_CONFIG.author.name}, {SITE_CONFIG.book.title}
            </div>
          </div>

          <div className="pt-6 no-print flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBuyModal}
              className="px-6 py-3 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer shadow-sm"
            >
              Get the Book
            </button>
            <button
              type="button"
              onClick={() => onNavigate('frameworks')}
              className="px-6 py-3 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/20 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Explore the 12 Frameworks
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
