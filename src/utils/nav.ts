import { asLocale, type Locale } from '../data/i18n/config';
import { getUiCopy } from '../data/i18n/ui';
import { routePath, type RouteId } from '../data/i18n/routes';

export interface Crumb {
  label: string;
  href?: string;
}

const topLevelRoutes = ['solutions', 'applications', 'customer-stories', 'knowledge', 'company', 'products', 'support', 'partners', 'contact'] as const satisfies readonly RouteId[];

type TopLevelRoute = (typeof topLevelRoutes)[number];

const sectionKey: Record<TopLevelRoute, keyof ReturnType<typeof getUiCopy>['sections']> = {
  solutions: 'solutions',
  applications: 'applications',
  'customer-stories': 'customerStories',
  knowledge: 'knowledge',
  company: 'company',
  products: 'products',
  support: 'support',
  partners: 'partners',
  contact: 'contact'
};

function normalized(path: string): string {
  const bare = path.split('#', 1)[0].split('?', 1)[0] || '/';
  if (bare === '/') return '/';
  return `${bare.replace(/\/+$/, '')}/`;
}

/** Path segments with the locale prefix removed. Useful for depth only. */
export function pathSegments(pathname: string): string[] {
  return pathname
    .split('/')
    .filter(Boolean)
    .filter((seg, i) => !(i === 0 && /^[a-z]{2}$/.test(seg)));
}

export function activeSection(pathname: string, lang: Locale): TopLevelRoute | null {
  const current = normalized(pathname);
  for (const routeId of topLevelRoutes) {
    const base = normalized(routePath(routeId, lang));
    if (current === base || current.startsWith(base)) return routeId;
  }
  return null;
}

/**
 * Returns 'page' for the section landing page and 'section' for descendants.
 * Matching is based on canonical route identity, not on an English slug.
 */
export function navItemState(itemRouteId: RouteId, pathname: string, lang: string): 'page' | 'section' | null {
  const locale = asLocale(lang);
  const currentSection = activeSection(pathname, locale);
  if (!currentSection || itemRouteId !== currentSection) return null;
  return normalized(pathname) === normalized(routePath(itemRouteId, locale)) ? 'page' : 'section';
}

export function shortLabel(title: string): string {
  const withoutSuffix = title.replace(/\s*\|\s*PCam\s*$/i, '').trim();
  const [subject] = withoutSuffix.split(/\s+[—–]\s+|:\s+/);
  return (subject || withoutSuffix).trim();
}

export function breadcrumbFor(pathname: string, pageLabel: string, lang = 'en'): Crumb[] | null {
  if (pathSegments(pathname).length < 2) return null;
  const locale = asLocale(lang);
  const section = activeSection(pathname, locale);
  if (!section) return null;

  const ui = getUiCopy(locale);
  return [
    { label: ui.sections.home, href: routePath('home', locale) },
    { label: ui.sections[sectionKey[section]], href: routePath(section, locale) },
    { label: shortLabel(pageLabel) }
  ];
}
