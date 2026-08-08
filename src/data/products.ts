import { implementedLocales, sourceLocale, type Locale } from './i18n/config';
import { routePath } from './i18n/routes';
import productFactsJson from './products/facts.json';
import type { ProductFacts } from './products/types';

const productFacts = productFactsJson as ProductFacts[];
import { productCopyByLocale } from './products/locales';
import type { Product, ProductCopy } from './products/types';

export type { Product, ProductCategory, ProductCopy, ProductFacts } from './products/types';

export function getProductCopy(id: string, locale: Locale): ProductCopy {
  const localeCopy = productCopyByLocale[locale];
  if (!localeCopy) throw new Error(`Product copy for published locale ${locale} is missing`);
  const copy = localeCopy[id];
  if (!copy) throw new Error(`Missing ${locale} product copy for canonical product ${id}`);
  return copy;
}

export function productPath(id: string, locale: Locale): string {
  const copy = getProductCopy(id, locale);
  return `${routePath('products', locale)}${copy.slug}/`;
}

function assembleProduct(id: string, locale: Locale): Product {
  const facts = productFacts.find((item) => item.id === id);
  if (!facts) throw new Error(`Unknown canonical product ${id}`);
  const copy = getProductCopy(id, locale);
  const canonicalSpecKeys = new Set(facts.specs?.map((spec) => spec.key) ?? []);
  const localizedSpecKeys = new Set(copy.specs?.map((spec) => spec.key) ?? []);
  if (canonicalSpecKeys.size !== localizedSpecKeys.size || [...canonicalSpecKeys].some((key) => !localizedSpecKeys.has(key))) {
    throw new Error(`Localized specs for ${id}/${locale} do not match canonical spec keys`);
  }
  const { specs: canonicalSpecs, ...baseFacts } = facts;
  return {
    ...baseFacts,
    ...copy,
    canonicalSpecs,
    locale,
    copyRevision: copy.revision,
    reviewedAgainstRevision: copy.reviewedAgainstRevision,
    path: productPath(id, locale)
  };
}

export function getProducts(locale: Locale): Product[] {
  return productFacts.map((facts) => assembleProduct(facts.id, locale));
}

export function getProductById(id: string, locale: Locale): Product | undefined {
  return productFacts.some((facts) => facts.id === id) ? assembleProduct(id, locale) : undefined;
}

export function getProductBySlug(slug: string, locale: Locale): Product | undefined {
  const localeCopy = productCopyByLocale[locale];
  const entry = Object.entries(localeCopy ?? {}).find(([, copy]) => copy.slug === slug);
  return entry ? assembleProduct(entry[0], locale) : undefined;
}

export function productIdForPath(path: string): string | undefined {
  for (const locale of implementedLocales) {
    const base = routePath('products', locale);
    if (!path.startsWith(base)) continue;
    const slug = path.slice(base.length).replace(/\/+$/, '');
    const product = getProductBySlug(slug, locale);
    if (product) return product.id;
  }
  return undefined;
}

export function productAlternatePaths(path: string): { locale: Locale; path: string }[] | undefined {
  const id = productIdForPath(path);
  if (!id) return undefined;
  return implementedLocales.flatMap((locale) => {
    try { return [{ locale, path: productPath(id, locale) }]; }
    catch { return []; }
  });
}

/** English compatibility export for pages not yet converted to locale-aware data access. */
export const products = getProducts(sourceLocale);
