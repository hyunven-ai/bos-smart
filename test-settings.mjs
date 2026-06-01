import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function check() {
  const result = await sql`SELECT * FROM settings`;
  console.log(result);
}

check().catch(console.error);
