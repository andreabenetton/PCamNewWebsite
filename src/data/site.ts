export const locales = ['en', 'de', 'it', 'fr', 'es', 'pt'] as const;
export type Locale = typeof locales[number];

export const implementedLocales: Locale[] = ['en'];

export const nav = [
  { label: 'Solutions', href: '/en/solutions/' },
  { label: 'Applications', href: '/en/applications/' },
  { label: 'Customer stories', href: '/en/customer-stories/' },
  { label: 'Knowledge', href: '/en/knowledge/' },
  { label: 'Company', href: '/en/company/' }
];

export const stats = [
  { value: '30+', label: 'years focused on tool & mould manufacturing' },
  { value: '1,500+', label: 'software customers reported by PCam' },
  { value: '180+', label: 'customers with integrated automation' },
  { value: '6', label: 'language markets in the current PCam network' }
];
