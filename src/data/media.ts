import media from './media.json';

export type ProductMedia = {
  target: string;
  legacyUrl: string;
  alt: string;
  source: 'mssql-blob' | 'wordpress-static';
  bundled?: boolean;
};

export const productMedia = media as Record<string, ProductMedia>;

/**
 * Stable editorial asset resolver.
 *
 * During local development assets are served from /public. When the final
 * media library moves to a Cloudflare custom domain backed by R2/Images,
 * set PUBLIC_MEDIA_BASE_URL at build time (for example
 * https://media.pcam.com). No product-page copy needs to change.
 */
export function mediaUrl(target: string) {
  const base = import.meta.env.PUBLIC_MEDIA_BASE_URL?.replace(/\/$/, '') ?? '';
  return base ? `${base}${target}` : target;
}
