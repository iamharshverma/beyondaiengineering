import React, { useEffect, useRef, useState } from 'react';
import { PageId } from '../types';
import { findResourceWorkspace, RESOURCE_WORKSPACES } from '../data/resourceWorkspacesData';
import { trackEvent } from '../utils/analytics';
import { updatePageSeo, PAGE_OG_IMAGES } from '../utils/seo';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Eye,
  EyeOff,
  Printer,
  RotateCcw,
  Save,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface ResourceWorkspaceViewProps {
  slug: string;
  onNavigate: (pageOrPath: PageId | string, param?: string) => void;
}

const STORAGE_PREFIX = 'beyond_ai_resource_v2_';

export const ResourceWorkspaceView: React.FC<ResourceWorkspaceViewProps> = ({
  slug,
  onNavigate,
}) => {
  const workspace = findResourceWorkspace(slug);
  const storageKey = `${STORAGE_PREFIX}${workspace.slug}`;

  const [values, setValues] = useState<Record<string, string>>({});
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [showMarkdownPreview, setShowMarkdownPreview] = useState<boolean>(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);
  const hasTrackedStarted = useRef<boolean>(false);

  // Load workspace draft on slug switch
  useEffect(() => {
    hasTrackedStarted.current = false;
    setConfirmReset(false);
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { values?: Record<string, string>; updatedAt?: string };
        setValues(parsed.values || {});
        setLastSavedAt(parsed.updatedAt || null);
      } else {
        setValues({});
        setLastSavedAt(null);
      }
    } catch {
      setValues({});
      setLastSavedAt(null);
    }

    trackEvent('resource_opened', {
      slug: workspace.slug,
      pillar: workspace.pillar,
      category: workspace.caoStage,
    });
  }, [storageKey, workspace.slug, workspace.pillar, workspace.caoStage]);

  // Dynamic SEO per workspace route
  useEffect(() => {
    updatePageSeo({
      title: `${workspace.title} — Interactive Companion Workspace | Beyond AI Engineering`,
      description: `${workspace.subtitle} Browser-based structured worksheet producing: ${workspace.artifactProduced}.`,
      canonicalPath: `/resources/${workspace.slug}`,
      ogType: 'website',
      ogImage: PAGE_OG_IMAGES.resources,
      schemaType: 'WebPage',
      breadcrumbs: [
        { name: 'Companion Resources', path: '/resources' },
        { name: workspace.title, path: `/resources/${workspace.slug}` },
      ],
    });
  }, [workspace]);

  const persistValues = (nextValues: Record<string, string>) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          values: nextValues,
          updatedAt: now,
        })
      );
      setLastSavedAt(now);
    } catch {}
  };

  const handleFieldChange = (fieldId: string, val: string) => {
    if (!hasTrackedStarted.current) {
      hasTrackedStarted.current = true;
      trackEvent('resource_template_started', {
        slug: workspace.slug,
        sectionCount: workspace.fields.length,
      });
    }
    const updated = { ...values, [fieldId]: val };
    setValues(updated);
    persistValues(updated);
  };

  const handleManualSave = () => {
    persistValues(values);
    const filledCount = workspace.fields.filter((f) => Boolean((values[f.id] || '').trim())).length;
    trackEvent('resource_saved', {
      slug: workspace.slug,
      filledCount,
      totalCount: workspace.fields.length,
    });
  };

  const handleLoadExample = () => {
    const sample: Record<string, string> = {};
    workspace.fields.forEach((f) => {
      sample[f.id] = f.exampleValue;
    });
    setValues(sample);
    persistValues(sample);
    trackEvent('resource_template_started', {
      slug: workspace.slug,
      sectionCount: workspace.fields.length,
      mode: 'sample_loaded',
    });
  };

  const handleConfirmReset = () => {
    setValues({});
    setLastSavedAt(null);
    setConfirmReset(false);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  };

  const markdownOutput = workspace.buildMarkdown(values);

  const handleCopyMarkdown = () => {
    navigator.clipboard?.writeText(markdownOutput);
    setCopiedMarkdown(true);
    trackEvent('resource_exported', { slug: workspace.slug, format: 'copy' });
    setTimeout(() => setCopiedMarkdown(false), 2400);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownOutput], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${workspace.slug}-beyond-ai-engineering.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    trackEvent('resource_download', { resource: workspace.slug, format: 'md' });
    trackEvent('resource_exported', { slug: workspace.slug, format: 'markdown' });
  };

  const handlePrintPdf = () => {
    trackEvent('resource_exported', { slug: workspace.slug, format: 'print' });
    window.print();
  };

  const currentIndex = RESOURCE_WORKSPACES.findIndex((w) => w.slug === workspace.slug);
  const prevWorkspace =
    RESOURCE_WORKSPACES[(currentIndex - 1 + RESOURCE_WORKSPACES.length) % RESOURCE_WORKSPACES.length];
  const nextWorkspace =
    RESOURCE_WORKSPACES[(currentIndex + 1) % RESOURCE_WORKSPACES.length];

  const filledCount = workspace.fields.filter((f) => Boolean((values[f.id] || '').trim())).length;

  return (
    <div className="pb-24">
      {/* Top Workspace Strip */}
      <div className="border-b border-[#101828]/10 dark:border-white/10 bg-white/80 dark:bg-[#0D1527]/80 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/resources')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>All Companion Resources</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#475467] dark:text-slate-400">
            <span className="tabular-nums">
              {filledCount}/{workspace.fields.length} sections filled
            </span>
            {lastSavedAt && (
              <span className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-300 tabular-nums">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Saved in browser ({lastSavedAt})</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="workspace-print-sheet" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-[#101828]/10 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#475467] dark:text-slate-400">
            <span className="font-semibold text-blue-900 dark:text-blue-300 tabular-nums">
              Tool {workspace.number} of 09
            </span>
            <span aria-hidden="true">·</span>
            <span>{workspace.pillar}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {workspace.estimatedTime}
            </span>
            <span aria-hidden="true">·</span>
            <span>{workspace.relatedChapter}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#101828] dark:text-white text-balance leading-[1.12]">
            {workspace.title}
          </h1>

          <p className="text-base sm:text-lg text-[#475467] dark:text-slate-300 max-w-3xl leading-relaxed">
            {workspace.subtitle}
          </p>

          {/* Local Storage & Confidential Data Notice */}
          <div className="p-4 rounded-xl border border-[#101828]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#11192E] flex items-start gap-3 text-xs text-[#475467] dark:text-slate-300 leading-relaxed no-print">
            <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="text-[#101828] dark:text-white">
                Browser-Only Storage Notice:
              </strong>{' '}
              Everything you enter is saved automatically inside your local browser (`localStorage`)—not uploaded to a server. Do not enter proprietary employer source code, API secrets, or confidential client PII.
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5 no-print">
            <button
              type="button"
              onClick={handleManualSave}
              className="px-4 py-2 rounded-md bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Save Snapshot</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="px-4 py-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0D1527] text-xs font-semibold text-[#101828] dark:text-white hover:border-blue-900 dark:hover:border-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download .md</span>
            </button>
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="px-4 py-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0D1527] text-xs font-semibold text-[#101828] dark:text-white hover:border-blue-900 dark:hover:border-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copiedMarkdown ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />
                  <span>Copied Markdown</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handlePrintPdf}
              className="px-4 py-2 rounded-md border border-[#101828]/20 dark:border-white/20 bg-white dark:bg-[#0D1527] text-xs font-semibold text-[#101828] dark:text-white hover:border-blue-900 dark:hover:border-blue-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={() => setShowMarkdownPreview((prev) => !prev)}
              className="px-3.5 py-2 rounded-md text-xs font-medium text-blue-900 dark:text-blue-300 hover:underline inline-flex items-center gap-1.5 cursor-pointer"
            >
              {showMarkdownPreview ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Hide Preview</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Preview Markdown</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleLoadExample}
              className="px-3 py-2 rounded-md text-xs font-medium text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Fill Realistic Example</span>
            </button>
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="px-3 py-2 rounded-md text-xs font-medium text-[#475467] dark:text-slate-400 hover:text-red-700 dark:hover:text-red-300 inline-flex items-center gap-1 cursor-pointer ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset Tool</span>
              </button>
            ) : (
              <div className="ml-auto flex items-center gap-2 text-xs bg-amber-50 dark:bg-amber-950/50 border border-amber-700/30 px-3 py-1.5 rounded-md">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300" />
                <span className="text-amber-900 dark:text-amber-200 font-medium">Clear fields?</span>
                <button
                  type="button"
                  onClick={handleConfirmReset}
                  className="font-semibold text-red-700 dark:text-red-300 hover:underline cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="text-[#475467] dark:text-slate-300 hover:underline cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Two-Column Body: Form Workspace + Guidance Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Structured Form or Preview */}
          <div className="lg:col-span-8 space-y-6">
            {showMarkdownPreview && (
              <div className="p-5 sm:p-6 rounded-xl border border-blue-900/20 dark:border-blue-400/20 bg-white dark:bg-[#0D1527] space-y-3 no-print">
                <div className="flex items-center justify-between text-xs font-mono text-blue-900 dark:text-blue-300 font-semibold">
                  <span>Exportable Markdown Artifact Preview</span>
                  <span>{workspace.slug}.md</span>
                </div>
                <pre className="whitespace-pre-wrap text-xs sm:text-sm font-mono text-[#101828] dark:text-slate-200 bg-[#FAFAF7] dark:bg-[#11192E] p-4 rounded-lg border border-[#101828]/10 dark:border-white/10 overflow-x-auto leading-relaxed">
                  {markdownOutput}
                </pre>
              </div>
            )}

            <div className="space-y-6">
              {workspace.fields.map((field, idx) => {
                const fieldValue = values[field.id] || '';
                const inputId = `ws-${workspace.slug}-${field.id}`;
                return (
                  <div
                    key={field.id}
                    className="p-5 sm:p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-2.5"
                  >
                    <label
                      htmlFor={inputId}
                      className="block font-serif text-lg sm:text-xl font-bold text-[#101828] dark:text-white"
                    >
                      <span className="font-mono text-xs text-blue-900 dark:text-blue-400 mr-2 tabular-nums">
                        0{idx + 1}.
                      </span>
                      {field.label}
                    </label>
                    <p className="text-xs text-[#475467] dark:text-slate-400 leading-relaxed">
                      {field.hint}
                    </p>

                    {field.type === 'select' && field.options ? (
                      <select
                        id={inputId}
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                      >
                        <option value="">Select classification...</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        id={inputId}
                        rows={field.rows || 3}
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white placeholder:text-slate-400 focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400 leading-relaxed"
                      />
                    ) : (
                      <input
                        id={inputId}
                        type="text"
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#101828]/20 dark:border-white/20 bg-[#FAFAF7] dark:bg-[#11192E] text-[#101828] dark:text-white placeholder:text-slate-400 focus:outline-2 focus:outline-blue-900 dark:focus:outline-blue-400"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Guidance & Instructions Rail */}
          <aside className="lg:col-span-4 space-y-6 no-print">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="p-5 sm:p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#11192E] space-y-3">
                <div className="text-xs font-mono font-semibold text-blue-900 dark:text-blue-300">
                  Purpose & Deliverable
                </div>
                <p className="text-xs sm:text-sm text-[#475467] dark:text-slate-300 leading-relaxed">
                  {workspace.purpose}
                </p>
                <div className="pt-2 border-t border-[#101828]/10 dark:border-white/10 text-xs">
                  <strong className="text-[#101828] dark:text-white">Artifact Created:</strong>{' '}
                  <span className="text-[#475467] dark:text-slate-300">
                    {workspace.artifactProduced}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-3">
                <div className="text-xs font-mono font-semibold text-[#101828] dark:text-white">
                  Step-by-Step Guidance
                </div>
                <ol className="space-y-2.5 text-xs text-[#475467] dark:text-slate-300 leading-relaxed">
                  {workspace.instructions.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono font-semibold text-blue-900 dark:text-blue-400 tabular-nums">
                        0{i + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-5 sm:p-6 rounded-xl border border-[#101828]/10 dark:border-white/10 bg-white dark:bg-[#0D1527] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#101828] dark:text-white">
                  <BookOpen className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" aria-hidden="true" />
                  <span>Connected Concepts & Stage</span>
                </div>
                <p className="text-xs text-[#475467] dark:text-slate-300">
                  {workspace.relatedConcepts.join(' · ')}
                </p>
                {workspace.caoStage !== 'all' ? (
                  <button
                    type="button"
                    onClick={() => onNavigate(`/frameworks/${workspace.caoStage}`)}
                    className="text-xs font-semibold text-blue-900 dark:text-blue-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read {workspace.caoStage.toUpperCase()} Stage Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigate('/cao-framework')}
                    className="text-xs font-semibold text-blue-900 dark:text-blue-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore Full C.A.O. Framework</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Prev/Next Workspace Switcher */}
        <nav
          aria-label="Workspace switcher"
          className="pt-8 border-t border-[#101828]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 no-print"
        >
          <button
            type="button"
            onClick={() => onNavigate(`/resources/${prevWorkspace.slug}`)}
            className="px-4 py-2.5 rounded-lg border border-[#101828]/15 dark:border-white/15 bg-white dark:bg-[#0D1527] text-xs font-semibold text-[#101828] dark:text-white hover:border-blue-900 dark:hover:border-blue-400 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Prev Tool: {prevWorkspace.title}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(`/resources/${nextWorkspace.slug}`)}
            className="px-5 py-2.5 rounded-lg bg-[#101828] dark:bg-white text-white dark:text-[#070B14] text-xs font-semibold hover:bg-blue-950 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Next Tool: {nextWorkspace.title}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
};
