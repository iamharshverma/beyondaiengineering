import React, { useEffect, useState } from 'react';
import { PageId, Article } from '../types';
import { ARTICLES } from '../data/articlesData';
import { updatePageSeo, CANONICAL_ORIGIN, PAGE_OG_IMAGES } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { ChevronRight, Calendar, Clock, Share2, Check, ArrowRight, BookOpen, Quote } from 'lucide-react';

interface ArticleDetailViewProps {
  articleId: string;
  onNavigate: (page: PageId) => void;
  onSelectArticle: (id: string) => void;
  onOpenBuyModal: () => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  articleId,
  onNavigate,
  onSelectArticle,
  onOpenBuyModal,
}) => {
  const article = ARTICLES.find((a) => a.id === articleId) || ARTICLES[0];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    updatePageSeo({
      title: `${article.title} | Beyond AI Engineering by Harsh Verma`,
      description: `${article.subtitle} Read the authoritative essay by Harsh Verma, author of Beyond AI Engineering.`,
      canonicalPath: `/ideas/${article.id}`,
      ogType: 'article',
      ogImage: PAGE_OG_IMAGES.ideas,
      schemaType: 'Article',
      breadcrumbs: [
        { name: 'Ideas Beyond the Book', path: '/ideas' },
        { name: article.title, path: `/ideas/${article.id}` },
      ],
      articleData: {
        headline: article.title,
        description: article.subtitle,
        publishDate: '2026-10-01',
        keyQuote: article.keyQuote,
      },
    });
  }, [article]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`"${article.title}" by Harsh Verma — https://www.beyondaiengineering.com/ideas/${article.id}`);
      setCopied(true);
      trackEvent('manifesto_share', { article: article.id });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="space-y-0 pb-20">
      {/* 1. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => onNavigate('ideas')}
            className="hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer"
          >
            Ideas
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-900 dark:text-blue-400 font-semibold truncate max-w-xs">{article.title}</span>
        </nav>
      </div>

      {/* 2. ARTICLE HEADER */}
      <header className="pt-8 sm:pt-14 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#101828]/[0.08] dark:border-white/10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-[#475467] dark:text-slate-400">
            <span className="px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800/40">
              {article.topic}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishDate}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#101828] dark:text-white leading-tight">
            {article.title}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#475467] dark:text-slate-300 italic leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Byline */}
          <div className="pt-4 flex items-center justify-between border-t border-[#101828]/[0.08] dark:border-white/10">
            <button
              onClick={() => onNavigate('author')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <img
                src="/assets/aistudio/harsh_verma_87a0217e.jpg"
                alt="Harsh Verma, author of Beyond AI Engineering"
                className="w-11 h-11 rounded-full object-cover object-top border border-[#101828]/20 dark:border-white/20"
              />
              <div>
                <div className="font-serif font-bold text-sm text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                  Harsh Verma
                </div>
                <div className="text-xs text-[#475467] dark:text-slate-400 font-sans">
                  Author of Beyond AI Engineering · Principal AI Engineer at Palo Alto Networks
                </div>
              </div>
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-md border border-[#101828]/15 dark:border-white/15 text-xs text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Link' : 'Share Essay'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. ESSAY BODY */}
      <article className="py-14 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-serif">
        {/* Core Axiom Pull-Quote */}
        <div className="p-6 sm:p-8 bg-white dark:bg-[#0D1527] border-l-4 border-blue-900 dark:border-blue-400 rounded-r-2xl border-y border-r border-[#101828]/10 dark:border-white/10 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 block mb-1">
            Core Architectural Invariant
          </span>
          <p className="font-serif text-xl sm:text-2xl font-medium text-[#101828] dark:text-white italic leading-snug">
            "{article.keyQuote}"
          </p>
        </div>

        {/* Lead Paragraph */}
        <p className="text-base sm:text-lg text-[#101828] dark:text-slate-100 leading-relaxed font-serif first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none">
          {article.leadParagraph}
        </p>

        {/* Paragraphs */}
        <div className="space-y-6 text-sm sm:text-base text-[#344054] dark:text-slate-300 leading-relaxed">
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Book Context Box */}
        <div className="mt-12 p-8 bg-[#FAF9F5] dark:bg-[#11192E] rounded-2xl border border-[#101828]/10 dark:border-white/10 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block">
            From the Book Beyond AI Engineering
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#101828] dark:text-white">
            Discover the Complete Operating System
          </h3>
          <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 max-w-lg mx-auto font-sans leading-relaxed">
            This essay is an excerpt of the ideas codified in <em>Beyond AI Engineering: From Creator to Curator</em> by Harsh Verma.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                trackEvent('get_book_click', { source: `article_${article.id}` });
                onOpenBuyModal();
              }}
              className="px-5 py-2.5 bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer font-sans"
            >
              <span>Get the Book (Hardcover & Digital)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('sample')}
              className="px-4 py-2.5 bg-white dark:bg-[#0D1527] border border-[#101828]/20 dark:border-white/15 text-[#101828] dark:text-slate-200 text-xs font-semibold rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer font-sans"
            >
              Read Free Chapter Sample
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <div className="pt-12 border-t border-[#101828]/[0.08] dark:border-white/10 font-sans">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#475467] dark:text-slate-400 mb-4 block">
            More Essays Beyond the Book
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((ra) => (
              <button
                key={ra.id}
                onClick={() => {
                  onSelectArticle(ra.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left p-4 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-xl hover:border-blue-900 dark:hover:border-blue-400 transition-all cursor-pointer shadow-xs group"
              >
                <span className="text-[10px] font-mono uppercase text-blue-900 dark:text-blue-400 font-semibold block mb-1">
                  {ra.topic}
                </span>
                <h4 className="font-serif text-base font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                  {ra.title}
                </h4>
                <p className="text-xs text-[#475467] dark:text-slate-400 line-clamp-2 mt-1 font-serif">
                  {ra.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
