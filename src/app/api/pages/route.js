import { NextResponse } from 'next/server';
import { sql } from '@/lib/neon';

export async function GET() {
  try {
    const result = await sql`SELECT * FROM pages WHERE id = 'global' LIMIT 1`;
    if (result.length === 0) return NextResponse.json(null);
    const row = result[0];
    return NextResponse.json({
      hero: {
        title: row.hero_title,
        subtitle: row.hero_subtitle,
        description: row.hero_description,
        ctaPrimary: row.hero_cta_primary,
        ctaSecondary: row.hero_cta_secondary
      },
      about: {
        title: row.about_title,
        description: row.about_description,
        vision: row.about_vision,
        mission: row.about_mission ? JSON.parse(row.about_mission) : []
      },
      whyChooseUs: {
        title: row.why_title,
        description: row.why_description,
        pillars: row.why_pillars ? JSON.parse(row.why_pillars) : []
      }
    });
  } catch (error) {
    console.error('API Pages Error:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { pageKey, content } = body;

    if (pageKey === 'hero') {
      await sql`
        UPDATE pages SET
          hero_title = COALESCE(${content.title !== undefined ? content.title : null}, hero_title),
          hero_subtitle = COALESCE(${content.subtitle !== undefined ? content.subtitle : null}, hero_subtitle),
          hero_description = COALESCE(${content.description !== undefined ? content.description : null}, hero_description),
          hero_cta_primary = COALESCE(${content.ctaPrimary !== undefined ? content.ctaPrimary : null}, hero_cta_primary),
          hero_cta_secondary = COALESCE(${content.ctaSecondary !== undefined ? content.ctaSecondary : null}, hero_cta_secondary)
        WHERE id = 'global'
      `;
    } else if (pageKey === 'about') {
      await sql`
        UPDATE pages SET
          about_title = COALESCE(${content.title !== undefined ? content.title : null}, about_title),
          about_description = COALESCE(${content.description !== undefined ? content.description : null}, about_description),
          about_vision = COALESCE(${content.vision !== undefined ? content.vision : null}, about_vision),
          about_mission = COALESCE(${content.mission !== undefined ? JSON.stringify(content.mission) : null}, about_mission)
        WHERE id = 'global'
      `;
    } else if (pageKey === 'whyChooseUs') {
       await sql`
        UPDATE pages SET
          why_title = COALESCE(${content.title !== undefined ? content.title : null}, why_title),
          why_description = COALESCE(${content.description !== undefined ? content.description : null}, why_description),
          why_pillars = COALESCE(${content.pillars !== undefined ? JSON.stringify(content.pillars) : null}, why_pillars)
        WHERE id = 'global'
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Pages Update Error:', error);
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}
