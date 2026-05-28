'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BOS_DB } from '@/lib/db';

export default function Footer() {
  const pathname = usePathname();
  const [year, setYear] = useState(2026);
  const [settings, setSettings] = useState({
    whatsapp: '628123456789',
    email: 'Info@bos-smart.comm',
    address: 'Kawasan Industri Jababeka, Cikarang, Bekasi, Jawa Barat 17530'
  });

  useEffect(() => {
    setYear(new Date().getFullYear());
    const currentSettings = BOS_DB.getSettings();
    if (currentSettings) {
      setSettings({
        whatsapp: currentSettings.whatsapp || '628123456789',
        email: currentSettings.email || 'Info@bos-smart.com',
        address: currentSettings.address || 'Kawasan Industri Jababeka, Cikarang, Bekasi, Jawa Barat 17530'
      });
    }
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
            <Link href="/" className="logo-wrapper">
              <img
                src="https://res.cloudinary.com/dzojrrwtr/image/upload/v1779721354/bos-smart-2_kpycfu.webp"
                alt="BOS Smart Logo"
                style={{ height: '40px', width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </Link>
            <p style={{ marginTop: '15px' }}>
              Penyedia solusi produk pintar (BOS SMART), peralatan rumah tangga modern (BOS HOME & LIVING), serta sistem daya listrik & industri (Stabilizer & Transformer Solutions) premium.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-icon"><i className="ri-facebook-fill"></i></a>
              <a href="#" className="footer-social-icon"><i className="ri-instagram-line"></i></a>
              <a href="#" className="footer-social-icon"><i className="ri-linkedin-fill"></i></a>
              <a href="#" className="footer-social-icon"><i className="ri-youtube-fill"></i></a>
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
              <li><Link href="/products?category=kitchen-living" className="footer-link">BOS HOME & LIVING</Link></li>
              <li><Link href="/products?category=smart-home" className="footer-link">BOS SMART</Link></li>
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
          <p>&copy; {year} BOS Tech. All Rights Reserved.</p>
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
