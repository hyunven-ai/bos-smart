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
          '6281217309510',
          'Info@bos-smart.com',
          'Ruko Villa Mutiara Cikarang 2 Blok F1 No. 05, Cikarang Utara, Bekasi, Jawa Barat 17530',
          'BOS SMART - Smart Living Starts Here',
          'Solusi perangkat Smart Home, Kitchen & Home Living modern, dan pasokan Electrical & Technical Supply premium dari PT Berkat Optimal Semesta (BOS SMART).',
          'smart home, kitchen living, electrical supply, stabilizer, tuya, smart socket, cikarang, bekasi, pt berkat optimal semesta, bos smart',
          'admin',
          'admin123'
        )
      `;
    }

    const countPages = await sql`SELECT COUNT(*) as count FROM pages`;
    if (countPages[0].count == 0) {
      const whyPillars = JSON.stringify([
        { id: 'sourcing', title: 'Direct Sourcing', desc: 'Akses langsung ke pabrik-pabrik manufaktur terpercaya untuk efisiensi biaya luar biasa.' },
        { id: 'qc', title: 'Quality Assurance', desc: 'Setiap unit produk melewati pemeriksaan kualitas berlapis sebelum dikirim ke pelanggan.' },
        { id: 'price', title: 'Competitive Price', desc: 'Harga tangan pertama tanpa perantara tambahan, memberikan margin keuntungan terbaik untuk mitra kami.' },
        { id: 'support', title: 'Professional Support', desc: 'Dukungan teknis, konsultasi produk, dan garansi resmi oleh tim ahli kami.' },
        { id: 'complete', title: 'Complete Products', desc: 'Rentang katalog produk yang luas dan terus berkembang sesuai kebutuhan teknologi terupdate.' },
        { id: 'partnership', title: 'Reliable Partnership', desc: 'Komitmen untuk menjadi mitra logistik dan pasokan terpercaya yang mendukung kelancaran bisnis Anda.' }
      ]);
      const aboutMission = JSON.stringify([
        'Menyediakan produk berkualitas tinggi dengan teknologi terdepan langsung dari produsen global terpercaya.',
        'Menerapkan sistem kontrol kualitas (QC) yang ketat untuk menjamin kepuasan dan keselamatan pengguna.',
        'Membangun kemitraan jangka panjang yang saling menguntungkan dengan pelanggan retail maupun korporat.',
        'Memberikan layanan purna jual yang responsif, profesional, dan berorientasi pada solusi.'
      ]);

      await sql`
        INSERT INTO pages (
          id, hero_title, hero_subtitle, hero_description, hero_cta_primary, hero_cta_secondary,
          about_title, about_description, about_vision, about_mission,
          why_title, why_description, why_pillars
        ) VALUES (
          'global',
          'Smart Living Starts Here',
          'Home & Smart Products • Electrical & Technical Supply',
          'Solusi terintegrasi untuk kebutuhan rumah pintar modern dan pasokan kelistrikan berkualitas tinggi. Dari pabrik lokal dan sourching China dengan Quality Control ketat dan After Sales Support professional.',
          'Lihat Produk',
          'Hubungi Kami',
          'Profil PT Berkat Optimal Semesta (BOS SMART)',
          'PT Berkat Optimal Semesta (BOS SMART) adalah perusahaan terkemuka yang bergerak di bidang penyediaan solusi hunian pintar (Smart Home), peralatan rumah tangga & dapur modern (Kitchen & Living), serta pasokan kelistrikan industri dan komersial (Electrical Supply). Kami bermitra langsung dengan produsen global terbaik di China untuk menghadirkan teknologi pintar yang andal, efisien, dan terjangkau bagi pasar Indonesia.',
          'Menjadi pemimpin pasar nasional dalam penyediaan solusi smart living dan pasokan kelistrikan terintegrasi melalui inovasi, keandalan, dan pelayanan purna jual terbaik.',
          ${aboutMission},
          'Mengapa Memilih BOS SMART?',
          'Kami menawarkan solusi menyeluruh dari hulu ke hilir untuk memastikan Anda mendapatkan produk berkualitas tinggi dengan harga pabrik yang kompetitif dan dukungan purna jual jangka panjang.',
          ${whyPillars}
        )
      `;
    }

    const countCategories = await sql`SELECT COUNT(*) as count FROM categories`;
    if (countCategories[0].count == 0) {
      await sql`
        INSERT INTO categories (id, name, description, sort_order) VALUES
        ('kitchen-living', 'BOS HOME & LIVING', 'Practical Living Everyday', 1),
        ('smart-home', 'BOS SMART', 'Smart Living Made Simple', 2),
        ('electrical-supply', 'Stabilizer & Transformer Solutions', 'Reliable Power Solutions', 3)
      `;
    }

    const countProducts = await sql`SELECT COUNT(*) as count FROM products`;
    if (countProducts[0].count == 0) {
      // Data produk default (kita tambahkan beberapa)
      await sql`
        INSERT INTO products (id, name, category_id, image, description, specs, status) VALUES
        ('p-1', 'BOS Smart WiFi LED Bulb 9W RGB+CCT', 'smart-home', 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=600&auto=format&fit=crop', 'Lampu pintar hemat energi dengan konektivitas WiFi langsung (tanpa hub). Dapat dikontrol melalui aplikasi smartphone TUYA / Smart Life atau menggunakan perintah suara Alexa & Google Assistant. Menampilkan 16 juta warna (RGB) dan tingkat temperatur warna hangat ke dingin (2700K - 6500K).', 'Daya: 9 Watt\nKecerahan: 810 Lumens\nKonektivitas: WiFi 2.4 GHz\nKecocokan Aplikasi: TUYA / Smart Life / Alexa / Google Assistant\nUmur Lampu: hingga 25.000 Jam\nGaransi: 1 Tahun Ganti Baru', 'show'),
        ('p-4', 'BOS Premium Intelligent Air Fryer 4.5L', 'kitchen-living', 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=600&auto=format&fit=crop', 'Alat penggoreng udara pintar berkapasitas besar 4.5 Liter untuk memasak sehat tanpa minyak. Memiliki panel kontrol sentuh digital LED dengan 8 menu resep bawaan otomatis. Menggunakan teknologi sirkulasi udara panas cepat 360 derajat untuk menghasilkan makanan yang renyah di luar dan lembut di dalam.', 'Kapasitas: 4.5 Liter\nDaya Listrik: 1200 Watt\nTegangan: 220V - 50Hz\nRentang Suhu: 80°C - 200°C\nRentang Waktu: 0 - 60 Menit\nLapisan Wadah: Teflon Food Grade Non-Stick (Anti Lengket)', 'show'),
        ('p-6', 'BOS Industrial Servo-Motor Stabilizer 10kVA', 'electrical-supply', 'https://images.unsplash.com/photo-1618042164219-62c820f10723?q=80&w=600&auto=format&fit=crop', 'Stabilizer tegangan tipe servo motor berkapasitas tinggi 10kVA (10.000 VA). Dirancang khusus untuk menstabilkan fluktuasi voltase listrik di kawasan industri, kantor, atau rumah dengan peralatan sensitif tinggi. Menghindari kerusakan akibat lonjakan tegangan yang tidak stabil.', 'Kapasitas: 10 kVA (10.000 VA)\nTegangan Input: 140V - 250V AC\nTegangan Output: 220V (Akurasi ± 2%)\nSistem Kontrol: Servo Motor Drive\nProteksi: Over-Voltage, Under-Voltage, Over-Temp, Short-Circuit\nPendingin: Kipas otomatis berbasis sensor suhu', 'show')
      `;
    }

    console.log('Setup database berhasil! Tabel dan data bawaan telah dimasukkan.');
  } catch (error) {
    console.error('Terjadi kesalahan saat setup database:', error);
  }
}

setupDatabase();
