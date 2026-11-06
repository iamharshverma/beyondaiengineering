import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBuyModal: () => void;
  onOpenAssessment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBuyModal,
  onOpenAssessment,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(false);

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

  // Categorized navigation links for the creative collapsible sidebar
  const navCategories = [
    {
      title: 'The Operating System',
      items: [
        { label: 'The Book', page: 'book' as PageId, icon: BookOpen, desc: 'Overview, table of contents & chapter blueprints' },
        { label: 'C.A.O. Framework', page: 'cao-framework' as PageId, icon: Compass, desc: 'Creator → Architect → Orchestrator core model' },
        { label: 'Read Sample Chapter', page: 'sample' as PageId, icon: Sparkles, desc: 'Exclusive excerpt: The Engineer After Code' },
        { label: 'Buy the Book', page: 'buy' as PageId, icon: ArrowUpRight, desc: 'Hardcover, paperback & digital retailer editions' },
        { label: 'Teams & Bulk Licensing', page: 'teams' as PageId, icon: Users, desc: 'Enterprise teams & university syllabi' },
      ],
    },
    {
      title: 'Frameworks & Interactive Lab',
      items: [
        { label: '10 Proprietary Frameworks', page: 'frameworks' as PageId, icon: Layers, desc: 'Trust Economy, How to What, Agentic Diplomacy' },
        { label: 'Lab & Canvases', page: 'resources' as PageId, icon: FlaskConical, desc: 'Worksheets, audit rubrics & transition planners' },
        { label: 'Living AI Toolkit', page: 'toolkit' as PageId, icon: Wrench, desc: 'Curated agent tools, eval suites & memory fabrics' },
        { label: 'Students & New Grads', page: 'students' as PageId, icon: GraduationCap, desc: 'Early career playbook for the agentic age' },
      ],
    },
    {
      title: 'Perspective & Authority',
      items: [
        { label: 'The Manifesto', page: 'manifesto' as PageId, icon: ScrollText, desc: '10 founding theses for engineering after code' },
        { label: 'Author Biography', page: 'author' as PageId, icon: User, desc: 'Harsh Verma, Principal AI Engineer & Fellow' },
        { label: 'Keynotes & Speaking', page: 'speaking' as PageId, icon: Mic, desc: 'Executive briefings & conference keynotes' },
        { label: 'Ideas & Research', page: 'ideas' as PageId, icon: Lightbulb, desc: 'Deep-dive technical essays and commentary' },
        { label: 'Reader Stories', page: 'stories' as PageId, icon: ShieldCheck, desc: 'Field reports and production case studies' },
        { label: 'Press Kit & Media', page: 'press' as PageId, icon: Newspaper, desc: 'High-res photos, bios & media contacts' },
      ],
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAFAF7]/95 dark:bg-[#070B14]/95 backdrop-blur-md border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 w-full">
          
          {/* Zone 1: Brand Wordmark (Consistent & Sized for Zero-Overflow) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="text-left group focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-4 rounded-sm shrink-0 cursor-pointer max-w-[170px] xs:max-w-[220px] sm:max-w-none"
          >
            <span className="font-serif text-sm xs:text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap block truncate sm:overflow-visible">
              BEYOND AI ENGINEERING
            </span>
            <span className="text-[8px] xs:text-[9px] sm:text-[10px] lg:text-[11px] tracking-wider uppercase text-[#475467] dark:text-slate-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors whitespace-nowrap block -mt-0.5 sm:-mt-1 font-sans truncate sm:overflow-visible">
              By Harsh Verma · The Career OS
            </span>
          </button>

          {/* Zone 2: Focused Direct Nav Links (Strictly The Book & Author) */}
          <nav className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('book')}
              className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                currentPage === 'book'
                  ? 'text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 font-semibold border border-blue-200 dark:border-blue-800/60'
                  : 'text-[#344054] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
              }`}
            >
              The Book
            </button>

            <button
              onClick={() => handleLinkClick('author')}
              className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                currentPage === 'author'
                  ? 'text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 font-semibold border border-blue-200 dark:border-blue-800/60'
                  : 'text-[#344054] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
              }`}
            >
              Author
            </button>
          </nav>

          {/* Zone 3: Always-Visible Primary Actions & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* 1. Take Assessment (Always Displayed) */}
            <button
              onClick={onOpenAssessment}
              className="px-2 xs:px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#101828] dark:text-slate-200 hover:text-blue-900 dark:hover:text-blue-400 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 border border-[#101828]/20 dark:border-white/20 rounded-md transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              <span className="hidden sm:inline">Take Assessment</span>
              <span className="sm:hidden">Assessment</span>
            </button>

            {/* 2. Get The Book (Always Displayed) */}
            <button
              onClick={onOpenBuyModal}
              className="px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wide text-white bg-[#101828] dark:bg-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-all shadow-xs hover:shadow flex items-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
            >
              <span>Get Book</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            {/* 3. Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light edition' : 'Switch to luxury dark edition'}
              title={isDark ? 'Switch to light edition' : 'Switch to luxury dark edition'}
              className="p-1.5 sm:p-2 rounded-md text-[#475467] dark:text-amber-300 hover:text-[#101828] dark:hover:text-amber-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors border border-transparent dark:border-amber-400/20 cursor-pointer shrink-0"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* 4. Collapsible Nav Toggle ("Explore All" / Hamburger) */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1.5 sm:p-2 text-[#101828] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 border border-[#101828]/15 dark:border-white/15 shrink-0"
              aria-label="Open full navigation menu"
              title="Explore all chapters, frameworks & resources"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900 dark:text-blue-400" />
              <span className="hidden md:inline text-xs font-semibold text-[#101828] dark:text-white">
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
            <div className="p-4 sm:p-6 border-b border-[#101828]/10 dark:border-white/10 flex items-center justify-between shrink-0 bg-white/70 dark:bg-[#0D1527]/70 backdrop-blur-md">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 font-bold block">
                  Complete Navigation
                </span>
                <div className="font-serif text-lg sm:text-xl font-bold text-[#101828] dark:text-white">
                  Beyond AI Engineering
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-2 rounded-lg text-[#475467] dark:text-amber-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sidebar Content (Scrollable Categories) */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-8">
              {navCategories.map((category) => (
                <div key={category.title} className="space-y-2.5">
                  <h3 className="text-[11px] font-mono uppercase tracking-wider text-[#475467] dark:text-slate-400 font-bold px-2">
                    {category.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-1">
                    {category.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentPage === item.page;
                      return (
                        <button
                          key={item.page}
                          onClick={() => handleLinkClick(item.page)}
                          className={`w-full text-left p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between group ${
                            isActive
                              ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-950 dark:text-blue-200 shadow-2xs'
                              : 'hover:bg-white dark:hover:bg-[#0D1527] border border-transparent hover:border-[#101828]/10 dark:hover:border-white/10 text-[#344054] dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? 'bg-blue-900 text-white dark:bg-blue-400 dark:text-[#070B14]'
                                : 'bg-[#FAFAF7] dark:bg-[#131D33] text-[#475467] dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/40 group-hover:text-blue-900 dark:group-hover:text-blue-300'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className={`text-sm font-semibold transition-colors ${
                                isActive
                                  ? 'text-blue-900 dark:text-blue-300'
                                  : 'text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400'
                              }`}>
                                {item.label}
                              </div>
                              <div className="text-[11px] text-[#475467] dark:text-slate-400 line-clamp-1 font-sans">
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
              ))}
            </div>

            {/* Sidebar Sticky Footer Actions */}
            <div className="p-4 sm:p-6 border-t border-[#101828]/10 dark:border-white/10 bg-white/80 dark:bg-[#0D1527]/80 backdrop-blur-md space-y-2 shrink-0">
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
