import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Problem } from '@/models/Problem';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const status = req.nextUrl.searchParams.get('status');
    const filter =
      status && ['pending', 'approved', 'spam'].includes(status)
        ? { moderationStatus: status }
        : {};
    const problems = await Problem.find(filter).populate('category').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: problems });
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Generate a basic slug
    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const problem = await Problem.create({ ...body, slug, moderationStatus: 'pending' });
    return NextResponse.json({ success: true, data: problem }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Invalid request';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
