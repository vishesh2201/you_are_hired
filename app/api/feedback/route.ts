import { NextRequest, NextResponse } from 'next/server';
import { createFeedback } from '@/lib/actions/general.action';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await createFeedback(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.toString() }, { status: 500 });
  }
} 