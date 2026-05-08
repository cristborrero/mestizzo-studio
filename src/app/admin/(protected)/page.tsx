import { auth } from '@/auth';
import { db } from '@/lib/db';
import { services, quoteRequests } from '@/lib/db/schema';
import { count, avg, sum, sql } from 'drizzle-orm';
import { AdminDashboard } from '../_components/AdminDashboard';

export default async function AdminPage() {
  const session = await auth();

  const [totals] = await db.select({
    totalServices: count(),
    avgPrice: avg(services.priceUsd),
    catalogValue: sum(services.priceUsd),
  }).from(services);

  const categoryCounts = await db
    .select({
      category: services.category,
      serviceCount: count(),
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

  return (
    <AdminDashboard
      userName={session?.user?.name ?? 'Admin'}
      stats={{
        totalServices: Number(totals.totalServices ?? 0),
        avgPrice: Number(totals.avgPrice ?? 0),
        catalogValue: Number(totals.catalogValue ?? 0),
        totalCategories: categoryCounts.length,
        totalQuotes: Number(quotesData.totalQuotes ?? 0),
        totalRevenue: Number(quotesData.totalRevenue ?? 0),
      }}
      categoryCounts={categoryCounts.map((c) => ({
        category: c.category,
        count: Number(c.serviceCount),
        total: Number(c.total ?? 0),
      }))}
      recentQuotes={recentQuotes}
    />
  );
}
