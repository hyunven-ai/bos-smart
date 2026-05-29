'use client';

import { useState, useEffect } from 'react';
import { BOS_DB } from '@/lib/db';

export default function About() {
  const [about, setAbout] = useState({
    title: 'Profil PT Berkat Optimal Semesta (BOS SMART)',
    description: 'PT Berkat Optimal Semesta (BOS SMART) adalah perusahaan terkemuka yang bergerak di bidang penyediaan solusi hunian pintar (Smart Home), peralatan rumah tangga & dapur modern (Kitchen & Living), serta pasokan kelistrikan industri dan komersial (Electrical Supply). Kami bermitra langsung dengan produsen global terbaik di China untuk menghadirkan teknologi pintar yang andal, efisien, dan terjangkau bagi pasar Indonesia.',
    vision: 'Menjadi pemimpin pasar nasional dalam penyediaan solusi smart living dan pasokan kelistrikan terintegrasi melalui inovasi, keandalan, dan pelayanan purna jual terbaik.',
    mission: []
  });

  useEffect(() => {
    const pages = BOS_DB.getPages();
    if (pages && pages.about) {
      setAbout(pages.about);
    }
  }, []);

  return (
    <>
      {/* Page Banner Section */}
      <section style={{ backgroundColor: 'var(--secondary-navy)', color: 'var(--pure-white)', padding: '120px 0 60px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(0, 210, 255, 0.1) 0%, transparent 60%)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-tag">PROFIL PERUSAHAAN</span>
          <h1 style={{ fontSize: '2.75rem', color: 'var(--pure-white)', marginTop: '8px' }}>{about.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1.05rem' }}>Mengenal lebih dekat PT Berkat Optimal Semesta (BOS SMART) dan visi masa depan kami.</p>
        </div>
      </section>

      {/* Profil Utama */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--pure-white)' }}>
        <div className="container responsive-grid-2" style={{ gap: '60px', alignItems: 'center' }}>
          <div>
            <span className="section-tag" style={{ textAlign: 'left' }}>SIAPA KAMI</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-navy)', marginBottom: '24px' }}>PT Berkat Optimal Semesta</h2>
            <p style={{ color: 'var(--medium-gray)', lineHeight: '1.7', marginBottom: '24px', fontSize: '0.95rem' }}>
              {about.description}
            </p>
            <div style={{ borderLeft: '3px solid var(--electric-blue)', paddingLeft: '20px', fontStyle: 'italic', color: 'var(--primary-navy)', fontWeight: 500, fontSize: '1.05rem', marginBottom: '24px' }}>
              "Menghubungkan teknologi global untuk efisiensi energi dan kemudahan gaya hidup modern Anda."
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', top: '15px', left: '15px', border: '2px solid var(--electric-blue)', borderRadius: '16px', zIndex: 1 }}></div>
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" alt="Corporate Office" style={{ position: 'relative', zIndex: 2, borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--off-white)', borderTop: '1px solid var(--light-gray)', borderBottom: '1px solid var(--light-gray)' }}>
        <div className="container responsive-grid-2" style={{ gap: '50px' }}>
          {/* Visi */}
          <div style={{ backgroundColor: 'var(--pure-white)', padding: '48px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0,82,204,0.05)', color: 'var(--electric-blue)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
              <i className="ri-eye-line"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>Visi Kami</h3>
            <p style={{ color: 'var(--medium-gray)', lineHeight: '1.7', fontSize: '0.95rem' }}>
              {about.vision}
            </p>
          </div>
          
          {/* Misi */}
          <div style={{ backgroundColor: 'var(--pure-white)', padding: '48px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0,82,204,0.05)', color: 'var(--electric-blue)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
              <i className="ri-compass-3-line"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>Misi Kami</h3>
            <ul style={{ listStyle: 'none' }}>
              {about.mission?.map((item, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <i className="ri-checkbox-circle-line" style={{ color: 'var(--neon-blue)', marginRight: '12px', fontSize: '1.2rem' }}></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Legalitas & Sertifikasi */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--pure-white)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">KAPABILITAS KAMI</span>
            <h2 className="section-title">Kredibilitas & Legalitas</h2>
            <p className="section-subtitle">Sebagai entitas perseroan terbatas resmi, kami mengutamakan kepatuhan hukum dan mutu layanan prima.</p>
          </div>

          <div className="responsive-grid-3" style={{ gap: '30px', textAlign: 'center' }}>
            <div style={{ padding: '30px', backgroundColor: 'var(--off-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--electric-blue)', marginBottom: '12px' }}><i className="ri-survey-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>PT Resmi Berbadan Hukum</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Terdaftar resmi di Kementerian Hukum dan HAM Republik Indonesia dengan legalitas lengkap.</p>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'var(--off-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--electric-blue)', marginBottom: '12px' }}><i className="ri-shield-user-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Kemitraan Eksklusif China</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Hak pasokan eksklusif tangan pertama dari pabrik manufaktur teknologi kelistrikan & pintar di China.</p>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'var(--off-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--electric-blue)', marginBottom: '12px' }}><i className="ri-service-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Layanan di Cikarang</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Memiliki kantor fisik dan gudang distribusi di pusat industri Cikarang untuk mempermudah After Sales Support.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
