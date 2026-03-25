import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Problem } from '@/models/Problem';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const moderationStatus = body?.moderationStatus;

    if (!['pending', 'approved', 'spam'].includes(moderationStatus)) {
      return NextResponse.json({ success: false, error: 'Invalid moderation status' }, { status: 400 });
    }

    const problem = await Problem.findByIdAndUpdate(
      id,
      { moderationStatus },
      { returnDocument: 'after' }
    );

    if (!problem) {
      return NextResponse.json({ success: false, error: 'Problem not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: problem });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
