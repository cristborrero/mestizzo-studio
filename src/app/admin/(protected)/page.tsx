import { auth } from '@/auth';
import { db } from '@/lib/db';
import { services, quoteRequests } from '@/lib/db/schema';
import { count, avg, sum, sql, desc } from 'drizzle-orm';
import { AdminDashboard } from '../_components/AdminDashboard';

export default async function AdminPage() {
  const session = await auth();

  // 1. Transactional Stats (Business Health)
  const [quotesData] = await db.select({
    totalQuotes: count(),
    totalRevenue: sum(quoteRequests.totalUsd),
    avgTicket: avg(quoteRequests.totalUsd),
  }).from(quoteRequests);

  // 2. Inventory Stats (Infrastructure)
  const [inventory] = await db.select({
    totalServices: count(),
    catalogValue: sum(services.priceUsd),
  }).from(services);

  // 3. Demand Intelligence (What customers actually want)
  // We'll simulate this by looking at categories of quoted services if servicesJson was structured, 
  // but for now let's keep it based on services count as fallback OR 
  // try to parse the quotes if possible. Let's stick to inventory count for layout 
  // but labeled as "Catalog Balance" for now, and I'll add a placeholder for "Popularity".
  const categoryInventory = await db
    .select({
      category: services.category,
      serviceCount: count(),
      total: sum(services.priceUsd),
    })
    .from(services)
    .groupBy(services.category)
    .orderBy(sql`count(*) desc`);

  const recentQuotes = await db
    .select()
    .from(quoteRequests)
    .orderBy(desc(quoteRequests.createdAt))
    .limit(5);

  return (
    <AdminDashboard
      userName={session?.user?.name ?? 'Admin'}
      stats={{
        totalQuotes: Number(quotesData.totalQuotes ?? 0),
        totalRevenue: Number(quotesData.totalRevenue ?? 0),
        avgTicket: Number(quotesData.avgTicket ?? 0),
        totalServices: Number(inventory.totalServices ?? 0),
        catalogValue: Number(inventory.catalogValue ?? 0),
        totalCategories: categoryInventory.length,
      }}
      categoryCounts={categoryInventory.map((c) => ({
        category: c.category,
        count: Number(c.serviceCount),
        total: Number(c.total ?? 0),
      }))}
      recentQuotes={recentQuotes}
    />
  );
}
