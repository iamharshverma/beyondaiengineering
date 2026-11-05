import React, { useState } from 'react';
import { Copy, Check, Quote, BookOpen } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface CiteThisFrameworkProps {
  frameworkName: string;
  frameworkUrl: string;
}

export const CiteThisFramework: React.FC<CiteThisFrameworkProps> = ({
  frameworkName,
  frameworkUrl,
}) => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const standardCitation = `Verma, H. (2026). "${frameworkName}." Beyond AI Engineering: From Creator to Curator. Retrieved from ${frameworkUrl}`;
  const bibtexCitation = `@misc{verma2026${frameworkName.toLowerCase().replace(/[^a-z0-9]/g, '')},
  author = {Verma, Harsh},
  title = {${frameworkName}},
  booktitle = {Beyond AI Engineering: From Creator to Curator},
  year = {2026},
  url = {${frameworkUrl}}
}`;
  const markdownCitation = `> [${frameworkName}](${frameworkUrl}) by **Harsh Verma** in *Beyond AI Engineering* (https://www.beyondaiengineering.com)`;

  const handleCopy = (formatName: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedFormat(formatName);
      trackEvent('resource_download', { resource: `citation_${formatName}`, framework: frameworkName });
      setTimeout(() => setCopiedFormat(null), 2500);
    }
  };

  return (
    <div className="mt-12 bg-white dark:bg-[#0D1527] border border-[#101828]/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex items-center gap-2.5 mb-3">
        <Quote className="w-4 h-4 text-blue-900 dark:text-blue-400" />
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#101828] dark:text-white">
          Cite This Framework
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed mb-6">
        When citing this framework in engineering research, architecture decision records (ADRs), conference presentations, or industry whitepapers, use the authoritative citation formats below:
      </p>

      {/* Primary Metadata Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#FAFAF7] dark:bg-[#11192E] p-4 rounded-xl border border-[#101828]/[0.08] dark:border-white/10 mb-6 font-mono">
        <div>
          <span className="text-[#475467] dark:text-slate-400 uppercase text-[10px] block mb-0.5">Framework</span>
          <span className="text-[#101828] dark:text-white font-semibold">{frameworkName}</span>
        </div>
        <div>
          <span className="text-[#475467] dark:text-slate-400 uppercase text-[10px] block mb-0.5">Author</span>
          <span className="text-[#101828] dark:text-white font-semibold">Harsh Verma</span>
        </div>
        <div>
          <span className="text-[#475467] dark:text-slate-400 uppercase text-[10px] block mb-0.5">Source Publication</span>
          <span className="text-[#101828] dark:text-white font-semibold">Beyond AI Engineering: From Creator to Curator</span>
        </div>
        <div>
          <span className="text-[#475467] dark:text-slate-400 uppercase text-[10px] block mb-0.5">Canonical URL</span>
          <a href={frameworkUrl} className="text-blue-900 dark:text-blue-400 underline truncate block font-medium">
            {frameworkUrl}
          </a>
        </div>
      </div>

      {/* Copyable Citation Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => handleCopy('standard', standardCitation)}
          className="px-3.5 py-2 text-xs font-semibold rounded-md border border-[#101828]/15 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          {copiedFormat === 'standard' ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedFormat === 'standard' ? 'Copied APA Citation' : 'Copy APA Citation'}</span>
        </button>

        <button
          onClick={() => handleCopy('bibtex', bibtexCitation)}
          className="px-3.5 py-2 text-xs font-semibold rounded-md border border-[#101828]/15 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          {copiedFormat === 'bibtex' ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedFormat === 'bibtex' ? 'Copied BibTeX' : 'Copy BibTeX'}</span>
        </button>

        <button
          onClick={() => handleCopy('markdown', markdownCitation)}
          className="px-3.5 py-2 text-xs font-semibold rounded-md border border-[#101828]/15 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          {copiedFormat === 'markdown' ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedFormat === 'markdown' ? 'Copied Markdown' : 'Copy Markdown'}</span>
        </button>
      </div>
    </div>
  );
};
