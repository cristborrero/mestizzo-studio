import { db } from '../src/lib/db';
import { services } from '../src/lib/db/schema';
import { eq } from 'drizzle-orm';
import { parsePriceList } from '../src/lib/parser';
import path from 'path';

async function sync() {
  console.log('Starting sync...');
  try {
    const parsedServices = await parsePriceList();
    console.log(`Parsed ${parsedServices.length} services.`);
    
    const results = {
      inserted: 0,
      updated: 0,
      skipped: 0,
      errors: [] as string[],
    };
    
    for (const service of parsedServices) {
      try {
        // Check if service exists
        const existing = await db.query.services.findFirst({
          where: eq(services.code, service.code),
        });
        
        if (existing) {
          // Update existing service
          await db.update(services)
            .set({
              name: service.name,
              description: service.description,
              category: service.category,
              priceUsd: service.priceUsd,
              priceColRef: service.priceColRef,
            })
            .where(eq(services.code, service.code));
          results.updated++;
        } else {
          // Insert new service
          await db.insert(services).values({
            code: service.code,
            category: service.category,
            name: service.name,
            description: service.description,
            priceUsd: service.priceUsd,
            priceColRef: service.priceColRef,
          });
          results.inserted++;
        }
      } catch (err) {
        console.error(`Error processing ${service.code}:`, err);
        results.errors.push(`Error processing ${service.code}: ${err}`);
      }
    }
    
    console.log('Sync complete!');
    console.log(`Inserted: ${results.inserted}`);
    console.log(`Updated: ${results.updated}`);
    console.log(`Errors: ${results.errors.length}`);
    
    if (results.errors.length > 0) {
      console.log('First few errors:', results.errors.slice(0, 5));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Sync error:', error);
    process.exit(1);
  }
}

sync();
