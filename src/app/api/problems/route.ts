import { PROBLEMS, CATEGORIES } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  let results = [...PROBLEMS];

  if (slug) {
    const problem = results.find(p => p.slug === slug);
    return NextResponse.json({ success: !!problem, data: problem });
  }

  if (category) {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  return NextResponse.json({ success: true, count: results.length, data: results });
}

export async function POST(request: Request) {
  // In pure static mode, the 'POST' can't persist back to the TS file
  // but we can return success to let the UI work during the 1-day launch demo
  return NextResponse.json({ success: true, message: "Insight received (Static Preview Mode)" });
}
