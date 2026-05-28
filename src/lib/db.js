/**
 * BOS SMART - Next.js Local Database Layer
 * Menggunakan localStorage secara aman dalam Next.js (SSR safe).
 */

const DB_KEY = 'bos_smart_db';

const defaultData = {
  settings: {
    whatsapp: '6281217309510',
    email: 'Info@bos-smart.com',
    address: 'Ruko Villa Mutiara Cikarang 2 Blok F1 No. 05, Cikarang Utara, Bekasi, Jawa Barat 17530',
    seoTitle: 'BOS Tech - Smart Living Starts Here',
    seoDescription: 'Solusi perangkat Smart Home, Kitchen & Home Living modern, dan pasokan Electrical & Technical Supply premium dari PT Berkat Optimal Semesta (BOS Tech).',
    seoKeywords: 'smart home, kitchen living, electrical supply, stabilizer, tuya, smart socket, cikarang, bekasi, pt berkat optimal semesta, bos tech',
    admin: {
      username: 'admin',
      password: 'admin123'
    }
  },
  pages: {
    hero: {
      title: 'Smart Living Starts Here',
      subtitle: 'Home & Smart Products • Electrical & Technical Supply',
      description: 'Solusi terintegrasi untuk kebutuhan rumah pintar modern dan pasokan kelistrikan berkualitas tinggi. Sourcing langsung dari pabrik China dengan Quality Control ketat dan After Sales Support profesional.',
      ctaPrimary: 'Lihat Produk',
      ctaSecondary: 'Hubungi Kami'
    },
    about: {
      title: 'Profil PT Berkat Optimal Semesta (BOS SMART)',
      description: 'PT Berkat Optimal Semesta (BOS SMART) adalah perusahaan terkemuka yang bergerak di bidang penyediaan solusi hunian pintar (Smart Home), peralatan rumah tangga & dapur modern (Kitchen & Living), serta pasokan kelistrikan industri dan komersial (Electrical Supply). Kami bermitra langsung dengan produsen global terbaik di China untuk menghadirkan teknologi pintar yang andal, efisien, dan terjangkau bagi pasar Indonesia.',
      vision: 'Menjadi pemimpin pasar nasional dalam penyediaan solusi smart living dan pasokan kelistrikan terintegrasi melalui inovasi, keandalan, dan pelayanan purna jual terbaik.',
      mission: [
        'Menyediakan produk berkualitas tinggi dengan teknologi terdepan langsung dari produsen global terpercaya.',
        'Menerapkan sistem kontrol kualitas (QC) yang ketat untuk menjamin kepuasan dan keselamatan pengguna.',
        'Membangun kemitraan jangka panjang yang saling menguntungkan dengan pelanggan retail maupun korporat.',
        'Memberikan layanan purna jual yang responsif, profesional, dan berorientasi pada solusi.'
      ]
    },
    whyChooseUs: {
      title: 'Mengapa Memilih BOS Tech?',
      description: 'Kami menawarkan solusi menyeluruh dari hulu ke hilir untuk memastikan Anda mendapatkan produk berkualitas tinggi dengan harga pabrik yang kompetitif dan dukungan purna jual jangka panjang.',
      pillars: [
        {
          id: 'sourcing',
          title: 'Direct Sourcing',
          desc: 'Akses langsung ke pabrik-pabrik manufaktur terpercaya di China untuk efisiensi biaya luar biasa.'
        },
        {
          id: 'qc',
          title: 'Quality Assurance',
          desc: 'Setiap unit produk melewati pemeriksaan kualitas berlapis sebelum dikirim ke pelanggan.'
        },
        {
          id: 'price',
          title: 'Competitive Price',
          desc: 'Harga tangan pertama tanpa perantara tambahan, memberikan margin keuntungan terbaik untuk mitra kami.'
        },
        {
          id: 'support',
          title: 'Professional Support',
          desc: 'Dukungan teknis, konsultasi produk, dan garansi resmi oleh tim ahli kami di Cikarang.'
        },
        {
          id: 'complete',
          title: 'Complete Products',
          desc: 'Rentang katalog produk yang luas dan terus berkembang sesuai kebutuhan teknologi terupdate.'
        },
        {
          id: 'partnership',
          title: 'Reliable Partnership',
          desc: 'Komitmen untuk menjadi mitra logistik dan pasokan terpercaya yang mendukung kelancaran bisnis Anda.'
        }
      ]
    }
  },
  categories: [
    { id: 'kitchen-living', name: 'BOS HOME & LIVING', desc: 'Practical Living Everyday' },
    { id: 'smart-home', name: 'BOS SMART', desc: 'Smart Living Made Simple' },
    { id: 'electrical-supply', name: 'Stabilizer & Transformer Solutions', desc: 'Reliable Power Solutions' }
  ],
  products: [
    {
      id: 'p-1',
      name: 'BOS Smart WiFi LED Bulb 9W RGB+CCT',
      category: 'smart-home',
      image: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=600&auto=format&fit=crop',
      description: 'Lampu pintar hemat energi dengan konektivitas WiFi langsung (tanpa hub). Dapat dikontrol melalui aplikasi smartphone TUYA / Smart Life atau menggunakan perintah suara Alexa & Google Assistant. Menampilkan 16 juta warna (RGB) dan tingkat temperatur warna hangat ke dingin (2700K - 6500K).',
      specs: 'Daya: 9 Watt\nKecerahan: 810 Lumens\nKonektivitas: WiFi 2.4 GHz\nKecocokan Aplikasi: TUYA / Smart Life / Alexa / Google Assistant\nUmur Lampu: hingga 25.000 Jam\nGaransi: 1 Tahun Ganti Baru',
      status: 'show'
    },
    {
      id: 'p-2',
      name: 'BOS Smart Outdoor PTZ IP Camera 4MP',
      category: 'smart-home',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=600&auto=format&fit=crop',
      description: 'Kamera pengawas luar ruangan resolusi ultra-tinggi 4MP (2K). Dilengkapi fitur Pan-Tilt-Zoom (PTZ) 360 derajat, sensor gerak pintar otomatis dengan notifikasi real-time ke HP, penglihatan malam inframerah berwarna (Full Color Night Vision), dan audio dua arah untuk berbicara jarak jauh.',
      specs: 'Resolusi: 4 Megapixel (2560 x 1440)\nSudut Rotasi: Horisontal 355°, Vertikal 90°\nProteksi Cuaca: IP66 Tahan Air & Debu\nKonektivitas: WiFi 2.4GHz & Port Ethernet RJ45\nMedia Penyimpanan: Micro SD (Hingga 128GB) & Cloud Storage\nAudio: Dua Arah (Microphone & Speaker Terintegrasi)',
      status: 'show'
    },
    {
      id: 'p-3',
      name: 'BOS Smart WiFi Wall Socket 16A with Power Monitor',
      category: 'smart-home',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=600&auto=format&fit=crop',
      description: 'Stop kontak dinding pintar dengan koneksi WiFi langsung. Memungkinkan Anda mematikan/menghidupkan peralatan elektronik rumah dari jarak jauh, membuat jadwal otomatis, serta memonitor konsumsi energi secara real-time demi efisiensi biaya listrik rumah tangga.',
      specs: 'Arus Maksimal: 16 Ampere\nTegangan Kerja: 100V - 240V AC\nKonektivitas: WiFi 2.4 GHz\nMaterial: PC Flame Retardant (Tahan Api)\nFitur Khusus: Real-time Power Monitoring & Overload Protection\nSertifikasi: CE / RoHS / FCC',
      status: 'show'
    },
    {
      id: 'p-8',
      name: 'BOS Smart Motion Sensor LED Night Light',
      category: 'smart-home',
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=600&auto=format&fit=crop',
      description: 'Lampu malam pintar dengan sensor gerak inframerah (PIR) dan sensor cahaya otomatis. Lampu hanya akan menyala saat mendeteksi gerakan dalam gelap dan mati otomatis setelah 20 detik tanpa gerakan. Sangat hemat energi, cocok untuk koridor, tangga, kamar mandi, atau kamar tidur anak.',
      specs: 'Tipe Sensor: Sensor Gerak PIR & Sensor Cahaya\nJarak Deteksi: 3 - 5 Meter\nSudut Sensor: 120 Derajat\nDaya: 0.6 Watt (Sangat Hemat Energi)\nTemperatur Warna: 3000K (Warm White) / 6000K (Cool White)\nBahan: ABS Tahan Panas & Premium Matte Finish\nSumber Daya: Baterai Rechargeable USB / Plug-in',
      status: 'show'
    },
    {
      id: 'p-4',
      name: 'BOS Premium Intelligent Air Fryer 4.5L',
      category: 'kitchen-living',
      image: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=600&auto=format&fit=crop',
      description: 'Alat penggoreng udara pintar berkapasitas besar 4.5 Liter untuk memasak sehat tanpa minyak. Memiliki panel kontrol sentuh digital LED dengan 8 menu resep bawaan otomatis. Menggunakan teknologi sirkulasi udara panas cepat 360 derajat untuk menghasilkan makanan yang renyah di luar dan lembut di dalam.',
      specs: 'Kapasitas: 4.5 Liter\nDaya Listrik: 1200 Watt\nTegangan: 220V - 50Hz\nRentang Suhu: 80°C - 200°C\nRentang Waktu: 0 - 60 Menit\nLapisan Wadah: Teflon Food Grade Non-Stick (Anti Lengket)',
      status: 'show'
    },
    {
      id: 'p-5',
      name: 'BOS Digital Smart Multi-Cooker & Rice Cooker',
      category: 'kitchen-living',
      image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop',
      description: 'Multi-cooker serbaguna digital dengan 10 fungsi memasak otomatis, mulai dari menanak nasi rendah gula, merebus sup, membuat bubur, mengukus, hingga memanggang kue. Wadah bagian dalam tebal dengan lapisan keramik anti gores untuk pemanasan merata.',
      specs: 'Kapasitas: 2.0 Liter\nDaya Listrik: 400 Watt (Hemat Energi)\nFitur Khusus: Preset memasak hingga 24 Jam, Fungsi penghangat otomatis\nWadah: Ceramic Coating Inner Pot tebal 5 lapis\nAksesori: Wadah kukus, gelas ukur, sendok nasi',
      status: 'show'
    },
    {
      id: 'p-6',
      name: 'BOS Industrial Servo-Motor Stabilizer 10kVA',
      category: 'electrical-supply',
      image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?q=80&w=600&auto=format&fit=crop',
      description: 'Stabilizer tegangan tipe servo motor berkapasitas tinggi 10kVA (10.000 VA). Dirancang khusus untuk menstabilkan fluktuasi voltase listrik di kawasan industri, kantor, atau rumah dengan peralatan sensitif tinggi. Menghindari kerusakan akibat lonjakan tegangan yang tidak stabil.',
      specs: 'Kapasitas: 10 kVA (10.000 VA)\nTegangan Input: 140V - 250V AC\nTegangan Output: 220V (Akurasi ± 2%)\nSistem Kontrol: Servo Motor Drive\nProteksi: Over-Voltage, Under-Voltage, Over-Temp, Short-Circuit\nPendingin: Kipas otomatis berbasis sensor suhu',
      status: 'show'
    },
    {
      id: 'p-7',
      name: 'BOS Step-Down Auto Transformer 3-Phase 15kVA',
      category: 'electrical-supply',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop',
      description: 'Transformator 3-Phase tipe autotransformer berkualitas tinggi untuk menyesuaikan tegangan pasokan industri 380V diturunkan ke 220V atau sesuai spesifikasi mesin impor China/Jepang. Lilitan tembaga murni dengan isolasi kelas H berkualitas tinggi menjamin efisiensi tinggi.',
      specs: 'Kapasitas Daya: 15 kVA\nJumlah Phase: 3-Phase\nTegangan Input: 380V AC\nTegangan Output: 220V / 200V AC\nBahan Gulungan: Tembaga Murni (Pure Copper)\nKelas Isolasi: Class H (Hingga 180°C)\nProteksi Wadah: IP20 Metal Enclosure',
      status: 'show'
    },
    {
      id: 'p-9',
      name: 'BOS Digital Automatic Voltage Regulator (AVR) 5000VA',
      category: 'electrical-supply',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
      description: 'Stabilizer tegangan otomatis (AVR) kapasitas 5000VA untuk melindungi peralatan elektronik rumah tangga dan kantor seperti komputer, AC, kulkas, dan TV dari fluktuasi voltase yang tidak stabil. Dilengkapi dengan dual digital meter untuk memantau input dan output voltage secara real-time.',
      specs: 'Kapasitas Daya: 5000 VA (Akurasi Tinggi)\nTegangan Input: 160V - 250V AC\nTegangan Output: 220V / 110V AC (Dual Output)\nTipe Kontrol: Relay Control System\nProteksi: Over-Voltage, Overload, Short-Circuit, & Delay Output\nDimensi: Ringkas & Portable dengan Handle Kokoh',
      status: 'show'
    }
  ],
  inbox: [
    {
      id: 'm-1',
      name: 'Budi Santoso',
      email: 'budi.santoso@yahoo.com',
      phone: '081298765432',
      message: 'Halo admin BOS SMART, saya dari PT Maju Jaya Makmur ingin menanyakan penawaran harga untuk Stabilizer 10kVA sebanyak 5 unit untuk mesin produksi kami di Cikarang. Apakah ada harga khusus korporat?',
      date: '2026-05-24T14:30:00Z',
      status: 'unread'
    },
    {
      id: 'm-2',
      name: 'Sarah Wijaya',
      email: 'sarah.wijaya@gmail.com',
      phone: '085712345678',
      message: 'Apakah produk Smart WiFi LED Bulb dan IP Camera outdoor-nya bisa dikoneksikan ke satu aplikasi yang sama (TUYA)? Dan apakah ada layanan instalasi ke rumah daerah Bekasi?',
      date: '2026-05-25T09:15:00Z',
      status: 'unread'
    }
  ]
};

// SSR-safe database getter
export function getDB() {
  if (typeof window === 'undefined') {
    return defaultData;
  }
  const dbDataStr = localStorage.getItem(DB_KEY);
  if (!dbDataStr) {
    saveDB(defaultData);
    return defaultData;
  }
  try {
    const parsed = JSON.parse(dbDataStr);

    // Auto-update to defaultData if using old default whatsapp
    if (parsed.settings && parsed.settings.whatsapp === '628123456789') {
      saveDB(defaultData);
      return defaultData;
    }

    // Migrasi Kategori & Tagline Otomatis
    let updated = false;
    if (parsed.categories) {
      // 1. BOS HOME & LIVING
      const kitchenCat = parsed.categories.find(c => c.id === 'kitchen-living');
      if (kitchenCat && kitchenCat.name !== 'BOS HOME & LIVING') {
        kitchenCat.name = 'BOS HOME & LIVING';
        kitchenCat.desc = 'Practical Living Everyday';
        updated = true;
      }

      // 2. BOS SMART
      const smartCat = parsed.categories.find(c => c.id === 'smart-home');
      if (smartCat && smartCat.name !== 'BOS SMART') {
        smartCat.name = 'BOS SMART';
        smartCat.desc = 'Smart Living Made Simple';
        updated = true;
      }

      // 3. Stabilizer & Transformer Solutions
      const powerCat = parsed.categories.find(c => c.id === 'electrical-supply');
      if (powerCat && powerCat.name !== 'Stabilizer & Transformer Solutions') {
        powerCat.name = 'Stabilizer & Transformer Solutions';
        powerCat.desc = 'Reliable Power Solutions';
        updated = true;
      }

      // Memastikan urutan kategori mengikuti urutan yang baru (Home & Living, BOS Smart, Stabilizer)
      const sortedIds = ['kitchen-living', 'smart-home', 'electrical-supply'];
      const currentIds = parsed.categories.map(c => c.id);
      if (JSON.stringify(currentIds) !== JSON.stringify(sortedIds)) {
        parsed.categories.sort((a, b) => sortedIds.indexOf(a.id) - sortedIds.indexOf(b.id));
        updated = true;
      }
    }

    // Migrasi Produk Baru Otomatis (Sensor Light & AVR Stabilizer)
    if (parsed.products) {
      const hasSensorLight = parsed.products.some(p => p.id === 'p-8');
      if (!hasSensorLight) {
        const sensorLight = defaultData.products.find(p => p.id === 'p-8');
        if (sensorLight) {
          parsed.products.push(sensorLight);
          updated = true;
        }
      }

      const hasAvrStabilizer = parsed.products.some(p => p.id === 'p-9');
      if (!hasAvrStabilizer) {
        const avrStab = defaultData.products.find(p => p.id === 'p-9');
        if (avrStab) {
          parsed.products.push(avrStab);
          updated = true;
        }
      }
    }

    if (updated) {
      saveDB(parsed);
    }

    return parsed;
  } catch (e) {
    console.error('Error parsing localStorage database, resetting to default.', e);
    saveDB(defaultData);
    return defaultData;
  }
}

export function saveDB(data) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  }
}

export const BOS_DB = {
  getData: getDB,
  saveData: saveDB,

  resetToDefault: function () {
    saveDB(defaultData);
    return defaultData;
  },

  // 1. SETTINGS
  getSettings: function () {
    return getDB().settings;
  },
  updateSettings: function (newSettings) {
    const db = getDB();
    db.settings = { ...db.settings, ...newSettings };
    saveDB(db);
    return db.settings;
  },

  // 2. PAGES CONTENT
  getPages: function () {
    return getDB().pages;
  },
  updatePageContent: function (pageKey, content) {
    const db = getDB();
    db.pages[pageKey] = { ...db.pages[pageKey], ...content };
    saveDB(db);
    return db.pages[pageKey];
  },

  // 3. CATEGORIES
  getCategories: function () {
    return getDB().categories;
  },
  saveCategory: function (category) {
    const db = getDB();
    const index = db.categories.findIndex(c => c.id === category.id);
    if (index >= 0) {
      db.categories[index] = category;
    } else {
      db.categories.push(category);
    }
    saveDB(db);
    return db.categories;
  },
  deleteCategory: function (catId) {
    const db = getDB();
    db.categories = db.categories.filter(c => c.id !== catId);
    saveDB(db);
    return db.categories;
  },

  // 4. PRODUCTS
  getProducts: function () {
    return getDB().products;
  },
  getProductById: function (prodId) {
    return getDB().products.find(p => p.id === prodId);
  },
  saveProduct: function (product) {
    const db = getDB();
    if (!product.id) {
      product.id = 'p-' + Date.now();
    }
    const index = db.products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      db.products[index] = product;
    } else {
      db.products.push(product);
    }
    saveDB(db);
    return product;
  },
  deleteProduct: function (prodId) {
    const db = getDB();
    db.products = db.products.filter(p => p.id !== prodId);
    saveDB(db);
    return db.products;
  },

  // 5. INBOX
  getInbox: function () {
    return getDB().inbox;
  },
  addMessage: function (message) {
    const db = getDB();
    const newMsg = {
      id: 'm-' + Date.now(),
      name: message.name,
      email: message.email,
      phone: message.phone,
      message: message.message,
      date: new Date().toISOString(),
      status: 'unread'
    };
    db.inbox.unshift(newMsg);
    saveDB(db);
    return newMsg;
  },
  markMessageStatus: function (msgId, status) {
    const db = getDB();
    const index = db.inbox.findIndex(m => m.id === msgId);
    if (index >= 0) {
      db.inbox[index].status = status;
      saveDB(db);
    }
    return db.inbox;
  },
  deleteMessage: function (msgId) {
    const db = getDB();
    db.inbox = db.inbox.filter(m => m.id !== msgId);
    saveDB(db);
    return db.inbox;
  }
};
