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
  Mic,
  Share2,
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
      <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-10 border-b border-[#101828]/[0.08] dark:border-white/10 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent">
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
        </div>
      </section>

      {/* 2. TOP EXECUTIVE SPOTLIGHT ROW (The 3 sections moved to the top for full-width blog space below) */}
      <section className="pt-8 pb-6 border-b border-[#101828]/[0.06] dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* TOP SECTION 1: Author Profile & Verified Credentials Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0B111E] border border-[#101828]/[0.08] dark:border-white/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-blue-900/20 dark:border-blue-400/30 shrink-0 shadow-2xs">
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
                      <h3 className="text-base font-serif font-bold text-[#101828] dark:text-white">
                        Harsh Verma
                      </h3>
                      <span title="Senior Member & Fellow">
                        <Award className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Author, <em>Beyond AI Engineering</em>
                    </p>
                    <p className="text-[11px] font-mono text-blue-900 dark:text-blue-400 mt-0.5">
                      Principal AI Engineer · Palo Alto Networks
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-3 line-clamp-2">
                  Forbes Tech Council member, Fellow of BCS & RSA, IEEE Senior Member writing on physical AI, local inference, and systems judgment.
                </p>

                {/* Published Count & Honors */}
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-900/10 dark:border-blue-400/15 text-xs mb-3">
                  <span className="text-slate-600 dark:text-slate-400 font-sans">Published Archive</span>
                  <strong className="text-blue-900 dark:text-blue-300 font-mono font-bold">
                    {BLOG_POSTS.length} Works
                  </strong>
                </div>
              </div>

              {/* Author Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#101828]/[0.06] dark:border-white/10 mt-auto">
                <a
                  href="https://www.harshverma.me/page-blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>harshverma.me</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <button
                  onClick={() => onNavigate('author')}
                  className="flex-1 py-1.5 px-2.5 text-xs font-medium text-blue-900 dark:text-blue-300 hover:text-blue-800 bg-blue-50/60 dark:bg-blue-950/40 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Biography</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* TOP SECTION 2: Official Monograph & Operating System Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101828] via-[#0F172A] to-[#1E293B] text-white shadow-xs flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 font-bold">
                    Official Monograph
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    312 Pages
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white mb-1.5">
                  Beyond AI Engineering
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                  The definitive career operating system guiding software engineers from syntactic code generation (Creator) to boundary design (Architect) to agent governance (Orchestrator).
                </p>

                {/* 3 Phases Badges */}
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-300 mb-4">
                  <span className="px-2 py-0.5 rounded bg-white/10">Creator</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">Architect</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">Orchestrator</span>
                </div>
              </div>

              {/* Book Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/10 mt-auto relative z-10">
                <button
                  onClick={() => onNavigate('book')}
                  className="flex-1 py-1.5 px-3 text-xs font-semibold text-[#101828] bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Explore Book
                </button>
                <button
                  onClick={() => onNavigate('cao-framework')}
                  className="flex-1 py-1.5 px-3 text-xs font-medium text-white hover:bg-white/10 border border-white/20 rounded-lg transition-colors cursor-pointer text-center"
                >
                  C.A.O. Triad
                </button>
              </div>
            </div>

            {/* TOP SECTION 3: Keynotes & Executive Briefings Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0B111E] border border-[#101828]/[0.08] dark:border-white/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-blue-900 dark:text-blue-400 font-bold flex items-center gap-1">
                    <Mic className="w-3 h-3" />
                    Keynotes & Briefings
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans">
                    Global Summits
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-[#101828] dark:text-white mb-1.5">
                  Invite Harsh Verma to Speak
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-3">
                  Keynotes, executive roundtables, and engineering all-hands on the future of autonomous agent swarms, physical AI, and the Trust Economy.
                </p>

                {/* Popular Topics */}
                <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-sans mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-blue-600" />
                    <span>The Engineer After Code & Systems Curation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-blue-600" />
                    <span>Autonomous Agents in Enterprise Environments</span>
                  </div>
                </div>
              </div>

              {/* Speaking Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#101828]/[0.06] dark:border-white/10 mt-auto">
                <button
                  onClick={() => onNavigate('speaking')}
                  className="flex-1 py-1.5 px-3 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Speaking Inquiry
                </button>
                <button
                  onClick={() => onNavigate('press')}
                  className="py-1.5 px-3 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Press Kit
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Interactive Filter, Search & Source Toolbar */}
      <section className="py-6 border-b border-[#101828]/[0.06] dark:border-white/10 bg-white/30 dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5">
          
          {/* Row 1: Category Buttons + Live Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Primary Topic Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none no-scrollbar">
              {topics.map((t) => {
                const isActive = selectedTopic === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopic(t.id)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#101828] text-white dark:bg-white dark:text-[#070B14] shadow-xs'
                        : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-[#101828]/[0.06] dark:border-white/10'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Live Search */}
            <div className="relative w-full lg:w-84 shrink-0">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, or venue..."
                aria-label="Search all publications and notes"
                className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-white/5 border border-[#101828]/[0.1] dark:border-white/15 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 transition-all"
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

          {/* Row 2: Secondary Venue Pill Filters + Featured Toggle & Counter */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
                Venue:
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

            {/* Featured toggle & Sort & Counter */}
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
                {filteredPosts.length} of {BLOG_POSTS.length} Dispatches
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FULL-WIDTH BLOG STREAM (Spanning the complete 12 columns) */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 max-w-xl mx-auto">
              <SlidersHorizontal className="w-8 h-8 mx-auto text-slate-400 mb-3" />
              <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-white mb-1">
                No Publications Found
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                No articles matched your active filters. Reset filters to view all 30+ publications.
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
              {/* Full-Width Lead Story Banner (Salience Tier 1) */}
              {leadPost && (
                <article className="group relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-[#0B111E] border border-[#101828]/[0.08] dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Media Thumbnail (Left 5 Cols on desktop) */}
                    {leadPost.img && (
                      <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 relative">
                        <img
                          src={leadPost.img}
                          alt={leadPost.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        {leadPost.isFeatured && (
                          <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white rounded-md shadow-xs flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-white" />
                            Featured
                          </span>
                        )}
                      </div>
                    )}

                    {/* Content Body (Right 7 Cols on desktop) */}
                    <div className={leadPost.img ? 'lg:col-span-7' : 'lg:col-span-12'}>
                      
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
                            <span className="text-slate-700 dark:text-slate-300 font-semibold">
                              {leadPost.syndicatedPlatform}
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors leading-tight mb-3">
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

                      {/* Benchmarks strip if present */}
                      {leadPost.benchmarks && leadPost.benchmarks.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4 p-3 rounded-xl bg-blue-50/40 dark:bg-blue-950/30 border border-blue-900/10 dark:border-blue-400/15">
                          {leadPost.benchmarks.map((bm, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400">
                                {bm.label}
                              </span>
                              <span className="text-sm font-mono font-bold text-blue-900 dark:text-blue-300 tabular-nums">
                                {bm.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Strip */}
                      <div className="pt-4 border-t border-[#101828]/[0.06] dark:border-white/10 flex flex-wrap items-center justify-between gap-4 mt-4">
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
                              title="Original article on external platform"
                            >
                              <span>Original Article</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <button
                            onClick={() => handlePostClick(leadPost.slug)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                          >
                            <span>Read Full Dispatch</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </article>
              )}

              {/* Spacious Full-Width 3-Column Grid for All Remaining Articles */}
              {secondaryPosts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#101828]/[0.06] dark:border-white/10">
                    <h3 className="text-lg font-serif font-bold text-[#101828] dark:text-white">
                      All Curated Publications & Engineering Dispatches
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      {secondaryPosts.length} Articles
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    {secondaryPosts.map((post) => (
                      <article
                        key={post.id}
                        className="group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#0B111E] border border-[#101828]/[0.08] dark:border-white/10 shadow-xs hover:shadow-md hover:border-blue-900/30 dark:hover:border-blue-400/30 transition-all duration-300"
                      >
                        <div>
                          {/* Card Thumbnail if available */}
                          {post.img && (
                            <div className="mb-4 rounded-xl overflow-hidden aspect-[16/9] bg-slate-100 dark:bg-slate-900 relative">
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
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2.5 font-sans">
                            <span className="font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider text-[10px]">
                              {post.subCategory || post.category}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{post.readTime}</span>
                            {post.syndicatedPlatform && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="truncate max-w-[120px] font-medium text-slate-700 dark:text-slate-300">
                                  {post.syndicatedPlatform}
                                </span>
                              </>
                            )}
                          </div>

                          <h4 className="text-base sm:text-lg font-serif font-bold text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2.5">
                            <button
                              onClick={() => handlePostClick(post.slug)}
                              className="text-left cursor-pointer focus:outline-none"
                            >
                              {post.title}
                            </button>
                          </h4>

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
                                title="Open original publication"
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
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </div>
  );
};
