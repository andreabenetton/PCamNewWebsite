import { getUiCopy } from './i18n/ui';
import { routePath, type RouteId } from './i18n/routes';
import { sourceLocale } from './i18n/config';

export { locales, implementedLocales, sourceLocale, defaultLocale, localeMeta } from './i18n/config';
export type { Locale } from './i18n/config';

export const primaryNavRouteIds = ['solutions', 'applications', 'customer-stories', 'knowledge', 'company'] as const satisfies readonly RouteId[];

/** English compatibility export; locale-aware components should use route IDs + UI copy. */
export const nav = primaryNavRouteIds.map((id) => {
  const ui = getUiCopy(sourceLocale);
  const labelKey = id === 'customer-stories' ? 'customerStories' : id;
  return { id, label: ui.nav[labelKey as keyof typeof ui.nav], href: routePath(id, sourceLocale) };
});

export const stats = [
  { value: '30+', label: 'years focused on tool & mould manufacturing' },
  { value: '1,500+', label: 'software customers reported by PCam' },
  { value: '180+', label: 'customers with integrated automation' },
  { value: '6', label: 'language markets in the current PCam network' }
];
