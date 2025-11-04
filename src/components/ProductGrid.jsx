import React, { useMemo, useState } from 'react';
import { Star, Plus, X } from 'lucide-react';

function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition" />
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500">{product.category}</div>
        <h3 className="mt-1 font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-emerald-600 font-bold">Rp {product.price.toLocaleString('id-ID')}</div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={16} className="fill-amber-400" />
            <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <button
          onClick={() => onAdd(product)}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Plus size={16} /> Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}

function ProductGrid({ products, categories, activeCategory, onCategoryChange, onAddToCart, searchTerm }) {
  const [quickView, setQuickView] = useState(null);

  const visibleProducts = useMemo(() => {
    let list = products;
    if (activeCategory && activeCategory !== 'Semua') {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return list;
  }, [products, activeCategory, searchTerm]);

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Produk Pilihan</h2>
        <div id="categories" className="flex flex-wrap gap-2">
          {['Semua', ...categories].map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className={`px-3 py-1.5 rounded-full border ${
                activeCategory === c ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visibleProducts.map((p) => (
          <div key={p.id}>
            <ProductCard product={p} onAdd={(prod) => onAddToCart(prod)} />
            <button
              className="mt-2 text-sm text-gray-600 hover:text-emerald-700"
              onClick={() => setQuickView(p)}
            >
              Lihat detail
            </button>
          </div>
        ))}
      </div>

      {quickView && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4">
          <div className="relative max-w-2xl w-full bg-white rounded-xl overflow-hidden shadow-xl">
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 border border-gray-200 hover:bg-white"
            >
              <X size={18} />
            </button>
            <div className="grid md:grid-cols-2">
              <img src={quickView.image} alt={quickView.name} className="w-full h-64 md:h-full object-cover" />
              <div className="p-5">
                <div className="text-xs text-gray-500">{quickView.category}</div>
                <h3 className="mt-1 text-2xl font-bold">{quickView.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Star size={18} className="fill-amber-400 text-amber-500" />
                  <span className="text-gray-700">{quickView.rating.toFixed(1)} • Terjual {quickView.sold.toLocaleString('id-ID')}</span>
                </div>
                <div className="mt-4 text-emerald-600 text-2xl font-extrabold">Rp {quickView.price.toLocaleString('id-ID')}</div>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {quickView.description}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(quickView);
                      setQuickView(null);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <Plus size={16} /> Tambah ke Keranjang
                  </button>
                  <button
                    onClick={() => setQuickView(null)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
