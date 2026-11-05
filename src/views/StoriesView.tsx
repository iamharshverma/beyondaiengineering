import React, { useState } from 'react';
import { PageId } from '../types';
import { READER_STORIES } from '../data/storiesData';
import { ArrowRight, Send, CheckCircle2, Sparkles, Quote } from 'lucide-react';

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
  const [userStory, setUserStory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 font-semibold block">
            Impact in the Field
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828]">
            Beyond AI Engineering in Practice
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#475467] italic leading-relaxed">
            Real transformations from working engineers, students, and technical leaders applying the C.A.O. operating system.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => setSubmissionOpen(!submissionOpen)}
              className="px-4 py-2 text-xs font-semibold bg-white border border-[#101828]/20 rounded-md text-[#101828] hover:bg-black/5 transition-colors cursor-pointer"
            >
              {submissionOpen ? 'Close Form' : 'Submit Your Transformation Story'}
            </button>
            <button
              onClick={onOpenAssessment}
              className="px-4 py-2 text-xs font-semibold bg-[#101828] text-white rounded-md hover:bg-blue-950 transition-colors cursor-pointer"
            >
              Take Assessment
            </button>
          </div>
        </div>

        {/* Story Submission Drawer */}
        {submissionOpen && (
          <div className="mt-8 max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-[#101828]/10 shadow-sm animate-in fade-in duration-200">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#101828]">
                  Share Your Engineering Story
                </h3>
                <p className="text-xs text-[#475467]">
                  Tell us how the book or C.A.O. framework changed your projects, career altitude, or team outcomes.
                </p>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#101828] font-semibold mb-1">
                    Your Name & Role
                  </label>
                  <input
                    required
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Maya Lin, Senior Distributed Systems Engineer"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#101828]/20 bg-[#FAFAF7] focus:outline-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#101828] font-semibold mb-1">
                    Your Transformation
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={userStory}
                    onChange={(e) => setUserStory(e.target.value)}
                    placeholder="What was your starting point? What changed after reading? What verifiable evidence or systems did you build?"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-[#101828]/20 bg-[#FAFAF7] focus:outline-blue-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#101828] text-white rounded-md hover:bg-blue-950 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Story for Publication</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#101828]">Thank You, {userName}</h4>
                <p className="text-xs text-[#475467]">
                  Your story has been submitted for editorial curation on the reader showcase.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 2. CASE STUDY CARDS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {READER_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white border border-[#101828]/10 rounded-2xl p-8 hover:border-blue-900 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Transformation Label Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#101828]/[0.08]">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded">
                    {story.transformationLabel}
                  </span>
                  <Quote className="w-4 h-4 text-[#98A2B3]" />
                </div>

                {/* Author Info */}
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#101828]">
                    {story.authorName}
                  </h3>
                  <div className="text-xs text-[#475467] font-sans">
                    {story.role} · <span className="text-[#101828]">{story.company}</span>
                  </div>
                </div>

                {/* 4 Structured Dimensions */}
                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-[#FAFAF7] rounded-lg border border-[#101828]/[0.06]">
                    <strong className="block text-[10px] font-mono uppercase tracking-wider text-[#475467] mb-1">
                      Starting Point
                    </strong>
                    <p className="text-[#101828] leading-relaxed">
                      {story.startingPoint}
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
                    <strong className="block text-[10px] font-mono uppercase tracking-wider text-blue-900 mb-1">
                      What Changed
                    </strong>
                    <p className="text-[#101828] leading-relaxed">
                      {story.whatChanged}
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100/50">
                    <strong className="block text-[10px] font-mono uppercase tracking-wider text-purple-900 mb-1">
                      What I Built (Verifiable Artifact)
                    </strong>
                    <p className="text-[#101828] leading-relaxed">
                      {story.whatIBuilt}
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100/50">
                    <strong className="block text-[10px] font-mono uppercase tracking-wider text-emerald-900 mb-1">
                      What Happened (Career Outcome)
                    </strong>
                    <p className="text-[#101828] font-medium leading-relaxed">
                      {story.whatHappened}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#101828]/[0.06] text-right">
                <button
                  onClick={onOpenBuyModal}
                  className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
                >
                  Start Your Journey with the Book →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
