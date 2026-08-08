import type { Locale } from '../i18n/config';

export interface StoryFacts {
  id: string;
  company: string;
  /** Exact metric string captured from the source; never translate in place. */
  metricSource: string;
  productIds: string[];
  source: string;
  reportedQuote?: { text: string; locale: Locale };
}

export interface StoryCopy {
  revision: number;
  /** For non-source locales: source-language revision explicitly reviewed by a human. */
  reviewedAgainstRevision?: number;
  slug: string;
  metric: string;
  headline: string;
  context: string;
  /** Required in a translated locale when the source evidence contains a quote. */
  quote?: string;
}

export interface Story extends StoryFacts, Omit<StoryCopy, 'revision' | 'reviewedAgainstRevision'> {
  locale: Locale;
  copyRevision: number;
  reviewedAgainstRevision?: number;
  quote?: string;
  products: string[];
  path: string;
}
