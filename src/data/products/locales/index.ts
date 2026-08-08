import type { Locale } from '../../i18n/config';
import type { ProductCopy } from '../types';
import enProductCopyJson from './en.json';

export const productCopyByLocale: Partial<Record<Locale, Record<string, ProductCopy>>> = {
  en: enProductCopyJson as Record<string, ProductCopy>
};
