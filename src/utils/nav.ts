/**
 * Location resolution shared by the header (active section highlight) and the
 * breadcrumb, so the two can never disagree about where the user is.
 *
 * Top-level areas are keyed by their first path segment after the locale.
 * `products`, `support`, `partners` and `contact` are reachable areas that are
 * deliberately absent from the primary nav (see CLAUDE.md on the acquisition
 * IA), so they resolve for breadcrumb purposes without lighting up a nav item.
 */

export interface Crumb {
  label: string;
  href?: string;
}

const sectionLabels: Record<string, string> = {
  solutions: 'Solutions',
  applications: 'Applications',
  'customer-stories': 'Customer stories',
  knowledge: 'Knowledge',
  company: 'Company',
  products: 'Products',
  support: 'Customer support',
  partners: 'Partners',
  contact: 'Contact'
};

/** Path segments with the locale prefix removed. */
export function pathSegments(pathname: string): string[] {
  return pathname
    .split('/')
    .filter(Boolean)
    .filter((seg, i) => !(i === 0 && /^[a-z]{2}$/.test(seg)));
}

/** First-segment slug of the current top-level area, or null on the home page. */
export function activeSection(pathname: string): string | null {
  const [section] = pathSegments(pathname);
  return section && section in sectionLabels ? section : null;
}

/**
 * Active state for a primary-nav item. Returns 'page' for an exact match and
 * 'section' when the current page sits beneath that item, so the caller can
 * pick the right aria-current value.
 */
export function navItemState(itemHref: string, pathname: string): 'page' | 'section' | null {
  const [itemSection] = pathSegments(itemHref);
  const current = activeSection(pathname);
  if (!itemSection || !current || itemSection !== current) return null;
  return pathSegments(pathname).length === 1 ? 'page' : 'section';
}

/**
 * Page titles are written for search results, so they carry a site suffix and a
 * descriptive tail that read badly in a breadcrumb. Drop the suffix and keep the
 * subject before the first dash/colon. Pages whose title has no such delimiter
 * should pass an explicit `breadcrumbLabel`.
 */
export function shortLabel(title: string): string {
  const withoutSuffix = title.replace(/\s*\|\s*PCam\s*$/i, '').trim();
  const [subject] = withoutSuffix.split(/\s+[—–]\s+|:\s+/);
  return (subject || withoutSuffix).trim();
}

/**
 * Breadcrumb trail, or null when there is nothing useful to show — the home
 * page and section landing pages are already unambiguous from the nav
 * highlight, so a trail only appears from the second level down.
 */
export function breadcrumbFor(pathname: string, pageLabel: string, lang = 'en'): Crumb[] | null {
  const segments = pathSegments(pathname);
  if (segments.length < 2) return null;

  const section = segments[0];
  const label = sectionLabels[section];
  if (!label) return null;

  return [
    { label: 'Home', href: `/${lang}/` },
    { label, href: `/${lang}/${section}/` },
    { label: shortLabel(pageLabel) }
  ];
}
