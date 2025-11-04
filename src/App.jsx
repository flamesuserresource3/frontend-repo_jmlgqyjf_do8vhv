import React, { useMemo, useState } from 'react';
import TopNav from './components/TopNav';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]); // { product, qty }

  const products = useMemo(
    () => [
      {
        id: 1,
        name: 'Headphone Nirkabel Pro',
        price: 599000,
        rating: 4.8,
        sold: 1223,
        category: 'Elektronik',
        image:
          'https://images.unsplash.com/photo-1518443870394-84ec6f0815c5?q=80&w=1200&auto=format&fit=crop',
        description:
          'Headphone nirkabel dengan peredam bising aktif, baterai hingga 30 jam, dan suara jernih untuk musik dan panggilan.',
      },
      {
        id: 2,
        name: 'Sepatu Lari AirFlex',
        price: 449000,
        rating: 4.6,
        sold: 874,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
        description: 'Sepatu lari ringan dengan bantalan udara dan outsole anti-slip. Cocok untuk olahraga maupun harian.',
      },
      {
        id: 3,
        name: 'Kopi Arabika Premium 500g',
        price: 129000,
        rating: 4.7,
        sold: 2103,
        category: 'Makanan & Minuman',
        image: 'https://images.unsplash.com/photo-1616783943928-32f4e1e16147?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxLb3BpJTIwQXJhYmlrYSUyMFByZW1pdW0lMjA1MDBnfGVufDB8MHx8fDE3NjIyNTY4NTV8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
        description: 'Biji kopi arabika pilihan dengan profil rasa cokelat dan karamel. Sangrai medium, cocok untuk pour-over.',
      },
      {
        id: 4,
        name: 'Mixer Dapur Compact 5L',
        price: 799000,
        rating: 4.5,
        sold: 342,
        category: 'Peralatan Rumah',
        image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1200&auto=format&fit=crop',
        description: 'Mixer dapur serbaguna dengan 6 kecepatan, mangkuk stainless 5L, dan 3 attachment untuk adonan.',
      },
      {
        id: 5,
        name: 'Smartwatch Health+ Series',
        price: 899000,
        rating: 4.4,
        sold: 516,
        category: 'Elektronik',
        image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop',
        description: 'Pantau detak jantung, tidur, dan olahraga. Tahan air IP68 dengan baterai hingga 10 hari.',
      },
      {
        id: 6,
        name: 'Tas Ransel Urban 25L',
        price: 259000,
        rating: 4.6,
        sold: 948,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1643468609392-a49f9678335c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxUYXMlMjBSYW5zZWwlMjBVcmJhbiUyMDI1THxlbnwwfDB8fHwxNzYyMjU2ODU1fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
        description: 'Ransel minimalis dengan ruang laptop 15", bahan tahan air, dan banyak kompartemen.',
      },
      {
        id: 7,
        name: 'Panci Set Granite 8pcs',
        price: 679000,
        rating: 4.5,
        sold: 423,
        category: 'Peralatan Rumah',
        image: 'https://images.unsplash.com/photo-1481988535861-271139e06469?q=80&w=1200&auto=format&fit=crop',
        description: 'Set panci granite anti lengket berkualitas, bebas PFOA, aman untuk induksi.',
      },
      {
        id: 8,
        name: 'Granola Almond & Berry 1kg',
        price: 159000,
        rating: 4.7,
        sold: 1102,
        category: 'Makanan & Minuman',
        image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1200&auto=format&fit=crop',
        description: 'Granola sehat tinggi serat dengan almond panggang dan buah beri kering, tanpa gula tambahan.',
      },
    ],
    []
  );

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((it) => it.product.id === product.id);
      if (found) {
        return prev.map((it) => (it.product.id === product.id ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const incQty = (id) => setCart((prev) => prev.map((it) => (it.product.id === id ? { ...it, qty: it.qty + 1 } : it)));
  const decQty = (id) =>
    setCart((prev) =>
      prev
        .map((it) => (it.product.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it))
        .filter((it) => it.qty > 0)
    );
  const removeItem = (id) => setCart((prev) => prev.filter((it) => it.product.id !== id));

  const cartCount = cart.reduce((sum, it) => sum + it.qty, 0);

  const handleCheckout = () => {
    alert('Terima kasih! Pesanan Anda diproses. (Demo)');
    setCart([]);
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNav brand="charli mart" cartCount={cartCount} onSearch={setSearch} onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <ProductGrid
        products={products}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAddToCart={(p) => {
          addToCart(p);
        }}
        searchTerm={search}
      />

      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-semibold">charli mart</span>
            <span>•</span>
            <span className="text-sm">Belanja mudah & aman</span>
          </div>
          <div className="text-sm text-gray-500">© {new Date().getFullYear()} charli mart. All rights reserved.</div>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onInc={incQty}
        onDec={decQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
