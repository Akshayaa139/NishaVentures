import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authorizeAdmin } from '@/lib/auth';

// GET site content for a specific key
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { error: 'Key query parameter is required' },
        { status: 400 }
      );
    }

    const content = await db.getSiteContent(key);
    
    if (!content) {
      return NextResponse.json(
        { error: `Content not found for key: ${key}` },
        { status: 404 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching site content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site content' },
      { status: 500 }
    );
  }
}

// PUT update site content (admin only)
export async function PUT(request: Request) {
  try {
    const admin = await authorizeAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { key, content } = body;

    if (!key || !content) {
      return NextResponse.json(
        { error: 'Key and content are required' },
        { status: 400 }
      );
    }

    const success = await db.updateSiteContent(key, content);
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update content' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Site content updated successfully' });
  } catch (error) {
    console.error('Error updating site content:', error);
    return NextResponse.json(
      { error: 'Failed to update site content' },
      { status: 500 }
    );
  }
}
