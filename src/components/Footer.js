'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BOS_DB } from '@/lib/db';

export default function Footer() {
  const pathname = usePathname();
  const [year, setYear] = useState(2026);
  const [settings, setSettings] = useState({
    whatsapp: '6287888638008',
    email: 'Info@bos-smart.com',
    address: 'Jl.R E Martadinata No 56 komplek Primokom Nusa Lestari blok D1 Ancol, Jakarta Utara',
    facebook: '',
    instagram: '',
    threads: '',
    tiktok: ''
  });

  useEffect(() => {
    setYear(new Date().getFullYear());
    
    const loadSettings = async () => {
      try {
        const currentSettings = await BOS_DB.getSettings();
        if (currentSettings) {
          setSettings({
            whatsapp: currentSettings.whatsapp || '6287888638008',
            email: currentSettings.email || 'Info@bos-smart.com',
            address: currentSettings.address || 'Jl.R E Martadinata No 56 komplek Primokom Nusa Lestari blok D1 Ancol, Jakarta Utara',
            facebook: currentSettings.facebook || '',
            instagram: currentSettings.instagram || '',
            threads: currentSettings.threads || '',
            tiktok: currentSettings.tiktok || ''
          });
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };

    loadSettings();
  }, []);

  const formatPhoneDisplay = (phone) => {
    if (!phone) return '';
    let clean = phone.replace(/[^\d+]/g, '');
    if (clean.startsWith('+')) {
      return clean;
    }
    if (clean.startsWith('62')) {
      return `+62 ${clean.substring(2, 5)}-${clean.substring(5, 9)}-${clean.substring(9)}`;
    }
    if (clean.startsWith('0')) {
      return `+62 ${clean.substring(1, 4)}-${clean.substring(4, 8)}-${clean.substring(8)}`;
    }
    return `+${clean}`;
  };

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-map-overlay"></div>
      <div className="container">
        <div className="footer-grid">
          {/* Kolom Tentang */}
          <div className="footer-col-about">
            <Link href="/" className="logo-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src="https://res.cloudinary.com/dzojrrwtr/image/upload/v1784899054/LOGO2_kd3phw.webp"
                alt="BOS Smart Logo"
                style={{ height: '40px', width: 'auto', display: 'block', objectFit: 'contain' }}
              />
              <div className="logo-divider" style={{ height: '26px', width: '1.5px', backgroundColor: 'var(--pure-white)', opacity: 0.2 }}></div>
              <div className="logo-text-pt" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1', fontFamily: 'var(--font-headings)' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--pure-white)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>PT BERKAT</span>
                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--pure-white)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>OPTIMAL SEMESTA</span>
              </div>
            </Link>
            <p style={{ marginTop: '15px' }}>
              Penyedia solusi Lighting & Power Solutions terpercaya: Professional Lighting, Architectural & Façade Lighting, serta Stabilizer & Transformer Solutions untuk kebutuhan komersial, industri, dan proyek.
            </p>
            <div className="footer-socials">
              {settings.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="footer-social-icon"><i className="ri-facebook-fill"></i></a>}
              {settings.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-icon"><i className="ri-instagram-line"></i></a>}
              {settings.threads && <a href={settings.threads} target="_blank" rel="noopener noreferrer" className="footer-social-icon"><i className="ri-threads-fill"></i></a>}
              {settings.tiktok && <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="footer-social-icon"><i className="ri-tiktok-fill"></i></a>}
            </div>
          </div>

          {/* Kolom Navigasi */}
          <div>
            <h4 className="footer-col-title">Navigasi</h4>
            <ul className="footer-links">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/products" className="footer-link">Products</Link></li>
              <li><Link href="/why-choose-us" className="footer-link">Why Choose Us</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Kolom Kategori */}
          <div>
            <h4 className="footer-col-title">Kategori</h4>
            <ul className="footer-links">
              <li><Link href="/products?category=professional-lighting" className="footer-link">Professional Lighting</Link></li>
              <li><Link href="/products?category=architectural-facade" className="footer-link">Architectural & Façade Lighting</Link></li>
              <li><Link href="/products?category=electrical-supply" className="footer-link">Stabilizer & Transformer Solutions</Link></li>
            </ul>
          </div>

          {/* Kolom Kontak Info */}
          <div>
            <h4 className="footer-col-title">Hubungi Kami</h4>
            <ul className="footer-contact-list">
              <li>
                <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                  <i className="ri-whatsapp-line"></i>
                  <div className="footer-contact-text">
                    <h5>WhatsApp</h5>
                    <p>{formatPhoneDisplay(settings.whatsapp)}</p>
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.email}`} className="footer-contact-item">
                  <i className="ri-mail-line"></i>
                  <div className="footer-contact-text">
                    <h5>Email</h5>
                    <p>{settings.email}</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="footer-contact-item">
                  <i className="ri-map-pin-line"></i>
                  <div className="footer-contact-text">
                    <h5>Alamat</h5>
                    <p>{settings.address}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bottom */}
        <div className="footer-bottom">
          <p>&copy; {year} BOS SMART. All Rights Reserved.</p>
          <div className="footer-legal-links">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <a href="#" className="footer-legal-link">Terms & Conditions</a>
            <Link href="/admin" className="footer-legal-link" style={{ color: 'var(--neon-blue)', fontWeight: 700 }}>
              <i className="ri-lock-line"></i> Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
