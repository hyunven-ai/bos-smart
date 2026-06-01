export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { sql } from '@/lib/neon';

export async function GET() {
  try {
    const products = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    const formatted = products.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category_id,
      image: p.image,
      description: p.description,
      specs: p.specs,
      status: p.status
    }));
    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const product = await request.json();
    
    // Check if exists
    const existing = await sql`SELECT id FROM products WHERE id = ${product.id}`;
    if (existing.length > 0) {
      await sql`
        UPDATE products SET
          name = ${product.name},
          category_id = ${product.category},
          image = ${product.image},
          description = ${product.description},
          specs = ${product.specs},
          status = ${product.status}
        WHERE id = ${product.id}
      `;
    } else {
      await sql`
        INSERT INTO products (id, name, category_id, image, description, specs, status)
        VALUES (${product.id}, ${product.name}, ${product.category}, ${product.image}, ${product.description}, ${product.specs}, ${product.status})
      `;
    }
    return NextResponse.json({ success: true, id: product.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    await sql`DELETE FROM products WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
