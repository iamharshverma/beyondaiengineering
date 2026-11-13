import React, { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PageId } from '../types';
import { trackEvent } from '../utils/analytics';
import {
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Moon,
  BookOpen,
  User,
  Compass,
  Layers,
  FlaskConical,
  Wrench,
  GraduationCap,
  ScrollText,
  Mic,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Newspaper,
  Users,
  Search,
  Briefcase,
  Mail,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBuyModal: () => void;
  onOpenAssessment: () => void;
}

export const BrandLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const containerSize =
    size === 'sm'
      ? 'w-8 h-8'
      : size === 'lg'
      ? 'w-12 h-12'
      : 'w-9 h-9 sm:w-10 sm:h-10';
  const iconSize =
    size === 'sm'
      ? 'w-5 h-5'
      : size === 'lg'
      ? 'w-8 h-8'
      : 'w-6 h-6';

  return (
    <div
      className={`${containerSize} rounded-xl bg-gradient-to-br from-[#070B14] via-[#0F172A] to-[#1E293B] border border-blue-500/30 dark:border-blue-400/40 shadow-xs flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 36 36" className={iconSize} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="baeBlueGrad" x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" />
            <stop offset="0.5" stopColor="#2563EB" />
            <stop offset="1" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="baeCyanGrad" x1="14" y1="6" x2="28" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="baeAmberGrad" x1="16" y1="15" x2="24" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBBF24" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <rect x="7" y="6" width="4.5" height="24" rx="2.25" fill="url(#baeBlueGrad)" />
        <path
          d="M10 6.5H19.5C23.0899 6.5 26 9.41015 26 13C26 16.5899 23.0899 19.5 19.5 19.5H10V15H19.5C20.6046 15 21.5 14.1046 21.5 13C21.5 11.8954 20.6046 11 19.5 11H10V6.5Z"
          fill="url(#baeCyanGrad)"
        />
        <path
          d="M10 15H21.5C25.366 15 28.5 18.134 28.5 22C28.5 25.866 25.366 29 21.5 29H10V24.5H21.5C22.8807 24.5 24 23.3807 24 22C24 20.6193 22.8807 19.5 21.5 19.5H10V15Z"
          fill="url(#baeBlueGrad)"
        />
        <path
          d="M20.5 15L23 17.5L20.5 20L18 17.5L20.5 15Z"
          fill="url(#baeAmberGrad)"
          stroke="#FEF08A"
          strokeWidth="0.6"
        />
        <circle cx="20.5" cy="17.5" r="0.8" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBuyModal,
  onOpenAssessment,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('beyond-theme', 'dark');
      } catch (e) {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('beyond-theme', 'light');
      } catch (e) {}
    }
  };

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setDrawerOpen(false);
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  const isActivePage = (page: PageId) => {
    if (page === 'insights') {
      return (
        currentPage === 'insights' ||
        currentPage === 'insight-detail' ||
        currentPage === 'blog' ||
        currentPage === 'blog-detail' ||
        currentPage === 'ideas' ||
        currentPage === 'article-detail'
      );
    }
    if (page === 'organizations') {
      return currentPage === 'organizations' || currentPage === 'teams';
    }
    if (page === 'cao-framework') {
      return (
        currentPage === 'cao-framework' ||
        currentPage === 'frameworks' ||
        currentPage === 'framework-detail'
      );
    }
    if (page === 'book') {
      return currentPage === 'book' || currentPage === 'sample' || currentPage === 'buy';
    }
    return currentPage === page;
  };

  const directDesktopLinks: Array<{ label: string; page: PageId }> = [
    { label: 'The Book', page: 'book' },
    { label: 'C.A.O. Framework', page: 'cao-framework' },
    { label: 'Resources', page: 'resources' },
    { label: 'Insights', page: 'insights' },
    { label: 'Author', page: 'author' },
  ];

  const navCategories = useMemo(
    () => [
      {
        title: 'The Book & Core Operating System',
        meta: 'Core Principles',
        items: [
          { label: 'Home', page: 'home' as PageId, icon: Sparkles, desc: 'Beyond AI Engineering: From Creator to Curator' },
          { label: 'The Book', page: 'book' as PageId, icon: BookOpen, desc: '11 chapters, 4 parts & 15 visual blueprints' },
          { label: 'Read a Sample Chapter', page: 'sample' as PageId, icon: BookOpen, desc: 'Excerpt: Escaping the Tyranny of Syntax' },
          { label: 'C.A.O. Framework', page: 'cao-framework' as PageId, icon: Compass, desc: 'Creator → Architect → Orchestrator & 12-Scenario Assessment' },
          { label: '12 Signature Frameworks', page: 'frameworks' as PageId, icon: Layers, desc: 'Trust Economy, How → What, Human API, Ethical Curation' },
          { label: 'The Manifesto', page: 'manifesto' as PageId, icon: ScrollText, desc: '8 founding axioms for engineering in the AI era' },
          { label: 'Get the Book', page: 'buy' as PageId, icon: ArrowUpRight, desc: 'Editions, direct author copies & inquiry options' },
        ],
      },
      {
        title: 'Audience Pathways & Implementation Lab',
        meta: 'Applied Practice',
        items: [
          { label: 'For Engineers', page: 'engineers' as PageId, icon: Briefcase, desc: 'Build your next chapter beyond syntax generation' },
          { label: 'For Students', page: 'students' as PageId, icon: GraduationCap, desc: 'Build 3 projects, fundamentals & early-career roadmap' },
          { label: 'For Organizations', page: 'organizations' as PageId, icon: Users, desc: 'Bulk copies, reading groups, workshops & keynotes' },
          { label: 'Implementation Lab (15 Tools)', page: 'resources' as PageId, icon: FlaskConical, desc: 'Interactive canvases, checklists & 30/60/90 plans' },
          { label: 'Living AI Toolkit', page: 'toolkit' as PageId, icon: Wrench, desc: 'Curated agent, evaluation, observability & security tools' },
        ],
      },
      {
        title: 'Insights, Author & Media',
        meta: 'Editorial & Contact',
        items: [
          { label: 'Insights (Articles & Notes)', page: 'insights' as PageId, icon: Newspaper, desc: 'Forbes columns, MCP benchmarks, essays & engineering notes' },
          { label: 'About Harsh Verma', page: 'author' as PageId, icon: User, desc: 'Principal AI Engineer, Stanford Distinguished Scholar & Fellow' },
          { label: 'Speaking & Keynotes', page: 'speaking' as PageId, icon: Mic, desc: 'Executive briefings, conferences & university keynotes' },
          { label: 'Press & Media Kit', page: 'press' as PageId, icon: Newspaper, desc: 'Approved biographies, media angles & visual assets' },
          { label: 'Reader Transformation Archetypes', page: 'stories' as PageId, icon: ShieldCheck, desc: 'Illustrative transition profiles & story submission' },
          { label: 'Contact Harsh Verma', page: 'contact' as PageId, icon: Mail, desc: 'Direct inquiries routed to harshverma59@gmail.com' },
        ],
      },
    ],
    []
  );

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return navCategories;
    const query = searchQuery.toLowerCase().trim();
    return navCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.label.toLowerCase().includes(query) ||
            item.desc.toLowerCase().includes(query)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery, navCategories]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAFAF7]/95 dark:bg-[#070B14]/95 backdrop-blur-md border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4 sm:gap-6">
          {/* ZONE 1: BRAND WORDMARK */}
          <button
            onClick={() => handleLinkClick('home')}
            className="text-left group rounded-lg shrink-0 cursor-pointer flex items-center gap-2.5 whitespace-nowrap"
            aria-label="Beyond AI Engineering Home"
          >
            <BrandLogo size="md" />
            <span className="hidden sm:inline-block font-serif text-base lg:text-lg font-bold tracking-tight text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
              Beyond AI Engineering
            </span>
          </button>

          {/* ZONE 2: SINGLE-ROW DESKTOP LINKS */}
          <nav
            aria-label="Primary navigation"
            className="hidden xl:flex items-center gap-5 shrink-0"
          >
            {directDesktopLinks.map((item) => {
              const active = isActivePage(item.page);
              return (
                <button
                  key={item.page}
                  onClick={() => handleLinkClick(item.page)}
                  className={`py-1 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 border-b-2 ${
                    active
                      ? 'text-blue-900 dark:text-blue-300 border-blue-900 dark:border-blue-400 font-semibold'
                      : 'text-[#344054] dark:text-slate-300 border-transparent hover:text-[#101828] dark:hover:text-white hover:border-[#101828]/25 dark:hover:border-white/25'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: PRIMARY ACTION & CONTROLS */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              type="button"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                trackEvent('cao_assessment_start', { source: 'navbar' });
                onOpenAssessment();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-900 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/40 border border-blue-900/25 dark:border-blue-400/30 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Take Assessment</span>
            </motion.button>

            <button
              onClick={onOpenBuyModal}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#101828] dark:bg-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer shrink-0"
            >
              <span>Get the Book</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-md text-[#475467] dark:text-amber-300 hover:text-[#101828] dark:hover:text-amber-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setDrawerOpen(true)}
              className="px-2.5 py-2 text-xs font-semibold text-[#101828] dark:text-white border border-[#101828]/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
              aria-label="Open full site directory"
            >
              <Menu className="w-4 h-4 text-blue-900 dark:text-blue-400 shrink-0" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* SLIDE-OVER NAVIGATION DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-xs"
            aria-hidden="true"
          />

          <aside
            aria-label="Site directory drawer"
            className="relative w-full max-w-md sm:max-w-lg bg-[#FAFAF7] dark:bg-[#070B14] border-l border-[#101828]/10 dark:border-white/10 shadow-2xl flex flex-col h-full z-10 overflow-hidden"
          >
            <div className="p-4 sm:p-5 border-b border-[#101828]/10 dark:border-white/10 flex items-center justify-between shrink-0 bg-white/90 dark:bg-[#0D1527]/90">
              <div className="flex items-center gap-2.5 min-w-0">
                <BrandLogo size="sm" />
                <div className="font-serif text-base font-bold text-[#101828] dark:text-white truncate">
                  Beyond AI Engineering
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-2 rounded-md text-[#475467] dark:text-amber-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-md text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="px-4 sm:px-5 pt-3 pb-2.5 shrink-0 bg-white/50 dark:bg-[#070B14] border-b border-[#101828]/5 dark:border-white/5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search pages, frameworks, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-8 py-2 text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-[#101828]/10 dark:border-white/10 rounded-md text-[#101828] dark:text-white placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 space-y-6">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12 text-[#475467] dark:text-slate-400 text-xs">
                  No matching pages found for "{searchQuery}".
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div key={category.title} className="space-y-2">
                    <div className="flex items-center justify-between px-1 text-xs font-mono text-[#475467] dark:text-slate-400">
                      <span className="font-semibold">{category.title}</span>
                      <span>{category.meta}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {category.items.map((item) => {
                        const Icon = item.icon;
                        const active = isActivePage(item.page);
                        return (
                          <button
                            key={item.page}
                            onClick={() => handleLinkClick(item.page)}
                            className={`w-full text-left p-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between group ${
                              active
                                ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-950 dark:text-blue-200'
                                : 'hover:bg-white dark:hover:bg-[#0D1527] border border-transparent hover:border-[#101828]/10 dark:hover:border-white/10 text-[#344054] dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                                  active
                                    ? 'bg-blue-900 text-white dark:bg-blue-400 dark:text-[#070B14]'
                                    : 'bg-[#FAFAF7] dark:bg-[#131D33] text-[#475467] dark:text-slate-300'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs sm:text-sm font-semibold truncate text-[#101828] dark:text-white">
                                  {item.label}
                                </div>
                                <div className="text-[11px] text-[#475467] dark:text-slate-400 truncate">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-blue-800 dark:group-hover:text-blue-300" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 sm:p-5 border-t border-[#101828]/10 dark:border-white/10 bg-white/95 dark:bg-[#0D1527]/95 space-y-2 shrink-0">
              <motion.button
                type="button"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenAssessment();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-md border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                <span>Take 12-Scenario C.A.O. Assessment</span>
              </motion.button>

              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenBuyModal();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-md bg-[#101828] dark:bg-white text-white dark:text-[#070B14] hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Get the Book (Editions & Inquiries)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
