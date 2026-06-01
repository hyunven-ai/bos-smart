'use client';

import { useState, useEffect } from 'react';
import { BOS_DB } from '@/lib/db';

export default function Contact() {
  const [settings, setSettings] = useState({
    whatsapp: '628123456789',
    email: 'Info@bos-smart.com',
    address: 'Kawasan Industri Jababeka, Cikarang, Bekasi, Jawa Barat 17530'
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const currentSettings = await BOS_DB.getSettings();
        if (currentSettings) {
          setSettings({
            whatsapp: currentSettings.whatsapp || '628123456789',
            email: currentSettings.email || 'Info@bos-smart.com',
            address: currentSettings.address || 'Kawasan Industri Jababeka, Cikarang, Bekasi, Jawa Barat 17530'
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
    if (phone.startsWith('62')) {
      return `+62 ${phone.substring(2, 5)}-${phone.substring(5, 9)}-${phone.substring(9)}`;
    }
    return phone;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      'form-name': 'name',
      'form-phone': 'phone',
      'form-email': 'email',
      'form-message': 'message'
    };
    setFormData({
      ...formData,
      [fieldMap[id]]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Mohon isi semua bidang formulir.');
      return;
    }

    // Simpan pesan ke DB localStorage
    BOS_DB.addMessage(formData);

    // Tampilkan Toast
    setToastMessage('Pesan Anda berhasil dikirim! Admin kami akan segera menghubungi Anda.');
    setFormData({ name: '', phone: '', email: '', message: '' });

    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  return (
    <>
      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '100px',
            right: '24px',
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
            zIndex: 9999,
            fontFamily: 'Outfit, sans-serif',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'slideIn 0.3s ease'
          }}
        >
          <i className="ri-checkbox-circle-line" style={{ fontSize: '1.4rem' }}></i> {toastMessage}
        </div>
      )}

      {/* Page Banner Section */}
      <section style={{ backgroundColor: 'var(--secondary-navy)', color: 'var(--pure-white)', padding: '120px 0 60px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(0, 210, 255, 0.1) 0%, transparent 60%)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-tag">KONTAK KAMI</span>
          <h1 style={{ fontSize: '2.75rem', color: 'var(--pure-white)', marginTop: '8px' }}>Hubungi BOS SMART</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '12px auto 0', fontSize: '1.05rem' }}>Hubungi kami hari ini untuk konsultasi produk, kunjungan gudang, atau kemitraan bisnis.</p>
        </div>
      </section>

      {/* Main Contact Content Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--off-white)' }}>
        <div className="container">

          <div
            className="responsive-grid-2"
            style={{
              gap: '50px',
              marginBottom: '80px'
            }}
          >
            {/* Kiri: Kartu Informasi Kontak */}
            <div
              style={{
                backgroundColor: 'var(--primary-navy)',
                color: 'var(--pure-white)',
                padding: '48px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(10, 37, 64, 0.15)',
                backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(0, 210, 255, 0.1) 0%, transparent 60%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--pure-white)', marginBottom: '12px', fontWeight: 800 }}>Informasi Kontak</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px', fontSize: '0.9rem' }}>Silakan gunakan saluran berikut untuk terhubung langsung dengan perwakilan resmi kami.</p>

                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    marginBottom: '20px',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 210, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(0, 210, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ width: '46px', height: '46px', backgroundColor: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-blue)', fontSize: '1.3rem' }}>
                    <i className="ri-whatsapp-line"></i>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--pure-white)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '2px' }}>WhatsApp Chat</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{formatPhoneDisplay(settings.whatsapp)}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    marginBottom: '20px',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 210, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(0, 210, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ width: '46px', height: '46px', backgroundColor: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-blue)', fontSize: '1.3rem' }}>
                    <i className="ri-mail-line"></i>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--pure-white)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '2px' }}>Email Resmi</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{settings.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:+${settings.whatsapp}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    marginBottom: '20px',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 210, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(0, 210, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ width: '46px', height: '46px', backgroundColor: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-blue)', fontSize: '1.3rem' }}>
                    <i className="ri-phone-line"></i>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--pure-white)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '2px' }}>Telepon</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{formatPhoneDisplay(settings.whatsapp)}</p>
                  </div>
                </a>
              </div>

              {/* Alamat Fisik di Cikarang */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', marginTop: '40px', display: 'flex', gap: '16px' }}>
                <div style={{ width: '46px', height: '46px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--pure-white)', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                  <i className="ri-map-pin-line"></i>
                </div>
                <div>
                  <h5 style={{ color: 'var(--pure-white)', fontWeight: 700, marginBottom: '4px', fontSize: '0.9rem' }}>Gudang & Kantor Operasional</h5>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.5 }}>{settings.address}</p>
                </div>
              </div>
            </div>

            {/* Kanan: Form Kontak Online */}
            <div
              style={{
                backgroundColor: 'var(--pure-white)',
                padding: '48px',
                borderRadius: '16px',
                boxShadow: '0 4px 25px rgba(0,0,0,0.03)',
                border: '1px solid var(--light-gray)'
              }}
            >
              <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', marginBottom: '12px', fontWeight: 800 }}>Kirim Pesan Online</h3>
              <p style={{ color: 'var(--medium-gray)', marginBottom: '30px', fontSize: '0.9rem' }}>Punya pertanyaan spesifik atau membutuhkan dokumen penawaran? Kirim pesan dan kami akan merespons dalam 1x24 jam.</p>

              <form onSubmit={handleSubmit}>
                <div className="responsive-grid-2" style={{ gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-headings)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)', marginBottom: '8px' }} htmlFor="form-name">Nama Lengkap *</label>
                    <input type="text" id="form-name" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--light-gray)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', marginBottom: '20px' }} placeholder="Nama Anda" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-headings)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)', marginBottom: '8px' }} htmlFor="form-phone">Nomor HP / WhatsApp *</label>
                    <input type="tel" id="form-phone" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--light-gray)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', marginBottom: '20px' }} placeholder="Contoh: 08123456789" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-headings)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)', marginBottom: '8px' }} htmlFor="form-email">Alamat Email *</label>
                  <input type="email" id="form-email" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--light-gray)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', marginBottom: '20px' }} placeholder="email@perusahaan.com" value={formData.email} onChange={handleInputChange} required />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-headings)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)', marginBottom: '8px' }} htmlFor="form-message">Isi Pesan / Kebutuhan *</label>
                  <textarea id="form-message" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--light-gray)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', marginBottom: '20px', height: '140px', resize: 'none' }} placeholder="Tuliskan spesifikasi produk, kuantitas, atau pertanyaan Anda..." value={formData.message} onChange={handleInputChange} required></textarea>
                </div>

                <button type="submit" className="btn btn-electric" style={{ width: '100%', padding: '14px 0', fontSize: '1rem', borderRadius: '8px' }}>
                  Kirim Formulir <i className="ri-send-plane-line"></i>
                </button>
              </form>
            </div>
          </div>

          {/* Google Maps Lokasi Kantor */}
          <div className="section-title-wrapper" style={{ marginBottom: '30px' }}>
            <span className="section-tag">LOKASI KAMI</span>
            <h2 className="section-title">Lokasi Gudang & Kantor Cikarang</h2>
          </div>
          <div style={{ height: '450px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--light-gray)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi BOS SMART Map"
            >
            </iframe>
          </div>

        </div>
      </section>

      {/* Styled slideIn animation */}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
