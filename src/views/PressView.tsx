import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';
import { trackEvent } from '../utils/analytics';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
import { Download, Copy, Check, FileText, Image as ImageIcon, HelpCircle, ChevronRight } from 'lucide-react';

interface PressViewProps {
  onNavigate: (page: PageId) => void;
}

export const PressView: React.FC<PressViewProps> = ({ onNavigate }) => {
  const [copiedBio, setCopiedBio] = useState<string | null>(null);

  useEffect(() => {
    updatePageSeo({
      title: `Media & Press Kit | ${SITE_CONFIG.book.title} — ${SITE_CONFIG.author.name}`,
      description:
        'Approved author biographies, interview angles, high-resolution covers and portraits, and direct media inquiry contacts.',
      canonicalPath: '/press',
      ogType: 'website',
      ogImage: PAGE_OG_IMAGES.press,
      breadcrumbs: [{ name: 'Media & Press Kit', path: '/press' }],
    });
  }, []);

  const bios = {
    short: `${SITE_CONFIG.author.name} is the author of ${SITE_CONFIG.book.fullTitle} and a Principal AI Engineer at Palo Alto Networks. His work focuses on autonomous AI systems, enterprise security boundaries, and systems engineering leadership.`,
    medium: `${SITE_CONFIG.author.name} is the author of ${SITE_CONFIG.book.fullTitle}. He serves as a Principal AI Engineer at Palo Alto Networks, is a Stanford Distinguished Scholar, Fellow of the Royal Society of Arts (FRSA), Fellow of the British Computer Society (FBCS), IEEE Senior Member, and Forbes Technology Council Member.`,
    long: SITE_CONFIG.author.verifiedBio,
  };

  const interviewQuestions = [
    'What happens to software engineers when AI can increasingly write the code?',
    'What is the Creator–Architect–Orchestrator (C.A.O.) framework, and where does human value move?',
    'Why is judgment becoming the scarcest asset in the software economy?',
    'What is the Trust Economy, and why does abundance in code increase the value of accountability?',
    'Will autonomous AI agents eliminate junior engineering jobs, or transform them?',
    'Should university students still learn to code, or skip straight to prompting?',
    'What is Agentic Diplomacy, and why are unbounded AI agents an enterprise security nightmare?',
    'How should engineering organizations restructure their evaluation pipelines for generative agents?',
  ];

  const handleCopyText = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedBio(label);
      setTimeout(() => setCopiedBio(null), 2500);
    }
  };

  const handleDownloadAsset = (filename: string, content: string) => {
    trackEvent('press_asset_download', { filename });
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const pressReleaseContent = `PRESS RELEASE & MEDIA FACT SHEET
${SITE_CONFIG.book.fullTitle.toUpperCase()}
Subtitle Tagline: ${SITE_CONFIG.book.tagline}
Author: ${SITE_CONFIG.author.name} (${SITE_CONFIG.author.headline})

OVERVIEW
${SITE_CONFIG.book.shortDescription}

Structure: ${SITE_CONFIG.book.structureSummary}

ABOUT THE AUTHOR
${SITE_CONFIG.author.verifiedBio}

SUGGESTED INTERVIEW ANGLES
${interviewQuestions.map((q, idx) => `${idx + 1}. ${q}`).join('\n')}

MEDIA CONTACT
Email: ${SITE_CONFIG.author.publicContactEmail}
Website: ${SITE_CONFIG.canonicalOrigin}
Press Kit: ${SITE_CONFIG.canonicalOrigin}/press
Contact Form: ${SITE_CONFIG.canonicalOrigin}/contact`;

  return (
    <div className="space-y-0">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-900 dark:text-blue-400 font-semibold">Media & Press Kit</span>
        </nav>
      </div>

      {/* 1. HERO */}
      <section className="pt-8 sm:pt-14 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
            Media, Press & Reviewers
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] dark:text-white">
            Press & Media Kit
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
            Verified bios, high-resolution imagery, and interview angles for journalists, podcast hosts, and reviewers.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#475467] dark:text-slate-400">
            <span>
              Media Inquiries:{' '}
              <a
                href={`mailto:${SITE_CONFIG.author.publicContactEmail}`}
                className="font-semibold text-blue-900 dark:text-blue-400 underline"
              >
                {SITE_CONFIG.author.publicContactEmail}
              </a>
            </span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="font-semibold text-blue-900 dark:text-blue-400 underline cursor-pointer"
            >
              Submit Media Request Online →
            </button>
          </div>
        </div>
      </section>

      {/* 2. MEDIA DOWNLOADS GRID */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-[#101828] dark:text-white">
            Downloadable Press Assets
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Asset 1: High-Res Book Cover */}
          <div className="bg-white dark:bg-[#0D1527] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-2xs hover:border-blue-900/40 dark:hover:border-blue-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 flex items-center justify-center mb-3 border border-blue-100 dark:border-blue-900/50">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#101828] dark:text-white mb-1">
                Book Cover Artwork
              </h3>
              <p className="text-xs text-[#475467] dark:text-slate-400 mb-4">
                High-resolution hardcover 3D mockup & front cover artwork for {SITE_CONFIG.book.title}.
              </p>
            </div>
            <a
              href={SITE_CONFIG.book.coverImage}
              download="Beyond-AI-Engineering-Cover.jpg"
              onClick={() => trackEvent('press_asset_download', { filename: 'Beyond-AI-Engineering-Cover.jpg' })}
              className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Cover Image</span>
            </a>
          </div>

          {/* Asset 2: Author Headshot */}
          <div className="bg-white dark:bg-[#0D1527] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-2xs hover:border-purple-900/40 dark:hover:border-purple-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 flex items-center justify-center mb-3 border border-purple-100 dark:border-purple-900/50">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#101828] dark:text-white mb-1">
                Author Headshots
              </h3>
              <p className="text-xs text-[#475467] dark:text-slate-400 mb-4">
                Official portrait photography of {SITE_CONFIG.author.name} (Principal AI Engineer, Palo Alto Networks).
              </p>
            </div>
            <a
              href={SITE_CONFIG.author.portraitPrimary}
              download="Harsh-Verma-Author-Portrait.jpg"
              onClick={() => trackEvent('press_asset_download', { filename: 'Harsh-Verma-Author-Portrait.jpg' })}
              className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Author Photo</span>
            </a>
          </div>

          {/* Asset 3: Media Fact Sheet */}
          <div className="bg-white dark:bg-[#0D1527] p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 shadow-2xs hover:border-emerald-900/40 dark:hover:border-emerald-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 flex items-center justify-center mb-3 border border-emerald-100 dark:border-emerald-900/50">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#101828] dark:text-white mb-1">
                Media Fact Sheet & Release
              </h3>
              <p className="text-xs text-[#475467] dark:text-slate-400 mb-4">
                Book overview, verified author biography, interview questions, and press contact details.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDownloadAsset('Beyond-AI-Engineering-Media-Fact-Sheet.txt', pressReleaseContent)}
              className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1.5 cursor-pointer text-left"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Media Fact Sheet (TXT)</span>
            </button>
          </div>
        </div>

        {/* 3. AUTHOR BIOS */}
        <div className="bg-[#FAF9F5] dark:bg-[#0A101F] p-8 sm:p-10 rounded-2xl border border-[#101828]/10 dark:border-white/10 mb-16 space-y-6 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
              Approved Author Biographies
            </h3>
            <span className="text-xs font-mono text-[#475467] dark:text-slate-400">Aligned to Verified Bio</span>
          </div>

          {/* Short Bio */}
          <div className="bg-white dark:bg-[#0D1527] p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#475467] dark:text-slate-400">
              <span className="font-bold text-[#101828] dark:text-white">Short Bio (Podcast & Article Footers)</span>
              <button
                type="button"
                onClick={() => handleCopyText(bios.short, 'short')}
                className="text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedBio === 'short' ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBio === 'short' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              {bios.short}
            </p>
          </div>

          {/* Medium Bio */}
          <div className="bg-white dark:bg-[#0D1527] p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#475467] dark:text-slate-400">
              <span className="font-bold text-[#101828] dark:text-white">Standard Bio (Conference Programs)</span>
              <button
                type="button"
                onClick={() => handleCopyText(bios.medium, 'medium')}
                className="text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedBio === 'medium' ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBio === 'medium' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              {bios.medium}
            </p>
          </div>

          {/* Comprehensive Bio */}
          <div className="bg-white dark:bg-[#0D1527] p-5 rounded-xl border border-[#101828]/10 dark:border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#475467] dark:text-slate-400">
              <span className="font-bold text-[#101828] dark:text-white">Comprehensive Bio (Full Media Profile)</span>
              <button
                type="button"
                onClick={() => handleCopyText(bios.long, 'long')}
                className="text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedBio === 'long' ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBio === 'long' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
              {bios.long}
            </p>
          </div>
        </div>

        {/* 4. SUGGESTED INTERVIEW QUESTIONS */}
        <div className="bg-white dark:bg-[#0D1527] p-8 sm:p-10 rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-xs">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-blue-900 dark:text-blue-400 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>For Podcast Hosts, Tech Journalists & Moderators</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              Suggested Interview Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#FAFAF7] dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.06] dark:border-white/10 text-xs sm:text-sm text-[#101828] dark:text-slate-200 font-medium flex items-start gap-3"
              >
                <span className="font-mono text-blue-900 dark:text-blue-400 font-bold shrink-0 tabular-nums">
                  0{idx + 1}.
                </span>
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
