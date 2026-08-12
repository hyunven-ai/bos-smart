'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BOS_DB } from '@/lib/db';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  const [db, setDb] = useState(null);
  const [pages, setPages] = useState({
    hero: {
      title: 'Smart Living Starts Here',
      subtitle: 'Home & Smart Products • Electrical & Technical Supply',
      description: 'Solusi terintegrasi untuk kebutuhan rumah pintar modern dan pasokan kelistrikan berkualitas tinggi. Dari pabrik lokal dan sourching China dengan Quality Control ketat dan After Sales Support professional.',
      ctaPrimary: 'Lihat Produk',
      ctaSecondary: 'Hubungi Kami'
    },
    whyChooseUs: {
      title: 'Mengapa Memilih BOS SMART?',
      description: 'Kami menawarkan solusi menyeluruh dari hulu ke hilir untuk memastikan Anda mendapatkan produk berkualitas tinggi dengan harga pabrik yang kompetitif dan dukungan purna jual jangka panjang.',
      pillars: []
    }
  });
  const [categories, setCategories] = useState([]);
  const [whatsapp, setWhatsapp] = useState('628123456789');

  useEffect(() => {
    const loadData = async () => {
      try {
        const settings = await BOS_DB.getSettings();
        if (settings && settings.whatsapp) {
          setWhatsapp(settings.whatsapp);
        }

        const currentPages = await BOS_DB.getPages();
        if (currentPages) {
          setPages(currentPages);
        }

        const currentCategories = await BOS_DB.getCategories();
        if (currentCategories) {
          setCategories(currentCategories);
        }
      } catch (err) {
        console.error('Failed to load data:', err);
      }
    };

    loadData();
  }, []);

  const icons = {
    sourcing: 'ri-global-line',
    qc: 'ri-shield-check-line',
    price: 'ri-price-tag-3-line',
    support: 'ri-customer-service-2-line',
    complete: 'ri-briefcase-line',
    partnership: 'ri-shake-hands-line'
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero">
        {/* Absolute Background Image and Fade Mask */}
        <div className="hero-bg-image">
          <div className="hero-bg-fade"></div>
        </div>

        <div className="container hero-grid">
          <div className="hero-content">
            <ScrollReveal animation="fade-up" duration={900}>
              <h1 className="hero-title">{pages.hero?.title}</h1>
              <p style={{ fontSize: '1.25rem', fontFamily: 'var(--font-headings)', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '16px', letterSpacing: '0.5px' }}>
                {pages.hero?.subtitle}
              </p>
              <p className="hero-description" style={{ marginBottom: '28px' }}>
                {pages.hero?.description}
              </p>
              <div className="hero-buttons">
                <Link href="/products" className="btn btn-electric btn-shine" style={{ borderRadius: '6px' }}>
                  {pages.hero?.ctaPrimary} <i className="ri-arrow-right-line"></i>
                </Link>
                <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'var(--electric-blue)', color: 'var(--electric-blue)', borderRadius: '6px' }}>
                  {pages.hero?.ctaSecondary} <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="hero-visual">
            {/* Floating Glassmorphism Grid Badge (Mockup) */}
            <ScrollReveal animation="zoom-in" delay={300} duration={1000}>
              <div className="hero-floating-badge">
                <div className="hero-floating-badge-item">
                  <i className="ri-home-wifi-line"></i> Smart Home
                </div>
                <div className="hero-floating-badge-item">
                  <i className="ri-shield-check-line"></i> Reliable Quality
                </div>
                <div className="hero-floating-badge-item">
                  <i className="ri-global-line"></i> Direct Sourcing
                </div>
                <div className="hero-floating-badge-item">
                  <i className="ri-price-tag-3-line"></i> Best Value
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Feature Bar */}
      <section className="feature-bar">
        <div className="container feature-grid">
          <div className="feature-item">
            <ScrollReveal animation="fade-up" delay={0} duration={600}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="feature-icon-box"><i className="ri-global-line"></i></div>
                <div className="feature-text">
                  <h4>Direct Sourcing</h4>
                  <p>Pabrik Pertama China</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="feature-item">
            <ScrollReveal animation="fade-up" delay={100} duration={600}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="feature-icon-box"><i className="ri-shield-check-line"></i></div>
                <div className="feature-text">
                  <h4>Quality Assurance</h4>
                  <p>Proses QC Berlapis</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="feature-item">
            <ScrollReveal animation="fade-up" delay={200} duration={600}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="feature-icon-box"><i className="ri-price-tag-3-line"></i></div>
                <div className="feature-text">
                  <h4>Competitive Price</h4>
                  <p>Efisiensi Biaya Optimal</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="feature-item">
            <ScrollReveal animation="fade-up" delay={300} duration={600}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="feature-icon-box"><i className="ri-customer-service-2-line"></i></div>
                <div className="feature-text">
                  <h4>Professional Support</h4>
                  <p>Layanan Purna Jual Resmi</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mini Company Profile Section */}
      <section className="mini-profile-section" id="about-mini">
        <div className="container">
          <div className="profile-intro-grid">
            <div>
              <ScrollReveal animation="fade-right" duration={800}>
                <span className="section-tag" style={{ textAlign: 'left' }}>COMPANY PROFILE</span>
                <h2 style={{ fontSize: '2.25rem', color: 'var(--primary-navy)', marginBottom: '20px' }}>
                  PT Berkat Optimal Semesta
                </h2>
                <div className="profile-tagline">
                  <i className="ri-lightbulb-flash-line"></i> Innovate • Optimize • Grow Together
                </div>
                <p className="profile-desc">
                  PT Berkat Optimal Semesta adalah perusahaan yang bergerak di bidang perdagangan dan distribusi produk elektronik dengan fokus pada tiga pilar utama bisnis: smart home solutions, power management systems, dan official distribution lighting products.
                </p>
                <p className="profile-desc">
                  Kami berkomitmen menyediakan produk berkualitas yang mendukung kebutuhan rumah tangga modern, sektor komersial, serta proyek industri ringan dengan pendekatan bisnis yang efisien dan berkelanjutan.
                </p>
              </ScrollReveal>
            </div>
            <div style={{ position: 'relative' }}>
              <ScrollReveal animation="fade-left" delay={200} duration={800}>
                <div style={{ position: 'absolute', width: '100%', height: '100%', top: '12px', left: '12px', border: '2px dashed var(--neon-blue)', borderRadius: '12px', pointerEvents: 'none' }}></div>
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" 
                  alt="PT Berkat Optimal Semesta Office Showcase" 
                  style={{ borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
                />
              </ScrollReveal>
            </div>
          </div>

          <div className="profile-pillars-grid">
            <ScrollReveal animation="fade-up" delay={100} duration={800}>
              <div className="pillar-card">
                <div className="pillar-number">01</div>
                <h3 className="pillar-title">Smart Home & Smart Living</h3>
                <p className="pillar-desc">
                  Penyediaan produk elektronik rumah tangga modern yang mendukung efisiensi, kenyamanan, dan gaya hidup berbasis teknologi pintar.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200} duration={800}>
              <div className="pillar-card">
                <div className="pillar-number">02</div>
                <h3 className="pillar-title">Power Solution</h3>
                <p className="pillar-desc">
                  Distribusi solusi kelistrikan seperti voltage stabilizer, transformer, dan perangkat proteksi daya untuk kebutuhan rumah tangga, komersial, dan proyek.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300} duration={800}>
              <div className="pillar-card">
                <div className="pillar-number">03</div>
                <h3 className="pillar-title">Professional Lighting</h3>
                <p className="pillar-desc">
                  Distribusi resmi produk pencahayaan dari OSRAM & Ledvance untuk pasar Indonesia, mencakup solusi lampu LED dan sistem pencahayaan proyek.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Keunggulan Kami (Values) */}
          <div className="values-container">
            <h3 className="values-title-small">Keunggulan & Nilai Utama Kami</h3>
            <div className="values-grid">
              <ScrollReveal animation="zoom-in" delay={100} duration={600}>
                <div className="value-card">
                  <div className="value-icon-box"><i className="ri-award-line"></i></div>
                  <h4 className="value-title">Produk Berkualitas</h4>
                  <p className="value-desc">Produk original dari merek terpercaya dengan standar internasional ketat.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="zoom-in" delay={200} duration={600}>
                <div className="value-card">
                  <div className="value-icon-box"><i className="ri-price-tag-line"></i></div>
                  <h4 className="value-title">Harga Kompetitif</h4>
                  <p className="value-desc">Harga bersaing dengan nilai terbaik dan rantai pasok langsung dari pabrikan.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="zoom-in" delay={300} duration={600}>
                <div className="value-card">
                  <div className="value-icon-box"><i className="ri-customer-service-line"></i></div>
                  <h4 className="value-title">Layanan Profesional</h4>
                  <p className="value-desc">Tim berpengalaman siap memberikan layanan cepat, ramah, dan purna jual resmi.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="zoom-in" delay={400} duration={600}>
                <div className="value-card">
                  <div className="value-icon-box"><i className="ri-truck-line"></i></div>
                  <h4 className="value-title">Pengiriman Luas</h4>
                  <p className="value-desc">Distribusi ke seluruh wilayah Indonesia didukung jaringan logistik yang solid.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Carousel Partner */}
      <section className="brand-carousel-container">
        <h4 className="brand-carousel-title">Authorized Distributor & Brand Partners</h4>
        <div className="brand-marquee-wrapper">
          <div className="brand-marquee">
            <span className="brand-logo-badge" style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', padding: '8px 24px', alignItems: 'center', height: 'auto' }}>
              <span className="brand-ledvance" style={{ fontSize: '1rem', borderLeft: 'none', paddingLeft: 0 }}>LEDVANCE</span>
              <span className="brand-osram" style={{ fontSize: '0.85rem' }}>OSRAM</span>
            </span>
            <span className="brand-logo-badge brand-matsumega">MATSUMEGA</span>
            <span className="brand-logo-badge brand-mshita">M-SHITA Stabilizer</span>
            <span className="brand-logo-badge" style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', padding: '8px 24px', alignItems: 'center', height: 'auto' }}>
              <span className="brand-ledvance" style={{ fontSize: '1rem', borderLeft: 'none', paddingLeft: 0 }}>LEDVANCE</span>
              <span className="brand-osram" style={{ fontSize: '0.85rem' }}>OSRAM</span>
            </span>
            <span className="brand-logo-badge brand-matsumega">MATSUMEGA</span>
            <span className="brand-logo-badge brand-mshita">M-SHITA Stabilizer</span>
          </div>
          <div className="brand-marquee" aria-hidden="true">
            <span className="brand-logo-badge" style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', padding: '8px 24px', alignItems: 'center', height: 'auto' }}>
              <span className="brand-ledvance" style={{ fontSize: '1rem', borderLeft: 'none', paddingLeft: 0 }}>LEDVANCE</span>
              <span className="brand-osram" style={{ fontSize: '0.85rem' }}>OSRAM</span>
            </span>
            <span className="brand-logo-badge brand-matsumega">MATSUMEGA</span>
            <span className="brand-logo-badge brand-mshita">M-SHITA Stabilizer</span>
            <span className="brand-logo-badge" style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', padding: '8px 24px', alignItems: 'center', height: 'auto' }}>
              <span className="brand-ledvance" style={{ fontSize: '1rem', borderLeft: 'none', paddingLeft: 0 }}>LEDVANCE</span>
              <span className="brand-osram" style={{ fontSize: '0.85rem' }}>OSRAM</span>
            </span>
            <span className="brand-logo-badge brand-matsumega">MATSUMEGA</span>
            <span className="brand-logo-badge brand-mshita">M-SHITA Stabilizer</span>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="categories-section">
        <div className="container">
          <ScrollReveal animation="fade-up" duration={800}>
            <div className="section-title-wrapper">
              <span className="section-tag">PRODUK KAMI</span>
              <h2 className="section-title">Solusi Lengkap untuk Kebutuhan Anda</h2>
              <p className="section-subtitle">Berbagai pilihan produk untuk rumah modern, kebutuhan sehari-hari, hingga kebutuhan teknis dan industri.</p>
            </div>
          </ScrollReveal>

          <div className="categories-grid">
            {categories.slice(0, 3).map((cat, index) => {
              let sampleImg = '/cat_smart_home.png';
              let iconClass = 'ri-cpu-line';

              if (cat.id === 'smart-home') {
                sampleImg = '/cat_smart_home.png';
                iconClass = 'ri-home-wifi-line';
              } else if (cat.id === 'kitchen-living') {
                sampleImg = '/cat_kitchen_living.png';
                iconClass = 'ri-restaurant-2-line';
              } else if (cat.id === 'electrical-supply') {
                sampleImg = '/cat_electrical_supply.png';
                iconClass = 'ri-flashlight-line';
              }

              return (
                <ScrollReveal key={cat.id} animation="fade-up" delay={index * 150} duration={800}>
                  <div className="category-card" style={{ height: '100%' }}>
                    <div className="category-img">
                      <img src={sampleImg} alt={cat.name} />
                    </div>
                    <div className="category-content">
                      <div className="category-icon">
                        <i className={iconClass}></i>
                      </div>
                      <h3 className="category-title" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{cat.name}</h3>
                      <p className="category-desc" style={{ fontSize: '0.85rem' }}>{cat.desc}</p>
                      <Link href={`/products?category=${cat.id}`} className="category-link" style={{ fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Lihat Produk <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-section">
        <div className="container why-grid">
          <div className="why-left">
            <ScrollReveal animation="fade-right" duration={800}>
              <span className="section-tag" style={{ textAlign: 'left' }}>WHY CHOOSE US</span>
              <h2>{pages.whyChooseUs?.title}</h2>
              <p>{pages.whyChooseUs?.description}</p>
              <Link href="/why-choose-us" className="btn btn-electric btn-shine" style={{ borderRadius: '6px' }}>
                Selengkapnya Tentang Kami <i className="ri-arrow-right-line"></i>
              </Link>
            </ScrollReveal>
          </div>

          <div className="why-right-grid">
            {pages.whyChooseUs?.pillars?.slice(0, 6).map((pillar, index) => {
              const icon = icons[pillar.id] || 'ri-checkbox-circle-line';
              return (
                <ScrollReveal key={pillar.id} animation="fade-up" delay={index * 80} duration={600}>
                  <div className="why-pillar" style={{ height: '100%' }}>
                    <div className="why-pillar-icon"><i className={icon}></i></div>
                    <h4 className="why-pillar-title">{pillar.title}</h4>
                    <p className="why-pillar-desc">{pillar.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) WhatsApp */}
      <section className="cta-banner" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container cta-banner-content">
          <ScrollReveal animation="zoom-in" duration={900}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <h2 className="cta-banner-title">Siap Memulai Kerjasama Bersama Kami?</h2>
              <p className="cta-banner-desc">Hubungi kami sekarang untuk kebutuhan produk Smart Home, Home Living, maupun Electrical & Technical Supply Anda.</p>
              <a
                href={`https://wa.me/${whatsapp}?text=Halo%20BOS%20SMART,%20saya%20tertarik%20memulai%20kerjasama%20untuk%20produk%20smart%20home%20/%20kelistrikan.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-shine"
                style={{ fontSize: '1.05rem', padding: '14px 32px', borderRadius: '30px' }}
              >
                <i className="ri-whatsapp-line" style={{ fontSize: '1.3rem' }}></i> Hubungi Kami via WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
