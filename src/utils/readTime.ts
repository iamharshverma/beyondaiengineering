import { InsightItem } from '../data/insightsData';

export interface ReadTimeEstimate {
  wordCount: number;
  minutes: number;
  label: string;
}

const DEFAULT_WORDS_PER_MINUTE = 200;

export function countInsightWords(item: InsightItem): number {
  const parts: string[] = [
    item.title,
    item.subtitle,
    item.keyQuote,
    item.leadParagraph,
    ...(item.content || []),
  ];

  if (item.benchmarks && item.benchmarks.length > 0) {
    for (const bm of item.benchmarks) {
      parts.push(bm.label, bm.value);
      if (bm.note) parts.push(bm.note);
    }
  }

  const combined = parts.filter(Boolean).join(' ').trim();
  if (!combined) return 0;

  return combined.split(/\s+/).filter(Boolean).length;
}

export function estimateInsightReadTime(
  item: InsightItem,
  wordsPerMinute: number = DEFAULT_WORDS_PER_MINUTE
): ReadTimeEstimate {
  const wordCount = countInsightWords(item);
  const minutes = Math.max(1, Math.ceil(wordCount / Math.max(1, wordsPerMinute)));

  return {
    wordCount,
    minutes,
    label: `${minutes} min read`,
  };
}
