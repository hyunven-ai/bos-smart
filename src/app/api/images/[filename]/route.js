import { NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';

export async function GET(request, { params }) {
  const { filename } = params;

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: filename,
    });

    const response = await r2Client.send(command);
    
    // Convert readable stream to response
    return new NextResponse(response.Body, {
      headers: {
        'Content-Type': response.ContentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching image from R2:', error);
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}
