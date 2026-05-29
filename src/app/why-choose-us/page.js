'use client';

import { useState, useEffect } from 'react';
import { BOS_DB } from '@/lib/db';

export default function WhyChooseUs() {
  const [content, setContent] = useState({
    title: 'Mengapa Memilih Kami?',
    description: 'Komitmen penuh kami dalam menghadirkan rantai pasok terintegrasi untuk kepuasan bisnis Anda.',
    pillars: []
  });

  useEffect(() => {
    const pages = BOS_DB.getPages();
    if (pages && pages.whyChooseUs) {
      setContent(pages.whyChooseUs);
    }
  }, []);

  const icons = {
    sourcing: 'ri-global-line',
    qc: 'ri-shield-check-line',
    price: 'ri-price-tag-3-line',
    support: 'ri-customer-service-2-line',
    complete: 'ri-briefcase-line',
    partnership: 'ri-handshake-line'
  };

  return (
    <>
      {/* Page Banner Section */}
      <section style={{ backgroundColor: 'var(--secondary-navy)', color: 'var(--pure-white)', padding: '120px 0 60px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(0, 210, 255, 0.1) 0%, transparent 60%)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-tag">KEUNGGULAN UTAMA</span>
          <h1 style={{ fontSize: '2.75rem', color: 'var(--pure-white)', marginTop: '8px' }}>{content.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1.05rem' }}>{content.description}</p>
        </div>
      </section>

      {/* 6 Pillars Deep Dive Grid */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--pure-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {content.pillars?.map((pillar) => {
              const icon = icons[pillar.id] || 'ri-checkbox-circle-line';
              return (
                <div key={pillar.id} className="why-pillar" style={{ padding: '35px 30px' }}>
                  <div className="why-pillar-icon" style={{ width: '54px', height: '54px', fontSize: '1.6rem' }}><i className={icon}></i></div>
                  <h3 className="why-pillar-title" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{pillar.title}</h3>
                  <p className="why-pillar-desc" style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sourcing and QC Process Flowchart */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--off-white)', borderTop: '1px solid var(--light-gray)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">ALUR KERJA</span>
            <h2 className="section-title">Prosedur Quality & Sourcing Kami</h2>
            <p className="section-subtitle">Bagaimana kami mengawal kualitas produk dari manufaktur global hingga tiba di gudang operasional Anda.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center', position: 'relative' }}>
            {/* Step 1 */}
            <div style={{ backgroundColor: 'var(--pure-white)', padding: '30px 20px', borderRadius: '12px', border: '1px solid var(--light-gray)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-navy)', color: 'var(--pure-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: 700 }}>1</div>
              <h4 style={{ marginBottom: '8px', color: 'var(--primary-navy)' }}>Pabrik Terverifikasi</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Menjalin kemitraan langsung hanya dengan manufaktur di China berstandar internasional.</p>
            </div>
            {/* Step 2 */}
            <div style={{ backgroundColor: 'var(--pure-white)', padding: '30px 20px', borderRadius: '12px', border: '1px solid var(--light-gray)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-navy)', color: 'var(--pure-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: 700 }}>2</div>
              <h4 style={{ marginBottom: '8px', color: 'var(--primary-navy)' }}>Uji Kelayakan (QC)</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Melakukan inspeksi batch fisik dan uji fungsi teknis kelistrikan sebelum pemuatan.</p>
            </div>
            {/* Step 3 */}
            <div style={{ backgroundColor: 'var(--pure-white)', padding: '30px 20px', borderRadius: '12px', border: '1px solid var(--light-gray)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-navy)', color: 'var(--pure-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: 700 }}>3</div>
              <h4 style={{ marginBottom: '8px', color: 'var(--primary-navy)' }}>Pengiriman Aman</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Prosedur logistik handal guna menjamin perlengkapan tiba dalam keadaan sempurna.</p>
            </div>
            {/* Step 4 */}
            <div style={{ backgroundColor: 'var(--pure-white)', padding: '30px 20px', borderRadius: '12px', border: '1px solid var(--light-gray)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-navy)', color: 'var(--pure-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: 700 }}>4</div>
              <h4 style={{ marginBottom: '8px', color: 'var(--primary-navy)' }}>Garansi Penuh</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Dukungan garansi resmi ganti baru / perbaikan responsif oleh teknisi kami di Indonesia.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
