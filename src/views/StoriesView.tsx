import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { READER_STORIES, STORY_ARCHETYPE_DISCLAIMER } from '../data/storiesData';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
import { Send, CheckCircle2, Quote, Loader2, Mail, AlertCircle, Info } from 'lucide-react';
import { sendBookInquiryToAuthor, AUTHOR_EMAIL } from '../utils/emailService';

interface StoriesViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBuyModal: () => void;
  onOpenAssessment: () => void;
}

export const StoriesView: React.FC<StoriesViewProps> = ({
  onNavigate,
  onOpenBuyModal,
  onOpenAssessment,
}) => {
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userStory, setUserStory] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');

  useEffect(() => {
    updatePageSeo({
      title: 'Transformation Archetypes & Reader Stories | Beyond AI Engineering',
      description:
        'Illustrative C.A.O. transition profiles showing how software engineers, graduates, and leaders apply systems judgment, plus a reader story submission channel.',
      canonicalPath: '/stories',
      ogType: 'website',
      ogImage: PAGE_OG_IMAGES.stories,
      breadcrumbs: [{ name: 'Stories', path: '/stories' }],
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await sendBookInquiryToAuthor({
        formType: 'Reader Transformation Story',
        name: userName,
        email: userEmail,
        notesOrMessage: userStory,
        sourcePage: '/stories',
      });
      setMailtoUrl(res.mailtoUrl);
      setStatusMessage(res.message);
      setSubmitStatus(res.success ? 'sent' : 'fallback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
            Field Archetypes & Community Reports
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] dark:text-white text-balance">
            Beyond AI Engineering in Practice
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
            How engineers, students, and technical leaders transition across the Creator–Architect–Orchestrator operating system.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setSubmissionOpen(!submissionOpen)}
              className="px-4 py-2 text-xs font-semibold bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/15 rounded-md text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer shadow-xs"
            >
              {submissionOpen ? 'Close Form' : 'Submit Your Transformation Story'}
            </button>
            <button
              type="button"
              onClick={onOpenAssessment}
              className="px-4 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
            >
              Take C.A.O. Assessment
            </button>
          </div>
        </div>

        {/* Story Submission Drawer */}
        {submissionOpen && (
          <div className="mt-8 max-w-2xl mx-auto bg-white dark:bg-[#0D1527] p-6 sm:p-8 rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-sm">
            {submitStatus === 'idle' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                  Share Your Engineering Story
                </h3>
                <p className="text-xs text-[#475467] dark:text-slate-300">
                  Tell Harsh Verma how the book or C.A.O. framework changed your projects, career altitude, or team outcomes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#101828] dark:text-slate-200 font-semibold mb-1">
                      Your Name & Role
                    </label>
                    <input
                      required
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your name and title"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-blue-900 dark:focus:outline-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#101828] dark:text-slate-200 font-semibold mb-1">
                      Your Email
                    </label>
                    <input
                      required
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-blue-900 dark:focus:outline-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#101828] dark:text-slate-200 font-semibold mb-1">
                    Your Transformation
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={userStory}
                    onChange={(e) => setUserStory(e.target.value)}
                    placeholder="What was your starting point? What changed after reading? What verifiable evidence or systems did you build?"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-blue-900 dark:focus:outline-blue-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending to {AUTHOR_EMAIL}...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Story to {AUTHOR_EMAIL}</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                {submitStatus === 'sent' ? (
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                ) : (
                  <AlertCircle className="w-10 h-10 text-amber-600 dark:text-amber-400 mx-auto" />
                )}
                <h4 className="font-serif text-xl font-bold text-[#101828] dark:text-white">
                  {submitStatus === 'sent'
                    ? `Story Received, ${userName}`
                    : 'Complete Story Delivery via Email App'}
                </h4>
                <p className="text-xs text-[#475467] dark:text-slate-300 max-w-md mx-auto">
                  {statusMessage}
                </p>
                {mailtoUrl && (
                  <div className="pt-1">
                    <a
                      href={mailtoUrl}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        submitStatus === 'fallback'
                          ? 'px-4 py-2 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md'
                          : 'text-blue-900 dark:text-blue-400 underline'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>
                        {submitStatus === 'fallback'
                          ? `Open Pre-Filled Email to ${AUTHOR_EMAIL}`
                          : 'Send backup copy via mail client'}
                      </span>
                    </a>
                  </div>
                )}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="text-xs text-[#475467] dark:text-slate-400 underline cursor-pointer"
                  >
                    Submit another story
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 2. ARCHETYPE DISCLAIMER + CASE STUDY CARDS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="p-5 bg-[#FAF9F5] dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-900 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
            {STORY_ARCHETYPE_DISCLAIMER}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {READER_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-8 hover:border-blue-900 dark:hover:border-blue-400/60 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Transformation Label Header (unboxed typographic label) */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#101828]/[0.08] dark:border-white/10">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-400">
                    {story.transformationLabel}
                  </span>
                  <Quote className="w-4 h-4 text-[#98A2B3] dark:text-slate-500" />
                </div>

                {/* Archetype Info */}
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
                    {story.authorName}
                  </h3>
                  <div className="text-xs text-[#475467] dark:text-slate-300 font-sans">
                    {story.role} · <span className="text-[#101828] dark:text-white font-medium">{story.company}</span>
                  </div>
                </div>

                {/* 4 Structured Dimensions */}
                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-[#FAFAF7] dark:bg-[#11192E] rounded-lg border border-[#101828]/[0.06] dark:border-white/10">
                    <strong className="block text-[10px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 mb-1">
                      Starting Point
                    </strong>
                    <p className="text-[#101828] dark:text-slate-200 leading-relaxed">
                      {story.startingPoint}
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50/50 dark:bg-blue-950/40 rounded-lg border border-blue-100/50 dark:border-blue-800/40">
                    <strong className="block text-[10px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-1">
                      What Changed
                    </strong>
                    <p className="text-[#101828] dark:text-slate-200 leading-relaxed">
                      {story.whatChanged}
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50/50 dark:bg-purple-950/40 rounded-lg border border-purple-100/50 dark:border-purple-800/40">
                    <strong className="block text-[10px] font-mono uppercase tracking-wider text-purple-900 dark:text-purple-300 mb-1">
                      What I Built (Verifiable Artifact)
                    </strong>
                    <p className="text-[#101828] dark:text-slate-200 leading-relaxed">
                      {story.whatIBuilt}
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/40 rounded-lg border border-emerald-100/50 dark:border-emerald-800/40">
                    <strong className="block text-[10px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-1">
                      What Happened (Outcome Pattern)
                    </strong>
                    <p className="text-[#101828] dark:text-slate-200 font-medium leading-relaxed">
                      {story.whatHappened}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#101828]/[0.06] dark:border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onNavigate('book')}
                  className="text-xs font-medium text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white cursor-pointer"
                >
                  Explore the 11 Chapters
                </button>
                <button
                  type="button"
                  onClick={onOpenBuyModal}
                  className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Get the Book →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
