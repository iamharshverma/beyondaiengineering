import React, { useMemo, useState } from 'react';
import { BookOpenCheck, ChevronDown, ChevronUp, ExternalLink, Info, ShieldCheck } from 'lucide-react';
import {
  EPISTEMIC_SOURCES,
  SOURCE_CATEGORY_LABELS,
  VERIFICATION_STATUS_LABELS,
  SourceCategory,
} from '../data/sourcesData';
import { buildSourceNoteCitationJsonLd } from '../utils/sourceNoteSchema';

interface SourceNoteProps {
  sourceId: string;
  compact?: boolean;
  /** Schema.org @id of the host DefinedTerm / framework entity */
  entityId?: string;
  /** Schema.org @id of the host TechArticle / Article entity */
  articleId?: string;
  /** Human-readable name of the host framework or topic */
  entityName?: string;
  /** Canonical URL of the host framework or page */
  entityUrl?: string;
  /** Disable inline JSON-LD emission if caller opts out */
  includeSchema?: boolean;
}

const CATEGORY_TONES: Record<SourceCategory, string> = {
  verified_historical: 'text-emerald-800 dark:text-emerald-300',
  author_interpretation: 'text-blue-900 dark:text-blue-300',
  illustrative_scenario: 'text-amber-800 dark:text-amber-300',
  fictional_case_study: 'text-slate-700 dark:text-slate-300',
};

export const SourceNote: React.FC<SourceNoteProps> = ({
  sourceId,
  compact = false,
  entityId,
  articleId,
  entityName,
  entityUrl,
  includeSchema = true,
}) => {
  const [expanded, setExpanded] = useState(false);
  const item = EPISTEMIC_SOURCES[sourceId];

  const citationJsonLd = useMemo(() => {
    if (!item || !includeSchema) return null;
    return JSON.stringify(
      buildSourceNoteCitationJsonLd(item, {
        entityId,
        articleId,
        entityName,
        entityUrl,
      })
    );
  }, [item, includeSchema, entityId, articleId, entityName, entityUrl]);

  if (!item) return null;

  const categoryLabel = SOURCE_CATEGORY_LABELS[item.category];
  const verificationLabel = VERIFICATION_STATUS_LABELS[item.verificationStatus];

  return (
    <aside
      aria-label={`Source note: ${item.sourceTitle}`}
      data-source-id={item.id}
      data-verification-status={item.verificationStatus}
      className={`border border-[#101828]/12 dark:border-white/12 rounded-xl bg-white/80 dark:bg-[#0D1527]/80 ${
        compact ? 'p-3.5' : 'p-4 sm:p-5'
      }`}
    >
      {citationJsonLd && (
        <script
          type="application/ld+json"
          data-source-citation={item.id}
          dangerouslySetInnerHTML={{ __html: citationJsonLd }}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {item.category === 'verified_historical' ? (
            <ShieldCheck className={`w-4 h-4 shrink-0 ${CATEGORY_TONES[item.category]}`} aria-hidden="true" />
          ) : item.category === 'author_interpretation' ? (
            <BookOpenCheck className={`w-4 h-4 shrink-0 ${CATEGORY_TONES[item.category]}`} aria-hidden="true" />
          ) : (
            <Info className={`w-4 h-4 shrink-0 ${CATEGORY_TONES[item.category]}`} aria-hidden="true" />
          )}

          <span className={`font-semibold tracking-tight ${CATEGORY_TONES[item.category]}`}>
            {categoryLabel}
          </span>
          <span className="text-[#98A2B3]" aria-hidden="true">
            ·
          </span>
          <span className="font-mono text-[11px] text-[#475467] dark:text-slate-400">
            {verificationLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1 text-xs font-mono text-[#475467] dark:text-slate-300 hover:text-[#101828] dark:hover:text-white cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          <span>{expanded ? 'Hide provenance' : 'View provenance'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      <p className="mt-2 text-xs sm:text-sm text-[#101828] dark:text-slate-200 leading-relaxed">
        {item.claimSupported}
      </p>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-[#101828]/10 dark:border-white/10 space-y-2 text-xs text-[#475467] dark:text-slate-300">
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px]">
            <span>
              <strong className="text-[#101828] dark:text-white">Source:</strong> {item.sourceTitle}
            </span>
            <span>
              <strong className="text-[#101828] dark:text-white">Attribution:</strong> {item.authorOrOrg}
            </span>
            {item.publisher && (
              <span>
                <strong className="text-[#101828] dark:text-white">Publisher:</strong> {item.publisher}
              </span>
            )}
            {item.date && (
              <span className="tabular-nums">
                <strong className="text-[#101828] dark:text-white">Date:</strong> {item.date}
              </span>
            )}
          </div>
          <p className="leading-relaxed">{item.explanation}</p>
          {item.externalUrl && (
            <div>
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-blue-900 dark:text-blue-300 hover:underline"
              >
                <span>Open primary public reference</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
