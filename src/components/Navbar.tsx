import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

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

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'The Book', page: 'book' },
    { label: 'C.A.O. Framework', page: 'frameworks' },
    { label: 'Lab & Resources', page: 'resources' },
    { label: 'Toolkit', page: 'toolkit' },
    { label: 'Students', page: 'students' },
    { label: 'Manifesto', page: 'manifesto' },
    { label: 'Author', page: 'author' },
    { label: 'Speaking', page: 'speaking' },
    { label: 'Ideas', page: 'ideas' },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#101828]/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single-Line Text Element) */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left group focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-4 rounded-sm shrink-0"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#101828] group-hover:text-blue-900 transition-colors whitespace-nowrap block">
            BEYOND AI ENGINEERING
          </span>
          <span className="text-[11px] tracking-widest uppercase text-[#475467] group-hover:text-blue-700 transition-colors whitespace-nowrap block -mt-1 font-sans">
            By Harsh Verma · The Career OS for Engineers
          </span>
        </button>

        {/* Zone 2: Primary Nav Links (Single-Line, Zero Pill, Subtle Clean States) */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-[#475467]">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b ${
                  isActive
                    ? 'text-blue-900 border-blue-900 font-semibold'
                    : 'text-[#475467] border-transparent hover:text-[#101828] hover:border-slate-300'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action (Single Primary CTA Button) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAssessment}
            className="text-xs font-semibold text-[#101828] hover:text-blue-900 px-3 py-2 transition-colors whitespace-nowrap shrink-0"
          >
            Take Assessment
          </button>
          <button
            onClick={onOpenBuyModal}
            className="px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#101828] rounded-md hover:bg-blue-950 transition-all shadow-sm hover:shadow flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Get the Book</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={onOpenBuyModal}
            className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-[#101828] rounded-md whitespace-nowrap"
          >
            Get the Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#101828] hover:bg-black/5 rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#101828]/[0.08] bg-[#FAFAF7] px-6 py-5 shadow-lg">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className={`text-left text-base py-2 transition-colors border-b border-black/[0.04] ${
                    isActive ? 'text-blue-900 font-semibold pl-2 border-l-2 border-blue-900' : 'text-[#475467] hover:text-[#101828]'
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
                className="w-full text-center py-2.5 text-sm font-semibold border border-[#101828]/20 rounded-md text-[#101828] hover:bg-black/5 transition-colors"
              >
                Take C.A.O. Assessment
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBuyModal();
                }}
                className="w-full text-center py-2.5 text-sm font-semibold bg-[#101828] text-white rounded-md hover:bg-blue-950 transition-colors"
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
