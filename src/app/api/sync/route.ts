import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { services } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { parsePriceList } from '@/lib/parser';

export async function GET() {
  try {
    const parsedServices = await parsePriceList();
    
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
              priceUsd: service.priceUsd.toFixed(2),
              priceColRef: service.priceColRef.toFixed(2),
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
            priceUsd: service.priceUsd.toFixed(2),
            priceColRef: service.priceColRef.toFixed(2),
          });
          results.inserted++;
        }
      } catch (err) {
        results.errors.push(`Error processing ${service.code}: ${err}`);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Sync complete: ${results.inserted} inserted, ${results.updated} updated`,
      ...results,
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}