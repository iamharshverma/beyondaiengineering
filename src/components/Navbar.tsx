import React, { useState, useEffect, useMemo } from 'react';
import { PageId } from '../types';
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
  Lightbulb,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Newspaper,
  Users,
  Search,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBuyModal: () => void;
  onOpenAssessment: () => void;
}

// Brand Logo: The 3-Facet Curator Prism Emblem (Creator → Architect → Orchestrator)
export const BrandLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const containerSize =
    size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8 sm:w-9 sm:h-9';
  const iconSize =
    size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`${containerSize} rounded-xl bg-gradient-to-br from-[#101828] via-[#1E293B] to-blue-950 dark:from-[#0E1726] dark:via-[#1E293B] dark:to-blue-900 border border-[#101828]/15 dark:border-white/15 shadow-2xs group-hover:shadow-md group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50 flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className={`${iconSize} drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Facet: Orchestrator / Horizon */}
        <path
          d="M12 2.5L20.5 7.4L12 12.3L3.5 7.4L12 2.5Z"
          className="fill-blue-400/90 dark:fill-blue-300 stroke-blue-200/50"
          strokeWidth="0.5"
        />
        {/* Left Facet: Creator / Foundation */}
        <path
          d="M3.5 7.4L12 12.3V21.5L3.5 16.6V7.4Z"
          className="fill-blue-700 dark:fill-blue-600 stroke-blue-400/30"
          strokeWidth="0.5"
        />
        {/* Right Facet: Architect / Systems */}
        <path
          d="M12 12.3L20.5 7.4V16.6L12 21.5V12.3Z"
          className="fill-blue-600 dark:fill-blue-500 stroke-blue-300/30"
          strokeWidth="0.5"
        />
        {/* Center Curator Nexus: Golden Lens & Crosshair of High Judgment */}
        <circle cx="12" cy="12.3" r="1.8" className="fill-amber-400 dark:fill-amber-300" />
        <circle cx="12" cy="12.3" r="3.2" className="stroke-white/40" strokeWidth="0.6" strokeDasharray="1.2 1.2" />
        <path
          d="M12 9.4V15.2M9.1 12.3H14.9"
          stroke="white"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
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

  // Initialize and sync dark mode state
  useEffect(() => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    setIsDark(isCurrentlyDark);
  }, []);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  // Lock body scroll when drawer is open
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct desktop navigation links requested: The Book, C.A.O. Framework, Manifesto, Speaking, Author
  const directDesktopLinks = [
    { label: 'The Book', page: 'book' as PageId },
    { label: 'C.A.O. Framework', page: 'cao-framework' as PageId },
    { label: 'Manifesto', page: 'manifesto' as PageId },
    { label: 'Speaking', page: 'speaking' as PageId },
    { label: 'Author', page: 'author' as PageId },
  ];

  // Comprehensive categorized navigation links for the drawer
  const navCategories = [
    {
      title: 'The Operating System',
      badge: 'Core Principles',
      items: [
        { label: 'The Book', page: 'book' as PageId, icon: BookOpen, desc: 'Overview, chapter blueprints & table of contents' },
        { label: 'C.A.O. Framework', page: 'cao-framework' as PageId, icon: Compass, desc: 'Creator → Architect → Orchestrator mental model' },
        { label: 'The Manifesto', page: 'manifesto' as PageId, icon: ScrollText, desc: '10 founding theses for engineering in the agentic era' },
        { label: 'Read Sample Chapter', page: 'sample' as PageId, icon: Sparkles, desc: 'Excerpt: The Engineer After Code' },
        { label: 'Buy the Book', page: 'buy' as PageId, icon: ArrowUpRight, desc: 'Hardcover, paperback & digital retailer editions' },
      ],
    },
    {
      title: 'Frameworks & Interactive Lab',
      badge: 'Applied Practice',
      items: [
        { label: '10 Proprietary Frameworks', page: 'frameworks' as PageId, icon: Layers, desc: 'Trust Economy, How to What, Agentic Diplomacy' },
        { label: 'Lab & Canvases', page: 'resources' as PageId, icon: FlaskConical, desc: 'Worksheets, audit rubrics & transition planners' },
        { label: 'Living AI Toolkit', page: 'toolkit' as PageId, icon: Wrench, desc: 'Curated agent tools, eval suites & memory fabrics' },
        { label: 'Students & New Grads', page: 'students' as PageId, icon: GraduationCap, desc: 'Early career playbook for the agentic age' },
      ],
    },
    {
      title: 'Speaking, Authority & Community',
      badge: 'Perspectives',
      items: [
        { label: 'Keynotes & Speaking', page: 'speaking' as PageId, icon: Mic, desc: 'Executive briefings & conference keynotes by Harsh Verma' },
        { label: 'Author Biography', page: 'author' as PageId, icon: User, desc: 'Harsh Verma, Principal AI Engineer & Fellow' },
        { label: 'Ideas & Research', page: 'ideas' as PageId, icon: Lightbulb, desc: 'Deep-dive technical essays and industry commentary' },
        { label: 'Reader Stories', page: 'stories' as PageId, icon: ShieldCheck, desc: 'Field reports and production transformation case studies' },
        { label: 'Press Kit & Media', page: 'press' as PageId, icon: Newspaper, desc: 'High-res photos, bios & media contacts' },
        { label: 'Teams & Bulk Licensing', page: 'teams' as PageId, icon: Users, desc: 'Enterprise teams & university syllabi discounts' },
      ],
    },
  ];

  // Search filter for drawer items
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
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-3 w-full">
          
          {/* ZONE 1: BRAND LOGO + COMPLETE TITLE + TAGLINE */}
          <button
            onClick={() => handleLinkClick('home')}
            className="text-left group focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-lg shrink min-w-0 cursor-pointer pr-1 flex items-center gap-2 sm:gap-2.5"
            title="Beyond AI Engineering - From Being Creator to Curator !!"
          >
            <BrandLogo size="md" />

            <div className="min-w-0">
              <span className="font-serif text-xs xs:text-sm sm:text-base lg:text-lg font-bold tracking-tight text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap block truncate">
                BEYOND AI ENGINEERING
              </span>
              <span className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-wider uppercase text-[#475467] dark:text-slate-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors whitespace-nowrap block -mt-0.5 font-sans truncate font-medium">
                <span className="font-semibold text-blue-900 dark:text-blue-400">From Being Creator to Curator !!</span>
              </span>
            </div>
          </button>

          {/* ZONE 2: DIRECT DESKTOP NAVIGATION (Visible on Desktop lg+, Clean & Authoritative) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            {directDesktopLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleLinkClick(item.page)}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-blue-950 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/70 font-semibold border border-blue-200 dark:border-blue-800/70 shadow-2xs'
                      : 'text-[#344054] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Desktop "More" Trigger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="px-2 xl:px-2.5 py-1.5 rounded-md text-xs xl:text-sm font-medium text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1 border border-transparent"
              title="Explore all frameworks, lab resources, and research"
            >
              <span>More</span>
              <Menu className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
            </button>
          </nav>

          {/* ZONE 3: ACTIONS & MOBILE NAV (Always Visible, Zero-Overflow Guaranteed) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* 1. Take Assessment Button (Always Visible) */}
            <button
              onClick={onOpenAssessment}
              className="px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-[#101828] dark:text-slate-200 hover:text-blue-900 dark:hover:text-blue-400 bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 border border-[#101828]/15 dark:border-white/15 rounded-md transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1 shadow-2xs"
              title="Take C.A.O. Self-Assessment"
            >
              <Sparkles className="w-3 h-3 text-blue-800 dark:text-blue-400 shrink-0" />
              <span className="hidden sm:inline">Take Assessment</span>
              <span className="sm:hidden">Assessment</span>
            </button>

            {/* 2. Get The Book Button (Always Visible) */}
            <button
              onClick={onOpenBuyModal}
              className="px-2 xs:px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wide text-white bg-[#101828] dark:bg-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-all shadow-xs hover:shadow flex items-center gap-1 whitespace-nowrap cursor-pointer shrink-0"
              title="Get The Book"
            >
              <span>Get Book</span>
              <ArrowUpRight className="w-3 h-3 shrink-0" />
            </button>

            {/* 3. Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light edition' : 'Switch to luxury dark edition'}
              title={isDark ? 'Switch to light edition' : 'Switch to luxury dark edition'}
              className="p-1.5 sm:p-2 rounded-md text-[#475467] dark:text-amber-300 hover:text-[#101828] dark:hover:text-amber-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors border border-transparent dark:border-amber-400/20 cursor-pointer shrink-0"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
              )}
            </button>

            {/* 4. Collapsible Nav Toggle ("Menu" / Hamburger Icon - Highly Visible & Never Cut Off) */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1.5 sm:px-2.5 sm:py-2 text-[#101828] dark:text-white bg-blue-50/90 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-md transition-all cursor-pointer flex items-center gap-1 border border-blue-200/90 dark:border-blue-800/80 shrink-0 shadow-2xs"
              aria-label="Open complete navigation menu"
              title="Explore all chapters, frameworks & resources"
            >
              <Menu className="w-4 h-4 text-blue-900 dark:text-blue-300 shrink-0" />
              <span className="hidden sm:inline text-xs font-semibold text-blue-950 dark:text-blue-200">
                Menu
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* CREATIVE COLLAPSIBLE SLIDE-OVER SIDEBAR */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop with subtle blur */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Slide-Over Panel */}
          <aside className="relative w-full max-w-md sm:max-w-lg bg-[#FAFAF7] dark:bg-[#070B14] border-l border-[#101828]/10 dark:border-white/10 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300 overflow-hidden">
            
            {/* Sidebar Header */}
            <div className="p-4 sm:p-5 border-b border-[#101828]/10 dark:border-white/10 flex items-center justify-between shrink-0 bg-white/80 dark:bg-[#0D1527]/80 backdrop-blur-md">
              <div className="flex items-center gap-2.5 min-w-0">
                <BrandLogo size="sm" />
                <div className="space-y-0.5 min-w-0">
                  <div className="font-serif text-sm sm:text-base font-bold text-[#101828] dark:text-white truncate">
                    BEYOND AI ENGINEERING
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-400 font-bold block truncate">
                    From Being Creator to Curator !!
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-1.5 sm:p-2 rounded-lg text-[#475467] dark:text-amber-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 sm:p-2 rounded-lg text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Filter Search Bar */}
            <div className="px-4 sm:px-5 pt-3 pb-2 shrink-0 bg-white/40 dark:bg-[#070B14]/40 border-b border-[#101828]/5 dark:border-white/5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter frameworks, chapters, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-[#101828]/10 dark:border-white/10 rounded-lg text-[#101828] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar Content (Scrollable Categories) */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 space-y-6">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12 text-[#475467] dark:text-slate-400 text-xs">
                  No matching links found for "{searchQuery}".
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div key={category.title} className="space-y-2">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-[10px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 font-bold">
                        {category.title}
                      </h3>
                      <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                        {category.badge}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-1">
                      {category.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.page;
                        return (
                          <button
                            key={item.page}
                            onClick={() => handleLinkClick(item.page)}
                            className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between group ${
                              isActive
                                ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-950 dark:text-blue-200 shadow-2xs'
                                : 'hover:bg-white dark:hover:bg-[#0D1527] border border-transparent hover:border-[#101828]/10 dark:hover:border-white/10 text-[#344054] dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isActive
                                  ? 'bg-blue-900 text-white dark:bg-blue-400 dark:text-[#070B14]'
                                  : 'bg-[#FAFAF7] dark:bg-[#131D33] text-[#475467] dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/40 group-hover:text-blue-900 dark:group-hover:text-blue-300'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                                  isActive
                                    ? 'text-blue-900 dark:text-blue-300'
                                    : 'text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400'
                                }`}>
                                  {item.label}
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-[#475467] dark:text-slate-400 truncate font-sans">
                                  {item.desc}
                                </div>
                              </div>
                            </div>

                            <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                              isActive ? 'text-blue-900 dark:text-blue-400' : 'text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 group-hover:text-blue-700 dark:group-hover:text-blue-400'
                            }`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sidebar Sticky Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-[#101828]/10 dark:border-white/10 bg-white/90 dark:bg-[#0D1527]/90 backdrop-blur-md space-y-2 shrink-0">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenAssessment();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg border border-[#101828]/20 dark:border-white/20 text-[#101828] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                <span>Take C.A.O. Self-Assessment (Free)</span>
              </button>

              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenBuyModal();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-[#101828] dark:bg-white text-white dark:text-[#070B14] hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Get the Book (Hardcover & Digital)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </aside>
        </div>
      )}
    </>
  );
};
