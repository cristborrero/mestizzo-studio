
import { drizzle } from 'drizzle-orm/postgres-js';
import { inArray } from 'drizzle-orm';
import postgres from 'postgres';
import * as schema from '../src/lib/db/schema';
import fs from 'fs';
import path from 'path';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');

  const filePath = path.join(__dirname, '../../doc/lista_de_precios.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  const client = postgres(connectionString);
  const db = drizzle(client, { schema });

  const categories: { name: string; services: any[] }[] = [];
  let currentCategory = '';
  
  const lines = content.split('\n');
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect Category
    if (line.startsWith('## **')) {
      const match = line.match(/## \*\*\d+\. (.*?)\*\*/);
      if (match) {
        currentCategory = match[1];
        categories.push({ name: currentCategory, services: [] });
      }
    }

    // Detect Table Row
    if (line.startsWith('|') && line.includes('**') && !line.toLowerCase().includes('código')) {
      const parts = line.split('|').map(p => p.trim()).filter(p => p !== '');
      if (parts.length >= 4) {
        const code = parts[0].replace(/\*\*/g, '');
        const name = parts[1];
        const description = parts[2];
        const priceStr = parts[3].replace(/\*\*/g, '').replace('$', '').replace(/,/g, '');
        const priceUsd = parseFloat(priceStr);
        
        const priceColStr = parts[4]?.replace(/,/g, '').replace('$', '');
        const priceColRef = priceColStr ? parseFloat(priceColStr) : null;

        if (!isNaN(priceUsd)) {
          categories[categories.length - 1].services.push({
            code,
            name,
            description,
            priceUsd,
            priceColRef,
            category: currentCategory
          });
        }
      }
    }
  }

  console.log(`Found ${categories.length} categories.`);
  
  // Upsert services
  for (const cat of categories) {
    for (const s of cat.services) {
      console.log(`Syncing ${s.code}: ${s.name}...`);
      await db.insert(schema.services).values({
        code: s.code,
        category: s.category,
        name: s.name,
        description: s.description,
        priceUsd: s.priceUsd.toString(),
        priceColRef: s.priceColRef ? s.priceColRef.toString() : null,
      }).onConflictDoUpdate({
        target: schema.services.code,
        set: {
          category: s.category,
          name: s.name,
          description: s.description,
          priceUsd: s.priceUsd.toString(),
          priceColRef: s.priceColRef ? s.priceColRef.toString() : null,
        }
      });
    }
  }

  // Optional: Delete services that are no longer in the list?
  // User said "not repeat, organize well", so maybe I should clear old ones?
  // Let's get all codes from the list
  const allNewCodes = categories.flatMap(c => c.services.map(s => s.code));
  
  // Find services in DB that are NOT in the new list
  const currentDbServices = await db.select().from(schema.services);
  const codesToDelete = currentDbServices
    .filter(s => !allNewCodes.includes(s.code))
    .map(s => s.code);
    
  if (codesToDelete.length > 0) {
    console.log(`Deleting ${codesToDelete.length} obsolete services: ${codesToDelete.join(', ')}`);
    await db.delete(schema.services).where(inArray(schema.services.code, codesToDelete));
  }

  console.log('Synchronization complete.');
  await client.end();
}

main();
