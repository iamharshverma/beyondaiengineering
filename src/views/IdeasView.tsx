import React, { useState } from 'react';
import { PageId, Article } from '../types';
import { ARTICLES } from '../data/articlesData';
import { Clock, ArrowRight, BookOpen, Calendar, Search, Loader2 } from 'lucide-react';
import { sendBookInquiryToAuthor } from '../utils/emailService';

interface IdeasViewProps {
  onNavigate: (page: PageId) => void;
  onOpenArticle: (article: Article) => void;
}

export const IdeasView: React.FC<IdeasViewProps> = ({
  onNavigate,
  onOpenArticle,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [emailInput, setEmailInput] = useState('');
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const topics = ['All', 'Career Strategy', 'Systems Thinking', 'Agentic AI', 'Cybersecurity', 'Education'];

  const filteredArticles = selectedTopic === 'All'
    ? ARTICLES
    : ARTICLES.filter((a) => a.topic === selectedTopic);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setEmailSubmitting(true);
    try {
      await sendBookInquiryToAuthor({
        formType: 'Individual Book Inquiry',
        name: 'Technical Notes Subscriber',
        email: emailInput.trim(),
        notesOrMessage: 'Subscribed to receive long-form technical dispatches from Beyond AI Engineering.',
        sourcePage: '/ideas',
      });
      setEmailSubmitted(true);
    } finally {
      setEmailSubmitting(false);
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO */}
      <section className="pt-16 sm:pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-blue-900 dark:text-blue-400 font-semibold block">
            Essays & Architectural Commentary
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#101828] dark:text-white">
            Ideas Beyond the Book
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
            Ongoing essays and technical critiques by Harsh Verma on engineering in the age of AI agents.
          </p>

          {/* Topic Filters */}
          <div className="pt-6 flex flex-wrap justify-center gap-2">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  selectedTopic === t
                    ? 'bg-[#101828] dark:bg-white text-white dark:text-[#070B14] shadow-xs'
                    : 'bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ARTICLES PUBLICATION GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className="bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 hover:border-blue-900/60 dark:hover:border-blue-400/60 hover:-translate-y-1 transition-all duration-300 shadow-2xs flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="font-semibold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/60">
                    {article.topic}
                  </span>
                  <span className="text-[#98A2B3] dark:text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#101828] dark:text-white mb-2 group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors leading-tight">
                  {article.title}
                </h2>

                <p className="font-serif text-sm text-[#475467] dark:text-blue-300/80 italic mb-4 leading-relaxed">
                  {article.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed line-clamp-3 mb-6 font-sans">
                  {article.leadParagraph}
                </p>
              </div>

              <div className="pt-4 border-t border-[#101828]/[0.08] dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#98A2B3] dark:text-slate-500 font-mono">{article.publishDate}</span>
                <span className="font-semibold text-blue-900 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* 3. TASTEFUL DISPATCH CAPTURE */}
        <div className="mt-20 max-w-2xl mx-auto bg-[#FAF9F5] dark:bg-[#0A101F] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-8 sm:p-10 text-center shadow-xs transition-colors">
          <span className="text-xs font-mono uppercase tracking-widest text-[#475467] dark:text-slate-400 block mb-2">
            Direct from Harsh Verma
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white mb-3">
            Get New Ideas from Beyond AI Engineering
          </h3>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
            Occasional long-form technical dispatches on autonomous agent boundaries, multi-agent security, and systems judgment.
          </p>

          {!emailSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                required
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter work email"
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-[#11192E] border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-white rounded-md focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
              />
              <button
                type="submit"
                disabled={emailSubmitting}
                className="px-5 py-2.5 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap shadow-xs disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {emailSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <span>Join Readers</span>
                )}
              </button>
            </form>
          ) : (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs rounded-lg font-medium">
              ✓ Subscribed! You will receive future dispatches directly.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
