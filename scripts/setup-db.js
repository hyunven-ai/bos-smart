import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL tidak ditemukan di .env.local');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function setupDatabase() {
  console.log('Menyambungkan ke database Neon...');

  try {
    console.log('Membuat tabel `settings`...');
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        id VARCHAR(255) PRIMARY KEY,
        whatsapp VARCHAR(255),
        email VARCHAR(255),
        address TEXT,
        seo_title VARCHAR(255),
        seo_description TEXT,
        seo_keywords TEXT,
        admin_username VARCHAR(255),
        admin_password VARCHAR(255)
      )
    `;

    console.log('Membuat tabel `pages`...');
    await sql`
      CREATE TABLE IF NOT EXISTS pages (
        id VARCHAR(255) PRIMARY KEY,
        hero_title VARCHAR(255),
        hero_subtitle VARCHAR(255),
        hero_description TEXT,
        hero_cta_primary VARCHAR(255),
        hero_cta_secondary VARCHAR(255),
        about_title VARCHAR(255),
        about_description TEXT,
        about_vision TEXT,
        about_mission TEXT,
        why_title VARCHAR(255),
        why_description TEXT,
        why_pillars TEXT
      )
    `;

    console.log('Membuat tabel `categories`...');
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        sort_order INTEGER
      )
    `;

    console.log('Membuat tabel `products`...');
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        category_id VARCHAR(255),
        image TEXT,
        description TEXT,
        specs TEXT,
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Membuat tabel `inbox`...');
    await sql`
      CREATE TABLE IF NOT EXISTS inbox (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(255),
        message TEXT,
        date TIMESTAMP,
        status VARCHAR(50)
      )
    `;

    // Seed Data
    console.log('Memasukkan data default...');

    const countSettings = await sql`SELECT COUNT(*) as count FROM settings`;
    if (countSettings[0].count == 0) {
      await sql`
        INSERT INTO settings (id, whatsapp, email, address, seo_title, seo_description, seo_keywords, admin_username, admin_password)
        VALUES (
          'global',
          '6287888638008',
          'Info@bos-smart.com',
          'Jl.R E Martadinata No 56 komplek Primokom Nusa Lestari blok D1 Ancol, Jakarta Utara',
          'BOS SMART | Lighting & Power Solutions',
          'Solusi pencahayaan dan sistem daya untuk kebutuhan komersial, industri, dan proyek. Professional Lighting, Architectural & Façade Lighting, serta Stabilizer & Transformer dari PT Berkat Optimal Semesta (BOS SMART).',
          'lighting solutions, power solutions, professional lighting, architectural lighting, facade lighting, stabilizer, transformer, pt berkat optimal semesta, bos smart',
          'admin',
          'admin123'
        )
      `;
    }

    const countPages = await sql`SELECT COUNT(*) as count FROM pages`;
    if (countPages[0].count == 0) {
      const whyPillars = JSON.stringify([
        { id: 'lighting', title: 'Professional Lighting', desc: 'Sistem pencahayaan teruji untuk kebutuhan komersial, kantor, dan proyek dengan efisiensi energi tinggi.' },
        { id: 'facade', title: 'Architectural & Façade', desc: 'Solusi visual pencahayaan fasad dan arsitektur gedung yang estetis, andal, dan berstandar internasional.' },
        { id: 'power', title: 'Power Solutions', desc: 'Distribusi stabilizer dan transformer tangguh untuk perlindungan tegangan listrik industri dan proyek.' },
        { id: 'project', title: 'Project Solutions', desc: 'Konsultasi spesifikasi teknik, integrasi sistem, dan penyesuaian khusus (custom) sesuai kebutuhan proyek.' },
        { id: 'qc', title: 'Quality Assurance', desc: 'Setiap unit produk melewati pemeriksaan mutu berlapis untuk memastikan durabilitas dan keselamatan kerja.' },
        { id: 'support', title: 'After-Sales Support', desc: 'Dukungan purna jual responsif, ketersediaan suku cadang, dan garansi resmi oleh tim teknis kami.' }
      ]);
      const aboutMission = JSON.stringify([
        'Menghadirkan sistem pencahayaan profesional dan architectural & façade lighting terdepan untuk proyek arsitektur, komersial, dan industri.',
        'Menyediakan solusi proteksi daya stabilizer dan transformer andal guna menjaga kontinuitas dan kestabilan sistem operasional listrik.',
        'Menjalin kemitraan strategis dengan pabrikan terpercaya lokal dan global untuk menjamin kualitas standar internasional.',
        'Memberikan layanan konsultasi spesifikasi proyek dan after-sales support teknis yang profesional dan berkesinambungan.'
      ]);

      await sql`
        INSERT INTO pages (
          id, hero_title, hero_subtitle, hero_description, hero_cta_primary, hero_cta_secondary,
          about_title, about_description, about_vision, about_mission,
          why_title, why_description, why_pillars
        ) VALUES (
          'global',
          'LIGHTING & POWER SOLUTIONS',
          'Professional Lighting • Architectural & Façade Lighting • Stabilizer & Transformer',
          'Solusi pencahayaan dan sistem daya untuk kebutuhan komersial, industri, dan proyek. Didukung produk berkualitas, solusi yang disesuaikan dengan kebutuhan proyek, serta after-sales support yang profesional.',
          'Lihat Produk',
          'Hubungi Kami',
          'Profil PT Berkat Optimal Semesta (BOS SMART)',
          'PT Berkat Optimal Semesta (BOS SMART) adalah perusahaan yang bergerak di bidang Lighting & Power Solutions, dengan fokus pada solusi pencahayaan profesional, Architectural & Façade Lighting, serta Stabilizer & Transformer untuk kebutuhan komersial, industri, dan proyek.\n\nKami bekerja sama dengan mitra manufaktur terpercaya, baik lokal maupun internasional, untuk menghadirkan solusi yang andal, efisien, dan sesuai dengan kebutuhan setiap proyek di Indonesia.',
          'Menjadi mitra terdepan dan terpercaya di Indonesia dalam penyediaan solusi pencahayaan arsitektural dan sistem manajemen daya terintegrasi melalui produk berkualitas, inovasi, dan layanan purna jual terbaik.',
          ${aboutMission},
          'Mengapa Memilih BOS SMART?',
          'Kami menawarkan solusi menyeluruh dari konsultasi teknis, pasokan produk berkualitas standar industri, hingga dukungan purna jual jangka panjang untuk proyek Anda.',
          ${whyPillars}
        )
      `;
    }

    const countCategories = await sql`SELECT COUNT(*) as count FROM categories`;
    if (countCategories[0].count == 0) {
      await sql`
        INSERT INTO categories (id, name, description, sort_order) VALUES
        ('professional-lighting', 'PROFESSIONAL LIGHTING', 'Reliable Lighting Solutions for Commercial & Project Applications', 1),
        ('architectural-facade', 'ARCHITECTURAL & FAÇADE LIGHTING', 'Lighting Solutions for Architecture, Façade & Custom Projects', 2),
        ('electrical-supply', 'STABILIZER & TRANSFORMER SOLUTIONS', 'Reliable Power Solutions for Commercial & Industrial Applications', 3)
      `;
    }

    const countProducts = await sql`SELECT COUNT(*) as count FROM products`;
    if (countProducts[0].count == 0) {
      await sql`
        INSERT INTO products (id, name, category_id, image, description, specs, status) VALUES
        ('prod-t8-lighting', 'BOS Professional T8 LED Batten & Tube', 'professional-lighting', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop', 'Lampu tabung T8 LED efisiensi tinggi untuk kebutuhan penerangan komersial, perkantoran, dan area industri.', 'Tipe: T8 LED Tube & Fixture\nDaya: 9W / 18W / 36W\nEfikasi: 120 lm/W\nCCT: 4000K / 6500K\nGaransi: 2 Tahun', 'show'),
        ('prod-office-lighting', 'BOS Architectural Office Linear Lighting', 'professional-lighting', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop', 'Sistem pencahayaan linear gantung dan tempel untuk area kantor modern, ruang meeting, dan koridor komersial.', 'Tipe: Suspended / Surface Mount Linear Luminaire\nDaya: 36W / 48W\nPanjang: 1200mm / 1500mm\nUGR: < 19\nGaransi: 3 Tahun', 'show'),
        ('prod-panel-light', 'BOS Commercial Ultra-Slim Panel Light', 'professional-lighting', 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=800&auto=format&fit=crop', 'Lampu panel LED tipis untuk plafon akustik, gypsum, dan T-bar grid dengan pencahayaan merata bebas silau.', 'Ukuran: 600x600mm / 300x1200mm\nDaya: 36W / 40W\nCCT: 4000K / 6500K\nGaransi: 2 Tahun', 'show'),
        ('prod-wall-washer', 'BOS High-Performance Outdoor Wall Washer', 'architectural-facade', 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f7?q=80&w=800&auto=format&fit=crop', 'Lampu wall washer eksterior berkekuatan tinggi untuk penyinaran fasad gedung, dinding arsitektur, dan monumen.', 'Daya: 24W / 36W / 72W\nProteksi: IP66 Outdoor Waterproof\nCCT: 3000K / 4000K / DMX512 RGBW\nGaransi: 3 Tahun', 'show'),
        ('prod-linear-lighting', 'BOS Architectural Exterior Linear Façade', 'architectural-facade', '/about_lighting.jpg', 'Profil pencahayaan linier tahan cuaca untuk membingkai kontur arsitektur dan aksen fasad modern.', 'Daya: 18W / Meter\nProteksi: IP67 Waterproof\nGaransi: 3 Tahun', 'show')
      `;
    }

    console.log('Setup database berhasil! Tabel dan data bawaan telah dimasukkan.');
  } catch (error) {
    console.error('Terjadi kesalahan saat setup database:', error);
  }
}

setupDatabase();
