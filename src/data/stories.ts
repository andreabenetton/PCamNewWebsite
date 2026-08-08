import { implementedLocales, sourceLocale, type Locale } from './i18n/config';
import { routePath } from './i18n/routes';
import { getProductById } from './products';
import storyFactsJson from './stories/facts.json';
import type { StoryFacts } from './stories/types';

const storyFacts = storyFactsJson as StoryFacts[];
import { storyCopyByLocale } from './stories/locales';
import type { Story, StoryCopy } from './stories/types';

export type { Story, StoryCopy, StoryFacts } from './stories/types';

export function getStoryCopy(id: string, locale: Locale): StoryCopy {
  const localeCopy = storyCopyByLocale[locale];
  if (!localeCopy) throw new Error(`Story copy for published locale ${locale} is missing`);
  const copy = localeCopy[id];
  if (!copy) throw new Error(`Missing ${locale} story copy for canonical story ${id}`);
  return copy;
}

export function storyPath(id: string, locale: Locale): string {
  const copy = getStoryCopy(id, locale);
  return `${routePath('customer-stories', locale)}${copy.slug}/`;
}

function assembleStory(id: string, locale: Locale): Story {
  const facts = storyFacts.find((item) => item.id === id);
  if (!facts) throw new Error(`Unknown canonical story ${id}`);
  const copy = getStoryCopy(id, locale);
  const quote = copy.quote ?? (facts.reportedQuote?.locale === locale ? facts.reportedQuote.text : undefined);
  const products = facts.productIds.map((productId) => getProductById(productId, locale)?.name ?? productId);
  return {
    ...facts,
    ...copy,
    locale,
    copyRevision: copy.revision,
    reviewedAgainstRevision: copy.reviewedAgainstRevision,
    quote,
    products,
    path: storyPath(id, locale)
  };
}

export function getStories(locale: Locale): Story[] {
  return storyFacts.map((facts) => assembleStory(facts.id, locale));
}

export function getStoryById(id: string, locale: Locale): Story | undefined {
  return storyFacts.some((facts) => facts.id === id) ? assembleStory(id, locale) : undefined;
}

export function getStoryBySlug(slug: string, locale: Locale): Story | undefined {
  const localeCopy = storyCopyByLocale[locale];
  const entry = Object.entries(localeCopy ?? {}).find(([, copy]) => copy.slug === slug);
  return entry ? assembleStory(entry[0], locale) : undefined;
}

export function storyIdForPath(path: string): string | undefined {
  for (const locale of implementedLocales) {
    const base = routePath('customer-stories', locale);
    if (!path.startsWith(base)) continue;
    const slug = path.slice(base.length).replace(/\/+$/, '');
    const story = getStoryBySlug(slug, locale);
    if (story) return story.id;
  }
  return undefined;
}

export function storyAlternatePaths(path: string): { locale: Locale; path: string }[] | undefined {
  const id = storyIdForPath(path);
  if (!id) return undefined;
  return implementedLocales.flatMap((locale) => {
    try { return [{ locale, path: storyPath(id, locale) }]; }
    catch { return []; }
  });
}

/** English compatibility export for pages not yet converted to locale-aware data access. */
export const stories = getStories(sourceLocale);
