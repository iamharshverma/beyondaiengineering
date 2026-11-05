import React, { useState } from 'react';
import { PageId } from '../types';
import { Download, Copy, Check, Mail, FileText, Image as ImageIcon, HelpCircle } from 'lucide-react';
import { BOOK_DETAILS } from '../data/bookData';

interface PressViewProps {
  onNavigate: (page: PageId) => void;
}

export const PressView: React.FC<PressViewProps> = ({ onNavigate }) => {
  const [copiedBio, setCopiedBio] = useState<string | null>(null);

  const bios = {
    short: 'Harsh Verma is a Principal AI Engineer, Author, and Fellow of BCS whose work focuses on artificial intelligence, cybersecurity, autonomous agents, and enterprise systems. He is the author of Beyond AI Engineering: From Creator to Curator.',
    medium: 'Harsh Verma is a Principal AI Engineer and technology leader with over a decade of experience across artificial intelligence, cybersecurity, and distributed architectures. A Fellow of BCS and Senior Member of IEEE, Harsh advises enterprise organizations on autonomous agent governance and engineering leadership. He is the author of Beyond AI Engineering: From Creator to Curator.',
    long: 'Harsh Verma is a Principal AI Engineer, Author, and Cybersecurity Leader whose work sits at the intersection of artificial intelligence, autonomous systems, and enterprise resilience. With over twelve years of engineering leadership, Harsh works on mission-critical technologies designed for complex environments where security, scalability, and trust are paramount. He is a Fellow of BCS (The Chartered Institute for IT), a Senior Member of IEEE, a member of the Forbes Technology Council, a Google Developer Expert in Cloud AI, and an advisor to Berkeley SkyDeck startups. His book Beyond AI Engineering establishes the Creator-Architect-Orchestrator operating system for technical talent in the agentic era.',
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
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 font-semibold block">
            Media, Press & Reviewers
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828]">
            Press & Media Kit
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#475467] italic leading-relaxed">
            Resources for journalists, podcast hosts, conference organizers, and reviewers.
          </p>
          <p className="text-xs sm:text-sm text-[#475467]">
            Media Inquiries: <a href="mailto:connect@beyondaiengineering.com" className="font-semibold text-blue-900 underline">connect@beyondaiengineering.com</a>
          </p>
        </div>
      </section>

      {/* 2. MEDIA DOWNLOADS GRID */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-[#101828]">
            Downloadable Press Assets
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          
          {/* Asset 1: High-Res Book Cover */}
          <div className="bg-white p-6 rounded-xl border border-[#101828]/10 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center mb-3">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#101828] mb-1">
                Book Cover Artwork
              </h3>
              <p className="text-xs text-[#475467] mb-4">
                300 DPI high-resolution hardcover 3D mockup & front cover graphic.
              </p>
            </div>
            <a
              href="/src/assets/images/book_hardcover_mockup_1793842329740.jpg"
              download="Beyond-AI-Engineering-Cover.jpg"
              className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Cover Image</span>
            </a>
          </div>

          {/* Asset 2: Author Headshot */}
          <div className="bg-white p-6 rounded-xl border border-[#101828]/10 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-900 flex items-center justify-center mb-3">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#101828] mb-1">
                Author Headshots
              </h3>
              <p className="text-xs text-[#475467] mb-4">
                Official high-resolution photography of Harsh Verma (Principal AI Engineer at Palo Alto Networks, Fellow of BCS/RSA).
              </p>
            </div>
            <a
              href="/assets/aistudio/harsh_verma_87a0217e.jpg"
              download="Harsh-Verma-Author-Portrait.jpg"
              className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Author Photo</span>
            </a>
          </div>

          {/* Asset 3: Press Release */}
          <div className="bg-white p-6 rounded-xl border border-[#101828]/10 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#101828] mb-1">
                Official Press Release
              </h3>
              <p className="text-xs text-[#475467] mb-4">
                Standard publication announcement, key themes, publisher notes, and author statement.
              </p>
            </div>
            <button
              onClick={() => handleDownloadAsset('Beyond-AI-Engineering-Press-Release.txt', `PRESS RELEASE: BEYOND AI ENGINEERING\nAuthor: Harsh Verma\n\nBeyond AI Engineering establishes a groundbreaking operating system for technical talent navigating the generative AI age...`)}
              className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1.5 cursor-pointer text-left"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Press Release (TXT)</span>
            </button>
          </div>

        </div>

        {/* 3. AUTHOR BIOS */}
        <div className="bg-[#FAF9F5] p-8 sm:p-10 rounded-2xl border border-[#101828]/10 mb-16 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#101828]">
              Standard Author Bios
            </h3>
            <span className="text-xs font-mono text-[#475467]">Choose Length</span>
          </div>

          {/* 50-word Bio */}
          <div className="bg-white p-5 rounded-xl border border-[#101828]/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#475467]">
              <span className="font-bold text-[#101828]">50-Word Bio (Brief)</span>
              <button
                onClick={() => handleCopyText(bios.short, '50-word')}
                className="text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedBio === '50-word' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBio === '50-word' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
              {bios.short}
            </p>
          </div>

          {/* 100-word Bio */}
          <div className="bg-white p-5 rounded-xl border border-[#101828]/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#475467]">
              <span className="font-bold text-[#101828]">100-Word Bio (Conference Programs)</span>
              <button
                onClick={() => handleCopyText(bios.medium, '100-word')}
                className="text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedBio === '100-word' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBio === '100-word' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
              {bios.medium}
            </p>
          </div>

          {/* Long Bio */}
          <div className="bg-white p-5 rounded-xl border border-[#101828]/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#475467]">
              <span className="font-bold text-[#101828]">Comprehensive Bio (Full Media Profile)</span>
              <button
                onClick={() => handleCopyText(bios.long, 'long')}
                className="text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedBio === 'long' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBio === 'long' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
              {bios.long}
            </p>
          </div>
        </div>

        {/* 4. SUGGESTED INTERVIEW QUESTIONS */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#101828]/10">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-blue-900 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>For Podcast Hosts, Tech Journalists & Moderators</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828]">
              Suggested Interview Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#FAFAF7] rounded-lg border border-[#101828]/[0.06] text-xs sm:text-sm text-[#101828] font-medium flex items-start gap-3"
              >
                <span className="font-mono text-blue-900 font-bold shrink-0">0{idx + 1}.</span>
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};
