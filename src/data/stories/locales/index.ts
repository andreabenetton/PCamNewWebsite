import type { Locale } from '../../i18n/config';
import type { StoryCopy } from '../types';
import enStoryCopyJson from './en.json';

export const storyCopyByLocale: Partial<Record<Locale, Record<string, StoryCopy>>> = {
  en: enStoryCopyJson as Record<string, StoryCopy>
};
