import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL tidak ditemukan di .env.local');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function alterDatabase() {
  console.log('Menyambungkan ke database Neon untuk update schema...');

  try {
    console.log('Menambahkan kolom facebook...');
    await sql`ALTER TABLE settings ADD COLUMN IF NOT EXISTS facebook VARCHAR(255)`;
    console.log('Menambahkan kolom instagram...');
    await sql`ALTER TABLE settings ADD COLUMN IF NOT EXISTS instagram VARCHAR(255)`;
    console.log('Menambahkan kolom threads...');
    await sql`ALTER TABLE settings ADD COLUMN IF NOT EXISTS threads VARCHAR(255)`;
    console.log('Menambahkan kolom tiktok...');
    await sql`ALTER TABLE settings ADD COLUMN IF NOT EXISTS tiktok VARCHAR(255)`;
    
    // Update data with defaults
    await sql`UPDATE settings SET 
        instagram = 'https://www.instagram.com/official.bos_smart/',
        threads = 'https://www.threads.com/@official.bos_smart'
        WHERE id = 'global'`;
    
    console.log('Kolom sosmed berhasil ditambahkan.');
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
}

alterDatabase();
