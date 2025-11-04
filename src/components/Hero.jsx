import React from 'react';
import { Star, Rocket } from 'lucide-react';

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              <Star size={16} className="fill-emerald-600 text-emerald-600" />
              Diskon Besar Akhir Tahun
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
              Belanja apa saja, kapan saja, di
              <span className="text-emerald-600"> charli mart</span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Temukan jutaan produk dengan harga terbaik. Pengiriman cepat, pembayaran aman,
              dan dukungan pelanggan 24/7. Mulai belanja sekarang!
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#products" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
                <Rocket size={18} />
                Mulai Belanja
              </a>
              <a href="#categories" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                Lihat Kategori
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1500&auto=format&fit=crop"
                alt="Promo banner"
                className="rounded-xl w-full h-64 object-cover"
              />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {['Elektronik', 'Fashion', 'Kebutuhan Rumah'].map((c) => (
                  <div key={c} className="rounded-lg border border-gray-200 p-3 text-center text-sm text-gray-700 hover:bg-gray-50">
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
