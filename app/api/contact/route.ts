import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import ContactMessage from '@/models/ContactMessage';
import { sendContactEmail } from '@/lib/mail';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    await dbConnect();
    await ContactMessage.create(result.data);

    // Fire and forget email
    sendContactEmail(result.data).catch(console.error);

    return NextResponse.json({ message: 'Message received! We\'ll get back to you soon.' });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
