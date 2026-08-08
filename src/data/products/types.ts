import type { Locale } from '../i18n/config';

export type ProductCategory = 'automation' | 'digital-production' | 'monitoring' | 'tool-management' | 'edm-cam' | 'measurement';

export interface CanonicalProductSpec {
  key: string;
  sourceValue: string;
}

export interface ProductFacts {
  id: string;
  name: string;
  category: ProductCategory;
  source: string;
  specs?: CanonicalProductSpec[];
}

export interface LocalizedProductSpec {
  key: string;
  label: string;
  value: string;
}

export interface ProductCopy {
  revision: number;
  /** For non-source locales: source-language revision explicitly reviewed by a human. */
  reviewedAgainstRevision?: number;
  slug: string;
  eyebrow: string;
  summary: string;
  buyerProblem: string;
  bestFor: string[];
  capabilities: string[];
  outcomes: string[];
  integration?: string[];
  specs?: LocalizedProductSpec[];
}

export interface Product extends Omit<ProductFacts, 'specs'>, Omit<ProductCopy, 'revision' | 'reviewedAgainstRevision'> {
  canonicalSpecs?: CanonicalProductSpec[];
  locale: Locale;
  copyRevision: number;
  reviewedAgainstRevision?: number;
  path: string;
}
