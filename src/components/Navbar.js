'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BOS_DB } from '@/lib/db';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [whatsapp, setWhatsapp] = useState('628123456789');

  // SSR-safe load settings
  useEffect(() => {
    const settings = BOS_DB.getSettings();
    if (settings && settings.whatsapp) {
      setWhatsapp(settings.whatsapp);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  // Helper untuk mengecek keaktifan kelas navigasi
  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link href="/" className="logo-wrapper" onClick={closeMenu}>
          <img
            src="https://res.cloudinary.com/dzojrrwtr/image/upload/v1779721354/bos-smart-2_kpycfu.webp"
            alt="BOS Smart Logo"
            style={{ height: '60px', width: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className={`nav-menu ${menuActive ? 'active' : ''}`}>
            <li>
              <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={closeMenu}>
                About Us
              </Link>
            </li>
            <li style={{ position: 'relative' }}>
              <Link href="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`} onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                Products <i className="ri-arrow-down-s-line" style={{ fontSize: '0.9rem' }}></i>
              </Link>
            </li>
            <li>
              <Link href="/why-choose-us" className={`nav-link ${isActive('/why-choose-us') ? 'active' : ''}`} onClick={closeMenu}>
                Why Choose Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* CTA WhatsApp Button Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href={`https://wa.me/${whatsapp}?text=Halo%20BOS%20Tech,%20saya%20tertarik%20dengan%20produk%20Anda.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-electric btn-shine"
            style={{ padding: '10px 20px', fontSize: '0.85rem', borderRadius: '6px' }}
          >
            <i className="ri-whatsapp-line" style={{ fontSize: '1.1rem' }}></i> Chat WhatsApp
          </a>
          <button className={`hamburger ${menuActive ? 'active' : ''}`} id="hamburger-menu" onClick={toggleMenu} aria-label="Toggle Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
