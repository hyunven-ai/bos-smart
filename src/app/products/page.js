'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BOS_DB } from '@/lib/db';
import ProductModal from '@/components/ProductModal';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [whatsapp, setWhatsapp] = useState('628123456789');

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const dbProducts = BOS_DB.getProducts();
    const dbCategories = BOS_DB.getCategories();
    const settings = BOS_DB.getSettings();

    if (dbProducts) setProducts(dbProducts);
    if (dbCategories) setCategories(dbCategories);
    if (settings && settings.whatsapp) setWhatsapp(settings.whatsapp);

    // Tangkap category parameter dari URL jika ada
    const catParam = searchParams.get('category');
    if (catParam) {
      setActiveFilter(catParam);
    }
  }, [searchParams]);

  // Handler Filter & Search
  const filteredProducts = products.filter(p => {
    if (p.status === 'hide') return false;

    const matchesCategory = (activeFilter === 'all' || p.category === activeFilter);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.specs && p.specs.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.name : catId;
  };

  return (
    <>
      {/* Page Banner Section */}
      <section style={{ backgroundColor: 'var(--secondary-navy)', color: 'var(--pure-white)', padding: '120px 0 60px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(0, 210, 255, 0.1) 0%, transparent 60%)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-tag">KATALOG PRODUK</span>
          <h1 style={{ fontSize: '2.75rem', color: 'var(--pure-white)', marginTop: '8px' }}>Koleksi Produk Terbaik</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1.05rem' }}>Temukan solusi perangkat pintar kelistrikan dan peralatan rumah tangga bersertifikasi.</p>
        </div>
      </section>

      {/* Main Catalog Content */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--off-white)' }}>
        <div className="container">

          {/* Search Box */}
          <div
            style={{
              maxWidth: '500px',
              margin: '0 auto 40px',
              position: 'relative'
            }}
          >
            <i className="ri-search-line" style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', color: 'var(--medium-gray)', fontSize: '1.2rem' }}></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 50px',
                borderRadius: '30px',
                border: '1px solid var(--light-gray)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                outline: 'none',
                transition: 'var(--transition-fast)'
              }}
              placeholder="Cari nama produk atau spesifikasi teknis..."
            />
          </div>

          {/* Filter Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '40px'
            }}
          >
            <button
              onClick={() => setActiveFilter('all')}
              style={{
                padding: '10px 24px',
                border: '1px solid var(--light-gray)',
                backgroundColor: activeFilter === 'all' ? 'var(--electric-blue)' : 'var(--pure-white)',
                color: activeFilter === 'all' ? 'var(--pure-white)' : 'var(--medium-gray)',
                borderRadius: '30px',
                fontFamily: 'var(--font-headings)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: activeFilter === 'all' ? '0 4px 15px rgba(0, 82, 204, 0.25)' : 'none',
                transition: 'var(--transition-fast)'
              }}
            >
              Semua Kategori
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  padding: '10px 24px',
                  border: '1px solid var(--light-gray)',
                  backgroundColor: activeFilter === cat.id ? 'var(--electric-blue)' : 'var(--pure-white)',
                  color: activeFilter === cat.id ? 'var(--pure-white)' : 'var(--medium-gray)',
                  borderRadius: '30px',
                  fontFamily: 'var(--font-headings)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: activeFilter === cat.id ? '0 4px 15px rgba(0, 82, 204, 0.25)' : 'none',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Category Banner Card */}
          <div
            style={{
              backgroundColor: 'var(--pure-white)',
              borderRadius: '16px',
              padding: '30px 40px',
              marginBottom: '45px',
              border: '1px solid rgba(0, 82, 204, 0.06)',
              boxShadow: '0 10px 30px rgba(10, 37, 64, 0.03)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: 'linear-gradient(135deg, rgba(0, 82, 204, 0.01) 0%, rgba(0, 210, 255, 0.02) 100%)'
            }}
          >
            {/* Elegant top line decoration */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundImage: 'linear-gradient(90deg, var(--electric-blue), var(--neon-blue))' }}></div>

            <span style={{
              fontSize: '0.8rem',
              color: 'var(--electric-blue)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              display: 'inline-block',
              marginBottom: '10px',
              backgroundColor: 'rgba(0, 82, 204, 0.06)',
              padding: '4px 14px',
              borderRadius: '20px',
              fontFamily: 'var(--font-headings)'
            }}>
              {activeFilter === 'all' ? 'KATALOG LENGKAP' : 'KATEGORI TERPILIH'}
            </span>
            <h2 style={{
              fontSize: '2rem',
              color: 'var(--primary-navy)',
              fontWeight: 800,
              margin: '0 0 8px',
              fontFamily: 'var(--font-headings)',
              letterSpacing: '-0.5px'
            }}>
              {activeFilter === 'all' ? 'Semua Produk' : getCategoryName(activeFilter)}
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--medium-gray)',
              fontStyle: 'italic',
              margin: 0,
              maxWidth: '650px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.5
            }}>
              {activeFilter === 'all'
                ? 'Menampilkan seluruh koleksi produk pintar, kelistrikan, dan peralatan rumah tangga terbaik dari BOS SMART.'
                : (categories.find(c => c.id === activeFilter)?.desc || '')}
            </p>
          </div>

          {/* Products Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '30px',
              marginBottom: '80px'
            }}
          >
            {filteredProducts.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', color: 'var(--medium-gray)' }}>
                <i className="ri-search-line" style={{ fontSize: '3rem', color: 'var(--light-gray)', display: 'block', marginBottom: '16px' }}></i>
                <h3>Produk Tidak Ditemukan</h3>
                <p>Coba gunakan kata kunci lain atau pilih kategori yang berbeda.</p>
              </div>
            ) : (
              filteredProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  style={{
                    backgroundColor: 'var(--pure-white)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                    transition: 'var(--transition-normal)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.06)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(10, 37, 64, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(0, 82, 204, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div style={{ height: '200px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--primary-navy)' }}>
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-normal)' }} />
                    <span style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '0.7rem', backgroundColor: 'var(--primary-navy)', color: 'var(--pure-white)', padding: '4px 10px', borderRadius: '12px', fontWeight: 700, fontFamily: 'var(--font-headings)' }}>
                      {getCategoryName(p.category)}
                    </span>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', fontWeight: 700, color: 'var(--primary-navy)', lineHeight: 1.4, height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {p.name}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)', marginBottom: '16px', flexGrow: 1, height: '54px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                      {p.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--off-white)', paddingTop: '12px' }}>
                      <span style={{ color: 'var(--electric-blue)', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-headings)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Detail Produk <i className="ri-arrow-right-line"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          categoryName={getCategoryName(selectedProduct.category)}
          whatsappNumber={whatsapp}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--medium-gray)' }}>Memuat Katalog Produk...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
