'use client';

import { useState, useEffect } from 'react';
import { BOS_DB } from '@/lib/db';

export default function About() {
  const [about, setAbout] = useState({
    title: 'Profil PT Berkat Optimal Semesta (BOS)',
    description: 'PT Berkat Optimal Semesta adalah perusahaan yang bergerak di bidang perdagangan dan distribusi produk elektronik dengan fokus pada tiga pilar utama bisnis: smart home solutions, power management systems, dan official distribution lighting products. Kami berkomitmen menyediakan produk berkualitas tinggi dari produsen global terbaik untuk memenuhi kebutuhan retail, komersial, dan proyek di Indonesia.',
    vision: 'Menjadi pemimpin pasar nasional dalam penyediaan solusi smart living dan pasokan kelistrikan terintegrasi melalui inovasi, keandalan, dan pelayanan purna jual terbaik.',
    mission: [
      'Menyediakan produk smart home & smart living modern yang efisien, nyaman, dan terjangkau.',
      'Mendistribusikan solusi kelistrikan stabilizer dan transformer berkualitas tinggi untuk keandalan daya.',
      'Menghadirkan sistem pencahayaan LED profesional dari brand global resmi terpercaya.',
      'Membangun kemitraan bisnis jangka panjang berdasarkan integritas, keandalan, dan kepuasan pelanggan.'
    ]
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const pages = await BOS_DB.getPages();
        if (pages && pages.about) {
          // Merge dynamic values but preserve arrays if they exist
          setAbout({
            title: pages.about.title || 'Profil PT Berkat Optimal Semesta (BOS)',
            description: pages.about.description || 'PT Berkat Optimal Semesta adalah perusahaan yang bergerak di bidang perdagangan dan distribusi produk elektronik dengan fokus pada tiga pilar utama bisnis...',
            vision: pages.about.vision || 'Menjadi pemimpin pasar nasional dalam penyediaan solusi smart living...',
            mission: (pages.about.mission && pages.about.mission.length > 0) ? pages.about.mission : [
              'Menyediakan produk smart home & smart living modern yang efisien, nyaman, dan terjangkau.',
              'Mendistribusikan solusi kelistrikan stabilizer dan transformer berkualitas tinggi untuk keandalan daya.',
              'Menghadirkan sistem pencahayaan LED profesional dari brand global resmi terpercaya.',
              'Membangun kemitraan bisnis jangka panjang berdasarkan integritas, keandalan, dan kepuasan pelanggan.'
            ]
          });
        }
      } catch (err) {
        console.error('Failed to load about data:', err);
      }
    };
    loadData();
  }, []);

  return (
    <>
      {/* Page Banner Section */}
      <section style={{ backgroundColor: 'var(--secondary-navy)', color: 'var(--pure-white)', padding: '120px 0 60px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(0, 210, 255, 0.1) 0%, transparent 60%)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-tag">PROFIL PERUSAHAAN</span>
          <h1 style={{ fontSize: '2.75rem', color: 'var(--pure-white)', marginTop: '8px' }}>{about.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1.05rem' }}>Mengenal lebih dekat PT Berkat Optimal Semesta (BOS) dan nilai-nilai korporat kami.</p>
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
              "Innovate • Optimize • Grow Together"
            </div>
            {/* CTA Button to download PDF Profile */}
            <a 
              href="/assets/BOS_Company_Profile.pdf" 
              download 
              className="btn btn-electric btn-shine"
              style={{ display: 'inline-flex', borderRadius: '6px', marginTop: '8px' }}
            >
              <i className="ri-file-download-line" style={{ fontSize: '1.15rem' }}></i> Unduh Company Profile (PDF)
            </a>
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
          <div style={{ backgroundColor: 'var(--pure-white)', padding: '48px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0,82,204,0.05)', color: 'var(--electric-blue)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
              <i className="ri-eye-line"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>Visi Kami</h3>
            <p style={{ color: 'var(--medium-gray)', lineHeight: '1.7', fontSize: '0.95rem', flexGrow: 1 }}>
              {about.vision}
            </p>
          </div>
          
          {/* Misi */}
          <div style={{ backgroundColor: 'var(--pure-white)', padding: '48px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0,82,204,0.05)', color: 'var(--electric-blue)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
              <i className="ri-compass-3-line"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>Misi Kami</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {about.mission?.map((item, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', color: 'var(--medium-gray)', fontSize: '0.92rem' }}>
                  <i className="ri-checkbox-circle-line" style={{ color: 'var(--neon-blue)', marginRight: '12px', fontSize: '1.2rem', flexShrink: 0, marginTop: '2px' }}></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values & Authorized Brand Partner Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--pure-white)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">NILAI UTAMA & PARTNER</span>
            <h2 className="section-title">Nilai-Nilai Korporat</h2>
            <p className="section-subtitle">Nilai-nilai fundamental yang melandasi setiap operasi dan pelayanan purna jual kami.</p>
          </div>

          <div className="responsive-grid-4" style={{ gap: '24px', textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ padding: '30px 20px', backgroundColor: 'var(--off-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.25rem', color: 'var(--electric-blue)', marginBottom: '16px' }}><i className="ri-lightbulb-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Innovation</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--medium-gray)', lineHeight: '1.5' }}>Mengadopsi teknologi pintar terbaru untuk kenyamanan dan produktivitas maksimal.</p>
            </div>
            <div style={{ padding: '30px 20px', backgroundColor: 'var(--off-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.25rem', color: 'var(--electric-blue)', marginBottom: '16px' }}><i className="ri-shield-check-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Reliability</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--medium-gray)', lineHeight: '1.5' }}>Memberikan produk orisinal standar internasional yang tahan lama dan aman digunakan.</p>
            </div>
            <div style={{ padding: '30px 20px', backgroundColor: 'var(--off-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.25rem', color: 'var(--electric-blue)', marginBottom: '16px' }}><i className="ri-line-chart-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Efficiency</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--medium-gray)', lineHeight: '1.5' }}>Mengurangi pemborosan energi dan mengoptimalkan proses bisnis untuk nilai terbaik.</p>
            </div>
            <div style={{ padding: '30px 20px', backgroundColor: 'var(--off-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.25rem', color: 'var(--electric-blue)', marginBottom: '16px' }}><i className="ri-shake-hands-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Integrity</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--medium-gray)', lineHeight: '1.5' }}>Menjalin kerja sama yang jujur, transparan, dan dapat diandalkan oleh para mitra bisnis.</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--light-gray)', paddingTop: '64px' }}>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', textAlign: 'center', marginBottom: '32px' }}>Authorized Distributor & Partner Resmi</h3>
            <div className="responsive-grid-4" style={{ gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--off-white)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.03)' }}>
                <span className="brand-logo-badge brand-osram" style={{ width: '100%', textAlign: 'center' }}>OSRAM</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Authorized Distributor</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--off-white)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.03)' }}>
                <span className="brand-logo-badge brand-ledvance" style={{ width: '100%', textAlign: 'center' }}>LEDVANCE</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Official Partner</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--off-white)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.03)' }}>
                <span className="brand-logo-badge brand-matsumega" style={{ width: '100%', textAlign: 'center' }}>MATSUMEGA</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Power Solutions</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--off-white)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.03)' }}>
                <span className="brand-logo-badge brand-mshita" style={{ width: '100%', textAlign: 'center' }}>M-SHITA</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Stabilizer Partner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legalitas & Sertifikasi */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--off-white)', borderTop: '1px solid var(--light-gray)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">KAPABILITAS KAMI</span>
            <h2 className="section-title">Kredibilitas & Legalitas</h2>
            <p className="section-subtitle">Sebagai entitas perseroan terbatas resmi, kami mengutamakan kepatuhan hukum dan mutu layanan prima.</p>
          </div>

          <div className="responsive-grid-3" style={{ gap: '30px', textAlign: 'center' }}>
            <div style={{ padding: '30px', backgroundColor: 'var(--pure-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--electric-blue)', marginBottom: '12px' }}><i className="ri-survey-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>PT Resmi Berbadan Hukum</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Terdaftar resmi di Kementerian Hukum dan HAM Republik Indonesia dengan legalitas lengkap.</p>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'var(--pure-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--electric-blue)', marginBottom: '12px' }}><i className="ri-shield-user-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Kemitraan Eksklusif China</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Hak pasokan eksklusif tangan pertama dari pabrik manufaktur teknologi kelistrikan & pintar di China.</p>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'var(--pure-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--electric-blue)', marginBottom: '12px' }}><i className="ri-service-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Layanan & After Sales</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Memiliki kantor fisik dan gudang distribusi di pusat industri Cikarang untuk mempermudah After Sales Support.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
