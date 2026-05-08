import { db } from '@/lib/db';
import { services } from '@/lib/db/schema';
import { ServicesManager } from '../../_components/ServicesManager';

export default async function AdminServicesPage() {
  const allServices = await db.select().from(services).orderBy(services.category, services.code);
  return <ServicesManager initialServices={allServices} />;
}
