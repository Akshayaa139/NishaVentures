import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { authorizeAdmin } from '@/lib/auth';

// GET all inquiries (admin only)
export async function GET() {
  try {
    const admin = await authorizeAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const inquiries = await db.getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

// POST submit inquiry (public)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, institution, quantity_required, message, product_id } = body;

    // Validation
    if (!name || !email || !phone || !institution || !quantity_required || !message) {
      return NextResponse.json(
        { error: 'All fields except product selection are required' },
        { status: 400 }
      );
    }

    const inquiryData = {
      name,
      email,
      phone,
      institution,
      quantity_required: Number(quantity_required),
      message,
      product_id: product_id || null,
    };

    const newInquiry = await db.createInquiry(inquiryData);

    // Note: Email notification dispatch logic would go here.
    // In local dev, printing is standard:
    console.log(`[Notification] New Inquiry Received from ${name} (${institution}) for Qty: ${quantity_required}`);

    return NextResponse.json(newInquiry, { status: 201 });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
