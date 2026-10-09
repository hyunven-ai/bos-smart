'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BOS_DB } from '@/lib/db';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  const [db, setDb] = useState(null);
  const [pages, setPages] = useState({
    hero: {
      title: 'LIGHTING & POWER SOLUTIONS',
      subtitle: 'Professional Lighting • Architectural & Façade Lighting • Stabilizer & Transformer',
      description: 'Solusi pencahayaan dan sistem daya untuk kebutuhan komersial, industri, dan proyek. Didukung produk berkualitas, solusi yang disesuaikan dengan kebutuhan proyek, serta after-sales support yang profesional.',
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
  const [whatsapp, setWhatsapp] = useState('6287888638008');

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
      {/* Master Hero Section - Full Bleed & 100% Responsive */}
      <section className="hero-master" id="hero">
        <div className="hero-master-bg"></div>
        <div className="hero-master-overlay"></div>

        <div className="container hero-master-container">
          <div className="hero-master-content">
            <ScrollReveal animation="fade-up" duration={800}>
              {/* Brand Logo in Hero */}
              <div className="hero-brand-badge">
                <div className="hero-brand-top">
                  <div className="hero-logo-box">
                    <img src="/assets/bos-smart.webp" alt="BOS" className="hero-logo-img" />
                  </div>
                  <div className="hero-brand-name">
                    <span>PT BERKAT</span>
                    <span>OPTIMAL SEMESTA</span>
                  </div>
                </div>
                <div className="hero-brand-tagline">
                  INNOVATE <span className="tagline-dot">•</span> OPTIMIZE <span className="tagline-dot">•</span> GROW TOGETHER
                </div>
              </div>

              <h1 className="hero-master-title">
                LIGHTING &amp;<br />
                <span className="text-gold-gradient">POWER SOLUTIONS</span>
              </h1>

              <p className="hero-master-subtitle">
                Professional Lighting • Architectural &amp; Façade Lighting • Stabilizer &amp; Transformer
              </p>

              <p className="hero-master-desc">
                Solusi pencahayaan dan sistem daya untuk kebutuhan komersial, industri, dan proyek. Didukung produk berkualitas, solusi yang disesuaikan dengan kebutuhan proyek, serta after-sales support yang profesional.
              </p>

              {/* 4 Feature Badges in 1 Row */}
              <div className="hero-master-badges">
                <Link href="/products?category=professional-lighting" className="hero-badge-pill">
                  <div className="hero-badge-icon"><i className="ri-lightbulb-line"></i></div>
                  <div className="hero-badge-label">
                    <span>Professional</span>
                    <span>Lighting</span>
                  </div>
                </Link>
                <Link href="/products" className="hero-badge-pill">
                  <div className="hero-badge-icon"><i className="ri-building-line"></i></div>
                  <div className="hero-badge-label">
                    <span>Project</span>
                    <span>Solutions</span>
                  </div>
                </Link>
                <Link href="/why-choose-us" className="hero-badge-pill">
                  <div className="hero-badge-icon"><i className="ri-shield-check-line"></i></div>
                  <div className="hero-badge-label">
                    <span>Reliable</span>
                    <span>Quality</span>
                  </div>
                </Link>
                <Link href="/contact" className="hero-badge-pill">
                  <div className="hero-badge-icon"><i className="ri-customer-service-2-line"></i></div>
                  <div className="hero-badge-label">
                    <span>After-Sales</span>
                    <span>Support</span>
                  </div>
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="hero-master-actions">
                <Link href="/products" className="btn hero-btn-main">
                  Lihat Produk <i className="ri-arrow-right-line"></i>
                </Link>
                <Link href="/contact" className="btn hero-btn-secondary">
                  Hubungi Kami <i className="ri-arrow-right-line"></i>
                </Link>
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
                <div className="feature-icon-box"><i className="ri-lightbulb-line"></i></div>
                <div className="feature-text">
                  <h4>Professional Lighting</h4>
                  <p>Mutu Standar Proyek</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="feature-item">
            <ScrollReveal animation="fade-up" delay={100} duration={600}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="feature-icon-box"><i className="ri-building-line"></i></div>
                <div className="feature-text">
                  <h4>Project Solutions</h4>
                  <p>Kustomisasi Spesifikasi</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="feature-item">
            <ScrollReveal animation="fade-up" delay={200} duration={600}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="feature-icon-box"><i className="ri-shield-check-line"></i></div>
                <div className="feature-text">
                  <h4>Reliable Quality</h4>
                  <p>Kontrol QC Berlapis</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="feature-item">
            <ScrollReveal animation="fade-up" delay={300} duration={600}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="feature-icon-box"><i className="ri-customer-service-2-line"></i></div>
                <div className="feature-text">
                  <h4>After-Sales Support</h4>
                  <p>Garansi & Layanan Teknis</p>
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
                  PT Berkat Optimal Semesta (BOS SMART) adalah perusahaan yang bergerak di bidang Lighting & Power Solutions, dengan fokus pada solusi pencahayaan profesional, Architectural & Façade Lighting, serta Stabilizer & Transformer untuk kebutuhan komersial, industri, dan proyek.
                </p>
                <p className="profile-desc">
                  Kami bekerja sama dengan mitra manufaktur terpercaya, baik lokal maupun internasional, untuk menghadirkan solusi yang andal, efisien, dan sesuai dengan kebutuhan setiap proyek di Indonesia.
                </p>
              </ScrollReveal>
            </div>
            <div style={{ position: 'relative' }}>
              <ScrollReveal animation="fade-left" delay={200} duration={800}>
                <div style={{ position: 'absolute', width: '100%', height: '100%', top: '12px', left: '12px', borderRadius: '12px', pointerEvents: 'none' }}></div>
                <img
                  src="/about_lighting.jpg"
                  alt="BOS SMART Architectural & Façade Lighting"
                  style={{ borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              </ScrollReveal>
            </div>
          </div>

          <div className="profile-pillars-grid">
            <ScrollReveal animation="fade-up" delay={100} duration={800}>
              <div className="pillar-card">
                <div className="pillar-number">01</div>
                <h3 className="pillar-title">Professional Lighting</h3>
                <p className="pillar-desc">
                  Penyediaan sistem pencahayaan LED profesional untuk kantor, komersial, dan proyek dengan standar mutu internasional.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200} duration={800}>
              <div className="pillar-card">
                <div className="pillar-number">02</div>
                <h3 className="pillar-title">Architectural & Façade Lighting</h3>
                <p className="pillar-desc">
                  Solusi pencahayaan arsitektural dan fasad gedung yang estetis, andal, serta dirancang khusus untuk memenuhi kebutuhan proyek modern.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300} duration={800}>
              <div className="pillar-card">
                <div className="pillar-number">03</div>
                <h3 className="pillar-title">Stabilizer & Transformer Solutions</h3>
                <p className="pillar-desc">
                  Distribusi solusi kelistrikan seperti voltage stabilizer, transformer, dan perangkat proteksi daya untuk komersial, industri, dan proyek.
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
            <span className="brand-logo-badge brand-matsumega">MATSUMEGA</span>
            <span className="brand-logo-badge brand-mshita">M-SHITA Stabilizer</span>
            <span className="brand-logo-badge brand-matsumega">MATSUMEGA</span>
            <span className="brand-logo-badge brand-mshita">M-SHITA Stabilizer</span>
            <span className="brand-logo-badge brand-matsumega">MATSUMEGA</span>
            <span className="brand-logo-badge brand-mshita">M-SHITA Stabilizer</span>
          </div>
          <div className="brand-marquee" aria-hidden="true">
            <span className="brand-logo-badge brand-matsumega">MATSUMEGA</span>
            <span className="brand-logo-badge brand-mshita">M-SHITA Stabilizer</span>
            <span className="brand-logo-badge brand-matsumega">MATSUMEGA</span>
            <span className="brand-logo-badge brand-mshita">M-SHITA Stabilizer</span>
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
              <h2 className="section-title">Solusi Lengkap untuk Kebutuhan Anda</h2>
              <p className="section-subtitle">Berbagai pilihan produk pencahayaan profesional, fasad arsitektur, hingga stabilizer dan transformer untuk kebutuhan komersial dan proyek.</p>
            </div>
          </ScrollReveal>

          <div className="categories-grid">
            {categories.slice(0, 3).map((cat, index) => {
              let sampleImg = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop';
              let iconClass = 'ri-lightbulb-line';

              if (cat.id === 'professional-lighting') {
                sampleImg = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop';
                iconClass = 'ri-lightbulb-line';
              } else if (cat.id === 'architectural-facade') {
                sampleImg = '/cat_architectural_facade.jpg';
                iconClass = 'ri-building-line';
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
              <h2 className="cta-banner-title">Siap Memulai Kerjasama Proyek Bersama Kami?</h2>
              <p className="cta-banner-desc">Hubungi kami sekarang untuk kebutuhan produk Professional Lighting, Architectural & Façade Lighting, maupun Stabilizer & Transformer Solutions Anda.</p>
              <a
                href={`https://wa.me/${whatsapp}?text=Halo%20BOS%20SMART,%20saya%20tertarik%20dengan%20solusi%20Lighting%20%26%20Power%20Solutions%20untuk%20kebutuhan%20proyek.`}
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
