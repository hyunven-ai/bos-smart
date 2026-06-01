export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { sql } from '@/lib/neon';

export async function GET() {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY sort_order ASC`;
    const formatted = categories.map(c => ({
      id: c.id,
      name: c.name,
      desc: c.description
    }));
    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const category = await request.json();
    
    // Check if exists
    const existing = await sql`SELECT id FROM categories WHERE id = ${category.id}`;
    if (existing.length > 0) {
      await sql`
        UPDATE categories SET
          name = ${category.name},
          description = ${category.desc}
        WHERE id = ${category.id}
      `;
    } else {
      await sql`
        INSERT INTO categories (id, name, description, sort_order)
        VALUES (${category.id}, ${category.name}, ${category.desc}, 99)
      `;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save category' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    await sql`DELETE FROM categories WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
