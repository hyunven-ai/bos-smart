export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { sql } from '@/lib/neon';

export async function GET() {
  try {
    const messages = await sql`SELECT * FROM inbox ORDER BY date DESC`;
    const formatted = messages.map(m => ({
      id: m.id,
      name: m.name,
      email: m.email,
      phone: m.phone,
      message: m.message,
      date: m.date,
      status: m.status
    }));
    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inbox' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const message = await request.json();
    const id = 'm-' + Date.now();
    const date = new Date().toISOString();
    
    await sql`
      INSERT INTO inbox (id, name, email, phone, message, date, status)
      VALUES (${id}, ${message.name}, ${message.email}, ${message.phone}, ${message.message}, ${date}, 'unread')
    `;
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    await sql`UPDATE inbox SET status = ${body.status} WHERE id = ${body.id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message status' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    await sql`DELETE FROM inbox WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
