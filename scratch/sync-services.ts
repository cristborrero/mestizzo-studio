import fs from 'fs';
import path from 'path';
import { db } from '../src/lib/db';
import { services } from '../src/lib/db/schema';
import { eq } from 'drizzle-orm';

async function syncServices() {
  const filePath = path.join(process.cwd(), 'docs/lista_de_precios.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  const categories: { name: string; services: any[] }[] = [];
  const lines = content.split('\n');
  let currentCategory = '';

  for (const line of lines) {
    const categoryMatch = line.match(/^## \*\*\d+\. (.*?)\*\*/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1].trim();
      categories.push({ name: currentCategory, services: [] });
      continue;
    }

    if (line.includes('| **') && line.includes('|') && currentCategory) {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 5) {
        const code = parts[1].replace(/\*\*/g, '').trim();
        const name = parts[2].replace(/\*\*/g, '').trim();
        const description = parts[3].trim();
        const priceUsdRaw = parts[4].replace(/\*\*/g, '').replace('$', '').replace(',', '').trim();
        const priceColRaw = parts[5].replace(/\*\*/g, '').replace('$', '').replace(',', '').trim();

        const priceUsd = parseFloat(priceUsdRaw);
        const priceCol = parseFloat(priceColRaw);

        if (!isNaN(priceUsd)) {
          const categoryObj = categories.find(c => c.name === currentCategory);
          categoryObj?.services.push({
            code,
            name,
            description,
            priceUsd: priceUsd.toString(),
            priceColRef: priceCol.toString(),
            category: currentCategory
          });
        }
      }
    }
  }

  console.log(`Parsed ${categories.reduce((acc, c) => acc + c.services.length, 0)} services across ${categories.length} categories.`);

  for (const cat of categories) {
    for (const service of cat.services) {
      try {
        const existing = await db.select().from(services).where(eq(services.code, service.code)).limit(1);
        
        if (existing.length > 0) {
          await db.update(services).set(service).where(eq(services.code, service.code));
          console.log(`Updated: ${service.code} - ${service.name}`);
        } else {
          await db.insert(services).values(service);
          console.log(`Inserted: ${service.code} - ${service.name}`);
        }
      } catch (err) {
        console.error(`Error processing ${service.code}:`, err);
      }
    }
  }

  console.log('Sync complete.');
  process.exit(0);
}

syncServices();
