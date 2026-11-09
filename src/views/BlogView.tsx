import React, { useState, useMemo } from 'react';
import { PageId, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogData';
import {
  Search,
  ExternalLink,
  BookOpen,
  ArrowRight,
  User,
  Sparkles,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  SlidersHorizontal,
  Star,
  CheckCircle2,
  Bookmark,
  Layers,
  ArrowUpRight,
  Radio,
} from 'lucide-react';

interface BlogViewProps {
  onNavigate: (page: PageId | string) => void;
  onOpenArticleDetail?: (slug: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigate }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'readTime'>('latest');

  const topics = [
    { id: 'all', label: 'All Topics' },
    { id: 'AI Research', label: 'AI Research & Physical AI' },
    { id: 'Engineering', label: 'Engineering & Architecture' },
    { id: 'Cybersecurity', label: 'Cybersecurity & Zero-Trust' },
    { id: 'Interviews', label: 'Interviews & Leadership' },
  ];

  const platforms = [
    { id: 'all', label: 'All Sources' },
    { id: 'Forbes Technology Council', label: 'Forbes' },
    { id: 'HackerNoon', label: 'HackerNoon' },
    { id: 'RSAC', label: 'RSA Conference' },
    { id: 'The AI Journal', label: 'The AI Journal' },
    { id: 'harshverma.me', label: 'Engineering Notes' },
  ];

  const filteredPosts = useMemo(() => {
    let result = BLOG_POSTS.filter((post) => {
      // Topic match
      const matchesTopic =
        selectedTopic === 'all' ||
        post.mainCategory === selectedTopic ||
        post.category === selectedTopic;

      // Platform match
      const matchesPlatform =
        selectedPlatform === 'all' ||
        (post.syndicatedPlatform && post.syndicatedPlatform.includes(selectedPlatform)) ||
        (selectedPlatform === 'Forbes Technology Council' && post.syndicatedPlatform?.includes('Forbes'));

      // Featured match
      const matchesFeatured = !onlyFeatured || post.isFeatured;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        post.title.toLowerCase().includes(query) ||
        post.subtitle.toLowerCase().includes(query) ||
        (post.subCategory && post.subCategory.toLowerCase().includes(query)) ||
        (post.syndicatedPlatform && post.syndicatedPlatform.toLowerCase().includes(query)) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesTopic && matchesPlatform && matchesFeatured && matchesSearch;
    });

    // Sort
    if (sortBy === 'readTime') {
      result.sort((a, b) => {
        const timeA = parseInt(a.readTime) || 0;
        const timeB = parseInt(b.readTime) || 0;
        return timeB - timeA;
      });
    }

    return result;
  }, [selectedTopic, selectedPlatform, onlyFeatured, searchQuery, sortBy]);

  const leadPost = filteredPosts[0];
  const secondaryPosts = filteredPosts.slice(1);

  const handlePostClick = (slug: string) => {
    onNavigate(`/blog/${slug}`);
  };

  return (
    <div className="w-full bg-[#FAFAF7] dark:bg-[#070B14] text-[#101828] dark:text-[#F1F5F9] transition-colors duration-200">
      
      {/* 1. Header & Curatorial Kicker */}
      <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-12 border-b border-[#101828]/[0.08] dark:border-white/10 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Unboxed breadcrumb metadata */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 mb-3">
              <span>Beyond AI Engineering</span>
              <span aria-hidden="true">/</span>
              <span>Engineering Dispatches & Published Articles</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#101828] dark:text-white leading-[1.15] text-balance mb-4">
              Thought Leadership, Forbes Columns & Tech Publications
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl">
              Complete archive of <strong>{BLOG_POSTS.length} published essays, technical research, and field notes</strong> by{' '}
              <strong className="text-slate-900 dark:text-white font-medium">Harsh Verma</strong> across Forbes Technology Council, HackerNoon, RSA Conference, The AI Journal, and personal engineering experiments.
            </p>
          </div>

          {/* Interactive Dual Filter & Search Suite */}
          <div className="mt-8 pt-6 border-t border-[#101828]/[0.06] dark:border-white/10 space-y-4">
            
            {/* Row 1: Main Topics Segmented Control + Search */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
                {topics.map((t) => {
                  const isActive = selectedTopic === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTopic(t.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#101828] text-white dark:bg-white dark:text-[#070B14] shadow-xs'
                          : 'bg-white/80 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-[#101828]/[0.06] dark:border-white/10 hover:border-slate-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Instant Search Bar */}
              <div className="relative w-full md:w-80 shrink-0">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 30+ publications & notes..."
                  aria-label="Search publications and engineering notes"
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-white/5 border border-[#101828]/[0.1] dark:border-white/15 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Row 2: Secondary Source Filters, Featured Toggle & Counter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
                  Source:
                </span>
                {platforms.map((p) => {
                  const isActive = selectedPlatform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlatform(p.id)}
                      className={`px-2.5 py-1 text-[11px] rounded-md transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-blue-900/15 text-blue-900 dark:bg-blue-400/20 dark:text-blue-300 font-semibold border border-blue-900/20 dark:border-blue-400/30'
                          : 'bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>

              {/* Featured toggle & Result Counter */}
              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={() => setOnlyFeatured(!onlyFeatured)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                    onlyFeatured
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Star className={`w-3 h-3 ${onlyFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span>Featured Only</span>
                </button>

                <span className="font-mono text-[11px] text-slate-400">
                  Showing {filteredPosts.length} of {BLOG_POSTS.length}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Main Content Grid: Articles + Sticky Author Profile Sidebar */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT / CENTER: Editorial Post Stream (Col 1-8) */}
            <div className="lg:col-span-8 space-y-8">
              {filteredPosts.length === 0 ? (
                <div className="py-16 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8">
                  <SlidersHorizontal className="w-8 h-8 mx-auto text-slate-400 mb-3" />
                  <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-white mb-1">
                    No Publications Found
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                    No articles matched your active filters or search terms. Try resetting your filters to explore all 30+ publications.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedTopic('all');
                      setSelectedPlatform('all');
                      setOnlyFeatured(false);
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Lead Featured Story (Salience Tier 1) */}
                  {leadPost && (
                    <article className="group relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0B111E] border border-[#101828]/[0.08] dark:border-white/10 shadow-xs hover:shadow-md transition-all duration-300">
                      
                      {/* Thumbnail Media Container if available */}
                      {leadPost.img && (
                        <div className="mb-6 rounded-xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 relative">
                          <img
                            src={leadPost.img}
                            alt={leadPost.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // Fallback container
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          {leadPost.isFeatured && (
                            <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white rounded-md shadow-xs flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 fill-white" />
                              Featured
                            </span>
                          )}
                        </div>
                      )}

                      {/* Unboxed Metadata Line */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3 font-sans">
                        <span className="font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider text-[11px]">
                          {leadPost.subCategory || leadPost.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{leadPost.publishDate}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {leadPost.readTime}
                        </span>
                        {leadPost.syndicatedPlatform && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-slate-700 dark:text-slate-300 font-medium">
                              {leadPost.syndicatedPlatform}
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors leading-tight mb-3">
                        <button
                          onClick={() => handlePostClick(leadPost.slug)}
                          className="text-left cursor-pointer focus:outline-none"
                        >
                          {leadPost.title}
                        </button>
                      </h2>

                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-4">
                        {leadPost.subtitle}
                      </p>

                      {/* Benchmarks preview if present */}
                      {leadPost.benchmarks && leadPost.benchmarks.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-5 p-3.5 rounded-xl bg-blue-50/40 dark:bg-blue-950/30 border border-blue-900/10 dark:border-blue-400/15">
                          {leadPost.benchmarks.map((bm, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400">
                                {bm.label}
                              </span>
                              <span className="text-sm font-mono font-bold text-blue-900 dark:text-blue-300 tabular-nums">
                                {bm.value}
                              </span>
                              {bm.note && (
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                  {bm.note}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tags & Action Buttons */}
                      <div className="pt-4 mt-2 border-t border-[#101828]/[0.06] dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          {leadPost.tags.slice(0, 3).map((tag, tIdx) => (
                            <span key={tIdx} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3">
                          {leadPost.externalUrl && (
                            <a
                              href={leadPost.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 font-medium transition-colors"
                              title="Original Source on external platform"
                            >
                              <span>Original Article</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <button
                            onClick={() => handlePostClick(leadPost.slug)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
                          >
                            <span>Read Full Dispatch</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  )}

                  {/* Secondary Articles Grid (2-Column Cards) */}
                  {secondaryPosts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {secondaryPosts.map((post) => (
                        <article
                          key={post.id}
                          className="group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#0B111E] border border-[#101828]/[0.08] dark:border-white/10 shadow-xs hover:shadow-md hover:border-blue-900/30 dark:hover:border-blue-400/30 transition-all duration-300"
                        >
                          <div>
                            {/* Card Media Preview if available */}
                            {post.img && (
                              <div className="mb-4 rounded-lg overflow-hidden aspect-[16/9] bg-slate-100 dark:bg-slate-900 relative">
                                <img
                                  src={post.img}
                                  alt={post.title}
                                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                {post.isFeatured && (
                                  <span className="absolute top-2 right-2 px-1.5 py-0.5 text-[9px] font-bold uppercase bg-amber-500 text-white rounded shadow-2xs">
                                    Featured
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Unboxed Metadata */}
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2 font-sans">
                              <span className="font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider text-[10px]">
                                {post.subCategory || post.category}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{post.readTime}</span>
                              {post.syndicatedPlatform && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="truncate max-w-[130px] font-medium text-slate-700 dark:text-slate-300">
                                    {post.syndicatedPlatform}
                                  </span>
                                </>
                              )}
                            </div>

                            <h3 className="text-base sm:text-lg font-serif font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2">
                              <button
                                onClick={() => handlePostClick(post.slug)}
                                className="text-left cursor-pointer focus:outline-none"
                              >
                                {post.title}
                              </button>
                            </h3>

                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-3 mb-4">
                              {post.subtitle}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-[#101828]/[0.06] dark:border-white/10 flex items-center justify-between mt-auto">
                            <span className="text-[11px] text-slate-400 font-mono">
                              {post.publishDate}
                            </span>
                            <div className="flex items-center gap-2.5">
                              {post.externalUrl && (
                                <a
                                  href={post.externalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                                  title="Open external publication"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <button
                                onClick={() => handlePostClick(post.slug)}
                                className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer"
                              >
                                <span>Read</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* RIGHT: Sticky Author Profile Sidebar (Col 9-12) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              
              {/* Author Profile Card: Harsh Verma */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0B111E] border border-[#101828]/[0.08] dark:border-white/10 shadow-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-blue-900/20 dark:border-blue-400/30 shrink-0">
                    <img
                      src="/assets/aistudio/harsh_verma_87a0217e.jpg"
                      alt="Harsh Verma portrait"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white">
                        Harsh Verma
                      </h4>
                      <span title="Senior Member & Fellow">
                        <Award className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Author, <em>Beyond AI Engineering</em>
                    </p>
                    <p className="text-[11px] font-mono text-blue-900 dark:text-blue-400 mt-0.5">
                      Principal AI Engineer
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-4">
                  Engineering leader at Palo Alto Networks, Forbes Technology Council member, Fellow of BCS, and IEEE Senior Member writing on agentic security, physical AI, and systems judgment.
                </p>

                {/* Published Publications Counter */}
                <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-900/10 dark:border-blue-400/15 mb-4 flex items-center justify-between">
                  <span className="text-xs font-sans text-slate-600 dark:text-slate-400">
                    Total Published Works
                  </span>
                  <span className="text-sm font-mono font-bold text-blue-900 dark:text-blue-300">
                    {BLOG_POSTS.length} Articles
                  </span>
                </div>

                {/* Verification & Affiliations Strip */}
                <div className="space-y-1.5 py-3 border-y border-[#101828]/[0.06] dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                  <div className="flex items-center justify-between">
                    <span>Engineering Leadership</span>
                    <strong className="text-slate-900 dark:text-white">Palo Alto Networks</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Thought Leadership</span>
                    <strong className="text-slate-900 dark:text-white">Forbes Tech Council</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fellowships & Honors</span>
                    <strong className="text-slate-900 dark:text-white">FBCS · SMIEEE · FRSA</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Ecosystem Mentorship</span>
                    <strong className="text-slate-900 dark:text-white">Berkeley SkyDeck · Techstars</strong>
                  </div>
                </div>

                {/* Author External & Internal Links */}
                <div className="mt-4 space-y-2">
                  <a
                    href="https://www.harshverma.me/page-blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Visit harshverma.me/page-blog</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <button
                    onClick={() => onNavigate('author')}
                    className="w-full py-2 px-3 text-xs font-medium text-blue-900 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 bg-blue-50/60 dark:bg-blue-950/40 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>View Full Author Biography</span>
                    <User className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Connected Book & Operating System CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101828] to-[#0A1930] text-white shadow-md relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 block mb-1">
                    Official Monograph
                  </span>
                  <h4 className="text-base font-serif font-bold mb-2">
                    Beyond AI Engineering
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Move your career from Creator to Architect to Orchestrator with the 312-page operating system.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('book')}
                      className="px-3.5 py-1.5 text-xs font-semibold text-[#101828] bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Explore Book
                    </button>
                    <button
                      onClick={() => onNavigate('cao-framework')}
                      className="px-3 py-1.5 text-xs font-medium text-white/90 hover:text-white border border-white/20 rounded-lg transition-colors cursor-pointer"
                    >
                      C.A.O. Triad
                    </button>
                  </div>
                </div>
              </div>

              {/* Speaking Inquiry Quick Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B111E] border border-[#101828]/[0.08] dark:border-white/10 shadow-xs flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-serif font-bold text-slate-900 dark:text-white">
                    Keynotes & Executive Briefings
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Invite Harsh Verma to speak at your summit
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('speaking')}
                  className="px-3 py-1.5 text-xs font-medium text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer shrink-0"
                >
                  Speaking
                </button>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
