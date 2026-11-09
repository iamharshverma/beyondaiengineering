import React, { useState, useEffect } from 'react';
import { PageId, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogData';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Share2,
  Check,
  BookOpen,
  Award,
  ChevronRight,
  User,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface BlogDetailViewProps {
  slug: string;
  onNavigate: (page: PageId | string) => void;
  onSelectPost?: (slug: string) => void;
  onOpenBuyModal?: () => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  slug,
  onNavigate,
  onOpenBuyModal,
}) => {
  const [copied, setCopied] = useState(false);

  // Find post or fallback to first post
  const post = BLOG_POSTS.find((p) => p.slug === slug || p.id === slug) || BLOG_POSTS[0];

  // Find next and previous posts
  const currentIndex = BLOG_POSTS.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="w-full bg-[#FAFAF7] dark:bg-[#070B14] text-[#101828] dark:text-[#F1F5F9] transition-colors duration-200">
      
      {/* 1. Article Editorial Header */}
      <header className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 border-b border-[#101828]/[0.08] dark:border-white/10 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs & Back link */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={() => onNavigate('/blog')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to All Dispatches</span>
            </button>

            {/* Syndication Platform Attribution */}
            {post.syndicatedPlatform && (
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span>Published via</span>
                <strong className="text-slate-800 dark:text-slate-200 font-medium">
                  {post.syndicatedPlatform}
                </strong>
              </span>
            )}
          </div>

          {/* Unboxed Metadata Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4 font-sans">
            <span className="font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider text-[11px]">
              {post.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {post.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">By Harsh Verma</span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#101828] dark:text-white leading-[1.18] text-balance mb-5">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-light max-w-3xl">
            {post.subtitle}
          </p>

          {/* Utility Action Bar */}
          <div className="mt-8 pt-6 border-t border-[#101828]/[0.08] dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Author Quick Tag */}
            <button
              onClick={() => onNavigate('author')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <img
                src="/assets/aistudio/harsh_verma_87a0217e.jpg"
                alt="Harsh Verma"
                className="w-8 h-8 rounded-full object-cover border border-blue-900/20"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors block">
                  Harsh Verma
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Principal AI Engineer · Fellow BCS
                </span>
              </div>
            </button>

            {/* Actions: Copy Link & External Source */}
            <div className="flex items-center gap-2">
              {post.externalUrl && (
                <a
                  href={post.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 rounded-lg flex items-center gap-1.5 transition-colors"
                  title="View on harshverma.me"
                >
                  <span>harshverma.me</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Article Body (Constrained Reading Column 65-75ch) */}
      <div className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Key Pull Quote */}
          {post.keyQuote && (
            <div className="my-8 py-5 px-6 rounded-2xl bg-white dark:bg-[#0B111E] border-y border-[#101828]/[0.08] dark:border-white/10 shadow-xs">
              <p className="text-base sm:text-lg italic font-serif text-slate-800 dark:text-slate-200 leading-relaxed text-center">
                “{post.keyQuote}”
              </p>
            </div>
          )}

          {/* Lead Paragraph with Elegant Drop Cap */}
          <div className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-sans mb-6">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-blue-900 dark:first-letter:text-blue-400 leading-relaxed">
              {post.leadParagraph}
            </p>
          </div>

          {/* Formatted Content Paragraphs */}
          <div className="space-y-6 text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Benchmark Table (Tabular Data) if available */}
          {post.benchmarks && post.benchmarks.length > 0 && (
            <div className="my-10 p-6 rounded-2xl bg-white dark:bg-[#0B111E] border border-[#101828]/[0.08] dark:border-white/10 shadow-xs">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                <span>Production Benchmark Metrics</span>
              </h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {post.benchmarks.map((bm, bIdx) => (
                  <div key={bIdx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <span className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
                      {bm.label}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-bold text-blue-900 dark:text-blue-400 tabular-nums">
                        {bm.value}
                      </span>
                      {bm.note && (
                        <span className="text-[11px] text-slate-400 font-sans hidden sm:inline">
                          ({bm.note})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-[#101828]/[0.08] dark:border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">Topics:</span>
            {post.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Book Framework Connection */}
          {post.relatedFrameworkId && (
            <div className="my-10 p-6 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/20 border border-blue-900/15 dark:border-blue-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold">
                  Connected Framework
                </span>
                <h4 className="text-base font-serif font-bold text-slate-900 dark:text-white">
                  {post.relatedFrameworkId === 'cao-framework'
                    ? 'The C.A.O. Framework (Creator · Architect · Orchestrator)'
                    : post.relatedFrameworkId === 'trust-economy'
                    ? 'The Trust Economy & Verified Human Judgment'
                    : 'Agentic Diplomacy & Authority Boundaries'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Deepen your understanding with the companion chapter and practical transition rubrics.
                </p>
              </div>

              <button
                onClick={() => {
                  if (post.relatedFrameworkId === 'cao-framework') {
                    onNavigate('/cao-framework');
                  } else {
                    onNavigate('/frameworks/' + post.relatedFrameworkId);
                  }
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
              >
                Explore Framework
              </button>
            </div>
          )}

          {/* Author Bio Footer Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0B111E] border border-[#101828]/[0.08] dark:border-white/10 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src="/assets/aistudio/harsh_verma_87a0217e.jpg"
                alt="Harsh Verma"
                className="w-16 h-16 rounded-2xl object-cover border border-blue-900/20 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
                    Written by Harsh Verma
                  </h4>
                  <Award className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Principal AI Engineer at Palo Alto Networks, Forbes Technology Council member, and author of <em>Beyond AI Engineering</em>. Writing on production AI architectures, local models, and engineering authority.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate('author')}
                    className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    View Author Profile →
                  </button>
                  <a
                    href="https://www.harshverma.me/page-blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                  >
                    <span>harshverma.me/page-blog</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Next / Previous Navigation */}
          <div className="mt-12 pt-8 border-t border-[#101828]/[0.08] dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <button
                onClick={() => onNavigate(`/blog/${prevPost.slug}`)}
                className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:border-blue-900/40 text-left transition-colors cursor-pointer group"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  ← Previous Dispatch
                </span>
                <span className="text-xs font-serif font-bold text-slate-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 line-clamp-2">
                  {prevPost.title}
                </span>
              </button>
            ) : <div />}

            {nextPost ? (
              <button
                onClick={() => onNavigate(`/blog/${nextPost.slug}`)}
                className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:border-blue-900/40 text-right transition-colors cursor-pointer group"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Next Dispatch →
                </span>
                <span className="text-xs font-serif font-bold text-slate-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 line-clamp-2">
                  {nextPost.title}
                </span>
              </button>
            ) : <div />}
          </div>

        </div>
      </div>
    </article>
  );
};
