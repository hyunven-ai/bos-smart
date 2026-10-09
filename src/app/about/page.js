'use client';

import { useState, useEffect } from 'react';
import { BOS_DB } from '@/lib/db';

export default function About() {
  const [about, setAbout] = useState({
    title: 'Profil PT Berkat Optimal Semesta (BOS SMART)',
    description: `PT Berkat Optimal Semesta (BOS SMART) adalah perusahaan yang bergerak di bidang Lighting & Power Solutions, dengan fokus pada solusi pencahayaan profesional, Architectural & Façade Lighting, serta Stabilizer & Transformer untuk kebutuhan komersial, industri, dan proyek.\n\nKami bekerja sama dengan mitra manufaktur terpercaya, baik lokal maupun internasional, untuk menghadirkan solusi yang andal, efisien, dan sesuai dengan kebutuhan setiap proyek di Indonesia.`,
    vision: 'Menjadi perusahaan terpercaya dalam penyediaan Lighting & Power Solutions untuk kebutuhan komersial, industri, dan proyek di Indonesia melalui kualitas, keandalan, dan pelayanan yang berkelanjutan.',
    mission: [
      'Menyediakan solusi Professional Lighting, Architectural & Façade Lighting, serta Stabilizer & Transformer yang berkualitas dan sesuai dengan kebutuhan pelanggan.',
      'Bekerja sama dengan mitra manufaktur lokal dan internasional terpercaya untuk menghadirkan produk dan solusi yang andal.',
      'Memberikan solusi yang tepat melalui pemilihan produk dan spesifikasi yang sesuai dengan kebutuhan setiap aplikasi dan proyek.',
      'Memberikan after-sales support yang responsif, profesional, dan berorientasi pada hubungan jangka panjang dengan pelanggan.'
    ]
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const pages = await BOS_DB.getPages();
        if (pages && pages.about) {
          setAbout({
            title: pages.about.title || 'Profil PT Berkat Optimal Semesta (BOS SMART)',
            description: pages.about.description || `PT Berkat Optimal Semesta (BOS SMART) adalah perusahaan yang bergerak di bidang Lighting & Power Solutions, dengan fokus pada solusi pencahayaan profesional, Architectural & Façade Lighting, serta Stabilizer & Transformer untuk kebutuhan komersial, industri, dan proyek.\n\nKami bekerja sama dengan mitra manufaktur terpercaya, baik lokal maupun internasional, untuk menghadirkan solusi yang andal, efisien, dan sesuai dengan kebutuhan setiap proyek di Indonesia.`,
            vision: pages.about.vision || 'Menjadi perusahaan terpercaya dalam penyediaan Lighting & Power Solutions untuk kebutuhan komersial, industri, dan proyek di Indonesia melalui kualitas, keandalan, dan pelayanan yang berkelanjutan.',
            mission: (pages.about.mission && pages.about.mission.length > 0) ? pages.about.mission : [
              'Menyediakan solusi Professional Lighting, Architectural & Façade Lighting, serta Stabilizer & Transformer yang berkualitas dan sesuai dengan kebutuhan pelanggan.',
              'Bekerja sama dengan mitra manufaktur lokal dan internasional terpercaya untuk menghadirkan produk dan solusi yang andal.',
              'Memberikan solusi yang tepat melalui pemilihan produk dan spesifikasi yang sesuai dengan kebutuhan setiap aplikasi dan proyek.',
              'Memberikan after-sales support yang responsif, profesional, dan berorientasi pada hubungan jangka panjang dengan pelanggan.'
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
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1.05rem' }}>Mengenal lebih dekat PT Berkat Optimal Semesta (BOS SMART) dan keahlian kami di bidang Lighting & Power Solutions.</p>
        </div>
      </section>

      {/* Profil Utama (Siapa Kami) */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--pure-white)' }}>
        <div className="container responsive-grid-2" style={{ gap: '60px', alignItems: 'center' }}>
          <div>
            <span className="section-tag" style={{ textAlign: 'left' }}>SIAPA KAMI</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-navy)', marginBottom: '24px' }}>PT Berkat Optimal Semesta</h2>
            <div style={{ color: 'var(--medium-gray)', lineHeight: '1.7', marginBottom: '24px', fontSize: '0.95rem' }}>
              <p style={{ marginBottom: '16px' }}>
                PT Berkat Optimal Semesta (BOS SMART) adalah perusahaan yang bergerak di bidang Lighting & Power Solutions, dengan fokus pada solusi pencahayaan profesional, Architectural & Façade Lighting, serta Stabilizer & Transformer untuk kebutuhan komersial, industri, dan proyek.
              </p>
              <p>
                Kami bekerja sama dengan mitra manufaktur terpercaya, baik lokal maupun internasional, untuk menghadirkan solusi yang andal, efisien, dan sesuai dengan kebutuhan setiap proyek di Indonesia.
              </p>
            </div>
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
            <img 
              src="/about_lighting.jpg" 
              alt="Architectural & Façade Lighting Showcase" 
              style={{ position: 'relative', zIndex: 2, borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
            />
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section style={{ padding: '60px 0', backgroundColor: 'var(--off-white)', borderTop: '1px solid var(--light-gray)', borderBottom: '1px solid var(--light-gray)' }}>
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto', backgroundColor: 'var(--pure-white)', borderRadius: '16px', padding: '36px 40px', border: '1px solid rgba(0, 82, 204, 0.1)', boxShadow: '0 8px 25px rgba(10,37,64,0.04)', display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: '76px', height: '76px', borderRadius: '50%', backgroundColor: 'rgba(0,82,204,0.08)', border: '2px solid var(--electric-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--electric-blue)', fontSize: '2.2rem', flexShrink: 0 }}>
              <i className="ri-user-star-line"></i>
            </div>
            <div style={{ flex: '1 1 320px' }}>
              <span className="section-tag" style={{ textAlign: 'left', marginBottom: '6px', fontSize: '0.75rem' }}>LEADERSHIP</span>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-navy)', margin: '2px 0', fontWeight: 800 }}>
                George D. Sukiat <span style={{ fontWeight: 500, fontSize: '1.05rem', color: 'var(--medium-gray)' }}>(Danny Sukiat)</span>
              </h3>
              <div style={{ color: 'var(--electric-blue)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Managing Director
              </div>
              <p style={{ color: 'var(--medium-gray)', fontSize: '0.92rem', lineHeight: '1.65', margin: 0 }}>
                Memiliki pengalaman lebih dari 15 tahun di bidang manajemen, pengembangan bisnis, dan operasional, George D. Sukiat memimpin BOS SMART dalam mengembangkan solusi Lighting & Power Solutions yang andal untuk kebutuhan komersial, industri, dan proyek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--pure-white)' }}>
        <div className="container responsive-grid-2" style={{ gap: '50px' }}>
          {/* Visi */}
          <div style={{ backgroundColor: 'var(--off-white)', padding: '48px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0,82,204,0.08)', color: 'var(--electric-blue)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
              <i className="ri-eye-line"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '16px' }}>Visi Kami</h3>
            <p style={{ color: 'var(--medium-gray)', lineHeight: '1.7', fontSize: '0.95rem', flexGrow: 1 }}>
              {about.vision}
            </p>
          </div>
          
          {/* Misi */}
          <div style={{ backgroundColor: 'var(--off-white)', padding: '48px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0,82,204,0.08)', color: 'var(--electric-blue)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '24px' }}>
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
      <section style={{ padding: '80px 0', backgroundColor: 'var(--off-white)', borderTop: '1px solid var(--light-gray)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">NILAI UTAMA & PARTNER</span>
            <h2 className="section-title">Nilai-Nilai Korporat</h2>
            <p className="section-subtitle">Nilai-nilai fundamental yang melandasi setiap operasi, kemitraan proyek, dan pelayanan purna jual kami.</p>
          </div>

          <div className="responsive-grid-4" style={{ gap: '24px', textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ padding: '30px 20px', backgroundColor: 'var(--pure-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.25rem', color: 'var(--electric-blue)', marginBottom: '16px' }}><i className="ri-lightbulb-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Innovation</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--medium-gray)', lineHeight: '1.5' }}>Mengadopsi teknologi pencahayaan dan sistem daya terupdate untuk efisiensi energi maksimal.</p>
            </div>
            <div style={{ padding: '30px 20px', backgroundColor: 'var(--pure-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.25rem', color: 'var(--electric-blue)', marginBottom: '16px' }}><i className="ri-shield-check-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Reliability</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--medium-gray)', lineHeight: '1.5' }}>Memberikan produk orisinal berstandar industri yang andal, tahan lama, dan aman dioperasikan.</p>
            </div>
            <div style={{ padding: '30px 20px', backgroundColor: 'var(--pure-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.25rem', color: 'var(--electric-blue)', marginBottom: '16px' }}><i className="ri-line-chart-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Efficiency</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--medium-gray)', lineHeight: '1.5' }}>Mengoptimalkan spesifikasi dan biaya proyek untuk menghasilkan nilai investasi terbaik bagi mitra.</p>
            </div>
            <div style={{ padding: '30px 20px', backgroundColor: 'var(--pure-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.25rem', color: 'var(--electric-blue)', marginBottom: '16px' }}><i className="ri-shake-hands-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Integrity</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--medium-gray)', lineHeight: '1.5' }}>Menjalin kerja sama yang jujur, transparan, dan dapat diandalkan oleh para mitra bisnis dan proyek.</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--light-gray)', paddingTop: '64px' }}>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', textAlign: 'center', marginBottom: '32px' }}>Authorized Distributor & Partner Resmi</h3>
            <div className="responsive-grid-3" style={{ gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--pure-white)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.03)' }}>
                <span className="brand-logo-badge brand-ledvance" style={{ width: '100%', textAlign: 'center' }}>LEDVANCE</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Official Partner & Lighting</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--pure-white)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.03)' }}>
                <span className="brand-logo-badge brand-matsumega" style={{ width: '100%', textAlign: 'center' }}>MATSUMEGA</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Power Solutions</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--pure-white)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.03)' }}>
                <span className="brand-logo-badge brand-mshita" style={{ width: '100%', textAlign: 'center' }}>M-SHITA</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Stabilizer Partner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legalitas & Sertifikasi */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--pure-white)', borderTop: '1px solid var(--light-gray)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-tag">KAPABILITAS KAMI</span>
            <h2 className="section-title">Kredibilitas & Legalitas</h2>
            <p className="section-subtitle">Sebagai entitas perseroan terbatas resmi, kami mengutamakan kepatuhan hukum dan mutu layanan prima.</p>
          </div>

          <div className="responsive-grid-3" style={{ gap: '30px', textAlign: 'center' }}>
            <div style={{ padding: '30px', backgroundColor: 'var(--off-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--electric-blue)', marginBottom: '12px' }}><i className="ri-survey-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>PT Resmi Berbadan Hukum</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Terdaftar resmi sebagai badan usaha di Indonesia dan memiliki legalitas usaha yang lengkap.</p>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'var(--off-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--electric-blue)', marginBottom: '12px' }}><i className="ri-shield-user-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Local &amp; Global Product Solutions</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Didukung produk lokal Stabilizer &amp; Transformer, serta jaringan manufaktur dan supplier global untuk solusi lighting sesuai kebutuhan proyek.</p>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'var(--off-white)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--electric-blue)', marginBottom: '12px' }}><i className="ri-service-line"></i></div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '8px' }}>Layanan &amp; After Sales</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>Memberikan dukungan produk, layanan purna jual, serta koordinasi teknis untuk kebutuhan pelanggan dan proyek.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
