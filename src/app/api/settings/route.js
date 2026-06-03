export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { sql } from '@/lib/neon';

export async function GET() {
  try {
    const result = await sql`SELECT * FROM settings WHERE id = 'global' LIMIT 1`;
    if (result.length === 0) {
      return NextResponse.json(null);
    }
    const row = result[0];
    return NextResponse.json({
      whatsapp: row.whatsapp,
      email: row.email,
      address: row.address,
      facebook: row.facebook,
      instagram: row.instagram,
      threads: row.threads,
      tiktok: row.tiktok,
      seoTitle: row.seo_title,
      seoDescription: row.seo_description,
      seoKeywords: row.seo_keywords,
      admin: {
        username: row.admin_username,
        password: row.admin_password
      }
    });
  } catch (error) {
    console.error('API Settings Error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    
    // Determine which fields to update
    const setClauses = [];
    if (body.whatsapp !== undefined) setClauses.push(sql`whatsapp = ${body.whatsapp}`);
    if (body.email !== undefined) setClauses.push(sql`email = ${body.email}`);
    if (body.address !== undefined) setClauses.push(sql`address = ${body.address}`);
    if (body.facebook !== undefined) setClauses.push(sql`facebook = ${body.facebook}`);
    if (body.instagram !== undefined) setClauses.push(sql`instagram = ${body.instagram}`);
    if (body.threads !== undefined) setClauses.push(sql`threads = ${body.threads}`);
    if (body.tiktok !== undefined) setClauses.push(sql`tiktok = ${body.tiktok}`);
    if (body.seoTitle !== undefined) setClauses.push(sql`seo_title = ${body.seoTitle}`);
    if (body.seoDescription !== undefined) setClauses.push(sql`seo_description = ${body.seoDescription}`);
    if (body.seoKeywords !== undefined) setClauses.push(sql`seo_keywords = ${body.seoKeywords}`);
    if (body.admin && body.admin.username !== undefined) setClauses.push(sql`admin_username = ${body.admin.username}`);
    if (body.admin && body.admin.password !== undefined) setClauses.push(sql`admin_password = ${body.admin.password}`);

    if (setClauses.length > 0) {
      // Create dynamic SET string
      // This is slightly tricky with tagged template literals, so we do it by executing a generic update
      // Since it's a simple app, we can just update all fields that are provided
      await sql`
        UPDATE settings SET
          whatsapp = COALESCE(${body.whatsapp !== undefined ? body.whatsapp : null}, whatsapp),
          email = COALESCE(${body.email !== undefined ? body.email : null}, email),
          address = COALESCE(${body.address !== undefined ? body.address : null}, address),
          facebook = COALESCE(${body.facebook !== undefined ? body.facebook : null}, facebook),
          instagram = COALESCE(${body.instagram !== undefined ? body.instagram : null}, instagram),
          threads = COALESCE(${body.threads !== undefined ? body.threads : null}, threads),
          tiktok = COALESCE(${body.tiktok !== undefined ? body.tiktok : null}, tiktok),
          seo_title = COALESCE(${body.seoTitle !== undefined ? body.seoTitle : null}, seo_title),
          seo_description = COALESCE(${body.seoDescription !== undefined ? body.seoDescription : null}, seo_description),
          seo_keywords = COALESCE(${body.seoKeywords !== undefined ? body.seoKeywords : null}, seo_keywords),
          admin_username = COALESCE(${body.admin?.username !== undefined ? body.admin.username : null}, admin_username),
          admin_password = COALESCE(${body.admin?.password !== undefined ? body.admin.password : null}, admin_password)
        WHERE id = 'global'
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Settings Update Error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
