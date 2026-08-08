import { useMemo, useState } from 'react';

type Product = { slug: string; name: string; eyebrow: string; category: string; summary: string; bestFor: string[]; path?: string };
type Labels = { filterLabel: string; categories: Record<string, string> };

export default function ProductFilter({ products, lang = 'en', labels }: { products: Product[]; lang?: string; labels: Labels }) {
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];
  const visible = useMemo(() => filter === 'all' ? products : products.filter((p) => p.category === filter), [filter, products]);

  return <>
    <div className="filter-bar" aria-label={labels.filterLabel}>
      {categories.map((category) => <button key={category} type="button" className="filter-button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{labels.categories[category] ?? category}</button>)}
    </div>
    <div className="product-grid">
      {visible.map((product) => <a key={product.slug} className="card product-card" href={product.path ?? `/${lang}/products/${product.slug}/`}>
        <span className="category">{product.eyebrow}</span>
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
        <div className="product-meta"><span>{product.bestFor[0]}</span><span aria-hidden="true">↗</span></div>
      </a>)}
    </div>
  </>;
}
