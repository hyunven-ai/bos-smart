'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BOS_DB } from '@/lib/db';

export default function AdminPanel() {
  // A. AUTHENTICATION STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // B. CMS SYSTEM STATE
  const [activeTab, setActiveTab] = useState('tab-dashboard');
  const [db, setDb] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [settings, setSettings] = useState(null);
  const [pages, setPages] = useState(null);

  // C. FILTER & MODAL STATE
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // D. FORM INPUT BINDINGS
  // Product Form
  const [crudProdId, setCrudProdId] = useState('');
  const [crudProdName, setCrudProdName] = useState('');
  const [crudProdCategory, setCrudProdCategory] = useState('');
  const [crudProdImageUrl, setCrudProdImageUrl] = useState('');
  const [crudProdDescription, setCrudProdDescription] = useState('');
  const [crudProdSpecs, setCrudProdSpecs] = useState('');
  const [crudProdStatus, setCrudProdStatus] = useState('show');

  // Category Form
  const [crudCatId, setCrudCatId] = useState('');
  const [crudCatName, setCrudCatName] = useState('');
  const [crudCatDesc, setCrudCatDesc] = useState('');
  const [catIdReadOnly, setCatIdReadOnly] = useState(false);

  // Content forms
  const [heroForm, setHeroForm] = useState({ title: '', subtitle: '', description: '', ctaPrimary: '', ctaSecondary: '' });
  const [aboutForm, setAboutForm] = useState({ title: '', description: '', vision: '', mission: '' });

  // Settings forms
  const [contactForm, setContactForm] = useState({ whatsapp: '', email: '', address: '' });
  const [seoForm, setSeoForm] = useState({ seoTitle: '', seoDescription: '', seoKeywords: '' });
  const [adminAccountForm, setAdminAccountForm] = useState({ username: '', password: '' });

  // Initialize DB & Auth
  useEffect(() => {
    // SSR safe check session
    const session = sessionStorage.getItem('bos_admin_session');
    if (session === 'true') {
      setIsLoggedIn(true);
      loadCMSData();
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  const loadCMSData = () => {
    const currentDb = BOS_DB.getData();
    setDb(currentDb);
    
    const dbProducts = BOS_DB.getProducts();
    const dbCategories = BOS_DB.getCategories();
    const dbInbox = BOS_DB.getInbox();
    const dbSettings = BOS_DB.getSettings();
    const dbPages = BOS_DB.getPages();

    if (dbProducts) setProducts(dbProducts);
    if (dbCategories) {
      setCategories(dbCategories);
      if (dbCategories.length > 0) setCrudProdCategory(dbCategories[0].id);
    }
    if (dbInbox) setInbox(dbInbox);
    
    if (dbSettings) {
      setSettings(dbSettings);
      setContactForm({ whatsapp: dbSettings.whatsapp, email: dbSettings.email, address: dbSettings.address });
      setSeoForm({ seoTitle: dbSettings.seoTitle, seoDescription: dbSettings.seoDescription, seoKeywords: dbSettings.seoKeywords });
      setAdminAccountForm({ username: dbSettings.admin.username, password: dbSettings.admin.password });
    }

    if (dbPages) {
      setPages(dbPages);
      if (dbPages.hero) {
        setHeroForm({
          title: dbPages.hero.title,
          subtitle: dbPages.hero.subtitle,
          description: dbPages.hero.description,
          ctaPrimary: dbPages.hero.ctaPrimary,
          ctaSecondary: dbPages.hero.ctaSecondary
        });
      }
      if (dbPages.about) {
        setAboutForm({
          title: dbPages.about.title,
          description: dbPages.about.description,
          vision: dbPages.about.vision,
          mission: dbPages.about.mission.join('\n')
        });
      }
    }
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    const currentSettings = BOS_DB.getSettings();

    if (loginUsername === currentSettings.admin.username && loginPassword === currentSettings.admin.password) {
      sessionStorage.setItem('bos_admin_session', 'true');
      setIsLoggedIn(true);
      setLoginError(false);
      setLoginUsername('');
      setLoginPassword('');
      showToast('Login berhasil! Selamat datang di Dasbor CMS.');
      loadCMSData();
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 5000);
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('bos_admin_session');
    setIsLoggedIn(false);
    showToast('Logout berhasil.');
  };

  // Switch Active Tab
  const selectTab = (tabName) => {
    setActiveTab(tabName);
    loadCMSData(); // Refresh data terupdate
  };

  // dynamic helper
  const unreadMessagesCount = inbox.filter(m => m.status === 'unread').length;
  const getCategoryName = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.name : catId;
  };
  const formatPhoneDisplay = (phone) => {
    if (!phone) return '';
    if (phone.startsWith('62')) {
      return `+62 ${phone.substring(2, 5)}-${phone.substring(5, 9)}-${phone.substring(9)}`;
    }
    return phone;
  };

  // Local Image Upload (base64)
  const handleLocalImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      showToast('Foto terlalu besar! Gunakan file di bawah 3MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(uploadEvent) {
      setCrudProdImageUrl(uploadEvent.target.result);
      showToast('Foto lokal berhasil diunggah & dikonversi!');
    };
    reader.readAsDataURL(file);
  };

  // CRUD PRODUCTS OPERATION
  const openAddProductModal = () => {
    setCrudProdId('');
    setCrudProdName('');
    if (categories.length > 0) setCrudProdCategory(categories[0].id);
    setCrudProdImageUrl('');
    setCrudProdDescription('');
    setCrudProdSpecs('');
    setCrudProdStatus('show');
    setShowProductModal(true);
  };

  const openEditProductModal = (p) => {
    setCrudProdId(p.id);
    setCrudProdName(p.name);
    setCrudProdCategory(p.category);
    setCrudProdImageUrl(p.image);
    setCrudProdDescription(p.description);
    setCrudProdSpecs(p.specs);
    setCrudProdStatus(p.status);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (prodId, prodName) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${prodName}"?`)) {
      BOS_DB.deleteProduct(prodId);
      showToast('Produk berhasil dihapus!');
      loadCMSData();
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    const productToSave = {
      name: crudProdName.trim(),
      category: crudProdCategory,
      image: crudProdImageUrl.trim(),
      description: crudProdDescription.trim(),
      specs: crudProdSpecs.trim(),
      status: crudProdStatus
    };

    if (crudProdId) {
      productToSave.id = crudProdId;
    }

    BOS_DB.saveProduct(productToSave);
    showToast(crudProdId ? 'Produk berhasil diedit!' : 'Produk baru berhasil ditambahkan!');
    setShowProductModal(false);
    loadCMSData();
  };

  // CRUD CATEGORIES OPERATIONS
  const handleEditCategory = (cat) => {
    setCrudCatId(cat.id);
    setCrudCatName(cat.name);
    setCrudCatDesc(cat.desc);
    setCatIdReadOnly(true);
  };

  const handleDeleteCategory = (catId) => {
    if (confirm(`Apakah Anda yakin menghapus kategori "${catId}"? Produk pada kategori ini tidak akan terhapus.`)) {
      BOS_DB.deleteCategory(catId);
      showToast('Kategori berhasil dihapus!');
      loadCMSData();
    }
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const cleanId = crudCatId.trim().toLowerCase().replace(/\s+/g, '-');
    const categoryToSave = {
      id: cleanId,
      name: crudCatName.trim(),
      desc: crudCatDesc.trim()
    };

    BOS_DB.saveCategory(categoryToSave);
    showToast('Kategori berhasil disimpan!');
    
    // reset form
    setCrudCatId('');
    setCrudCatName('');
    setCrudCatDesc('');
    setCatIdReadOnly(false);
    
    loadCMSData();
  };

  // INBOX MARK STATUS
  const handleMarkMessage = (msgId, currentStatus) => {
    const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
    BOS_DB.markMessageStatus(msgId, nextStatus);
    showToast(nextStatus === 'read' ? 'Pesan ditandai sudah dibaca.' : 'Pesan ditandai belum dibaca.');
    loadCMSData();
  };

  const handleDeleteMessage = (msgId) => {
    if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      BOS_DB.deleteMessage(msgId);
      showToast('Pesan berhasil dihapus!');
      loadCMSData();
    }
  };

  // PAGES CONTENT SUBMIT
  const handleHeroSubmit = (e) => {
    e.preventDefault();
    BOS_DB.updatePageContent('hero', heroForm);
    showToast('Konten Hero Banner utama disimpan!');
  };

  const handleAboutSubmit = (e) => {
    e.preventDefault();
    const updatedAbout = {
      title: aboutForm.title.trim(),
      description: aboutForm.description.trim(),
      vision: aboutForm.vision.trim(),
      mission: aboutForm.mission.trim().split('\n').filter(l => l.trim() !== '')
    };
    BOS_DB.updatePageContent('about', updatedAbout);
    showToast('Profil perusahaan About Us berhasil disimpan!');
  };

  // SYSTEM SETTINGS SUBMIT
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const cleanWA = contactForm.whatsapp.trim().replace(/\D/g, '');
    BOS_DB.updateSettings({
      whatsapp: cleanWA,
      email: contactForm.email.trim(),
      address: contactForm.address.trim()
    });
    showToast('Pengaturan kontak & alamat disimpan!');
  };

  const handleSeoSubmit = (e) => {
    e.preventDefault();
    BOS_DB.updateSettings(seoForm);
    showToast('Pengaturan SEO Metadata berhasil disimpan!');
  };

  const handleAdminAccountSubmit = (e) => {
    e.preventDefault();
    BOS_DB.updateSettings({
      admin: {
        username: adminAccountForm.username.trim(),
        password: adminAccountForm.password
      }
    });
    showToast('Kredensial Akun Admin berhasil diubah!');
  };

  // DEV ZONE ACTIONS
  const handleResetDB = () => {
    if (confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh database ke setelan awal demo? Produk baru dan inbox pesan akan terhapus permanen!')) {
      BOS_DB.resetToDefault();
      showToast('Database berhasil direset.');
      setTimeout(() => window.location.reload(), 1200);
    }
  };

  const handleExportDB = () => {
    const dataStr = localStorage.getItem('bos_smart_db');
    if (!dataStr) return;

    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bos_smart_db_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Database berhasil diekspor! Cadangan diunduh.');
  };

  const handleImportDB = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(uploadEvent) {
      try {
        const importedJSON = JSON.parse(uploadEvent.target.result);
        if (importedJSON.settings && importedJSON.categories && importedJSON.products) {
          localStorage.setItem('bos_smart_db', JSON.stringify(importedJSON));
          showToast('Database berhasil diimpor & dipulihkan!');
          setTimeout(() => window.location.reload(), 1200);
        } else {
          showToast('Gagal Impor! Cadangan tidak valid.', 'error');
        }
      } catch (err) {
        showToast('File JSON rusak atau tidak terbaca.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Filtered Products list in Table
  const filteredProductsAdmin = activeCategoryFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategoryFilter);

  // ==================== RENDER A: LOGIN PAGE ====================
  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: 'var(--secondary-navy)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <section className="login-container" style={{ margin: 0, display: 'block' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img 
              src="https://res.cloudinary.com/dzojrrwtr/image/upload/v1779721354/bos-smart-2_kpycfu.webp" 
              alt="BOS Smart Logo" 
              style={{ height: '48px', width: 'auto', display: 'block', margin: '0 auto 16px', objectFit: 'contain' }}
            />
            <h2 style={{ color: 'var(--pure-white)', fontWeight: 800 }}>CMS Admin Panel</h2>
            <p style={{ color: 'var(--medium-gray)', fontSize: '0.85rem', marginTop: '4px' }}>Silakan login untuk mengelola konten website</p>
          </div>
          
          {loginError && (
            <div style={{ color: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '20px', textAlign: 'center' }}>
              Username atau Password salah!
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="login-username">Username</label>
              <input type="text" id="login-username" className="admin-input" placeholder="Masukkan username admin" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="login-password">Password</label>
              <input type="password" id="login-password" className="admin-input" placeholder="Masukkan password admin" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-neon" style={{ width: '100%', marginTop: '10px', padding: '12px 0' }}>
              Sign In <i className="ri-login-box-line"></i>
            </button>
          </form>
        </section>
      </div>
    );
  }

  // ==================== RENDER B: DASEBOARD CMS PANEL ====================
  return (
    <div style={{ backgroundColor: 'var(--secondary-navy)', color: 'var(--light-gray)', minHeight: '100vh' }}>
      
      {/* Dynamic Toast Alerts */}
      {toast.show && (
        <div 
          style={{
            position: 'fixed',
            top: '40px',
            right: '40px',
            backgroundColor: toast.type === 'success' ? '#10B981' : '#EF4444',
            color: '#FFFFFF',
            padding: '14px 24px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: '600',
            fontSize: '0.9rem',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <i className={toast.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'} style={{ fontSize: '1.2rem' }}></i> {toast.message}
        </div>
      )}

      {/* Main CMS Layout Grid */}
      <div className="admin-wrapper" style={{ display: 'grid' }}>
        
        {/* Sidebar Left */}
        <aside className="sidebar">
          <Link href="/" className="logo-wrapper">
            <img 
              src="https://res.cloudinary.com/dzojrrwtr/image/upload/v1779721354/bos-smart-2_kpycfu.webp" 
              alt="BOS Smart Logo" 
              style={{ height: '32px', width: 'auto', display: 'block', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            />
          </Link>
          
          <ul className="sidebar-menu">
            <li>
              <div className={`sidebar-link ${activeTab === 'tab-dashboard' ? 'active' : ''}`} onClick={() => selectTab('tab-dashboard')}>
                <i className="ri-dashboard-3-line"></i> Dashboard
              </div>
            </li>
            <li>
              <div className={`sidebar-link ${activeTab === 'tab-content' ? 'active' : ''}`} onClick={() => selectTab('tab-content')}>
                <i className="ri-article-line"></i> Manajemen Teks & Banner
              </div>
            </li>
            <li>
              <div className={`sidebar-link ${activeTab === 'tab-products' ? 'active' : ''}`} onClick={() => selectTab('tab-products')}>
                <i className="ri-shopping-bag-3-line"></i> Manajemen Produk
              </div>
            </li>
            <li>
              <div className={`sidebar-link ${activeTab === 'tab-inbox' ? 'active' : ''}`} onClick={() => selectTab('tab-inbox')}>
                <i className="ri-mail-unread-line"></i> Inbox/Pesan Masuk 
                {unreadMessagesCount > 0 && (
                  <span style={{ marginLeft: 'auto', backgroundColor: '#EF4444', color: '#FFFFFF', fontSize: '0.7rem', borderRadius: '50%', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    {unreadMessagesCount}
                  </span>
                )}
              </div>
            </li>
            <li>
              <div className={`sidebar-link ${activeTab === 'tab-settings' ? 'active' : ''}`} onClick={() => selectTab('tab-settings')}>
                <i className="ri-settings-4-line"></i> Pengaturan Website
              </div>
            </li>
          </ul>

          <div style={{ marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
            <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', padding: '10px 0' }}>
              <i className="ri-logout-box-line"></i> Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          
          {/* ==================== CMS TAB: DASHBOARD ==================== */}
          {activeTab === 'tab-dashboard' && (
            <div className="tab-pane active">
              <h1 style={{ color: 'var(--pure-white)', fontWeight: 800, marginBottom: '30px' }}>Dasbor Admin</h1>
              
              <div className="stat-grid">
                <div className="stat-card">
                  <div>
                    <span style={{ color: 'var(--medium-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Produk</span>
                    <div className="stat-number">{products.length}</div>
                  </div>
                  <div className="stat-icon"><i className="ri-shopping-bag-3-line"></i></div>
                </div>
                <div className="stat-card">
                  <div>
                    <span style={{ color: 'var(--medium-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Pesan Masuk Baru</span>
                    <div className="stat-number" style={{ color: unreadMessagesCount > 0 ? '#EF4444' : 'var(--pure-white)' }}>{unreadMessagesCount}</div>
                  </div>
                  <div className="stat-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}><i className="ri-mail-unread-line"></i></div>
                </div>
                <div className="stat-card">
                  <div>
                    <span style={{ color: 'var(--medium-gray)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Kategori Produk</span>
                    <div className="stat-number">{categories.length}</div>
                  </div>
                  <div className="stat-icon"><i className="ri-menu-add-line"></i></div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '30px' }}>
                <div className="panel-card" style={{ marginBottom: 0 }}>
                  <h3 className="panel-title">Statistik Kunjungan Mingguan (Mock)</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '180px', padding: '20px 0 10px', borderBottom: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
                      <div style={{ height: '120px', width: '100%', background: 'linear-gradient(to top, var(--electric-blue), var(--neon-blue))', borderRadius: '4px', boxShadow: 'var(--neon-glow)' }}></div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Sen</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
                      <div style={{ height: '80px', width: '100%', background: 'linear-gradient(to top, var(--electric-blue), var(--neon-blue))', borderRadius: '4px', boxShadow: 'var(--neon-glow)' }}></div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Sel</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
                      <div style={{ height: '150px', width: '100%', background: 'linear-gradient(to top, var(--electric-blue), var(--neon-blue))', borderRadius: '4px', boxShadow: 'var(--neon-glow)' }}></div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Rab</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
                      <div style={{ height: '130px', width: '100%', background: 'linear-gradient(to top, var(--electric-blue), var(--neon-blue))', borderRadius: '4px', boxShadow: 'var(--neon-glow)' }}></div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Kam</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
                      <div style={{ height: '90px', width: '100%', background: 'linear-gradient(to top, var(--electric-blue), var(--neon-blue))', borderRadius: '4px', boxShadow: 'var(--neon-glow)' }}></div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Jum</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
                      <div style={{ height: '60px', width: '100%', background: 'linear-gradient(to top, var(--electric-blue), var(--neon-blue))', borderRadius: '4px', boxShadow: 'var(--neon-glow)' }}></div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Sab</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
                      <div style={{ height: '100px', width: '100%', background: 'linear-gradient(to top, var(--electric-blue), var(--neon-blue))', borderRadius: '4px', boxShadow: 'var(--neon-glow)' }}></div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--medium-gray)', marginTop: '8px' }}>Min</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--medium-gray)', marginTop: '12px', textAlign: 'center' }}>Estimasi Kunjungan Harian Rata-Rata: <b>125 Kunjungan / Hari</b></p>
                </div>

                <div className="panel-card" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 className="panel-title">Pintasan Cepat</h3>
                    <p style={{ color: 'var(--medium-gray)', fontSize: '0.85rem', marginBottom: '24px' }}>Kelola bagian-bagian utama website Anda dalam satu kali klik.</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button onClick={openAddProductModal} className="btn btn-neon" style={{ padding: '12px', fontSize: '0.9rem', width: '100%' }}>
                      <i className="ri-add-line"></i> Tambah Produk Baru
                    </button>
                    <button onClick={() => selectTab('tab-inbox')} className="btn btn-outline" style={{ padding: '12px', fontSize: '0.9rem', width: '100%', borderColor: 'var(--glass-border)', color: 'var(--pure-white)' }}>
                      <i className="ri-mail-open-line"></i> Buka Kotak Masuk
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== CMS TAB: TEXT & BANNER ==================== */}
          {activeTab === 'tab-content' && (
            <div className="tab-pane active">
              <h1 style={{ color: 'var(--pure-white)', fontWeight: 800, marginBottom: '30px' }}>Manajemen Teks & Banner Halaman</h1>
              
              <div className="panel-card">
                <h3 className="panel-title">Konten Hero Banner Utama (Home Page)</h3>
                <form onSubmit={handleHeroSubmit}>
                  <div className="admin-form-group">
                    <label className="admin-label" htmlFor="content-hero-title">Judul Utama (Headline)</label>
                    <input type="text" id="content-hero-title" className="admin-input" value={heroForm.title} onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })} required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label" htmlFor="content-hero-subtitle">Sub-Judul (Sub-headline)</label>
                    <input type="text" id="content-hero-subtitle" className="admin-input" value={heroForm.subtitle} onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })} required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label" htmlFor="content-hero-description">Deskripsi Singkat</label>
                    <textarea id="content-hero-description" className="admin-input" style={{ height: '80px', resize: 'none' }} value={heroForm.description} onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })} required></textarea>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="admin-form-group">
                      <label className="admin-label" htmlFor="content-hero-cta1">Teks Tombol Kiri (CTA 1)</label>
                      <input type="text" id="content-hero-cta1" className="admin-input" value={heroForm.ctaPrimary} onChange={(e) => setHeroForm({ ...heroForm, ctaPrimary: e.target.value })} required />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label" htmlFor="content-hero-cta2">Teks Tombol Kanan (CTA 2)</label>
                      <input type="text" id="content-hero-cta2" className="admin-input" value={heroForm.ctaSecondary} onChange={(e) => setHeroForm({ ...heroForm, ctaSecondary: e.target.value })} required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-electric" style={{ padding: '10px 24px' }}>Simpan Banner Utama</button>
                </form>
              </div>

              <div className="panel-card">
                <h3 className="panel-title">Teks Halaman About Us (Tentang Kami)</h3>
                <form onSubmit={handleAboutSubmit}>
                  <div className="admin-form-group">
                    <label className="admin-label" htmlFor="content-about-title">Judul Halaman</label>
                    <input type="text" id="content-about-title" className="admin-input" value={aboutForm.title} onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })} required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label" htmlFor="content-about-description">Profil / Deskripsi Utama Perusahaan</label>
                    <textarea id="content-about-description" className="admin-input" style={{ height: '140px', resize: 'none' }} value={aboutForm.description} onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })} required></textarea>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label" htmlFor="content-about-vision">Visi Perusahaan</label>
                    <textarea id="content-about-vision" className="admin-input" style={{ height: '60px', resize: 'none' }} value={aboutForm.vision} onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })} required></textarea>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label" htmlFor="content-about-mission">Misi Perusahaan (Tulis satu poin per baris / enter)</label>
                    <textarea id="content-about-mission" className="admin-input" style={{ height: '120px', resize: 'none' }} placeholder="Misi 1&#10;Misi 2&#10;Misi 3" value={aboutForm.mission} onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-electric" style={{ padding: '10px 24px' }}>Simpan Profil Perusahaan</button>
                </form>
              </div>
            </div>
          )}

          {/* ==================== CMS TAB: PRODUCTS CRUD ==================== */}
          {activeTab === 'tab-products' && (
            <div className="tab-pane active">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: 'var(--pure-white)', fontWeight: 800, margin: 0 }}>Manajemen CRUD Produk</h1>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setShowCategoryModal(true)} className="btn btn-outline" style={{ borderColor: 'var(--glass-border)', color: 'var(--pure-white)' }}>
                    <i className="ri-menu-add-line"></i> Kelola Kategori
                  </button>
                  <button onClick={openAddProductModal} className="btn btn-neon">
                    <i className="ri-add-line"></i> Tambah Produk Baru
                  </button>
                </div>
              </div>

              <div className="panel-card">
                <h3 className="panel-title" style={{ marginBottom: '12px' }}>Daftar Produk Aktif</h3>
                
                {/* Admin category dynamic filter bar */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <button 
                    onClick={() => setActiveCategoryFilter('all')}
                    className={`filter-btn ${activeCategoryFilter === 'all' ? 'active' : ''}`}
                    style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                  >
                    Semua Kategori
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveCategoryFilter(cat.id)}
                      className={`filter-btn ${activeCategoryFilter === cat.id ? 'active' : ''}`}
                      style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '80px' }}>Foto</th>
                      <th>Nama Produk</th>
                      <th>Kategori</th>
                      <th style={{ width: '120px' }}>Status Tampil</th>
                      <th style={{ width: '150px', textAlign: 'right' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProductsAdmin.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--medium-gray)' }}>
                          Belum ada produk untuk kategori ini.
                        </td>
                      </tr>
                    ) : (
                      filteredProductsAdmin.map(p => (
                        <tr key={p.id}>
                          <td style={{ padding: '10px 16px' }}>
                            <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--glass-border)' }} />
                          </td>
                          <td>
                            <div style={{ fontWeight: 700, color: 'var(--pure-white)' }}>{p.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--medium-gray)', maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.description}</div>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', padding: '4px 10px', borderRadius: '12px', border: '1px solid var(--glass-border)', fontFamily: 'var(--font-headings)' }}>
                              {getCategoryName(p.category)}
                            </span>
                          </td>
                          <td>
                            {p.status === 'show' 
                              ? <span className="badge badge-show"><i className="ri-eye-line"></i> Tampil</span> 
                              : <span className="badge badge-hide"><i className="ri-eye-off-line"></i> Sembunyi</span>}
                          </td>
                          <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <button onClick={() => openEditProductModal(p)} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: 'var(--glass-border)', color: 'var(--neon-blue)', marginRight: '6px' }}>
                              <i className="ri-pencil-line"></i> Edit
                            </button>
                            <button onClick={() => handleDeleteProduct(p.id, p.name)} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: 'var(--glass-border)', color: '#EF4444' }}>
                              <i className="ri-delete-bin-line"></i> Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== CMS TAB: INBOX / LEADS ==================== */}
          {activeTab === 'tab-inbox' && (
            <div className="tab-pane active">
              <h1 style={{ color: 'var(--pure-white)', fontWeight: 800, marginBottom: '30px' }}>Kotak Masuk Form Kontak (Leads)</h1>
              
              <div className="panel-card">
                <h3 className="panel-title">Daftar Pesan Masuk</h3>
                
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '150px' }}>Tanggal Masuk</th>
                      <th style={{ width: '150px' }}>Nama Pengirim</th>
                      <th style={{ width: '120px' }}>No HP / Email</th>
                      <th>Pesan / Permintaan</th>
                      <th style={{ width: '120px' }}>Status</th>
                      <th style={{ width: '180px', textAlign: 'right' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inbox.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--medium-gray)' }}>
                          Belum ada pesan masuk.
                        </td>
                      </tr>
                    ) : (
                      inbox.map(m => (
                        <tr key={m.id}>
                          <td style={{ fontSize: '0.8rem', color: 'var(--medium-gray)' }}>
                            {new Date(m.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td>
                            <div style={{ fontWeight: 700, color: 'var(--pure-white)' }}>{m.name}</div>
                          </td>
                          <td>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--pure-white)' }}>{m.phone}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--medium-gray)' }}>{m.email}</div>
                          </td>
                          <td>
                            <div style={{ maxWidth: '320px', fontSize: '0.82rem', lineHighlight: 1.5, maxHeight: '80px', overflowY: 'auto' }}>{m.message}</div>
                          </td>
                          <td>
                            {m.status === 'unread' 
                              ? <span className="badge badge-unread">Unread</span> 
                              : <span className="badge badge-read">Read</span>}
                          </td>
                          <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <a href={`https://wa.me/${m.phone}?text=Halo%20${m.name},%20terima%20kasih%20telah%20menghubungi%20BOS%20SMART.%20Menjawab%20pesan%20Anda:%20`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ padding: '6px 12px', fontSize: '0.75rem', marginRight: '6px', fontFamily: 'var(--font-headings)' }}>
                              <i className="ri-whatsapp-line"></i> Balas
                            </a>
                            <button onClick={() => handleMarkMessage(m.id, m.status)} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: 'var(--glass-border)', color: 'var(--neon-blue)', marginRight: '6px' }}>
                              {m.status === 'unread' ? <><i className="ri-checkbox-circle-line"></i> Dibaca</> : <><i className="ri-mail-line"></i> Belum</>}
                            </button>
                            <button onClick={() => handleDeleteMessage(m.id)} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: 'var(--glass-border)', color: '#EF4444' }}>
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== CMS TAB: GLOBAL SETTINGS ==================== */}
          {activeTab === 'tab-settings' && (
            <div className="tab-pane active">
              <h1 style={{ color: 'var(--pure-white)', fontWeight: 800, marginBottom: '30px' }}>Pengaturan Global Website</h1>
              
              {/* Contact settings Form */}
              <div className="panel-card">
                <h3 className="panel-title">Informasi Kontak & Alamat Perusahaan</h3>
                <form onSubmit={handleContactSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="admin-form-group">
                      <label className="admin-label" htmlFor="settings-whatsapp">WhatsApp Target (Format Kode Negara, tanpa +/0)</label>
                      <input type="text" id="settings-whatsapp" className="admin-input" value={contactForm.whatsapp} onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })} required />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label" htmlFor="settings-email">Email Resmi Perusahaan</label>
                      <input type="email" id="settings-email" className="admin-input" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label" htmlFor="settings-address">Alamat Gudang / Kantor Fisik</label>
                    <input type="text" id="settings-address" className="admin-input" value={contactForm.address} onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })} required />
                  </div>
                  <button type="submit" className="btn btn-electric" style={{ padding: '10px 24px' }}>Simpan Informasi Kontak</button>
                </form>
              </div>

              {/* SEO metadata Form */}
              <div className="panel-card">
                <h3 className="panel-title">SEO & Metadata Google Search</h3>
                <form onSubmit={handleSeoSubmit}>
                  <div className="admin-form-group">
                    <label className="admin-label" htmlFor="settings-seo-title">Judul Website Default (SEO Title)</label>
                    <input type="text" id="settings-seo-title" className="admin-input" value={seoForm.seoTitle} onChange={(e) => setSeoForm({ ...seoForm, seoTitle: e.target.value })} required />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label" htmlFor="settings-seo-description">Deskripsi SEO Website (Meta Description)</label>
                    <textarea id="settings-seo-description" className="admin-input" style={{ height: '60px', resize: 'none' }} value={seoForm.seoDescription} onChange={(e) => setSeoForm({ ...seoForm, seoDescription: e.target.value })} required></textarea>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label" htmlFor="settings-seo-keywords">Keywords / Kata Kunci (Pisahkan dengan koma)</label>
                    <input type="text" id="settings-seo-keywords" className="admin-input" value={seoForm.seoKeywords} onChange={(e) => setSeoForm({ ...seoForm, seoKeywords: e.target.value })} required />
                  </div>
                  <button type="submit" className="btn btn-electric" style={{ padding: '10px 24px' }}>Simpan Metadata SEO</button>
                </form>
              </div>

              {/* Admin credentials Form */}
              <div className="panel-card">
                <h3 className="panel-title">Ubah Kredensial Akun Admin</h3>
                <form onSubmit={handleAdminAccountSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="admin-form-group">
                      <label className="admin-label" htmlFor="settings-admin-username">Username Admin Baru</label>
                      <input type="text" id="settings-admin-username" className="admin-input" value={adminAccountForm.username} onChange={(e) => setAdminAccountForm({ ...adminAccountForm, username: e.target.value })} required />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label" htmlFor="settings-admin-password">Password Admin Baru</label>
                      <input type="password" id="settings-admin-password" className="admin-input" placeholder="Masukkan password baru" value={adminAccountForm.password} onChange={(e) => setAdminAccountForm({ ...adminAccountForm, password: e.target.value })} required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-electric" style={{ padding: '10px 24px' }}>Ubah Akun Admin</button>
                </form>
              </div>

              {/* DEV BACKUP & CONTROL PANEL */}
              <div className="panel-card" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                <h3 className="panel-title" style={{ color: '#EF4444' }}>Zona Developer & Backup Sistem</h3>
                <p style={{ color: 'var(--medium-gray)', fontSize: '0.85rem', marginBottom: '24px' }}>Gunakan menu ini untuk mencadangkan database lokal, mengimpor cadangan lama, atau menyetel ulang data ke awal bawaan demo.</p>
                
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button onClick={handleExportDB} className="btn btn-outline" style={{ borderColor: '#3B82F6', color: '#3B82F6' }}>
                    <i className="ri-download-2-line"></i> Ekspor Database (Download JSON)
                  </button>
                  
                  <label className="btn btn-outline" style={{ borderColor: '#10B981', color: '#10B981', margin: 0, display: 'inline-flex', cursor: 'pointer' }}>
                    <i className="ri-upload-2-line"></i> Impor Database (Upload JSON)
                    <input type="file" style={{ display: 'none' }} accept=".json" onChange={handleImportDB} />
                  </label>

                  <button onClick={handleResetDB} className="btn btn-outline" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
                    <i className="ri-refresh-line"></i> Reset Database ke Awal
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>


      {/* ==================== C. CMS MODALS ZONE ==================== */}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {showProductModal && (
        <div className="admin-modal" style={{ display: 'flex' }}>
          <div className="admin-modal-content">
            <h3 className="panel-title" style={{ marginBottom: '20px' }}>
              {crudProdId ? 'Edit Detail Produk' : 'Tambah Produk Baru'}
            </h3>
            
            <form onSubmit={handleProductSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="crud-prod-name">Nama Produk *</label>
                  <input type="text" id="crud-prod-name" className="admin-input" value={crudProdName} onChange={(e) => setCrudProdName(e.target.value)} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="crud-prod-category">Kategori *</label>
                  <select id="crud-prod-category" className="admin-input" style={{ backgroundColor: 'var(--dark-navy)' }} value={crudProdCategory} onChange={(e) => setCrudProdCategory(e.target.value)} required>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', alignItems: 'flex-end' }}>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="crud-prod-image-url">URL Foto Produk (Unsplash/ImgBB) *</label>
                  <input type="text" id="crud-prod-image-url" className="admin-input" placeholder="https://..." value={crudProdImageUrl} onChange={(e) => setCrudProdImageUrl(e.target.value)} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label" style={{ cursor: 'pointer', backgroundColor: 'var(--dark-navy)', border: '1px dashed var(--glass-border)', padding: '10px', borderRadius: '8px', display: 'block', textAlign: 'center', fontSize: '0.8rem', margin: 0 }}>
                    <i className="ri-image-add-line" style={{ fontSize: '1.1rem', color: 'var(--neon-blue)', display: 'block', marginBottom: '4px' }}></i> Upload Foto Lokal
                    <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleLocalImageUpload} />
                  </label>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label" htmlFor="crud-prod-description">Deskripsi Produk *</label>
                <textarea id="crud-prod-description" className="admin-input" style={{ height: '80px', resize: 'none' }} placeholder="Tulis ringkasan penjelasan..." value={crudProdDescription} onChange={(e) => setCrudProdDescription(e.target.value)} required></textarea>
              </div>

              <div className="admin-form-group">
                <label className="admin-label" htmlFor="crud-prod-specs">Spesifikasi Teknis (Tulis satu per baris / enter) *</label>
                <textarea id="crud-prod-specs" className="admin-input" style={{ height: '100px', resize: 'none' }} placeholder="Daya: 9 Watt&#10;Konektivitas: WiFi 2.4 GHz" value={crudProdSpecs} onChange={(e) => setCrudProdSpecs(e.target.value)} required></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <label className="admin-label" style={{ margin: 0 }}>Status Tampilkan Produk?</label>
                <select id="crud-prod-status" className="admin-input" style={{ width: '150px', backgroundColor: 'var(--dark-navy)' }} value={crudProdStatus} onChange={(e) => setCrudProdStatus(e.target.value)} required>
                  <option value="show">Tampilkan</option>
                  <option value="hide">Sembunyikan</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
                <button type="button" onClick={() => setShowProductModal(false)} className="btn btn-outline" style={{ borderColor: 'var(--glass-border)', color: 'var(--pure-white)' }}>Batal</button>
                <button type="submit" className="btn btn-neon">Simpan Produk</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MANAGE CATEGORIES */}
      {showCategoryModal && (
        <div className="admin-modal" style={{ display: 'flex' }}>
          <div className="admin-modal-content" style={{ maxWidth: '650px' }}>
            <h3 className="panel-title" style={{ marginBottom: '20px' }}>Manajemen Kategori Produk</h3>
            
            {/* List Categories */}
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '12px', marginBottom: '24px', backgroundColor: 'var(--dark-navy)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                    <th style={{ padding: '6px 0' }}>ID Kategori</th>
                    <th>Nama Kategori</th>
                    <th style={{ width: '80px', textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(cat => (
                    <tr key={cat.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '8px 0', fontWeight: 700, color: 'var(--pure-white)' }}>{cat.id}</td>
                      <td style={{ color: 'var(--pure-white)' }}>{cat.name}</td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button onClick={() => handleEditCategory(cat)} className="btn" style={{ padding: '4px 8px', fontSize: '0.7rem', backgroundColor: 'rgba(0,210,255,0.1)', color: 'var(--neon-blue)', marginRight: '4px' }}>
                          <i className="ri-pencil-line"></i>
                        </button>
                        <button onClick={() => handleDeleteCategory(cat.id)} className="btn" style={{ padding: '4px 8px', fontSize: '0.7rem', backgroundColor: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Category Form */}
            <h4 className="admin-label" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>Tambah / Edit Kategori Baru</h4>
            <form onSubmit={handleCategorySubmit} style={{ marginTop: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '16px' }}>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="crud-cat-id">ID Kategori *</label>
                  <input type="text" id="crud-cat-id" className="admin-input" placeholder="smart-home" value={crudCatId} onChange={(e) => setCrudCatId(e.target.value)} readonly={catIdReadOnly} required />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label" htmlFor="crud-cat-name">Nama Tampilan *</label>
                  <input type="text" id="crud-cat-name" className="admin-input" placeholder="Smart Home" value={crudCatName} onChange={(e) => setCrudCatName(e.target.value)} required />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label" htmlFor="crud-cat-desc">Deskripsi Singkat *</label>
                <input type="text" id="crud-cat-desc" className="admin-input" placeholder="Saklar pintar, CCTV, dll..." value={crudCatDesc} onChange={(e) => setCrudCatDesc(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowCategoryModal(false)} className="btn btn-outline" style={{ borderColor: 'var(--glass-border)', color: 'var(--pure-white)' }}>Tutup</button>
                <button type="submit" className="btn btn-neon">Simpan Kategori</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
