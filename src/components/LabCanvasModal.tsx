import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Printer, FileText, Download } from 'lucide-react';
import { LabResource } from '../types';

interface LabCanvasModalProps {
  resource: LabResource | null;
  onClose: () => void;
}

export const LabCanvasModal: React.FC<LabCanvasModalProps> = ({ resource, onClose }) => {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (resource?.defaultFields) {
      setFields({ ...resource.defaultFields });
    } else {
      setFields({});
    }
  }, [resource]);

  if (!resource) return null;

  const handleFieldChange = (key: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCopy = () => {
    const textOutput = `BEYOND AI ENGINEERING LAB
Resource: ${resource.title} (${resource.category})
Artifact: ${resource.artifactProduced}
Date: ${new Date().toLocaleDateString()}

${Object.entries(fields)
  .map(([k, v]) => `=== ${k.toUpperCase()} ===\n${v}\n`)
  .join('\n')}

Framework by Harsh Verma · Beyond AI Engineering (https://beyondaiengineering.com)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAFAF7] dark:bg-[#0D1527] rounded-2xl border border-[#101828]/10 dark:border-white/10 shadow-2xl p-6 sm:p-10 my-8 text-[#101828] dark:text-slate-100 max-h-[90vh] flex flex-col transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#101828]/10 dark:border-white/10 mb-6 shrink-0">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-blue-900 dark:text-blue-400 mb-1">
              BEYOND AI LAB · {resource.category}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101828] dark:text-white">
              {resource.title}
            </h2>
            <div className="text-xs text-[#475467] dark:text-slate-400 mt-1">
              Artifact: <span className="font-semibold text-[#101828] dark:text-slate-200">{resource.artifactProduced}</span> · Est. time: {resource.estimatedTime}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#475467] dark:text-slate-400 hover:text-[#101828] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close worksheet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <div className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 mb-6 shrink-0 leading-relaxed bg-white dark:bg-[#11192E] p-4 rounded-lg border border-[#101828]/[0.08] dark:border-white/10">
          {resource.description}
        </div>

        {/* Interactive Editable Canvas Fields */}
        <div className="overflow-y-auto pr-2 space-y-5 flex-1">
          {Object.entries(fields).map(([key, value]) => (
            <div key={key} className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#101828] dark:text-slate-200">
                {key}
              </label>
              <textarea
                rows={3}
                value={value}
                onChange={(e) => handleFieldChange(key, e.target.value)}
                className="w-full text-sm p-3 rounded-lg border border-[#101828]/20 dark:border-white/15 bg-white dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400 transition-all font-sans"
              />
            </div>
          ))}
        </div>

        {/* Action Toolbar */}
        <div className="pt-6 border-t border-[#101828]/10 dark:border-white/10 mt-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#475467] dark:text-slate-400">
            You can customize these fields directly and export your team artifact.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 text-xs font-medium border border-[#101828]/20 dark:border-white/20 rounded-md bg-white dark:bg-[#11192E] text-[#101828] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-semibold bg-[#101828] dark:bg-white text-white dark:text-[#070B14] rounded-md hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
