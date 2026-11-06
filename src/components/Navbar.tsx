import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize and sync dark mode state
  useEffect(() => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    setIsDark(isCurrentlyDark);
  }, []);

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

  const navLinks: { label: string; page: PageId; path: string }[] = [
    { label: 'The Book', page: 'book', path: '/book' },
    { label: 'C.A.O. Framework', page: 'cao-framework', path: '/cao-framework' },
    { label: 'Frameworks', page: 'frameworks', path: '/frameworks' },
    { label: 'Lab & Resources', page: 'resources', path: '/resources' },
    { label: 'Toolkit', page: 'toolkit', path: '/toolkit' },
    { label: 'Students', page: 'students', path: '/students' },
    { label: 'Manifesto', page: 'manifesto', path: '/manifesto' },
    { label: 'Author', page: 'author', path: '/author' },
    { label: 'Speaking', page: 'speaking', path: '/speaking' },
    { label: 'Ideas', page: 'ideas', path: '/ideas' },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF7]/90 dark:bg-[#070B14]/90 backdrop-blur-md border-b border-[#101828]/[0.08] dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Brand Wordmark (Single-Line Text Element) */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left group focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-4 rounded-sm shrink-0 cursor-pointer"
        >
          <span className="font-serif text-base sm:text-2xl font-bold tracking-tight text-[#101828] dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap block">
            BEYOND AI ENGINEERING
          </span>
          <span className="text-[9px] sm:text-[11px] tracking-wider sm:tracking-widest uppercase text-[#475467] dark:text-slate-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors whitespace-nowrap block -mt-0.5 sm:-mt-1 font-sans">
            By Harsh Verma · The Career OS for Engineers
          </span>
        </button>

        {/* Zone 2: Primary Nav Links (Single-Line, Zero Pill, Subtle Clean States) */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b cursor-pointer ${
                  isActive
                    ? 'text-blue-900 dark:text-blue-400 border-blue-900 dark:border-blue-400 font-semibold'
                    : 'text-[#475467] dark:text-slate-300 border-transparent hover:text-[#101828] dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAssessment}
            className="text-xs font-semibold text-[#101828] dark:text-slate-200 hover:text-blue-900 dark:hover:text-blue-400 px-3 py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Take Assessment
          </button>
          <button
            onClick={onOpenBuyModal}
            className="px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#101828] dark:bg-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-all shadow-sm hover:shadow flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Get the Book</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zone 4: Theme Toggle + Mobile Menu Controls (Single Theme Toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Single Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light edition' : 'Switch to luxury dark edition'}
            title={isDark ? 'Switch to light edition' : 'Switch to luxury dark edition'}
            className="p-2 rounded-lg text-[#475467] dark:text-amber-300 hover:text-[#101828] dark:hover:text-amber-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors border border-transparent dark:border-amber-400/20 cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300 animate-in fade-in zoom-in-75 duration-200" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 animate-in fade-in zoom-in-75 duration-200" />
            )}
          </button>

          <button
            onClick={onOpenBuyModal}
            className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-[#101828] dark:bg-white dark:text-[#070B14] rounded-md whitespace-nowrap cursor-pointer"
          >
            Get Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#101828] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#101828]/[0.08] dark:border-white/10 bg-[#FAFAF7] dark:bg-[#070B14] px-6 py-5 shadow-xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className={`text-left text-base py-2 transition-colors border-b border-black/[0.04] dark:border-white/[0.06] cursor-pointer ${
                    isActive
                      ? 'text-blue-900 dark:text-blue-400 font-semibold pl-2 border-l-2 border-blue-900 dark:border-blue-400'
                      : 'text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssessment();
                }}
                className="w-full text-center py-2.5 text-sm font-semibold border border-[#101828]/20 dark:border-white/20 rounded-md text-[#101828] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Take C.A.O. Assessment
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBuyModal();
                }}
                className="w-full text-center py-2.5 text-sm font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Get the Book (Hardcover & Digital)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
