import routesJson from './routes.json';
import type { Locale } from './config';
import { implementedLocales } from './config';

export type RouteId = keyof typeof routesJson;

type RouteDefinition = {
  sitemap: boolean;
  paths: Partial<Record<Locale, string>>;
};

export const routeRegistry = routesJson as Record<RouteId, RouteDefinition>;

function normalized(path: string): string {
  const bare = path.split('#', 1)[0].split('?', 1)[0] || '/';
  if (bare === '/') return '/';
  return `${bare.replace(/\/+$/, '')}/`;
}

export function routePath(id: RouteId, locale: Locale): string {
  const path = routeRegistry[id]?.paths[locale];
  if (!path) throw new Error(`Missing ${locale} route for ${id}`);
  return path;
}

export function tryRoutePath(id: RouteId, locale: Locale): string | undefined {
  return routeRegistry[id]?.paths[locale];
}

export function routeIdForPath(path: string): RouteId | undefined {
  const target = normalized(path);
  for (const [id, definition] of Object.entries(routeRegistry) as [RouteId, RouteDefinition][]) {
    if (Object.values(definition.paths).some((candidate) => candidate && normalized(candidate) === target)) return id;
  }
  return undefined;
}

export function staticAlternatesForPath(path: string): { locale: Locale; path: string }[] | undefined {
  const id = routeIdForPath(path);
  if (!id) return undefined;
  return implementedLocales.flatMap((locale) => {
    const target = tryRoutePath(id, locale);
    return target ? [{ locale, path: target }] : [];
  });
}

export function sitemapStaticRoutes(): { locale: Locale; routeId: RouteId; path: string }[] {
  const rows: { locale: Locale; routeId: RouteId; path: string }[] = [];
  for (const [routeId, definition] of Object.entries(routeRegistry) as [RouteId, RouteDefinition][]) {
    if (!definition.sitemap) continue;
    for (const locale of implementedLocales) {
      const path = definition.paths[locale];
      if (path) rows.push({ locale, routeId, path });
    }
  }
  return rows;
}
