export function localizedPath(path: string, lang = 'en') {
  if (!path.startsWith('/')) return path;
  if (/^\/[a-z]{2}\//.test(path)) return path.replace(/^\/[a-z]{2}\//, `/${lang}/`);
  return `/${lang}${path}`.replace(/\/+/g, '/');
}
