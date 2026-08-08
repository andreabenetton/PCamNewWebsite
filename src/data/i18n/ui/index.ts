import type { Locale } from '../config';
import type { UiCopy } from './types';
import enUiJson from './en.json';

const copy: Partial<Record<Locale, UiCopy>> = {
  en: enUiJson as UiCopy
};

export function getUiCopy(locale: Locale): UiCopy {
  const value = copy[locale];
  if (!value) throw new Error(`UI copy for published locale ${locale} is missing`);
  return value;
}

export const uiCopyByLocale = copy;
export type { UiCopy } from './types';
