import React from 'react';
import { ShoppingCart, Search, User } from 'lucide-react';

function TopNav({ brand = 'charli mart', cartCount = 0, onSearch, onOpenCart }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white grid place-items-center font-bold">CM</div>
          <span className="text-xl font-semibold tracking-tight">{brand}</span>
        </div>

        <div className="flex-1">
          <label className="relative block max-w-2xl mx-auto">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Cari produk, kategori, atau brand..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <User size={18} />
            <span className="text-sm">Masuk</span>
          </button>
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
          >
            <ShoppingCart size={18} />
            <span className="text-sm">Keranjang</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[11px] bg-white text-emerald-600 border border-emerald-600 rounded-full w-5 h-5 grid place-items-center font-medium">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
