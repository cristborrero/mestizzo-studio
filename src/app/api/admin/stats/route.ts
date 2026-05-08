import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { services, quoteRequests } from '@/lib/db/schema';
import { count, avg, sum, sql } from 'drizzle-orm';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [totals] = await db.select({
    totalServices: count(),
    avgPrice: avg(services.priceUsd),
    catalogValue: sum(services.priceUsd),
  }).from(services);

  const categoryCounts = await db
    .select({
      category: services.category,
      count: count(),
      total: sum(services.priceUsd),
    })
    .from(services)
    .groupBy(services.category)
    .orderBy(sql`count(*) desc`);

  const [quotesData] = await db.select({
    totalQuotes: count(),
    totalRevenue: sum(quoteRequests.totalUsd),
  }).from(quoteRequests);

  const recentQuotes = await db
    .select()
    .from(quoteRequests)
    .orderBy(sql`created_at desc`)
    .limit(5);

  return NextResponse.json({
    totalServices: Number(totals.totalServices ?? 0),
    avgPrice: Number(totals.avgPrice ?? 0).toFixed(2),
    catalogValue: Number(totals.catalogValue ?? 0).toFixed(2),
    totalCategories: categoryCounts.length,
    categoryCounts,
    totalQuotes: Number(quotesData.totalQuotes ?? 0),
    totalRevenue: Number(quotesData.totalRevenue ?? 0).toFixed(2),
    recentQuotes,
  });
}
