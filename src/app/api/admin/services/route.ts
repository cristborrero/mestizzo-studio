import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { services } from '@/lib/db/schema';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const all = await db.select().from(services).orderBy(services.category, services.code);
  const mapped = all.map(s => ({
    ...s,
    priceUsd: Number(s.priceUsd),
    priceColRef: s.priceColRef ? Number(s.priceColRef) : 0,
  }));
  return NextResponse.json(mapped);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { code, category, name, description, priceUsd, priceColRef } = body;

  if (!code || !category || !name || !priceUsd) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }

  const [created] = await db.insert(services).values({
    code, category, name, description: description || '',
    priceUsd: String(priceUsd),
    priceColRef: priceColRef ? String(priceColRef) : null,
  }).returning();

  return NextResponse.json(created, { status: 201 });
}
