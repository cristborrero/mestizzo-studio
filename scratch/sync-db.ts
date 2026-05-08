import { parsePriceList } from './src/lib/parser';
import { db } from './src/lib/db';
import { services } from './src/lib/db/schema';
import { eq } from 'drizzle-orm';

async function sync() {
  console.log('Starting sync...');
  const parsedServices = await parsePriceList();
  console.log(`Parsed ${parsedServices.length} services.`);

  for (const service of parsedServices) {
    try {
      const existing = await db.query.services.findFirst({
        where: eq(services.code, service.code),
      });

      if (existing) {
        await db.update(services)
          .set({
            name: service.name,
            description: service.description,
            category: service.category,
            priceUsd: service.priceUsd,
            priceColRef: service.priceColRef,
          })
          .where(eq(services.code, service.code));
        console.log(`Updated ${service.code}`);
      } else {
        await db.insert(services).values({
          code: service.code,
          category: service.category,
          name: service.name,
          description: service.description,
          priceUsd: service.priceUsd,
          priceColRef: service.priceColRef,
        });
        console.log(`Inserted ${service.code}`);
      }
    } catch (err) {
      console.error(`Error processing ${service.code}:`, err);
    }
  }
  console.log('Sync complete.');
  process.exit(0);
}

sync();
