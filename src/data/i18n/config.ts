import localeConfig from './locales.json';

export type Locale = keyof typeof localeConfig.locales;
export const locales = Object.keys(localeConfig.locales) as Locale[];
export const sourceLocale = localeConfig.sourceLocale as Locale;
export const defaultLocale = localeConfig.defaultLocale as Locale;
export const implementedLocales = Object.entries(localeConfig.locales)
  .filter(([, meta]) => meta.implemented)
  .map(([locale]) => locale as Locale);

export const localeMeta = localeConfig.locales;

export function isLocale(value: string): value is Locale {
  return value in localeMeta;
}

export function asLocale(value: string | undefined | null): Locale {
  if (value && isLocale(value)) return value;
  return defaultLocale;
}
