import React from 'react';
import { X, Minus, Plus, Trash2, CreditCard } from 'lucide-react';

function CartDrawer({ open, items, onClose, onInc, onDec, onRemove, onCheckout }) {
  const total = items.reduce((sum, it) => sum + it.product.price * it.qty, 0);
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white border-l border-gray-200 shadow-xl transform transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold">Keranjang</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-50">
            <X size={18} />
          </button>
        </div>
        <div className="h-[calc(100%-160px)] overflow-auto p-5 space-y-4">
          {items.length === 0 && (
            <div className="text-center text-gray-500">Keranjang masih kosong</div>
          )}
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-3">
              <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover border border-gray-200" />
              <div className="flex-1">
                <div className="font-medium text-gray-900 line-clamp-1">{product.name}</div>
                <div className="text-sm text-gray-500">{product.category}</div>
                <div className="mt-1 text-emerald-600 font-semibold">Rp {product.price.toLocaleString('id-ID')}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => onDec(product.id)} className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm w-8 text-center">{qty}</span>
                  <button onClick={() => onInc(product.id)} className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50">
                    <Plus size={14} />
                  </button>
                  <button onClick={() => onRemove(product.id)} className="ml-auto p-1.5 rounded-md border border-gray-200 hover:bg-red-50 text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 p-5 bg-white">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">Total</div>
            <div className="text-lg font-bold text-gray-900">Rp {total.toLocaleString('id-ID')}</div>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            <CreditCard size={18} />
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CartDrawer;
