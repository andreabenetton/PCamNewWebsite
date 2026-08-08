import { asLocale, implementedLocales, localeMeta, sourceLocale, type Locale } from '../data/i18n/config';
import { routeIdForPath, routePath, staticAlternatesForPath, tryRoutePath } from '../data/i18n/routes';
import { productAlternatePaths, productIdForPath, productPath } from '../data/products';
import { storyAlternatePaths, storyIdForPath, storyPath } from '../data/stories';

export { implementedLocales, localeMeta, sourceLocale };
export type { Locale };

function isExternal(path: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(path);
}

export function localeFromPath(path: string): Locale | undefined {
  const match = path.match(/^\/([a-z]{2})(?:\/|$)/);
  return match ? asLocale(match[1]) : undefined;
}

/**
 * Localize by canonical identity. A translated URL is never invented by
 * replacing only the locale prefix: static routes use the route registry and
 * dynamic product/story routes use their canonical content IDs.
 */
export function localizedPath(path: string, lang = sourceLocale): string {
  if (!path.startsWith('/') || isExternal(path)) return path;
  const locale = asLocale(lang);

  const routeId = routeIdForPath(path);
  if (routeId) return routePath(routeId, locale);

  const productId = productIdForPath(path);
  if (productId) return productPath(productId, locale);

  const storyId = storyIdForPath(path);
  if (storyId) return storyPath(storyId, locale);

  const currentLocale = localeFromPath(path);
  if (currentLocale === locale) return path;
  throw new Error(`Cannot localize unknown route ${path} to ${locale}; add a canonical route/content mapping first`);
}

export function alternatePathsForPath(path: string): { locale: Locale; path: string }[] {
  return staticAlternatesForPath(path)
    ?? productAlternatePaths(path)
    ?? storyAlternatePaths(path)
    ?? [];
}

export function sourceEquivalentPath(path: string): string | undefined {
  const routeId = routeIdForPath(path);
  if (routeId) return tryRoutePath(routeId, sourceLocale);
  const productId = productIdForPath(path);
  if (productId) {
    try { return productPath(productId, sourceLocale); } catch { return undefined; }
  }
  const storyId = storyIdForPath(path);
  if (storyId) {
    try { return storyPath(storyId, sourceLocale); } catch { return undefined; }
  }
  return undefined;
}

export function localeOgTag(lang: string): string {
  return localeMeta[asLocale(lang)].ogLocale;
}
