import { CATEGORIES } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ success: true, count: CATEGORIES.length, data: CATEGORIES });
}
