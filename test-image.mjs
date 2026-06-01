import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function fix() {
  const products = await sql`SELECT id, image FROM products`;
  for (const p of products) {
    if (p.image && p.image.includes('.r2.dev/')) {
      const filename = p.image.split('.r2.dev/')[1];
      const newUrl = `/api/images/${filename}`;
      await sql`UPDATE products SET image = ${newUrl} WHERE id = ${p.id}`;
      console.log(`Updated ${p.id} to ${newUrl}`);
    }
  }
  console.log('Done!');
}

fix().catch(console.error);
