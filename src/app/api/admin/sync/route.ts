import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import { services } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

interface ParsedService {
  code: string;
  name: string;
  description: string;
  priceUsd: string;
  priceColRef: string;
  category: string;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'docs/lista_de_precios.md');
    const content = fs.readFileSync(filePath, 'utf-8');

    const categories: { name: string; services: ParsedService[] }[] = [];
    const lines = content.split('\n');
    let currentCategory = '';

    for (const line of lines) {
      // Updated regex to match "## **N. Category Name**"
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
              priceUsd: priceUsd.toFixed(2),
              priceColRef: priceCol.toFixed(2),
              category: currentCategory
            });
          }
        }
      }
    }

    const log: string[] = [];
    log.push(`Parsed ${categories.reduce((acc, c) => acc + c.services.length, 0)} services across ${categories.length} categories.`);

    for (const cat of categories) {
      for (const service of cat.services) {
        const existing = await db.select().from(services).where(eq(services.code, service.code)).limit(1);
        
        if (existing.length > 0) {
          await db.update(services).set(service).where(eq(services.code, service.code));
          log.push(`Updated: ${service.code} - ${service.name}`);
        } else {
          await db.insert(services).values(service);
          log.push(`Inserted: ${service.code} - ${service.name}`);
        }
      }
    }

    return NextResponse.json({ success: true, log });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
